import Link from 'next/link';

interface AppCTAButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBoth?: boolean;
  className?: string;
}

const AppCTAButton = ({ 
  variant = 'primary', 
  size = 'md', 
  showBoth = false, 
  className = '' 
}: AppCTAButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-xl',
    secondary: 'bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-500 shadow-lg hover:shadow-xl',
    outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border-2 border-blue-500 hover:shadow-lg',
  };

  const sizeClasses = {
    sm: 'py-3 px-6 text-sm min-h-[40px]',
    md: 'py-4 px-8 text-base min-h-[48px]',
    lg: 'py-5 px-10 text-lg min-h-[56px]',
    xl: 'py-6 px-12 text-xl min-h-[64px]',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <Link
      href="https://play.google.com/store/apps/details?id=com.ecgkid.pulsepoints"
      target="_blank"
      rel="noopener noreferrer"
      className={`${buttonClasses} space-x-3`}
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
      </svg>
      <div className="text-left">
        <div className="text-sm opacity-90">Get it on</div>
        <div className="font-bold">Google Play</div>
      </div>
    </Link>
  );
};

export default AppCTAButton;