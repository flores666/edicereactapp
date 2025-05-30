import { MiniProfile } from '@/components/Layout/MiniProfile/MiniProfile';
import { Container } from '@/components/Layout/Container/Container';
import { Button } from '@/components/Button/Button';
import { useInput } from '@/Hooks/useInput';
import { Link } from 'react-router-dom';

import '@/components/Layout/Menu/Menu.css';

export function Menu() {
  const input = useInput('');

  const connectToLobby = () => {
    console.log(input.value);
  };

  return (
    <div className="menu-container">
      <Container>
        <Link className="logo" to="/">
          <img src="/public/logo_big.svg" alt="eDice" />
          <span>eDice</span>
        </Link>
        <div className="play">
          <input className="secondary" placeholder="Введите ключ" {...input} />
          <Button color={'black'} onClick={connectToLobby}>
            Подключиться
          </Button>
        </div>
        <MiniProfile />
      </Container>
    </div>
  );
}
