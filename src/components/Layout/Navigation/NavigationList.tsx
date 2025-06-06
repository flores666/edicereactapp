import type { TMenuItems } from '@/components/Layout/Navigation/type';

import { NavigationItem } from '@/components/Layout/Navigation/NavigationItem';
import { useAuthActions } from '@/providers/Auth';
import { Link } from 'react-router-dom';

interface INavigationListProps {
  items: TMenuItems;
}

export function NavigationList({ items }: INavigationListProps) {
  const { authLogout } = useAuthActions();

  return (
    <ul>
      {items.map((item) => (
        <NavigationItem key={item.href} item={item} />
      ))}
      <li>
        <Link to="/" onClick={authLogout}>
          <span>
            <img src="src/assets/templateIcon.svg" alt="icon" />
          </span>
          <span>Выход</span>
        </Link>
      </li>
    </ul>
  );
}
