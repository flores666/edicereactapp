import {useUserStore} from '@/store/User';
import axios from 'axios';
import {attachTokenRefreshInterceptor, clearInstanceBearerToken, setInstanceBearerToken} from "@/config/utils.ts";

const BACKENDURL = import.meta.env.VITE_BACKEND__URL;

const authInstance = axios.create({
    baseURL: `${BACKENDURL}/auth`,
});

const assetCrafterInstance = axios.create({
    baseURL: `${BACKENDURL}/asset-crafter`,
});

const profileServiceInstance = axios.create({
    baseURL: `${BACKENDURL}/profile`,
});

const token = useUserStore.getState().token;

if (token) {
    setInstanceBearerToken(authInstance, token);
    setInstanceBearerToken(assetCrafterInstance, token);
    setInstanceBearerToken(profileServiceInstance, token);
}

attachTokenRefreshInterceptor([authInstance, assetCrafterInstance, profileServiceInstance], {
    refreshUrl: `${BACKENDURL}/auth/refresh`,
    setTokens: ({accessToken}) => {
        useUserStore.getState().actions.setToken(accessToken);
    },
    onLogout: () => {
        [authInstance, assetCrafterInstance, profileServiceInstance].forEach(instance => clearInstanceBearerToken(instance));
        useUserStore.persist.clearStorage();
    }
});


export const authService = authInstance;
export const assetCrafterService = assetCrafterInstance;
export const profileService = profileServiceInstance;
