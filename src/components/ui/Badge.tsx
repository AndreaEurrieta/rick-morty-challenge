import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant?: 'blue' | 'green' | 'purple';
}

export default function Badge({ children, variant = 'green' }: Props) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}
