import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
  depth = 0,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  depth?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={{ transformStyle: "preserve-3d" }}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 34, rotateX: -8, z: depth ? -depth : 0 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0, z: 0 }}
      viewport={{ once: true, margin: "-10% 0px -6%" }}
      transition={{ duration: reduceMotion ? 0.01 : 0.68, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ label, index }: { label: string; index?: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      {index && <span className="font-mono text-[11px] text-primary/80">{index}</span>}
      <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gravity">{label}</span>
      <span className="hairline w-10" />
    </div>
  );
}
