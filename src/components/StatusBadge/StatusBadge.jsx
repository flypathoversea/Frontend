import './StatusBadge.css';

const CONFIG = {
  pending:      { label: 'Pending',      color: '#c87f1a' },
  under_review: { label: 'Under Review', color: '#1a6fa8' },
  approved:     { label: 'Approved',     color: '#2e7d5e' },
  rejected:     { label: 'Rejected',     color: '#c0392b' },
};

export default function StatusBadge({ status }) {
  const { label, color } = CONFIG[status] || CONFIG.pending;
  return (
    <span
      className="status-badge"
      style={{
        color,
        background: `${color}18`,
        border: `1px solid ${color}35`,
      }}
    >
      {label}
    </span>
  );
}
