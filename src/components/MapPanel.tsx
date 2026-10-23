import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import type { City } from '../data/cities'
import 'leaflet/dist/leaflet.css'

interface MapPanelProps {
  city: City
}

function MapRecenter({ city }: { city: City }) {
  const map = useMap()

  useEffect(() => {
    map.setView(city.center, city.zoom, { animate: true })
  }, [city, map])

  return null
}

function heatColor(score: number): string {
  if (score >= 85) return '#c44b2b'
  if (score >= 75) return '#e07a3d'
  return '#d4a54a'
}

export function MapPanel({ city }: MapPanelProps) {
  return (
    <div className="map-panel">
      <div className="map-panel__header">
        <h2 className="section-title">Heat map</h2>
        <p className="section-support">{city.context}</p>
      </div>
      <div className="map-panel__frame">
        <MapContainer
          center={city.center}
          zoom={city.zoom}
          scrollWheelZoom={false}
          className="map-panel__leaflet"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapRecenter city={city} />
          {city.hotspots.map((spot) => (
            <CircleMarker
              key={spot.name}
              center={spot.position}
              radius={14}
              pathOptions={{
                color: heatColor(spot.heatScore),
                fillColor: heatColor(spot.heatScore),
                fillOpacity: 0.65,
                weight: 2,
              }}
            >
              <Popup>
                <strong>{spot.name}</strong>
                <br />
                Heat score: {spot.heatScore}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
