import type { ReactNode } from 'react';

interface IContainerProps {
  children: ReactNode;
}

export function Container({ children }: IContainerProps) {
  return <div className="container">{children}</div>;
}
