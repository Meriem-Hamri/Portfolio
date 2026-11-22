"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PreferenceControls } from "./preference-controls";
import type { Locale } from "@/lib/locale";

const navigation = [
  { id: "a-propos", fr: "À propos", en: "About" },
  { id: "experience", fr: "Expérience", en: "Experience" },
  { id: "projets", fr: "Projets", en: "Work" },
  { id: "contact", fr: "Contact", en: "Contact" },
] as const;

const icons = {
  mail: <path d="M4 6h16v12H4z M4 7l8 6 8-6" />,
  github: <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  linkedin: <path d="M8 11v5 M8 8v.01 M12 16v-5 M16 16v-3a2 2 0 0 0-4 0 M4 4h16v16H4z" />,
};

function Icon({ name }: { name: keyof typeof icons }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}

export function SiteHeader({ locale, theme }: { locale: Locale; theme: "light" | "dark" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const fr = locale === "fr";
  const current = pathname === "/" ? active : pathname.startsWith("/work") ? "projets" : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id === "accueil" ? null : entry.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["accueil", ...navigation.map(item => item.id)].forEach(id => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return <header className="nav" data-scrolled={scrolled || open}>
    <div className="shell nav__inner">
      <Link href="/" className="nav__brand" onClick={() => setOpen(false)}>Meriem <em>Hamri</em></Link>
      <nav className="nav__links" aria-label={fr ? "Navigation principale" : "Main navigation"}>
        {navigation.map(item => <Link key={item.id} href={`/#${item.id}`} aria-current={current === item.id ? "location" : undefined}>{item[locale]}</Link>)}
      </nav>
      <div className="nav__tools">
        <a className="nav__icon" href="mailto:meriemhamri78@gmail.com" aria-label="Email"><Icon name="mail" /></a>
        <a className="nav__icon" href="https://github.com/Meriem-Hamri" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
        <a className="nav__icon" href="https://www.linkedin.com/in/meriem-hamri-b45637278" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
        <PreferenceControls locale={locale} initialTheme={theme} />
        <button ref={toggle} type="button" className="nav__menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>
          {open ? (fr ? "Fermer" : "Close") : "Menu"}
        </button>
      </div>
    </div>
    <nav id="mobile-navigation" className="nav__panel" hidden={!open} aria-label={fr ? "Navigation mobile" : "Mobile navigation"}>
      {navigation.map(item => <Link key={item.id} href={`/#${item.id}`} onClick={() => setOpen(false)}><span>/</span> {item[locale]}</Link>)}
    </nav>
  </header>;
}
