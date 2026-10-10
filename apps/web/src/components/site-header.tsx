"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PreferenceControls } from "./preference-controls";
import type { Locale } from "@/lib/locale";
import type { Project } from "@/types/project";

const navigation = [
  { id: "accueil", fr: "Accueil", en: "Home" },
  { id: "projets", fr: "Projets", en: "Work" },
  { id: "a-propos", fr: "À propos", en: "About" },
  { id: "contact", fr: "Contact", en: "Contact" },
] as const;

type ProjectNavigation = Pick<Project, "slug" | "title" | "kind" | "organization">;

export function SiteHeader({ locale, theme, projects }: {
  locale: Locale;
  theme: "light" | "dark";
  projects: readonly ProjectNavigation[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [active, setActive] = useState("accueil");
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const projectsToggle = useRef<HTMLButtonElement>(null);
  const projectList = useRef<HTMLDivElement>(null);
  const isWorkRoute = pathname === "/work" || pathname.startsWith("/work/");

  function closeNavigation() {
    setOpen(false);
    setProjectsOpen(false);
  }

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-15% 0px -65% 0px" });
    navigation.forEach(item => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open && !projectsOpen) return;
    const dismissOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setOpen(false);
        setProjectsOpen(false);
      }
    };
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [open, projectsOpen]);

  return (
    <header
      ref={header}
      className="site-header"
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeNavigation();
      }}
      onKeyDown={event => {
        if (event.key !== "Escape") return;
        if (projectsOpen) {
          event.preventDefault();
          setProjectsOpen(false);
          projectsToggle.current?.focus();
        } else if (open) {
          event.preventDefault();
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="shell site-header__inner">
        <Link href="/#accueil" className="wordmark" aria-label={locale === "fr" ? "Meriem Hamri, accueil" : "Meriem Hamri, home"} onClick={closeNavigation}>
          <span className="wordmark__sigil" aria-hidden="true">M</span>
          <span className="wordmark__name">Meriem <em>Hamri</em></span>
        </Link>
        <PreferenceControls locale={locale} initialTheme={theme} />
        <button ref={toggle} type="button" className="menu-button" aria-expanded={open} aria-controls="main-navigation" onClick={() => { setOpen(current => !current); setProjectsOpen(false); }}>
          <span>{open ? (locale === "fr" ? "Fermer" : "Close") : "Index"}</span>
          <span className="menu-button__mark" aria-hidden="true">{open ? "×" : "≡"}</span>
        </button>
        <nav id="main-navigation" className={`main-navigation ${open ? "main-navigation--open" : ""}`} aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}>
          {navigation.map((item, index) => item.id === "projets" ? (
            <div key={item.id} className="nav-projects" onBlur={event => {
              if (!event.currentTarget.contains(event.relatedTarget)) setProjectsOpen(false);
            }}>
              <button
                ref={projectsToggle}
                type="button"
                className={`nav-projects__toggle ${isWorkRoute || (pathname === "/" && active === "projets") ? "is-active" : ""}`}
                aria-expanded={projectsOpen}
                aria-controls="project-navigation"
                onClick={() => setProjectsOpen(current => !current)}
                onKeyDown={event => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setProjectsOpen(true);
                    requestAnimationFrame(() => projectList.current?.querySelector<HTMLAnchorElement>("a")?.focus());
                  }
                }}
              >
                <span className="nav-link__index" aria-hidden="true">02</span>
                <span>{item[locale]} <span className="nav-projects__chevron" aria-hidden="true">⌄</span></span>
              </button>
              <div ref={projectList} id="project-navigation" className="nav-projects__panel" hidden={!projectsOpen}>
                <div className="nav-projects__intro">
                  <span>{locale === "fr" ? "Explorer mon travail" : "Explore my work"}</span>
                  <Link href="/#projets" onClick={closeNavigation}>{locale === "fr" ? "La sélection" : "Selected work"}<span aria-hidden="true">↗</span></Link>
                </div>
                <ul className="nav-projects__list">
                  {projects.map((project, projectIndex) => (
                    <li key={project.slug}>
                      <Link href={`/work/${project.slug}`} aria-current={pathname === `/work/${project.slug}` ? "page" : undefined} onClick={closeNavigation}>
                        <span className="nav-projects__number" aria-hidden="true">{String(projectIndex + 1).padStart(2, "0")}</span>
                        <span><strong>{project.title}</strong><small>{project.kind === "internship" ? `${locale === "fr" ? "Stage" : "Internship"}${project.organization ? ` · ${project.organization}` : ""}` : locale === "fr" ? "Projet logiciel" : "Software project"}</small></span>
                        <span className="nav-projects__arrow" aria-hidden="true">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link className="nav-projects__all" href="/work" aria-current={pathname === "/work" ? "page" : undefined} onClick={closeNavigation}>{locale === "fr" ? "Tous les projets" : "All projects"}<span aria-hidden="true">→</span></Link>
              </div>
            </div>
          ) : (
            <Link key={item.id} href={`/#${item.id}`} className={pathname === "/" && active === item.id ? "is-active" : undefined} aria-current={pathname === "/" && active === item.id ? "location" : undefined} onClick={closeNavigation}>
              <span className="nav-link__index" aria-hidden="true">0{index + 1}</span><span>{item[locale]}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
