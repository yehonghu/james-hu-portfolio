# James Hu 作品集 — 设计头脑风暴

## 三个候选方向

### 1. Titanium Keynote(钛金发布会)
苹果发布会式的深色沉浸叙事:巨大的渐变标题、产品级特写、滚动即演示。情绪:高端、克制、有仪式感。
Probability: 0.07

### 2. Gallery White(美术馆白)
以画廊策展逻辑呈现作品:大量留白、超大衬线标题、作品如展品悬挂。情绪:安静、艺术、审美自信。
Probability: 0.04

### 3. Bento Studio(便当工作室)
苹果官网近年的 bento grid 卡片拼盘风:信息密度高但秩序井然,圆角卡片各自呈现一个能力/案例。情绪:现代、聪明、工程感。
Probability: 0.05

## ✅ 选定方向:Titanium Keynote(钛金发布会)

- **Design Movement**: Apple Keynote / apple.com 产品页语言 —— 深空黑背景 + 钛金渐变大字 + 玻璃拟态卡片(San Francisco 式无衬线体系)。
- **Core Principles**:
  1. 滚动即叙事:每一屏只讲一件事,像发布会一页一个卖点。
  2. 巨大而克制的排版:超大标题 + 极小辅助文本,层级悬殊。
  3. 深色为主、光为点缀:黑底上用光晕、渐变文字、玻璃面板制造深度。
  4. 真实作品即产品:每个案例都以"产品发布"的姿态呈现(设备 mockup、特写截图)。
- **Color Philosophy**: 深空黑 (#0A0A0C) 为舞台,钛金银白 (#F5F5F7) 为主文本,品牌蓝 (#0A84FF→#5E5CE6 渐变) 作为唯一的能量色——象征"设计与工程融合的光"。避免紫色滥用:渐变只用于关键标题和 CTA。
- **Layout Paradigm**: 垂直发布会叙事 + 局部非对称:hero 左文右图;案例区交替左右布局;能力区用 bento 玻璃卡片;避免所有内容都居中。
- **Signature Elements**:
  1. 钛金渐变大标题(bg-clip-text 渐变)。
  2. 玻璃拟态卡片(backdrop-blur + 1px 白色 10% 边框)。
  3. 细发丝分隔线与光晕 (radial glow) 背景。
- **Interaction Philosophy**: 像 apple.com:滚动淡入上移 (fade+rise),导航栏滚动后变毛玻璃;hover 时卡片轻微上浮、图片微缩放;一切动效 ≤ 400ms、ease-out。
- **Animation**: framer-motion whileInView (opacity 0→1, y 24→0, 0.5s, stagger 60ms);hero 标题分行渐入;设备图 hover scale 1.02;CTA 按钮 active scale 0.97。禁止弹跳、旋转等花哨动效。
- **Typography System**: 标题 "SF Pro Display" 替身 → Google Fonts 的 `Inter Tight`(700/600, letter-spacing -0.03em, 用于 display 大字),正文 `Inter`(400/500)。中文回退 PingFang SC / Noto Sans SC。层级:Hero 96/64px → 区块标题 56/40px → 卡片标题 24px → 正文 17px → 辅助 13px。
- **Brand Essence**: "Design × Engineering, in one hand." —— 面向多伦多本地小企业与独立品牌的一站式网页设计与全栈开发。个性形容词:precise(精确)、calm(沉静)、premium(高级)。
- **Brand Voice**: 像发布会文案:短句、断言、无废话。示例:「好看,只是及格线。」「从 Logo 到数据库,一个人,一条流水线。」禁止 "Welcome to my website" 式陈词。
- **Wordmark & Logo**: 「JH」极简线性 monogram(已生成霓虹蓝紫圆环徽标 avatar_james.png),导航用 "James Hu" 文字标 + 渐变点缀句点:「James Hu.」
- **Signature Brand Color**: Apple Blue #0A84FF(向 #5E5CE6 过渡的"引力蓝"渐变)。

## 页面结构(单页 + 锚点导航)
1. Nav(毛玻璃,滚动变色): James Hu. | 作品 | 服务 | 关于 | 联系 → CTA 按钮
2. Hero: 巨大渐变标题 + 双语副标 + 2 CTA + workspace 背景图
3. 数字带: 3.7 GPA / 10+ 项目 / 3 端角色系统 / 设计+开发 一站式
4. 精选案例 (Featured Work):
   - BookEase(全栈预约平台,真实运行截图:home/dashboards/availability)
   - KAZAN Ramen(餐厅官网+线上点单概念,设备 mockup)
   - VELVET Beauty Bar(Figma 网页设计+预约流程)
   - Maple & Co. Cafe(Figma 移动端原型)
   - LUMEN Studio(品牌识别系统)
   - 前端美学系列(iPhone 15 Pro / Find House / Our Planet)+ 海报设计
5. 服务 (Services): 品牌与视觉 / 网页与 UI 设计 / 全栈开发与部署(bento 玻璃卡)
6. 流程 (Process): 4 步(聊需求→Figma 原型→开发→上线+SEO)
7. 关于 (About): James Hu 介绍 + 技能栈 + 教育/领导力
8. CTA/联系: 小红书/微信/邮箱,大渐变标题收尾
9. Footer

## Style Decisions
- 所有案例图必须使用真实截图或已生成的高质量 mockup,不用占位图。
- 中英双语:主文案中文(客户是小红书中文客群),关键术语/标题配英文点缀,显国际感。
