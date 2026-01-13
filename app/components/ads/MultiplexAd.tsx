'use client';

import AdSenseAd from './AdSenseAd';

interface MultiplexAdProps {
  className?: string;
}

export default function MultiplexAd({ className = '' }: MultiplexAdProps) {
  return (
    <div className={`my-8 ${className}`}>
      <div className="text-xs text-gray-500 text-center mb-2">Recommended Content</div>
      <AdSenseAd
        adSlot="7458356992"
        adFormat="autorelaxed"
        style={{ display: 'block' }}
        className="rounded-lg"
      />
    </div>
  );
}