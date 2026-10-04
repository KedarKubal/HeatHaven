import { useMemo, useRef, useState } from 'react'
import { ActionBrief } from './components/ActionBrief'
import { CityPicker } from './components/CityPicker'
import { Hero } from './components/Hero'
import { ImpactDashboard } from './components/ImpactDashboard'
import { InterventionPanel } from './components/InterventionPanel'
import { MapPanel } from './components/MapPanel'
import { getCity, type CityId } from './data/cities'
import type { InterventionId } from './data/interventions'
import { calculateImpact } from './lib/impactModel'
import './App.css'

function App() {
  const plannerRef = useRef<HTMLElement>(null)
  const [cityId, setCityId] = useState<CityId>('suva')
  const [selectedIds, setSelectedIds] = useState<Set<InterventionId>>(
    () => new Set(['cool-roofs', 'cooling-hubs']),
  )

  const city = useMemo(() => getCity(cityId), [cityId])
  const impact = useMemo(
    () => calculateImpact(city, selectedIds),
    [city, selectedIds],
  )

  function scrollToPlanner() {
    plannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleToggle(id: InterventionId) {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="app">
      <Hero onPlanClick={scrollToPlanner} />

      <main ref={plannerRef} id="planner" className="planner">
        <div className="planner__intro">
          <p className="planner__eyebrow">Resilient cities &amp; buildings</p>
          <h2 className="planner__title">Neighbourhood cooling planner</h2>
          <p className="planner__lead">
            Pick a place, stack interventions, and see the path to the COP31
            building energy-intensity target.
          </p>
        </div>

        <CityPicker selectedId={cityId} onSelect={setCityId} />

        <div className="planner__grid">
          <MapPanel city={city} />
          <InterventionPanel selectedIds={selectedIds} onToggle={handleToggle} />
        </div>

        <ImpactDashboard city={city} impact={impact} />
        <ActionBrief city={city} impact={impact} />
      </main>

      <footer className="footer">
        <p>
          HeatHaven · Climate Hack-tion prototype · Build for 2035 · Local demo
          only
        </p>
      </footer>
    </div>
  )
}

export default App
