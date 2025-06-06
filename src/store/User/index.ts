import type { TUser } from '@/models/User';

import { devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';

interface IUserStore {
  user: TUser | null;
  token: string | null;
  actions: {
    setUser: (user: TUser) => void;
    setToken: (token: string) => void;
  };
}

export const useUserStore = create<IUserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        actions: {
          setUser: (user) => set({ user }),
          setToken: (token) => set({ token }),
        },
      }),
      {
        name: 'user',
      },
    ),
  ),
);

export const useUserActions = () => useUserStore((state) => state.actions);

export const useUser = () => useUserStore((state) => state.user);
export const useToken = () => useUserStore((state) => state.token);
