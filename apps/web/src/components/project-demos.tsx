"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Locale } from "@/lib/locale";
import { assistantScenario, demoReportRows } from "@/data/demo-scenarios";
import styles from "./project-demos.module.css";

gsap.registerPlugin(useGSAP);

function useWalkthrough(total: number, initial: number) {
  const [step, setStep] = useState(initial);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { setReduced(preference.matches); if (preference.matches) setPlaying(false); };
    sync();
    preference.addEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (root.current) { observer.observe(root.current); root.current.dataset.ready = "true"; }
    return () => { preference.removeEventListener("change", sync); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!playing || !visible || reduced) return;
    const timeout = window.setTimeout(() => { if (step === total - 1) setPlaying(false); else setStep(value => value + 1); }, 3500);
    return () => window.clearTimeout(timeout);
  }, [playing, visible, reduced, step, total]);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-demo-enter]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .55, stagger: .09, ease: "power2.out", clearProps: "transform,opacity" });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [step], revertOnUpdate: true });
  return { root, step, playing, reduced, choose: (next: number) => { setPlaying(false); setStep(next); }, play: () => { if (playing) setPlaying(false); else { setStep(0); setPlaying(true); } } };
}

type ControlsProps = { labels: string[]; step: number; playing: boolean; reduced: boolean; locale: Locale; controls: string; choose: (step: number) => void; play: () => void };
function WalkthroughControls({ labels, step, playing, reduced, locale, controls, choose, play }: ControlsProps) {
  const fr = locale === "fr";
  return <div className={styles.controls}>
    <div className={styles.stepButtons} role="group" aria-label={fr ? "Étapes de la démonstration" : "Walkthrough steps"}>{labels.map((label, index) => <button type="button" key={label} aria-pressed={step === index} aria-controls={controls} onClick={() => choose(index)}><span>0{index + 1}</span>{label}</button>)}</div>
    {!reduced && <button type="button" className={styles.play} onClick={play} aria-label={playing ? (fr ? "Mettre le parcours en pause" : "Pause walkthrough") : (fr ? "Lire le parcours depuis le début" : "Play walkthrough from the start")}><span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>{playing ? "Pause" : (fr ? "Voir le parcours" : "Play walkthrough")}</button>}
  </div>;
}

export function AssistantDemo({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const scene = assistantScenario[locale];
  const walk = useWalkthrough(4, 2);
  const id = useId();
  return <div ref={walk.root} className={styles.demo} data-evidence="assistant" data-step={walk.step} data-playing={walk.playing}>
    <div className={styles.demoHeader}><span>{fr ? "L’ASSISTANT EN SITUATION" : "THE ASSISTANT IN ACTION"}</span><span>{fr ? "Simulation · exemple fictif" : "Simulation · fictional example"}</span></div>
    <div id={id} className={`${styles.product} ${styles.assistant}`}>
      <aside className={styles.sidebar}><div className={styles.appBrand}><span aria-hidden="true">A</span><strong>AssistantAI<small>DOCUMENT INTELLIGENCE</small></strong></div><button type="button" aria-pressed={walk.step !== 0} onClick={() => walk.choose(2)}>◫ <span>Assistant</span></button><button type="button" aria-pressed={walk.step === 0} onClick={() => walk.choose(0)}>▤ <span>Documents</span></button><p>{fr ? "Un contexte choisi. Une réponse sourcée." : "Selected context. Referenced answers."}</p></aside>
      <div className={styles.workspace}>
        <div className={styles.appToolbar}><span>{fr ? "ANALYSE DOCUMENTAIRE" : "DOCUMENT ANALYSIS"}</span><button type="button" onClick={() => walk.choose(0)}>{fr ? "Contexte : 2 documents" : "Context: 2 documents"} <span aria-hidden="true">⌄</span></button></div>
        <div className={styles.assistantScene}>
          {walk.step === 0 ? <div className={styles.library} data-demo-enter><p className={styles.appEyebrow}>{fr ? "ESPACE DOCUMENTAIRE" : "DOCUMENT LIBRARY"}</p><h4>{fr ? "La connaissance, rassemblée." : "Knowledge, brought together."}</h4><p>{fr ? "Deux documents fictifs sélectionnés pour cette démonstration." : "Two fictional documents selected for this walkthrough."}</p>{scene.documents.map((name,index) => <div className={styles.documentRow} key={name}><span aria-hidden="true">▤</span><div><strong>{name}</strong><small>{fr ? "Document de démonstration" : "Demo document"} · {index ? "DOCX" : "PDF"}</small></div><span className={styles.ready}>{fr ? "Prêt" : "Ready"}</span></div>)}<button type="button" className={styles.appAction} onClick={() => walk.choose(1)}>{fr ? "Interroger ces documents" : "Ask about these documents"} →</button></div> : <div className={styles.conversation}>
            <div className={styles.question} data-demo-enter><p>{scene.question}</p><span>▤ {scene.documents[1]}</span></div>
            {walk.step === 1 ? <div className={styles.retrieval} data-demo-enter><span className={styles.assistantMark} aria-hidden="true">A</span><div><strong>{fr ? "Recherche dans le contexte choisi" : "Searching the selected context"}</strong><p>{fr ? "Retrouver les passages utiles avant de formuler la réponse." : "Find useful passages before composing an answer."}</p><button type="button" className={styles.inlineButton} onClick={() => walk.choose(2)}>{fr ? "Voir la réponse simulée" : "See the simulated answer"} →</button></div></div> : <div className={styles.answer} data-demo-enter><span className={styles.assistantMark} aria-hidden="true">A</span><div><strong>{fr ? "Réponse avec références" : "Answer with references"}</strong><p>{scene.answer}</p><button type="button" className={styles.citation} aria-expanded={walk.step === 3} onClick={() => walk.choose(walk.step === 3 ? 2 : 3)}><span>▤ <b>{scene.documents[1]}</b> · {fr ? "Page 1" : "Page 1"}</span><span>{fr ? "Vérifier la source" : "Check source"} ↗</span></button>{walk.step === 3 && <blockquote className={styles.excerpt} data-demo-enter><span>{fr ? "PASSAGE FICTIF UTILISÉ DANS CETTE DÉMO" : "FICTIONAL PASSAGE USED IN THIS DEMO"}</span>{scene.excerpt}</blockquote>}</div></div>}
          </div>}
        </div>
        <div className={styles.composer}><span>{fr ? "Posez une question sur vos documents…" : "Ask a question about your documents…"}</span><button type="button" onClick={() => walk.choose(1)} aria-label={fr ? "Rejouer la question d’exemple" : "Replay the example question"}>↑</button></div>
      </div>
    </div>
    <WalkthroughControls labels={scene.steps} controls={id} locale={locale} {...walk} />
    <p className={styles.disclaimer}>{fr ? "Interface reconstituée d’après les captures fournies. Scénario fictif : aucun modèle IA ni document privé n’est appelé." : "Interface recreated from the supplied screenshots. Fictional scenario: no AI model or private document is accessed."}</p>
  </div>;
}

export function ReportingDemo({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const walk = useWalkthrough(3, 0);
  const id = useId();
  const [category, setCategory] = useState("digital");
  const [exported, setExported] = useState(false);
  const filter = walk.step === 0 ? "all" : category;
  const rows = demoReportRows.filter(row => filter === "all" || row.category === filter);
  const budget = rows.reduce((sum,row) => sum + row.budget, 0);
  const committed = rows.reduce((sum,row) => sum + row.committed, 0);
  const format = (value: number) => new Intl.NumberFormat(fr ? "fr-FR" : "en-GB").format(value);
  const labels = fr ? ["Vue d’ensemble", "Filtrer", "Exporter"] : ["Overview", "Filter", "Export"];
  function exportExample() {
    const csv = "\uFEFF" + ["DONNEES FICTIVES / FICTIONAL DATA", "Programme;Budget MAD;Engage MAD", ...rows.map(row => `${row.id};${row.budget};${row.committed}`)].join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "reporting-exemple-fictif.csv";
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setExported(true); walk.choose(2);
  }
  return <div ref={walk.root} className={styles.demo} data-evidence="reporting" data-step={walk.step} data-playing={walk.playing}>
    <div className={styles.demoHeader}><span>{fr ? "LE REPORTING EN SITUATION" : "REPORTING IN ACTION"}</span><span>{fr ? "Reconstitution · données fictives" : "Recreation · fictional data"}</span></div>
    <div id={id} className={`${styles.product} ${styles.reporting}`}>
      <div className={styles.reportToolbar}><div><span className={styles.appEyebrow}>CSE / REPORTING</span><h4>{fr ? "Lire. Filtrer. Décider." : "Read. Filter. Decide."}</h4></div><span className={styles.demoBadge}>{fr ? "JEU DE DÉMONSTRATION" : "DEMO DATASET"}</span></div>
      <div className={styles.reportFilters}><label htmlFor={`${id}-filter`}>{fr ? "Périmètre" : "Scope"}<select id={`${id}-filter`} value={filter} onChange={event => { setCategory(event.target.value); setExported(false); walk.choose(1); }}><option value="all">{fr ? "Tous les programmes" : "All programmes"}</option><option value="digital">{fr ? "Numérique" : "Digital"}</option><option value="training">{fr ? "Formation" : "Training"}</option></select></label><button type="button" className={styles.exportButton} onClick={exportExample}>{fr ? "Exporter l’exemple (.csv)" : "Export example (.csv)"} <span aria-hidden="true">↓</span></button></div>
      <div className={styles.metrics} data-demo-enter><div><span>{fr ? "Budget fictif" : "Fictional budget"}</span><strong>{format(budget)} <small>MAD</small></strong></div><div><span>{fr ? "Engagé fictif" : "Fictional commitments"}</span><strong>{format(committed)} <small>MAD</small></strong></div><div><span>{fr ? "Programmes affichés" : "Displayed programmes"}</span><strong>{rows.length.toString().padStart(2,"0")}</strong></div></div>
      <div className={styles.reportTable} data-demo-enter><table><caption className="sr-only">{fr ? "Exemple fictif de suivi financier" : "Fictional financial tracking example"}</caption><thead><tr><th>{fr ? "Programme" : "Programme"}</th><th>{fr ? "Budget fictif" : "Fictional budget"}</th><th>{fr ? "Engagement" : "Commitment"}</th></tr></thead><tbody>{rows.map(row => <tr key={row.id}><th scope="row">{row.id}<small>{row.category === "digital" ? (fr ? "Numérique" : "Digital") : (fr ? "Formation" : "Training")}</small></th><td>{format(row.budget)}</td><td><span>{format(row.committed)}</span><span className={styles.bar} aria-hidden="true"><i style={{ width: `${row.committed / row.budget * 100}%` }} /></span></td></tr>)}</tbody></table></div>
      <div className={styles.reportNote} role="status">{exported ? (fr ? "L’exemple CSV a été préparé pour téléchargement. Il contient uniquement les lignes fictives affichées." : "The CSV example is ready for download. It contains only the displayed fictional rows.") : walk.step === 2 ? (fr ? "Le rapport reprend le périmètre sélectionné. Essayez l’export local avec les données fictives." : "The report follows the selected scope. Try the local export with fictional data.") : (fr ? "Modifiez le périmètre : les indicateurs et le tableau se recalculent ensemble." : "Change the scope: the indicators and table update together.")}</div>
    </div>
    <WalkthroughControls labels={labels} controls={id} locale={locale} {...walk} />
    <p className={styles.disclaimer}>{fr ? "Reconstitution illustrative, pas une capture de TGR. Chiffres entièrement fictifs. Cette démo exporte un CSV ; le projet décrit comprend un export Excel." : "Illustrative recreation, not a TGR screenshot. All figures are fictional. This demo exports CSV; the project described includes Excel export."}</p>
  </div>;
}
