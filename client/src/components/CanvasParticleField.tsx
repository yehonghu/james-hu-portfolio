import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
};

type PointerPosition = {
  x: number;
  y: number;
  active: boolean;
};

const PARTICLE_COLORS = ["116, 179, 255", "148, 126, 255", "110, 222, 228", "224, 236, 255"];
const MOBILE_BREAKPOINT = 768;
const MAX_PIXEL_RATIO = 2;
const POINTER_RADIUS = 190;

const randomBetween = (minimum: number, maximum: number) => minimum + Math.random() * (maximum - minimum);

function createParticle(width: number, height: number): Particle {
  const direction = randomBetween(-Math.PI, Math.PI);
  const speed = randomBetween(0.045, 0.16);

  return {
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    vx: Math.cos(direction) * speed,
    vy: Math.sin(direction) * speed,
    size: randomBetween(0.8, 2.3),
    alpha: randomBetween(0.12, 0.42),
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
  };
}

/**
 * A single, pointer-inert Canvas layer for ambient motion.
 *
 * It does no React state work after mounting. The animation is tied to browser
 * repaint through requestAnimationFrame and all subscriptions are removed on
 * unmount. The visual is deliberately quiet so foreground controls remain the
 * only active Liquid Glass layer.
 */
export default function CanvasParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    let frameId: number | null = null;
    let previousTime = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const pointer: PointerPosition = { x: -1000, y: -1000, active: false };

    const redraw = () => {
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        context.beginPath();
        context.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = width < MOBILE_BREAKPOINT ? 40 : 80;
      particles = Array.from({ length: count }, () => createParticle(width, height));
      redraw();
    };

    const updateParticle = (particle: Particle, delta: number) => {
      if (pointer.active) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distanceSquared = dx * dx + dy * dy;
        const radiusSquared = POINTER_RADIUS * POINTER_RADIUS;

        if (distanceSquared > 0.01 && distanceSquared < radiusSquared) {
          const distance = Math.sqrt(distanceSquared);
          const influence = (1 - distance / POINTER_RADIUS) * 0.018 * delta;
          particle.vx += (dx / distance) * influence;
          particle.vy += (dy / distance) * influence;
        }
      }

      particle.vx *= 0.998;
      particle.vy *= 0.998;
      const speed = Math.hypot(particle.vx, particle.vy);
      if (speed > 0.22) {
        particle.vx = (particle.vx / speed) * 0.22;
        particle.vy = (particle.vy / speed) * 0.22;
      }

      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;

      const margin = 10;
      if (particle.x < -margin) particle.x = width + margin;
      else if (particle.x > width + margin) particle.x = -margin;
      if (particle.y < -margin) particle.y = height + margin;
      else if (particle.y > height + margin) particle.y = -margin;
    };

    const animate = (time: number) => {
      const delta = previousTime ? Math.min((time - previousTime) / 16.667, 2) : 1;
      previousTime = time;
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        updateParticle(particle, delta);
        context.beginPath();
        context.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      frameId = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const deactivatePointer = () => {
      pointer.active = false;
      pointer.x = -1000;
      pointer.y = -1000;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", deactivatePointer, { passive: true });
    document.addEventListener("pointerleave", deactivatePointer, { passive: true });

    if (!reduceMotion) frameId = window.requestAnimationFrame(animate);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", deactivatePointer);
      document.removeEventListener("pointerleave", deactivatePointer);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className="canvas-particle-field" aria-hidden="true" />;
}
