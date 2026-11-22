import Link from "next/link";
import type { Locale } from "@/lib/locale";

export function SiteFooter({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return <footer className="footer">
    <div className="shell footer__inner">
      <p>© {new Date().getFullYear()} Meriem Hamri · {fr ? "Ingénieure logiciel" : "Software engineer"}</p>
      <div className="footer__links">
        <Link href="/#projets">{fr ? "Projets" : "Work"}</Link>
        <a href="https://github.com/Meriem-Hamri" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/meriem-hamri-b45637278" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="mailto:meriemhamri78@gmail.com">Email</a>
      </div>
    </div>
  </footer>;
}
