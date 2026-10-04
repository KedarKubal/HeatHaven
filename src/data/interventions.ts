export type InterventionId =
  | 'cool-roofs'
  | 'shade-canopy'
  | 'retrofit-insulation'
  | 'cooling-hubs'

export type CostBand = 'Low' | 'Medium' | 'High'

export interface Intervention {
  id: InterventionId
  name: string
  summary: string
  /** Fractional reduction of building energy intensity when fully applied (0–1) */
  energyReduction: number
  /** Fractional reduction of heat-risk index when fully applied (0–1) */
  heatRiskReduction: number
  costBand: CostBand
  /** Typical months to first measurable effect */
  deploymentMonths: number
}

export const INTERVENTIONS: Intervention[] = [
  {
    id: 'cool-roofs',
    name: 'Cool roofs',
    summary: 'High-albedo coatings and light roofing to cut solar heat gain.',
    energyReduction: 0.1,
    heatRiskReduction: 0.12,
    costBand: 'Low',
    deploymentMonths: 3,
  },
  {
    id: 'shade-canopy',
    name: 'Shade canopy',
    summary: 'Street trees and shade structures along walking and housing corridors.',
    energyReduction: 0.06,
    heatRiskReduction: 0.16,
    costBand: 'Medium',
    deploymentMonths: 9,
  },
  {
    id: 'retrofit-insulation',
    name: 'Retrofit insulation',
    summary: 'Ceiling and wall upgrades that lower cooling and heating loads.',
    energyReduction: 0.14,
    heatRiskReduction: 0.08,
    costBand: 'High',
    deploymentMonths: 12,
  },
  {
    id: 'cooling-hubs',
    name: 'Community cooling hubs',
    summary: 'Shaded, cooled public rooms for extreme-heat days and outreach.',
    energyReduction: 0.04,
    heatRiskReduction: 0.18,
    costBand: 'Medium',
    deploymentMonths: 6,
  },
]

export const TARGET_ENERGY_REDUCTION = 0.25
