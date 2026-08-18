import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle, QrCode } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { Reveal } from "./Reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function WeChatDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm border-border glass-strong">
        <DialogHeader>
          <DialogTitle className="font-display text-[19px]">Let&apos;s talk about your project.</DialogTitle>
          <DialogDescription className="text-[13px] text-muted-foreground">
            Scan the QR code to connect on WeChat. Add “Portfolio” to your note for faster context.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-hidden rounded-2xl bg-white p-3">
          <img src={ASSETS.wechatQr} alt="James Hu's WeChat QR code" className="w-full" />
        </div>
        <p className="text-center text-[12.5px] text-muted-foreground">
          You can also send a message through Xiaohongshu. Replies are typically sent within one business day.
        </p>
      </DialogContent>
    </Dialog>
  );
}

export default function Contact() {
  const [qrOpen, setQrOpen] = useState(false);
  const channels = [
    { icon: MessageCircle, label: "WeChat / Xiaohongshu", value: "Open QR code", onClick: () => setQrOpen(true) },
    { icon: Mail, label: "Email", value: "huyehong76@gmail.com", href: "mailto:huyehong76@gmail.com" },
    { icon: Github, label: "GitHub", value: "github.com/yehonghu", href: "https://github.com/yehonghu" },
    { icon: Linkedin, label: "LinkedIn", value: "Yehong (James) Hu", href: "https://linkedin.com/in/yehong-hu-142278297" },
  ] as const;

  return (
    <section id="contact" className="relative isolate overflow-hidden py-28 md:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(83,139,255,0.22),transparent_64%)]" />
      <div aria-hidden="true" className="ambient-grid pointer-events-none absolute bottom-[-180px] left-[-20%] h-[520px] w-[140%] opacity-40" />
      <div className="container relative text-center">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Let&apos;s build the next move</p>
          <h2 className="mt-6 font-display text-[46px] font-bold leading-[0.98] sm:text-[66px] md:text-[86px]">
            <span className="block text-titanium">Give your brand a place</span>
            <span className="mt-2 block text-gravity">that never clocks out.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-[590px] text-[16px] leading-relaxed text-muted-foreground">
            Whether you are starting an independent brand, improving a service experience, or building a more useful product system, the first conversation is a good place to begin.
          </p>
        </Reveal>

        <Reveal delay={0.12} depth={18}>
          <div className="mt-11 flex flex-wrap justify-center gap-4">
            <button onClick={() => setQrOpen(true)} className="btn-press inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-[0_18px_45px_-16px_rgba(79,138,255,0.75)] hover:opacity-95">
              <QrCode size={17} />
              Connect on WeChat
            </button>
            <a href="mailto:huyehong76@gmail.com" className="btn-press rounded-full glass px-8 py-3.5 text-[15px] font-medium transition-colors hover:bg-white/10">
              Send an email
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2} depth={32}>
          <div className="scene mx-auto mt-18 grid max-w-[960px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel, index) =>
              "href" in channel && channel.href ? (
                <motion.a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="depth-card flex flex-col items-center gap-2 rounded-2xl border border-border glass px-5 py-5"
                  whileHover={{ y: -7, rotateX: 2, rotateY: index < 2 ? -2 : 2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <channel.icon size={19} className="text-primary" />
                  <p className="text-[13px] font-semibold">{channel.label}</p>
                  <p className="break-all text-[12px] text-muted-foreground">{channel.value}</p>
                </motion.a>
              ) : (
                <motion.button
                  key={channel.label}
                  onClick={"onClick" in channel ? channel.onClick : undefined}
                  className="depth-card flex flex-col items-center gap-2 rounded-2xl border border-border glass px-5 py-5"
                  whileHover={{ y: -7, rotateX: 2, rotateY: -2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <channel.icon size={19} className="text-primary" />
                  <p className="text-[13px] font-semibold">{channel.label}</p>
                  <p className="text-[12px] text-muted-foreground">{channel.value}</p>
                </motion.button>
              ),
            )}
          </div>
        </Reveal>
      </div>

      <WeChatDialog open={qrOpen} onOpenChange={setQrOpen} />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-[13px] text-muted-foreground">© 2026 James Hu · Toronto, Ontario · Design × Engineering</p>
        <div className="flex items-center gap-6 text-[13px] text-muted-foreground">
          <a href="#work" className="transition-colors hover:text-foreground">Work</a>
          <a href="#services" className="transition-colors hover:text-foreground">Capabilities</a>
          <a href="https://github.com/yehonghu" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
