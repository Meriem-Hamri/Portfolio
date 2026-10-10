"use client";
import { useEffect } from "react";

export function ScrollMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const configure = () => {
      observer?.disconnect();
      elements.forEach(element => element.classList.remove("reveal-pending"));
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      elements.forEach(element => {
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.classList.add("reveal-pending");
          observer?.observe(element);
        }
      });
    };
    configure();
    preference.addEventListener("change", configure);

    const wipes = document.querySelectorAll<HTMLElement>("[data-color-wipe]");
    let frame = 0;
    const updateWipes = () => {
      frame = 0;
      if (preference.matches) {
        document.documentElement.classList.remove("has-scroll-wipes");
        return;
      }
      wipes.forEach(section => {
        const top = section.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, (window.innerHeight * .9 - top) / (window.innerHeight * .24)));
        section.style.setProperty("--wipe-remaining", String(1 - progress));
      });
      document.documentElement.classList.add("has-scroll-wipes");
    };
    const scheduleWipes = () => { if (!frame) frame = window.requestAnimationFrame(updateWipes); };
    scheduleWipes();
    window.addEventListener("scroll", scheduleWipes, { passive: true });
    window.addEventListener("resize", scheduleWipes);
    preference.addEventListener("change", scheduleWipes);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", configure);
      preference.removeEventListener("change", scheduleWipes);
      window.removeEventListener("scroll", scheduleWipes);
      window.removeEventListener("resize", scheduleWipes);
      window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-scroll-wipes");
      wipes.forEach(section => section.style.removeProperty("--wipe-remaining"));
      elements.forEach(element => element.classList.remove("reveal-pending"));
    };
  }, []);
  return null;
}
