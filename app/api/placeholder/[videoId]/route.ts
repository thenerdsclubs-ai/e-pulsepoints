import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  const { videoId } = await params;
  
  // Generate a simple placeholder image
  const svg = `
    <svg width="320" height="180" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="180" fill="#f3f4f6"/>
      <rect x="10" y="10" width="300" height="160" fill="#e5e7eb" rx="8"/>
      <circle cx="160" cy="90" r="30" fill="#9ca3af"/>
      <polygon points="150,75 150,105 175,90" fill="#6b7280"/>
      <text x="160" y="130" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#6b7280">Video Unavailable</text>
      <text x="160" y="145" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#9ca3af">ID: ${videoId.substring(0, 8)}</text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}