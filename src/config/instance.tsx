import { useUserStore } from '@/store/User';
import axios from 'axios';

const LK_API_URL = import.meta.env.VITE_API_URL;

const authInstance = axios.create({
  baseURL: `${LK_API_URL}/auth`,
});

const lkInstance = axios.create({
  baseURL: `${LK_API_URL}`,
});

const token = useUserStore.getState().token;

if (token) {
  lkInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const auth = authInstance;
export const lk = lkInstance;
