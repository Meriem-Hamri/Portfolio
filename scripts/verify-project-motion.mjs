// Local-only browser checks. Uses an isolated Edge profile, no extra dependency.
// Run with the dev server started: node scripts/verify-project-motion.mjs
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = process.env.PORTFOLIO_QA_URL || "http://localhost:3000";
const output = path.resolve(".npm-cache/visual-qa");
await mkdir(output, { recursive: true });
const profile = await mkdtemp(path.join(output, "edge-profile-"));
const executable = process.env.EDGE_PATH || "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const browser = spawn(executable, ["--headless=new", "--no-first-run", "--disable-gpu", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"], { windowsHide: true, stdio: ["ignore", "ignore", "pipe"] });
const endpoint = await new Promise((resolve, reject) => {
  let log = "";
  const timer = setTimeout(() => reject(new Error(`Edge did not start: ${log.slice(-1000)}`)), 15000);
  browser.once("error", error => { clearTimeout(timer); reject(error); });
  browser.stderr.on("data", chunk => {
    log += chunk.toString();
    const match = log.match(/DevTools listening on (ws:\/\/\S+)/);
    if (match) { clearTimeout(timer); resolve(match[1]); }
  });
});
const socket = new WebSocket(endpoint);
console.log("Isolated Edge started.");
await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error("DevTools connection timed out")), 15000);
  socket.addEventListener("open", () => { clearTimeout(timer); resolve(); }, { once: true });
  socket.addEventListener("error", error => { clearTimeout(timer); reject(error); }, { once: true });
});
let sequence = 0;
const pending = new Map();
const runtimeErrors = [];
socket.addEventListener("message", event => {
  const message = JSON.parse(event.data);
  if (message.method === "Runtime.exceptionThrown") runtimeErrors.push(message.params.exceptionDetails.text);
  if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") runtimeErrors.push(message.params.args.map(arg => arg.value || arg.description).join(" "));
  if (message.id && pending.has(message.id)) {
    const { resolve, reject, timer } = pending.get(message.id);
    clearTimeout(timer);
    pending.delete(message.id);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  }
});
function call(method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 20000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
}
const { targetId } = await call("Target.createTarget", { url: "about:blank" });
const { sessionId } = await call("Target.attachToTarget", { targetId, flatten: true });
const page = (method, params) => call(method, params, sessionId);
async function evaluate(expression) {
  const result = await page("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function waitFor(expression) {
  for (let i = 0; i < 100; i++) {
    if (await evaluate(`Boolean(${expression})`)) return;
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  throw new Error(`Condition not met: ${expression}`);
}
const root = `document.querySelector('[data-internships]')`;
const tabs = `${root}.querySelectorAll('[role="tab"]')`;
const panel = `${root}.querySelector('[role="tabpanel"]:not([hidden])')`;
async function capture(name) {
  const { data } = await page("Page.captureScreenshot", { format: "png" });
  await writeFile(path.join(output, `${name}.png`), Buffer.from(data, "base64"));
}
async function settle() {
  await evaluate(`new Promise(resolve => setTimeout(resolve, 1100))`);
}
async function scrollToSelector() {
  await evaluate(`document.documentElement.style.scrollBehavior='auto'; window.scrollTo({top: ${root}.querySelector('[role="tablist"]').getBoundingClientRect().top + scrollY - 110, behavior:'instant'})`);
  await settle();
}
try {
  await page("Page.enable");
  await page("Page.bringToFront");
  await page("Runtime.enable");
  await page("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1080, deviceScaleFactor: 1, mobile: false });
  await page("Page.navigate", { url: origin });
  await waitFor(`${root}?.dataset.ready === 'true' && ${tabs}.length === 2`);
  await evaluate(`document.documentElement.style.scrollBehavior='auto'; ${root}.scrollIntoView({block:'start', behavior:'instant'})`);
  await settle();
  await capture("internships-intro-fr");
  await scrollToSelector();
  assert.equal(await evaluate(`document.documentElement.scrollWidth <= innerWidth`), true, "desktop overflow");
  assert.equal(await evaluate(`${root}.querySelectorAll('[role="tabpanel"]:not([hidden])').length`), 1);
  await capture("internships-telepac-fr");

  // Inspect actual source fields; no carousel or autoplay changes the story.
  await evaluate(`${panel}.querySelectorAll('[data-evidence] button')[1].click()`);
  await waitFor(`${panel}.querySelector('pre').textContent.includes('page_number')`);
  await evaluate(`${tabs}[0].focus()`);
  await page("Input.dispatchKeyEvent", { type: "keyDown", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39 });
  await page("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39 });
  await waitFor(`${tabs}[1].getAttribute('aria-selected') === 'true' && document.activeElement === ${tabs}[1]`);
  await settle();
  assert.equal(await evaluate(`getComputedStyle(document.activeElement).outlineStyle`), "solid", "keyboard focus visible");
  await capture("internships-tgr-fr");
  await evaluate(`${panel}.querySelectorAll('[data-evidence] button')[2].click()`);
  await waitFor(`${panel}.querySelectorAll('[data-evidence] button')[2].getAttribute('aria-pressed') === 'true'`);

  for (const width of [390, 320]) {
    await page("Emulation.setDeviceMetricsOverride", { width, height: 844, deviceScaleFactor: 1, mobile: true });
    for (const index of [0, 1]) {
      await evaluate(`${tabs}[${index}].click()`);
      await scrollToSelector();
      assert.equal(await evaluate(`document.documentElement.scrollWidth <= innerWidth`), true, `mobile ${width} overflow, case ${index}`);
      await capture(`internships-mobile-${width}-${index}`);
    }
  }
  await page("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await settle();
  await evaluate(`${tabs}[0].click()`);
  await waitFor(`${tabs}[0].getAttribute('aria-selected') === 'true'`);
  assert.equal(await evaluate(`getComputedStyle(${panel}.querySelector('[data-case-reveal]')).opacity`), "1", "reduced-motion panel immediately readable");
  const reflection = await evaluate(`getComputedStyle(${root}.querySelector('[data-reflection]')).transform`);
  await evaluate(`window.scrollBy({top:80,behavior:'instant'})`);
  await settle();
  assert.equal(await evaluate(`getComputedStyle(${root}.querySelector('[data-reflection]')).transform`), reflection, "reduced-motion removes scroll tween");
  await page("Network.setCookie", { name: "portfolio-locale", value: "en", url: origin });
  await page("Network.setCookie", { name: "portfolio-theme", value: "dark", url: origin });
  await page("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1080, deviceScaleFactor: 1, mobile: false });
  await page("Page.navigate", { url: origin });
  await waitFor(`${root}?.dataset.ready === 'true' && document.documentElement.lang === 'en' && document.documentElement.dataset.theme === 'dark'`);
  await scrollToSelector();
  await capture("internships-dark-en");
  await evaluate(`${tabs}[1].click()`);
  await waitFor(`${tabs}[1].getAttribute('aria-selected') === 'true'`);
  await capture("internships-tgr-dark-en");
  assert.deepEqual(runtimeErrors, [], "browser runtime errors");
  console.log(`PASS: manual project selection, keyboard tabs/focus, source inspector, architecture controls, reduced motion, FR/EN, dark theme, 1440/390/320px overflow. Screenshots: ${output}`);
} finally {
  await call("Browser.close").catch(() => {});
  socket.close();
  browser.kill();
}
