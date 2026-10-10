import type { Metadata } from "next";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cookies } from "next/headers";
import { getLocale } from "@/lib/locale";
import { getProjects } from "@/lib/projects";
import "./globals.css";
import "./editorial.css";
import "./preferences.css";
import "./project-editorial.css";
import "./navigation-editorial.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Meriem Hamri · Software engineer",
    template: "%s · Meriem Hamri",
  },
  description:
    "Meriem Hamri · Software engineering portfolio · Stages, projets et contact.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const projects = await getProjects(locale);
  const theme = (await cookies()).get("portfolio-theme")?.value === "dark" ? "dark" : "light";
  return (
    <html lang={locale} data-theme={theme} className={`${bodoni.variable} ${dmSans.variable}`}>
      <body>
        <a className="skip-link" href="#contenu">{locale === "fr" ? "Aller au contenu" : "Skip to content"}</a>
        <SiteHeader locale={locale} theme={theme} projects={projects.map(({ slug, title, kind, organization }) => ({ slug, title, kind, organization }))} />
        <main id="contenu">{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
