import { ArrowLink } from "@/components/arrow-link";
import { ProjectVisual } from "@/components/project-visual";
import { ScrollMotion } from "@/components/scroll-motion";
import { getFeaturedProjects } from "@/lib/projects";

export default async function HomePage() {
  const projects = await getFeaturedProjects();
  return (
    <div className="continuous-page">
      <ScrollMotion />
      <section id="accueil" className="editorial-hero" aria-labelledby="intro-title">
        <div className="shell">
          <p className="eyebrow hero-kicker">Meriem Hamri — Software engineer</p>
          <h1 id="intro-title" className="editorial-name"><span>Meriem</span><span className="satin-name">Hamri<span className="satin-specimen" aria-hidden="true" /></span></h1>
          <p className="editorial-intro">Je conçois des applications.<br />Avec de la rigueur dans le code,<br /><em>et de l’attention dans les détails.</em></p>
          <a className="explore-link" href="#projets">Explorer mes projets <span aria-hidden="true">↓</span></a>
          <div className="hero-marginalia" aria-hidden="true"><span>Code & sensibilité</span><span>Nature · Design · Logiciel</span></div>
        </div>
      </section>
      <section id="projets" className="project-chapter" aria-labelledby="projects-title">
        <div className="shell">
          <header className="chapter-heading" data-reveal><p className="eyebrow">01 / Les projets</p><h2 id="projects-title">Du besoin<br /><em>au concret.</em></h2><p>Les applications, leur fonctionnement et les choix qui les construisent.</p></header>
          {projects.map((project, index) => (
            <article className={`project-story project-story--${index + 1}`} key={project.slug}>
              <header className="project-story__heading" data-reveal><span className="story-number">0{index + 1}</span><p className="eyebrow">{project.slug === "reporting-cse" ? "Reporting métier" : "Recherche documentaire · IA locale"}</p><h3>{project.title}</h3><p>{project.summary}</p></header>
              <div className="project-stage" data-reveal><ProjectVisual kind={project.slug === "reporting-cse" ? "reporting" : "rag"} /></div>
              <div className="project-story__caption" data-reveal><ul className="tech-line" aria-label="Technologies">{project.stack.slice(0, 4).map(tech => <li key={tech}>{tech}</li>)}</ul><ArrowLink href={`/work/${project.slug}`}>Explorer le projet</ArrowLink></div>
            </article>
          ))}
        </div>
      </section>
      <section id="a-propos" className="about-chapter" aria-labelledby="about-title">
        <div className="shell">
          <header className="chapter-heading" data-reveal><p className="eyebrow">02 / À propos</p><h2 id="about-title">La logique.<br /><em>Et l’intuition.</em></h2></header>
          <div className="about-manifesto" data-reveal><p>Étudiante en génie logiciel, j’aime comprendre ce qui se passe <em>derrière l’écran</em> autant que ce que l’on ressent en l’utilisant.</p></div>
          <div className="about-notes"><section data-reveal><span>01</span><h3>Construire</h3><p>Relier l’interface, l’API et les données pour que chaque partie ait une responsabilité claire.</p></section><section data-reveal><span>02</span><h3>Comprendre</h3><p>Explorer la recherche documentaire, le traitement des fichiers et les modèles exécutés localement.</p></section><section data-reveal><span>03</span><h3>Observer</h3><p>La mode, le design et les associations inattendues de couleurs dans la nature nourrissent mon regard.</p></section></div>
          <div className="about-signature" aria-hidden="true">Meriem.</div>
        </div>
      </section>
      <section id="contact" className="contact-chapter" aria-labelledby="contact-title"><div className="shell"><p className="eyebrow eyebrow--light" data-reveal>03 / Et maintenant ?</p><h2 id="contact-title" data-reveal>Faisons<br /><em>connaissance.</em></h2><p data-reveal>Un projet, une idée ou un échange autour du logiciel.</p><div className="contact-chapter__links" data-reveal><ArrowLink href="https://github.com/Meriem-Hamri" external tone="light">Retrouvez-moi sur GitHub</ArrowLink><p>E-mail et LinkedIn bientôt disponibles.</p></div><a href="#accueil" className="back-top">Retour en haut ↑</a></div></section>
    </div>
  );
}
