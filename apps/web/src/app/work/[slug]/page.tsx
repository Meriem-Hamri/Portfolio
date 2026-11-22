import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseReading } from "@/components/case-reading";
import { Iris } from "@/components/iris";
import { ProjectArchitecture } from "@/components/project-architecture";
import { ProjectVisual } from "@/components/project-visual";
import { RagGallery } from "@/components/rag-gallery";
import { SiteFooter } from "@/components/site-footer";
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

function Row({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return <section className={`cs-row ${wide ? "cs-row--wide" : ""}`}>
    <h2 className="cs-row__label" data-reveal>{label}</h2>
    <div className="cs-row__body" data-reveal style={{ "--d": 1 } as React.CSSProperties}>{children}</div>
  </section>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const project = await getProjectBySlug(slug, locale);
  if (!project) notFound();
  const projects = await getProjects(locale);
  const index = projects.findIndex(item => item.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const fr = locale === "fr";

  const facts = [
    { label: fr ? "Rôle" : "Role", value: project.role },
    { label: fr ? "Période" : "Period", value: project.period },
    { label: fr ? "Contexte" : "Context", value: project.organization ?? (project.kind === "personal" ? (fr ? "Projet personnel" : "Personal project") : (fr ? "Projet d’équipe" : "Team project")) },
    { label: fr ? "Collaboration" : "Collaboration", value: project.credit },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  const product = <div className="shell">
    <Row label={fr ? "Le besoin" : "The need"}><p className="cs-lead">{project.problem}</p></Row>
    <Row label={fr ? "Ce que j’ai réalisé" : "What I built"}>
      <p>{project.solution}</p>
      <ol className="cs-list">{project.highlights.map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
    </Row>
    {project.visual === "rag" && <Row label={fr ? "Les écrans" : "The screens"} wide><RagGallery locale={locale} /></Row>}
    {project.flow.length > 0 && <Row label={fr ? "Le parcours" : "The journey"} wide>
      <ol className="cs-flow">{project.flow.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, "0")}</span>{step}</li>)}</ol>
    </Row>}
  </div>;

  const engineering = <div className="shell">
    <Row label="Architecture" wide><ProjectArchitecture slug={project.slug} locale={locale} /></Row>
    {project.decisions.length > 0 && <Row label={fr ? "Choix techniques" : "Technical choices"} wide>
      <div className="cs-decisions">{project.decisions.map(decision => <div key={decision.technology} className="cs-decision">
        <p className="cs-decision__tech">{decision.technology}</p>
        <h3>{decision.title}</h3>
        <p>{decision.body}</p>
        <p className="cs-decision__watch"><strong>{fr ? "Point de vigilance" : "Watch point"}</strong> {decision.watch}</p>
      </div>)}</div>
    </Row>}
    <Row label={fr ? "Améliorations envisagées" : "Next improvements"}>
      <ul className="cs-list cs-list--plain">{project.nextSteps.map(item => <li key={item}>{item}</li>)}</ul>
    </Row>
    <Row label="Stack"><p className="cs-stack">{project.stack.join(" / ")}</p>
      {project.repositoryUrl && <p><a className="link link--accent" href={project.repositoryUrl} target="_blank" rel="noreferrer">{fr ? "Voir le code source" : "View the source code"} <span className="arrow arrow--out" aria-hidden="true">↗</span><span className="sr-only">{fr ? " (nouvel onglet)" : " (new tab)"}</span></a></p>}
    </Row>
  </div>;

  return <article className={`case tone-${project.tone}`}>
    <header className="shell case__head">
      <div className="case__intro">
        <Link className="link link--quiet case__back" href="/#projets"><span className="arrow" aria-hidden="true">←</span> {fr ? "Tous les projets" : "All projects"}</Link>
        <p className="kicker" data-enter>{project.tag}{project.year ? ` · ${project.year}` : ""}</p>
        <h1 className="case__title title lines"><span className="line"><span>{project.title}</span></span></h1>
        <p className="case__headline" data-enter style={{ "--d": 1 } as React.CSSProperties}><span>{project.headline[0]}</span> <span>{project.headline[1]}</span></p>
        <p className="case__summary" data-enter style={{ "--d": 2 } as React.CSSProperties}>{project.summary}</p>
      </div>
      <aside className="case__card" data-enter style={{ "--d": 2 } as React.CSSProperties}>
        <div className="case__number"><span className="kicker">{fr ? "Projet" : "Project"}</span><span className="title">{String(index + 1).padStart(2, "0")}</span></div>
        <dl className="case__facts">{facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
        <span className="case__card-strip" aria-hidden="true"><i /></span>
      </aside>
    </header>

    <div className="shell">
      <div className="case__stage" data-enter style={{ "--d": 3 } as React.CSSProperties}>
        <Iris><span className="case__stage-inner"><ProjectVisual kind={project.visual} locale={locale} large /></span></Iris>
      </div>
    </div>

    <CaseReading product={product} engineering={engineering} labels={{
      group: fr ? "Lecture de l’étude de cas" : "Case study reading",
      product: fr ? "Produit" : "Product",
      engineering: fr ? "Ingénierie" : "Engineering",
      productHint: fr ? "Besoin, fonctionnalités, écrans" : "Need, features, screens",
      engineeringHint: fr ? "Architecture, choix, suites" : "Architecture, choices, next steps",
    }} />

    <Link href={`/work/${next.slug}`} className={`case__next tone-${next.tone}`}>
      <span className="shell case__next-inner">
        <span className="kicker">{fr ? "Projet suivant" : "Next project"}</span>
        <span className="case__next-title title">{next.title} <span className="arrow" aria-hidden="true">→</span></span>
        <span className="case__next-line">{next.headline[0]} {next.headline[1]}</span>
      </span>
      <span className="case__next-strip" aria-hidden="true" />
    </Link>
    <SiteFooter locale={locale} />
  </article>;
}
