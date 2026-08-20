import { forwardRef, type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

type LiquidGlassSize = "sm" | "md" | "lg" | "xl";

export type LiquidGlassProps = HTMLAttributes<HTMLDivElement> & {
  /** Controls the default radius and internal spacing of the glass surface. */
  size?: LiquidGlassSize;
  /** Enables cursor-positioned refraction and hover elevation. */
  interactive?: boolean;
};

/**
 * A layered, production-ready glass surface.
 *
 * The CSS implementation separates base refraction, body tint, border,
 * highlight, and inset edge light. Pointer movement only updates CSS variables,
 * avoiding React re-renders during high-frequency interactions.
 */
const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(
  (
    {
      className,
      children,
      size = "md",
      interactive = true,
      onPointerMove,
      onPointerLeave,
      ...props
    },
    ref,
  ) => {
    const updatePointer = (event: PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(event);
      if (!interactive || (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen")) return;

      const bounds = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;
      event.currentTarget.style.setProperty("--mouse-x", `${Math.min(100, Math.max(0, x)).toFixed(2)}%`);
      event.currentTarget.style.setProperty("--mouse-y", `${Math.min(100, Math.max(0, y)).toFixed(2)}%`);
      event.currentTarget.dataset.pointerActive = "true";
    };

    const resetPointer = (event: PointerEvent<HTMLDivElement>) => {
      onPointerLeave?.(event);
      event.currentTarget.style.setProperty("--mouse-x", "28%");
      event.currentTarget.style.setProperty("--mouse-y", "18%");
      delete event.currentTarget.dataset.pointerActive;
    };

    return (
      <div
        ref={ref}
        className={cn("liquid-glass", `liquid-glass--${size}`, className)}
        data-interactive={interactive ? "true" : "false"}
        onPointerMove={updatePointer}
        onPointerLeave={resetPointer}
        {...props}
      >
        <div className="liquid-glass__content">{children}</div>
      </div>
    );
  },
);

LiquidGlass.displayName = "LiquidGlass";

/** Decorative companion layer for pages that need a refraction-rich backdrop. */
export function LiquidGlassBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("liquid-glass-backdrop", className)} aria-hidden="true">
      <div className="liquid-glass-backdrop__orb liquid-glass-backdrop__orb--cobalt" />
      <div className="liquid-glass-backdrop__orb liquid-glass-backdrop__orb--violet" />
      <div className="liquid-glass-backdrop__orb liquid-glass-backdrop__orb--aqua" />
      <div className="liquid-glass-backdrop__orb liquid-glass-backdrop__orb--pearl" />
      <div className="liquid-glass-backdrop__mesh" />
    </div>
  );
}

export default LiquidGlass;
