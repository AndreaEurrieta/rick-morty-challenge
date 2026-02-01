import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant: 'warning' | 'error';
  icon?: ReactNode;
  className?: string;
}

export default function Alert({ children, variant, icon, className = '' }: Props) {
  return (
    <div className={`alert alert-${variant} ${className}`}>
      <div className="flex flex-col items-center gap-4">
        {icon && <div className="text-5xl">{icon}</div>}
        {children}
      </div>
    </div>
  );
}
