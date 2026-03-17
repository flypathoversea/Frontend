import { useState } from 'react';
import StepIndicator from '../StepIndicator/StepIndicator.jsx';
import { submitApplication } from '../../services/api.js';
import { COUNTRIES } from '../../data/visaData.js';
import './ApplicationForm.css';

const BLANK = {
  firstName: '', lastName: '', email: '', phone: '',
  dateOfBirth: '', nationality: '', passportNumber: '', passportExpiry: '',
  destinationCountry: '', intendedArrival: '',
  universityName: '', courseName: '', courseDuration: '', studentId: '', fundingSource: '',
  employerName: '', jobTitle: '', employmentType: '', annualSalary: '', workDuration: '',
  travelPurpose: '', stayDuration: '', accommodation: '', travelBudget: '',
  address: '', city: '', state: '', zipCode: '',
};

export default function ApplicationForm({ visaType }) {
  const [form,    setForm]    = useState({ ...BLANK });
  const [step,    setStep]    = useState(1);
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [appId,   setAppId]   = useState(null);

  const set = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  /* ── Validation — only truly required fields ── */
  const v1 = () => {
    const req = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'nationality'];
    for (const k of req) if (!form[k]) return 'Please complete all required fields.';
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Enter a valid email address.';
    return '';
  };

  const v2 = () => {
    if (!form.destinationCountry) return 'Please select a destination country.';
    if (visaType === 'tourist' && (!form.travelPurpose || !form.stayDuration))
      return 'Please fill in travel purpose and stay duration.';
    if (visaType === 'work' && !form.jobTitle)
      return 'Please fill in your job title.';
    return '';
  };

  const v3 = () => {
    if (!form.address || !form.city || !form.state || !form.zipCode)
      return 'Please fill in all address fields.';
    return '';
  };

  const next = () => {
    const err = step === 1 ? v1() : step === 2 ? v2() : '';
    if (err) { setError(err); return; }
    setStep((s) => s + 1);
  };

  const submit = async () => {
    const err = v3();
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      const res = await submitApplication({ ...form, visaType });
      setAppId(res.data.applicationId);
    } catch (e) {
      setError(e.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Success ── */
  if (appId) {
    return (
      <div className="af-success">
        <div className="af-success__icon">✓</div>
        <h3>Application Submitted!</h3>
        <p>We'll contact you within 2–3 business days at <strong>{form.email}</strong>.</p>
        <div className="af-success__id">
          <span>Application ID</span>
          <code>{appId}</code>
        </div>
      </div>
    );
  }

  return (
    <div className="af">
      <StepIndicator current={step} />

      {/* ── Step 1 — Personal Info ── */}
      {step === 1 && (
        <div className="af__section">
          <div className="af__row2">
            <Field label="First Name *"><input name="firstName" value={form.firstName} onChange={set} placeholder="John" /></Field>
            <Field label="Last Name *"><input name="lastName"   value={form.lastName}  onChange={set} placeholder="Doe" /></Field>
          </div>
          <div className="af__row2">
            <Field label="Email *"><input name="email" type="email" value={form.email} onChange={set} placeholder="john@email.com" /></Field>
            <Field label="Phone *"><input name="phone" value={form.phone} onChange={set} placeholder="+91 98765 43210" /></Field>
          </div>
          <div className="af__row2">
            <Field label="Date of Birth *"><input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={set} /></Field>
            <Field label="Nationality *">
              <select name="nationality" value={form.nationality} onChange={set}>
                <option value="">Select country</option>
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <div className="af__row2">
            <Field label="Passport Number"><input name="passportNumber" value={form.passportNumber} onChange={set} placeholder="A1234567 (optional)" /></Field>
            <Field label="Passport Expiry"><input name="passportExpiry" type="date" value={form.passportExpiry} onChange={set} /></Field>
          </div>
        </div>
      )}

      {/* ── Step 2 — Visa Details ── */}
      {step === 2 && (
        <div className="af__section">
          <div className="af__row2">
            <Field label="Destination Country *">
              <select name="destinationCountry" value={form.destinationCountry} onChange={set}>
                <option value="">Select country</option>
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Intended Arrival">
              <input name="intendedArrival" type="date" value={form.intendedArrival} onChange={set} />
            </Field>
          </div>

          {visaType === 'student' && <>
            <div className="af__row2">
              <Field label="University Name"><input name="universityName" value={form.universityName} onChange={set} placeholder="Harvard University (optional)" /></Field>
              <Field label="Course Name"><input name="courseName" value={form.courseName} onChange={set} placeholder="MSc Computer Science (optional)" /></Field>
            </div>
            <div className="af__row2">
              <Field label="Course Duration">
                <select name="courseDuration" value={form.courseDuration} onChange={set}>
                  <option value="">Select</option>
                  {['1 Year','2 Years','3 Years','4 Years'].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Funding Source">
                <select name="fundingSource" value={form.fundingSource} onChange={set}>
                  <option value="">Select</option>
                  {['Self-funded','Family-funded','Scholarship','Bank Loan','Government Grant'].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
            </div>
          </>}

          {visaType === 'work' && <>
            <div className="af__row2">
              <Field label="Employer Name"><input name="employerName" value={form.employerName} onChange={set} placeholder="Company Ltd. (optional)" /></Field>
              <Field label="Job Title *"><input name="jobTitle" value={form.jobTitle} onChange={set} placeholder="Software Engineer" /></Field>
            </div>
            <div className="af__row2">
              <Field label="Employment Type">
                <select name="employmentType" value={form.employmentType} onChange={set}>
                  <option value="">Select</option>
                  {['Full-time','Part-time','Contract','Remote'].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Work Duration">
                <select name="workDuration" value={form.workDuration} onChange={set}>
                  <option value="">Select</option>
                  {['6 Months','1 Year','2 Years','3 Years','5+ Years'].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
            </div>
          </>}

          {visaType === 'tourist' && <>
            <div className="af__row2">
              <Field label="Travel Purpose *">
                <select name="travelPurpose" value={form.travelPurpose} onChange={set}>
                  <option value="">Select</option>
                  {['Leisure/Holiday','Family Visit','Business Trip','Medical','Adventure'].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Stay Duration *">
                <select name="stayDuration" value={form.stayDuration} onChange={set}>
                  <option value="">Select</option>
                  {['1–2 Weeks','2–4 Weeks','1–3 Months','3–6 Months'].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
            </div>
            <div className="af__row2">
              <Field label="Accommodation">
                <select name="accommodation" value={form.accommodation} onChange={set}>
                  <option value="">Select</option>
                  {['Hotel','Airbnb/Rental','Friends/Family','Hostel'].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Travel Budget">
                <select name="travelBudget" value={form.travelBudget} onChange={set}>
                  <option value="">Select</option>
                  {['Under $1,000','$1,000–$3,000','$3,000–$7,000','$7,000+'].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
            </div>
          </>}
        </div>
      )}

      {/* ── Step 3 — Address ── */}
      {step === 3 && (
        <div className="af__section">
          <Field label="Street Address *">
            <input name="address" value={form.address} onChange={set} placeholder="123 Main Street" />
          </Field>
          <div className="af__row2">
            <Field label="City *"><input name="city"  value={form.city}  onChange={set} placeholder="Mumbai" /></Field>
            <Field label="State *"><input name="state" value={form.state} onChange={set} placeholder="Maharashtra" /></Field>
          </div>
          <div className="af__row2">
            <Field label="ZIP / Postal Code *"><input name="zipCode" value={form.zipCode} onChange={set} placeholder="400001" /></Field>
            <Field label="Country"><input value={form.nationality || '—'} disabled className="af__disabled" /></Field>
          </div>
          <p className="af__disclaimer">
            By submitting, you confirm all information provided is accurate. False information may result in visa rejection.
          </p>
        </div>
      )}

      {error && <p className="af__error">{error}</p>}

      <div className="af__nav">
        {step > 1 && <button className="af__btn-sec" onClick={() => setStep((s) => s - 1)}>← Back</button>}
        {step < 3
          ? <button className="af__btn-pri" onClick={next}>Continue →</button>
          : <button className="af__btn-pri" onClick={submit} disabled={loading}>
              {loading ? 'Submitting…' : 'Submit Application'}
            </button>
        }
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="af__field">
      <label className="af__label">{label}</label>
      {children}
    </div>
  );
}