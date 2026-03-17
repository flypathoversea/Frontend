import { useState } from 'react';
import StatusBadge from '../StatusBadge/StatusBadge.jsx';
import { patchStatus } from '../../services/api.js';
import './ApplicationModal.css';

const fmt = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

const Row = ({ label, value }) => (
  <div className="am-detail">
    <span className="am-detail__label">{label}</span>
    <span className="am-detail__value">{value || '—'}</span>
  </div>
);

const Section = ({ title, children }) => (
  <section className="am-section">
    <h4 className="am-section__title">{title}</h4>
    <div className="am-section__grid">{children}</div>
  </section>
);

export default function ApplicationModal({ app, onClose, onUpdated, onDelete }) {
  const [status, setStatus]   = useState(app.status);
  const [notes, setNotes]     = useState(app.adminNotes || '');
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await patchStatus(app._id, status, notes);
      onUpdated(app._id, status, notes);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert('Failed to update.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="am-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="am-modal">

        {/* Header */}
        <div className="am-header">
          <div className="am-header__left">
            <span className="am-header__emoji">
              {{ student: '🎓', work: '💼', tourist: '✈️' }[app.visaType]}
            </span>
            <div>
              <h2 className="am-header__name">{app.firstName} {app.lastName}</h2>
              <p className="am-header__sub">
                {app.visaType.charAt(0).toUpperCase() + app.visaType.slice(1)} Visa Application
                &nbsp;·&nbsp; Applied {fmt(app.createdAt)}
              </p>
            </div>
          </div>
          <div className="am-header__right">
            <StatusBadge status={app.status} />
            <button className="am-close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Body */}
        <div className="am-body">
          <Section title="Personal Information">
            <Row label="Full Name"       value={`${app.firstName} ${app.lastName}`} />
            <Row label="Email"           value={app.email} />
            <Row label="Phone"           value={app.phone} />
            <Row label="Date of Birth"   value={fmt(app.dateOfBirth)} />
            <Row label="Nationality"     value={app.nationality} />
            <Row label="Passport No."    value={app.passportNumber} />
            <Row label="Passport Expiry" value={fmt(app.passportExpiry)} />
          </Section>

          <Section title="Travel Information">
            <Row label="Destination"     value={app.destinationCountry} />
            <Row label="Arrival Date"    value={fmt(app.intendedArrival)} />
          </Section>

          {app.visaType === 'student' && (
            <Section title="Education Details">
              <Row label="University"   value={app.universityName} />
              <Row label="Course"       value={app.courseName} />
              <Row label="Duration"     value={app.courseDuration} />
              <Row label="Student ID"   value={app.studentId} />
              <Row label="Funding"      value={app.fundingSource} />
            </Section>
          )}

          {app.visaType === 'work' && (
            <Section title="Employment Details">
              <Row label="Employer"     value={app.employerName} />
              <Row label="Job Title"    value={app.jobTitle} />
              <Row label="Type"         value={app.employmentType} />
              <Row label="Annual Salary" value={app.annualSalary} />
              <Row label="Duration"     value={app.workDuration} />
            </Section>
          )}

          {app.visaType === 'tourist' && (
            <Section title="Travel Details">
              <Row label="Purpose"       value={app.travelPurpose} />
              <Row label="Stay Duration" value={app.stayDuration} />
              <Row label="Accommodation" value={app.accommodation} />
              <Row label="Budget"        value={app.travelBudget} />
            </Section>
          )}

          <Section title="Address">
            <Row label="Street" value={app.address} />
            <Row label="City"   value={app.city} />
            <Row label="State"  value={app.state} />
            <Row label="ZIP"    value={app.zipCode} />
          </Section>

          {/* Admin panel */}
          <section className="am-admin">
            <h4 className="am-section__title">Admin Actions</h4>
            <div className="am-admin__grid">
              <div className="am-admin__field">
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="am-admin__field am-admin__field--full">
                <label>Admin Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Internal notes…"
                />
              </div>
              <div className="am-admin__actions">
                <button className="am-save" onClick={save} disabled={saving}>
                  {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button className="am-delete" onClick={() => onDelete(app._id)}>
                  Delete
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
