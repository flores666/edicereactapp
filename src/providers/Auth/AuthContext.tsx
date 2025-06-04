import { createContext } from 'react';

interface IAuthContext {
  user: string;
}

export const AuthContext = createContext<IAuthContext>({
  user: '',
});
