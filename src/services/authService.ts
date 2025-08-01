import type {TRegisterData} from '@/models/Auth';
import type {TResponse} from '@/models/Response';
import type {TLoginData} from '@/models/Auth';

import {authService} from '@/config/instance';

export const authRegister = async (data: TRegisterData) => {
    const result = await authService.post<TResponse<null>>('/register', data);
    return result.data;
};

export const authLogin = async (data: TLoginData) => {
    const result = await authService.post<TResponse<string>>('/login', data);
    return result.data;
};
