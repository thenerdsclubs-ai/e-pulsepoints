'use client';

import { useEffect } from 'react';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  style?: React.CSSProperties;
  className?: string;
  fullWidthResponsive?: boolean;
}

// Extend window type to include adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSenseAd({
  adSlot,
  adFormat = 'auto',
  adLayout,
  style = { display: 'block' },
  className = '',
  fullWidthResponsive = false
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client="ca-pub-8771007845211506"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      {...(adLayout && { 'data-ad-layout': adLayout })}
      {...(fullWidthResponsive && { 'data-full-width-responsive': 'true' })}
    />
  );
}