import type {TMenuItem} from '@/components/Layout/Navigation/type';

import {Link} from 'react-router-dom';
import {isLocationMatchingHref} from "@/utils";

interface INavigationItemProps {
    item: TMenuItem;
}

export function NavigationItem({item}: INavigationItemProps) {
    return (
        <li className={isLocationMatchingHref(item.href) ? 'active' : ''}>
            <Link to={item.href} draggable="false">
                <span>
                  <img src={item.image} alt="icon" draggable="false"/>
                </span>
                <span className="text">{item.text}</span>
            </Link>
        </li>
    );
}
