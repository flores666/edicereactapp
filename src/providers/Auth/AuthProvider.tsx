import type {TLoginData, TRegisterData} from '@/models/Auth';
import type {ReactNode} from 'react';
import {useEffect, useState} from 'react';

import {useToken, useUser, useUserStore} from '@/store/User';
import {authLogin, authLogout, authRegister} from '@/services/authService';
import {AuthContext} from '@/providers/Auth/AuthContext';
import {getResponseFromAxiosError, isNullOrEmpty} from '@/utils';
import {omit} from 'lodash';
import type {TAuthorizationToken} from "@/models/AuthorizationToken";
import type {TResponse} from "@/models/Response";

interface IAuthProvider {
    children: ReactNode;
}

export function AuthProvider({children}: IAuthProvider) {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const user = useUser();
    const token = useToken();

    const login = async (data: TLoginData): Promise<TResponse<TAuthorizationToken | null>> => {
        setIsLoading(true);

        try {
            return await authLogin(data);
        } catch (error) {
            return getResponseFromAxiosError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: TRegisterData): Promise<TResponse<null>> => {
        setIsLoading(true);

        try {
            const authData = omit(data, 'passwordConfirm');
            return await authRegister(authData);
        } catch (error) {
            return getResponseFromAxiosError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async (): Promise<TResponse<null>> => {
        try {
            setIsLoading(true);

            const response = await authLogout()
            if (response.isSuccess) {
                useUserStore.persist.clearStorage();
                setIsAuthorized(false);
            }
            
            return response;
        } catch (error) {
            return getResponseFromAxiosError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const _isAuthorized = !isNullOrEmpty(user);
        setIsAuthorized(_isAuthorized);
    }, [user]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                isAuthorized,
                actions: {
                    authLogin: login,
                    authRegister: register,
                    authLogout: logout,
                },
            }}>
            {children}
        </AuthContext.Provider>
    );
}
