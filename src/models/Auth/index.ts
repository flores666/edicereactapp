import type { RegisterFormSchema } from '@/components/Authorization/RegisterForm/schema';
import type { LoginFormSchema } from '@/components/Authorization/LoginForm/schema';
import type { InferType } from 'yup';

export type TLoginForm = InferType<typeof LoginFormSchema>;
export type TLoginData = TLoginForm;

export type TRegisterForm = InferType<typeof RegisterFormSchema>;
export type TRegisterData = Omit<TRegisterForm, 'passwordConfirm'>;
