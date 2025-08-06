import type {TMenuItems} from '@/components/Layout/Navigation/type';

import {NavigationItem} from '@/components/Layout/Navigation/NavigationItem';
import {useAuth} from '@/providers/Auth';
import {Link} from 'react-router-dom';

interface INavigationListProps {
    items: TMenuItems;
}

export function NavigationList({items}: INavigationListProps) {
    const auth = useAuth();
    
    const onClick = async () => {
        if (auth.isAuthorized) await auth.actions.authLogout()
    }
    
    return (
        <ul>
            {items.map((item) => (
                <NavigationItem key={item.href} item={item}/>
            ))}
            <li>
                <Link to={auth.isAuthorized ? '' : '/login'} onClick={onClick} draggable="false">
                    <span>
                        <img src={auth.isAuthorized ? 'src/assets/icons/logout.svg' : 'src/assets/icons/login.svg'} alt="icon" draggable="false"/>
                    </span>
                    <span>{auth.isAuthorized ? 'Выйти' : 'Войти'}</span>
                </Link>
            </li>
        </ul>
    );
}
