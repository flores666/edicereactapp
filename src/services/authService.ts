import type {TRegisterData} from '@/models/Auth';
import type {TResponse} from '@/models/Response';
import type {TLoginData} from '@/models/Auth';

import {authService} from '@/config/instance';
import type {TAuthorizationToken} from "@/models/AuthorizationToken";
import {clearInstanceBearerToken, setInstanceBearerToken} from "@/config/utils.ts";

export const authRegister = async (data: TRegisterData) => {
    const result = await authService.post<TResponse<null>>('/register', data, {withCredentials: true});
    return result.data;
};

export const authLogin = async (data: TLoginData) => {
    const result = await authService.post<TResponse<TAuthorizationToken>>('/login', data, {withCredentials: true});
    if (result.data.isSuccess && result.data.data) setInstanceBearerToken(authService, result.data.data.accessToken);
    return result.data;
};

export const authLogout = async () => {
    const result = await authService.post<TResponse<null>>('/logout', null, {withCredentials: true});
    if (result.data.isSuccess) clearInstanceBearerToken(authService);
    
    return result.data;
};
