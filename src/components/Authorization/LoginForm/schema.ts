import * as yup from 'yup';

export const LoginFormSchema = yup.object({
  email: yup.string().email('Неверный email').required('Email обязателен'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
});
