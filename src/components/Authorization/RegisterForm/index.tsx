import type { TRegisterForm } from '@/models/Auth';

import { RegisterFormSchema } from '@/components/Authorization/RegisterForm/schema';
import { ErrorMessage } from '@/components/ErrorMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/Button/Button';
import { useAuthActions } from '@/providers/Auth';
import { useForm } from 'react-hook-form';

import '@/components/Authorization/AuthorizationForm.css';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterForm>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const { authRegister } = useAuthActions();

  return (
    <form onSubmit={handleSubmit(authRegister)} className="card">
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
