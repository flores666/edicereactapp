import {useUserStore} from '@/store/User';
import axios from 'axios';
import {attachTokenRefreshInterceptor, clearInstanceBearerToken, setInstanceBearerToken} from "@/config/utils.ts";

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
    setTokens: ({accessToken}) => {
        useUserStore.getState().actions.setToken(accessToken);
    },
    onLogout: () => {
        clearInstanceBearerToken(authService);
        useUserStore.persist.clearStorage();
    }
});

export const authService = authInstance;
