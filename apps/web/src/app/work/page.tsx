import type { Metadata } from "next";
import { ArrowLink } from "@/components/arrow-link";
import { getProjects } from "@/lib/projects";
import { getLocale, pick } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: pick(locale, "Projets", "Work"), description: pick(locale, "Stages et projets logiciels de Meriem Hamri.", "Meriem Hamri's internships and software projects.") };
}

export default async function WorkPage() {
  const locale = await getLocale();
  const projects = await getProjects(locale);
  const internships = projects.filter(project => project.kind === "internship");
  const other = projects.filter(project => project.kind !== "internship");
  return <section className="work-page"><div className="shell">
    <header className="page-intro page-intro--work"><p className="eyebrow">{pick(locale, "Portfolio", "Portfolio")}</p><h1>{pick(locale, "Des projets.", "Projects.")}<br />{pick(locale, "Des contextes réels.", "Real contexts.")}</h1><p>{pick(locale, "Deux stages en entreprise, puis des projets menés en équipe ou en autonomie. Chaque étude distingue ce qui est vérifié de ce qui reste à montrer.", "Two industry internships, followed by team and independent projects. Each case study separates verified facts from material still to be shown.")}</p></header>
    <div className="work-group"><p className="eyebrow">{pick(locale, "Expérience en entreprise", "Industry experience")}</p>
      {internships.map((project,index) => <article className="work-feature" key={project.slug}><div className="work-feature__index">0{index + 1} / {project.year}</div><div><p>{project.organization}</p><h2>{project.title}</h2><p>{project.summary}</p><div className="work-feature__reading"><div><span>{pick(locale, "Problématique", "Challenge")}</span><p>{project.sections[0]?.body}</p></div><div><span>{pick(locale, "Réponse technique", "Technical response")}</span><p>{project.sections[1]?.body}</p></div></div><ul className="tech-line">{project.stack.slice(0,4).map(tech => <li key={tech}>{tech}</li>)}</ul><ArrowLink href={`/work/${project.slug}`}>{pick(locale, "Lire l’étude de cas", "Read the case study")}</ArrowLink></div></article>)}
    </div>
    <div className="work-group work-group--other"><p className="eyebrow">{pick(locale, "Projets d’équipe et personnels", "Team and independent projects")}</p>
      {other.map((project,index) => <article className="work-feature" key={project.slug}><div className="work-feature__index">0{index + 3}</div><div><p>{project.eyebrow}</p><h2>{project.title}</h2><p>{project.summary}</p><ArrowLink href={`/work/${project.slug}`}>{pick(locale, "Découvrir", "Explore")}</ArrowLink></div></article>)}
    </div>
  </div></section>;
}
