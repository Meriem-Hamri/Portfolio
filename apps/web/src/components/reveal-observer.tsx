"use client";

import { useEffect } from "react";

/**
 * Adds `.is-in` to every `[data-reveal]` element when it scrolls into view.
 * A MutationObserver also picks up elements streamed in after hydration or
 * rendered by a client-side navigation.
 */
export function RevealObserver() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const intersection = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        intersection.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.01 });

    const scan = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach(element => {
        if (reduced) element.classList.add("is-in");
        else intersection.observe(element);
      });
    };
    scan(document);

    const mutations = new MutationObserver(records => {
      for (const record of records) {
        record.addedNodes.forEach(node => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-reveal]:not(.is-in)")) {
            if (reduced) node.classList.add("is-in"); else intersection.observe(node);
          }
          scan(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => { intersection.disconnect(); mutations.disconnect(); };
  }, []);
  return null;
}
