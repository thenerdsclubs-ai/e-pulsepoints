import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/upload-articles',
          '/add-slugs',
          '/blog-stats',
          '/clean-duplicates',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/watch/', '/blog/', '/videos', '/tools/', '/tutorials/'],
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: [
      'https://ecgkid.com/sitemap.xml',
      'https://ecgkid.com/video-sitemap.xml',
    ],
  };
}
