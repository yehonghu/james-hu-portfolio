import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { Reveal, SectionLabel } from "./Reveal";

type CaseStudy = {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  images: { src: string; alt: string }[];
  layout: "left" | "right";
  link?: { href: string; label: string; icon?: "github" };
  accent: string;
};

const CASES: CaseStudy[] = [
  {
    id: "bookease",
    category: "Full-Stack Product · Marketplace",
    title: "BookEase",
    tagline: "A clearer path from service request to confirmed booking.",
    description:
      "A local-service booking platform designed around the real handoffs between customers, providers, and administrators. It combines request publishing, competitive bids, availability management, booking states, and reviews into one accountable workflow.",
    tags: ["React", "Node.js / Express", "MongoDB", "JWT Authentication", "Role-Based UX", "Cloud Deployment"],
    images: [
      { src: ASSETS.bookease.home, alt: "BookEase landing page" },
      { src: ASSETS.bookease.customer, alt: "BookEase customer dashboard" },
      { src: ASSETS.bookease.availability, alt: "BookEase provider availability calendar" },
    ],
    layout: "left",
    link: {
      href: "https://github.com/yehonghu/BookEase-COMP313-Group6-Final",
      label: "View source code",
      icon: "github",
    },
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

const GALLERY = [
  {
    src: ASSETS.iphone15,
    title: "iPhone 15 Pro Interface Study",
    sub: "Responsive product-page implementation · HTML / CSS / JavaScript",
    href: "https://yehonghu.github.io/iphone15pro-portfolio",
  },
  {
    src: ASSETS.findHouse,
    title: "Find House",
    sub: "Premium real-estate discovery experience · Motion and interaction",
    href: "https://yehonghu.github.io/find-house-portfolio/home.html",
  },
  {
    src: ASSETS.ourPlanet,
    title: "Our Planet",
    sub: "Editorial environmental website · Content-led visual storytelling",
    href: "https://yehonghu.github.io/our-planet-environmental-website/",
  },
];

function CaseBlock({ study, index }: { study: CaseStudy; index: number }) {
  const multiImage = study.images.length > 1;
  const visual = (
    <Reveal depth={40} delay={0.05} className="scene relative">
      <motion.div
        className="depth-card relative overflow-hidden rounded-[1.75rem] border border-border bg-card/45"
        whileHover={{ rotateY: study.layout === "left" ? -2.5 : 2.5, rotateX: 2, y: -8 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
      >
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
      </motion.div>
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
      {study.link && (
        <a
          href={study.link.href}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex w-fit items-center gap-1.5 text-[14px] font-semibold text-primary transition-opacity hover:opacity-75"
        >
          {study.link.icon === "github" && <Github size={15} />}
          {study.link.label}
          <ArrowUpRight size={14} />
        </a>
      )}
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
    <section id="work" className="relative py-24 md:py-36">
      <div aria-hidden="true" className="absolute inset-x-0 top-20 h-[560px] bg-[radial-gradient(ellipse_at_75%_30%,rgba(75,120,255,0.10),transparent_62%)]" />
      <div className="container relative">
        <Reveal>
          <SectionLabel label="Selected Work" index="01" />
          <h2 className="max-w-[760px] font-display text-[40px] font-bold leading-[1.02] text-titanium md:text-[60px]">
            Every project deserves a point of view.
          </h2>
          <p className="mt-5 max-w-[590px] text-[16px] leading-relaxed text-muted-foreground">
            A selection of product, interface, and identity work built to make an idea easier to understand, use, and grow.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-28 md:mt-28 md:gap-36">
          {CASES.map((study, index) => (
            <CaseBlock key={study.id} study={study} index={index} />
          ))}
        </div>

        <div className="mt-28 border-t border-border pt-20 md:mt-36 md:pt-24">
          <Reveal>
            <SectionLabel label="Interface Studies" index="02" />
            <h3 className="font-display text-[32px] font-bold text-titanium md:text-[42px]">Craft lives in the details.</h3>
            <p className="mt-4 max-w-[560px] text-[14.5px] text-muted-foreground">
              These studies focus on visual systems, responsive behavior, and interaction polish. Each card opens a live public implementation.
            </p>
          </Reveal>
          <div className="scene mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.07} depth={index * 12}>
                <motion.a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="depth-card group block overflow-hidden rounded-2xl border border-border glass"
                  whileHover={{ y: -8, rotateX: 2, rotateY: index === 1 ? 0 : index === 0 ? -2 : 2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.src} alt={item.title} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]" />
                  </div>
                  <div className="p-4">
                    <p className="flex items-center gap-1 text-[14px] font-semibold">
                      {item.title}
                      <ArrowUpRight size={13} className="text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{item.sub}</p>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
