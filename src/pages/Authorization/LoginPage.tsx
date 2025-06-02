import { LoginForm } from '@/components/Authorization';
import { useTitle } from '@/Hooks/useTitle';

export function LoginPage() {
  useTitle('eDice - Войти в аккаунт');

  return (
    <div className="authorization-container">
      <LoginForm></LoginForm>
    </div>
  );
}
