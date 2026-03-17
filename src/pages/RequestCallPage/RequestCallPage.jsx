import { useState } from 'react';
import Navbar  from '../../components/Navbar/Navbar.jsx';
import Footer  from '../../components/Footer/Footer.jsx';
import { submitRequestCall } from '../../services/api.js';
import { COUNTRIES } from '../../data/visaData.js';
import './RequestCallPage.css';

const BLANK = {
  fullName: '', email: '', phone: '', country: '',
  visaInterest: '', preferredTime: '', message: '',
};

export default function RequestCallPage() {
  const [form,    setForm]    = useState({ ...BLANK });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState('');

  const set = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  const validate = () => {
    if (!form.fullName || !form.email || !form.phone || !form.country || !form.visaInterest)
      return 'Please fill in all required fields.';
    if (!/\S+@\S+\.\S+/.test(form.email))
      return 'Enter a valid email address.';
    return '';
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      await submitRequestCall(form);
      setSuccess(true);
    } catch {
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rcp">
      <Navbar />

      <div className="rcp__layout">

        {/* LEFT — info */}
        <aside className="rcp__left">
          <p className="rcp__eyebrow">Get in Touch</p>
          <h1 className="rcp__title">Request a<br /><span>Callback</span></h1>
          <p className="rcp__subtitle">
            Leave your details and one of our expert consultants will call you
            back at your preferred time — no obligation, completely free.
          </p>

          <ul className="rcp__benefits">
            {[
              { icon: '🆓', text: 'Free consultation — no charges' },
              { icon: '⚡', text: 'Response within 2 business hours' },
              { icon: '🎯', text: 'Personalised advice for your situation' },
              { icon: '🌍', text: 'Experts in 60+ destination countries' },
              { icon: '📋', text: 'Document checklist provided on call' },
              { icon: '🔒', text: 'Your data is private and secure' },
            ].map(({ icon, text }) => (
              <li key={text}>
                <span>{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="rcp__contact-block">
            <p className="rcp__contact-label">Prefer to contact us directly?</p>
            <p className="rcp__contact-item">📞 +91 40 1234 5678</p>
            <p className="rcp__contact-item">✉️ info@visapath.com</p>
            <p className="rcp__contact-item">🕐 Mon–Sat, 9am – 7pm IST</p>
          </div>
        </aside>

        {/* RIGHT — form */}
        <div className="rcp__right">
          {success ? (
            <div className="rcp__success">
              <div className="rcp__success-icon">✓</div>
              <h3>Request Received!</h3>
              <p>
                Thank you, <strong>{form.fullName}</strong>. Our team will call you
                at <strong>{form.phone}</strong> within 2 business hours.
              </p>
              <p className="rcp__success-note">
                A confirmation has been sent to {form.email}.
              </p>
              <button onClick={() => { setSuccess(false); setForm({ ...BLANK }); }}>
                Submit Another Request
              </button>
            </div>
          ) : (
            <form className="rcp__form" onSubmit={submit}>
              <h3 className="rcp__form-title">Your Details</h3>

              <div className="rcp__row2">
                <div className="rcp__field">
                  <label>Full Name *</label>
                  <input name="fullName" value={form.fullName} onChange={set} placeholder="John Doe" />
                </div>
                <div className="rcp__field">
                  <label>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={set} placeholder="john@email.com" />
                </div>
              </div>

              <div className="rcp__row2">
                <div className="rcp__field">
                  <label>Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={set} placeholder="+91 98765 43210" />
                </div>
                <div className="rcp__field">
                  <label>Country of Residence *</label>
                  <select name="country" value={form.country} onChange={set}>
                    <option value="">Select country</option>
                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="rcp__row2">
                <div className="rcp__field">
                  <label>Visa of Interest *</label>
                  <select name="visaInterest" value={form.visaInterest} onChange={set}>
                    <option value="">Select type</option>
                    <option value="student">🎓 Student Visa</option>
                    <option value="work">💼 Work Visa</option>
                    <option value="tourist">✈️ Tourist Visa</option>
                    <option value="unsure">❓ Not Sure Yet</option>
                  </select>
                </div>
                <div className="rcp__field">
                  <label>Preferred Call Time</label>
                  <select name="preferredTime" value={form.preferredTime} onChange={set}>
                    <option value="">Any time</option>
                    <option>Morning (9am – 12pm)</option>
                    <option>Afternoon (12pm – 4pm)</option>
                    <option>Evening (4pm – 7pm)</option>
                  </select>
                </div>
              </div>

              <div className="rcp__field">
                <label>Message (optional)</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={set}
                  rows={4}
                  placeholder="Tell us briefly about your situation or any specific questions…"
                />
              </div>

              {error && <p className="rcp__error">{error}</p>}

              <button type="submit" className="rcp__submit" disabled={loading}>
                {loading ? 'Submitting…' : 'Request a Callback →'}
              </button>
            </form>
          )}
        </div>

      </div>

      <Footer />
    </div>
  );
}