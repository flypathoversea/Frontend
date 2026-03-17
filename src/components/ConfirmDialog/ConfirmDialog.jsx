import './ConfirmDialog.css';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="confirm-cancel" onClick={onCancel}>Cancel</button>
          <button className="confirm-ok"     onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
