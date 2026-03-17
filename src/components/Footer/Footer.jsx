import { useNavigate } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__emblem">⚜</span>
          <div>
            <span className="footer__name">Flypath Overseas</span>
            <span className="footer__tag">Immigration Consultants</span>
          </div>
        </div>
        <div className="footer__links">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/about')}>About</button>
          <button onClick={() => navigate('/register')}>Register</button>
          <button onClick={() => navigate('/request-call')}>Request a Call</button>
        </div>
        <div className="footer__services">
          <button onClick={() => navigate('/visa/student')}>Student Visa</button>
          <button onClick={() => navigate('/visa/work')}>Work Visa</button>
          <button onClick={() => navigate('/visa/tourist')}>Tourist Visa</button>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2025 Flypath Overseas · All Rights Reserved</p>
        <p>Licensed Immigration Consultants · ISO 9001 Certified</p>
      </div>
    </footer>
  );
}