import {RegisterForm} from '@/components/Authorization';
import {useTitle} from '@/hooks/useTitle';
import {APP_NAME} from "@/config/constants.tsx";

export function RegisterPage() {
    useTitle(`${APP_NAME} | Создать аккаунт`);
    
    return (
        <div className="authorization-container">
            <RegisterForm/>
        </div>
    );
}
