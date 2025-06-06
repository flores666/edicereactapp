import type { TRegisterData } from '@/models/Auth';
import type { TLoginData } from '@/models/Auth';
import type { ReactNode } from 'react';

import { useToken, useUser, useUserActions, useUserStore } from '@/store/User';
import { authLogin, authRegister } from '@/services/authService';
import { AuthContext } from '@/providers/Auth/AuthContext';
import { useEffect, useState } from 'react';
import { isNullOrEmpty } from '@/utils';
import { omit } from 'lodash';

interface IAuthProvider {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProvider) {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useUser();
  const token = useToken();
  const { setUser, setToken } = useUserActions();

  const login = async (data: TLoginData) => {
    try {
      setIsLoading(true);
      console.log('data ', data);
      const result = await authLogin(data);
      if (isNullOrEmpty(result.data)) throw new Error('Ошибка авторизации');

      setToken(result.data);
      setUser({ login: 'test' });
      console.log('Форма отправлена: ', result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: TRegisterData) => {
    try {
      setIsLoading(true);
      const authData = omit(data, 'passwordConfirm');
      const result = await authRegister(authData);
      console.log('Форма отправлена: ', result);
    } catch (error) {
      console.log(error);
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
    const _isAuthorized = !isNullOrEmpty(user) ? true : false;
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
