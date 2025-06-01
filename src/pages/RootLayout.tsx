import { Navigation } from '@/components/Layout/Navigation/Navigation';
import { Container } from '@/components/Layout/Container/Container';
import { Menu } from '@/components/Layout/Menu/Menu';
import { Outlet } from 'react-router-dom';

export function RootLayout() {
  return (
    <>
      <Menu />
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
