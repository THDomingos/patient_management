import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  maxRedirects: 0,
});

// Função para setar o Basic Auth no header
export const setAuthHeader = (username: string, password: string) => {
  const token = btoa(`${username}:${password}`);
  api.defaults.headers.common['Authorization'] = `Basic ${token}`;
};

export default api;
