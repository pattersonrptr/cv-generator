import axios from 'axios';
import createLogger from './logger';

const logger = createLogger('api');

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor de request
api.interceptors.request.use((config) => {
  logger.info(`${config.method.toUpperCase()} ${config.url}`);
  return config;
});

// Interceptor de response
api.interceptors.response.use(
  (response) => {
    logger.info(`${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;
    logger.error(`Request failed: ${status} ${url}`, error.message);
    return Promise.reject(error);
  }
);

export const curriculoAPI = {
  getAll: () => api.get('/curriculum/'),
  getById: (id) => api.get(`/curriculum/${id}`),
  create: (data) => api.post('/curriculum/', data),
  update: (id, data) => api.put(`/curriculum/${id}`, data),
  remove: (id) => api.delete(`/curriculum/${id}`),
};

export default api;
