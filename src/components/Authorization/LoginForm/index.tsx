import type { TLoginForm } from '@/components/Authorization/LoginForm/type';

import { LoginFormSchema } from '@/components/Authorization/LoginForm/schema';
import { ErrorMessage } from '@/components/ErrorMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/Button/Button';
import { useForm } from 'react-hook-form';

import '@/components/Authorization/AuthorizationForm.css';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = (data: TLoginForm) => {
    console.log('Форма отправлена:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <span className="title">
        <h1>Войти в аккаунт</h1>
      </span>
      <div className="form-group">
        <div className="form-label-group">
          <label htmlFor="email" data-required="true">
            Email
          </label>
          <ErrorMessage name="email" errors={errors} />
        </div>
        <input id="email" placeholder="Введите email" {...register('email')} />
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

      <Button type="submit" color="white">
        Войти
      </Button>
    </form>
  );
}
