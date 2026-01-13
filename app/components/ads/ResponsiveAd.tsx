'use client';

import AdSenseAd from './AdSenseAd';

interface ResponsiveAdProps {
  className?: string;
}

export default function ResponsiveAd({ className = '' }: ResponsiveAdProps) {
  return (
    <div className={`my-6 ${className}`}>
      <div className="text-xs text-gray-500 text-center mb-2">Advertisement</div>
      <AdSenseAd
        adSlot="6207379680"
        adFormat="auto"
        fullWidthResponsive={true}
        style={{ display: 'block' }}
        className="rounded-lg"
      />
    </div>
  );
}