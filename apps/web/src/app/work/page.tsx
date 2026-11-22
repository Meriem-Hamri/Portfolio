import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { getProjects } from "@/lib/projects";
import { getLocale, pick } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: pick(locale, "Projets", "Work"), description: pick(locale, "Stages et projets logiciels de Meriem Hamri.", "Meriem Hamri's internships and software projects.") };
}

export default async function WorkPage() {
  const locale = await getLocale();
  const projects = await getProjects(locale);
  const fr = locale === "fr";
  return <>
    <section className="shell work-index">
      <p className="kicker">{fr ? "Index" : "Index"}</p>
      <h1 className="h2">{fr ? "Tous les projets" : "All projects"}</h1>
      <ul className="rows">
        {projects.map((project, index) => <li key={project.slug} data-reveal style={{ "--d": index } as React.CSSProperties}>
          <Link className="row" href={`/work/${project.slug}`}>
            <span className="row__num">{String(index + 1).padStart(2, "0")}</span>
            <span className="row__title">{project.title}</span>
            <span className="row__text">{project.summary}</span>
            <span className="row__meta">{project.tag}{project.year ? ` · ${project.year}` : ""}</span>
            <span className="row__arrow" aria-hidden="true">→</span>
          </Link>
        </li>)}
      </ul>
    </section>
    <SiteFooter locale={locale} />
  </>;
}
