/*
 * Titanium Keynote — about.
 * Asymmetric split: narrative left, skill stack glass panel right.
 */
import { Reveal, SectionLabel } from "./Reveal";
import { ASSETS } from "@/lib/assets";
import { GraduationCap, Users, Github } from "lucide-react";

const SKILLS = [
  { group: "设计 Design", items: ["Figma", "Photoshop", "Illustrator", "原型交互", "印前工艺"] },
  {
    group: "前端 Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"],
  },
  {
    group: "后端 Backend",
    items: ["Node.js", "Express", "GraphQL", "Java / Spring Boot", "JWT 认证"],
  },
  {
    group: "数据与部署 Data & Ops",
    items: ["MongoDB", "MySQL / SQL Server", "Git / GitHub", "CI/CD 自动化部署", "云端部署"],
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div
        className="absolute inset-x-0 bottom-0 h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 100%, oklch(0.42 0.15 262 / 12%), transparent 70%)",
        }}
      />
      <div className="container relative grid lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-16 items-start">
        <div>
          <Reveal>
            <SectionLabel en="About" zh="关于我" />
            <h2 className="font-display font-bold text-[36px] md:text-[48px] leading-tight text-titanium">
              你好,我是 James。
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6 flex flex-col gap-4 text-[15.5px] leading-[1.85] text-muted-foreground">
              <p>
                我毕业于多伦多百年理工学院(Centennial College)软件工程技术高级文凭专业,GPA
                3.7。在别人纠结「学设计还是学代码」的时候,我选择了两条路一起走——
                <span className="text-foreground">
                  用工程师的严谨做设计,用设计师的审美写代码。
                </span>
              </p>
              <p>
                我主导开发过完整的商业级预约平台(BookEase,A+
                评级),也用微前端 + GraphQL 架构搭建过社区平台;我熟悉 Photoshop
                的每一个图层混合模式,也清楚 MongoDB 的每一次索引优化。担任高校社团主席的经历,让我懂得怎么策划一场活动、写一份文案、和不同的人把事情做成。
              </p>
              <p>
                现在,我在多伦多为本地小企业和独立品牌做一件事:
                <span className="text-foreground">
                  把「好看」和「好用」同时交付,让你的品牌在 Google 上拥有一间 24 小时营业的直营店。
                </span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="glass rounded-2xl px-5 py-4 flex items-start gap-3">
                <GraduationCap size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-[13.5px] font-semibold">软件工程技术高级文凭</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    Centennial College · GPA 3.7 · 2026
                  </p>
                </div>
              </div>
              <div className="glass rounded-2xl px-5 py-4 flex items-start gap-3">
                <Users size={18} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-[13.5px] font-semibold">学生会社团主席 & 编程助教</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    活动策划 · 预算管理 · 一对一辅导 12 名学生
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <a
              href="https://github.com/yehonghu?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:opacity-80 transition-opacity"
            >
              <Github size={16} />
              在 GitHub 上查看全部代码仓库 →
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="glass-strong rounded-3xl p-7 md:p-8">
            <div className="flex items-center gap-4 mb-7">
              <img src={ASSETS.logo} alt="JH monogram" className="w-14 h-14 rounded-2xl" />
              <div>
                <p className="font-display font-bold text-[18px]">技能栈 Skill Stack</p>
                <p className="text-[12.5px] text-muted-foreground">设计 × 工程,双轮驱动</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {SKILLS.map((s) => (
                <div key={s.group}>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2.5">
                    {s.group}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border px-3 py-1 text-[12.5px] hover:border-primary/50 hover:text-foreground transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
