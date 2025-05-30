import * as yup from 'yup';

export const RegisterFormSchema = yup.object({
  email: yup.string().email('Неверный email').required('Email обязателен'),
  userName: yup.string().required('Имя обязательно').min(2, 'Минимум 2 символа'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтвердите пароль'),
});
