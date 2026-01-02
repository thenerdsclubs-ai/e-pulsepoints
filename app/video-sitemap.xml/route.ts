import { getAllVideos } from '@/lib/videos';

/**
 * Get duration in seconds for Video Sitemap
 * Google Video Sitemap requires integer seconds (0-28800)
 * NOT ISO 8601 format
 */
function getDurationInSeconds(video: ReturnType<typeof getAllVideos>[0]): number {
  // Prefer durationSeconds if available
  if (video.durationSeconds && video.durationSeconds > 0) {
    return Math.floor(Math.min(video.durationSeconds, 28800)); // Max 8 hours
  }
  
  // Fallback to 3 minutes if not available
  return 180;
}

/**
 * Ensure date is in ISO 8601 format
 */
function toISO8601Date(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Fallback to current date if invalid
      return new Date().toISOString();
    }
    return date.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  try {
    const videos = getAllVideos();
    const baseUrl = 'https://ecgkid.com';

    // Build video sitemap XML
    const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videos
  .map((video) => {
    // Get duration in seconds (Google Video Sitemap requires integer seconds, NOT ISO 8601)
    const durationSeconds = getDurationInSeconds(video);

    // Ensure dates are in ISO 8601 format
    const publicationDate = toISO8601Date(video.publishedAt);
    const updateDate = video.updatedAt ? toISO8601Date(video.updatedAt) : publicationDate;

    // Clean and escape fields
    const title = escapeXml(video.title);
    const description = escapeXml(video.description.substring(0, 2048)); // Google limit
    const thumbnailUrl = escapeXml(video.thumbnailUrl);
    const contentUrl = escapeXml(video.youtubeUrl);
    const embedUrl = escapeXml(video.embedUrl);

    return `  <url>
    <loc>${baseUrl}/watch/${video.slug}</loc>
    <lastmod>${updateDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <video:video>
      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
      <video:title>${title}</video:title>
      <video:description>${description}</video:description>
      <video:content_loc>${contentUrl}</video:content_loc>
      <video:player_loc>${embedUrl}</video:player_loc>
      <video:duration>${durationSeconds}</video:duration>
      <video:publication_date>${publicationDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:uploader info="${baseUrl}/author/raj-k-reddy">Dr. Raj K. Reddy</video:uploader>
      <video:category>${escapeXml(video.category)}</video:category>
${video.tags && video.tags.length > 0 
  ? video.tags.slice(0, 32).map(tag => `      <video:tag>${escapeXml(tag)}</video:tag>`).join('\n')
  : `      <video:tag>${escapeXml(video.category)}</video:tag>`
}
    </video:video>
  </url>`;
  })
  .join('\n')}
</urlset>`;

    return new Response(videoSitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating video sitemap:', error);
    return new Response('Error generating video sitemap', { status: 500 });
  }
}