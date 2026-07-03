/*
 * Titanium Keynote — hero.
 * Asymmetric: giant titanium gradient headline left, workspace visual right.
 * Radial blue glow, staggered line entrance.
 */
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { ASSETS } from "@/lib/assets";

const EASE = [0.23, 1, 0.32, 1] as const;
const line = (i: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.12 + i * 0.09, ease: EASE },
});

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24">
      {/* glow backdrop */}
      <div className="absolute inset-0 glow-blue pointer-events-none" />
      <div
        className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.45 0.16 285 / 14%), transparent 65%)",
        }}
      />

      <div className="container relative grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-8 items-center">
        <div>
          <motion.div {...line(0)} className="flex items-center gap-2 mb-6">
            <span className="glass rounded-full px-3.5 py-1.5 text-[12.5px] text-muted-foreground flex items-center gap-1.5">
              <MapPin size={13} className="text-primary" />
              Toronto · 网页设计 & 全栈开发
            </span>
          </motion.div>

          <h1 className="font-display font-bold leading-[1.02] text-[44px] sm:text-[60px] lg:text-[72px]">
            <motion.span {...line(1)} className="block text-titanium">
              设计,写进
            </motion.span>
            <motion.span {...line(2)} className="block text-titanium">
              每一行代码。
            </motion.span>
            <motion.span
              {...line(3)}
              className="block text-gravity text-[26px] sm:text-[34px] lg:text-[40px] mt-4 font-semibold tracking-tight"
            >
              Design × Engineering, in one hand.
            </motion.span>
          </h1>

          <motion.p
            {...line(4)}
            className="mt-7 text-[16px] md:text-[17px] leading-relaxed text-muted-foreground max-w-[520px]"
          >
            我是 <span className="text-foreground font-medium">James Hu</span>
            ,多伦多自由网页设计师 × 全栈工程师。从品牌视觉、Figma
            原型,到预约系统与线上点单的完整开发部署——好看,只是及格线。
          </motion.p>

          <motion.div {...line(5)} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="btn-press group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-[15px] font-semibold hover:opacity-90 transition-opacity"
            >
              查看作品
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#contact"
              className="btn-press inline-flex items-center px-6 py-3 rounded-full glass text-[15px] font-medium hover:bg-white/10 transition-colors"
            >
              预约免费咨询
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden border border-border shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
            <img
              src={ASSETS.heroWorkspace}
              alt="James Hu 的设计与开发工作台"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          {/* floating glass chip */}
          <div className="absolute -bottom-5 left-6 glass-strong rounded-2xl px-5 py-3.5 flex items-center gap-3">
            <img src={ASSETS.logo} alt="JH" className="w-9 h-9 rounded-full" />
            <div>
              <p className="text-[13.5px] font-semibold leading-tight">设计 + 开发,一手包办</p>
              <p className="text-[12px] text-muted-foreground leading-tight mt-0.5">
                拒绝套版 · 支持 SEO · 快速上线
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
