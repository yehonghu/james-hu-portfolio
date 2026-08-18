import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const STATS = [
  { value: "10+", label: "Shipped design and software projects", sub: "Product, interface, and brand work" },
  { value: "3.7", label: "GPA in software engineering technology", sub: "Centennial College" },
  { value: "3", label: "Role-based product experiences", sub: "Customer · Provider · Administrator" },
  { value: "1", label: "Connected delivery practice", sub: "From visual identity to production code" },
];

export default function Stats() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container">
        <div className="hairline mb-12" />
        <div className="scene grid grid-cols-2 gap-x-8 gap-y-11 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.07} depth={index * 10}>
              <motion.div whileHover={{ y: -5, rotateX: 2 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                <p className="font-display text-[44px] font-bold leading-none text-titanium md:text-[54px]">{stat.value}</p>
                <p className="mt-3 text-[14px] font-medium leading-snug">{stat.label}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{stat.sub}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <div className="hairline mt-12" />
      </div>
    </section>
  );
}
