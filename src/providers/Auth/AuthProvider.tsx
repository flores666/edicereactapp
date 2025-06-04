import type { ReactNode } from 'react';

import { AuthContext } from '@/providers/Auth/AuthContext';
import { useState } from 'react';

interface IAuthProvider {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProvider) {
  const [user] = useState<string>('');

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
