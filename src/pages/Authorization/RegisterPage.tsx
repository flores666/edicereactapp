import { RegisterForm } from '@/components/Authorization';
import { useTitle } from '@/hooks/useTitle';

export function RegisterPage() {
  useTitle('eDice - Создать аккаунт');

  return (
    <div className="authorization-container">
      <RegisterForm />
    </div>
  );
}
