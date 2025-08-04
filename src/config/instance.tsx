import {useUserStore} from '@/store/User';
import axios from 'axios';
import {attachTokenRefreshInterceptor, setInstanceBearerToken} from "@/config/utils.ts";
import {setCookie} from "@/utils";

const BACKENDURL = import.meta.env.VITE_BACKEND__URL;

const authInstance = axios.create({
    baseURL: `${BACKENDURL}/auth`,
});

const token = useUserStore.getState().token;

if (token) {
    setInstanceBearerToken(authInstance, token);
}

attachTokenRefreshInterceptor(authInstance, {
    refreshUrl: `${BACKENDURL}/auth/refresh`,
    setTokens: ({accessToken, refreshToken}) => {
        useUserStore.getState().actions.setToken(accessToken);
        setCookie('rt', refreshToken, {
            days: 14, 
            domain: window.location.hostname
        });
    },
    onLogout: () => {
        useUserStore.getState().actions.setToken('');
        window.location.href = '/login';
    },
    setBearerToken: setInstanceBearerToken,
});

export const authService = authInstance;
