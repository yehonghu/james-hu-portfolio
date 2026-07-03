/*
 * Titanium Keynote — glass navbar.
 * Transparent over hero, frosted glass after scroll. apple.com behavior.
 */
import { useEffect, useState } from "react";
import { ASSETS } from "@/lib/assets";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#work", label: "作品" },
  { href: "#services", label: "服务" },
  { href: "#process", label: "流程" },
  { href: "#about", label: "关于" },
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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-14">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={ASSETS.logo} alt="JH" className="w-8 h-8 rounded-full" />
          <span className="font-display font-bold text-[17px] tracking-tight">
            James Hu<span className="text-gravity">.</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13.5px] text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-press text-[13px] font-semibold px-4 py-1.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            聊聊项目
          </a>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass-strong border-t border-border">
          <div className="container py-4 flex flex-col gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[15px] text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-press text-center text-[14px] font-semibold px-4 py-2.5 rounded-full bg-primary text-primary-foreground"
            >
              聊聊项目
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
