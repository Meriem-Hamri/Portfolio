import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found shell">
      <p className="eyebrow">Erreur 404</p>
      <h1>Cette page n’existe pas.</h1>
      <p>Le lien est peut-être incomplet ou le projet n’est pas encore publié.</p>
      <Link href="/" className="button-link">Revenir à l’accueil</Link>
    </section>
  );
}
