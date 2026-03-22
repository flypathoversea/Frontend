import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import './AboutPage.css';

const TEAM = [
  { name: 'G Anil',   role: 'Visa Expert',  },
  { name: 'Priya Nair',     role: 'Work Visa Specialist', },
  { name: 'Arjun Mehta',    role: 'Operation Manager',  },
  // { name: 'Sunita Reddy',   role: 'Tourist Visa Expert',    exp: 'Schengen & Asia-Pacific specialist' },
];

const MILESTONES = [
  { year: '2010', event: 'Flypath Overseas founded in Hyderabad with a team of 3 consultants.' },
  { year: '2013', event: 'Expanded to serve 20+ destination countries.' },
  { year: '2016', event: 'Crossed 5,000 successful visa approvals.' },
  { year: '2019', event: 'Opened branches in Mumbai and Bangalore. ISO 9001 certified.' },
  { year: '2022', event: 'Launched digital application platform. 10,000+ approvals milestone.' },
  { year: '2025', event: 'Serving clients across 60+ countries with 94% approval rate.' },
];

export default function AboutPage() {
  return (
    <div className="about">
      <Navbar />

      {/* Hero */}
      <section className="about__hero">
        <div className="about__hero-content">
          <p className="about__eyebrow">Who We Are</p>
          <h1 className="about__title">Turning Visa Dreams<br /><span>Into Reality</span></h1>
          <p className="about__subtitle">
            Flypath Overseas is a leading immigration services firm based in Hyderabad, India.
            We specialise in student, work, and tourist visa applications for over 60 countries worldwide.
          </p>
        </div>
        <div className="about__hero-orb" />
      </section>

      {/* Mission */}
      <section className="about__mission">
        <div className="about__mission-inner">
          <div className="about__mission-text">
            <p className="about__eyebrow about__eyebrow--dark">Our Mission</p>
            <h2>Making Global Mobility<br />Accessible to Everyone</h2>
            <p>
              We believe that borders should not be barriers. Our mission is to simplify the complex
              visa process and provide every applicant — student, professional, or traveller — with
              the best chance of approval. We combine deep expertise, personalised guidance, and
              transparent processes to deliver results.
            </p>
            <p>
              Every application is handled by a dedicated consultant who understands the specific
              requirements of your destination country and visa type.
            </p>
          </div>
          {/* <div className="about__mission-stats">
            {[
              { num: '15,000+', label: 'Visas Approved' },
              { num: '60+',     label: 'Countries Covered' },
              { num: '94%',     label: 'Success Rate' },
              { num: '14+',     label: 'Years of Experience' },
              { num: '4',       label: 'Office Locations' },
              { num: '50+',     label: 'Expert Consultants' },
            ].map(({ num, label }) => (
              <div key={label} className="about__stat">
                <span className="about__stat-num">{num}</span>
                <span className="about__stat-label">{label}</span>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Timeline */}
      {/* <section className="about__timeline">
        <div className="about__timeline-inner">
          <div className="about__section-header">
            <p className="about__eyebrow">Our Journey</p>
            <h2 className="about__section-title about__section-title--light">
              15 Years of Excellence
            </h2>
          </div>
          <div className="about__timeline-list">
            {MILESTONES.map(({ year, event }) => (
              <div key={year} className="about__milestone">
                <div className="about__milestone-year">{year}</div>
                <div className="about__milestone-dot" />
                <div className="about__milestone-event">{event}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Team */}
      <section className="about__team">
        <div className="about__team-inner">
          <div className="about__section-header">
            <p className="about__eyebrow about__eyebrow--dark">Our Experts</p>
            <h2 className="about__section-title">Meet the Team</h2>
          </div>
          <div className="about__team-grid">
            {TEAM.map(({ name, role, exp }) => (
              <div key={name} className="about__team-card">
                <div className="about__team-avatar">
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4>{name}</h4>
                <p className="about__team-role">{role}</p>
                <p className="about__team-exp">{exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about__values">
        <div className="about__values-inner">
          <div className="about__section-header">
            <p className="about__eyebrow">What We Stand For</p>
            <h2 className="about__section-title about__section-title--light">Our Core Values</h2>
          </div>
          <div className="about__values-grid">
            {[
              { icon: '🔍', title: 'Transparency',  desc: 'No hidden fees. Clear timelines. Honest assessments of your application\'s chances.' },
              { icon: '🎯', title: 'Accuracy',       desc: 'Every document is reviewed multiple times to ensure zero errors before submission.' },
              { icon: '💬', title: 'Communication',  desc: 'You are updated at every stage. We answer calls, emails, and messages promptly.' },
              { icon: '🤝', title: 'Integrity',      desc: 'We never make false promises. We only take cases we are confident we can win.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="about__value-card">
                <span className="about__value-icon">{icon}</span>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / WhatsApp Section */}
      <section className="about__contact">
        <div className="about__contact-inner">
          <p className="about__eyebrow">Get In Touch</p>
          <h2 className="about__section-title about__section-title--light">Talk to Our Experts Today</h2>
          <p className="about__contact-sub">Have questions about your visa? Reach us instantly on WhatsApp — we reply within minutes.</p>
          <div className="about__contact-cards">
            <a href="https://wa.me/919701947979" target="_blank" rel="noreferrer" className="about__contact-card">
              <div className="about__contact-wa-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <p className="about__contact-num">+91 97019 47979</p>
                <p className="about__contact-hint">Chat on WhatsApp →</p>
              </div>
            </a>
            <a href="https://wa.me/919177424248" target="_blank" rel="noreferrer" className="about__contact-card">
              <div className="about__contact-wa-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <p className="about__contact-num">+91 91774 24248</p>
                <p className="about__contact-hint">Chat on WhatsApp →</p>
              </div>
            </a>
            <div className="about__contact-card about__contact-card--email">
              <div className="about__contact-wa-icon about__contact-wa-icon--email">✉️</div>
              <div>
                <p className="about__contact-num">info@flypathoverseas.com</p>
                <p className="about__contact-hint">Email us anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}