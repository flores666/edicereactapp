import type { TMenuItems } from '@/components/Layout/Navigation/type';

import { NavigationItem } from '@/components/Layout/Navigation/NavigationItem';

interface INavigationListProps {
  items: TMenuItems;
}

export function NavigationList({ items }: INavigationListProps) {
  return (
    <ul>
      {items.map((item) => (
        <NavigationItem key={item.href} item={item} />
      ))}
    </ul>
  );
}
