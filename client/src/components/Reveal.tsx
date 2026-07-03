/*
 * Titanium Keynote — scroll reveal primitives.
 * fade + rise (y 24→0), ≤500ms, ease-out, stagger 60ms. No bounce.
 */
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ en, zh }: { en: string; zh: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-gravity">
        {en}
      </span>
      <span className="hairline w-10" />
      <span className="text-[13px] text-muted-foreground tracking-wide">{zh}</span>
    </div>
  );
}
