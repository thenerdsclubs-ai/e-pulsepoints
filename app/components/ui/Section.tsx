import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  backgroundVariant?: 'white' | 'gray' | 'gradient';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
}

const Section = ({ 
  children, 
  className = '',
  backgroundVariant = 'white',
  padding = 'lg',
  id
}: SectionProps) => {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'gradient-bg',
  };

  const paddingClasses = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-20 lg:py-24',
    xl: 'py-20 md:py-24 lg:py-32',
  };

  return (
    <section id={id} className={`${backgroundClasses[backgroundVariant]} ${paddingClasses[padding]} ${className}`}>
      <div className="container-width">
        {children}
      </div>
    </section>
  );
};

export default Section;