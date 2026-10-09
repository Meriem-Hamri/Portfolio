import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/arrow-link";
import { ProjectVisual } from "@/components/project-visual";
import { getProjectBySlug, getProjects } from "@/lib/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Projet introuvable" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="case-study">
      <header className="case-hero">
        <div className="shell case-hero__grid">
          <div>
            <Link className="back-link" href="/work">← Tous les projets</Link>
            <p className="eyebrow">{project.eyebrow}</p>
            <h1>{project.title}</h1>
            <p className="case-hero__summary">{project.summary}</p>
          </div>
          <dl className="project-facts">
            <div><dt>Année</dt><dd>{project.year ?? "À confirmer"}</dd></div>
            <div><dt>Rôle</dt><dd>{project.role ?? "À confirmer"}</dd></div>
            <div><dt>État</dt><dd>{project.status === "documented" ? "Dépôt public consulté" : "Contenu à compléter"}</dd></div>
          </dl>
        </div>
      </header>

      <div className="case-visual shell">
        <ProjectVisual kind={project.slug === "reporting-cse" ? "reporting" : "rag"} />
      </div>

      <section className="case-overview shell" aria-labelledby="overview-title">
        <div>
          <p className="eyebrow">Vue d’ensemble</p>
          <h2 id="overview-title">Ce que le projet permet de comprendre aujourd’hui.</h2>
        </div>
        <div>
          <p className="case-overview__lead">{project.description}</p>
          {project.repositoryUrl && (
            <ArrowLink href={project.repositoryUrl} external>Consulter le dépôt GitHub</ArrowLink>
          )}
        </div>
      </section>

      {project.flow.length > 0 && (
        <section className="flow-section" aria-labelledby="flow-title">
          <div className="shell">
            <p className="eyebrow">Flux principal</p>
            <h2 id="flow-title">Du document à la réponse sourcée</h2>
            <ol className="flow-list">
              {project.flow.map((step, index) => (
                <li key={step}><span>0{index + 1}</span><p>{step}</p></li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="case-sections shell" aria-label="Détails du projet">
        {project.sections.map((section, index) => (
          <section className="case-section" key={section.title}>
            <p className="case-section__number">0{index + 1}</p>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </section>

      <section className="stack-section">
        <div className="shell stack-section__grid">
          <div><p className="eyebrow">Technologies</p><h2>Une lecture de la stack, sans accumulation de badges.</h2></div>
          <ul>{project.stack.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        </div>
      </section>

      <section className="missing-section">
        <div className="shell missing-section__grid">
          <div><p className="eyebrow eyebrow--light">À compléter</p><h2>Ce qui manque encore pour une étude de cas complète.</h2></div>
          <ul>{project.missingInformation.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>
    </article>
  );
}
