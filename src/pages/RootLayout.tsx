import { Navigation } from '@/components/Layout/Navigation/Navigation';
import { MenuItems } from '@/components/Layout/Navigation/constants';
import { Container } from '@/components/Layout/Container/Container';
import { Menu } from '@/components/Layout/Menu/Menu';
import { NavLink } from 'react-router-dom';

export function RootLayout() {
  return (
    <>
      <Menu />
      <Navigation />
      <Container>
        {MenuItems.map((menuItem) => (
          <NavLink key={menuItem.href} to={menuItem.href}>
            {menuItem.text}
          </NavLink>
        ))}
      </Container>
    </>
  );
}
