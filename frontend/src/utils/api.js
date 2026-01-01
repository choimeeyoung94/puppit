import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add token to headers if available
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

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden
          console.error('Access denied');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Server error');
          break;
        default:
          console.error('An error occurred');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// API methods
export const productAPI = {
  getList: (params) => api.get('/product/list', { params }),
  getDetail: (id) => api.get(`/product/detail/${id}`),
  create: (data) => api.post('/product/new', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => api.post('/product/update', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.post('/product/delete', { productId: id }),
};

export const userAPI = {
  login: (credentials) => api.post('/user/login', credentials),
  register: (data) => api.post('/user/register', data),
  logout: () => api.post('/user/logout'),
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.post('/user/update', data),
};

export const chatAPI = {
  getRooms: () => api.get('/chat/list'),
  getMessages: (roomId) => api.get('/chat/message', { params: { roomId } }),
  createRoom: (params) => api.get('/chat/createRoom', { params }),
  deleteRoom: (roomId) => api.post('/chat/removeroom', { roomId }),
};

export const searchAPI = {
  getTopKeywords: () => api.get('/search/top'),
};

