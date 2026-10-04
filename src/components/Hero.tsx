interface HeroProps {
  onPlanClick: () => void
}

export function Hero({ onPlanClick }: HeroProps) {
  return (
    <header className="hero">
      <div className="hero__atmosphere" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__brand">HeatHaven</p>
        <h1 className="hero__headline">Cool the neighbourhood before 2035.</h1>
        <p className="hero__support">
          Plan shade, cool roofs, and retrofits that cut building energy intensity
          toward the COP31 −25% target — built for Australia, New Zealand, and the
          Pacific.
        </p>
        <button type="button" className="hero__cta" onClick={onPlanClick}>
          Plan a cool neighbourhood
        </button>
      </div>
    </header>
  )
}
