import { useState } from 'react'
import type { City } from '../data/cities'
import { formatPercent, type ImpactResult } from '../lib/impactModel'

interface ActionBriefProps {
  city: City
  impact: ImpactResult
}

function buildBriefText(city: City, impact: ImpactResult): string {
  const interventionLine =
    impact.selected.length > 0
      ? impact.selected.map((item) => item.name).join(', ')
      : impact.pilot.interventions.join(', ')

  return [
    'HeatHaven — 90-day action brief',
    `City: ${city.name}, ${city.country}`,
    `Neighbourhood: ${city.suburb}`,
    `Selected / pilot interventions: ${interventionLine}`,
    `Projected energy-intensity reduction: ${formatPercent(impact.energyReduction, 1)}`,
    `Projected heat-risk reduction: ${formatPercent(impact.heatRiskReduction, 1)}`,
    `People protected (est.): ${impact.peopleProtected.toLocaleString()}`,
    `2035 −25% target: ${impact.meetsTarget ? 'ON TRACK' : `GAP ${impact.remainingGapPercent.toFixed(1)}%`}`,
    '',
    impact.pilot.summary,
    `Measurement: ${impact.pilot.measurement}`,
  ].join('\n')
}

export function ActionBrief({ city, impact }: ActionBriefProps) {
  const [copied, setCopied] = useState(false)
  const brief = buildBriefText(city, impact)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(brief)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  function handleDownload() {
    const blob = new Blob([brief], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `heathaven-${city.id}-brief.txt`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="action-brief">
      <h2 className="section-title">Action brief</h2>
      <p className="section-support">
        One-page pilot plan you can share with a council or community partner.
      </p>
      <pre className="action-brief__text">{brief}</pre>
      <div className="action-brief__actions">
        <button type="button" className="btn btn--primary" onClick={handleCopy}>
          {copied ? 'Copied' : 'Copy brief'}
        </button>
        <button type="button" className="btn btn--ghost" onClick={handleDownload}>
          Download .txt
        </button>
      </div>
    </div>
  )
}
