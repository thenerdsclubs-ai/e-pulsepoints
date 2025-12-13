import Image from 'next/image';

interface MascotImageProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'left' | 'right' | 'center';
  className?: string;
}

const MascotImage = ({ 
  src, 
  alt, 
  size = 'md', 
  position = 'center',
  className = '' 
}: MascotImageProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16 md:w-20 md:h-20',
    md: 'w-24 h-24 md:w-32 md:h-32',
    lg: 'w-32 h-32 md:w-40 md:h-40',
    xl: 'w-40 h-40 md:w-48 md:h-48',
  };

  const positionClasses = {
    left: 'mr-auto',
    right: 'ml-auto',
    center: 'mx-auto',
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${positionClasses[position]} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain hover-lift"
        priority
      />
    </div>
  );
};

export default MascotImage;