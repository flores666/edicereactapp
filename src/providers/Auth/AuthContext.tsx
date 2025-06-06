import type { TRegisterData } from '@/models/Auth';
import type { TLoginData } from '@/models/Auth';
import type { TUser } from '@/models/User';

import { createContext } from 'react';

interface IAuthContext {
  user: TUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthorized: boolean;
  actions: {
    authLogin: (data: TLoginData) => void;
    authRegister: (data: TRegisterData) => void;
    authLogout: () => void;
  };
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  token: null,
  isLoading: false,
  isAuthorized: false,
  actions: {
    authLogin: () => {},
    authRegister: () => {},
    authLogout: () => {},
  },
});
