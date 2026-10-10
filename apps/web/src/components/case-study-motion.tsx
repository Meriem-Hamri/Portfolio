"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function CaseStudyMotion({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      root.current?.querySelectorAll<HTMLElement>("[data-case-enter]").forEach(element => {
        // Above-the-fold content stays immediately readable, including deep links.
        if (element.getBoundingClientRect().top < window.innerHeight * .85) return;
        gsap.fromTo(element, { y: 28, opacity: .25 }, {
          y: 0, opacity: 1, duration: .7, ease: "power3.out", clearProps: "transform,opacity",
          scrollTrigger: { trigger: element, start: "top 91%", once: true },
        });
      });
      gsap.fromTo("[data-case-reflection]", { xPercent: -12, rotate: -18 }, {
        xPercent: 12, rotate: 5, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "75% bottom", scrub: 1 },
      });
      root.current?.querySelectorAll<HTMLElement>("[data-case-track]").forEach(element => {
        gsap.fromTo(element, { scaleX: 0 }, {
          scaleX: 1, transformOrigin: "left", ease: "none",
          scrollTrigger: { trigger: element.parentElement, start: "top 80%", end: "bottom 45%", scrub: .5 },
        });
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    const accordions = root.current?.querySelectorAll("details");
    accordions?.forEach(element => element.addEventListener("toggle", refresh));
    return () => { accordions?.forEach(element => element.removeEventListener("toggle", refresh)); media.revert(); };
  }, { scope: root });
  return <article ref={root} className={className}>{children}</article>;
}
