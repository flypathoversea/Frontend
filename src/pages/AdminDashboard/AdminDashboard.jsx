import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard         from '../../components/StatCard/StatCard.jsx';
import StatusBadge      from '../../components/StatusBadge/StatusBadge.jsx';
import Spinner          from '../../components/Spinner/Spinner.jsx';
import ApplicationModal from '../../components/ApplicationModal/ApplicationModal.jsx';
import ConfirmDialog    from '../../components/ConfirmDialog/ConfirmDialog.jsx';
import { fetchApplications, deleteApplication, fetchRequestCalls, patchCallStatus } from '../../services/api.js';
import './AdminDashboard.css';

const EMOJI = { student: '🎓', work: '💼', tourist: '✈️' };
const fmt = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

/* ── Excel export helper ── */
function toCSV(rows, headers) {
  const escape = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const head   = headers.map(h => escape(h.label)).join(',');
  const body   = rows.map(r => headers.map(h => escape(r[h.key])).join(',')).join('\n');
  return head + '\n' + body;
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

const APP_HEADERS = [
  { key: 'createdAt',         label: 'Applied On' },
  { key: 'visaType',          label: 'Visa Type' },
  { key: 'firstName',         label: 'First Name' },
  { key: 'lastName',          label: 'Last Name' },
  { key: 'email',             label: 'Email' },
  { key: 'phone',             label: 'Phone' },
  { key: 'nationality',       label: 'Nationality' },
  { key: 'passportNumber',    label: 'Passport No.' },
  { key: 'destinationCountry',label: 'Destination' },
  { key: 'intendedArrival',   label: 'Arrival Date' },
  { key: 'status',            label: 'Status' },
  { key: 'adminNotes',        label: 'Admin Notes' },
];

const CALL_HEADERS = [
  { key: 'createdAt',    label: 'Submitted On' },
  { key: 'fullName',     label: 'Full Name' },
  { key: 'email',        label: 'Email' },
  { key: 'phone',        label: 'Phone' },
  { key: 'country',      label: 'Country' },
  { key: 'visaInterest', label: 'Visa Interest' },
  { key: 'preferredTime',label: 'Preferred Time' },
  { key: 'message',      label: 'Message' },
  { key: 'status',       label: 'Status' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const admin    = JSON.parse(localStorage.getItem('vp_admin') || '{}');

  const [tab,     setTab]     = useState('applications'); // 'applications' | 'calls'
  const [apps,    setApps]    = useState([]);
  const [calls,   setCalls]   = useState([]);
  const [stats,   setStats]   = useState({});
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState({ status: 'all', visaType: 'all', search: '' });
  const [selected,  setSelected]  = useState(null);
  const [deleteId,  setDeleteId]  = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const loadApps = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchApplications(filter);
      setApps(res.data.data);
      setStats(res.data.stats || {});
    } catch (err) {
      if (err.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  }, [filter.status, filter.visaType]);

  const loadCalls = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchRequestCalls();
      setCalls(res.data.data);
    } catch (err) {
      if (err.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tab === 'applications') loadApps();
    else loadCalls();

    // Auto-refresh every 10 seconds so new submissions appear without manual refresh
    const interval = setInterval(() => {
      if (tab === 'applications') loadApps();
      else loadCalls();
    }, 10000);

    return () => clearInterval(interval);
  }, [tab, loadApps, loadCalls]);

  const logout = () => {
    localStorage.removeItem('vp_token');
    localStorage.removeItem('vp_admin');
    navigate('/admin/login');
  };

  const handleSearch = (e) => { if (e.key === 'Enter') loadApps(); };

  const handleUpdated = (id, status, adminNotes) => {
    setApps(prev => prev.map(a => a._id === id ? { ...a, status, adminNotes } : a));
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteApplication(deleteId);
      setApps(prev => prev.filter(a => a._id !== deleteId));
      if (selected?._id === deleteId) setSelected(null);
    } catch { alert('Delete failed.'); }
    finally { setDeleteId(null); }
  };

  /* ── Export ── */
  const exportApplications = async (scope) => {
    setShowExportMenu(false);
    let rows = apps;
    if (scope === 'all') {
      try {
        const res = await fetchApplications({});
        rows = res.data.data;
      } catch { return; }
    }
    const flat = rows.map(r => ({
      ...r,
      createdAt:      fmt(r.createdAt),
      intendedArrival: fmt(r.intendedArrival),
    }));
    downloadCSV(toCSV(flat, APP_HEADERS), `visapath-applications-${scope}-${Date.now()}.csv`);
  };

  const exportCalls = () => {
    const flat = calls.map(r => ({ ...r, createdAt: fmt(r.createdAt) }));
    downloadCSV(toCSV(flat, CALL_HEADERS), `visapath-callbacks-${Date.now()}.csv`);
  };

  return (
    <div className="ad">
      {/* ── Sidebar ── */}
      <aside className="ad__sidebar">
        <div className="ad__logo">
          <span className="ad__logo-emblem">⚜</span>
          <div>
            <span className="ad__logo-name">Flypath Overseas</span>
            <span className="ad__logo-tag">Admin Panel</span>
          </div>
        </div>

        <nav className="ad__nav">
          <button
            className={`ad__nav-item ${tab === 'applications' ? 'ad__nav-item--active' : ''}`}
            onClick={() => setTab('applications')}
          >
            <span>📋</span> Applications
          </button>
          <button
            className={`ad__nav-item ${tab === 'calls' ? 'ad__nav-item--active' : ''}`}
            onClick={() => setTab('calls')}
          >
            <span>📞</span> Callback Requests
          </button>
        </nav>

        <div className="ad__stats">
          <StatCard label="Total"    value={stats.total        || 0} />
          <StatCard label="Pending"  value={stats.pending      || 0} color="#c87f1a" />
          <StatCard label="Approved" value={stats.approved     || 0} color="#2e7d5e" />
          <StatCard label="Rejected" value={stats.rejected     || 0} color="#c0392b" />
        </div>

        <div className="ad__user">
          <div className="ad__avatar">{(admin.name || 'A')[0]}</div>
          <div className="ad__user-info">
            <p className="ad__user-name">{admin.name  || 'Admin'}</p>
            <p className="ad__user-email">{admin.email || ''}</p>
          </div>
        </div>

        <button className="ad__logout" onClick={logout}>Logout</button>
      </aside>

      {/* ── Main ── */}
      <main className="ad__main">

        {/* Applications tab */}
        {tab === 'applications' && (
          <>
            <div className="ad__topbar">
              <div className="ad__topbar-left">
                <h1 className="ad__heading">Applications</h1>
              </div>
              <div className="ad__topbar-right">
                <div className="ad__filters">
                  <input
                    className="ad__search"
                    placeholder="Search name, email, passport…"
                    value={filter.search}
                    onChange={e => setFilter(p => ({ ...p, search: e.target.value }))}
                    onKeyDown={handleSearch}
                  />
                  <select value={filter.visaType} onChange={e => setFilter(p => ({ ...p, visaType: e.target.value }))}>
                    <option value="all">All Visa Types</option>
                    <option value="student">Student</option>
                    <option value="work">Work</option>
                    <option value="tourist">Tourist</option>
                  </select>
                  <select value={filter.status} onChange={e => setFilter(p => ({ ...p, status: e.target.value }))}>
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button className="ad__search-btn" onClick={loadApps}>Search</button>
                </div>

                {/* Export button */}
                <div className="ad__export-wrap">
                  <button
                    className="ad__export-btn"
                    onClick={() => setShowExportMenu(p => !p)}
                    title="Download Excel"
                  >
                    ⬇ Export Excel
                  </button>
                  {showExportMenu && (
                    <div className="ad__export-menu">
                      <button onClick={() => exportApplications('filtered')}>
                        📄 Export Current View ({apps.length} records)
                      </button>
                      <button onClick={() => exportApplications('all')}>
                        📦 Export All Applications
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {loading ? (
              <Spinner text="Loading applications…" />
            ) : apps.length === 0 ? (
              <div className="ad__empty">
                <p>📭 No applications found</p>
                <small>Adjust your filters and try again.</small>
              </div>
            ) : (
              <div className="ad__grid">
                {apps.map(app => (
                  <div key={app._id} className="ad__card" onClick={() => setSelected(app)}>
                    <div className="ad__card-top">
                      <span className="ad__card-emoji">{EMOJI[app.visaType]}</span>
                      <StatusBadge status={app.status} />
                    </div>
                    <h3 className="ad__card-name">{app.firstName} {app.lastName}</h3>
                    <p className="ad__card-email">{app.email}</p>
                    <div className="ad__card-meta">
                      <span>{app.visaType.charAt(0).toUpperCase() + app.visaType.slice(1)} Visa</span>
                      <span>→ {app.destinationCountry}</span>
                    </div>
                    <div className="ad__card-footer">
                      <span>{fmt(app.createdAt)}</span>
                      <span>🛂 {app.passportNumber}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Calls tab */}
        {tab === 'calls' && (
          <>
            <div className="ad__topbar">
              <div className="ad__topbar-left">
                <h1 className="ad__heading">Callback Requests</h1>
              </div>
              <div className="ad__topbar-right">
                <button className="ad__export-btn" onClick={exportCalls}>
                  ⬇ Export Excel
                </button>
              </div>
            </div>

            {loading ? (
              <Spinner text="Loading requests…" />
            ) : calls.length === 0 ? (
              <div className="ad__empty">
                <p>📭 No callback requests yet</p>
              </div>
            ) : (
              <div className="ad__grid">
                {calls.map(call => (
                  <div key={call._id} className="ad__call-card">
                    <div className="ad__card-top">
                      <span className="ad__card-emoji">📞</span>
                      <span className={`ad__call-badge ad__call-badge--${call.status}`}>
                        {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                      </span>
                    </div>
                    <h3 className="ad__card-name">{call.fullName}</h3>
                    <p className="ad__card-email">{call.email}</p>
                    <p className="ad__card-email">📱 {call.phone}</p>
                    <div className="ad__card-meta">
                      <span>{{ student:'🎓', work:'💼', tourist:'✈️', unsure:'❓' }[call.visaInterest]} {call.visaInterest}</span>
                      <span>🌍 {call.country}</span>
                    </div>
                    {call.preferredTime && (
                      <p className="ad__call-time">🕐 {call.preferredTime}</p>
                    )}
                    {call.message && (
                      <p className="ad__call-msg">"{call.message}"</p>
                    )}
                    <div className="ad__call-actions">
                      <select
                        value={call.status}
                        onClick={e => e.stopPropagation()}
                        onChange={async (e) => {
                          try {
                            await patchCallStatus(call._id, e.target.value);
                            setCalls(prev => prev.map(c => c._id === call._id ? { ...c, status: e.target.value } : c));
                          } catch { alert('Update failed.'); }
                        }}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                      <span className="ad__call-date">{fmt(call.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {selected && (
        <ApplicationModal
          app={selected}
          onClose={() => setSelected(null)}
          onUpdated={handleUpdated}
          onDelete={id => setDeleteId(id)}
        />
      )}

      {deleteId && (
        <ConfirmDialog
          message="Delete this application? This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteId(null)}
        />
      )}

      {/* Mobile bottom tab bar */}
      <div className="ad__mobile-tabs">
        <button
          className={`ad__mobile-tab ${tab === 'applications' ? 'ad__mobile-tab--active' : ''}`}
          onClick={() => setTab('applications')}
        >
          <span>📋</span>
          <span>Applications</span>
        </button>
        <button
          className={`ad__mobile-tab ${tab === 'calls' ? 'ad__mobile-tab--active' : ''}`}
          onClick={() => setTab('calls')}
        >
          <span>📞</span>
          <span>Callbacks</span>
        </button>
        <button className="ad__mobile-tab" onClick={logout}>
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}