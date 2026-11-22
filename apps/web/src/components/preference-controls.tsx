"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Locale } from "@/lib/locale";

export function PreferenceControls({ locale, initialTheme }: { locale: Locale; initialTheme: "light" | "dark" }) {
  const router = useRouter();
  const [theme, setTheme] = useState(initialTheme);
  const [pending, startTransition] = useTransition();
  const fr = locale === "fr";
  const setPreference = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax`;
  };
  const toggleLanguage = () => {
    setPreference("portfolio-locale", fr ? "en" : "fr");
    startTransition(() => router.refresh());
  };
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    setPreference("portfolio-theme", next);
  };
  return <>
    <button type="button" className="pref" onClick={toggleLanguage} disabled={pending} lang={fr ? "en" : "fr"} aria-label={fr ? "Switch to English" : "Passer en français"}>{fr ? "EN" : "FR"}</button>
    <button type="button" className="pref" onClick={toggleTheme} aria-pressed={theme === "dark"} aria-label={fr ? "Mode sombre" : "Dark mode"}>
      <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
    </button>
  </>;
}
