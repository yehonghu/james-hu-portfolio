/*
 * Titanium Keynote — James Hu portfolio single page.
 * Vertical keynote narrative: Hero → Stats → Work → Services → Process → About → CTA.
 */
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact, { Footer } from "@/components/Contact";
import LiquidAtmosphere from "@/components/LiquidAtmosphere";
import { LiquidGlassBackdrop } from "@/components/LiquidGlass";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <LiquidGlassBackdrop />
      <LiquidAtmosphere />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Stats />
          <Work />
          <Services />
          <Process />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
