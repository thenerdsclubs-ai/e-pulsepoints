import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md',
  hoverable = true 
}: CardProps) => {
  const variantClasses = {
    default: 'bg-white border border-gray-100 shadow-lg',
    elevated: 'bg-white shadow-xl border border-gray-50',
    bordered: 'bg-white border-2 border-gray-200',
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hoverable ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : '';

  return (
    <div className={`
      rounded-2xl 
      ${variantClasses[variant]} 
      ${paddingClasses[padding]} 
      ${hoverClasses}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;