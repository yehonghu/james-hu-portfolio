# James Hu Portfolio — Experience Direction

## North Star: Spatial Product Narrative

The portfolio should feel like an interactive product launch rather than a conventional freelancer landing page. Every section should reveal a single proof point: the craft, the systems thinking, the execution, and the invitation to work together. The experience is built for founders, creative teams, and recruiters who need to understand both design taste and technical range quickly.

The visual language is **Midnight Signal**: a near-black space, cool titanium typography, a disciplined electric-blue energy line, and glass surfaces with visible depth. The direction keeps the clarity of a modern product keynote without borrowing another brand's identity. It should feel precise, editorial, and authored.

## Visual System

| Layer | Direction |
|---|---|
| Background | Near-black gradient field with a fine perspective grid and slow-moving radial light sources. |
| Typography | Inter Tight for display statements and Inter for readable interface copy. Headlines are oversized, compact, and intentional. |
| Color | Titanium white for primary content, muted silver for supporting copy, electric blue and violet only for energy, focus, and key actions. |
| Surfaces | Semi-transparent panels, restrained blur, hairline borders, and deep shadows to establish hierarchy without visual noise. |
| Imagery | Real project screenshots and authentic work samples only. Device frames and depth come from layout, transform, and light rather than decorative mockups. |

## Scroll and 3D Interaction Principles

The site uses motion to explain hierarchy, not to distract from it. Motion is performed with CSS transforms and Framer Motion so the experience stays lightweight and accessible.

1. **Perspective field.** The opening section contains a layered stage: a perspective grid, parallax orbs, and a project image card that responds gently to pointer movement on desktop.
2. **Scroll depth.** Section content enters on staggered depth planes. Cards may translate in Z-space, rotate slightly, and settle into place as they enter the viewport.
3. **Kinetic progress.** A slim progress indicator communicates reading position. The navigation becomes a glass instrument panel after the visitor begins scrolling.
4. **Project constellation.** Work cards float over a depth grid with hover tilt, image drift, and directional light. Each effect stays subtle enough to protect readability.
5. **Reduced motion.** Visitors who prefer reduced motion receive immediate, stable content with no parallax or ambient animation.

## Content Architecture

1. **Hero — Design with engineering discipline.** Establish the personal point of view, location, and two clear actions.
2. **Signal strip — Measurable range.** Surface selected proof points without turning the page into a résumé.
3. **Selected work — Built products, not thumbnails.** Lead with BookEase and link every case to a source or verified live experience.
4. **Capabilities — One integrated practice.** Explain brand, interface, and engineering delivery as connected services.
5. **Process — From direction to launch.** Make the working process concrete and credible.
6. **About — The practitioner behind the system.** Present education, leadership, tools, and product philosophy in a concise first-person narrative.
7. **Contact — A direct next step.** Offer email, LinkedIn, GitHub, and QR contact in a clear conversion surface.

## Implementation Guardrails

The upgrade keeps the current React, TypeScript, Vite, Tailwind CSS, and Framer Motion foundation. It does not add a heavy 3D rendering dependency when composited transforms, spring motion, and CSS perspective meet the visual goal more reliably. All public interface text, metadata, image alternatives, comments, and repository-facing design notes are English. The final repository remains attributed to Yehong Hu / James Hu only.
