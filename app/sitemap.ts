import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ecgkid.com';

  // Static pages with their priorities
  const staticPages = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/privacy', priority: 0.5, changeFrequency: 'yearly' as const },
    { url: '/terms', priority: 0.5, changeFrequency: 'yearly' as const },
    { url: '/tutorials', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/practice-tests', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/study-groups', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/expert-review', priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  const staticRoutes = staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Fetch blog posts from Firestore
  let blogRoutes: MetadataRoute.Sitemap = [];
  
  try {
    const blogRef = collection(db, 'blog');
    const blogSnapshot = await getDocs(blogRef);
    
    blogRoutes = blogSnapshot.docs.map((doc) => {
      const data = doc.data();
      const slug = data.slug || doc.id;
      
      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: data.updatedAt?.toDate() || data.publishedAt?.toDate() || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Return static routes even if blog fetch fails
  }

  return [...staticRoutes, ...blogRoutes];
}
