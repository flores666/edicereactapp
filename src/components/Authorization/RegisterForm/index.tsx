import type { TRegisterForm } from '@/components/Authorization/RegisterForm/type';

import { RegisterFormSchema } from '@/components/Authorization/RegisterForm/schema';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/Button/Button.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { authRegister } from '@/services/authService';
import { useForm } from 'react-hook-form';
import { omit } from 'lodash';

import '@/components/Authorization/AuthorizationForm.css';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterForm>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: TRegisterForm) => {
    const authData = omit(data, 'passwordConfirm');
    const result = await authRegister(authData);
    console.log('Форма отправлена:', result);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <span className="title">
        <h1>Создать аккаунт</h1>
      </span>
      <div className="form-group">
        <div className="form-label-group">
          <label htmlFor="login" data-required="true">
            Email
          </label>
          <ErrorMessage name="login" errors={errors} />
        </div>
        <input id="login" placeholder="Введите email" {...register('login')} />
        <small>Будет использоваться как логин</small>
      </div>

      <div className="form-group">
        <div className="form-label-group">
          <label htmlFor="userName" data-required="true">
            Отображаемое имя
          </label>
          <ErrorMessage name="userName" errors={errors} />
        </div>
        <input id="userName" placeholder="Введите никнейм" {...register('userName')} />
        <small>Можно поменять в любой момент</small>
      </div>

      <div className="form-group">
        <div className="form-label-group">
          <label htmlFor="password" data-required="true">
            Пароль
          </label>
          <ErrorMessage name="password" errors={errors} />
        </div>
        <input
          type="password"
          id="password"
          placeholder="Введите пароль"
          {...register('password')}
        />
      </div>

      <div className="form-group">
        <div className="form-label-group">
          <label htmlFor="passwordConfirm" data-required="true">
            Повторите пароль
          </label>
          <ErrorMessage name="passwordConfirm" errors={errors} />
        </div>
        <input
          type="password"
          id="passwordConfirm"
          placeholder="Введите пароль"
          {...register('passwordConfirm')}
        />
      </div>

      <Button type="submit" color="white">
        Зарегистрироваться
      </Button>
    </form>
  );
}
