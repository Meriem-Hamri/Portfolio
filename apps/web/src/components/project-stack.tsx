"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ProjectVisual } from "./project-visual";
import type { Locale } from "@/lib/locale";
import type { Project } from "@/types/project";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Sticky stacked cards: each card pins under the header and the next one slides
 * over it, while the previous card shrinks and dims. Native scroll, no hijacking.
 */
export function ProjectStack({ projects, locale }: { projects: readonly Project[]; locale: Locale }) {
  const root = useRef<HTMLOListElement>(null);
  const fr = locale === "fr";

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference) and (min-width: 901px) and (min-height: 640px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root.current);
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) return;
        const inner = card.querySelector<HTMLElement>("[data-card-inner]");
        gsap.to(inner, {
          scale: 0.9 + index * 0.012,
          "--dim": 0.35,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
        });
      });
    });
    return () => media.revert();
  }, { scope: root });

  return <ol ref={root} className="stack">
    {projects.map((project, index) => {
      const meta = [project.tag, project.year].filter(Boolean).join(" · ");
      return <li key={project.slug} id={`projet-${project.slug}`} className={`pcard pcard--${project.color}`} style={{ "--i": index } as React.CSSProperties} data-card>
        <article className="pcard__inner" data-card-inner aria-labelledby={`title-${project.slug}`}>
          <div className="pcard__content">
            <div className="pcard__top"><span className="pcard__num">{String(index + 1).padStart(2, "0")}</span><span>{meta}</span></div>
            <h3 id={`title-${project.slug}`} className="pcard__title display">{project.title}</h3>
            <p className="pcard__pitch">{project.pitch}</p>
            <p className="pcard__summary">{project.summary}</p>
            <ul className="pcard__badges">{project.badges.map(badge => <li key={badge} className="chip">{badge}</li>)}</ul>
            <p className="pcard__stack">{project.stack.join("  ·  ")}</p>
            <div className="pcard__actions">
              <Link className="btn" href={`/work/${project.slug}`}>{fr ? "Voir l’étude de cas" : "Read the case study"} <span className="btn__icon" aria-hidden="true">→</span></Link>
              {project.repositoryUrl && <a className="pcard__link" href={project.repositoryUrl} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span><span className="sr-only">{fr ? " (nouvel onglet)" : " (new tab)"}</span></a>}
            </div>
          </div>
          <div className="pcard__visual"><ProjectVisual kind={project.visual} locale={locale} /></div>
        </article>
      </li>;
    })}
  </ol>;
}
