import type { City } from '../data/cities'
import { TARGET_ENERGY_REDUCTION } from '../data/interventions'
import {
  formatIntensity,
  formatPercent,
  type ImpactResult,
} from '../lib/impactModel'

interface ImpactDashboardProps {
  city: City
  impact: ImpactResult
}

export function ImpactDashboard({ city, impact }: ImpactDashboardProps) {
  const progressWidth = Math.min(impact.targetProgress * 100, 100)

  return (
    <div className="impact-dashboard">
      <h2 className="section-title">2035 pathway</h2>
      <p className="section-support">
        COP31 target: cut building-sector energy-use intensity by at least{' '}
        {formatPercent(TARGET_ENERGY_REDUCTION)}.
      </p>

      <div className="impact-dashboard__metrics">
        <div className="metric">
          <span className="metric__label">Energy intensity</span>
          <span className="metric__value">
            {formatIntensity(city.energyIntensity)} →{' '}
            {formatIntensity(impact.projectedEnergyIntensity)}
          </span>
          <span className="metric__hint">
            {formatPercent(impact.energyReduction, 1)} reduction
          </span>
        </div>
        <div className="metric">
          <span className="metric__label">Heat index</span>
          <span className="metric__value">
            {city.heatIndex.toFixed(0)} → {impact.projectedHeatIndex.toFixed(0)}
          </span>
          <span className="metric__hint">
            {formatPercent(impact.heatRiskReduction, 1)} heat-risk cut
          </span>
        </div>
        <div className="metric">
          <span className="metric__label">People protected</span>
          <span className="metric__value">
            {impact.peopleProtected.toLocaleString()}
          </span>
          <span className="metric__hint">
            of {city.populationAtRisk.toLocaleString()} at high risk
          </span>
        </div>
      </div>

      <div className="target-bar" aria-label="Progress toward 2035 target">
        <div className="target-bar__labels">
          <span>Progress to −25% by 2035</span>
          <span>
            {impact.meetsTarget
              ? 'Target met'
              : `${impact.remainingGapPercent.toFixed(1)}% still needed`}
          </span>
        </div>
        <div className="target-bar__track">
          <div
            className={`target-bar__fill${impact.meetsTarget ? ' is-met' : ''}`}
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>
    </div>
  )
}
