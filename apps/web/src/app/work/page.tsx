import type { Metadata } from "next";
import { ArrowLink } from "@/components/arrow-link";
import { ProjectVisual } from "@/components/project-visual";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projets",
  description: "Les projets logiciels sélectionnés de Meriem Hamri.",
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <section className="work-page">
      <div className="shell">
        <header className="page-intro page-intro--work">
          <p className="eyebrow">Projets sélectionnés</p>
          <h1>Comprendre le besoin,<br />puis montrer la construction.</h1>
          <p>Chaque entrée distingue les faits vérifiés des informations encore à réunir. Aucun résultat, visuel ou rôle n’est supposé.</p>
        </header>

        <div className="work-index">
          {projects.map((project, index) => (
            <article className="work-row" key={project.slug}>
              <div className="work-row__number">0{index + 1}</div>
              <div className="work-row__visual">
                <ProjectVisual kind={project.slug === "reporting-cse" ? "reporting" : "rag"} compact />
              </div>
              <div className="work-row__content">
                <div className="work-row__topline">
                  <p className="eyebrow">{project.eyebrow}</p>
                  <span className={`status status--${project.status}`}>
                    {project.status === "documented" ? "Dépôt consulté" : "À compléter"}
                  </span>
                </div>
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
                <ArrowLink href={`/work/${project.slug}`}>Ouvrir le projet</ArrowLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
