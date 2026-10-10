import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyMotion } from "@/components/case-study-motion";
import { ProjectVisual } from "@/components/project-visual";
import { getCaseStudyNarrative } from "@/data/case-study-narratives";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { getLocale, pick } from "@/lib/locale";
import styles from "./case-study.module.css";

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
  const projects = await getProjects(locale);
  const nextProject = projects[(projects.findIndex(item => item.slug === slug) + 1) % projects.length];
  const narrative = getCaseStudyNarrative(project, locale);
  const fr = locale === "fr";

  return <CaseStudyMotion className={styles.caseStudy}>
    <header className={styles.hero}>
      <div className={styles.reflection} data-case-reflection aria-hidden="true" />
      <div className={styles.shell}>
        <Link className={styles.back} href="/work"><span aria-hidden="true">←</span>{fr ? "Tous les projets" : "All projects"}</Link>
        <p className={styles.eyebrow}>{project.eyebrow}</p>
        <h1>{project.title}</h1>
        <p className={styles.headline}>{narrative.headline}</p>
        <dl className={styles.facts}>
          <div><dt>{fr ? "Contexte" : "Context"}</dt><dd>{project.organization ?? (fr ? "Projet d’équipe" : "Team project")}</dd></div>
          <div><dt>{fr ? "Période" : "Period"}</dt><dd>{project.period ?? (fr ? "À documenter" : "To document")}</dd></div>
          <div><dt>{fr ? "Mon rôle" : "My role"}</dt><dd>{project.role ?? (fr ? "Contribution à préciser" : "Contribution to specify")}</dd></div>
        </dl>
        <nav className={styles.index} aria-label={fr ? "Dans cette étude de cas" : "In this case study"}>
          {project.kind === "internship" && <a href="#experience"><span>↗</span>{fr ? "Voir le produit" : "See the product"}</a>}
          <a href="#problematique"><span>01</span>{fr ? "Le besoin" : "The challenge"}</a>
          <a href="#solution"><span>02</span>{fr ? "La solution" : "The solution"}</a>
          <a href="#decisions"><span>03</span>{fr ? "Les choix" : "The decisions"}</a>
          <a href="#bilan"><span>04</span>{fr ? "Le bilan" : "The review"}</a>
        </nav>
      </div>
    </header>

    {project.kind === "internship" && <section id="experience" className={`${styles.product} ${styles.shell}`} aria-labelledby="product-title" data-case-enter>
      <div className={styles.productHeading}><div><p className={styles.eyebrow}>{fr ? "Le produit en action" : "The product in action"}</p><h2 id="product-title">{fr ? "Entrer dans l’expérience." : "Step into the experience."}</h2></div><p>{fr ? "Explorez le parcours avant de découvrir les décisions qui le rendent possible." : "Explore the journey before discovering the decisions that make it possible."}</p></div>
      <ProjectVisual kind={project.slug === "reporting-cse" ? "reporting" : "rag"} locale={locale} />
    </section>}

    <section id="problematique" className={`${styles.chapter} ${styles.shell}`} aria-labelledby="challenge-title" data-case-enter>
      <p className={styles.eyebrow}>01 / {fr ? "Comprendre le besoin" : "Understand the need"}</p>
      <h2 id="challenge-title">{narrative.challengeTitle}</h2>
      <div className={styles.challengeBody}><p>{narrative.challenge}</p><aside><span>{fr ? "L’objectif de conception" : "The design objective"}</span><p>{narrative.objective}</p></aside></div>
    </section>

    <section id="solution" className={styles.solution} aria-labelledby="solution-title">
      <div className={styles.shell}>
        <div data-case-enter><p className={styles.eyebrow}>02 / {fr ? "Concevoir la réponse" : "Design the response"}</p><h2 id="solution-title">{narrative.solutionTitle}</h2><p className={styles.solutionLead}>{narrative.solution}</p></div>
        {project.flow.length > 0 && <div className={styles.flow} data-case-enter>
          <div className={styles.flowTrack} data-case-track aria-hidden="true" />
          <ol aria-label={fr ? "Du besoin au résultat, étape par étape" : "From need to result, step by step"}>{project.flow.map((step, index) => <li key={step}><span aria-hidden="true">0{index + 1}</span><strong>{step}</strong></li>)}</ol>
        </div>}
        <div className={styles.contribution} data-case-enter><p className={styles.eyebrow}>{fr ? "Mon périmètre" : "My scope"}</p><p>{narrative.delivery}</p></div>
      </div>
    </section>

    <section id="decisions" className={`${styles.chapter} ${styles.shell}`} aria-labelledby="decisions-title" data-case-enter>
      <p className={styles.eyebrow}>03 / {fr ? "L’intention derrière la technique" : "The intention behind the technology"}</p>
      <h2 id="decisions-title">{fr ? "Chaque choix a un rôle." : "Every choice has a purpose."}</h2>
      {narrative.decisions.length > 0 ? <>
        <p className={styles.sectionIntro}>{fr ? "Ouvrez une décision pour comprendre son rôle, son intérêt pour le besoin et ce qu’il reste à vérifier." : "Open a decision to understand its role, how it serves the need and what still needs verification."}</p>
        <div className={styles.decisions}>{narrative.decisions.map((decision, index) => <details className={styles.decision} key={decision.technology} open={index === 0}>
          <summary><span className={styles.decisionIndex}>0{index + 1}</span><span><small>{decision.technology}</small><strong>{decision.intent}</strong></span><span className={styles.decisionToggle} aria-hidden="true">+</span></summary>
          <div className={styles.decisionBody}><div><h3>{fr ? "Pourquoi ce choix répond au besoin" : "How this choice serves the need"}</h3><p>{decision.rationale}</p></div><div><h3>{fr ? "Le point de vigilance" : "The consideration"}</h3><p>{decision.consideration}</p></div></div>
        </details>)}</div>
      </> : <p className={styles.sectionIntro}>{fr ? "Les technologies sont documentées dans le dépôt. Le détail des arbitrages et de ma contribution reste à compléter avec des éléments vérifiables." : "The technologies are documented in the repository. Detailed trade-offs and my contribution still need to be supported with verifiable information."}</p>}
      <div className={styles.stack}><span>{fr ? "Environnement technique" : "Technical environment"}</span><ul>{project.stack.map(technology => <li key={technology}>{technology}</li>)}</ul></div>
    </section>

    <section id="bilan" className={styles.review} aria-labelledby="review-title">
      <div className={styles.shell} data-case-enter>
        <p className={styles.eyebrow}>04 / {fr ? "Livrer et vérifier" : "Deliver and verify"}</p>
        <h2 id="review-title">{fr ? "Du concret. Et des limites explicites." : "Real work. Explicit boundaries."}</h2>
        <div className={styles.reviewGrid}><div><h3>{fr ? "Les éléments disponibles" : "Available evidence"}</h3><p>{narrative.evidence}</p><div className={styles.links}>{project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer">{fr ? "Explorer le dépôt" : "Explore the repository"}<span aria-hidden="true">↗</span><span className="sr-only">{fr ? " (nouvel onglet)" : " (new tab)"}</span></a>}{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">{fr ? "Ouvrir la démo" : "Open the demo"}<span aria-hidden="true">↗</span><span className="sr-only">{fr ? " (nouvel onglet)" : " (new tab)"}</span></a>}</div></div><div><h3>{fr ? "La prochaine vérification" : "The next verification"}</h3><ul>{narrative.limits.map(item => <li key={item}>{item}</li>)}</ul></div></div>
      </div>
    </section>

    <footer className={`${styles.next} ${styles.shell}`}>
      <Link href="/work" className={styles.back}><span aria-hidden="true">←</span>{fr ? "Retour aux projets" : "Back to projects"}</Link>
      {nextProject && <Link href={`/work/${nextProject.slug}`} className={styles.nextLink}><span>{fr ? "À découvrir ensuite" : "Explore next"}<strong>{nextProject.title}</strong></span><span aria-hidden="true">↗</span></Link>}
    </footer>
  </CaseStudyMotion>;
}
