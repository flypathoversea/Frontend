import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchApplications, updateApplicationStatus, deleteApplication } from '../../services/firebase.js';
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import './ApplicationDetailPage.css';

const fmt = (val) => {
  if (!val) return '—';
  if (val?.toDate) return val.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  if (typeof val === 'string' && val.length > 4) return new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  return val || '—';
};

const EMOJI = { student: '🎓', work: '💼', tourist: '✈️' };

function Row({ label, value }) {
  return (
    <div className="adp__row">
      <span className="adp__row-label">{label}</span>
      <span className="adp__row-value">{value || '—'}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="adp__section">
      <h3 className="adp__section-title">{title}</h3>
      <div className="adp__section-grid">{children}</div>
    </div>
  );
}

export default function ApplicationDetailPage() {
  const { id }     = useParams();
  const navigate   = useNavigate();

  const [app,      setApp]      = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [status,   setStatus]   = useState('');
  const [notes,    setNotes]    = useState('');
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const all  = await fetchApplications();
        const found = all.find(a => a.id === id);
        if (found) {
          setApp(found);
          setStatus(found.status);
          setNotes(found.adminNotes || '');
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [id]);

  const save = async () => {
    setSaving(true);
    await updateApplicationStatus(id, status, notes);
    setApp(prev => ({ ...prev, status, adminNotes: notes }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setSaving(false);
  };

  const handleDelete = async () => {
    await deleteApplication(id);
    navigate('/admin');
  };

  if (loading) return <div className="adp__loading"><Spinner text="Loading application…" /></div>;
  if (!app)    return <div className="adp__loading"><p>Application not found.</p><button onClick={() => navigate('/admin')}>← Back</button></div>;

  return (
    <div className="adp">

      {/* Header */}
      <div className="adp__header">
        <div className="adp__header-left">
          <button className="adp__back" onClick={() => navigate('/admin')}>← Back to Dashboard</button>
          <div className="adp__header-info">
            <span className="adp__emoji">{EMOJI[app.visaType]}</span>
            <div>
              <h1 className="adp__name">{app.firstName} {app.lastName}</h1>
              <p className="adp__sub">
                {app.visaType?.charAt(0).toUpperCase() + app.visaType?.slice(1)} Visa Application
                &nbsp;·&nbsp; Applied {fmt(app.createdAt)}
              </p>
            </div>
          </div>
        </div>
        <StatusBadge status={app.status} />
      </div>

      <div className="adp__body">

        {/* Left — all details */}
        <div className="adp__left">

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
            <Row label="Destination Country" value={app.destinationCountry} />
            <Row label="Intended Arrival"     value={fmt(app.intendedArrival)} />
          </Section>

          {app.visaType === 'student' && (
            <Section title="Education Details">
              <Row label="University"    value={app.universityName} />
              <Row label="Course"        value={app.courseName} />
              <Row label="Duration"      value={app.courseDuration} />
              <Row label="Student ID"    value={app.studentId} />
              <Row label="Funding"       value={app.fundingSource} />
            </Section>
          )}

          {app.visaType === 'work' && (
            <Section title="Employment Details">
              <Row label="Employer"        value={app.employerName} />
              <Row label="Job Title"       value={app.jobTitle} />
              <Row label="Employment Type" value={app.employmentType} />
              <Row label="Annual Salary"   value={app.annualSalary} />
              <Row label="Work Duration"   value={app.workDuration} />
            </Section>
          )}

          {app.visaType === 'tourist' && (
            <Section title="Travel Details">
              <Row label="Travel Purpose" value={app.travelPurpose} />
              <Row label="Stay Duration"  value={app.stayDuration} />
              <Row label="Accommodation"  value={app.accommodation} />
              <Row label="Budget"         value={app.travelBudget} />
            </Section>
          )}

          <Section title="Address">
            <Row label="Street"      value={app.address} />
            <Row label="City"        value={app.city} />
            <Row label="State"       value={app.state} />
            <Row label="ZIP Code"    value={app.zipCode} />
            <Row label="Country"     value={app.nationality} />
          </Section>

        </div>

        {/* Right — admin actions */}
        <div className="adp__right">
          <div className="adp__actions-card">
            <h3 className="adp__actions-title">Admin Actions</h3>

            <div className="adp__field">
              <label>Application Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="adp__field">
              <label>Admin Notes</label>
              <textarea
                rows={5}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add internal notes about this application…"
              />
            </div>

            <button className="adp__save-btn" onClick={save} disabled={saving}>
              {saved ? '✓ Saved!' : saving ? 'Saving…' : 'Save Changes'}
            </button>

            <button className="adp__delete-btn" onClick={() => setDeleting(true)}>
              🗑 Delete Application
            </button>
          </div>

          {/* Application ID */}
          <div className="adp__id-card">
            <span className="adp__id-label">Application ID</span>
            <code className="adp__id-value">{app.id}</code>
          </div>
        </div>
      </div>

      {deleting && (
        <ConfirmDialog
          message="Delete this application permanently? This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleting(false)}
        />
      )}
    </div>
  );
}