import { CITIES, type CityId } from '../data/cities'

interface CityPickerProps {
  selectedId: CityId
  onSelect: (id: CityId) => void
}

export function CityPicker({ selectedId, onSelect }: CityPickerProps) {
  return (
    <div className="city-picker">
      <h2 className="section-title">Choose a city</h2>
      <p className="section-support">
        Sample neighbourhoods with heat risk and building energy baselines.
      </p>
      <div className="city-picker__grid" role="list">
        {CITIES.map((city) => {
          const isActive = city.id === selectedId
          return (
            <button
              key={city.id}
              type="button"
              role="listitem"
              className={`city-picker__card${isActive ? ' is-active' : ''}`}
              onClick={() => onSelect(city.id)}
              aria-pressed={isActive}
            >
              <span className="city-picker__name">{city.name}</span>
              <span className="city-picker__meta">
                {city.suburb} · {city.country}
              </span>
              <span className="city-picker__stats">
                Heat {city.heatIndex} · {city.energyIntensity} kWh/m²
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
