"use client";

import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Locale } from "@/lib/locale";
import type { Project } from "@/types/project";
import styles from "./internship-showcase.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ShowcaseProps = { projects: readonly Project[]; locale: Locale };

export function SourceEvidence({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const [source, setSource] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const codeId = useId();
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-code-line]", { x: 14, opacity: .2 }, { x: 0, opacity: 1, duration: .45, stagger: .045, ease: "power2.out", clearProps: "transform,opacity" });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [source], revertOnUpdate: true });
  return <div ref={root} className={styles.sourceEvidence} data-evidence="source">
    <div className={styles.fileBar}><span><span className={styles.fileIcon} aria-hidden="true">⌘</span> Backend / app / rag / <b>response.py</b></span><span>Python</span></div>
    <div className={styles.sourceBody}>
      <div className={styles.codeWindow}>
        <div className={styles.codeTabs} role="group" aria-label={fr ? "Extrait à explorer" : "Explore an excerpt"}>
          <button type="button" aria-pressed={!source} aria-controls={codeId} onClick={() => setSource(false)}>RAGResponse</button>
          <button type="button" aria-pressed={source} aria-controls={codeId} onClick={() => setSource(true)}>Source <span aria-hidden="true">↗</span></button>
        </div>
        <pre id={codeId} tabIndex={0} aria-label={fr ? "Extrait du dépôt public" : "Public repository excerpt"}>{source ? <code><span data-code-line className={styles.codeLine}><i aria-hidden="true">01</i>document_id: <b>str</b></span><span data-code-line className={styles.codeLine}><i aria-hidden="true">02</i>document_name: <b>str</b></span><span data-code-line className={styles.codeLine}><i aria-hidden="true">03</i>page_number: <b>int</b></span><span data-code-line className={styles.codeLine}><i aria-hidden="true">04</i>chunk_id: <b>str</b></span><span data-code-line className={styles.codeLine}><i aria-hidden="true">05</i>excerpt: <b>str</b></span><span data-code-line className={styles.codeLine}><i aria-hidden="true">06</i>distance: <b>float</b></span></code> : <code><span data-code-line className={styles.codeLine}><i aria-hidden="true">01</i><em>@dataclass</em>(frozen=True, slots=True)</span><span data-code-line className={styles.codeLine}><i aria-hidden="true">02</i><em>class</em> <b>RAGResponse</b>:</span><span data-code-line className={styles.codeLine}><i aria-hidden="true">03</i>{"    "}answer: <b>str</b></span><span data-code-line className={styles.codeLine}><i aria-hidden="true">04</i>{"    "}sources: <b>list[Source]</b></span></code>}</pre>
      </div>
      <aside className={styles.annotation}>
        <span className={styles.annotationMarker} aria-hidden="true">↳</span>
        <p>{fr ? "LA DÉCISION TECHNIQUE" : "THE ENGINEERING DECISION"}</p>
        <h4>{source ? (fr ? "Le passage reste accessible." : "The passage stays traceable.") : (fr ? "Le texte et ses références." : "The answer and its references.")}</h4>
        <p>{source ? (fr ? "Document, page, extrait : les références permettent de revenir au contexte d’origine." : "Document, page, excerpt: references lead back to the original context.") : (fr ? "Le contrat réunit le texte généré et une liste structurée de sources." : "The contract combines generated text with a structured list of sources.")}</p>
        <a href="https://github.com/Meriem-Hamri/Ai_assistant/blob/main/Backend/app/rag/response.py" target="_blank" rel="noreferrer">{fr ? "Vérifier dans le dépôt" : "View in repository"} <span aria-hidden="true">↗</span><span className="sr-only">{fr ? " (nouvel onglet)" : " (new tab)"}</span></a>
      </aside>
    </div>
    <div className={styles.evidenceFoot}><span className={styles.statusDot} aria-hidden="true" />{fr ? "Extrait du code public · pas une capture d’écran" : "Public source excerpt · not an application screenshot"}</div>
  </div>;
}

export function ReportingEvidence({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const [focus, setFocus] = useState(1);
  const id = useId();
  const layers = [
    { name: "Oracle", label: fr ? "Données" : "Data", detail: fr ? "Les données financières alimentent les vues de suivi des Comptes des Services de l’État." : "Financial data feeds monitoring views for the State Service Accounts.", tags: fr ? "Comptes · données financières" : "Accounts · financial data" },
    { name: "Spring Boot", label: "API", detail: fr ? "L’authentification JWT et les rôles encadrent l’accès aux fonctionnalités de l’application." : "JWT authentication and user roles control access to application features.", tags: fr ? "JWT · accès par rôle" : "JWT · role-based access" },
    { name: "Angular", label: fr ? "Interface" : "Interface", detail: fr ? "Des filtres dynamiques pour explorer les tableaux de bord, puis exporter les rapports en Excel." : "Dynamic filters to explore dashboards, then export reports to Excel.", tags: fr ? "Filtres · tableaux de bord · Excel" : "Filters · dashboards · Excel" },
  ];
  return <div className={styles.reportingEvidence} data-evidence="architecture">
    <div className={styles.fileBar}><span>cse / <b>system architecture</b></span><span>{fr ? "Explorer les couches" : "Explore the layers"}</span></div>
    <div className={styles.architecture} role="group" aria-label={fr ? "Couches de l’architecture" : "Architecture layers"}>
      {layers.map((layer, index) => <button key={layer.name} className={styles.layer} type="button" aria-pressed={focus === index} aria-controls={id} onClick={() => setFocus(index)}><span className={styles.layerIndex}>0{index + 1} / {layer.label}</span><strong>{layer.name}</strong><span className={styles.layerTags}>{layer.tags}</span><span className={styles.layerPort} aria-hidden="true" /></button>)}
      <span className={styles.connection} aria-hidden="true"><i style={{ left: `${focus * 33.333}%` }} /></span>
    </div>
    <div id={id} className={styles.architectureNote} aria-live="polite"><span aria-hidden="true">↳</span><p>{layers[focus].detail}</p></div>
    <div className={styles.evidenceFoot}>{fr ? "Architecture illustrative · aucun écran interne ni donnée financière publié" : "Illustrative architecture · no internal screens or financial data published"}</div>
  </div>;
}

function CaseContent({ project, locale, index }: { project: Project; locale: Locale; index: number }) {
  const fr = locale === "fr";
  const rag = project.slug !== "reporting-cse";
  return <>
    <header className={styles.caseHeading} data-case-reveal>
      <div className={styles.caseMeta}><span>{rag ? (fr ? "INGÉNIERIE LOGICIELLE · TELEPAC" : "SOFTWARE ENGINEERING · TELEPAC") : (fr ? "STAGE PFE · TGR" : "FINAL-YEAR INTERNSHIP · TGR")}</span><span>{rag ? (fr ? "Juil — Sept 2026 · Casablanca" : "Jul — Sep 2026 · Casablanca") : (fr ? "Avr — Juil 2025 · Rabat" : "Apr — Jul 2025 · Rabat")}</span></div>
      <div className={styles.caseTitleRow}><h3>{rag ? (fr ? "Les documents deviennent des réponses." : "Turning documents into answers.") : (fr ? "Les données deviennent lisibles." : "Making financial data readable.")}</h3><span className={styles.caseNumber} aria-hidden="true">0{index + 1}</span></div>
      <p className={styles.projectLabel}>{project.title} <span aria-hidden="true">/</span> {rag ? "Local RAG system" : "Full-stack reporting"}</p>
    </header>
    <div className={styles.evidenceStage} data-case-reveal>{rag ? <SourceEvidence locale={locale} /> : <ReportingEvidence locale={locale} />}</div>
    <div className={styles.brief} data-case-reveal>
      <div><span className={styles.microLabel}>{fr ? "01 / Le besoin" : "01 / The challenge"}</span><p>{project.sections[0]?.body}</p></div>
      <div><span className={styles.microLabel}>{fr ? "02 / Mon travail" : "02 / My contribution"}</span><p>{project.sections[1]?.body}</p></div>
      <div className={styles.techs}><span className={styles.microLabel}>{fr ? "03 / Les outils, leur rôle" : "03 / Tools with a purpose"}</span><dl>{project.technicalHighlights.map(tech => <div key={tech.name}><dt>{tech.name}</dt><dd>{tech.purpose}</dd></div>)}</dl></div>
    </div>
    <footer className={styles.caseFooter} data-case-reveal><span>{project.role}</span><Link href={`/work/${project.slug}`} className={styles.caseLink}>{fr ? "Explorer l’étude de cas" : "Explore the case study"}<span aria-hidden="true">↗</span></Link></footer>
  </>;
}

export function InternshipShowcase({ projects, locale }: ShowcaseProps) {
  const fr = locale === "fr";
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();

  useGSAP(() => {
    const element = root.current;
    if (element) element.dataset.ready = "true";
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-intro-reveal]", { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: .85, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 82%", once: true } });
      gsap.fromTo("[data-reflection]", { xPercent: -45, rotate: -20 }, { xPercent: 35, rotate: 10, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: .8 } });
    });
    return () => { media.revert(); if (element) delete element.dataset.ready; };
  }, { scope: root });

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const panel = root.current?.querySelector('[role="tabpanel"]:not([hidden])');
      if (!panel) return;
      gsap.fromTo(panel.querySelectorAll("[data-case-reveal]"), { y: 22, opacity: .3 }, { y: 0, opacity: 1, duration: .65, stagger: .065, ease: "power3.out", clearProps: "transform,opacity" });
      gsap.fromTo(panel.querySelector('[data-evidence]'), { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: .75, ease: "power3.inOut", clearProps: "clipPath" });
    });
    ScrollTrigger.refresh();
    return () => media.revert();
  }, { scope: root, dependencies: [active], revertOnUpdate: true });

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % projects.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + projects.length) % projects.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = projects.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    root.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }

  function moveReflection(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--reflection-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
  }

  return <div ref={root} className={styles.showcase} data-internships onPointerMove={moveReflection} onPointerLeave={event => event.currentTarget.style.removeProperty("--reflection-x")}>
    <div className={styles.reflection} data-reflection aria-hidden="true" />
    <header className={styles.heading}>
      <div className={styles.headingMeta} data-intro-reveal><p>01 / {fr ? "EXPÉRIENCES EN ENTREPRISE" : "INDUSTRY EXPERIENCE"}</p><span>{fr ? "DEUX STAGES · DU CONCRET" : "TWO INTERNSHIPS · REAL WORK"}</span></div>
      <h2 id="projects-title" data-intro-reveal>{fr ? "Du besoin" : "From a need"}<br /><em>{fr ? "au système." : "to a system."}</em></h2>
      <p className={styles.headingNote} data-intro-reveal>{fr ? "Du code, des choix techniques, des usages réels. Deux expériences à explorer." : "Code, engineering decisions, real use cases. Two experiences to explore."}</p>
    </header>
    <div className={styles.selector} role="tablist" aria-label={fr ? "Choisir un stage" : "Choose an internship"} data-intro-reveal>
      {projects.map((project, index) => <button key={project.slug} id={`${id}-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls={`${id}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}><span className={styles.selectorNumber}>0{index + 1}</span><span><strong>{project.slug === "reporting-cse" ? "Trésorerie Générale du Royaume" : "Telepac Technology"}</strong><small>{project.slug === "reporting-cse" ? (fr ? "Reporting financier" : "Financial reporting") : (fr ? "Intelligence documentaire" : "Document intelligence")}</small></span><span className={styles.selectorYear}>{project.year} <span aria-hidden="true">↗</span></span></button>)}
    </div>
    {projects.map((project, index) => <div key={project.slug} id={`${id}-panel-${index}`} role="tabpanel" tabIndex={0} aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} className={styles.case} data-case={project.slug}><CaseContent project={project} locale={locale} index={index} /></div>)}
  </div>;
}
