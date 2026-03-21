import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard      from '../../components/StatCard/StatCard.jsx';
import StatusBadge   from '../../components/StatusBadge/StatusBadge.jsx';
import Spinner       from '../../components/Spinner/Spinner.jsx';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog.jsx';
import {
  fetchApplications,
  updateApplicationStatus,
  deleteApplication,
  fetchRequestCalls,
  updateCallStatus,
} from '../../services/firebase.js';
import './AdminDashboard.css';

const EMOJI = { student: '🎓', work: '💼', tourist: '✈️' };

const fmt = (val) => {
  if (!val) return '—';
  if (val?.toDate) return val.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  if (typeof val === 'string') return new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  return '—';
};

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
  { key: 'createdAt',          label: 'Applied On' },
  { key: 'visaType',           label: 'Visa Type' },
  { key: 'firstName',          label: 'First Name' },
  { key: 'lastName',           label: 'Last Name' },
  { key: 'email',              label: 'Email' },
  { key: 'phone',              label: 'Phone' },
  { key: 'nationality',        label: 'Nationality' },
  { key: 'passportNumber',     label: 'Passport No.' },
  { key: 'destinationCountry', label: 'Destination' },
  { key: 'status',             label: 'Status' },
  { key: 'adminNotes',         label: 'Admin Notes' },
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

  const [tab,     setTab]     = useState('applications');
  const [apps,    setApps]    = useState([]);
  const [calls,   setCalls]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');
  const [filterStatus,   setFilterStatus]   = useState('all');
  const [filterVisaType, setFilterVisaType] = useState('all');
  const [deleteId,       setDeleteId]       = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  /* ── Load data ── */
  const loadApps = useCallback(async () => {
    setLoading(true);
    try { setApps(await fetchApplications()); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  const loadCalls = useCallback(async () => {
    setLoading(true);
    try { setCalls(await fetchRequestCalls()); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (tab === 'applications') loadApps();
    else loadCalls();

    const interval = setInterval(() => {
      if (tab === 'applications') loadApps();
      else loadCalls();
    }, 10000);
    return () => clearInterval(interval);
  }, [tab, loadApps, loadCalls]);

  /* ── Stats ── */
  const stats = {
    total:        apps.length,
    pending:      apps.filter(a => a.status === 'pending').length,
    under_review: apps.filter(a => a.status === 'under_review').length,
    approved:     apps.filter(a => a.status === 'approved').length,
    rejected:     apps.filter(a => a.status === 'rejected').length,
  };

  /* ── Filtered apps ── */
  const filteredApps = apps.filter(a => {
    if (filterStatus   !== 'all' && a.status   !== filterStatus)   return false;
    if (filterVisaType !== 'all' && a.visaType  !== filterVisaType) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        a.firstName?.toLowerCase().includes(s) ||
        a.lastName?.toLowerCase().includes(s)  ||
        a.email?.toLowerCase().includes(s)     ||
        a.passportNumber?.toLowerCase().includes(s)
      );
    }
    return true;
  });

  const logout = () => {
    localStorage.removeItem('vp_token');
    localStorage.removeItem('vp_admin');
    navigate('/admin/login');
  };



  /* ── Delete ── */
  const handleDeleteConfirm = async () => {
    await deleteApplication(deleteId);
    setApps(prev => prev.filter(a => a.id !== deleteId));
    if (selected?.id === deleteId) setSelected(null);
    setDeleteId(null);
  };

  /* ── Export ── */
  const exportApps = (scope) => {
    setShowExportMenu(false);
    const rows = (scope === 'filtered' ? filteredApps : apps).map(r => ({
      ...r, createdAt: fmt(r.createdAt),
    }));
    downloadCSV(toCSV(rows, APP_HEADERS), `flypath-applications-${scope}-${Date.now()}.csv`);
  };

  const exportCalls = () => {
    const rows = calls.map(r => ({ ...r, createdAt: fmt(r.createdAt) }));
    downloadCSV(toCSV(rows, CALL_HEADERS), `flypath-callbacks-${Date.now()}.csv`);
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
          <button className={`ad__nav-item ${tab === 'applications' ? 'ad__nav-item--active' : ''}`} onClick={() => setTab('applications')}>
            <span>📋</span> Applications
          </button>
          <button className={`ad__nav-item ${tab === 'calls' ? 'ad__nav-item--active' : ''}`} onClick={() => setTab('calls')}>
            <span>📞</span> Callback Requests
          </button>
        </nav>

        <div className="ad__stats">
          <StatCard label="Total"    value={stats.total}    />
          <StatCard label="Pending"  value={stats.pending}  color="#c87f1a" />
          <StatCard label="Approved" value={stats.approved} color="#2e7d5e" />
          <StatCard label="Rejected" value={stats.rejected} color="#c0392b" />
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

        {/* Applications Tab */}
        {tab === 'applications' && (
          <>
            <div className="ad__topbar">
              <div className="ad__topbar-left">
                <h1 className="ad__heading">Applications</h1>
              </div>
              <div className="ad__topbar-right">
                <div className="ad__filters">
                  <input className="ad__search" placeholder="Search name, email, passport…"
                    value={search} onChange={e => setSearch(e.target.value)} />
                  <select value={filterVisaType} onChange={e => setFilterVisaType(e.target.value)}>
                    <option value="all">All Visa Types</option>
                    <option value="student">Student</option>
                    <option value="work">Work</option>
                    <option value="tourist">Tourist</option>
                  </select>
                  <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="ad__export-wrap">
                  <button className="ad__export-btn" onClick={() => setShowExportMenu(p => !p)}>⬇ Export Excel</button>
                  {showExportMenu && (
                    <div className="ad__export-menu">
                      <button onClick={() => exportApps('filtered')}>📄 Export Current View ({filteredApps.length} records)</button>
                      <button onClick={() => exportApps('all')}>📦 Export All Applications</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {loading ? <Spinner text="Loading applications…" /> :
             filteredApps.length === 0 ? (
              <div className="ad__empty"><p>📭 No applications found</p><small>Adjust your filters.</small></div>
            ) : (
              <div className="ad__grid">
                {filteredApps.map(app => (
                  <div key={app.id} className="ad__card" onClick={() => navigate(`/admin/application/${app.id}`)}>
                    <div className="ad__card-top">
                      <span className="ad__card-emoji">{EMOJI[app.visaType]}</span>
                      <StatusBadge status={app.status} />
                    </div>
                    <h3 className="ad__card-name">{app.firstName} {app.lastName}</h3>
                    <p className="ad__card-email">{app.email}</p>
                    <div className="ad__card-meta">
                      <span>{app.visaType?.charAt(0).toUpperCase() + app.visaType?.slice(1)} Visa</span>
                      <span>→ {app.destinationCountry}</span>
                    </div>
                    <div className="ad__card-footer">
                      <span>{fmt(app.createdAt)}</span>
                      <button
                        className="ad__card-delete"
                        onClick={e => { e.stopPropagation(); setDeleteId(app.id); }}
                        title="Delete application"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Callbacks Tab */}
        {tab === 'calls' && (
          <>
            <div className="ad__topbar">
              <div className="ad__topbar-left">
                <h1 className="ad__heading">Callback Requests</h1>
              </div>
              <div className="ad__topbar-right">
                <button className="ad__export-btn" onClick={exportCalls}>⬇ Export Excel</button>
              </div>
            </div>

            {loading ? <Spinner text="Loading requests…" /> :
             calls.length === 0 ? (
              <div className="ad__empty"><p>📭 No callback requests yet</p></div>
            ) : (
              <div className="ad__grid">
                {calls.map(call => (
                  <div key={call.id} className="ad__call-card">
                    <div className="ad__card-top">
                      <span className="ad__card-emoji">📞</span>
                      <span className={`ad__call-badge ad__call-badge--${call.status}`}>
                        {call.status?.charAt(0).toUpperCase() + call.status?.slice(1)}
                      </span>
                    </div>
                    <h3 className="ad__card-name">{call.fullName}</h3>
                    <p className="ad__card-email">{call.email}</p>
                    <p className="ad__card-email">📱 {call.phone}</p>
                    <div className="ad__card-meta">
                      <span>{{ student:'🎓', work:'💼', tourist:'✈️', unsure:'❓' }[call.visaInterest]} {call.visaInterest}</span>
                      <span>🌍 {call.country}</span>
                    </div>
                    {call.preferredTime && <p className="ad__call-time">🕐 {call.preferredTime}</p>}
                    {call.message && <p className="ad__call-msg">"{call.message}"</p>}
                    <div className="ad__call-actions">
                      <select value={call.status} onClick={e => e.stopPropagation()}
                        onChange={async (e) => {
                          await updateCallStatus(call.id, e.target.value);
                          setCalls(prev => prev.map(c => c.id === call.id ? { ...c, status: e.target.value } : c));
                        }}>
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



      {deleteId && (
        <ConfirmDialog
          message="Delete this application? This action cannot be undone."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteId(null)}
        />
      )}

      {/* Mobile bottom tabs */}
      <div className="ad__mobile-tabs">
        <button className={`ad__mobile-tab ${tab === 'applications' ? 'ad__mobile-tab--active' : ''}`} onClick={() => setTab('applications')}>
          <span>📋</span><span>Applications</span>
        </button>
        <button className={`ad__mobile-tab ${tab === 'calls' ? 'ad__mobile-tab--active' : ''}`} onClick={() => setTab('calls')}>
          <span>📞</span><span>Callbacks</span>
        </button>
        <button className="ad__mobile-tab" onClick={logout}>
          <span>🚪</span><span>Logout</span>
        </button>
      </div>
    </div>
  );
}