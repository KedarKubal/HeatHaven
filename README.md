# HeatHaven

Local prototype for **Climate Hack-tion** (Build for 2035).

**Track:** Resilient Cities & Buildings  
**COP31 target:** Cut building-sector energy-use intensity by at least **25% by 2035**.

HeatHaven helps city planners and community organisers in Australia, New Zealand, and the Pacific pick a neighbourhood, stack cooling interventions, and see progress toward that target — plus a 90-day pilot brief.

## Who it is for

- Council climate / urban heat teams  
- Community organisations planning shade and cool spaces  
- Mentors and judges evaluating a realistic implementation path

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build   # production build
npm run preview # preview the build
```

No backend, API keys, or paid services required. Map tiles use OpenStreetMap via Leaflet.

## How to demo (under 2 minutes)

1. Land on the hero — brand **HeatHaven**, problem in one line.  
2. Click **Plan a cool neighbourhood**.  
3. Switch cities (try **Suva** then **Melbourne**).  
4. Toggle interventions; watch the 2035 progress bar and people-protected estimate.  
5. Copy or download the action brief.

## Impact model

Transparent client-side math in `src/lib/impactModel.ts`:

- Each intervention has an energy-intensity and heat-risk reduction.  
- Stacked effects use diminishing returns: `1 - Π(1 - effect_i)`.  
- Progress is measured against the −25% COP31 building intensity goal.  
- Sample city baselines live in `src/data/cities.ts` (illustrative demo data, not official inventories).

## How impact could be tested in the real world

1. Choose one suburb and two interventions (e.g. cool roofs + cooling hub).  
2. Baseline: kWh/m² on a 20-building sample + outdoor heat sensors at hotspots.  
3. Deploy over 90 days; compare energy intensity, heat index, and hub footfall on alert days.  
4. Scale only interventions that close the gap toward −25% by 2035.

## Project layout

```
src/
  components/   Hero, CityPicker, MapPanel, InterventionPanel, ImpactDashboard, ActionBrief
  data/         cities.ts, interventions.ts
  lib/          impactModel.ts
  App.tsx
PITCH.md
AI_DISCLOSURE.md
```

## Notes

- This is a **local demo** — not submitted on Junction from this workspace.  
- Official Climate Hack-tion prizes require a team of 3–5 and platform submission.  
- See `PITCH.md` for a 2-minute script and `AI_DISCLOSURE.md` for tool disclosure.
