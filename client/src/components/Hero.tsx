import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { useEffect, useRef, type PointerEvent } from "react";
import { ASSETS } from "@/lib/assets";

const EASE = [0.23, 1, 0.32, 1] as const;
const HERO_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4";

const line = (index: number) => ({
  initial: { opacity: 0, y: 34, rotateX: -16 },
  animate: { opacity: 1, y: 0, rotateX: 0 },
  transition: { duration: 0.72, delay: 0.12 + index * 0.09, ease: EASE },
});

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-4.5, 4.5]), {
    stiffness: 190,
    damping: 24,
  });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [3.5, -3.5]), {
    stiffness: 190,
    damping: 24,
  });
  const spotlightX = useTransform(pointerX, [-0.5, 0.5], ["18%", "82%"]);
  const spotlightY = useTransform(pointerY, [-0.5, 0.5], ["18%", "82%"]);
  const spotlight = useMotionTemplate`radial-gradient(circle 18rem at ${spotlightX} ${spotlightY}, rgb(236 245 255 / 18%), rgb(160 190 255 / 7%) 32%, transparent 68%)`;
  const { scrollYProgress } = useScroll();
  const frameY = useTransform(scrollYProgress, [0, 0.32], [0, -38]);
  const frameScale = useTransform(scrollYProgress, [0, 0.32], [1, 0.96]);

  const updatePointer = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      return;
    }

    video.muted = true;
    void video.play().catch(() => undefined);
  }, [reduceMotion]);

  return (
    <section
      id="top"
      className="hero-cinematic relative isolate overflow-hidden pt-28 md:pt-36 pb-20 md:pb-30"
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
    >
      <div aria-hidden="true" className="hero-cinematic__video">
        <video ref={videoRef} autoPlay muted loop playsInline preload="metadata">
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="hero-cinematic__veil" />
      </div>
      <motion.div aria-hidden="true" className="hero-cinematic__spotlight" style={{ background: spotlight }} />
      <div aria-hidden="true" className="hero-cinematic__aura absolute inset-0 pointer-events-none">
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
            <span className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] text-muted-foreground">
              <MapPin size={13} className="text-primary" />
              Toronto, Ontario · Design & Full-Stack Development
            </span>
          </motion.div>

          <h1 className="font-display cinematic-heading text-[50px] font-bold leading-[0.94] sm:text-[68px] lg:text-[88px]">
            <motion.span {...line(1)} className="cinematic-heading__line block text-titanium">
              Design that thinks.
            </motion.span>
            <motion.span {...line(2)} className="cinematic-heading__line block text-titanium">
              Code that delivers.
            </motion.span>
            <motion.span
              {...line(3)}
              className="cinematic-heading__line mt-5 block text-[27px] font-semibold tracking-tight text-gravity sm:text-[36px] lg:text-[42px]"
            >
              One practice. End to end.
            </motion.span>
          </h1>

          <motion.p
            {...line(4)}
            className="mt-8 max-w-[560px] text-[16px] leading-relaxed text-muted-foreground md:text-[18px]"
          >
            I&apos;m <span className="font-medium text-foreground">James Hu</span>, a Toronto-based designer and
            full-stack developer. I turn early ideas into deliberate identities, clear interfaces, and robust
            digital products that are ready to launch.
          </motion.p>

          <motion.div {...line(5)} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="metal-action metal-action--solid btn-press group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold"
            >
              Explore selected work
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="metal-action metal-action--ghost btn-press inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium"
            >
              Start a conversation
              <ArrowDownRight size={16} className="text-primary" />
            </a>
          </motion.div>
        </div>

        <div className="scene relative min-h-[430px] sm:min-h-[520px]">
          <motion.div
            className="scene-stage absolute inset-0 flex items-center justify-center"
            style={reduceMotion ? undefined : { y: frameY, scale: frameScale }}
          >
            <motion.div
              className="depth-card glow-border hero-workspace relative w-full max-w-[600px] overflow-hidden rounded-[2rem] border border-border bg-card/55"
              style={reduceMotion ? undefined : { rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
            >
              <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-tr from-slate-950/35 via-transparent to-sky-300/10" />
              <img
                src={ASSETS.heroWorkspace}
                alt="James Hu's design and development workspace"
                className="aspect-[1.02/1] w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-between rounded-2xl glass-strong px-4 py-3 sm:inset-x-6 sm:bottom-6 sm:px-5">
                <div className="flex items-center gap-3">
                  <img src={ASSETS.logo} alt="JH monogram" className="h-9 w-9 rounded-xl" />
                  <div>
                    <p className="text-[13px] font-semibold leading-tight">Design + engineering</p>
                    <p className="mt-0.5 text-[11.5px] leading-tight text-muted-foreground">One accountable partner</p>
                  </div>
                </div>
                <Sparkles size={17} className="text-sky-300" aria-hidden="true" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="absolute right-[-4%] top-[8%] hidden rounded-2xl glass px-4 py-3 text-[12px] text-muted-foreground shadow-2xl sm:block"
            initial={{ opacity: 0, x: 28, y: 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
          >
            Built for the next move
          </motion.div>
        </div>
      </div>
    </section>
  );
}
