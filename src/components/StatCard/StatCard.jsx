import './StatCard.css';

export default function StatCard({ label, value, color }) {
  return (
    <div className="stat-card">
      <span className="stat-card__value" style={{ color: color || 'inherit' }}>
        {value}
      </span>
      <span className="stat-card__label">{label}</span>
    </div>
  );
}
