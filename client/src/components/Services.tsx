import { CalendarCheck, Code2, Figma, Palette, Search, Store } from "lucide-react";
import LiquidGlass from "./LiquidGlass";
import { Reveal, SectionLabel } from "./Reveal";

const SERVICES = [
  {
    icon: Palette,
    title: "Brand & Visual Identity",
    desc: "Identity systems, color direction, typography, and campaign-ready assets designed to give a business a visual language it can use long after launch day.",
    points: ["Logo and identity systems", "Campaign and print assets", "Production-ready design files"],
    accent: "from-amber-200 to-orange-400",
  },
  {
    icon: Figma,
    title: "Web & Product Design",
    desc: "From wireframes to high-fidelity interfaces and clickable prototypes. The experience becomes visible early, so teams can decide with confidence before development begins.",
    points: ["High-fidelity Figma prototypes", "Responsive interface systems", "Booking and ordering UX"],
    accent: "from-pink-300 to-fuchsia-500",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    desc: "Modern React and Node.js applications built from data model to deployment. One partner can own the system, the interface, and the details in between.",
    points: ["Booking and commerce flows", "Admin and operations dashboards", "Deployment and delivery support"],
    accent: "from-sky-300 to-violet-500",
  },
];

const EXTRAS = [
  {
    icon: Search,
    title: "Local search foundations",
    desc: "A discoverable digital presence for customers looking nearby.",
  },
  {
    icon: CalendarCheck,
    title: "Booking system design",
    desc: "Availability, conflict prevention, and reminders designed around real operations.",
  },
  {
    icon: Store,
    title: "Small-business launch sites",
    desc: "A concise, credible online home for service, hospitality, and retail brands.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(102,110,255,0.13),transparent_66%)]" />
      <div className="container relative">
        <Reveal>
          <SectionLabel label="Capabilities" index="03" />
          <h2 className="max-w-[820px] font-display text-[40px] font-bold leading-[1.02] text-titanium md:text-[60px]">
            From the first mark to the final deployment.
          </h2>
          <p className="mt-5 max-w-[610px] text-[16px] leading-relaxed text-muted-foreground">
            There is less friction when strategy, interface, and implementation are connected. I design the intent and build the experience with the same level of care.
          </p>
        </Reveal>

        <div className="scene mt-16 grid gap-4 md:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08} depth={index * 16}>
              <article className="h-full">
                <LiquidGlass size="lg" className="depth-card h-full rounded-3xl">
                  <div className="flex h-full flex-col p-7">
                    <div className={`mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} shadow-lg`}>
                      <service.icon size={20} className="text-white" />
                    </div>
                    <h3 className="font-display text-[22px] font-bold">{service.title}</h3>
                    <p className="mt-4 flex-1 text-[14px] leading-relaxed text-muted-foreground">{service.desc}</p>
                    <ul className="mt-6 flex flex-col gap-2.5">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-[13px] text-secondary-foreground">
                          <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.accent}`} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </LiquidGlass>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {EXTRAS.map((extra, index) => (
            <Reveal key={extra.title} delay={0.18 + index * 0.07} depth={12}>
              <div className="h-full">
                <LiquidGlass size="md" className="depth-card h-full rounded-3xl">
                  <div className="flex h-full items-start gap-4 px-6 py-5">
                    <extra.icon size={18} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-[14px] font-semibold">{extra.title}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{extra.desc}</p>
                    </div>
                  </div>
                </LiquidGlass>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
