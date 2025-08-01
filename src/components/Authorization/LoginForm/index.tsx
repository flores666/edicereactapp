import type {TLoginForm} from '@/models/Auth';

import {LoginFormSchema} from '@/components/Authorization/LoginForm/schema';
import {ErrorMessage} from '@/components/ErrorMessage';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button} from '@/components/Button/Button';
import {useAuth} from '@/providers/Auth';
import {useForm} from 'react-hook-form';

import '@/components/Authorization/AuthorizationForm.css';
import {ButtonColors} from "@/components/Button/ButtonColors.tsx";
import {ButtonStates} from "@/components/Button/ButtonStates.tsx";

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<TLoginForm>({
        resolver: yupResolver(LoginFormSchema),
    });

    const auth = useAuth();

    return (
        <form onSubmit={handleSubmit(auth.actions.authLogin)} className="card">
            <span className="title">
                <h1>Войти в аккаунт</h1>
            </span>
            <div className="form-group">
                <div className="form-label-group">
                    <label htmlFor="login" data-required="true">
                        Email
                    </label>
                    <ErrorMessage name="login" errors={errors}/>
                </div>
                <input id="login" placeholder="Введите email" {...register('login')} />
            </div>

            <div className="form-group">
                <div className="form-label-group">
                    <label htmlFor="password" data-required="true">
                        Пароль
                    </label>
                    <ErrorMessage name="password" errors={errors}/>
                </div>
                <input
                    type="password"
                    id="password"
                    placeholder="Введите пароль"
                    {...register('password')}
                />
            </div>

            <Button
                type="submit"
                color={ButtonColors.White}
                state={auth.isLoading ? ButtonStates.Disabled : ButtonStates.Active}
                style={{
                    width: '100%',
                    marginTop: '1rem'
                }}>
                {auth.isLoading ? 'Загрузка...' : 'Войти'}
            </Button>
        </form>
    );
}
