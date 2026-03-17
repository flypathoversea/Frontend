import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/api.js';
import './AdminLoginPage.css';

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
    try {
      const res = await loginAdmin(form.email, form.password);
      localStorage.setItem('vp_token', res.data.token);
      localStorage.setItem('vp_admin', JSON.stringify(res.data.admin));
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="alp">
      {/* Left panel */}
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

      {/* Right panel – form */}
      <div className="alp__right">
        <h3 className="alp__form-title">Admin Login</h3>
        <p className="alp__form-sub">Access restricted to authorised personnel only.</p>

        <form className="alp__form" onSubmit={submit}>
          <div className="alp__field">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={set}
              placeholder="admin@visapath.com"
              autoComplete="email"
            />
          </div>
          <div className="alp__field">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={set}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="alp__error">{error}</p>}

          <button type="submit" className="alp__btn" disabled={loading}>
            {loading ? 'Authenticating…' : 'Login →'}
          </button>
        </form>

        <button className="alp__back" onClick={() => navigate('/')}>← Return to main site</button>

        <p className="alp__hint">
          Default credentials: <code>admin@visapath.com</code> / <code>Admin@1234</code><br />
          <small>Run <code>POST /api/auth/seed</code> once to create the admin account.</small>
        </p>
      </div>
    </div>
  );
}