import type { TRegisterData } from '@/components/Authorization/RegisterForm/type';

import { auth } from '@/config/instance';

export const authRegister = async (data: TRegisterData) => {
  const result = await auth.post('/register', data);

  return result;
};
