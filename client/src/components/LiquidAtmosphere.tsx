import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

const INTERACTIVE_GLASS = ".liquid-frame, .liquid-card, .liquid-action, .liquid-code-link, .liquid-tag";

/**
 * A decorative global layer that drives the ambient glass background and the
 * pointer refraction variables used by the existing liquid surfaces.
 */
export default function LiquidAtmosphere() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;

    if (reduceMotion) {
      root.style.setProperty("--liquid-scroll", "0.22");
      root.style.setProperty("--liquid-velocity", "0px");
      root.style.setProperty("--liquid-shift-a", "0px");
      root.style.setProperty("--liquid-shift-b", "0px");
      root.style.setProperty("--liquid-shift-c", "0px");
      root.style.setProperty("--liquid-shift-d", "0px");
      return;
    }

    let frame = 0;
    let running = true;
    let targetScroll = window.scrollY;
    let smoothScroll = targetScroll;
    let lastScroll = targetScroll;

    const render = () => {
      if (!running) return;

      targetScroll = window.scrollY;
      smoothScroll += (targetScroll - smoothScroll) * 0.085;
      const rawVelocity = targetScroll - lastScroll;
      const velocity = Math.max(-42, Math.min(42, rawVelocity));
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(smoothScroll / scrollable, 0), 1);

      root.style.setProperty("--liquid-scroll", progress.toFixed(4));
      root.style.setProperty("--liquid-velocity", `${velocity.toFixed(2)}px`);
      root.style.setProperty("--liquid-shift-a", `${Math.round(-64 + progress * 148)}px`);
      root.style.setProperty("--liquid-shift-b", `${Math.round(progress * -206)}px`);
      root.style.setProperty("--liquid-shift-c", `${Math.round(52 - progress * 132)}px`);
      root.style.setProperty("--liquid-shift-d", `${Math.round(78 + progress * 170)}px`);

      lastScroll += (targetScroll - lastScroll) * 0.16;
      frame = window.requestAnimationFrame(render);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        if (frame) window.cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        frame = window.requestAnimationFrame(render);
      }
    };

    frame = window.requestAnimationFrame(render);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const root = document.documentElement;

    if (reduceMotion) return;

    let frame = 0;
    let nextX = 0;
    let nextY = 0;
    let activeSurface: HTMLElement | null = null;

    const deactivate = () => {
      if (activeSurface) {
        activeSurface.removeAttribute("data-liquid-active");
        activeSurface = null;
      }
      root.style.setProperty("--liquid-pointer-active", "0");
    };

    const renderPointer = () => {
      frame = 0;
      const x = Math.min(Math.max(nextX, 0), window.innerWidth);
      const y = Math.min(Math.max(nextY, 0), window.innerHeight);
      root.style.setProperty("--liquid-pointer-x", `${x}px`);
      root.style.setProperty("--liquid-pointer-y", `${y}px`);
      root.style.setProperty("--liquid-pointer-active", "1");

      if (!activeSurface) return;
      const bounds = activeSurface.getBoundingClientRect();
      const localX = Math.min(Math.max(((x - bounds.left) / bounds.width) * 100, 0), 100);
      const localY = Math.min(Math.max(((y - bounds.top) / bounds.height) * 100, 0), 100);
      activeSurface.style.setProperty("--liquid-x", `${localX.toFixed(2)}%`);
      activeSurface.style.setProperty("--liquid-y", `${localY.toFixed(2)}%`);
    };

    const onPointerMove = (event: PointerEvent | MouseEvent) => {
      if ("pointerType" in event && event.pointerType && event.pointerType !== "mouse") return;
      nextX = event.clientX;
      nextY = event.clientY;

      const target = event.target instanceof Element ? event.target.closest<HTMLElement>(INTERACTIVE_GLASS) : null;
      if (target !== activeSurface) {
        if (activeSurface) activeSurface.removeAttribute("data-liquid-active");
        activeSurface = target;
        activeSurface?.setAttribute("data-liquid-active", "");
      }

      if (!frame) frame = window.requestAnimationFrame(renderPointer);
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      deactivate();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerLeave, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("pointerout", onPointerLeave);
      deactivate();
    };
  }, [reduceMotion]);

  return (
    <div className="liquid-atmosphere" aria-hidden="true">
      <span className="liquid-atmosphere__orb liquid-atmosphere__orb--blue" />
      <span className="liquid-atmosphere__orb liquid-atmosphere__orb--violet" />
      <span className="liquid-atmosphere__orb liquid-atmosphere__orb--pearl" />
      <span className="liquid-atmosphere__sheet liquid-atmosphere__sheet--one" />
      <span className="liquid-atmosphere__sheet liquid-atmosphere__sheet--two" />
      <span className="liquid-atmosphere__grain" />
    </div>
  );
}
