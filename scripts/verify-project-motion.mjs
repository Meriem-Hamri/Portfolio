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
const assistant = `document.querySelector('[data-evidence="assistant"]')`;
const reporting = `document.querySelector('[data-evidence="reporting"]')`;
async function capture(name) {
  const { data } = await page("Page.captureScreenshot", { format: "png" });
  await writeFile(path.join(output, `${name}.png`), Buffer.from(data, "base64"));
}
async function settle() { await evaluate(`new Promise(resolve => setTimeout(resolve, 1100))`); }
async function visit(route, selector) {
  await page("Page.navigate", { url: origin + route });
  await waitFor(`document.querySelector(${JSON.stringify(selector)}) && document.readyState === 'complete'`);
  await settle();
}
async function scrollTo(selector) {
  await evaluate(`{ document.documentElement.style.scrollBehavior='auto'; const target = document.querySelector(${JSON.stringify(selector)}); window.scrollTo({top: target.getBoundingClientRect().top + scrollY - 175, behavior:'instant'}); }`);
  await settle();
}
async function key(key, code, windowsVirtualKeyCode) {
  await page("Input.dispatchKeyEvent", { type: "keyDown", key, code, windowsVirtualKeyCode });
  await page("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode });
}
async function noOverflow(label) {
  assert.equal(await evaluate(`document.documentElement.scrollWidth <= innerWidth`), true, label + " horizontal overflow");
}
function luminance(hex) {
  const channels = hex.replace("#","").match(/../g).map(value => parseInt(value,16)/255).map(value => value <= .04045 ? value/12.92 : ((value+.055)/1.055)**2.4);
  return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
}
function contrast(a,b) {
  const x=luminance(a), y=luminance(b);
  return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
try {
  await page("Page.enable");
  await page("Runtime.enable");
  await page("Page.bringToFront");
  await page("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1080, deviceScaleFactor: 1, mobile: false });
  await visit("/", "[data-internships][data-ready]");
  assert.equal(await evaluate(`${root}.querySelectorAll('[data-internship-case]').length`), 2);
  assert.equal(await evaluate(`document.querySelectorAll('[data-gallery] article').length`), 3);
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('[data-intro-loader]')).visibility`), "hidden", "intro must dismiss");
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('[data-intro-loader]')).pointerEvents`), "none");
  await scrollTo("[data-internships]");
  await capture("butterfly-internship-intro");
  await scrollTo('[data-case="assistant-documentaire-rag-local"]');
  await noOverflow("desktop");
  await capture("butterfly-assistant");
  await evaluate(`${assistant}.querySelector('[aria-expanded]').click()`);
  await waitFor(`${assistant}.dataset.step === '3' && ${assistant}.querySelector('blockquote')`);
  await evaluate(`${assistant}.querySelector('[role="group"] button').click()`);
  await waitFor(`${assistant}.dataset.step === '0'`);
  await evaluate(`${assistant}.querySelector('[aria-label*="parcours"]').click()`);
  await waitFor(`${assistant}.dataset.playing === 'true'`);
  await evaluate(`${assistant}.querySelector('[aria-label*="pause"]').click()`);
  await waitFor(`${assistant}.dataset.playing === 'false'`);
  await evaluate(`${root}.querySelector('nav a[href="#stage-reporting-cse"]').focus()`);
  await key("Enter", "Enter", 13);
  await settle();
  assert.equal(await evaluate(`${root}.querySelector('nav a[href="#stage-reporting-cse"]').getAttribute('aria-current')`), "location", "stage anchor updates current location");
  await scrollTo('[data-case="reporting-cse"]');
  await capture("butterfly-reporting");
  await evaluate(`const select=${reporting}.querySelector('select'); select.value='training'; select.dispatchEvent(new Event('change',{bubbles:true}));`);
  await waitFor(`${reporting}.querySelectorAll('tbody tr').length === 1`);
  assert.equal(await evaluate(`${reporting}.querySelector('tbody th').textContent.includes('Beta')`), true);
  // Intercept only the browser download click, verify the genuine Blob contents.
  const csv = await evaluate(`(async()=>{ let contents; const old=HTMLAnchorElement.prototype.click; HTMLAnchorElement.prototype.click=function(){if(this.download) contents=fetch(this.href).then(r=>r.text()); else old.call(this);}; try { ${reporting}.querySelector('button').click(); return await contents; } finally { HTMLAnchorElement.prototype.click=old; } })()`);
  assert.ok(csv.includes("Beta") && !csv.includes("Alpha"), "CSV respects selected rows");
  assert.ok(csv.includes("FICTIONAL DATA"), "export identifies synthetic data");
  await scrollTo("[data-gallery]");
  await capture("butterfly-gallery");
  await scrollTo('[data-gallery] article');
  const galleryRow = await evaluate(`(()=>{const r=document.querySelector('[data-gallery] article').getBoundingClientRect();return {x:r.x+60,y:r.y+85};})()`);
  await page("Input.dispatchMouseEvent", {type:"mouseMoved", ...galleryRow});
  await waitFor(`document.querySelector('[data-gallery] article').dataset.active === 'true'`);
  await settle();
  await capture("butterfly-gallery-hover");
  const secondRow = await evaluate(`(()=>{const r=document.querySelectorAll('[data-gallery] article')[1].getBoundingClientRect();return {x:r.x+60,y:r.y+80};})()`);
  await page("Input.dispatchMouseEvent", {type:"mouseMoved", ...secondRow});
  await waitFor(`document.querySelectorAll('[data-gallery] article')[1].dataset.active === 'true'`);
  await evaluate(`new Promise(resolve => setTimeout(resolve, 140))`);
  const reveal = await evaluate(`(()=>{const p=[...document.querySelectorAll('[data-gallery-preview]')];return p.slice(0,2).map(el=>getComputedStyle(el).clipPath);})()`);
  assert.ok(reveal.every(value => value.startsWith('inset(')), "adjacent previews use the GSAP reveal: " + JSON.stringify(reveal));
  const maskPercentages = reveal.map(value => [...value.matchAll(/([\d.]+)%/g)].map(match => Number(match[1])));
  assert.ok(maskPercentages[0].length === 4 && maskPercentages[1].length === 4 && maskPercentages[0][1] + maskPercentages[1][3] < 150, "the reveal leaves no blank stage: " + JSON.stringify(reveal));
  await capture("butterfly-gallery-transition");
  await settle();
  await page("Input.dispatchMouseEvent", {type:"mouseMoved", ...galleryRow});
  await waitFor(`document.querySelector('[data-gallery] article').dataset.active === 'true'`);
  await evaluate(`document.querySelector('[data-gallery] article h3 a').focus()`);
  assert.equal(await evaluate(`document.querySelector('[data-gallery] article button').getAttribute('aria-expanded')`),"true");
  await key("Escape","Escape",27);
  await waitFor(`document.querySelector('[data-gallery] article button').getAttribute('aria-expanded') === 'false'`);
  assert.equal(await evaluate(`document.querySelectorAll('[data-gallery] a[target="_blank"]').length`),3,"only the three documented repository URLs, no invented live sites");
  for(const slug of ["skilo","taskflow","xploreia"]) {
    assert.equal(await evaluate(`document.querySelector('[data-gallery] a[href="/work/${slug}"]') !== null`),true);
  }
  await evaluate(`document.querySelector('.nav-projects__toggle').focus()`);
  await key("ArrowDown","ArrowDown",40);
  await waitFor(`document.querySelector('.nav-projects__toggle').getAttribute('aria-expanded') === 'true' && document.activeElement.closest('#project-navigation')`);
  assert.equal(await evaluate(`document.querySelectorAll('.nav-projects__list a').length`), 5);
  await key("Escape","Escape",27);
  assert.equal(await evaluate(`document.activeElement.classList.contains('nav-projects__toggle')`), true);
  assert.equal(await evaluate(`getComputedStyle(document.activeElement).outlineStyle`), "solid");

  await scrollTo("[data-scroll-approach]");
  assert.equal(await evaluate(`document.querySelectorAll('[data-scroll-approach] li').length`), 3);
  assert.equal(await evaluate(`document.querySelector('[data-scroll-approach]').getAttribute('aria-label')`), "Ma façon de travailler");
  assert.equal(await evaluate(`document.querySelector('[data-scroll-approach] li').style.opacity !== ''`), true, "scroll-linked approach is animated");
  await noOverflow("desktop approach");
  await capture("butterfly-scroll-approach");

  for(const width of [390,320]) {
    await page("Input.dispatchMouseEvent", {type:"mouseMoved",x:0,y:0});
    await page("Emulation.setTouchEmulationEnabled", {enabled:true});
    await page("Emulation.setDeviceMetricsOverride", { width, height: 844, deviceScaleFactor: 1, mobile: true });
    for(const selector of ['[data-case="assistant-documentaire-rag-local"]','[data-case="reporting-cse"]',"[data-gallery]"]) {
      await scrollTo(selector); await noOverflow("mobile "+width);
    }
    await capture("butterfly-gallery-mobile-"+width);
    await scrollTo("[data-scroll-approach]");
    await noOverflow("mobile approach " + width);
    await capture("butterfly-scroll-approach-mobile-"+width);
    await evaluate(`document.querySelector('[data-gallery] article button').focus()`);
    await key("Escape","Escape",27);
    await waitFor(`document.querySelector('#preview-skilo').getAttribute('aria-hidden') === 'true'`);
    await key("Enter","Enter",13);
    await waitFor(`document.querySelector('#preview-skilo').getAttribute('aria-hidden') === 'false'`);
    await scrollTo('[data-gallery] article');
    await noOverflow("expanded mobile gallery "+width);
    await capture("butterfly-gallery-mobile-preview-"+width);
    await evaluate(`document.querySelector('[data-gallery] article button').focus()`);
    await key("Enter","Enter",13);
    await waitFor(`document.querySelector('#preview-skilo').getAttribute('aria-hidden') === 'true'`);
    await evaluate(`document.querySelector('.menu-button').click()`);
    await waitFor(`document.querySelector('.menu-button').getAttribute('aria-expanded') === 'true'`);
    await evaluate(`document.querySelector('.nav-projects__toggle').click()`);
    await waitFor(`!document.querySelector('#project-navigation').hidden`);
    await capture("butterfly-navigation-mobile-"+width);
    await evaluate(`document.querySelector('.menu-button').click()`);
  }

  await page("Emulation.setEmulatedMedia", { features: [{ name:"prefers-reduced-motion", value:"reduce" }] });
  await scrollTo("[data-internships]");
  assert.equal(await evaluate(`getComputedStyle(${root}.querySelector('[data-stage-intro]')).opacity`), "1");
  assert.equal(await evaluate(`${assistant}.querySelector('[aria-label*="parcours"]') === null`), true, "reduced motion removes automatic playback control");
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('[data-scroll-approach] li')).opacity`), "1", "approach remains fully visible with reduced motion");

  const slugs = ["assistant-documentaire-rag-local","reporting-cse","skilo","taskflow","xploreia"];
  for(const slug of slugs) {
    await visit("/work/"+slug, "[data-architecture]");
    await noOverflow("case mobile "+slug);
    await scrollTo("[data-architecture]");
    const nextLayer = await evaluate(`document.querySelector('[data-architecture] button').dataset.layer`);
    await evaluate(`document.querySelector('[data-architecture] button').click()`);
    await waitFor(`document.querySelector('[data-layer="${nextLayer}"]').getAttribute('aria-pressed') === 'true'`);
    if(slug==="assistant-documentaire-rag-local") {
      await evaluate(`document.querySelector('button[aria-haspopup="dialog"]').click()`);
      await waitFor(`document.querySelector('dialog[open]')`);
      await key("Escape","Escape",27);
      await waitFor(`!document.querySelector('dialog[open]')`);
    }
    await capture("butterfly-case-mobile-"+slug);
  }
  for(const route of ["/work","/about","/contact"]) {
    const status = await evaluate(`fetch(${JSON.stringify(origin)}+${JSON.stringify(route)}).then(r=>r.status)`);
    assert.equal(status,200,route);
    await visit(route, "#contenu h1");
    await noOverflow("mobile route " + route);
  }
  assert.equal(await evaluate(`fetch(${JSON.stringify(origin+"/work/nonexistent-case")}).then(r=>r.status)`),404);

  await page("Network.setCookie", { name:"portfolio-locale", value:"en", url:origin });
  await page("Network.setCookie", { name:"portfolio-theme", value:"dark", url:origin });
  await page("Emulation.setDeviceMetricsOverride", { width:1440, height:1080, deviceScaleFactor:1, mobile:false });
  await page("Emulation.setTouchEmulationEnabled", {enabled:false});
  await visit("/", "[data-internships][data-ready]");
  assert.equal(await evaluate(`document.documentElement.lang`), "en");
  assert.equal(await evaluate(`document.documentElement.dataset.theme`), "dark");
  await scrollTo('[data-case="assistant-documentaire-rag-local"]');
  await capture("butterfly-dark-en");
  await scrollTo('[data-gallery] article:last-child');
  await evaluate(`document.querySelector('[data-gallery] article:last-child h3 a').focus()`);
  await settle();
  await noOverflow("dark gallery");
  await capture("butterfly-gallery-dark-en");
  await visit("/work/assistant-documentaire-rag-local","[data-architecture]");
  await scrollTo("[data-architecture]");
  await capture("butterfly-architecture-dark-en");
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('.wing-material')).getPropertyValue('--wing-bg').trim()`), "#142421");
  await evaluate(`document.querySelector('button[aria-label="Switch to light mode"]').click()`);
  await waitFor(`document.documentElement.dataset.theme === 'light'`);
  await evaluate(`document.querySelector('button[aria-label="Passer en français"]').click()`);
  await waitFor(`document.documentElement.lang === 'fr'`);
  for(const [bg, colors] of [["#e7eee8",["#203936","#49625d","#4d601f"]],["#f1f5ef",["#203936","#49625d","#4d601f"]],["#142421",["#e7f2eb","#b9cec3","#c9da90"]],["#1b302c",["#e7f2eb","#b9cec3","#c9da90"]]]) {
    for(const color of colors) assert.ok(contrast(bg,color)>=4.5, "text token contrast "+bg+" "+color);
  }
  assert.deepEqual(runtimeErrors, [], "browser runtime/hydration errors");
  console.log("PASS: native stage navigation, interactive RAG steps/play/pause/source, filtered reporting CSV, gallery, keyboard menu/focus, reduced motion, FR/EN, coherent dark tokens, all case architectures, routes/404, 1440/390/320px overflow and core text contrast. Screenshots: "+output);
} finally {
  await call("Browser.close").catch(() => {});
  socket.close();
  browser.kill();
}
