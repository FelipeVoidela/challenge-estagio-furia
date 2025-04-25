import React from 'react';
import { Link } from 'react-router-dom';

// Componente wrapper para resolver o problema de tipagem entre Button e Link
interface ButtonLinkProps {
  to: string;
  variant?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ to, variant, className, children, onClick }) => {
  return (
    <Link 
      to={to} 
      className={`btn btn-${variant || 'primary'} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
