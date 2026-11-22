import type { Metadata } from "next";
import { CopyEmail } from "@/components/copy-email";
import { ProjectStack } from "@/components/project-stack";
import { getProjects } from "@/lib/projects";
import { getLocale, pick } from "@/lib/locale";

const EMAIL = "meriemhamri78@gmail.com";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Meriem Hamri · Software engineer",
    description: pick(locale,
      "Ingénieure logiciel : un assistant IA 100 % local chez Telepac, une plateforme de reporting à la TGR, et des projets full-stack.",
      "Software engineer: a fully local AI assistant at Telepac, a reporting platform at the Treasury, and full-stack projects."),
  };
}

const marquee = ["FastAPI", "Next.js", "Angular", "Spring Boot", "NestJS", "ChromaDB", "Ollama", "PostgreSQL", "Oracle", "TypeScript", "React", "Prisma", "OCR", "RAG"];

export default async function HomePage() {
  const locale = await getLocale();
  const projects = await getProjects(locale);
  const fr = locale === "fr";
  const titleLines = fr
    // "‑" is a non-breaking hyphen so "full-stack" never splits on small screens.
    ? ["Je construis", "des apps full‑stack", "et des IA qui citent"]
    : ["I build", "full‑stack apps", "and AI that cites"];

  const skills = [
    { title: fr ? "IA & données" : "AI & data", color: "var(--blue)", fg: "#fff", icon: "AI", items: ["RAG", "BGE-M3", "ChromaDB", "Ollama · Qwen", "OCR"] },
    { title: "Backend", color: "var(--orange)", fg: "#121212", icon: "{ }", items: ["FastAPI", "Spring Boot", "NestJS", "PHP", "Celery", "JWT"] },
    { title: "Frontend", color: "var(--lime)", fg: "#121212", icon: "</>", items: ["Next.js", "React", "Angular", "TypeScript"] },
    { title: fr ? "Bases de données" : "Databases", color: "var(--violet)", fg: "#121212", icon: "DB", items: ["PostgreSQL", "Oracle", "MySQL", "Prisma"] },
  ];

  return <>
    {/* ───────── Hero ───────── */}
    <section id="accueil" className="hero" aria-labelledby="hero-title">
      <div className="shell">
        <p className="eyebrow hero__kicker" data-hero-fade><span className="hero__pulse" aria-hidden="true" />{fr ? "Meriem Hamri — Élève ingénieure en génie logiciel" : "Meriem Hamri — Software engineering student"}</p>
        <h1 id="hero-title" className="hero__title display">
          {titleLines.map((line, index) => <span key={line} className="line"><span style={{ "--l": index } as React.CSSProperties}>{line}</span></span>)}
          <span className="line"><span style={{ "--l": 3 } as React.CSSProperties}>{fr ? "leurs " : "its "}<span className="hero__mark">sources.</span><a className="hero__cite" href="#projet-assistant-documentaire-rag-local" aria-label={fr ? "Référence 1 : l’assistant RAG" : "Reference 1: the RAG assistant"}>[1]</a></span></span>
        </h1>
        <div className="hero__bottom">
          <div data-hero-fade style={{ "--d": 1 } as React.CSSProperties}>
            <p className="hero__lead">{fr
              ? <>Étudiante en cycle ingénieur ILISI à la FSTM. J’ai conçu <strong>un assistant IA 100 % local</strong> chez Telepac Technology et <strong>une plateforme de reporting financier</strong> à la Trésorerie Générale du Royaume.</>
              : <>Engineering student (ILISI, FSTM). I built <strong>a fully local AI assistant</strong> at Telepac Technology and <strong>a financial reporting platform</strong> at Morocco’s General Treasury.</>}</p>
            <div className="hero__actions">
              <a className="btn" href="#projets">{fr ? "Voir les projets" : "See my work"} <span className="btn__icon btn__icon--down" aria-hidden="true">↓</span></a>
              <a className="btn btn--ghost" href="#contact">{fr ? "Me contacter" : "Get in touch"}</a>
            </div>
          </div>
          <dl className="hero__facts" data-hero-fade style={{ "--d": 2 } as React.CSSProperties}>
            <div><dt>02</dt><dd>{fr ? "stages en entreprise" : "industry internships"}</dd></div>
            <div><dt>05</dt><dd>{fr ? "projets à explorer" : "projects to explore"}</dd></div>
            <p className="hero__note">[1] <a href="#projet-assistant-documentaire-rag-local">{fr ? "AssistantAI — RAG local, Telepac 2026" : "AssistantAI — local RAG, Telepac 2026"}</a></p>
          </dl>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        {[0, 1].map(copy => <div key={copy} className="marquee__track">{marquee.map(item => <span key={item} className="marquee__item">{item}</span>)}</div>)}
      </div>
    </section>

    {/* ───────── Projects ───────── */}
    <section id="projets" className="section" aria-labelledby="projects-title">
      <div className="shell">
        <header className="section-head">
          <div data-reveal>
            <p className="eyebrow">(01) {fr ? "Travaux sélectionnés" : "Selected work"}</p>
            <h2 id="projects-title" className="display">{fr ? "Projets" : "Work"}<sup>({String(projects.length).padStart(2, "0")})</sup></h2>
          </div>
          <p data-reveal style={{ "--d": 1 } as React.CSSProperties}>{fr
            ? "Deux stages en entreprise, puis des projets menés en équipe. Chaque carte mène à une étude de cas : le problème, ce que j’ai construit et pourquoi."
            : "Two industry internships, then team projects. Each card leads to a case study: the problem, what I built and why."}</p>
        </header>
        <ProjectStack projects={projects} locale={locale} />
      </div>
    </section>

    {/* ───────── About ───────── */}
    <section id="a-propos" className="section" aria-labelledby="about-title">
      <div className="shell">
        <header className="section-head">
          <div data-reveal>
            <p className="eyebrow">(02) {fr ? "À propos" : "About"}</p>
            <h2 id="about-title" className="display">{fr ? "Moi, en bref." : "Me, briefly."}</h2>
          </div>
        </header>
        <div className="about__grid">
          <div data-reveal>
            <p className="about__statement">{fr
              ? <>J’aime comprendre ce qui se passe <em>derrière l’écran</em>, autant que ce qu’on ressent <em>en l’utilisant</em>.</>
              : <>I care about what happens <em>behind the screen</em> as much as what it feels like <em>to use</em>.</>}</p>
            <p className="about__text">{fr
              ? "De l’extraction de documents à l’interface finale, je travaille sur toute la chaîne : pipelines de données, API, authentification, tableaux de bord. Mes deux stages m’ont appris à livrer des outils utiles dans des contextes réels, avec des contraintes réelles."
              : "From document extraction to the final interface, I work across the whole chain: data pipelines, APIs, authentication, dashboards. My two internships taught me to ship useful tools in real contexts, with real constraints."}</p>
          </div>
          <div data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            <div className="timeline__group">
              <p className="eyebrow">{fr ? "Expérience" : "Experience"}</p>
              <ul className="timeline">
                <li><strong><span className="dot" style={{ background: "var(--blue)" }} />Telepac Technology</strong><span>2026</span><small>{fr ? "Stage ingénierie logicielle · Assistant RAG local" : "Software engineering internship · Local RAG assistant"}</small></li>
                <li><strong><span className="dot" style={{ background: "var(--orange)" }} />{fr ? "Trésorerie Générale du Royaume" : "General Treasury of the Kingdom"}</strong><span>2025</span><small>{fr ? "Stage PFE · Plateforme de reporting full-stack" : "Final-year internship · Full-stack reporting platform"}</small></li>
              </ul>
            </div>
            <div className="timeline__group">
              <p className="eyebrow">{fr ? "Formation" : "Education"}</p>
              <ul className="timeline">
                <li><strong>{fr ? "Cycle ingénieur ILISI" : "Engineering degree, ILISI"}</strong><span>2025 —</span><small>FSTM</small></li>
                <li><strong>{fr ? "Licence Informatique, Réseaux et Multimédia" : "BSc Computer Science, Networks & Multimedia"}</strong><span>2024 — 25</span><small>FSTM</small></li>
                <li><strong>{fr ? "DEUST Maths, Informatique, Physique" : "DEUST Maths, CS & Physics"}</strong><span>2022 — 24</span><small>FSTM</small></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="skills">
          {skills.map((skill, index) => <div key={skill.title} className="skill" data-reveal style={{ "--d": index } as React.CSSProperties}>
            <span className="skill__icon" style={{ background: skill.color, color: skill.fg }} aria-hidden="true">{skill.icon}</span>
            <h3>{skill.title}</h3>
            <ul>{skill.items.map(item => <li key={item}>{item}</li>)}</ul>
          </div>)}
        </div>
      </div>
    </section>

    {/* ───────── Contact ───────── */}
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="shell">
        <p className="eyebrow" data-reveal>(03) Contact</p>
        <h2 id="contact-title" className="contact__title display" data-reveal>
          <a href={`mailto:${EMAIL}`}>{fr ? "Parlons-en" : "Let’s talk"} <span className="arrow" aria-hidden="true">→</span></a>
        </h2>
        <p className="contact__lead" data-reveal>{fr
          ? "Un stage, un projet, une question sur mon travail ? Je réponds avec plaisir."
          : "An internship, a project, a question about my work? I’d be glad to hear from you."}</p>
        <div className="contact__email" data-reveal>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <CopyEmail email={EMAIL} locale={locale} />
        </div>
        <nav className="contact__links" aria-label={fr ? "Réseaux" : "Social links"} data-reveal>
          <a href="https://www.linkedin.com/in/meriem-hamri-b45637278" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href="https://github.com/Meriem-Hamri" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a href={`mailto:${EMAIL}`}>Email <span aria-hidden="true">↗</span></a>
        </nav>
        <div className="contact__foot">
          <span>© {new Date().getFullYear()} Meriem Hamri</span>
          <a href="#accueil">{fr ? "Retour en haut ↑" : "Back to top ↑"}</a>
        </div>
      </div>
    </section>
  </>;
}
