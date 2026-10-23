import { INTERVENTIONS, type InterventionId } from '../data/interventions'

interface InterventionPanelProps {
  selectedIds: ReadonlySet<InterventionId>
  onToggle: (id: InterventionId) => void
}

export function InterventionPanel({
  selectedIds,
  onToggle,
}: InterventionPanelProps) {
  return (
    <div className="intervention-panel">
      <h2 className="section-title">Interventions</h2>
      <p className="section-support">
        Toggle actions to model energy intensity and heat-risk change.
      </p>
      <ul className="intervention-panel__list">
        {INTERVENTIONS.map((item) => {
          const checked = selectedIds.has(item.id)
          return (
            <li key={item.id}>
              <label className={`intervention${checked ? ' is-on' : ''}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(item.id)}
                />
                <span className="intervention__body">
                  <span className="intervention__name">{item.name}</span>
                  <span className="intervention__summary">{item.summary}</span>
                  <span className="intervention__meta">
                    −{(item.energyReduction * 100).toFixed(0)}% energy · −
                    {(item.heatRiskReduction * 100).toFixed(0)}% heat risk ·{' '}
                    {item.costBand} cost · ~{item.deploymentMonths} mo
                  </span>
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
