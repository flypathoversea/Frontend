import { useNavigate } from 'react-router-dom';
import Navbar   from '../../components/Navbar/Navbar.jsx';
import Footer   from '../../components/Footer/Footer.jsx';
import { VISA_TYPES } from '../../data/visaData.js';
import './RegisterPage.css';

export default function RegisterPage() {
  const navigate = useNavigate();

  const goTo = (path) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(path);
  };

  return (
    <div className="register">
      <Navbar />

      <div className="register__layout">

        {/* LEFT — sticky info */}
        <aside className="register__left">
          <p className="register__eyebrow">Start Your Application</p>
          <h1 className="register__title">Choose a Visa Type<br /><span>to Begin</span></h1>
          <p className="register__subtitle">
            Select the visa type that applies to you. Each application form is
            tailored to the specific requirements of that visa category.
          </p>

          <div className="register__left-points">
            {[
              { icon: '📋', text: 'Step-by-step guided form' },
              { icon: '⚡', text: 'Takes less than 10 minutes' },
              { icon: '🔒', text: 'Your data is secure' },
              { icon: '🤝', text: 'Expert review after submission' },
            ].map(({ icon, text }) => (
              <div key={text} className="register__point">
                <span>{icon}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="register__left-note">
            <p>Not sure which visa you need?</p>
            <button onClick={() => goTo('/request-call')}>Talk to a Consultant →</button>
          </div>
        </aside>

        {/* RIGHT — visa cards */}
        <div className="register__right">
          {VISA_TYPES.map((visa, i) => (
            <div
              key={visa.type}
              className="register__card"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => goTo(`/visa/${visa.type}`)}
            >
              <div className="register__card-left" style={{ background: visa.cardGradient }}>
                <span className="register__card-emoji">{visa.emoji}</span>
                <p className="register__card-rate">{visa.successRate} success</p>
              </div>

              <div className="register__card-body">
                <div>
                  <h3 className="register__card-title">{visa.label}</h3>
                  <p className="register__card-tagline">{visa.tagline}</p>
                  <p className="register__card-desc">{visa.description}</p>
                </div>

                <div className="register__card-meta">
                  <div className="register__meta-item">
                    <span className="register__meta-label">Processing</span>
                    <span className="register__meta-value">{visa.processing}</span>
                  </div>
                  <div className="register__meta-item">
                    <span className="register__meta-label">Duration</span>
                    <span className="register__meta-value">{visa.duration}</span>
                  </div>
                </div>

                <div className="register__card-tags">
                  {visa.highlights.slice(0, 2).map(h => (
                    <span key={h} className="register__tag">✓ {h}</span>
                  ))}
                </div>

                <button
                  className="register__card-btn"
                  style={{ background: visa.accentColor }}
                >
                  Apply for {visa.label} →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
}