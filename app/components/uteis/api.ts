// src/services/api.js
import axios from "axios";

const urlTest = ''
const urlProf = 'https://leoncio-backend-production.up.railway.app';

const api = axios.create({
  baseURL: urlProf, 
  timeout: 5000, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptador de requisições (opcional, útil p/ token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export {api}