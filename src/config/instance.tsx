import axios from 'axios';

const LK_API_URL = import.meta.env.VITE_API_URL;

export const authInstance = axios.create({
  baseURL: `${LK_API_URL}/auth`,
});

export const auth = authInstance;
