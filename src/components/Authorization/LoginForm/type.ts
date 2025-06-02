import type { LoginFormSchema } from '@/components/Authorization/LoginForm/schema';
import type { InferType } from 'yup';

export type TLoginForm = InferType<typeof LoginFormSchema>;
