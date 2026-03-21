import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage               from './pages/HomePage/HomePage.jsx';
import VisaDetailPage         from './pages/VisaDetailPage/VisaDetailPage.jsx';
import AboutPage              from './pages/AboutPage/AboutPage.jsx';
import RegisterPage           from './pages/RegisterPage/RegisterPage.jsx';
import RequestCallPage        from './pages/RequestCallPage/RequestCallPage.jsx';
import AdminLoginPage         from './pages/AdminLoginPage/AdminLoginPage.jsx';
import AdminDashboard         from './pages/AdminDashboard/AdminDashboard.jsx';
import ApplicationDetailPage  from './pages/ApplicationDetailPage/ApplicationDetailPage.jsx';

const Guard = ({ children }) =>
  localStorage.getItem('vp_token') ? children : <Navigate to="/admin/login" replace />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                         element={<HomePage />} />
        <Route path="/visa/:type"               element={<VisaDetailPage />} />
        <Route path="/about"                    element={<AboutPage />} />
        <Route path="/register"                 element={<RegisterPage />} />
        <Route path="/request-call"             element={<RequestCallPage />} />
        <Route path="/admin/login"              element={<AdminLoginPage />} />
        <Route path="/admin"                    element={<Guard><AdminDashboard /></Guard>} />
        <Route path="/admin/application/:id"    element={<Guard><ApplicationDetailPage /></Guard>} />
        <Route path="*"                         element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}