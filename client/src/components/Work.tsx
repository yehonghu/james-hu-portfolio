/*
 * Titanium Keynote — featured work.
 * Each case presented like a product launch: alternating asymmetric layout,
 * device shots, glass tags, gradient accents.
 */
import { Reveal, SectionLabel } from "./Reveal";
import { ASSETS } from "@/lib/assets";
import { ArrowUpRight, Github } from "lucide-react";

type CaseStudy = {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  images: { src: string; alt: string; className?: string }[];
  layout: "left" | "right";
  link?: { href: string; label: string; icon?: "github" };
  accent: string;
};

const CASES: CaseStudy[] = [
  {
    id: "bookease",
    category: "全栈开发 · Full-Stack Web App",
    title: "BookEase",
    tagline: "本地服务预约平台,告别私信漏单。",
    description:
      "为本地服务商打造的商业级预约系统:客户发布需求、商家竞价接单、日历自动锁位防止撞单、评价体系沉淀口碑,外加管理员总控后台。React + Node.js + MongoDB 全栈架构,JWT 安全认证,已完成云端部署,获课程 A+ 评级。",
    tags: ["React 18", "Node.js / Express", "MongoDB", "JWT 认证", "云端部署", "三端角色系统"],
    images: [
      { src: ASSETS.bookease.home, alt: "BookEase 首页" },
      { src: ASSETS.bookease.customer, alt: "客户仪表盘" },
      { src: ASSETS.bookease.availability, alt: "商家排期日历" },
    ],
    layout: "left",
    link: {
      href: "https://github.com/yehonghu/BookEase-COMP313-Group6-Final",
      label: "查看源码",
      icon: "github",
    },
    accent: "from-[#0A84FF] to-[#5E5CE6]",
  },
  {
    id: "kazan",
    category: "餐饮官网概念 · Restaurant Web Design",
    title: "KAZAN Ramen",
    tagline: "一碗拉面的官网,也是 24 小时的点单前台。",
    description:
      "为多伦多餐饮客户设计的官网+线上点单方案:深色氛围大片式首屏、菜单即刻下单、移动端优先的取餐流程。顾客不再需要在 Instagram 里翻菜单——Google 搜到你,三十秒下完单。",
    tags: ["品牌视觉", "响应式设计", "线上点单 UX", "移动端优先"],
    images: [{ src: ASSETS.kazan, alt: "KAZAN Ramen 官网设备展示" }],
    layout: "right",
    accent: "from-[#FF453A] to-[#FF9F0A]",
  },
  {
    id: "velvet",
    category: "Figma UI/UX · Web Design",
    title: "VELVET Beauty Bar",
    tagline: "先看见成品,再写第一行代码。",
    description:
      "美容工作室的完整 Figma 设计交付:高保真首页 + 四步预约流程(选服务→选时间→填信息→确认),含服务卡片定价与日历时段选择器。客户在开发前就能点击交互原型,把每一个像素确认到位。",
    tags: ["Figma 高保真", "交互原型", "预约流程设计", "设计系统"],
    images: [{ src: ASSETS.velvet, alt: "VELVET Beauty Bar Figma 设计稿" }],
    layout: "left",
    accent: "from-[#FF375F] to-[#FF6482]",
  },
  {
    id: "maple",
    category: "Figma 移动端原型 · Mobile App Design",
    title: "Maple & Co. Cafe",
    tagline: "从线框到高保真,一条完整的设计流水线。",
    description:
      "咖啡品牌移动端点单 App 的 Figma 全流程:低保真线框图 → 高保真界面 → 原型连线演示。首页、菜单、结账三大核心场景,森绿+奶油的品牌配色体系,展示我如何把「想法」一步步变成「可点击的产品」。",
    tags: ["线框图 Wireframe", "高保真 UI", "原型演示", "品牌配色"],
    images: [{ src: ASSETS.mapleCafe, alt: "Maple & Co. Cafe Figma 原型" }],
    layout: "right",
    accent: "from-[#30D158] to-[#66D4CF]",
  },
  {
    id: "lumen",
    category: "品牌设计 · Brand Identity",
    title: "LUMEN Studio",
    tagline: "一套 Logo 之外,是一整套品牌语言。",
    description:
      "多伦多养生工作室的品牌识别系统:几何日出 Logo 与三款变体、五色品牌色板(含精确色值)、衬线×无衬线的字体组合规范,并落地到名片与帆布袋应用。让客户拿到的不只是图,而是可长期使用的品牌规范。",
    tags: ["Logo 设计", "VI 规范", "色彩系统", "Photoshop / Illustrator"],
    images: [{ src: ASSETS.lumen, alt: "LUMEN Studio 品牌识别系统" }],
    layout: "left",
    accent: "from-[#FFD60A] to-[#FF9F0A]",
  },
];

const GALLERY = [
  {
    src: ASSETS.iphone15,
    title: "iPhone 15 Pro 产品页",
    sub: "纯手写 Apple 风格落地页 · HTML/CSS/JS",
    href: "https://yehonghu.github.io/iphone15pro-portfolio",
  },
  {
    src: ASSETS.findHouse,
    title: "Find House 房产平台",
    sub: "高端房地产前端 · 动效与交互升级",
    href: "https://yehonghu.github.io/find-house-portfolio/",
  },
  {
    src: ASSETS.ourPlanet,
    title: "Our Planet 环保主题站",
    sub: "Apple 风多页站点 · 视觉叙事",
    href: "https://yehonghu.github.io/our-planet-environmental-website/",
  },
];

function CaseBlock({ c, index }: { c: CaseStudy; index: number }) {
  const multi = c.images.length > 1;
  const visual = (
    <Reveal delay={0.08} className="relative">
      {multi ? (
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 rounded-2xl overflow-hidden border border-border group">
            <img
              src={c.images[0].src}
              alt={c.images[0].alt}
              loading="lazy"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          {c.images.slice(1).map((im) => (
            <div key={im.src} className="rounded-2xl overflow-hidden border border-border group">
              <img
                src={im.src}
                alt={im.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden border border-border group shadow-[0_30px_60px_-25px_rgba(0,0,0,0.65)]">
          <img
            src={c.images[0].src}
            alt={c.images[0].alt}
            loading="lazy"
            className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
    </Reveal>
  );

  const text = (
    <Reveal className="flex flex-col justify-center">
      <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        <span className="mr-2 text-gravity">{String(index + 1).padStart(2, "0")}</span>
        {c.category}
      </p>
      <h3 className="mt-3 font-display font-bold text-[34px] md:text-[44px] leading-tight text-titanium">
        {c.title}
      </h3>
      <p
        className={`mt-1.5 font-display font-semibold text-[18px] md:text-[20px] bg-gradient-to-r ${c.accent} bg-clip-text text-transparent`}
      >
        {c.tagline}
      </p>
      <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{c.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {c.tags.map((t) => (
          <span
            key={t}
            className="glass rounded-full px-3 py-1 text-[12px] text-secondary-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      {c.link && (
        <a
          href={c.link.href}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:opacity-80 transition-opacity w-fit"
        >
          {c.link.icon === "github" && <Github size={15} />}
          {c.link.label}
          <ArrowUpRight size={14} />
        </a>
      )}
    </Reveal>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {c.layout === "left" ? (
        <>
          {visual}
          {text}
        </>
      ) : (
        <>
          <div className="lg:order-2">{visual}</div>
          <div className="lg:order-1">{text}</div>
        </>
      )}
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-20 md:py-28 relative">
      <div className="container">
        <Reveal>
          <SectionLabel en="Featured Work" zh="精选案例" />
          <h2 className="font-display font-bold text-[36px] md:text-[52px] leading-tight text-titanium max-w-[720px]">
            每一个案例,
            <br />
            都当作一场产品发布。
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-24 flex flex-col gap-24 md:gap-32">
          {CASES.map((c, i) => (
            <CaseBlock key={c.id} c={c} index={i} />
          ))}
        </div>

        {/* Frontend aesthetics gallery */}
        <div className="mt-28">
          <Reveal>
            <SectionLabel en="More Craft" zh="前端美学" />
            <h3 className="font-display font-bold text-[28px] md:text-[36px] text-titanium">
              手感,是练出来的。
            </h3>
            <p className="mt-4 text-[14.5px] text-muted-foreground">
              带 ↗ 的作品均可点击,直接在线浏览真实网页。
            </p>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.06}>
                <a
                  href={g.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-2xl overflow-hidden border border-border glass hover:bg-white/8 transition-colors"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={g.src}
                      alt={g.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[14px] font-semibold flex items-center gap-1">
                      {g.title}
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-primary"
                      />
                    </p>
                    <p className="mt-1 text-[12px] text-muted-foreground">{g.sub}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
