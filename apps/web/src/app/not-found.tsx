import Link from "next/link";
import { getLocale, pick } from "@/lib/locale";

export default async function NotFound() {
  const locale = await getLocale();
  return (
    <section className="not-found shell">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="display">{pick(locale, "Page introuvable.", "Page not found.")}</h1>
      <p>{pick(locale, "Le lien est peut-être incomplet. Les projets, eux, sont toujours là.", "The link may be incomplete. The projects are still here, though.")}</p>
      <Link href="/#projets" className="btn">{pick(locale, "Voir les projets", "See the work")} <span className="btn__icon" aria-hidden="true">→</span></Link>
    </section>
  );
}
