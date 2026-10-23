import type { City } from '../data/cities'
import {
  INTERVENTIONS,
  TARGET_ENERGY_REDUCTION,
  type Intervention,
  type InterventionId,
} from '../data/interventions'

export interface ImpactResult {
  selected: Intervention[]
  /** Combined energy-intensity reduction (0–1), diminishing returns applied */
  energyReduction: number
  /** Combined heat-risk reduction (0–1), diminishing returns applied */
  heatRiskReduction: number
  projectedEnergyIntensity: number
  projectedHeatIndex: number
  /** Progress toward the COP31 −25% building intensity target (0–1+) */
  targetProgress: number
  meetsTarget: boolean
  peopleProtected: number
  remainingGapPercent: number
  pilot: PilotPlan
}

export interface PilotPlan {
  suburb: string
  interventions: string[]
  days: number
  measurement: string
  summary: string
}

/**
 * Stack interventions with diminishing returns so totals stay believable.
 * Formula: 1 - Π(1 - effect_i)
 */
export function combineEffects(effects: number[]): number {
  if (effects.length === 0) {
    return 0
  }
  const product = effects.reduce((acc, effect) => {
    const clamped = Math.min(Math.max(effect, 0), 0.95)
    return acc * (1 - clamped)
  }, 1)
  return 1 - product
}

export function calculateImpact(
  city: City,
  selectedIds: ReadonlySet<InterventionId>,
): ImpactResult {
  const selected = INTERVENTIONS.filter((item) => selectedIds.has(item.id))
  const energyReduction = combineEffects(selected.map((item) => item.energyReduction))
  const heatRiskReduction = combineEffects(selected.map((item) => item.heatRiskReduction))

  const projectedEnergyIntensity = city.energyIntensity * (1 - energyReduction)
  const projectedHeatIndex = city.heatIndex * (1 - heatRiskReduction)
  const targetProgress = energyReduction / TARGET_ENERGY_REDUCTION
  const meetsTarget = energyReduction >= TARGET_ENERGY_REDUCTION
  const remainingGapPercent = Math.max(
    0,
    (TARGET_ENERGY_REDUCTION - energyReduction) * 100,
  )
  const peopleProtected = Math.round(city.populationAtRisk * heatRiskReduction)

  return {
    selected,
    energyReduction,
    heatRiskReduction,
    projectedEnergyIntensity,
    projectedHeatIndex,
    targetProgress,
    meetsTarget,
    peopleProtected,
    remainingGapPercent,
    pilot: buildPilotPlan(city, selected),
  }
}

function buildPilotPlan(city: City, selected: Intervention[]): PilotPlan {
  const shortlist =
    selected.length > 0
      ? [...selected]
          .sort((a, b) => a.deploymentMonths - b.deploymentMonths)
          .slice(0, 2)
      : INTERVENTIONS.filter((item) => item.id === 'cool-roofs' || item.id === 'cooling-hubs')

  const names = shortlist.map((item) => item.name)
  const days = 90

  return {
    suburb: city.suburb,
    interventions: names,
    days,
    measurement:
      'Track kWh/m² on a 20-building sample, outdoor wet-bulb globe temperature at 3 hotspots, and cooling-hub footfall on heat-alert days.',
    summary: `Run a ${days}-day pilot in ${city.suburb} focused on ${names.join(' + ')}. Compare pre/post energy intensity and heat-risk scores against the COP31 −25% building-sector pathway.`,
  }
}

export function formatPercent(fraction: number, digits = 0): string {
  return `${(fraction * 100).toFixed(digits)}%`
}

export function formatIntensity(value: number): string {
  return `${value.toFixed(0)} kWh/m²`
}
