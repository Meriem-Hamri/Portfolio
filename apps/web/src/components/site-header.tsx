"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PreferenceControls } from "./preference-controls";
import type { Locale } from "@/lib/locale";
const navigation = [
  { id: "accueil", label: "Accueil" }, { id: "projets", label: "Projets" },
  { id: "a-propos", label: "À propos" }, { id: "contact", label: "Contact" },
] as const;
export function SiteHeader({ locale, theme }: { locale: Locale; theme: "light" | "dark" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("accueil");
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-15% 0px -65% 0px" });
    navigation.forEach(item => { const section = document.getElementById(item.id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <header className="site-header" onKeyDown={event => { if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); } }}>
      <div className="shell site-header__inner">
        <Link href="/#accueil" className="wordmark" aria-label={locale === "fr" ? "Meriem Hamri, accueil" : "Meriem Hamri, home"} onClick={() => setOpen(false)}>MH<span aria-hidden="true">.</span></Link>
        <PreferenceControls locale={locale} initialTheme={theme} />
        <button ref={toggle} type="button" className="menu-button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(current => !current)}><span>{open ? (locale === "fr" ? "Fermer" : "Close") : "Menu"}</span><span className="menu-button__mark" aria-hidden="true">{open ? "×" : "+"}</span></button>
        <nav id="main-navigation" className={`main-navigation ${open ? "main-navigation--open" : ""}`} aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}>
          {navigation.map(item => <Link key={item.id} href={`/#${item.id}`} className={pathname === "/" && active === item.id ? "is-active" : undefined} aria-current={pathname === "/" && active === item.id ? "location" : undefined} onClick={() => setOpen(false)}>{locale === "en" ? {accueil: "Home", projets: "Work", "a-propos": "About", contact: "Contact"}[item.id] : item.label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
