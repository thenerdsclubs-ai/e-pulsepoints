import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Legacy URL patterns that should return 410 (Gone)
 * These are old URLs that no longer exist and should not be indexed
 */
const LEGACY_PATTERNS = [
  /^\/video\//i,           // Old /video/:id pattern
  /^\/articles\//i,        // Old /articles/:id pattern (if not redirected)
  /^\/post\//i,            // Old /post/:id pattern
  /^\/watch\/\d+$/i,       // Numeric video IDs
  /^\/blog\/\d+$/i,        // Numeric blog IDs
];

/**
 * Check if a path matches any legacy pattern
 */
function isLegacyUrl(pathname: string): boolean {
  return LEGACY_PATTERNS.some((pattern) => pattern.test(pathname));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a legacy URL
  if (isLegacyUrl(pathname)) {
    // Return 410 Gone status
    return new NextResponse(
      `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>410 - Content No Longer Available</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 20px;
    }
    .container {
      max-width: 600px;
    }
    h1 {
      font-size: 72px;
      margin: 0 0 20px 0;
      font-weight: 700;
    }
    h2 {
      font-size: 28px;
      margin: 0 0 20px 0;
      font-weight: 500;
    }
    p {
      font-size: 18px;
      line-height: 1.6;
      margin: 0 0 30px 0;
      opacity: 0.9;
    }
    a {
      display: inline-block;
      padding: 12px 30px;
      background: white;
      color: #667eea;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: transform 0.2s;
      margin: 5px;
    }
    a:hover {
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>410</h1>
    <h2>Content No Longer Available</h2>
    <p>
      This page has been permanently removed and is no longer available.
      The content has been reorganized or deleted.
    </p>
    <div>
      <a href="/">Go Home</a>
      <a href="/videos">Browse Videos</a>
      <a href="/blog">Read Articles</a>
    </div>
  </div>
</body>
</html>
      `.trim(),
      {
        status: 410,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=31536000', // Cache 410 for 1 year
        },
      }
    );
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     * - API routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|xml|txt)$|api).*)',
  ],
};
