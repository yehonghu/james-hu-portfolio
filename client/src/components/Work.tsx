import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { Reveal, SectionLabel } from "./Reveal";

type ProjectLink = {
  href: string;
  label: string;
  kind: "live" | "github";
};

type CaseStudy = {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  images: { src: string; alt: string }[];
  layout: "left" | "right";
  links?: ProjectLink[];
  accent: string;
};

type IndexProject = {
  src: string;
  title: string;
  status: string;
  description: string;
  href: string;
  sourceHref: string;
};

const CASES: CaseStudy[] = [
  {
    id: "bookease",
    category: "Full-Stack Product · Toronto Public Beta",
    title: "BookEase",
    tagline: "A clearer path from a local request to a confirmed booking.",
    description:
      "A live, full-stack service marketplace built for the Toronto/GTA launch. Customers publish requests, providers respond with offers, and role-aware workflows keep availability, bookings, reviews, profile settings, and administration connected in one dependable system.",
    tags: ["React", "Node.js / Express", "MongoDB Atlas", "JWT", "Role-Aware UX", "Render"],
    images: [{ src: ASSETS.bookeaseLive, alt: "Current BookEase Toronto public beta homepage" }],
    layout: "left",
    links: [
      { href: "https://bookease-5e97.onrender.com", label: "Open live MVP", kind: "live" },
      { href: "https://github.com/yehonghu/BookEase-COMP313-Group6-Final", label: "View source", kind: "github" },
    ],
    accent: "from-sky-300 via-blue-400 to-violet-400",
  },
  {
    id: "kazan",
    category: "Restaurant Experience · Product Direction",
    title: "KAZAN Ramen",
    tagline: "A restaurant website designed to move guests from discovery to order.",
    description:
      "A high-energy concept for a Toronto restaurant: a cinematic first impression, a mobile-first menu, and a friction-light path to ordering. The experience is designed to turn a local search into a confident next action.",
    tags: ["Brand Direction", "Responsive Design", "Ordering UX", "Mobile First"],
    images: [{ src: ASSETS.kazan, alt: "KAZAN Ramen web experience" }],
    layout: "right",
    accent: "from-orange-300 via-rose-400 to-amber-300",
  },
  {
    id: "velvet",
    category: "Figma UI/UX · Service Design",
    title: "VELVET Beauty Bar",
    tagline: "Make the experience visible before the first line of code.",
    description:
      "A high-fidelity website and booking flow for a beauty studio. The prototype brings service selection, availability, personal details, and confirmation into a clear four-step journey that stakeholders can test before development starts.",
    tags: ["Figma", "Interactive Prototype", "Booking Flow", "Design System"],
    images: [{ src: ASSETS.velvet, alt: "VELVET Beauty Bar interface design" }],
    layout: "left",
    accent: "from-pink-300 via-rose-400 to-fuchsia-300",
  },
  {
    id: "maple",
    category: "Mobile Prototype · Product Design",
    title: "Maple & Co. Cafe",
    tagline: "A complete product path from wireframe to tap-ready prototype.",
    description:
      "A mobile ordering concept developed through low-fidelity wireframes, high-fidelity interface design, and connected prototype flows. The work focuses on the three moments that define the experience: discovery, menu selection, and checkout.",
    tags: ["Wireframes", "High-Fidelity UI", "Prototype Design", "Brand System"],
    images: [{ src: ASSETS.mapleCafe, alt: "Maple and Co. Cafe mobile prototype" }],
    layout: "right",
    accent: "from-emerald-300 via-teal-400 to-cyan-300",
  },
  {
    id: "lumen",
    category: "Brand Identity · Visual System",
    title: "LUMEN Studio",
    tagline: "A brand is not a logo. It is a system people can recognize.",
    description:
      "A visual identity system for a wellness studio, including a geometric sunrise mark, logo variations, a five-color palette, typography direction, and practical applications. The goal was a brand language that remains consistent beyond the launch asset.",
    tags: ["Identity Design", "Logo System", "Color Strategy", "Illustrator / Photoshop"],
    images: [{ src: ASSETS.lumen, alt: "LUMEN Studio brand identity system" }],
    layout: "left",
    accent: "from-amber-200 via-yellow-300 to-orange-300",
  },
];

const PROJECT_INDEX: IndexProject[] = [
  {
    src: ASSETS.bookeaseLive,
    title: "BookEase",
    status: "Toronto public beta",
    description: "A live local-service marketplace with role-aware booking, provider offers, account controls, and operations workflow.",
    href: "https://bookease-5e97.onrender.com",
    sourceHref: "https://github.com/yehonghu/BookEase-COMP313-Group6-Final",
  },
  {
    src: ASSETS.psychMindLive,
    title: "PsychMind",
    status: "Interactive study hub",
    description: "An editorial psychology learning experience shaped around guided modules, concept review, and practice.",
    href: "https://yehonghu.github.io/psychology-study/",
    sourceHref: "https://github.com/yehonghu/psychology-study",
  },
  {
    src: ASSETS.findHouseLive,
    title: "Find House",
    status: "Real-estate discovery",
    description: "A casebook-led residence browser with cinematic interiors, refined navigation, and motion-based exploration.",
    href: "https://yehonghu.github.io/find-house-portfolio/",
    sourceHref: "https://github.com/yehonghu/find-house-portfolio",
  },
  {
    src: ASSETS.ourPlanetLive,
    title: "Our Planet",
    status: "Environmental editorial",
    description: "A content-first environmental website that pairs visual narrative with an accessible, focused reading flow.",
    href: "https://yehonghu.github.io/our-planet-environmental-website/",
    sourceHref: "https://github.com/yehonghu/our-planet-environmental-website",
  },
  {
    src: ASSETS.iphone15Live,
    title: "iPhone 15 Pro Study",
    status: "Product-page interaction",
    description: "A responsive product presentation focused on visual detail, interaction polish, and premium information hierarchy.",
    href: "https://yehonghu.github.io/iphone15pro-portfolio/",
    sourceHref: "https://github.com/yehonghu/iphone15pro-portfolio",
  },
  {
    src: ASSETS.gameLibraryLive,
    title: "Game Library",
    status: "Interactive catalogue",
    description: "A spatial game catalogue with an orbital visual language, collection state, and playful public demo flow.",
    href: "https://yehonghu.github.io/Group9_COMP308Lab1_Ex2/",
    sourceHref: "https://github.com/yehonghu/Group9_COMP308Lab1_Ex2",
  },
];

function ProjectActions({ links }: { links: ProjectLink[] }) {
  return (
    <div className="mt-7 flex flex-wrap gap-2.5">
      {links.map((link) => {
        const Icon = link.kind === "live" ? ExternalLink : Github;
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={link.kind === "live" ? "liquid-action liquid-action--primary" : "liquid-action"}
          >
            <Icon size={14} />
            {link.label}
            <ArrowUpRight size={13} />
          </a>
        );
      })}
    </div>
  );
}

function CaseBlock({ study, index }: { study: CaseStudy; index: number }) {
  const reduceMotion = useReducedMotion();
  const visual = (
    <Reveal depth={28} delay={0.05} className="scene relative">
      <motion.div
        className="liquid-frame depth-card group relative overflow-hidden rounded-[1.75rem]"
        whileHover={reduceMotion ? undefined : { y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <img
          src={study.images[0].src}
          alt={study.images[0].alt}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.018]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/28 via-transparent to-white/10" />
        <div aria-hidden="true" className="liquid-frame__sheen" />
      </motion.div>
    </Reveal>
  );

  const copy = (
    <Reveal depth={14} className="flex flex-col justify-center">
      <p className="portfolio-index-eyebrow text-[12px] font-semibold uppercase text-muted-foreground">
        <span className="mr-2 font-mono text-primary">{String(index + 1).padStart(2, "0")}</span>
        {study.category}
      </p>
      <h3 className="mt-3 font-display text-[38px] font-semibold leading-[1.02] text-titanium md:text-[52px]">{study.title}</h3>
      <p className={`mt-3 bg-gradient-to-r ${study.accent} bg-clip-text text-[17px] font-semibold leading-snug text-transparent md:text-[20px]`}>
        {study.tagline}
      </p>
      <p className="mt-5 max-w-[34rem] text-[15.5px] leading-relaxed text-muted-foreground">{study.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <span key={tag} className="liquid-tag">{tag}</span>
        ))}
      </div>
      {study.links && <ProjectActions links={study.links} />}
    </Reveal>
  );

  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {study.layout === "left" ? (
        <>{visual}{copy}</>
      ) : (
        <><div className="lg:order-2">{visual}</div><div className="lg:order-1">{copy}</div></>
      )}
    </article>
  );
}

export default function Work() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="work" className="portfolio-index-stage relative py-24 md:py-36">
      <div aria-hidden="true" className="portfolio-index-orbit"><span /><i /></div>
      <div aria-hidden="true" className="absolute inset-x-0 top-20 h-[560px] bg-[radial-gradient(ellipse_at_75%_30%,rgba(75,120,255,0.10),transparent_62%)]" />
      <div className="container relative">
        <Reveal>
          <SectionLabel label="Selected Work" index="01" />
          <h2 className="max-w-[820px] font-display text-[42px] font-semibold leading-[1.01] text-titanium md:text-[64px]">
            A body of work built from more than one point of view.
          </h2>
          <p className="mt-5 max-w-[650px] text-[16px] leading-relaxed text-muted-foreground">
            A continuing collection of product systems, visual identities, interactive prototypes, and launch-ready applications. Every project retains its own purpose and visual language.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-28 md:mt-28 md:gap-36">
          {CASES.map((study, index) => <CaseBlock key={study.id} study={study} index={index} />)}
        </div>

        <div className="mt-28 border-t border-border pt-20 md:mt-36 md:pt-24">
          <Reveal>
            <SectionLabel label="Complete Project Index" index="02" />
            <h3 className="max-w-[740px] font-display text-[34px] font-semibold leading-[1.08] text-titanium md:text-[48px]">Every upgraded build, ready to open.</h3>
            <p className="mt-4 max-w-[650px] text-[14.5px] leading-relaxed text-muted-foreground">
              This is the live index of the portfolio’s upgraded software projects. Each glass card leads directly to the current public build and its GitHub source—without repeating the portfolio itself as a project.
            </p>
          </Reveal>
          <div className="scene mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {PROJECT_INDEX.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.055} depth={index * 9}>
                <motion.article
                  className="liquid-card depth-card group overflow-hidden rounded-[1.55rem]"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 30 }}
                >
                  <a href={project.href} target="_blank" rel="noreferrer" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.55rem]">
                      <img src={project.src} alt={`${project.title} current live homepage`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.018]" />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/62 via-transparent to-transparent" />
                      <span className="liquid-status absolute bottom-3 left-3">{project.status} <ArrowUpRight size={12} /></span>
                    </div>
                  </a>
                  <div className="portfolio-card-copy relative p-5">
                    <div aria-hidden="true" className="liquid-card__glow" />
                    <p className="portfolio-index-eyebrow relative text-[9px] font-semibold uppercase text-primary/85">Current live build</p>
                    <a href={project.href} target="_blank" rel="noreferrer" className="relative mt-2 inline-flex items-center gap-1 font-display text-[23px] font-semibold leading-tight text-titanium transition-colors hover:text-primary">
                      {project.title}<ArrowUpRight size={15} className="text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <p className="relative mt-2 min-h-[42px] text-[12px] leading-relaxed text-muted-foreground">{project.description}</p>
                    <div className="relative mt-5 flex items-center justify-between gap-3">
                      <a href={project.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary transition-opacity hover:opacity-75">
                        Open project <ExternalLink size={12} />
                      </a>
                      <a href={project.sourceHref} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source code`} className="liquid-code-link">
                        <Github size={12} /> Code
                      </a>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
