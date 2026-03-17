import { useNavigate } from 'react-router-dom';
import Navbar   from '../../components/Navbar/Navbar.jsx';
import VisaCard from '../../components/VisaCard/VisaCard.jsx';
import Footer   from '../../components/Footer/Footer.jsx';
import { VISA_TYPES } from '../../data/visaData.js';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  const goTo = (path) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(path);
  };

  return (
    <div className="home">
      <Navbar />

      {/* Hero */}
      <section className="home__hero">
        <div className="home__hero-content">
          <p className="home__eyebrow">Trusted Visa Experts Since 2010</p>
          <h1 className="home__title">
            Your Gateway to<br />
            <span className="home__title-gold">Global Opportunities</span>
          </h1>
          <p className="home__subtitle">
            Expert consultancy for student, work, and tourist visas.
            Over 15,000 successful applications across 60+ countries.
          </p>
          <div className="home__hero-btns">
            <button className="home__btn-primary"   onClick={() => goTo('/register')}>Apply Now</button>
            <button className="home__btn-secondary" onClick={() => goTo('/request-call')}>Request a Call</button>
          </div>
          {/* <div className="home__stats">
            <div className="home__stat">
              <span className="home__stat-num">15K+</span>
              <span className="home__stat-label">Approvals</span>
            </div>
            <div className="home__stat-divider" />
            <div className="home__stat">
              <span className="home__stat-num">60+</span>
              <span className="home__stat-label">Countries</span>
            </div>
            <div className="home__stat-divider" />
            <div className="home__stat">
              <span className="home__stat-num">94%</span>
              <span className="home__stat-label">Success Rate</span>
            </div>
            <div className="home__stat-divider" />
            <div className="home__stat">
              <span className="home__stat-num">14+</span>
              <span className="home__stat-label">Years Experience</span>
            </div>
          </div> */}
        </div>
        <div className="home__hero-orb home__hero-orb--1" />
        <div className="home__hero-orb home__hero-orb--2" />
      </section>

      {/* Services — 3 cards side by side */}
      <section className="home__services">
        <div className="home__section-header">
          <p className="home__eyebrow home__eyebrow--dark">Our Services</p>
          <h2 className="home__section-title">Choose Your Visa Type</h2>
          <p className="home__section-sub">Click a card to view full details and start your application</p>
        </div>
        <div className="home__cards-grid">
          {VISA_TYPES.map((visa) => (
            <VisaCard
              key={visa.type}
              visa={visa}
              onClick={() => goTo(`/visa/${visa.type}`)}
            />
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="home__why">
        <div className="home__section-header">
          <p className="home__eyebrow">Why Choose Us</p>
          <h2 className="home__section-title home__section-title--light">The Flypath Overseas Difference</h2>
        </div>
        <div className="home__why-grid">
          {[
            { icon: '🎯', title: 'Expert Guidance',    desc: 'Dedicated consultants with deep knowledge of visa processes across 60+ countries.' },
            { icon: '⚡', title: 'Fast Processing',    desc: 'Streamlined documentation ensures your application is submitted without delays.' },
            { icon: '🛡️', title: 'High Approval Rate', desc: '94% success rate built on thorough preparation and attention to detail.' },
            { icon: '🤝', title: 'End-to-End Support', desc: 'From initial consultation to visa stamp, we are with you every step of the way.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="home__why-card">
              <span className="home__why-icon">{icon}</span>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="home__cta-banner">
        <h2>Ready to Start Your Journey?</h2>
        <p>Get expert guidance from our visa consultants today.</p>
        <div className="home__cta-banner-btns">
          <button onClick={() => goTo('/register')}>Apply Now</button>
          <button className="home__cta-outline" onClick={() => goTo('/request-call')}>
            Talk to an Expert
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}