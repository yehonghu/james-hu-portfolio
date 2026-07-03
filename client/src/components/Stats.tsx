/*
 * Titanium Keynote — stats band.
 * Hairline-separated numeric statements, keynote style.
 */
import { Reveal } from "./Reveal";

const STATS = [
  { value: "10+", label: "完整项目交付", sub: "Full-stack & design projects" },
  { value: "3.7", label: "GPA · 软件工程高级文凭", sub: "Centennial College" },
  { value: "3 端", label: "角色系统设计经验", sub: "Customer / Provider / Admin" },
  { value: "1 人", label: "从 Logo 到数据库", sub: "One pipeline, zero handoff" },
];

export default function Stats() {
  return (
    <section className="py-14 md:py-20">
      <div className="container">
        <div className="hairline mb-12" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <p className="font-display font-bold text-[40px] md:text-[48px] leading-none text-titanium">
                {s.value}
              </p>
              <p className="mt-3 text-[14.5px] font-medium">{s.label}</p>
              <p className="mt-1 text-[12.5px] text-muted-foreground">{s.sub}</p>
            </Reveal>
          ))}
        </div>
        <div className="hairline mt-12" />
      </div>
    </section>
  );
}
