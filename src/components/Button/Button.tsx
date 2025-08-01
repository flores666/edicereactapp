import type {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from 'react';

import '@/components/Button/Button.css';
import {type ButtonColor} from "@/components/Button/ButtonColors.tsx";

interface IButtonProps
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: ReactNode;
    color: ButtonColor;
}

export function Button({children, className, color, ...props}: IButtonProps) {
    return (
        <button className={[className, color].join(' ')} {...props}>
            {children}
        </button>
    );
}
