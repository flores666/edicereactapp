import type {ReactNode} from 'react';

interface IContainerProps {
    id?: string;
    children: ReactNode;
}

export function Container({children, id}: IContainerProps) {
    return <div id={id} className="container">{children}</div>;
}
