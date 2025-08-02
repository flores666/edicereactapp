import type {TRegisterData} from '@/models/Auth';
import type {TLoginData} from '@/models/Auth';
import type {ReactNode} from 'react';

import {useToken, useUser, useUserActions, useUserStore} from '@/store/User';
import {authLogin, authRegister} from '@/services/authService';
import {AuthContext} from '@/providers/Auth/AuthContext';
import {useEffect, useState} from 'react';
import {getResponseFromAxiosError, isNullOrEmpty, parseUserFromJwt} from '@/utils';
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
        setIsLoading(true);
        setIsSuccess(false);

        try {
            const result = await authLogin(data);

            if (!result.isSuccess || isNullOrEmpty(result.data)) {
                handleError(result.message ?? 'Ошибка авторизации');
                return;
            }

            handleLoginSuccess(result.data.accessToken);
        } catch (error) {
            const response = getResponseFromAxiosError(error);
            addNotification(response.message, NotificationTypes.Error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginSuccess = (accessToken: string) => {
        setToken(accessToken);

        const user = parseUserFromJwt(accessToken);
        if (user) {
            setToken(accessToken);
            setUser(user);
            setIsSuccess(true);
            window.location.href = '/';
        } else {
            addNotification('Не удалось распознать пользователя', NotificationTypes.Error);
        }
    };
    
    const register = async (data: TRegisterData) => {
        setIsLoading(true);
        setIsSuccess(false);

        try {
            const authData = omit(data, 'passwordConfirm');
            const result = await authRegister(authData);

            if (!result.isSuccess) {
                handleError(result.message ?? 'Ошибка регистрации');
                return;
            }

            setIsSuccess(true);
            addNotification(result.message ?? 'Регистрация прошла успешно. Вам на почту было отправлено письмо с дальнейшей инструкцией', NotificationTypes.Success);
        } catch (error) {
            const response = getResponseFromAxiosError(error);
            handleError(response.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleError = (message: string) => {
        setIsSuccess(false);
        addNotification(message, NotificationTypes.Error);
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
