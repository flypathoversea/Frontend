import './StepIndicator.css';

const LABELS = ['Personal Info', 'Visa Details', 'Address'];

export default function StepIndicator({ current }) {
  return (
    <div className="step-indicator">
      {LABELS.map((label, i) => {
        const step = i + 1;
        const done   = current > step;
        const active = current === step;
        return (
          <div key={step} className="step-indicator__item">
            <div className={`step-indicator__dot ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
              {done ? '✓' : step}
            </div>
            <span className={`step-indicator__label ${active ? 'active' : ''}`}>{label}</span>
            {i < LABELS.length - 1 && <div className={`step-indicator__line ${done ? 'done' : ''}`} />}
          </div>
        );
      })}
    </div>
  );
}
