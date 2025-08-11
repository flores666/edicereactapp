import {Link} from "react-router-dom";
import '@/components/Tabs/Tabs.css';
import {isLocationMatchingHref} from "@/utils";

export type Tab = {
    title: string;
    link: string;
}

export interface ITabsProps {
    tabs: Tab[];
}

export function Tabs(props: ITabsProps) {
    return (
        <div className='tabs-container'>
            {props.tabs.map((tab) => (
                <Link to={tab.link} key={tab.link} className={'tabs-item' + (isLocationMatchingHref(tab.link) ? ' active' : '')}>{tab.title}</Link>
            ))}
        </div>
    );
}