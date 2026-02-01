import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = '' }: Props) {
  return <div className={`card ${className}`}>{children}</div>;
}

Card.Header = function CardHeader({ children, className = '' }: Props) {
  return <div className={`card-header ${className}`}>{children}</div>;
};

Card.Body = function CardBody({ children, className = '' }: Props) {
  return <div className={`card-body ${className}`}>{children}</div>;
};

export default Card;
