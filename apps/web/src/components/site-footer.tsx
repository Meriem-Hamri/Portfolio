import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <p>Meriem Hamri · Software engineer</p>
        <div>
          <Link href="/work">Projets</Link>
          <a href="https://github.com/Meriem-Hamri" target="_blank" rel="noreferrer">
            GitHub <span className="sr-only">(nouvel onglet)</span>
          </a>
        </div>
        <p className="site-footer__note">Première version publique · contenu en cours</p>
      </div>
    </footer>
  );
}
