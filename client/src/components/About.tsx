import { motion } from "framer-motion";
import { Github, GraduationCap, Users } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { Reveal, SectionLabel } from "./Reveal";

const SKILLS = [
  { group: "Design", items: ["Figma", "Photoshop", "Illustrator", "Interaction Prototyping", "Print Production"] },
  { group: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"] },
  { group: "Backend", items: ["Node.js", "Express", "GraphQL", "Java / Spring Boot", "JWT Authentication"] },
  { group: "Data & Delivery", items: ["MongoDB", "MySQL / SQL Server", "Git / GitHub", "CI/CD", "Cloud Deployment"] },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[-25%] left-1/2 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="container relative grid items-start gap-12 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
        <div>
          <Reveal>
            <SectionLabel label="About" index="05" />
            <h2 className="font-display text-[40px] font-bold leading-[1.02] text-titanium md:text-[60px]">
              Hi, I&apos;m James.
            </h2>
          </Reveal>
          <Reveal delay={0.08} depth={18}>
            <div className="mt-7 flex max-w-[650px] flex-col gap-4 text-[15.5px] leading-[1.85] text-muted-foreground">
              <p>
                I am a Software Engineering Technology Advanced Diploma graduate from Centennial College with a 3.7 GPA. Instead of choosing between design and code, I built a practice around both: engineering discipline for design decisions and design sensitivity for technical execution.
              </p>
              <p>
                My work spans a multi-role booking platform, product prototypes, visual identity systems, and web applications built with modern frontend and backend tools. Leadership work as a student association president and programming tutor also taught me how to clarify a plan, align people around it, and turn it into something real.
              </p>
              <p className="text-foreground">
                Today, I help local businesses and independent brands create digital experiences that look considered, work clearly, and stay useful after the launch announcement.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16} depth={30}>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <motion.div className="depth-card flex items-start gap-3 rounded-2xl glass px-5 py-4" whileHover={{ y: -5, rotateX: 2 }}>
                <GraduationCap size={18} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-[13.5px] font-semibold">Software Engineering Technology</p>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">Centennial College · GPA 3.7 · 2026</p>
                </div>
              </motion.div>
              <motion.div className="depth-card flex items-start gap-3 rounded-2xl glass px-5 py-4" whileHover={{ y: -5, rotateX: 2 }}>
                <Users size={18} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-[13.5px] font-semibold">Community leader and programming tutor</p>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">Event planning · Budget ownership · Individual mentorship</p>
                </div>
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <a
              href="https://github.com/yehonghu?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-primary transition-opacity hover:opacity-75"
            >
              <Github size={16} />
              Explore all repositories on GitHub
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} depth={36} className="scene">
          <motion.aside
            className="depth-card glow-border rounded-3xl glass-strong p-7 md:p-8"
            whileHover={{ rotateY: 1.5, rotateX: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <div className="mb-8 flex items-center gap-4">
              <img src={ASSETS.logo} alt="JH monogram" className="h-14 w-14 rounded-2xl" />
              <div>
                <p className="font-display text-[20px] font-bold">Skill System</p>
                <p className="mt-0.5 text-[12.5px] text-muted-foreground">Design and engineering in the same loop</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {SKILLS.map((skill) => (
                <div key={skill.group}>
                  <p className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{skill.group}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="rounded-full border border-border bg-white/[0.025] px-3 py-1 text-[12.5px] text-secondary-foreground transition-colors hover:border-primary/60 hover:text-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </Reveal>
      </div>
    </section>
  );
}
