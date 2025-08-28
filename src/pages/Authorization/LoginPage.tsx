import {LoginForm} from '@/components/Authorization';
import {useTitle} from '@/hooks/useTitle';
import {APP_NAME} from "@/config/constants.tsx";

export function LoginPage() {
    useTitle(`${APP_NAME} | Войти в аккаунт`);

    return (
        <div className="authorization-container">
            <LoginForm/>
        </div>
    );
}
