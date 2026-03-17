import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vp_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* Auth */
export const loginAdmin = (email, password) => api.post('/auth/login', { email, password });

/* Public */
export const submitApplication  = (data) => api.post('/applications', data);
export const submitRequestCall  = (data) => api.post('/request-call', data);

/* Admin – Applications */
export const fetchApplications  = (params) => api.get('/admin/applications', { params });
export const fetchApplication   = (id)     => api.get(`/admin/applications/${id}`);
export const patchStatus        = (id, status, adminNotes) =>
  api.patch(`/admin/applications/${id}/status`, { status, adminNotes });
export const deleteApplication  = (id) => api.delete(`/admin/applications/${id}`);

/* Admin – Request Calls */
export const fetchRequestCalls  = ()         => api.get('/admin/request-calls');
export const patchCallStatus    = (id, status) =>
  api.patch(`/admin/request-calls/${id}/status`, { status });
