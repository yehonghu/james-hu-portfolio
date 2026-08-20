import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight, ArrowRight, MapPin, Sparkles } from "lucide-react";
import type { PointerEvent } from "react";
import { ASSETS } from "@/lib/assets";
import LiquidGlass from "./LiquidGlass";

const EASE = [0.23, 1, 0.32, 1] as const;

const line = (index: number) => ({
  initial: { opacity: 0, y: 34, rotateX: -16 },
  animate: { opacity: 1, y: 0, rotateX: 0 },
  transition: { duration: 0.72, delay: 0.12 + index * 0.09, ease: EASE },
});

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 190,
    damping: 22,
  });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), {
    stiffness: 190,
    damping: 22,
  });
  const { scrollYProgress } = useScroll();
  const frameY = useTransform(scrollYProgress, [0, 0.32], [0, -38]);
  const frameScale = useTransform(scrollYProgress, [0, 0.32], [1, 0.96]);

  const updatePointer = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 md:pt-36 pb-20 md:pb-30">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="ambient-grid absolute -top-14 left-[-20%] h-[760px] w-[140%] opacity-75" />
        <motion.div
          className="orb absolute -top-24 left-[4%] h-64 w-64 bg-sky-400/20"
          animate={reduceMotion ? undefined : { x: [0, 22, 0], y: [0, 30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="orb absolute right-[5%] top-28 h-72 w-72 bg-violet-500/16"
          animate={reduceMotion ? undefined : { x: [0, -34, 0], y: [0, -20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 glow-blue opacity-80" />
      </div>

      <div className="container relative grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
        <div className="relative z-10">
          <motion.div {...line(0)} className="mb-7 flex items-center gap-2">
            <LiquidGlass size="sm" interactive={false} className="inline-block rounded-full">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] text-muted-foreground">
                <MapPin size={13} className="text-primary" />
                Toronto, Ontario · Design & Full-Stack Development
              </span>
            </LiquidGlass>
          </motion.div>

          <h1 className="font-display text-[50px] font-bold leading-[0.94] sm:text-[68px] lg:text-[88px]">
            <motion.span {...line(1)} className="block text-titanium">
              Design that thinks.
            </motion.span>
            <motion.span {...line(2)} className="block text-titanium">
              Code that delivers.
            </motion.span>
            <motion.span
              {...line(3)}
              className="mt-5 block text-[27px] font-semibold tracking-tight text-gravity drop-shadow-[0_8px_24px_rgba(75,145,255,0.22)] sm:text-[36px] lg:text-[42px]"
            >
              One practice. End to end.
            </motion.span>
          </h1>

          <motion.p
            {...line(4)}
            className="mt-8 max-w-[560px] text-[16px] leading-relaxed text-slate-200/90 drop-shadow-[0_2px_16px_rgba(4,8,22,0.75)] md:text-[18px]"
          >
            I&apos;m <span className="font-medium text-foreground">James Hu</span>, a Toronto-based designer and
            full-stack developer. I turn early ideas into deliberate identities, clear interfaces, and robust
            digital products that are ready to launch.
          </motion.p>

          <motion.div {...line(5)} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="btn-press group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_rgba(88,144,255,0.65)] hover:opacity-95"
            >
              Explore selected work
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <LiquidGlass size="sm" className="inline-block rounded-full">
              <a href="#contact" className="btn-press inline-flex items-center gap-2 px-6 py-3 text-[15px] font-medium text-foreground">
                Start a conversation
                <ArrowDownRight size={16} className="text-primary" />
              </a>
            </LiquidGlass>
          </motion.div>
        </div>

        <div className="scene relative min-h-[430px] sm:min-h-[520px]" onPointerMove={updatePointer} onPointerLeave={resetPointer}>
          <motion.div
            className="scene-stage absolute inset-0 flex items-center justify-center"
            style={reduceMotion ? undefined : { y: frameY, scale: frameScale }}
          >
            <motion.div
              className="w-full max-w-[600px]"
              style={reduceMotion ? undefined : { rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
            >
              <LiquidGlass size="xl" className="depth-card overflow-hidden rounded-[2rem]">
                <div className="relative overflow-hidden rounded-[inherit]">
                  <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-tr from-slate-950/35 via-transparent to-sky-300/10" />
                  <img
                    src={ASSETS.heroWorkspace}
                    alt="James Hu's design and development workspace"
                    className="aspect-[1.02/1] w-full object-cover"
                    loading="eager"
                  />
                  <LiquidGlass size="sm" className="absolute inset-x-4 bottom-4 z-20 rounded-2xl sm:inset-x-6 sm:bottom-6" interactive={false}>
                    <div className="flex items-center justify-between px-4 py-3 sm:px-5">
                      <div className="flex items-center gap-3">
                        <img src={ASSETS.logo} alt="JH monogram" className="h-9 w-9 rounded-xl" />
                        <div>
                          <p className="text-[13px] font-semibold leading-tight">Design + engineering</p>
                          <p className="mt-0.5 text-[11.5px] leading-tight text-muted-foreground">One accountable partner</p>
                        </div>
                      </div>
                      <Sparkles size={17} className="text-sky-300" aria-hidden="true" />
                    </div>
                  </LiquidGlass>
                </div>
              </LiquidGlass>
            </motion.div>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="absolute right-[-4%] top-[8%] hidden sm:block"
            initial={{ opacity: 0, x: 28, y: 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
          >
            <LiquidGlass size="sm" className="rounded-2xl shadow-2xl" interactive={false}>
              <span className="block px-4 py-3 text-[12px] text-muted-foreground">Built for the next move</span>
            </LiquidGlass>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
