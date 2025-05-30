import { type RegisterFormSchema } from '@/components/Authorization/RegisterForm/schema';
import type { InferType } from 'yup';

export type TRegisterForm = InferType<typeof RegisterFormSchema>;
