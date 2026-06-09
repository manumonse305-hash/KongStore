import axios from 'axios';

const API = import.meta.env.VITE_API_URL;
console.log('🔧 API_URL:', API); // ← Agregar este log

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('🔑 Token:', token ? 'Existe' : 'NO EXISTE'); // ← Agregar
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para respuestas
api.interceptors.response.use(
  (response) => {
    console.log('📥 Respuesta:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;