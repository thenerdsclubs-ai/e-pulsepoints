/**
 * Critical CSS extraction and inlining utilities
 * Helps improve Core Web Vitals by reducing render-blocking CSS
 */

// Critical CSS for above-the-fold content
export const criticalCSS = `
  /* Reset and base styles */
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; font-family: Inter, sans-serif; line-height: 1.6; }
  
  /* Critical layout styles */
  .container-width { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
  
  /* Header and navigation critical styles */
  nav { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid #f3f4f6; }
  .nav-container { display: flex; align-items: center; justify-content: space-between; height: 4rem; }
  
  /* Hero section critical styles */
  .hero-section { min-height: 60vh; display: flex; align-items: center; background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%); }
  .hero-content { text-align: center; max-width: 48rem; margin: 0 auto; padding: 2rem 1rem; }
  .hero-title { font-size: 2.5rem; font-weight: 800; color: #1f2937; margin-bottom: 1rem; }
  .hero-subtitle { font-size: 1.25rem; color: #6b7280; margin-bottom: 2rem; }
  
  /* Button critical styles */
  .btn-primary { background: #dc2626; color: white; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; display: inline-block; transition: all 0.3s ease; }
  .btn-primary:hover { background: #b91c1c; transform: translateY(-2px); }
  
  /* Loading and skeleton styles */
  .loading-skeleton { background: #f3f4f6; animation: pulse 2s infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  
  /* Critical typography */
  h1, h2, h3 { margin: 0; line-height: 1.2; }
  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
  
  /* Critical responsive utilities */
  @media (max-width: 768px) {
    .hero-title { font-size: 2rem; }
    .hero-subtitle { font-size: 1.125rem; }
    .nav-container { padding: 0 1rem; }
  }
`;

/**
 * Extracts critical CSS for a specific page
 */
export function extractCriticalCSS(html: string): string {
  // Basic critical CSS extraction logic
  // In a real implementation, you might use tools like Penthouse, Critical, or Puppeteer
  
  const criticalSelectors = [
    'body', 'html', 'nav', '.container-width', '.hero-section',
    '.hero-content', '.hero-title', '.hero-subtitle', '.btn-primary',
    'h1', 'h2', 'h3', '.loading-skeleton'
  ];

  // Return base critical CSS for now
  return criticalCSS;
}

/**
 * Inline critical CSS in HTML head
 */
export function inlineCriticalCSS(html: string, css: string): string {
  const criticalStyleTag = `<style id="critical-css">${css}</style>`;
  
  // Insert before closing head tag
  return html.replace('</head>', `${criticalStyleTag}</head>`);
}

/**
 * Load non-critical CSS asynchronously
 */
export function loadNonCriticalCSS(href: string): void {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  
  document.head.appendChild(link);
}

/**
 * Preload critical fonts
 */
export function preloadCriticalFonts(): string {
  return `
    <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" as="style">
  `;
}

export default {
  criticalCSS,
  extractCriticalCSS,
  inlineCriticalCSS,
  loadNonCriticalCSS,
  preloadCriticalFonts,
};