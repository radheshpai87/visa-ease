import axios from 'axios';

// Use environment variable or fallback to production URL
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://visa-ease-sandy.vercel.app/api';

const API = axios.create({ 
  baseURL,
  timeout: 30000, // 30 second timeout for serverless functions
  headers: {
    'Content-Type': 'application/json',
  }
});

console.log('API Base URL:', baseURL);

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const verifyToken = () => API.get('/auth/verify');

// Export the axios instance as default
export default API;