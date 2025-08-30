import type {TRegisterData} from '@/models/Auth';
import type {TLoginData} from '@/models/Auth';
import type { TResponse } from '@/models/Response';
import type {TUser} from '@/models/User';

import {createContext} from 'react';
import type {TAuthorizationResponse} from "@/models/AuthorizationToken";

interface IAuthContext {
    user: TUser | null;
    token: string | null;
    isLoading: boolean;
    isAuthorized: boolean;
    actions: {
        authLogin: (data: TLoginData) => Promise<TResponse<TAuthorizationResponse | null>>;
        authRegister: (data: TRegisterData) => Promise<TResponse<null>>;
        authLogout: () => Promise<TResponse<null>>;
    };
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    token: null,
    isLoading: false,
    isAuthorized: false,
    actions: {
        authLogin: () : Promise<TResponse<TAuthorizationResponse | null>> => {
            return new Promise<TResponse<TAuthorizationResponse | null>>(() => {
                return {
                    isSuccess: false,
                    message: '',
                    data: null
                };
            })
        },
        authRegister: () : Promise<TResponse<null>> => {
            return new Promise<TResponse<null>>(() => {
                return {
                    isSuccess: false,
                    message: '',
                    data: null
                };
            })
        },
        authLogout: () : Promise<TResponse<null>> => {
            return new Promise<TResponse<null>>(() => {
                return {
                    isSuccess: false,
                    message: '',
                    data: null
                };
            })
        },
    },
});
