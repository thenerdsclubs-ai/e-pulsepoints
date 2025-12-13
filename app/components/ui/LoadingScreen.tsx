'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function LoadingScreen() {
  // Disabled for performance - instant navigation
  return null;
  
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show loading immediately
    setLoading(true);

    // Hide loading once the page content is ready
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100); // Very short delay just to show the animation

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-sm animate-fadeIn">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <div className="relative w-24 h-24 animate-pulse">
          <Image
            src="/logo/logo.png"
            alt="E-PulsePoints Loading"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Pulsing Heartbeat Animation */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-slate-600 font-semibold animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
