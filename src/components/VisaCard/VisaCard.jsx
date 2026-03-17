import './VisaCard.css';

export default function VisaCard({ visa, onClick }) {
  return (
    <div
      className="visa-card"
      style={{ '--card-bg': visa.cardGradient, '--card-accent': visa.accentColor }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="visa-card__glow" />

      <div className="visa-card__top">
        <span className="visa-card__emoji">{visa.emoji}</span>
        <span className="visa-card__rate">{visa.successRate} Success</span>
      </div>

      <div className="visa-card__body">
        <h3 className="visa-card__title">{visa.label}</h3>
        <p className="visa-card__tagline">{visa.tagline}</p>
        <p className="visa-card__desc">{visa.description}</p>
      </div>

      <div className="visa-card__meta">
        <div className="visa-card__meta-item">
          <span className="visa-card__meta-label">Processing Time</span>
          <span className="visa-card__meta-value">{visa.processing}</span>
        </div>
        <div className="visa-card__meta-divider" />
        <div className="visa-card__meta-item">
          <span className="visa-card__meta-label">Visa Duration</span>
          <span className="visa-card__meta-value">{visa.duration}</span>
        </div>
        <div className="visa-card__meta-divider" />
        <div className="visa-card__meta-item">
          <span className="visa-card__meta-label">Destinations</span>
          <span className="visa-card__meta-value">{visa.destinations.length}+ Countries</span>
        </div>
      </div>

      <div className="visa-card__footer">
        <div className="visa-card__highlights">
          {visa.highlights.slice(0, 2).map((h) => (
            <span key={h} className="visa-card__highlight-tag">✓ {h}</span>
          ))}
        </div>
        <button className="visa-card__cta">
          Apply Now →
        </button>
      </div>
    </div>
  );
}
