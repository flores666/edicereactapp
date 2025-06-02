import type { TMenuItem } from '@/components/Layout/Navigation/type';

import { Link, useLocation } from 'react-router-dom';

interface INavigationItemProps {
  item: TMenuItem;
}

export function NavigationItem({ item }: INavigationItemProps) {
  const location = useLocation();

  function isActive(href: string) {
    if (href === '/') return location.pathname === href ? 'active' : '';
    return location.pathname.startsWith(href) ? 'active' : '';
  }

  return (
    <li className={isActive(item.href)}>
      <Link to={item.href}>
        <span>
          <img src={item.image} alt="icon" />
        </span>
        <span>{item.text}</span>
      </Link>
    </li>
  );
}
