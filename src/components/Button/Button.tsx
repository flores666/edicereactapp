import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

import '@/components/Button/Button.css';

interface IButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
  color?: string;
}

export function Button({ children, className, color, ...props }: IButtonProps) {
  return (
    <button className={[className, color].join(' ')} {...props}>
      {children}
    </button>
  );
}
