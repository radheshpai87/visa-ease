import axios from 'axios';

// Get API base URL from environment variable and remove /api suffix
// Frontend routes already include /api/ prefix
let baseURL = import.meta.env.VITE_API_BASE_URL || 'https://visa-ease-sandy.vercel.app/api';
// Remove /api from the end to avoid double /api/api/
baseURL = baseURL.replace(/\/api\/?$/, '');

console.log('Axios instance Base URL:', baseURL);

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
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

export default axiosInstance;
