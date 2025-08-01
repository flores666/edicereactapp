import type {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from 'react';

import '@/components/Button/Button.css';
import {type ButtonColor} from "@/components/Button/ButtonColors.tsx";
import type {ButtonState} from "@/components/Button/ButtonStates.tsx";

interface IButtonProps
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: ReactNode;
    color: ButtonColor;
    state?: ButtonState
}

export function Button({children, className, color, state, ...props}: IButtonProps) {
    return (
        <button className={[className, color, state].join(' ')} {...props}>
            {children}
        </button>
    );
}
