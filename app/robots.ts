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
    ],
    sitemap: 'https://ecgkid.com/sitemap.xml',
  };
}
