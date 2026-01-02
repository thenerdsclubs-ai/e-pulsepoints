'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  firstContentfulPaint: number | null;
  largestContentfulPaint: number | null;
  firstInputDelay: number | null;
  cumulativeLayoutShift: number | null;
  timeToFirstByte: number | null;
}

interface PerformanceMonitorProps {
  enabled?: boolean;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  enabled = true,
  onMetricsUpdate 
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    firstContentfulPaint: null,
    largestContentfulPaint: null,
    firstInputDelay: null,
    cumulativeLayoutShift: null,
    timeToFirstByte: null,
  });

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const updatedMetrics = { ...metrics };

        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              updatedMetrics.firstContentfulPaint = entry.startTime;
            }
            break;
          case 'largest-contentful-paint':
            updatedMetrics.largestContentfulPaint = entry.startTime;
            break;
          case 'first-input':
            updatedMetrics.firstInputDelay = (entry as any).processingStart - entry.startTime;
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              updatedMetrics.cumulativeLayoutShift = 
                (updatedMetrics.cumulativeLayoutShift || 0) + (entry as any).value;
            }
            break;
          case 'navigation':
            updatedMetrics.timeToFirstByte = (entry as any).responseStart;
            break;
        }

        setMetrics(updatedMetrics);
        onMetricsUpdate?.(updatedMetrics);
      }
    });

    // Register for different metric types
    try {
      observer.observe({ entryTypes: ['paint'] });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      observer.observe({ entryTypes: ['first-input'] });
      observer.observe({ entryTypes: ['layout-shift'] });
      observer.observe({ entryTypes: ['navigation'] });
    } catch (error) {
      console.warn('Performance monitoring not fully supported:', error);
    }

    return () => observer.disconnect();
  }, [enabled, metrics, onMetricsUpdate]);

  // Component doesn't render anything in production
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  // Show performance metrics in development
  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-2 rounded-lg text-xs z-50 max-w-xs">
      <div className="font-semibold mb-1">Performance Metrics</div>
      {Object.entries(metrics).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span className="truncate mr-2">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
          <span>{value ? `${Math.round(value)}ms` : 'N/A'}</span>
        </div>
      ))}
    </div>
  );
};

export default PerformanceMonitor;