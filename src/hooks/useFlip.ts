import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Flip, useGSAP);

export function useFlip(scope: RefObject<HTMLElement | null>, deps: unknown[]) {
  const state = useRef<ReturnType<typeof Flip.getState> | null>(null);

  useGSAP(() => {}, { scope });

  const capture = () => {
    const root = scope.current;
    if (!root) return;
    state.current = Flip.getState(root.querySelectorAll("[data-flip-id]"));
  };

  useLayoutEffect(() => {
    if (!state.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    Flip.from(state.current, {
      duration: reduce ? 0 : 0.6,
      ease: "power2.inOut",
      absolute: true,
      stagger: reduce ? 0 : 0.035,
      fade: true,
    });
    state.current = null;
  }, deps);

  return capture;
}
