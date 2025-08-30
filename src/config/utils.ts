import axios, {AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse} from 'axios';
import type {TAuthorizationResponse} from "@/models/AuthorizationToken";
import type {TResponse} from "@/models/Response";

type SetTokensFn = (tokens: TAuthorizationResponse) => void;
type OnLogoutFn = () => void;

let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

function onTokenRefreshed(token: string) {
    subscribers.forEach((cb) => cb(token));
    subscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
    subscribers.push(callback);
}

export function setInstanceBearerToken(instance: AxiosInstance, token: string) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function clearInstanceBearerToken(instance: AxiosInstance) {
    delete instance.defaults.headers.common["Authorization"];
}

export function attachTokenRefreshInterceptor(
    instances: AxiosInstance[],
    options: {
        refreshUrl: string;
        setTokens: SetTokensFn;
        onLogout: OnLogoutFn;
        skipHeader?: string;
    }
) {
    const {
        refreshUrl,
        setTokens,
        onLogout,
        skipHeader = "X-Skip-Interceptor",
    } = options;

    const refreshInstance = axios.create();

    instances.forEach((instance) => {
        instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as AxiosRequestConfig & {
                    _retry?: boolean;
                };

                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry &&
                    !originalRequest.headers?.[skipHeader]
                ) {
                    originalRequest._retry = true;

                    if (!isRefreshing) {
                        isRefreshing = true;
                        try {
                            const response = (await refreshInstance.post<TResponse<TAuthorizationResponse>>(
                                refreshUrl,
                                {},
                                {
                                    headers: { [skipHeader]: "true" },
                                    withCredentials: true,
                                }
                            )).data;
                            
                            if (!response?.data?.accessToken) throw new Error('Unable to refresh token');
                            
                            setTokens(response.data);

                            instances.forEach((inst) =>
                                setInstanceBearerToken(inst, response.data?.accessToken ?? '')
                            );

                            onTokenRefreshed(response.data.accessToken);
                        } catch (refreshError) {
                            isRefreshing = false;
                            onLogout();
                            return Promise.reject(refreshError);
                        }
                        isRefreshing = false;
                    }

                    return new Promise((resolve) => {
                        addSubscriber((newToken: string) => {
                            if (!originalRequest.headers) originalRequest.headers = {};
                            originalRequest.headers["Authorization"] = "Bearer " + newToken;
                            resolve(instance(originalRequest));
                        });
                    });
                }

                return Promise.reject(error);
            }
        );
    });
}
