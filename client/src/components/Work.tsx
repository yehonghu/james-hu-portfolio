import { motion, useReducedMotion } from "framer-motion";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
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
  links: ProjectLink[];
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
    category: "Flagship Product · Toronto Public Beta",
    title: "BookEase",
    tagline: "A local-service handoff that stays clear from request to review.",
    description:
      "A live, full-stack service marketplace built for the Toronto/GTA launch. Customers publish requests, providers respond with offers, and role-aware workflows keep availability, bookings, reviews, account controls, and administration connected in one dependable system.",
    tags: ["React", "Node.js / Express", "MongoDB Atlas", "JWT", "Role-Aware UX", "Render"],
    images: [
      { src: ASSETS.bookease.home, alt: "BookEase public beta landing page" },
      { src: ASSETS.bookease.customer, alt: "BookEase customer dashboard" },
      { src: ASSETS.bookease.availability, alt: "BookEase provider availability calendar" },
    ],
    layout: "left",
    links: [
      { href: "https://bookease-5e97.onrender.com", label: "Open live MVP", kind: "live" },
      { href: "https://github.com/yehonghu/BookEase-COMP313-Group6-Final", label: "View source", kind: "github" },
    ],
    accent: "from-sky-300 via-blue-400 to-violet-400",
  },
  {
    id: "psychmind",
    category: "Learning Experience · Interactive Study System",
    title: "PsychMind",
    tagline: "A psychology study hub that makes an invisible subject feel learnable.",
    description:
      "An editorial learning experience shaped around connected modules, clear concept review, and focused practice. Its motion-led home page turns study planning into a calmer, more legible journey through psychology fundamentals.",
    tags: ["Learning UX", "Editorial Interface", "Responsive Design", "Motion System", "Study Modules"],
    images: [{ src: ASSETS.psychMind, alt: "PsychMind interactive psychology study hub" }],
    layout: "right",
    links: [
      { href: "https://yehonghu.github.io/psychology-study/", label: "Open study hub", kind: "live" },
      { href: "https://github.com/yehonghu/psychology-study", label: "View source", kind: "github" },
    ],
    accent: "from-violet-300 via-indigo-400 to-sky-300",
  },
];

const PROJECT_INDEX: IndexProject[] = [
  {
    src: ASSETS.findHouse,
    title: "Find House",
    status: "Real-estate discovery",
    description: "An atmospheric residence browser with case-led storytelling, refined imagery, and motion-based exploration.",
    href: "https://yehonghu.github.io/find-house-portfolio/",
    sourceHref: "https://github.com/yehonghu/find-house-portfolio",
  },
  {
    src: ASSETS.ourPlanet,
    title: "Our Planet",
    status: "Environmental editorial",
    description: "A content-first environmental website that pairs visual narrative with an accessible, focused reading flow.",
    href: "https://yehonghu.github.io/our-planet-environmental-website/",
    sourceHref: "https://github.com/yehonghu/our-planet-environmental-website",
  },
  {
    src: ASSETS.iphone15,
    title: "iPhone 15 Pro Study",
    status: "Product-page interaction",
    description: "A responsive product presentation focused on visual detail, interaction polish, and premium information hierarchy.",
    href: "https://yehonghu.github.io/iphone15pro-portfolio/",
    sourceHref: "https://github.com/yehonghu/iphone15pro-portfolio",
  },
  {
    src: ASSETS.gameLibrary,
    title: "Game Library",
    status: "Interactive catalogue",
    description: "A spatially inspired game catalogue with a distinct orbital visual language, collection state, and public demo flow.",
    href: "https://yehonghu.github.io/Group9_COMP308Lab1_Ex2/",
    sourceHref: "https://github.com/yehonghu/Group9_COMP308Lab1_Ex2",
  },
  {
    src: ASSETS.heroWorkspace,
    title: "James Hu Portfolio",
    status: "Portfolio system",
    description: "The evolving keynote-style home for the complete upgraded project collection, product thinking, and visual direction.",
    href: "https://yehonghu.github.io/james-hu-portfolio/",
    sourceHref: "https://github.com/yehonghu/james-hu-portfolio",
  },
];

function TiltSurface({ children, className, intensity = 7 }: { children: ReactNode; className: string; intensity?: number }) {
  const reduceMotion = useReducedMotion();

  const handleMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * intensity * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * intensity * 2;
    event.currentTarget.style.setProperty("--tilt-x", `${x.toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(-y).toFixed(2)}deg`);
  };

  const resetTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
    event.currentTarget.style.setProperty("--tilt-lift", "0px");
    event.currentTarget.style.setProperty("--tilt-scale", "1");
  };

  const raiseTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!reduceMotion) event.currentTarget.style.setProperty("--tilt-lift", "-8px");
  };

  const pressTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!reduceMotion) event.currentTarget.style.setProperty("--tilt-scale", "0.985");
  };

  const releaseTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--tilt-scale", "1");
  };

  return (
    <motion.div
      className={className}
      onPointerEnter={raiseTilt}
      onPointerMove={handleMove}
      onPointerLeave={resetTilt}
      onPointerDown={pressTilt}
      onPointerUp={releaseTilt}
      style={{ transform: "perspective(1500px) rotateX(var(--tilt-y, 0deg)) rotateY(var(--tilt-x, 0deg)) translateY(var(--tilt-lift, 0px)) scale(var(--tilt-scale, 1))" }}
    >
      {children}
    </motion.div>
  );
}

function ProjectActions({ links }: { links: ProjectLink[] }) {
  return (
    <div className="mt-7 flex flex-wrap gap-2.5">
      {links.map((link) => {
        const LiveIcon = link.kind === "live" ? ExternalLink : Github;
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={
              link.kind === "live"
                ? "inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[12px] font-semibold text-primary-foreground shadow-[0_10px_24px_rgba(66,106,255,0.23)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                : "inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.035] px-4 py-2 text-[12px] font-semibold text-secondary-foreground transition duration-200 hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary active:scale-[0.97]"
            }
          >
            <LiveIcon size={14} />
            {link.label}
            <ArrowUpRight size={13} />
          </a>
        );
      })}
    </div>
  );
}

function CaseBlock({ study, index }: { study: CaseStudy; index: number }) {
  const multiImage = study.images.length > 1;
  const visual = (
    <Reveal depth={40} delay={0.05} className="scene relative">
      <TiltSurface className="portfolio-case-visual depth-card relative overflow-hidden rounded-[1.75rem] border border-border bg-card/45" intensity={study.layout === "left" ? 5.5 : 5}>
        {multiImage ? (
          <div className="grid grid-cols-2 gap-2.5 p-2.5">
            <div className="col-span-2 overflow-hidden rounded-[1.2rem]">
              <img
                src={study.images[0].src}
                alt={study.images[0].alt}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            {study.images.slice(1).map((image) => (
              <div key={image.src} className="overflow-hidden rounded-[1.2rem]">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </div>
            ))}
          </div>
        ) : (
          <img
            src={study.images[0].src}
            alt={study.images[0].alt}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-[1.035]"
          />
        )}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/35 via-transparent to-white/5" />
      </TiltSurface>
    </Reveal>
  );

  const copy = (
    <Reveal depth={18} className="flex flex-col justify-center">
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        <span className="mr-2 font-mono text-primary">{String(index + 1).padStart(2, "0")}</span>
        {study.category}
      </p>
      <h3 className="mt-3 font-display text-[36px] font-bold leading-tight text-titanium md:text-[48px]">{study.title}</h3>
      <p className={`mt-2 bg-gradient-to-r ${study.accent} bg-clip-text text-[18px] font-semibold text-transparent md:text-[20px]`}>
        {study.tagline}
      </p>
      <p className="mt-5 text-[15.5px] leading-relaxed text-muted-foreground">{study.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-border bg-white/[0.025] px-3 py-1 text-[12px] text-secondary-foreground">
            {tag}
          </span>
        ))}
      </div>
      <ProjectActions links={study.links} />
    </Reveal>
  );

  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {study.layout === "left" ? (
        <>
          {visual}
          {copy}
        </>
      ) : (
        <>
          <div className="lg:order-2">{visual}</div>
          <div className="lg:order-1">{copy}</div>
        </>
      )}
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="portfolio-index-stage relative py-24 md:py-36">
      <div aria-hidden="true" className="portfolio-index-orbit"><span /><i /></div>
      <div aria-hidden="true" className="absolute inset-x-0 top-20 h-[560px] bg-[radial-gradient(ellipse_at_75%_30%,rgba(75,120,255,0.10),transparent_62%)]" />
      <div className="container relative">
        <Reveal>
          <SectionLabel label="Upgraded Project Collection" index="01" />
          <h2 className="max-w-[820px] font-display text-[40px] font-bold leading-[1.02] text-titanium md:text-[60px]">
            Every project, current and ready to explore.
          </h2>
          <p className="mt-5 max-w-[650px] text-[16px] leading-relaxed text-muted-foreground">
            A focused index of the complete upgraded portfolio. Each project keeps its own visual language, while every card offers a direct path into the live experience and its source repository.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-28 md:mt-28 md:gap-36">
          {CASES.map((study, index) => (
            <CaseBlock key={study.id} study={study} index={index} />
          ))}
        </div>

        <div className="mt-28 border-t border-border pt-20 md:mt-36 md:pt-24">
          <Reveal>
            <SectionLabel label="Complete Project Index" index="02" />
            <h3 className="max-w-[700px] font-display text-[32px] font-bold text-titanium md:text-[42px]">Five more upgraded experiences, one quick way in.</h3>
            <p className="mt-4 max-w-[620px] text-[14.5px] leading-relaxed text-muted-foreground">
              Browse a project in a new tab, or open the source directly. The compact cards are designed as quick portals without interrupting the keynote flow of this portfolio.
            </p>
          </Reveal>
          <div className="scene mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECT_INDEX.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.07} depth={index * 12}>
                <TiltSurface className="portfolio-project-card depth-card group overflow-hidden rounded-2xl border border-border glass" intensity={index % 3 === 1 ? 4.5 : 6.5}>
                  <a href={project.href} target="_blank" rel="noreferrer" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={project.src} alt={project.title} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]" />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-slate-950/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                        {project.status} <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </a>
                  <div className="portfolio-card-copy p-4">
                    <p className="portfolio-index-eyebrow mb-2 text-[9px] font-semibold uppercase text-primary/85">Live project index</p>
                    <a href={project.href} target="_blank" rel="noreferrer" className="group/title inline-flex items-center gap-1 text-[15px] font-semibold text-titanium transition-colors hover:text-primary">
                      {project.title}
                      <ArrowUpRight size={14} className="text-primary transition-transform duration-200 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5" />
                    </a>
                    <p className="mt-1.5 min-h-[40px] text-[12px] leading-relaxed text-muted-foreground">{project.description}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <a href={project.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary transition-opacity hover:opacity-75">
                        Open project <ExternalLink size={12} />
                      </a>
                      <a href={project.sourceHref} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source code`} className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground transition-colors hover:border-primary/45 hover:text-primary">
                        <Github size={12} /> Code
                      </a>
                    </div>
                  </div>
                </TiltSurface>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
