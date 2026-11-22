import type { Metadata } from "next";
import Link from "next/link";
import { CodeEditor, type EditorFile } from "@/components/code-editor";
import { CopyEmail } from "@/components/copy-email";
import { ExperienceTabs, type Job } from "@/components/experience-tabs";
import { HeroPhoto } from "@/components/hero-photo";
import { ProjectCarousel } from "@/components/project-carousel";
import { getProjects } from "@/lib/projects";
import { getLocale, pick } from "@/lib/locale";

const EMAIL = "meriemhamri78@gmail.com";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Meriem Hamri · Software engineer",
    description: pick(locale,
      "Ingénieure logiciel : un assistant documentaire RAG local chez Telepac Technology, une plateforme de reporting à la Trésorerie Générale du Royaume et des projets full-stack.",
      "Software engineer: a local RAG document assistant at Telepac Technology, a reporting platform at Morocco’s General Treasury and full-stack projects."),
  };
}

function SecTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="sec-title" data-reveal><span className="slash">/</span> {children}</h2>;
}

export default async function HomePage() {
  const locale = await getLocale();
  const projects = await getProjects(locale);
  const fr = locale === "fr";
  const featured = projects.filter(project => project.kind === "internship");
  const others = projects.filter(project => project.kind !== "internship");

  const jobs: Job[] = [
    {
      id: "telepac", company: "Telepac", place: "Casablanca",
      role: fr ? "Stagiaire ingénieure logiciel" : "Software engineering intern",
      period: fr ? "Juil. — Sept. 2026" : "Jul — Sep 2026",
      points: featured[0].highlights.slice(),
      link: { href: `/work/${featured[0].slug}`, label: fr ? "Voir l’étude de cas" : "See the case study" },
    },
    {
      id: "tgr", company: "TGR", place: "Rabat",
      role: fr ? "Développeuse full-stack (PFE)" : "Full-stack developer (final-year internship)",
      period: fr ? "Avr. — Juil. 2025" : "Apr — Jul 2025",
      points: featured[1].highlights.slice(),
      link: { href: `/work/${featured[1].slug}`, label: fr ? "Voir l’étude de cas" : "See the case study" },
    },
  ];

  const tech = ["Python · FastAPI", "TypeScript", "Next.js · React", "Angular", "Spring Boot", "NestJS · Prisma", "ChromaDB · Ollama", "PostgreSQL · Oracle"];

  const heroTags = [
    { label: "Python · FastAPI", x: "-4%", y: "12%", dx: -14, dy: -8, tone: "olive" as const },
    { label: "Angular", x: "78%", y: "20%", dx: 14, dy: -6, tone: "terracotta" as const },
    { label: fr ? "RAG local" : "Local RAG", x: "-10%", y: "52%", dx: -16, dy: 0, tone: "sable" as const },
    { label: "Spring Boot", x: "80%", y: "58%", dx: 16, dy: 4, tone: "olive" as const },
    { label: "Next.js · NestJS", x: "22%", y: "90%", dx: 0, dy: 14, tone: "ink" as const },
  ];

  const s = (text: string): [string, "s"] => [text, "s"];
  const editorFiles: EditorFile[] = [
    { name: "meriem.ts", lines: [
      [["const ", "k"], ["meriem", "t"], [" = {", "t"]],
      [["  role: ", "t"], s(fr ? "\"ingénieure logiciel\"" : "\"software engineer\""), [",", "t"]],
      [["  school: ", "t"], s("\"FSTM · ILISI\""), [",", "t"]],
      [["  based: ", "t"], s(fr ? "\"Maroc\"" : "\"Morocco\""), [",", "t"]],
      [["  loves: [", "t"], s("\"design\""), [", ", "t"], s("\"nature\""), [", ", "t"], s("\"clean code\""), ["],", "t"]],
      [["};", "t"]],
      [],
      [[fr ? "// ce que j'aime construire" : "// what I like to build", "c"]],
      [["meriem.", "t"], ["build", "p"], ["(", "t"], s(fr ? "\"des outils utiles\"" : "\"useful tools\""), [");", "t"]],
    ] },
    { name: "stack.json", lines: [
      [["{", "t"]],
      [["  ", "t"], s("\"ai\""), [": [", "t"], s("\"RAG\""), [", ", "t"], s("\"ChromaDB\""), [", ", "t"], s("\"Ollama\""), ["],", "t"]],
      [["  ", "t"], s("\"backend\""), [": [", "t"], s("\"FastAPI\""), [", ", "t"], s("\"Spring Boot\""), [", ", "t"], s("\"NestJS\""), ["],", "t"]],
      [["  ", "t"], s("\"frontend\""), [": [", "t"], s("\"Angular\""), [", ", "t"], s("\"Next.js\""), [", ", "t"], s("\"React\""), ["],", "t"]],
      [["  ", "t"], s("\"data\""), [": [", "t"], s("\"PostgreSQL\""), [", ", "t"], s("\"Oracle\""), [", ", "t"], s("\"MySQL\""), ["]", "t"]],
      [["}", "t"]],
    ] },
    { name: fr ? "parcours.md" : "path.md", lines: [
      [[fr ? "## Expérience" : "## Experience", "p"]],
      [["- 2026 · Telepac Technology · ", "t"], [fr ? "assistant RAG local" : "local RAG assistant", "s"]],
      [["- 2025 · TGR · ", "t"], [fr ? "plateforme de reporting" : "reporting platform", "s"]],
      [],
      [[fr ? "## Formation" : "## Education", "p"]],
      [["- 2025 → ", "t"], [fr ? "cycle ingénieur ILISI" : "ILISI engineering degree", "s"]],
      [["- 2024 · ", "t"], [fr ? "licence informatique" : "BSc computer science", "s"]],
    ] },
  ];

  return <>
    {/* ───────── Accueil ───────── */}
    <section id="accueil" className="hero" aria-labelledby="hero-title">
      <div className="shell hero__grid">
        <div className="hero__text">
          <p className="hero__hello" data-enter>{fr ? "Bonjour, je suis" : "Hi, I’m"}</p>
          <h1 id="hero-title" className="hero__name title lines">
            <span className="line"><span style={{ "--l": 0 } as React.CSSProperties}>Meriem <em>Hamri.</em></span></span>
          </h1>
          <p className="hero__role" data-enter style={{ "--d": 1 } as React.CSSProperties}>{fr ? "Ingénieure logiciel · IA locale & applications web" : "Software engineer · local AI & web apps"}</p>
          <p className="hero__intro" data-enter style={{ "--d": 2 } as React.CSSProperties}>{fr
            ? "J’ai construit un assistant IA qui tourne entièrement en local chez Telepac Technology, et une plateforme de reporting financier à la Trésorerie Générale du Royaume. J’aime les projets où le code rencontre le design."
            : "I built an AI assistant that runs fully locally at Telepac Technology, and a financial reporting platform at Morocco’s General Treasury. I love projects where code meets design."}</p>
          <div className="hero__actions" data-enter style={{ "--d": 3 } as React.CSSProperties}>
            <a className="btn btn--solid" href="#projets">{fr ? "Voir mes projets" : "See my work"} <span className="arrow" aria-hidden="true">→</span></a>
            <a className="btn" href="#contact">{fr ? "Me dire bonjour" : "Say hello"}</a>
          </div>
        </div>
        <div className="hero__art" data-enter style={{ "--d": 2 } as React.CSSProperties}>
          <HeroPhoto alt={fr ? "Portrait de Meriem Hamri" : "Portrait of Meriem Hamri"} tags={heroTags} />
        </div>
      </div>
    </section>

    {/* ───────── À propos ───────── */}
    <section id="a-propos" className="section" aria-labelledby="about-title">
      <div className="shell">
        <SecTitle id="about-title">{fr ? "à propos" : "about me"}</SecTitle>
        <div className="about">
          <div className="about__text" data-reveal>
            <p>{fr
              ? <>Je suis élève ingénieure en génie logiciel (cycle <strong>ILISI</strong>) à la FSTM. J’aime comprendre ce qui se passe derrière l’écran autant que ce qu’on ressent en l’utilisant.</>
              : <>I’m a software engineering student (<strong>ILISI</strong> programme) at FSTM. I care about what happens behind the screen as much as what it feels like to use.</>}</p>
            <p>{fr
              ? <>Chez <strong>Telepac Technology</strong>, j’ai conçu une chaîne RAG complète, de l’OCR aux réponses sourcées. À la <strong>Trésorerie Générale du Royaume</strong>, j’ai livré une application full-stack avec authentification, rôles et tableaux de bord.</>
              : <>At <strong>Telepac Technology</strong>, I designed a full RAG pipeline, from OCR to cited answers. At the <strong>General Treasury of the Kingdom</strong>, I shipped a full-stack app with authentication, roles and dashboards.</>}</p>
            <p>{fr ? "Les technologies avec lesquelles je travaille en ce moment :" : "Technologies I’ve been working with recently:"}</p>
            <ul className="about__tech">{tech.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="about__editor" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            <CodeEditor files={editorFiles} label={fr ? "Mon profil en code" : "My profile as code"} />
          </div>
        </div>
      </div>
    </section>

    {/* ───────── Expérience ───────── */}
    <section id="experience" className="section" aria-labelledby="exp-title">
      <div className="shell shell--narrow">
        <SecTitle id="exp-title">{fr ? "expérience" : "experience"}</SecTitle>
        <div data-reveal><ExperienceTabs jobs={jobs} label={fr ? "Entreprises" : "Companies"} /></div>
      </div>
    </section>

    {/* ───────── Projets ───────── */}
    <section id="projets" className="section" aria-labelledby="work-title">
      <div className="shell">
        <div className="sec-head">
          <SecTitle id="work-title">{fr ? "projets" : "work"}</SecTitle>
          <Link className="link link--accent" href="/work" data-reveal>{fr ? "Tous les projets" : "All projects"} <span className="arrow" aria-hidden="true">→</span></Link>
        </div>
        <div data-reveal><ProjectCarousel projects={featured} locale={locale} /></div>
        <ul className="cards">
          {others.map((project, index) => <li key={project.slug} data-reveal style={{ "--d": index } as React.CSSProperties}>
            <article className={`card tone-${project.tone}`}>
              <div className="card__top">
                <span className="card__mark" aria-hidden="true" />
                {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer" className="card__ext" aria-label={`${project.title} — GitHub`}>↗</a>}
              </div>
              <h3><Link href={`/work/${project.slug}`} className="card__link">{project.title}</Link></h3>
              <p>{project.summary}</p>
              <p className="card__stack">{project.stack.join("  ·  ")}</p>
            </article>
          </li>)}
        </ul>
      </div>
    </section>

    {/* ───────── Contact ───────── */}
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="shell shell--narrow" data-reveal>
        <p className="kicker"><span className="slash">/</span> {fr ? "et maintenant ?" : "what’s next?"}</p>
        <h2 id="contact-title" className="contact__title title">{fr ? "Me dire bonjour" : "Say hello"}</h2>
        <p className="contact__lead">{fr
          ? "Un stage, un projet, une question sur mon travail : ma boîte mail est ouverte, je réponds volontiers."
          : "An internship, a project, a question about my work: my inbox is open and I’ll gladly reply."}</p>
        <div className="contact__actions">
          <a className="btn btn--solid" href={`mailto:${EMAIL}`}>{fr ? "M’écrire" : "Email me"} <span className="arrow" aria-hidden="true">→</span></a>
          <CopyEmail email={EMAIL} locale={locale} />
        </div>
      </div>
    </section>
    <footer className="footer"><div className="shell footer__inner">
      <span>© {new Date().getFullYear()} Meriem Hamri</span>
      <span className="footer__links">
        <a href="https://github.com/Meriem-Hamri" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/meriem-hamri-b45637278" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="#accueil">{fr ? "Haut de page ↑" : "Back to top ↑"}</a>
      </span>
    </div></footer>
  </>;
}
