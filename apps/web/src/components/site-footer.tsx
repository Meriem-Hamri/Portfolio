import Link from "next/link";
import type { Locale } from "@/lib/locale";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <p>Meriem Hamri · Software engineer</p>
        <div>
          <Link href="/#projets">{locale === "fr" ? "Projets" : "Work"}</Link>
          <a href="https://github.com/Meriem-Hamri" target="_blank" rel="noreferrer">
            GitHub <span className="sr-only">{locale === "fr" ? "(nouvel onglet)" : "(new tab)"}</span>
          </a>
        </div>
        <p className="site-footer__note">{locale === "fr" ? "Portfolio · contenu en évolution" : "Portfolio · evolving content"}</p>
      </div>
    </footer>
  );
}
