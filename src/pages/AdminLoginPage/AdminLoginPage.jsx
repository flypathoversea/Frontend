import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';

/* ── Hardcoded admin credentials — change these as needed ── */
const ADMIN_EMAIL    = 'admin@flypathoverseas.com';
const ADMIN_PASSWORD = 'Flypath@Admin2026';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm]   = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Enter email and password.'); return; }
    setLoading(true);

    /* Simulate a small delay for UX */
    await new Promise(r => setTimeout(r, 600));

    if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
      localStorage.setItem('vp_token', 'flypath-admin-token');
      localStorage.setItem('vp_admin', JSON.stringify({ name: 'Admin', email: ADMIN_EMAIL }));
      navigate('/admin');
    } else {
      setError('Invalid credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="alp">
      <div className="alp__left">
        <div className="alp__brand">
          <span className="alp__emblem">⚜</span>
          <h2 className="alp__brand-name">Flypath Overseas Admin</h2>
        </div>
        <p className="alp__brand-desc">
          Secure portal for managing visa applications, tracking statuses, and reviewing applicant data.
        </p>
        <ul className="alp__features">
          <li><span>📋</span> View all applications</li>
          <li><span>✏️</span> Update application status</li>
          <li><span>🔍</span> Search &amp; filter records</li>
          <li><span>📊</span> Live dashboard statistics</li>
        </ul>
      </div>

      <div className="alp__right">
        <h3 className="alp__form-title">Admin Login</h3>
        <p className="alp__form-sub">Access restricted to authorised personnel only.</p>

        <form className="alp__form" onSubmit={submit}>
          <div className="alp__field">
            <label>Email Address</label>
            <input name="email" type="email" value={form.email} onChange={set}
              placeholder="admin@flypathoverseas.com" autoComplete="email" />
          </div>
          <div className="alp__field">
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={set}
              placeholder="••••••••" autoComplete="current-password" />
          </div>

          {error && <p className="alp__error">{error}</p>}

          <button type="submit" className="alp__btn" disabled={loading}>
            {loading ? 'Authenticating…' : 'Login →'}
          </button>
        </form>

        <button className="alp__back" onClick={() => navigate('/')}>← Return to main site</button>
      </div>
    </div>
  );
}