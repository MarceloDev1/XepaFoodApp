import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.2:5021', 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 40000,
});

api.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

export default api;