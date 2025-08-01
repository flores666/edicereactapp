import type {TRegisterData} from '@/models/Auth';
import type {TLoginData} from '@/models/Auth';
import type {ReactNode} from 'react';

import {useToken, useUser, useUserActions, useUserStore} from '@/store/User';
import {authLogin, authRegister} from '@/services/authService';
import {AuthContext} from '@/providers/Auth/AuthContext';
import {useEffect, useState} from 'react';
import {getResponseFromAxiosError, isNullOrEmpty} from '@/utils';
import {omit} from 'lodash';
import {useNotifications} from '../Notifications/NotificationsProvider';
import {NotificationTypes} from "@/providers/Notifications/NotificationIcons.tsx";

interface IAuthProvider {
    children: ReactNode;
}

export function AuthProvider({children}: IAuthProvider) {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const user = useUser();
    const token = useToken();
    const {setUser, setToken} = useUserActions();
    const {addNotification} = useNotifications();

    const login = async (data: TLoginData) => {
        try {
            setIsLoading(true);
            const result = await authLogin(data);
            
            if (result.isSuccess) {
                if (isNullOrEmpty(result.data)) throw new Error('Ошибка авторизации');

                setIsSuccess(true);
                
                setToken(result.data);
                setUser({login: 'test'});

                addNotification(result.message ?? '', NotificationTypes.Success);
            } else {
                setIsSuccess(false);
                addNotification(result.message ?? '', NotificationTypes.Error);
            }
        } catch (error) {
            setIsSuccess(false);

            let response = getResponseFromAxiosError(error);
            addNotification(response.message, NotificationTypes.Error);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: TRegisterData) => {
        try {
            setIsLoading(true);
            const authData = omit(data, 'passwordConfirm');
            const result = await authRegister(authData);

            if (result.isSuccess) {
                setIsSuccess(true);
                addNotification(result.message ?? '', NotificationTypes.Success);
            } else {
                setIsSuccess(false);
                addNotification(result.message ?? '', NotificationTypes.Error);
            }
        } catch (error) {
            setIsSuccess(false);
            
            let response = getResponseFromAxiosError(error);
            addNotification(response.message, NotificationTypes.Error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            useUserStore.persist.clearStorage();
            console.log('Случился Логаут');
        } catch (error) {
            console.log(error);
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
                isSuccess,
                actions: {
                    authLogin: login,
                    authRegister: register,
                    authLogout: logout,
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
