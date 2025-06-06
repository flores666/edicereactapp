import type { TRegisterData } from '@/models/Auth';
import type { TResponse } from '@/models/Response';
import type { TLoginData } from '@/models/Auth';

import { auth } from '@/config/instance';

export const authRegister = async (data: TRegisterData) => {
  const result = await auth.post<TResponse<null>>('/register', data);

  return result.data;
};

export const authLogin = async (data: TLoginData) => {
  const result = await auth.post<TResponse<string>>('/login', data);

  return result.data;
};
