"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const navigation = [
  { id: "accueil", label: "Accueil" }, { id: "projets", label: "Projets" },
  { id: "a-propos", label: "À propos" }, { id: "contact", label: "Contact" },
] as const;
export function SiteHeader() {
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
        <Link href="/#accueil" className="wordmark" aria-label="Meriem Hamri, accueil" onClick={() => setOpen(false)}>MH<span aria-hidden="true">.</span></Link>
        <button ref={toggle} type="button" className="menu-button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(current => !current)}><span>{open ? "Fermer" : "Menu"}</span><span className="menu-button__mark" aria-hidden="true">{open ? "×" : "+"}</span></button>
        <nav id="main-navigation" className={`main-navigation ${open ? "main-navigation--open" : ""}`} aria-label="Navigation principale">
          {navigation.map(item => <Link key={item.id} href={`/#${item.id}`} className={pathname === "/" && active === item.id ? "is-active" : undefined} aria-current={pathname === "/" && active === item.id ? "location" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
