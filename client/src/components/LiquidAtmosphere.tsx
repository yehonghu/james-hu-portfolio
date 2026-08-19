import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Decorative, non-interactive background layer. Scroll progress only changes
 * CSS custom properties so the visual motion stays on the compositor path.
 */
export default function LiquidAtmosphere() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;

    if (reduceMotion) {
      root.style.setProperty("--liquid-scroll", "0.22");
      root.style.setProperty("--liquid-shift-a", "0px");
      root.style.setProperty("--liquid-shift-b", "0px");
      root.style.setProperty("--liquid-shift-c", "0px");
      root.style.setProperty("--liquid-shift-d", "0px");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
      root.style.setProperty("--liquid-scroll", progress.toFixed(4));
      root.style.setProperty("--liquid-shift-a", `${Math.round(-56 + progress * 132)}px`);
      root.style.setProperty("--liquid-shift-b", `${Math.round(progress * -190)}px`);
      root.style.setProperty("--liquid-shift-c", `${Math.round(44 - progress * 118)}px`);
      root.style.setProperty("--liquid-shift-d", `${Math.round(72 + progress * 156)}px`);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
