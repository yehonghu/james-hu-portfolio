import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";

const STEPS = [
  {
    num: "01",
    title: "Set the direction",
    desc: "We define the audience, the opportunity, the essential action, and the level of effort before making assumptions in pixels or code.",
    duration: "1–2 days",
  },
  {
    num: "02",
    title: "Design the experience",
    desc: "A visual direction and high-fidelity prototype make the experience tangible early, so important decisions happen before development cost grows.",
    duration: "3–7 days",
  },
  {
    num: "03",
    title: "Build the system",
    desc: "The approved experience becomes responsive, maintainable software. Product flows, operations needs, and feedback states are built into the same system.",
    duration: "1–3 weeks",
  },
  {
    num: "04",
    title: "Launch with intent",
    desc: "The final product is prepared for its public moment with deployment support, clear handoff, and a foundation for iteration after the first release.",
    duration: "2–3 days",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-36">
      <div className="container">
        <Reveal>
          <SectionLabel label="Process" index="04" />
          <h2 className="font-display text-[40px] font-bold leading-[1.02] text-titanium md:text-[60px]">
            A clear path from intent to launch.
          </h2>
          <p className="mt-5 max-w-[580px] text-[16px] leading-relaxed text-muted-foreground">
            A focused process keeps the creative work visible, the technical work deliberate, and the next decision easy to make.
          </p>
        </Reveal>

        <div className="scene relative mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden="true" className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent lg:block" />
          {STEPS.map((step, index) => (
            <Reveal key={step.num} delay={index * 0.08} depth={index * 14}>
              <motion.article
                className="depth-card relative flex h-full flex-col rounded-3xl border border-border bg-card/30 p-7"
                whileHover={{ y: -8, rotateX: 3, rotateY: index < 2 ? -2 : 2 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <p className="font-display text-[48px] font-bold leading-none text-gravity">{step.num}</p>
                <h3 className="mt-6 font-display text-[21px] font-bold">{step.title}</h3>
                <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">{step.desc}</p>
                <p className="mt-6 inline-flex w-fit rounded-full glass px-3 py-1 text-[11.5px] text-secondary-foreground">{step.duration}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
