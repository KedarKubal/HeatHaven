# Third-party & AI tool disclosure

HeatHaven was developed with assistance from **Cursor** (AI coding assistant) for scaffolding, UI implementation, documentation, and refactoring.

## Human / team responsibilities

- Product concept, track selection, and demo narrative  
- Review of impact-model assumptions and sample city figures  
- Local testing (`npm run dev` / `npm run build`)  
- Any future pitch video, team formation, or Junction submission

## Other third-party tools & libraries

- **Vite**, **React**, **TypeScript** — app framework  
- **Leaflet** / **react-leaflet** — interactive map  
- **OpenStreetMap** tiles — basemap imagery (loaded in the browser)  
- **Google Fonts** — Fraunces, DM Sans, IBM Plex Mono

## Data note

City baselines and hotspot scores in `src/data/cities.ts` are **illustrative demo values** for the hackathon prototype, not official government inventories. Real deployments should replace them with measured or agency-sourced data.
