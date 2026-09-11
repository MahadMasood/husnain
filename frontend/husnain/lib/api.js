import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async (params = {}) => {
  const { data } = await api.get('/products', { params });
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const loginUser = async (email, password) => {
  const { data } = await api.post('/users/login', { email, password });
  return data;
};

export default api;
