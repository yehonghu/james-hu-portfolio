import {
  forwardRef,
  useEffect,
  useRef,
  type HTMLAttributes,
  type PointerEvent,
  type Ref,
} from "react";
import { cn } from "@/lib/utils";

type LiquidGlassSize = "sm" | "md" | "lg" | "xl";
type LiquidGlassVariant = "regular" | "clear" | "material";

export type LiquidGlassProps = HTMLAttributes<HTMLDivElement> & {
  /** Controls the concentric radius and optical weight of the surface. */
  size?: LiquidGlassSize;
  /** Selects functional glass, media overlay glass, or a quiet content material. */
  variant?: LiquidGlassVariant;
  /** Enables a small, locally interpolated lens response for intentional controls. */
  interactive?: boolean;
};

type LensState = {
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
};

const setForwardedRef = (ref: Ref<HTMLDivElement>, node: HTMLDivElement | null) => {
  if (typeof ref === "function") ref(node);
  else if (ref) ref.current = node;
};

/**
 * A restrained web interpretation of Liquid Glass.
 *
 * The resting surface stays quiet. Only controls that explicitly opt into
 * `interactive` receive a small lens displacement; the value is interpolated
 * in a local requestAnimationFrame loop without triggering React renders.
 */
const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(
  (
    {
      className,
      children,
      size = "md",
      variant = "regular",
      interactive = false,
      onPointerMove,
      onPointerLeave,
      ...props
    },
    forwardedRef,
  ) => {
    const surfaceRef = useRef<HTMLDivElement | null>(null);
    const frameRef = useRef<number | null>(null);
    const lensRef = useRef<LensState>({
      currentX: 50,
      currentY: 50,
      targetX: 50,
      targetY: 50,
    });

    const setRef = (node: HTMLDivElement | null) => {
      surfaceRef.current = node;
      setForwardedRef(forwardedRef, node);
    };

    const renderLens = () => {
      const surface = surfaceRef.current;
      if (!surface) {
        frameRef.current = null;
        return;
      }

      const lens = lensRef.current;
      lens.currentX += (lens.targetX - lens.currentX) * 0.15;
      lens.currentY += (lens.targetY - lens.currentY) * 0.15;
      surface.style.setProperty("--glass-lens-x", `${lens.currentX.toFixed(2)}%`);
      surface.style.setProperty("--glass-lens-y", `${lens.currentY.toFixed(2)}%`);

      const pending = Math.abs(lens.targetX - lens.currentX) + Math.abs(lens.targetY - lens.currentY);
      if (pending > 0.08) {
        frameRef.current = window.requestAnimationFrame(renderLens);
      } else {
        frameRef.current = null;
      }
    };

    const scheduleLens = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(renderLens);
    };

    const updatePointer = (event: PointerEvent<HTMLDivElement>) => {
      onPointerMove?.(event);
      if (!interactive || (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen")) return;

      const bounds = event.currentTarget.getBoundingClientRect();
      lensRef.current.targetX = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100));
      lensRef.current.targetY = Math.min(100, Math.max(0, ((event.clientY - bounds.top) / bounds.height) * 100));
      event.currentTarget.dataset.pointerActive = "true";
      scheduleLens();
    };

    const resetPointer = (event: PointerEvent<HTMLDivElement>) => {
      onPointerLeave?.(event);
      lensRef.current.targetX = 50;
      lensRef.current.targetY = 50;
      delete event.currentTarget.dataset.pointerActive;
      scheduleLens();
    };

    useEffect(() => () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    }, []);

    return (
      <div
        ref={setRef}
        className={cn("liquid-glass", `liquid-glass--${size}`, `liquid-glass--${variant}`, className)}
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

export default LiquidGlass;
