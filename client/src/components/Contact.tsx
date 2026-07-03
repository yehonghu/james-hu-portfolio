/*
 * Titanium Keynote — closing CTA.
 * Giant gradient statement + contact channels. Keynote finale energy.
 */
import { Reveal } from "./Reveal";
import { Mail, Github, Linkedin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const CHANNELS = [
  {
    icon: MessageCircle,
    label: "小红书 / 微信",
    value: "私信我聊聊你的项目",
    action: () =>
      toast("在小红书搜索「HH」或私信我获取微信号", {
        description: "工作日 24 小时内回复",
      }),
  },
  {
    icon: Mail,
    label: "Email",
    value: "huyehong76@gmail.com",
    href: "mailto:huyehong76@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/yehonghu",
    href: "https://github.com/yehonghu",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Yehong (James) Hu",
    href: "https://linkedin.com/in/yehong-hu-142278297",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 60%, oklch(0.5 0.18 262 / 20%), transparent 70%)",
        }}
      />
      <div className="container relative text-center">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Let's Build Something
          </p>
          <h2 className="mt-5 font-display font-bold leading-[1.05] text-[42px] sm:text-[60px] md:text-[76px]">
            <span className="text-titanium block">你的品牌,值得一间</span>
            <span className="text-gravity block mt-1">24 小时营业的门面。</span>
          </h2>
          <p className="mt-7 text-[16px] text-muted-foreground max-w-[540px] mx-auto leading-relaxed">
            无论是刚起步的独立品牌、想做线上点单的餐厅,还是需要预约系统的工作室——带上你的想法来聊聊,第一次咨询免费。
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() =>
                toast("在小红书搜索「HH」私信我,或发邮件到 huyehong76@gmail.com", {
                  description: "备注「作品集」,优先回复",
                })
              }
              className="btn-press px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-[15.5px] font-semibold hover:opacity-90 transition-opacity"
            >
              开始你的项目
            </button>
            <a
              href="mailto:huyehong76@gmail.com"
              className="btn-press px-8 py-3.5 rounded-full glass text-[15.5px] font-medium hover:bg-white/10 transition-colors"
            >
              发送邮件
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[900px] mx-auto">
            {CHANNELS.map((c) =>
              c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="glass rounded-2xl px-5 py-5 flex flex-col items-center gap-2 hover:bg-white/8 transition-colors"
                >
                  <c.icon size={19} className="text-primary" />
                  <p className="text-[13px] font-semibold">{c.label}</p>
                  <p className="text-[12px] text-muted-foreground break-all">{c.value}</p>
                </a>
              ) : (
                <button
                  key={c.label}
                  onClick={c.action}
                  className="glass rounded-2xl px-5 py-5 flex flex-col items-center gap-2 hover:bg-white/8 transition-colors"
                >
                  <c.icon size={19} className="text-primary" />
                  <p className="text-[13px] font-semibold">{c.label}</p>
                  <p className="text-[12px] text-muted-foreground">{c.value}</p>
                </button>
              ),
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-muted-foreground">
          © 2026 James Hu · Toronto, ON · Design × Engineering
        </p>
        <div className="flex items-center gap-6 text-[13px] text-muted-foreground">
          <a href="#work" className="hover:text-foreground transition-colors">
            作品
          </a>
          <a href="#services" className="hover:text-foreground transition-colors">
            服务
          </a>
          <a
            href="https://github.com/yehonghu"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
