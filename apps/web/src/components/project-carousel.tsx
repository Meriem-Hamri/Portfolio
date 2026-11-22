"use client";

import Link from "next/link";
import { useState } from "react";
import { ProjectVisual } from "./project-visual";
import type { Locale } from "@/lib/locale";
import type { Project } from "@/types/project";

/** Featured projects, one large slide at a time; buttons and dots, no autoplay. */
export function ProjectCarousel({ projects, locale }: { projects: readonly Project[]; locale: Locale }) {
  const [index, setIndex] = useState(0);
  const fr = locale === "fr";
  const project = projects[index];
  const go = (delta: number) => setIndex(value => (value + delta + projects.length) % projects.length);
  return <section className="carousel" aria-roledescription="carousel" aria-label={fr ? "Projets principaux" : "Featured projects"}>
    <div className={`carousel__slide tone-${project.tone}`} key={project.slug} aria-live="polite">
      <div className="carousel__visual"><ProjectVisual kind={project.visual} locale={locale} /></div>
      <div className="carousel__text">
        <p className="kicker">{project.tag}{project.year ? ` · ${project.year}` : ""}</p>
        <h3 className="title">{project.title}</h3>
        <p className="carousel__headline"><span>{project.headline[0]}</span> <span>{project.headline[1]}</span></p>
        <p>{project.summary}</p>
        <p className="carousel__stack">{project.stack.join("  ·  ")}</p>
        <div className="carousel__links">
          <Link className="btn btn--solid" href={`/work/${project.slug}`}>{fr ? "Lire l’étude de cas" : "Read the case study"} <span className="arrow" aria-hidden="true">→</span></Link>
          {project.repositoryUrl && <a className="link link--quiet" href={project.repositoryUrl} target="_blank" rel="noreferrer">{fr ? "Code source" : "Source code"} <span className="arrow arrow--out" aria-hidden="true">↗</span></a>}
        </div>
      </div>
    </div>
    <div className="carousel__controls">
      <button type="button" className="carousel__arrow" onClick={() => go(-1)} aria-label={fr ? "Projet précédent" : "Previous project"}>←</button>
      <div className="carousel__dots">{projects.map((item, i) => <button key={item.slug} type="button" aria-label={item.title} aria-current={i === index} onClick={() => setIndex(i)} />)}</div>
      <button type="button" className="carousel__arrow" onClick={() => go(1)} aria-label={fr ? "Projet suivant" : "Next project"}>→</button>
    </div>
  </section>;
}
