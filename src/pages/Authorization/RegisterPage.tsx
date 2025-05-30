import { RegisterForm } from '@/components/Authorization';
import { useTitle } from '@/Hooks/useTitle';

export function RegisterPage() {
  useTitle('eDice - Создать аккаунт');

  return (
    <div className="authorization-container">
      <RegisterForm></RegisterForm>
    </div>
  );
}
