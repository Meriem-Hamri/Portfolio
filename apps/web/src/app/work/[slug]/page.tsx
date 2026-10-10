import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/arrow-link";
import { ProjectVisual } from "@/components/project-visual";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { getLocale, pick } from "@/lib/locale";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const project = await getProjectBySlug(slug, locale);
  return project ? { title: project.title, description: project.summary } : { title: pick(locale, "Projet introuvable", "Project not found") };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const project = await getProjectBySlug(slug, locale);
  if (!project) notFound();
  return <article className="case-study">
    <header className="case-hero"><div className="shell case-hero__grid">
      <div><Link className="back-link" href="/work">← {pick(locale, "Tous les projets", "All projects")}</Link><p className="eyebrow">{project.eyebrow}</p><h1>{project.title}</h1><p className="case-hero__summary">{project.summary}</p></div>
      <dl className="project-facts"><div><dt>{pick(locale, "Contexte", "Context")}</dt><dd>{project.organization ?? pick(locale, "Projet d’équipe", "Team project")}</dd></div><div><dt>{pick(locale, "Période", "Period")}</dt><dd>{project.period ?? pick(locale, "À préciser", "To confirm")}</dd></div><div><dt>{pick(locale, "Rôle", "Role")}</dt><dd>{project.role ?? pick(locale, "Contribution à préciser", "Contribution to specify")}</dd></div></dl>
    </div></header>
    {project.kind === "internship" && <div className="case-visual shell"><ProjectVisual kind={project.slug === "reporting-cse" ? "reporting" : "rag"} locale={locale} /></div>}
    <section className="case-overview shell" aria-labelledby="overview-title"><div><p className="eyebrow">{pick(locale, "Vue d’ensemble", "Overview")}</p><h2 id="overview-title">{pick(locale, "Le besoin et la solution.", "The need and the solution.")}</h2></div><div><p className="case-overview__lead">{project.description}</p>{project.repositoryUrl && <ArrowLink href={project.repositoryUrl} external>{pick(locale, "Consulter le dépôt", "View repository")}</ArrowLink>}{project.liveUrl && <p className="case-live"><ArrowLink href={project.liveUrl} external>{pick(locale, "Ouvrir la démo", "Open demo")}</ArrowLink></p>}</div></section>
    {project.flow.length > 0 && <section className="flow-section" aria-labelledby="flow-title"><div className="shell"><p className="eyebrow">{pick(locale, "Parcours", "Flow")}</p><h2 id="flow-title">{pick(locale, "Comment le système fonctionne.", "How the system works.")}</h2><ol className="flow-list">{project.flow.map((step,index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol></div></section>}
    <section className="case-sections shell" aria-label={pick(locale, "Détails du projet", "Project details")}>{project.sections.map((section,index) => <section className="case-section" key={section.title}><p className="case-section__number">0{index + 1}</p><h2>{section.title}</h2><p>{section.body}</p></section>)}</section>
    <section className="stack-section"><div className="shell stack-section__grid"><div><p className="eyebrow">Stack</p><h2>{pick(locale, "Les outils derrière le projet.", "The tools behind the project.")}</h2></div><ul>{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul></div></section>
    <section className="missing-section"><div className="shell missing-section__grid"><div><p className="eyebrow eyebrow--light">{pick(locale, "À documenter", "To document")}</p><h2>{pick(locale, "La suite de cette étude de cas.", "Next for this case study.")}</h2></div><ul>{project.missingInformation.map(item => <li key={item}>{item}</li>)}</ul></div></section>
  </article>;
}
