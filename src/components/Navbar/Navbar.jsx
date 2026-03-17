import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',     path: '/' },
  { label: 'About',    path: '/about' },
  { label: 'Register', path: '/register' },
];

const SERVICES = [
  { label: '🎓 Student Visa', path: '/visa/student' },
  { label: '💼 Work Visa',    path: '/visa/work' },
  { label: '✈️ Tourist Visa', path: '/visa/tourist' },
];

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="navbar__inner">

        {/* Brand */}
        <div className="navbar__brand" onClick={() => navigate('/')}>
          {/* <span className="navbar__emblem">⚜</span> */}
          <div>
            <span className="navbar__name">Flypath Overseas</span>
            <span className="navbar__tag">Immigration Consultants</span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="navbar__links">
          {NAV_LINKS.map(({ label, path }) => (
            <button
              key={path}
              className={`navbar__link ${isActive(path) ? 'navbar__link--active' : ''}`}
              onClick={() => navigate(path)}
            >
              {label}
            </button>
          ))}

          {/* Services dropdown — hover on the whole container keeps menu open */}
          <div
            className={`navbar__dropdown ${serviceOpen ? 'navbar__dropdown--open' : ''}`}
            onMouseEnter={() => setServiceOpen(true)}
            onMouseLeave={() => setServiceOpen(false)}
          >
            <button className="navbar__link navbar__link--services">
              Services <span className="navbar__caret">▾</span>
            </button>

            <div className="navbar__dropdown-menu">
              <div className="navbar__dropdown-menu-inner">
                {SERVICES.map(({ label, path }) => (
                  <button
                    key={path}
                    className="navbar__dropdown-item"
                    onClick={() => { navigate(path); setServiceOpen(false); }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* CTA */}
        <button className="navbar__cta" onClick={() => navigate('/request-call')}>
          Request a Call
        </button>

        {/* Mobile hamburger */}
        <button className="navbar__hamburger" onClick={() => setMenuOpen(p => !p)}>
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile">
          {NAV_LINKS.map(({ label, path }) => (
            <button
              key={path}
              className="navbar__mobile-link"
              onClick={() => { navigate(path); setMenuOpen(false); }}
            >
              {label}
            </button>
          ))}
          <div className="navbar__mobile-group">
            <p className="navbar__mobile-group-label">Services</p>
            {SERVICES.map(({ label, path }) => (
              <button
                key={path}
                className="navbar__mobile-link navbar__mobile-link--sub"
                onClick={() => { navigate(path); setMenuOpen(false); }}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            className="navbar__mobile-cta"
            onClick={() => { navigate('/request-call'); setMenuOpen(false); }}
          >
            Request a Call
          </button>
        </div>
      )}
    </header>
  );
}