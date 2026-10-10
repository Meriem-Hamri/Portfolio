import Link from "next/link";
import { getLocale, pick } from "@/lib/locale";

export default async function NotFound() {
  const locale = await getLocale();
  return (
    <section className="not-found shell">
      <p className="eyebrow">404</p>
      <h1>{pick(locale, "Cette page n’existe pas.", "This page does not exist.")}</h1>
      <p>{pick(locale, "Le lien est peut-être incomplet ou le projet n’est pas encore publié.", "The link may be incomplete or the project may not be published yet.")}</p>
      <Link href="/" className="button-link">{pick(locale, "Revenir à l’accueil", "Back to home")}</Link>
    </section>
  );
}
