/*
 * Titanium Keynote — services bento.
 * Glass cards on black, one gradient accent per capability.
 */
import { Reveal, SectionLabel } from "./Reveal";
import { Palette, Figma, Code2, Search, CalendarCheck, Store } from "lucide-react";

const SERVICES = [
  {
    icon: Palette,
    title: "品牌与视觉设计",
    en: "Brand & Visual Identity",
    desc: "Logo、色彩系统、字体规范、宣传物料。用 Photoshop / Illustrator 打磨一套可长期使用的品牌语言,而不是一张一次性的图。",
    points: ["Logo / VI 系统", "海报与营销物料", "印前工艺把控"],
    accent: "from-[#FFD60A] to-[#FF9F0A]",
    span: "",
  },
  {
    icon: Figma,
    title: "网页与 UI/UX 设计",
    en: "Web & Product Design",
    desc: "Figma 线框图 → 高保真界面 → 可点击原型。开发之前,你就能亲手「用」到你的网站,把改动成本压到最低。",
    points: ["Figma 高保真原型", "响应式布局", "预约 / 点单流程 UX"],
    accent: "from-[#FF375F] to-[#BF5AF2]",
    span: "",
  },
  {
    icon: Code2,
    title: "全栈开发与部署",
    en: "Full-Stack Development",
    desc: "React + Node.js + MongoDB 的现代技术栈,从数据库设计、API 编写到 GitHub 自动化部署(CI/CD),一个人交付整条流水线。",
    points: ["预约 / 订餐系统", "后台管理面板", "云端部署 + CI/CD"],
    accent: "from-[#0A84FF] to-[#5E5CE6]",
    span: "",
  },
];

const EXTRAS = [
  {
    icon: Search,
    title: "本地 SEO 基础优化",
    desc: "让多伦多的客户在 Google 搜索时,第一时间找到你。",
  },
  {
    icon: CalendarCheck,
    title: "预约系统定制",
    desc: "日历锁位、防撞单、自动提醒——私信漏单从此成为过去。",
  },
  {
    icon: Store,
    title: "小企业官网套餐",
    desc: "餐饮、美容、服务行业,快速上线的 24 小时品牌门面。",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div
        className="absolute inset-x-0 top-0 h-[420px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 0%, oklch(0.4 0.14 275 / 14%), transparent 70%)",
        }}
      />
      <div className="container relative">
        <Reveal>
          <SectionLabel en="Services" zh="我能为你做什么" />
          <h2 className="font-display font-bold text-[36px] md:text-[52px] leading-tight text-titanium max-w-[760px]">
            从 Logo 到数据库,
            <br />
            一个人,一条流水线。
          </h2>
          <p className="mt-5 text-[15.5px] text-muted-foreground max-w-[560px] leading-relaxed">
            不用在设计师和程序员之间来回传话。设计稿怎么画的,代码就怎么实现——像素级还原,是我给自己的验收标准。
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="glass rounded-3xl p-7 h-full flex flex-col hover:bg-white/8 transition-colors duration-300 group">
                <div
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${s.accent} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105`}
                >
                  <s.icon size={20} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-[20px]">{s.title}</h3>
                <p className="text-[12px] text-muted-foreground uppercase tracking-[0.12em] mt-1">
                  {s.en}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground flex-1">
                  {s.desc}
                </p>
                <ul className="mt-5 flex flex-col gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[13px]">
                      <span
                        className={`w-1 h-1 rounded-full bg-gradient-to-r ${s.accent}`}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          {EXTRAS.map((e, i) => (
            <Reveal key={e.title} delay={0.2 + i * 0.06}>
              <div className="glass rounded-3xl px-6 py-5 flex items-start gap-4 hover:bg-white/8 transition-colors duration-300">
                <e.icon size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-[14px] font-semibold">{e.title}</p>
                  <p className="mt-1 text-[12.5px] text-muted-foreground leading-relaxed">
                    {e.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
