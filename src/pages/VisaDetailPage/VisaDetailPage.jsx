import { useParams, useNavigate } from 'react-router-dom';
import { getVisa } from '../../data/visaData.js';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import ApplicationForm from '../../components/ApplicationForm/ApplicationForm.jsx';
import './VisaDetailPage.css';

export default function VisaDetailPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const visa     = getVisa(type);

  if (!visa) { navigate('/'); return null; }

  return (
    <div className="vdp">
      <Navbar />

      <div className="vdp__layout">
        {/* LEFT — Info panel */}
        <aside className="vdp__info" style={{ background: visa.cardGradient }}>
          <div className="vdp__info-inner">
            <button className="vdp__back" onClick={() => navigate(-1)}>← Back</button>

            <span className="vdp__info-emoji">{visa.emoji}</span>
            <h1 className="vdp__info-title">{visa.label}</h1>
            <p className="vdp__info-desc">{visa.description}</p>

            <div className="vdp__meta">
              <div className="vdp__meta-item">
                <span className="vdp__meta-label">Processing</span>
                <span className="vdp__meta-value">{visa.processing}</span>
              </div>
              <div className="vdp__meta-item">
                <span className="vdp__meta-label">Duration</span>
                <span className="vdp__meta-value">{visa.duration}</span>
              </div>
              <div className="vdp__meta-item">
                <span className="vdp__meta-label">Success Rate</span>
                <span className="vdp__meta-value">{visa.successRate}</span>
              </div>
            </div>

            <div className="vdp__block">
              <h3 className="vdp__block-title">Key Highlights</h3>
              <ul className="vdp__list">
                {visa.highlights.map((h) => (
                  <li key={h}><span className="vdp__tick">✓</span>{h}</li>
                ))}
              </ul>
            </div>

            <div className="vdp__block">
              <h3 className="vdp__block-title">Requirements</h3>
              <ul className="vdp__list">
                {visa.requirements.map((r) => (
                  <li key={r}><span className="vdp__dot">•</span>{r}</li>
                ))}
              </ul>
            </div>

            <div className="vdp__block">
              <h3 className="vdp__block-title">Popular Destinations</h3>
              <div className="vdp__tags">
                {visa.destinations.map((d) => (
                  <span key={d} className="vdp__tag">{d}</span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT — Form panel */}
        <main className="vdp__form-panel">
          <h2 className="vdp__form-title">Apply for {visa.label}</h2>
          <ApplicationForm visaType={type} />
        </main>
      </div>

      <Footer />
    </div>
  );
}