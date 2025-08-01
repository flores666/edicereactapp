import {useUserStore} from '@/store/User';
import axios from 'axios';

const BACKENDURL = import.meta.env.VITE_BACKEND__URL;

const authInstance = axios.create({
    baseURL: `${BACKENDURL}/auth`,
});

const token = useUserStore.getState().token;

if (token) {
    authInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const authService = authInstance;