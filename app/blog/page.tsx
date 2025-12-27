import { getPaginatedArticles } from '@/lib/articles';
import { generateItemListSchema, generateBreadcrumbSchema } from '@/lib/schemas';
import Link from 'next/link';
import Image from 'next/image';
import Section from '../components/ui/Section';
import Pagination from '@/app/components/ui/Pagination';

export const revalidate = 3600; // Revalidate every hour

interface SearchParams {
  [key: string]: string | string[] | undefined;
  page?: string;
  search?: string;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const search = params.search;

  const { articles, totalArticles, totalPages, currentPage } = await getPaginatedArticles(
    page,
    12,
    search
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getValidImageUrl = (imageUrl: string | undefined): string | null => {
    if (!imageUrl) {
      return null;
    }
    
    // Check if it's already a valid URL
    try {
      new URL(imageUrl);
      return imageUrl;
    } catch {
      // It's a relative path
    }
    
    // Check if it starts with a slash
    if (!imageUrl.startsWith('/')) {
      return '/' + imageUrl;
    }
    return imageUrl;
  };

  // Generate ItemList Schema for blog listing
  const itemListSchema = generateItemListSchema({
    name: search ? `Blog Articles - Search Results for "${search}"` : `ECG Learning Articles - Page ${currentPage}`,
    description: 'Expert insights and comprehensive guides on ECG interpretation by medical professionals',
    url: search 
      ? `https://ecgkid.com/blog?search=${encodeURIComponent(search)}&page=${currentPage}`
      : `https://ecgkid.com/blog?page=${currentPage}`,
    items: articles.map((article: any) => ({
      name: article.title,
      url: `https://ecgkid.com/blog/${article.slug}`,
      image: article.imageUrl.startsWith('http') ? article.imageUrl : `https://ecgkid.com${article.imageUrl}`,
      description: article.excerpt,
    })),
  });

  // Generate Breadcrumb Schema
  const breadcrumbItems = [
    { name: 'Home', url: 'https://ecgkid.com' },
    { name: 'Blog', url: 'https://ecgkid.com/blog' },
  ];
  
  if (search) {
    breadcrumbItems.push({ name: `Search: ${search}`, url: `https://ecgkid.com/blog?search=${encodeURIComponent(search)}` });
  }
  
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Hero Section */}
      <Section backgroundVariant="gradient" padding="xl">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 break-words">
            ECG Learning <span className="text-gradient">Articles</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-8 break-words">
            Expert insights and comprehensive guides on ECG interpretation by Dr. Raj K Reddy
          </p>
          <div className="flex items-center justify-center gap-2 md:gap-4 text-gray-600 text-sm md:text-base flex-wrap">
            <span className="font-semibold">{totalArticles} Articles</span>
            <span>•</span>
            <span>Evidence-Based</span>
            <span>•</span>
            <span>Free Access</span>
          </div>
        </div>
      </Section>

      {/* Search Section */}
      <Section padding="lg">
        <div className="max-w-4xl mx-auto px-4">
          <form method="GET" className="flex gap-2 mb-6">
            <input
              type="text"
              name="search"
              placeholder="Search articles..."
              defaultValue={search || ''}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button 
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Search
            </button>
          </form>
          
          {/* Results Info */}
          <div className="flex justify-between items-center text-gray-600">
            <p>
              Showing {((currentPage - 1) * 12) + 1}-{Math.min(currentPage * 12, totalArticles)} of {totalArticles} articles
            </p>
            {search && (
              <p>
                Search results for "{search}"
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* Articles Grid */}
      <Section padding="xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {articles.map((article) => {
                const imageUrl = getValidImageUrl(article.imageUrl);
                
                return (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="group"
                  >
                    <article className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      {/* Featured Image */}
                      <div className="aspect-video relative overflow-hidden">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                            <div className="text-red-400 text-4xl md:text-5xl">
                              📊
                            </div>
                          </div>
                        )}
                        
                        {/* Featured Badge */}
                        {article.featured && (
                          <div className="absolute top-3 md:top-4 left-3 md:left-4">
                            <span className="bg-red-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 md:p-6">
                        <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs md:text-sm text-red-600 bg-red-50 px-2 md:px-3 py-1 rounded-full font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 text-sm md:text-base line-clamp-3 mb-3 md:mb-4">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
                          <span>{formatDate(article.publishedAt)}</span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 md:w-4 h-3 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            Read More
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="mt-12">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
            searchParams={params}
          />
        </div>
      </Section>

      {/* CTA Section */}
      <Section backgroundVariant="gray" padding="xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Continue Your Learning Journey
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Download our mobile app for interactive ECG practice and comprehensive lessons.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.ecgkid.pulsepoints"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-colors text-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            Download App
          </a>
        </div>
      </Section>
    </div>
  );
}