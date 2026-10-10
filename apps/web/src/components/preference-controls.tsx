"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Locale } from "@/lib/locale";

export function PreferenceControls({ locale, initialTheme }: { locale: Locale; initialTheme: "light" | "dark" }) {
  const router = useRouter();
  const [theme, setTheme] = useState(initialTheme);
  const [pending, startTransition] = useTransition();
  const setPreference = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax`;
  };
  const toggleLanguage = () => {
    setPreference("portfolio-locale", locale === "fr" ? "en" : "fr");
    startTransition(() => router.refresh());
  };
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    setPreference("portfolio-theme", next);
  };
  return <div className="preferences" aria-label={locale === "fr" ? "Préférences du site" : "Site preferences"}>
    <button type="button" className="preference-button" onClick={toggleLanguage} disabled={pending} lang={locale === "fr" ? "en" : "fr"} aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}>{locale === "fr" ? "EN" : "FR"}<span className="sr-only"> {locale === "fr" ? "language" : "langue"}</span></button>
    <button type="button" className="preference-button" onClick={toggleTheme} aria-label={locale === "fr" ? (theme === "light" ? "Activer le mode nuit" : "Activer le mode clair") : (theme === "light" ? "Switch to dark mode" : "Switch to light mode")} aria-pressed={theme === "dark"}><span aria-hidden="true">{theme === "light" ? "☾" : "☼"}</span></button>
  </div>;
}
