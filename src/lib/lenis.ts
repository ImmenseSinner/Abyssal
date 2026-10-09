import type Lenis from "lenis";

/** Singleton store so any component can command the smooth-scroller. */
export const lenisStore: { current: Lenis | null } = { current: null };

export function scrollToTarget(target: string | number | HTMLElement, offset = 0) {
  const lenis = lenisStore.current;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.6 });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
