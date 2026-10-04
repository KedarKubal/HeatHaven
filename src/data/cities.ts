export type CityId = 'melbourne' | 'auckland' | 'suva' | 'port-vila'

export interface City {
  id: CityId
  name: string
  country: string
  suburb: string
  /** Leaflet [lat, lng] */
  center: [number, number]
  zoom: number
  /** Heat vulnerability index 0–100 (higher = more at risk) */
  heatIndex: number
  /** Building energy-use intensity baseline (kWh/m²/year) */
  energyIntensity: number
  /** Residents in high-heat-risk zones */
  populationAtRisk: number
  /** Short planner-facing context */
  context: string
  /** Neighbourhood hotspot markers for the map */
  hotspots: Array<{
    name: string
    position: [number, number]
    heatScore: number
  }>
}

export const CITIES: City[] = [
  {
    id: 'melbourne',
    name: 'Melbourne',
    country: 'Australia',
    suburb: 'Sunshine West',
    center: [-37.788, 144.831],
    zoom: 13,
    heatIndex: 78,
    energyIntensity: 168,
    populationAtRisk: 12400,
    context:
      'Low tree canopy and dark roofs push cooling demand on extreme heat days across the western corridor.',
    hotspots: [
      { name: 'Industrial fringe', position: [-37.792, 144.825], heatScore: 86 },
      { name: 'Housing estate', position: [-37.785, 144.838], heatScore: 81 },
      { name: 'School zone', position: [-37.79, 144.842], heatScore: 74 },
    ],
  },
  {
    id: 'auckland',
    name: 'Auckland',
    country: 'New Zealand',
    suburb: 'Māngere',
    center: [-36.968, 174.799],
    zoom: 13,
    heatIndex: 72,
    energyIntensity: 152,
    populationAtRisk: 9800,
    context:
      'Dense housing and limited shade amplify summer heat stress for families and older residents.',
    hotspots: [
      { name: 'Town centre', position: [-36.966, 174.803], heatScore: 79 },
      { name: 'State housing block', position: [-36.971, 174.792], heatScore: 77 },
      { name: 'Sports fields edge', position: [-36.964, 174.795], heatScore: 68 },
    ],
  },
  {
    id: 'suva',
    name: 'Suva',
    country: 'Fiji',
    suburb: 'Raiwaqa',
    center: [-18.141, 178.441],
    zoom: 14,
    heatIndex: 88,
    energyIntensity: 142,
    populationAtRisk: 7600,
    context:
      'Humid heat and informal densification raise cooling loads; community cool spaces are scarce.',
    hotspots: [
      { name: 'Market corridor', position: [-18.139, 178.444], heatScore: 91 },
      { name: 'Residential ridge', position: [-18.144, 178.438], heatScore: 85 },
      { name: 'Clinic catchment', position: [-18.142, 178.447], heatScore: 82 },
    ],
  },
  {
    id: 'port-vila',
    name: 'Port Vila',
    country: 'Vanuatu',
    suburb: 'Freshwater',
    center: [-17.74, 168.322],
    zoom: 14,
    heatIndex: 84,
    energyIntensity: 138,
    populationAtRisk: 5200,
    context:
      'Coastal heat and limited retrofit finance leave households dependent on inefficient cooling.',
    hotspots: [
      { name: 'Settlement core', position: [-17.738, 168.318], heatScore: 89 },
      { name: 'School compound', position: [-17.743, 168.325], heatScore: 80 },
      { name: 'Waterfront strip', position: [-17.736, 168.327], heatScore: 76 },
    ],
  },
]

export function getCity(id: CityId): City {
  const city = CITIES.find((entry) => entry.id === id)
  if (!city) {
    throw new Error(`Unknown city: ${id}`)
  }
  return city
}
