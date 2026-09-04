# ALTA — Stage 1

Design system and responsive website foundation for ALTA, a premium fitness and wellness club in Lagos, Nigeria.

## Stage 1 scope

This stage intentionally does **not** build the ALTA homepage or future website pages. It establishes the reusable system those pages will use:

- ALTA color tokens and semantic surfaces
- Montserrat typography scale and responsive type
- Responsive container/grid and spacing system
- Header and mobile navigation foundation
- Reusable button variants and interaction states
- Predictable image frame variants
- Accessibility and reduced-motion foundations
- Restrained transition system

The root route is a **foundation preview**, not the production homepage. It exists to exercise the system before page content is introduced.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Architecture

- `src/main.jsx` — reusable React foundation components and preview shell
- `src/styles.css` — design tokens, primitives, responsive rules and component styling
- `index.html` — Vite entry document
- `vite.config.js` — Vite/React configuration

## Responsive targets

The CSS uses mobile-first behavior with deliberate adjustments for compact mobile, tablet and desktop layouts. The intended QA widths are 320, 375, 390, 430, 768, 1024, 1280, 1366, 1440 and 1536px.

## QA note

The GitHub integration can write and inspect repository source, but this session does not provide a browser-rendering environment. The implementation has therefore been checked structurally against the specified responsive/accessibility requirements; visual browser QA still needs to be run locally or in the connected deployment preview before Stage 1 is signed off as fully rendered.
