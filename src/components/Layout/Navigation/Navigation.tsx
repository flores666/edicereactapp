import { NavigationList } from '@/components/Layout/Navigation/NavigationList';
import { MenuItems } from '@/components/Layout/Navigation/constants';

import '@/components/Layout/Navigation/Navigation.css';

export function Navigation() {
  return (
    <div className="navigation-container">
      <NavigationList items={MenuItems} />
    </div>
  );
}
