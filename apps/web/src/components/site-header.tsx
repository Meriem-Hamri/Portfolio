"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PreferenceControls } from "./preference-controls";
import type { Locale } from "@/lib/locale";

const navigation = [
  { id: "projets", fr: "Projets", en: "Work" },
  { id: "a-propos", fr: "À propos", en: "About" },
  { id: "contact", fr: "Contact", en: "Contact" },
] as const;

export function SiteHeader({ locale, theme }: { locale: Locale; theme: "light" | "dark" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const fr = locale === "fr";
  const current = pathname === "/" ? active : pathname.startsWith("/work") ? "projets" : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id === "accueil" ? null : entry.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
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
      <Link href="/#accueil" className="nav__brand" aria-label={fr ? "Meriem Hamri, accueil" : "Meriem Hamri, home"} onClick={() => setOpen(false)}>
        <span className="nav__mark" aria-hidden="true">MH</span>
        <span>Meriem Hamri</span>
      </Link>
      <nav className="nav__links" aria-label={fr ? "Navigation principale" : "Main navigation"}>
        {navigation.map(item => <Link key={item.id} href={`/#${item.id}`} aria-current={current === item.id ? "location" : undefined}>{item[locale]}</Link>)}
      </nav>
      <div className="nav__tools">
        <PreferenceControls locale={locale} initialTheme={theme} />
        <a className="btn btn--small nav__cta" href="mailto:meriemhamri78@gmail.com">{fr ? "Me contacter" : "Get in touch"}</a>
        <button ref={toggle} type="button" className="nav__menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>
          {open ? (fr ? "Fermer" : "Close") : "Menu"} <span aria-hidden="true">{open ? "×" : "≡"}</span>
        </button>
      </div>
    </div>
    <nav id="mobile-navigation" className="nav__panel" hidden={!open} aria-label={fr ? "Navigation mobile" : "Mobile navigation"}>
      {navigation.map((item, index) => <Link key={item.id} href={`/#${item.id}`} onClick={() => setOpen(false)}>{item[locale]}<span>0{index + 1}</span></Link>)}
    </nav>
  </header>;
}
