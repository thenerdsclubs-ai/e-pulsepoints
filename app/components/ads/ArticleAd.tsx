'use client';

import AdSenseAd from './AdSenseAd';

interface ArticleAdProps {
  className?: string;
}

export default function ArticleAd({ className = '' }: ArticleAdProps) {
  return (
    <div className={`my-8 ${className}`}>
      <div className="text-xs text-gray-500 text-center mb-2">Advertisement</div>
      <AdSenseAd
        adSlot="7697389477"
        adFormat="fluid"
        adLayout="in-article"
        style={{ display: 'block', textAlign: 'center' }}
        className="rounded-lg"
      />
    </div>
  );
}