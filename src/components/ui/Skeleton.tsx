interface Props {
  variant?: 'card' | 'tall' | 'default';
  className?: string;
  delay?: number;
}

export default function Skeleton({ variant = 'default', className = '', delay = 0 }: Props) {
  const variantClass = variant === 'card' ? 'skeleton-card' : variant === 'tall' ? 'skeleton-tall' : 'skeleton';

  return (
    <div
      className={`${variantClass} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    />
  );
}
