import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const project = await getProjectBySlug(slug, locale);
  if (!project) notFound();
  const projects = await getProjects(locale);
  const index = projects.findIndex(item => item.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const fr = locale === "fr";
  let n = 0;
  const num = () => `(${String(++n).padStart(2, "0")})`;

  const facts = [
    { label: fr ? "Rôle" : "Role", value: project.role },
    { label: fr ? "Période" : "Period", value: project.period },
    { label: fr ? "Contexte" : "Context", value: project.organization ?? (project.kind === "personal" ? (fr ? "Projet personnel" : "Personal project") : (fr ? "Projet d’équipe" : "Team project")) },
    { label: fr ? "Équipe" : "Team", value: project.credit },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  return <article className={`case case--${project.color}`}>
    {/* Hero */}
    <header className="case__hero">
      <div className="shell">
        <Link className="case__back" href="/#projets"><span aria-hidden="true">←</span> {fr ? "Tous les projets" : "All projects"}</Link>
        <p className="case__tag" data-hero-fade>{String(index + 1).padStart(2, "0")} — {project.tag}</p>
        <h1 className="case__title display">
          <span className="line"><span style={{ "--l": 0 } as React.CSSProperties}>{project.title}</span></span>
        </h1>
        <p className="case__pitch" data-hero-fade style={{ "--d": 1 } as React.CSSProperties}>{project.pitch}</p>
        <dl className="case__facts" data-hero-fade style={{ "--d": 2 } as React.CSSProperties}>
          {facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
          <div><dt>Stack</dt><dd>{project.stack.join(", ")}</dd></div>
        </dl>
      </div>
    </header>

    <div className="shell case__visual" data-hero-fade style={{ "--d": 3 } as React.CSSProperties}>
      <ProjectVisual kind={project.visual} locale={locale} large />
    </div>

    {/* Problem */}
    <section className="shell case__section" aria-labelledby="problem-title">
      <div className="case__label" data-reveal><p className="eyebrow">{num()}</p><h2 id="problem-title">{fr ? "Le problème" : "The problem"}</h2></div>
      <p className="case__lead" data-reveal>{project.problem}</p>
    </section>

    {/* Solution + highlights */}
    <section className="shell case__section" aria-labelledby="solution-title">
      <div className="case__label" data-reveal><p className="eyebrow">{num()}</p><h2 id="solution-title">{fr ? "Ce que j’ai construit" : "What I built"}</h2></div>
      <div>
        <p className="case__lead" data-reveal>{project.solution}</p>
        <ol className="case__highlights">
          {project.highlights.map((item, i) => <li key={item} data-reveal style={{ "--d": i } as React.CSSProperties}><span>{String(i + 1).padStart(2, "0")}</span>{item}</li>)}
        </ol>
      </div>
    </section>

    {project.visual === "rag" && <section className="shell case__section case__section--wide" aria-labelledby="screens-title">
      <div className="case__label" data-reveal><p className="eyebrow">{num()}</p><h2 id="screens-title">{fr ? "L’application, en vrai" : "The real application"}</h2></div>
      <RagGallery locale={locale} />
    </section>}

    {/* Flow */}
    {project.flow.length > 0 && <section className="case__flow" aria-labelledby="flow-title">
      <div className="shell">
        <div className="case__label" data-reveal><p className="eyebrow">{num()}</p><h2 id="flow-title">{fr ? "Comment ça marche" : "How it works"}</h2></div>
        <ol className="flow">
          {project.flow.map((step, i) => <li key={step} data-reveal style={{ "--d": i } as React.CSSProperties}><span>{String(i + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}
        </ol>
      </div>
    </section>}

    {/* Architecture */}
    <section className="shell case__section case__section--wide" aria-labelledby="architecture-title">
      <div className="case__label" data-reveal><p className="eyebrow">{num()}</p><h2 id="architecture-title">{fr ? "Architecture" : "Architecture"}</h2></div>
      <div data-reveal><ProjectArchitecture slug={project.slug} locale={locale} /></div>
    </section>

    {/* Decisions */}
    {project.decisions.length > 0 && <section className="shell case__section case__section--wide" aria-labelledby="decisions-title">
      <div className="case__label" data-reveal><p className="eyebrow">{num()}</p><h2 id="decisions-title">{fr ? "Décisions techniques" : "Technical decisions"}</h2></div>
      <div className="decisions">
        {project.decisions.map((decision, i) => <div key={decision.technology} className="decision" data-reveal style={{ "--d": i } as React.CSSProperties}>
          <p className="decision__tech">{decision.technology}</p>
          <h3>{decision.title}</h3>
          <p>{decision.body}</p>
          <p className="decision__watch"><strong>{fr ? "Point d’attention" : "Watch out"}</strong>{decision.watch}</p>
        </div>)}
      </div>
    </section>}

    {/* Links */}
    {(project.repositoryUrl || project.liveUrl) && <section className="shell case__cta" data-reveal>
      <p>{fr ? "Envie de voir le code ?" : "Want to see the code?"}</p>
      <div className="hero__actions">
        {project.repositoryUrl && <a className="btn" href={project.repositoryUrl} target="_blank" rel="noreferrer">{fr ? "Voir sur GitHub" : "View on GitHub"} <span className="btn__icon btn__icon--up" aria-hidden="true">↗</span></a>}
        {project.liveUrl && <a className="btn btn--ghost" href={project.liveUrl} target="_blank" rel="noreferrer">{fr ? "Ouvrir la démo" : "Open the demo"} <span className="btn__icon btn__icon--up" aria-hidden="true">↗</span></a>}
      </div>
    </section>}

    {/* Next project */}
    <Link href={`/work/${next.slug}`} className={`case__next case--${next.color}`}>
      <span className="shell">
        <span className="eyebrow">{fr ? "Projet suivant" : "Next project"}</span>
        <span className="case__next-title display">{next.title} <span aria-hidden="true">→</span></span>
        <span className="case__next-pitch">{next.pitch}</span>
      </span>
    </Link>
    <SiteFooter locale={locale} />
  </article>;
}
