import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_URL as string,
  timeout: 9999,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
