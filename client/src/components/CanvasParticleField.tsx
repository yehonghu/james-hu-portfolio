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
  phase: number;
};

type PointerPosition = {
  x: number;
  y: number;
  active: boolean;
};

const PARTICLE_COLORS = ["115, 185, 255", "154, 132, 255", "104, 237, 221", "231, 241, 255"];
const MOBILE_BREAKPOINT = 768;
const MAX_PIXEL_RATIO = 2;
const POINTER_RADIUS = 210;

const randomBetween = (minimum: number, maximum: number) => minimum + Math.random() * (maximum - minimum);

function createParticle(width: number, height: number): Particle {
  const direction = randomBetween(-Math.PI, Math.PI);
  const speed = randomBetween(0.055, 0.18);

  return {
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    vx: Math.cos(direction) * speed,
    vy: Math.sin(direction) * speed,
    size: randomBetween(1.05, 2.85),
    alpha: randomBetween(0.34, 0.78),
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    phase: randomBetween(0, Math.PI * 2),
  };
}

function paintLightField(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const phase = time * 0.00006;
  const largestDimension = Math.max(width, height);

  const paintOrb = (x: number, y: number, radius: number, color: string, alpha: number) => {
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
    gradient.addColorStop(0.44, `rgba(${color}, ${alpha * 0.38})`);
    gradient.addColorStop(1, `rgba(${color}, 0)`);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  };

  context.globalCompositeOperation = "source-over";
  paintOrb(width * (0.13 + Math.sin(phase) * 0.045), height * (0.15 + Math.cos(phase * 1.2) * 0.035), largestDimension * 0.52, "57, 133, 255", 0.23);
  paintOrb(width * (0.86 + Math.cos(phase * 0.92) * 0.04), height * (0.36 + Math.sin(phase * 1.1) * 0.06), largestDimension * 0.48, "143, 99, 255", 0.19);
  paintOrb(width * (0.42 + Math.sin(phase * 0.78) * 0.05), height * (0.9 + Math.cos(phase) * 0.025), largestDimension * 0.46, "52, 198, 204", 0.14);
}

function paintParticle(context: CanvasRenderingContext2D, particle: Particle, time: number) {
  const pulse = 0.82 + Math.sin(time * 0.00135 + particle.phase) * 0.18;
  const coreRadius = particle.size * pulse;
  const halo = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, coreRadius * 7.5);
  halo.addColorStop(0, `rgba(${particle.color}, ${particle.alpha * 0.34})`);
  halo.addColorStop(0.32, `rgba(${particle.color}, ${particle.alpha * 0.12})`);
  halo.addColorStop(1, `rgba(${particle.color}, 0)`);
  context.fillStyle = halo;
  context.beginPath();
  context.arc(particle.x, particle.y, coreRadius * 7.5, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = `rgba(${particle.color}, ${Math.min(1, particle.alpha * 1.08)})`;
  context.beginPath();
  context.arc(particle.x, particle.y, coreRadius, 0, Math.PI * 2);
  context.fill();
}

/**
 * An independently rendered ambient field. It uses one Canvas, a single rAF
 * loop, and no React state writes after mount, so foreground composition and
 * input remain isolated from the animated background.
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

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      paintLightField(context, width, height, time);
      context.globalCompositeOperation = "lighter";
      for (const particle of particles) paintParticle(context, particle, time);
      context.globalCompositeOperation = "source-over";
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
      draw(0);
    };

    const updateParticle = (particle: Particle, delta: number) => {
      if (pointer.active) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distanceSquared = dx * dx + dy * dy;
        const radiusSquared = POINTER_RADIUS * POINTER_RADIUS;

        if (distanceSquared > 0.01 && distanceSquared < radiusSquared) {
          const distance = Math.sqrt(distanceSquared);
          const influence = (1 - distance / POINTER_RADIUS) * 0.025 * delta;
          particle.vx += (dx / distance) * influence;
          particle.vy += (dy / distance) * influence;
        }
      }

      particle.vx *= 0.998;
      particle.vy *= 0.998;
      const speed = Math.hypot(particle.vx, particle.vy);
      if (speed > 0.26) {
        particle.vx = (particle.vx / speed) * 0.26;
        particle.vy = (particle.vy / speed) * 0.26;
      }

      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;

      const margin = 24;
      if (particle.x < -margin) particle.x = width + margin;
      else if (particle.x > width + margin) particle.x = -margin;
      if (particle.y < -margin) particle.y = height + margin;
      else if (particle.y > height + margin) particle.y = -margin;
    };

    const animate = (time: number) => {
      const delta = previousTime ? Math.min((time - previousTime) / 16.667, 2) : 1;
      previousTime = time;
      for (const particle of particles) updateParticle(particle, delta);
      draw(time);
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
