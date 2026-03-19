import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import './AboutPage.css';

const TEAM = [
  { name: 'G Anil',   role: 'Visa Specialist' },
  { name: 'A Purendhar Reddy',     role: 'Work Visa Specialist' },
  { name: 'Prem Krishna',    role: 'Operations Manager' },
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

      <Footer />
    </div>
  );
}