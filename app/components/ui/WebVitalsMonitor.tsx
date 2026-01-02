'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';

interface WebVitalsMonitorProps {
  analyticsId?: string;
  debug?: boolean;
}

const WebVitalsMonitor: React.FC<WebVitalsMonitorProps> = ({ 
  analyticsId,
  debug = false 
}) => {
  useEffect(() => {
    const sendToAnalytics = (metric: Metric) => {
      if (debug) {
        console.log('Web Vital:', metric);
      }

      // Send to Google Analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag && analyticsId) {
        (window as any).gtag('event', metric.name, {
          custom_map: {
            metric_id: metric.id,
            metric_value: metric.value,
            metric_delta: metric.delta,
          },
          event_category: 'Web Vitals',
          event_label: metric.name,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }

      // Send to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`${metric.name}: ${metric.value}`);
      }
    };

    // Measure Core Web Vitals
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics); // Interaction to Next Paint (replaces FID)
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);

  }, [analyticsId, debug]);

  // Component doesn't render anything
  return null;
};

export default WebVitalsMonitor;