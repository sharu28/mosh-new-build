# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page marketing/booking site for **Mosh Elite** (a.k.a. "Mosh Hair and Beauty Salon"), a luxury salon in Colombo, Sri Lanka. React 19 + Vite 6 + Tailwind CSS v4, written in TypeScript. Originally scaffolded as a Google AI Studio app.

## Commands

```bash
npm install        # install deps
npm run dev        # dev server on port 3000, host 0.0.0.0
npm run build      # production build (vite build)
npm run preview    # serve the production build
npm run lint       # type-check only: tsc --noEmit  (there is no ESLint)
npm run clean      # rm -rf dist server.js
```

There is **no test setup** (no test runner, no test files). `npm run lint` (`tsc --noEmit`) is the only verification gate — run it after changes.

## Environment

- `GEMINI_API_KEY` and `APP_URL` are read from `.env.local` (see `.env.example`). In AI Studio these are injected at runtime from user secrets.
- `DISABLE_HMR=true` disables HMR **and** file watching (see `vite.config.ts`). AI Studio sets this during agent edits to prevent flicker — do not "fix" the watch/HMR config to work around it.

## Architecture

**Client-only SPA, no router, no backend wired up.** All navigation is in-memory React state.

- `src/App.tsx` is the single source of routing truth. It holds `currentPage: Page` and renders the active page via a `switch` over `renderPageContent()`. Page transitions are animated with `motion/react` (`AnimatePresence` keyed on `currentPage`). There is **no react-router** — to add a page you must: add the literal to the `Page` union in `src/types.ts`, add a `case` in `App.tsx`, and add a nav entry in `src/components/Header.tsx`.
- **Navigation is prop-drilled.** `setCurrentPage` (and often `setPreselectedServiceId`) is passed down from `App` into pages/components. Follow this pattern rather than introducing context/router for new pages.
- **Quiz → Booking flow:** `App` holds `preselectedServiceId`. `QuizSection` recommends a service (by tallying `serviceTag` votes against `CONSULTATION_QUIZ`), which gets stored as `preselectedServiceId`; `BookingsPage`/`BookingManager` consume it and call `clearPreselectedService` once used. Preserve this hand-off when touching the quiz or booking code.

### Data layer

- `src/data/salonData.ts` is the **static content/CMS** for the whole site — exports `SERVICES`, `STYLISTS`, `GALLERY`, `CONSULTATION_QUIZ`, `FAQS`, `PRODUCTS`. There is no API; content edits happen here. All shapes are defined in `src/types.ts`.
- Prices are in LKR (`priceLKR`). Booking data is **persisted in `localStorage`** under the key `mosh_lk_appointments` (see `src/components/BookingManager.tsx`) — there is no server persistence.

### Styling

- Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config.js`). Theme tokens live in `src/index.css` under `@theme` — custom color names like `cream-soft`, `peach-light`, `salon-accent`, `charcoal-deep` and fonts (`Playfair Display`, `Plus Jakarta Sans`, `JetBrains Mono`) are defined there and used as Tailwind classes. Add new design tokens in `@theme`, not inline hex.
- `@/` path alias maps to the repo root (`vite.config.ts` + `tsconfig.json`); existing code mostly uses relative imports.

### Notes / current state

- `@google/genai`, `express`, and `dotenv` are dependencies and `metadata.json` declares `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`, but **no Gemini calls or server exist in `src/` yet** — this is scaffolding for a not-yet-built server-side AI feature.
