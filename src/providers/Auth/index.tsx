import { AuthContext } from '@/providers/Auth/AuthContext';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext);
export const useAuthActions = () => useAuth().actions;
