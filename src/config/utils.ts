import axios, {AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse} from 'axios';
import type {TAuthorizationToken} from "@/models/AuthorizationToken";

type SetTokensFn = (tokens: TAuthorizationToken) => void;
type OnLogoutFn = () => void;

let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

function onTokenRefreshed(token: string) {
    subscribers.forEach(cb => cb(token));
    subscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
    subscribers.push(callback);
}

export function setInstanceBearerToken(instance: AxiosInstance, token: string) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function attachTokenRefreshInterceptor(
    instance: AxiosInstance,
    options: {
        refreshUrl: string;
        setTokens: SetTokensFn;
        onLogout: OnLogoutFn;
        skipHeader?: string; // чтобы избежать зацикливания
    }
) {
    const {
        refreshUrl,
        setTokens,
        onLogout,
        skipHeader = 'X-Skip-Interceptor',
    } = options;

    const refreshInstance = axios.create(); // отдельный инстанс без перехватчиков

    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

            if (error.response?.status === 401 &&
                !originalRequest._retry &&
                !originalRequest.headers?.[skipHeader]) {
                originalRequest._retry = true;

                if (!isRefreshing) {
                    isRefreshing = true;
                    try {
                        const response = await refreshInstance.post<TAuthorizationToken>(refreshUrl, {
                            headers: {[skipHeader]: 'true'},
                            withCredentials: true
                        });
                        console.log(response);
                        
                        const {accessToken, refreshToken: newRefreshToken} = response.data;

                        setTokens({accessToken, refreshToken: newRefreshToken});
                        setInstanceBearerToken(instance, accessToken);

                        onTokenRefreshed(accessToken);
                    } catch (refreshError) {
                        isRefreshing = false;
                        onLogout();
                        return Promise.reject(refreshError);
                    }
                    isRefreshing = false;
                }

                return new Promise((resolve, _) => {
                    addSubscriber((newToken: string) => {
                        if (!originalRequest.headers) originalRequest.headers = {};
                        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
                        resolve(instance(originalRequest));
                    });
                });
            }

            return Promise.reject(error);
        }
    );
}
