/*
 * Titanium Keynote — process timeline.
 * Four keynote-style steps with gradient numerals and hairlines.
 */
import { Reveal, SectionLabel } from "./Reveal";

const STEPS = [
  {
    num: "01",
    title: "聊需求",
    en: "Discovery",
    desc: "微信或小红书私信聊聊你的生意:目标客户是谁、最想解决什么问题、预算和时间线。免费,无压力。",
    duration: "1–2 天",
  },
  {
    num: "02",
    title: "Figma 原型",
    en: "Design & Prototype",
    desc: "先出品牌方向与高保真设计稿,做成可点击的交互原型。你确认每一个页面之后,才进入开发。",
    duration: "3–7 天",
  },
  {
    num: "03",
    title: "开发实现",
    en: "Build",
    desc: "React + Node.js 现代技术栈,像素级还原设计稿。预约、点单、后台管理,按需定制,进度随时同步。",
    duration: "1–3 周",
  },
  {
    num: "04",
    title: "上线与优化",
    en: "Launch & SEO",
    desc: "域名绑定、云端部署、本地 SEO 基础配置一步到位。上线后提供维护支持,让网站持续为你工作。",
    duration: "2–3 天",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 md:py-28">
      <div className="container">
        <Reveal>
          <SectionLabel en="Process" zh="合作流程" />
          <h2 className="font-display font-bold text-[36px] md:text-[52px] leading-tight text-titanium">
            透明的四步,
            <br />
            从想法到上线。
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.07}>
              <div className="relative rounded-3xl border border-border p-7 h-full hover:border-white/20 transition-colors duration-300">
                <p className="font-display font-bold text-[44px] leading-none text-gravity">
                  {s.num}
                </p>
                <h3 className="mt-5 font-display font-bold text-[19px]">{s.title}</h3>
                <p className="text-[11.5px] text-muted-foreground uppercase tracking-[0.14em] mt-0.5">
                  {s.en}
                </p>
                <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                <p className="mt-5 inline-flex glass rounded-full px-3 py-1 text-[11.5px] text-secondary-foreground">
                  {s.duration}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
