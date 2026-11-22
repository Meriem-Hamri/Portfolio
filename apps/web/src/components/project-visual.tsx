"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/locale";
import type { ProjectVisualKind } from "@/types/project";

/** Toggles `data-play` once the element is visible, so CSS can run its entrance. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, inView] as const;
}

function WindowBar({ label, badge }: { label: string; badge?: string }) {
  return <div className="win__bar"><i /><i /><i /><span>{label}</span>{badge && <b>{badge}</b>}</div>;
}

function RagVisual({ locale, large }: { locale: Locale; large?: boolean }) {
  const [ref, play] = useInView<HTMLDivElement>();
  const fr = locale === "fr";
  return <div ref={ref} className="v v-rag" data-play={play}>
    <div className="win v-rag__win">
      <WindowBar label="assistant-ai · local" />
      <Image src="/images/rag/library.png" width={1916} height={898} alt={fr ? "Capture réelle : bibliothèque documentaire de l’assistant" : "Real screenshot: the assistant’s document library"} sizes={large ? "(max-width: 900px) 100vw, 1100px" : "(max-width: 900px) 92vw, 55vw"} priority={large} />
    </div>
    <div className="v-rag__chat" aria-hidden="true">
      <div className="bubble bubble--q">{fr ? "Comment préparer une revue de projet ?" : "How do I prepare a project review?"}</div>
      <div className="bubble bubble--a">
        <span className="typing"><i /><i /><i /></span>
        <p>{fr ? "Préparez une synthèse des avancées, les points bloquants et les décisions à prendre." : "Prepare a progress summary, the blockers and the decisions to make."}</p>
        <span className="src">▤ guide-equipe.pdf · p. 1</span>
      </div>
    </div>
  </div>;
}

const reportRows = [
  { id: "A", cat: "digital", budget: 80, used: 62 },
  { id: "B", cat: "training", budget: 45, used: 18 },
  { id: "C", cat: "digital", budget: 60, used: 51 },
  { id: "D", cat: "training", budget: 38, used: 29 },
  { id: "E", cat: "digital", budget: 72, used: 34 },
  { id: "F", cat: "training", budget: 55, used: 47 },
] as const;

function ReportingVisual({ locale }: { locale: Locale }) {
  const [ref, play] = useInView<HTMLDivElement>();
  const [filter, setFilter] = useState<"all" | "digital" | "training">("all");
  const fr = locale === "fr";
  const rows = reportRows.filter(row => filter === "all" || row.cat === filter);
  const budget = rows.reduce((sum, row) => sum + row.budget, 0);
  const used = rows.reduce((sum, row) => sum + row.used, 0);
  const filters = [
    { id: "all", label: fr ? "Tous" : "All" },
    { id: "digital", label: fr ? "Numérique" : "Digital" },
    { id: "training", label: fr ? "Formation" : "Training" },
  ] as const;
  return <div ref={ref} className="v v-rep" data-play={play}>
    <div className="win">
      <WindowBar label="reporting · cse" badge={fr ? "Démo · données fictives" : "Demo · fictional data"} />
      <div className="rep">
        <div className="rep__head">
          <div><small>{fr ? "Tableau de bord" : "Dashboard"}</small><strong>{fr ? "Suivi des engagements" : "Commitment tracking"}</strong></div>
          <div className="rep__filters" role="group" aria-label={fr ? "Filtrer la démo" : "Filter the demo"}>
            {filters.map(item => <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}
          </div>
        </div>
        <div className="rep__kpis">
          <div><small>Budget</small><strong>{budget}<em> k</em></strong></div>
          <div><small>{fr ? "Engagé" : "Committed"}</small><strong>{used}<em> k</em></strong></div>
          <div className="rep__rate"><small>{fr ? "Taux" : "Rate"}</small><strong>{Math.round(used / budget * 100)}<em> %</em></strong></div>
        </div>
        <div className="rep__chart" aria-hidden="true">
          {reportRows.map((row, index) => {
            const visible = filter === "all" || row.cat === filter;
            return <div key={row.id} className="rep__col" data-off={!visible} style={{ "--h": `${row.budget}%`, "--u": `${row.used / row.budget * 100}%`, "--i": index } as React.CSSProperties}>
              <span className="rep__bar"><i /></span><small>P-{row.id}</small>
            </div>;
          })}
        </div>
        <div className="rep__foot"><span>{rows.length} {fr ? "programmes" : "programmes"}</span><span className="rep__export">{fr ? "Exporter .xlsx" : "Export .xlsx"} ↓</span></div>
      </div>
    </div>
  </div>;
}

function SkiloVisual({ locale }: { locale: Locale }) {
  const [ref, play] = useInView<HTMLDivElement>();
  const fr = locale === "fr";
  return <div ref={ref} className="v v-skilo" data-play={play} aria-hidden="true">
    <div className="sk-card sk-card--a">
      <div className="sk-avatar">YA</div>
      <div><small>{fr ? "Propose" : "Offers"}</small><strong>Guitare</strong></div>
      <div><small>{fr ? "Cherche" : "Wants"}</small><strong>Python</strong></div>
    </div>
    <div className="sk-match"><span className="sk-line" /><b>Match !</b><span className="sk-line" /></div>
    <div className="sk-card sk-card--b">
      <div className="sk-avatar">SL</div>
      <div><small>{fr ? "Propose" : "Offers"}</small><strong>Python</strong></div>
      <div><small>{fr ? "Cherche" : "Wants"}</small><strong>{fr ? "Guitare" : "Guitar"}</strong></div>
    </div>
    <div className="sk-wallet">
      <span>{fr ? "Crédits de temps" : "Time credits"}</span>
      <strong><span className="sk-old">3</span><span className="sk-new">4</span> h</strong>
      <em>+1 h</em>
    </div>
  </div>;
}

function XploreVisual({ locale }: { locale: Locale }) {
  const [ref, play] = useInView<HTMLDivElement>();
  const fr = locale === "fr";
  const tools = fr
    ? [["Images", "4,8"], ["Code", "4,6"], ["Résumé", "4,3"], ["Voix", "4,5"], ["Traduction", "4,2"], ["Slides", "4,4"]]
    : [["Images", "4.8"], ["Code", "4.6"], ["Summary", "4.3"], ["Voice", "4.5"], ["Translation", "4.2"], ["Slides", "4.4"]];
  return <div ref={ref} className="v v-xplore" data-play={play} aria-hidden="true">
    <div className="win">
      <WindowBar label="xploreia" />
      <div className="xp">
        <div className="xp__search">⌕ <span>{fr ? "Rechercher un outil IA…" : "Search an AI tool…"}</span></div>
        <div className="xp__chips"><b>{fr ? "Tous" : "All"}</b><span>{fr ? "Gratuit" : "Free"}</span><span>{fr ? "Texte" : "Text"}</span><span>Image</span><span>Code</span></div>
        <div className="xp__grid">
          {tools.map(([name, rating], index) => <div key={name} className="xp__tool" style={{ "--i": index } as React.CSSProperties}>
            <span className="xp__icon" />
            <strong>{name}</strong>
            <small>★ {rating}</small>
            {index === 1 && <span className="xp__heart">♥</span>}
          </div>)}
        </div>
      </div>
    </div>
    <div className="xp__playlist">
      <small>Playlist</small>
      <strong>{fr ? "Mes outils dev" : "My dev tools"}</strong>
      <span>3 {fr ? "outils" : "tools"} <b className="xp__plus">+1</b></span>
    </div>
  </div>;
}

function TaskflowVisual({ locale }: { locale: Locale }) {
  const [ref, play] = useInView<HTMLDivElement>();
  const fr = locale === "fr";
  const columns = fr
    ? [{ title: "À faire", cards: [["Maquette login", "MH"], ["Tests API", "SB"]] }, { title: "En cours", cards: [["Filtres tâches", "YA"]] }, { title: "Validé", cards: [["Modèle de données", "MH"], ["Routing", "SB"]] }]
    : [{ title: "To do", cards: [["Login mockup", "MH"], ["API tests", "SB"]] }, { title: "In progress", cards: [["Task filters", "YA"]] }, { title: "Approved", cards: [["Data model", "MH"], ["Routing", "SB"]] }];
  return <div ref={ref} className="v v-task" data-play={play} aria-hidden="true">
    <div className="win">
      <WindowBar label="taskflow" />
      <div className="tf">
        <div className="tf__progress"><span>{fr ? "Avancement du sprint" : "Sprint progress"}</span><b>72 %</b><span className="tf__bar"><i /></span></div>
        <div className="tf__board">
          {columns.map((column, c) => <div key={column.title} className="tf__col">
            <small>{column.title} <em>{column.cards.length}</em></small>
            {column.cards.map(([title, who], index) => <div key={title} className="tf__card" style={{ "--i": c * 2 + index } as React.CSSProperties}>
              <strong>{title}</strong>
              <span><i>{who}</i>{c === 2 && <b className="tf__check">✓</b>}</span>
            </div>)}
          </div>)}
        </div>
      </div>
    </div>
  </div>;
}

export function ProjectVisual({ kind, locale, large = false }: { kind: ProjectVisualKind; locale: Locale; large?: boolean }) {
  switch (kind) {
    case "rag": return <RagVisual locale={locale} large={large} />;
    case "reporting": return <ReportingVisual locale={locale} />;
    case "skilo": return <SkiloVisual locale={locale} />;
    case "xplore": return <XploreVisual locale={locale} />;
    case "taskflow": return <TaskflowVisual locale={locale} />;
  }
}
