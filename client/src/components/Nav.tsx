import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ASSETS } from "@/lib/assets";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Capabilities" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass-strong border-b border-border" : "bg-transparent"}`}>
      <nav className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label="James Hu home">
          <img src={ASSETS.logo} alt="JH monogram" className="h-8 w-8 rounded-full" />
          <span className="font-display text-[17px] font-bold tracking-tight">
            James Hu<span className="text-gravity">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-[13px] text-muted-foreground transition-colors duration-200 hover:text-foreground">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-press rounded-full bg-primary px-4 py-1.5 text-[13px] font-semibold text-primary-foreground shadow-[0_10px_26px_-12px_rgba(83,137,255,0.8)] hover:opacity-95">
            Start a project
          </a>
        </div>

        <button className="p-2 text-foreground md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <motion.div className="border-t border-border glass-strong md:hidden" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
          <div className="container flex flex-col gap-4 py-5">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-[15px] text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-press rounded-full bg-primary px-4 py-2.5 text-center text-[14px] font-semibold text-primary-foreground">
              Start a project
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
