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
import {useNotifications} from "@/providers/Notifications/NotificationsProvider.tsx";
import {NotificationTypes} from "@/providers/Notifications/NotificationIcons.tsx";
import {isNullOrEmpty, parseUserFromJwt, setCookie} from "@/utils";
import {useUserActions} from "@/store/User";
import {useNavigate, useSearchParams} from 'react-router-dom';

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<TLoginForm>({
        resolver: yupResolver(LoginFormSchema),
    });

    const auth = useAuth();
    const {addNotification} = useNotifications();
    const {setUser, setToken} = useUserActions();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const onSubmit = async (data: TLoginForm) => {
        const result = await auth.actions.authLogin(data);

        if (result.isSuccess && !isNullOrEmpty(result.data)) {
            const user = parseUserFromJwt(result.data.accessToken);
            
            if (user) {
                setToken(result.data.accessToken);
                setUser(user);
                setCookie('rt', result.data.refreshToken, {
                    days: 30,
                    domain: window.location.hostname
                });
                navigate(searchParams.get('returnUrl') ?? '/');
            } else {
                addNotification('Не удалось распознать пользователя', NotificationTypes.Error);
            }
        } else {
            addNotification(result.message ?? 'Ошибка авторизации', isNullOrEmpty(result.reason) ? NotificationTypes.Error : NotificationTypes.Info);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card">
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
                state={auth.isLoading ? ButtonStates.Disabled : ButtonStates.Active}>
                {auth.isLoading ? 'Загрузка...' : 'Войти'}
            </Button>
        </form>
    );
}
