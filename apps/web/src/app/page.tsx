import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { ProjectVisual } from "@/components/project-visual";
import { ScrollMotion } from "@/components/scroll-motion";
import { getFeaturedProjects, getProjects } from "@/lib/projects";
import { getLocale, pick } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: "Meriem Hamri · Software engineer", description: pick(locale, "Portfolio de Meriem Hamri : stages en ingénierie logicielle et projets full-stack.", "Meriem Hamri's portfolio: software engineering internships and full-stack projects.") };
}

export default async function HomePage() {
  const locale = await getLocale();
  const internships = await getFeaturedProjects(locale);
  const otherProjects = (await getProjects(locale)).filter(project => !project.featured);
  return (
    <div className="continuous-page">
      <ScrollMotion />
      <section id="accueil" className="editorial-hero" aria-labelledby="intro-title">
        <div className="shell">
          <p className="eyebrow hero-kicker">Meriem Hamri — Software engineer</p>
          <h1 id="intro-title" className="editorial-name"><span>Meriem</span><span className="satin-name">Hamri<span className="satin-specimen" aria-hidden="true" /></span></h1>
          <p className="editorial-intro">{pick(locale, "Je conçois des applications.", "I design and build applications.")}<br />{pick(locale, "Avec de la rigueur dans le code,", "With care in the code,")}<br /><em>{pick(locale, "et de l’attention dans les détails.", "and attention to every detail.")}</em></p>
          <a className="explore-link" href="#projets">{pick(locale, "Explorer mes projets", "Explore my work")} <span aria-hidden="true">↓</span></a>
          <div className="hero-marginalia" aria-hidden="true"><span>{pick(locale, "Code & sensibilité", "Code & sensibility")}</span><span>Nature · Design · Software</span></div>
        </div>
      </section>
      <section id="projets" className="project-chapter" aria-labelledby="projects-title">
        <div className="shell">
          <header className="chapter-heading" data-reveal><p className="eyebrow">{pick(locale, "01 / Les projets", "01 / Selected work")}</p><h2 id="projects-title">{pick(locale, "Deux stages.", "Two internships.")}<br /><em>{pick(locale, "Des systèmes réels.", "Real systems.")}</em></h2><p>{pick(locale, "Des applications conçues dans un contexte professionnel, puis des projets menés en équipe ou en autonomie.", "Applications built in professional settings, followed by team and independent work.")}</p></header>
          {internships.map((project, index) => (
            <article className={`project-story project-story--${index + 1}`} key={project.slug}>
              <header className="project-story__heading" data-reveal>
                <span className="story-number">0{index + 1}</span>
                <p className="eyebrow">{project.organization} · {project.period}</p>
                <h3>{project.title}</h3><p>{project.summary}</p>
              </header>
              <div className="project-stage" data-reveal><ProjectVisual kind={project.slug === "reporting-cse" ? "reporting" : "rag"} locale={locale} /></div>
              <div className="project-story__caption" data-reveal><ul className="tech-line" aria-label={pick(locale, "Technologies", "Technologies")}>{project.stack.slice(0, 4).map(tech => <li key={tech}>{tech}</li>)}</ul><ArrowLink href={`/work/${project.slug}`}>{pick(locale, "Explorer l’étude de cas", "Explore the case study")}</ArrowLink></div>
            </article>
          ))}
          <div className="more-work" data-reveal>
            <div className="more-work__intro"><p className="eyebrow">{pick(locale, "Autres réalisations", "More work")}</p><h3>{pick(locale, "Construire aussi hors du stage.", "Building beyond internships.")}</h3></div>
            <div className="more-work__list">{otherProjects.map((project, index) => <article key={project.slug} className="more-work__item"><span>0{index + 3}</span><div><p>{project.eyebrow}</p><h4>{project.title}</h4><p>{project.summary}</p></div><Link href={`/work/${project.slug}`} aria-label={pick(locale, `Explorer ${project.title}`, `Explore ${project.title}`)}>↗</Link></article>)}</div>
          </div>
          <div className="section-end-link"><ArrowLink href="/work">{pick(locale, "Tous les projets", "All projects")}</ArrowLink></div>
        </div>
      </section>
      <section id="a-propos" className="about-chapter" aria-labelledby="about-title"><div className="shell">
        <header className="chapter-heading" data-reveal><p className="eyebrow">{pick(locale, "02 / À propos", "02 / About")}</p><h2 id="about-title">{pick(locale, "La logique.", "The logic.")}<br /><em>{pick(locale, "Et l’intuition.", "And the intuition.")}</em></h2></header>
        <div className="about-manifesto" data-reveal><p>{pick(locale, "Étudiante en génie logiciel à la FSTM, j’aime comprendre ce qui se passe derrière l’écran autant que ce que l’on ressent en l’utilisant.", "A software engineering student at FSTM, I care about what happens behind the screen as much as what it feels like to use.")}</p></div>
        <div className="about-notes">
          <section data-reveal><span>01</span><h3>{pick(locale, "Construire", "Build")}</h3><p>{pick(locale, "Relier interface, API et données avec des responsabilités claires.", "Connect interfaces, APIs and data with clear responsibilities.")}</p></section>
          <section data-reveal><span>02</span><h3>{pick(locale, "Comprendre", "Understand")}</h3><p>{pick(locale, "Explorer la recherche documentaire et les modèles exécutés localement.", "Explore document retrieval and models running locally.")}</p></section>
          <section data-reveal><span>03</span><h3>{pick(locale, "Observer", "Observe")}</h3><p>{pick(locale, "La mode, le design et les couleurs inattendues dans la nature nourrissent mon regard.", "Fashion, design and unexpected colours in nature shape my eye.")}</p></section>
        </div><div className="about-signature" aria-hidden="true">Meriem.</div>
      </div></section>
      <section id="contact" className="contact-chapter" aria-labelledby="contact-title"><div className="shell">
        <p className="eyebrow eyebrow--light" data-reveal>{pick(locale, "03 / Et maintenant ?", "03 / What’s next?")}</p>
        <h2 id="contact-title" data-reveal>{pick(locale, "Faisons", "Let’s")}<br /><em>{pick(locale, "connaissance.", "connect.")}</em></h2>
        <p data-reveal>{pick(locale, "Un projet, une idée ou un échange autour du logiciel.", "A project, an idea or a conversation about software.")}</p>
        <div className="contact-chapter__links" data-reveal><ArrowLink href="mailto:meriemhamri78@gmail.com" tone="light">{pick(locale, "Écrivez-moi", "Email me")}</ArrowLink><ArrowLink href="https://www.linkedin.com/in/meriem-hamri-b45637278" external tone="light">LinkedIn</ArrowLink><ArrowLink href="https://github.com/Meriem-Hamri" external tone="light">GitHub</ArrowLink></div>
        <a href="#accueil" className="back-top">{pick(locale, "Retour en haut", "Back to top")} ↑</a>
      </div></section>
    </div>
  );
}
