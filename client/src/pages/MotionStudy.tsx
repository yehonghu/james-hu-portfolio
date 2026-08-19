import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useReducedMotion } from "framer-motion";

const ASSETS = {
  sky: "https://raft-blast-61784561.figma.site/_assets/v11/16b5007d9c93971e26ffe4e0e3e37946f6bd538c.png",
  glow: "https://raft-blast-61784561.figma.site/_assets/v11/8a7f8af50e0ce92ec2e228e7b0b4112178c51cf1.png",
  bazaar: "https://raft-blast-61784561.figma.site/_assets/v11/864afe00e41e2fa20a5aa546e15cb807e0f81384.png",
  splitLeft: "https://raft-blast-61784561.figma.site/_assets/v11/7536d7b60a1fce482cf6edf3f0bffd3bad5d0f8a.png",
  splitRight: "https://raft-blast-61784561.figma.site/_assets/v11/392db6a6a6b98e868bd7f8d3f55bb719d51e5028.png",
  bridge: "https://raft-blast-61784561.figma.site/_assets/v11/c6a6d8ef49bca43f708aa852692942c45ec950d4.png",
  river: "https://raft-blast-61784561.figma.site/_assets/v11/ba75252bab2b1c510987b74837770f7bc8a6b2d4.png",
  pins: [
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260730_230438_d526b8b6-8a2e-4e3b-9993-3908acae03a7.png",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260730_230442_140bc25b-b165-4249-904a-f708bff6970e.png",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260730_230448_825949c9-ccdb-4857-b4a6-e349eccc9010.png",
  ],
};

const SIGHTS = [
  { kicker: "Old Bridge", title: "Stari Most", body: "A stone arch over the Neretva and the city’s enduring landmark.", pin: 0 },
  { kicker: "Bazaar Street", title: "Kujundziluk", body: "Copper shops, small discoveries, and a narrow old-town lane by the crossing.", pin: 1 },
  { kicker: "Viewpoint", title: "Koski Mehmed Pasha Mosque", body: "A high, quiet view back toward the bridge, river, and layered roofs.", pin: 2 },
  { kicker: "Ottoman House", title: "Kajtaz House", body: "A preserved residence that holds one of the city’s domestic histories.", pin: 0 },
  { kicker: "Museum", title: "War Photo Exhibition", body: "A compact stop for context, memory, and the city’s more recent layers.", pin: 1 },
];

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
const segment = (progress: number, start: number, end: number) => clamp((progress - start) / (end - start));

export default function MotionStudy() {
  const studyRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeSight, setActiveSight] = useState(0);
  const [phase, setPhase] = useState<"arrival" | "reveal" | "detail">("arrival");
  const sightOffset = activeSight * (Math.min(window.innerWidth * 0.76, 390) + 16);

  useEffect(() => {
    if (reduceMotion) return;
    const node = studyRef.current;
    if (!node) return;

    let frame = 0;
    let lastPhase = "arrival";

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const distance = Math.max(node.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / distance);
      const reveal = segment(progress, 0.18, 0.5);
      const detail = segment(progress, 0.56, 0.92);
      const title = 1 - segment(progress, 0.08, 0.33);
      const sightOpacity = segment(progress, 0.22, 0.42) * (1 - segment(progress, 0.66, 0.82));
      const nextPhase = progress < 0.28 ? "arrival" : progress < 0.67 ? "reveal" : "detail";

      node.style.setProperty("--ms-progress", progress.toFixed(4));
      node.style.setProperty("--ms-title-opacity", title.toFixed(3));
      node.style.setProperty("--ms-title-y", `${Math.round(progress * -150)}px`);
      node.style.setProperty("--ms-bridge-y", `${Math.round(progress * -118)}px`);
      node.style.setProperty("--ms-bridge-scale", `${(1.02 + progress * 0.11).toFixed(3)}`);
      node.style.setProperty("--ms-back-y", `${Math.round(86 - progress * 176)}px`);
      node.style.setProperty("--ms-split", `${Math.round(reveal * 300)}px`);
      node.style.setProperty("--ms-river-opacity", detail.toFixed(3));
      node.style.setProperty("--ms-sights-opacity", sightOpacity.toFixed(3));
      node.style.setProperty("--ms-panel-opacity", segment(progress, 0.68, 0.84).toFixed(3));
      node.style.setProperty("--ms-panel-y", `${Math.round((1 - segment(progress, 0.68, 0.84)) * 56)}px`);

      if (nextPhase !== lastPhase) {
        lastPhase = nextPhase;
        setPhase(nextPhase);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduceMotion]);

  const onPointerMove = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--ms-mx", `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(2)}%`);
    event.currentTarget.style.setProperty("--ms-my", `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(2)}%`);
  };

  const moveSight = (direction: number) => {
    setActiveSight((current) => (current + direction + SIGHTS.length) % SIGHTS.length);
  };

  return (
    <main className="motion-study-shell">
      <section
        ref={studyRef}
        id="motion-study"
        aria-label="Mostar layered cinematic motion study"
        className="motion-study"
        data-phase={phase}
        onMouseMove={onPointerMove}
        style={{ "--ms-progress": 0, "--ms-mx": "50%", "--ms-my": "50%" } as CSSProperties}
      >
        <div className="motion-study__stage">
          <div className="motion-study__world" aria-hidden="true">
            <img className="motion-study__sky" src={ASSETS.sky} alt="" />
            <img className="motion-study__glow" src={ASSETS.glow} alt="" />
            <div className="motion-study__back-stack">
              <img className="motion-study__bazaar" src={ASSETS.bazaar} alt="" />
              <img className="motion-study__split motion-study__split--left" src={ASSETS.splitLeft} alt="" />
              <img className="motion-study__split motion-study__split--right" src={ASSETS.splitRight} alt="" />
            </div>
            <img className="motion-study__bridge" src={ASSETS.bridge} alt="" />
            <img className="motion-study__river" src={ASSETS.river} alt="" />
            <div className="motion-study__shade" />
            <div className="motion-study__cursor" />
          </div>

          <header className="motion-study__header">
            <Link href="/" className="motion-study__brand" aria-label="Return to James Hu portfolio">
              <span className="motion-study__brand-mark">JH</span>
              <span>Motion Study</span>
            </Link>
            <nav className="motion-study__nav" aria-label="Motion study sections">
              <a href="#motion-study">Arrival</a>
              <a href="#motion-layers">Layers</a>
              <a href="#motion-details">Details</a>
            </nav>
            <Link href="/" className="motion-study__return">Portfolio <ArrowRight size={15} /></Link>
          </header>

          <div className="motion-study__hero-copy">
            <p className="motion-study__eyebrow">Scroll-led interaction experiment · 01</p>
            <h1>MOSTAR</h1>
            <p>A study in depth, memory, and a city revealed one layer at a time.</p>
            <div className="motion-study__tags" aria-label="Mostar highlights">
              <span>Old Bridge</span><span>Neretva River</span><span>Old City</span>
            </div>
            <a href="#motion-layers" className="motion-study__scroll-cue">Enter the layers <ChevronDown size={17} /></a>
          </div>

          <section id="motion-layers" className="motion-study__sights" aria-label="Mostar sight cards">
            <div className="motion-study__sights-head">
              <span>Selected places</span>
              <span>{String(activeSight + 1).padStart(2, "0")} / {String(SIGHTS.length).padStart(2, "0")}</span>
            </div>
            <div className="motion-study__track-wrap">
              <div className="motion-study__track" style={{ transform: `translate3d(-${sightOffset}px, 0, 0)` }}>
                {SIGHTS.map((sight) => (
                  <article className="motion-study__sight-card" key={sight.title} tabIndex={0}>
                    <span>{sight.kicker}</span>
                    <img src={ASSETS.pins[sight.pin]} alt="" />
                    <h2>{sight.title}</h2>
                    <p>{sight.body}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="motion-study__controls">
              <button type="button" onClick={() => moveSight(-1)} aria-label="Previous sight"><ArrowLeft size={17} /></button>
              <button type="button" onClick={() => moveSight(1)} aria-label="Next sight"><ArrowRight size={17} /></button>
            </div>
          </section>

          <section id="motion-details" className="motion-study__details" aria-label="Mostar details">
            <p className="motion-study__eyebrow">A bridge as compass · 02</p>
            <h2>The crossing holds the city together.</h2>
            <p>Stari Most links the banks of the Neretva and anchors a historic quarter shaped by Ottoman, Mediterranean, and European layers.</p>
            <dl>
              <div><dt>1566</dt><dd>Original bridge completed</dd></div>
              <div><dt>2005</dt><dd>Old Bridge Area inscribed by UNESCO</dd></div>
            </dl>
            <a href="https://whc.unesco.org/en/list/946/" target="_blank" rel="noreferrer" className="motion-study__source">View UNESCO context <ExternalLink size={15} /></a>
          </section>

          <p className="motion-study__credit">Motion Study · Remote scene layers supplied by the project brief</p>
        </div>
      </section>
    </main>
  );
}
