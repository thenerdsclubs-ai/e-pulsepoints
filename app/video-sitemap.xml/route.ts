import { getAllVideos } from '@/lib/videos';

/**
 * Convert seconds to ISO 8601 duration format (PT#H#M#S)
 */
function secondsToISO8601Duration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  let duration = 'PT';
  if (hours > 0) duration += `${hours}H`;
  if (minutes > 0) duration += `${minutes}M`;
  if (secs > 0 || duration === 'PT') duration += `${secs}S`;

  return duration;
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
    // Convert duration to ISO 8601 format
    const duration = video.durationSeconds 
      ? secondsToISO8601Duration(video.durationSeconds)
      : secondsToISO8601Duration(180); // Default 3 minutes if not available

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
      <video:duration>${duration}</video:duration>
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