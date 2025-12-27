import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { getAllVideos } from '@/lib/videos';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ecgkid.com';

  // Static pages with their priorities
  const staticPages = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
    { url: '/videos', priority: 0.9, changeFrequency: 'daily' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/privacy', priority: 0.5, changeFrequency: 'yearly' as const },
    { url: '/terms', priority: 0.5, changeFrequency: 'yearly' as const },
    { url: '/tutorials', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/practice-tests', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/study-groups', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/expert-review', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/author/raj-k-reddy', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/tools', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/learn-ecg', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/forum', priority: 0.7, changeFrequency: 'daily' as const },
    { url: '/community', priority: 0.7, changeFrequency: 'weekly' as const },
  ];

  const staticRoutes = staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  try {
    // Get all blog posts from file system
    const articles = await getAllArticles();
    const blogRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Get all videos from file system
    const videos = getAllVideos();
    const videoRoutes: MetadataRoute.Sitemap = videos.map((video) => ({
      url: `${baseUrl}/watch/${video.slug}`,
      lastModified: new Date(video.updatedAt || video.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    console.log(`Sitemap generated: ${staticRoutes.length} static, ${blogRoutes.length} blog, ${videoRoutes.length} video routes`);
    
    return [...staticRoutes, ...blogRoutes, ...videoRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least static routes if data loading fails
    return staticRoutes;
  }
}
