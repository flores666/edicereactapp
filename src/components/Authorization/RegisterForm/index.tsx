import type {TRegisterForm} from '@/models/Auth';

import {RegisterFormSchema} from '@/components/Authorization/RegisterForm/schema';
import {ErrorMessage} from '@/components/ErrorMessage';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button} from '@/components/Button/Button';
import {useAuth} from '@/providers/Auth';
import {useForm} from 'react-hook-form';

import '@/components/Authorization/AuthorizationForm.css';
import {ButtonColors} from "@/components/Button/ButtonColors.tsx";
import {ButtonStates} from "@/components/Button/ButtonStates.tsx";
import {useEffect} from "react";
import {parseUserFromJwt} from "@/utils";

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<TRegisterForm>({
        resolver: yupResolver(RegisterFormSchema),
    });

    const auth = useAuth();
    
    useEffect(() => {
        let jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjViYWI0ZWE2LWUyY2MtNDcxNC04OTk0LTRjNzk5NmY4MGM0ZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImJsaW5jaGlraUBtYWlsLnJ1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImJsaW5jaGlraUBtYWlsLnJ1IiwiZXhwIjoxNzgzMDE5NzEwLCJpc3MiOiJlRGljZUF1dGhvcml6YXRpb25TZXJ2aWNlIiwiYXVkIjoiZWRpY2VyZWFjdGFwcCJ9.MBdUO_geyzzr5RRstdZYpjGlGpMN3W82PteBULl7UPw";
        console.log('decoded: ', parseUserFromJwt(jwt))
    });

    useEffect(() => {
        if (auth.isSuccess) {
            reset();
        }
    }, [auth.isSuccess, reset]);

    return (
        <form onSubmit={handleSubmit(auth.actions.authRegister)} className="card">
            <span className="title">
                <h1>Создать аккаунт</h1>
            </span>
            <div className="form-group">
                <div className="form-label-group">
                    <label htmlFor="login" data-required="true">
                        Email
                    </label>
                    <ErrorMessage name="login" errors={errors}/>
                </div>
                <input id="login" placeholder="Введите email" {...register('login')} />
                <small>Будет использоваться как логин</small>
            </div>

            <div className="form-group">
                <div className="form-label-group">
                    <label htmlFor="userName" data-required="true">
                        Отображаемое имя
                    </label>
                    <ErrorMessage name="userName" errors={errors}/>
                </div>
                <input id="userName" placeholder="Введите никнейм" {...register('userName')} />
                <small>Можно поменять в любой момент</small>
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

            <div className="form-group">
                <div className="form-label-group">
                    <label htmlFor="passwordConfirm" data-required="true">
                        Повторите пароль
                    </label>
                    <ErrorMessage name="passwordConfirm" errors={errors}/>
                </div>
                <input
                    type="password"
                    id="passwordConfirm"
                    placeholder="Введите пароль"
                    {...register('passwordConfirm')}
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
                {auth.isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
            </Button>
        </form>
    );
}
