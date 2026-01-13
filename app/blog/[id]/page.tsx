import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles } from '@/lib/articles';
import { findRelatedVideos } from '@/lib/crossLinking';
import { processBlogContent } from '@/lib/contentProcessor';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { generateArticleSchema, generateMedicalWebPageSchema, generateBreadcrumbSchema } from '@/lib/schemas';
import PDFDownloadButton from '@/app/components/blog/PDFDownloadButton';
import ShareButtons from '@/app/components/blog/ShareButtons';
import TableOfContents from '@/app/components/blog/TableOfContents';
import ReadingProgress from '@/app/components/blog/ReadingProgress';
import AppCTA from '@/app/components/blog/AppCTA';
import ResponsiveAd from '@/app/components/ads/ResponsiveAd';
import ArticleAd from '@/app/components/ads/ArticleAd';
import MultiplexAd from '@/app/components/ads/MultiplexAd';
import ContentWithAds from '@/app/components/blog/ContentWithAds';
import { RelatedVideos, RelatedArticles } from '@/app/components/content/RelatedContent';

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({
    id: slug,
  }));
}

export const dynamicParams = false; // Only pre-render known articles

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticleBySlug(id);
  
  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.slug, 3);
  const relatedVideos = findRelatedVideos(article, 4);

  // Process blog content with all enhancements
  const contentWithLinks = article.htmlContent 
    ? processBlogContent(article.content, article.htmlContent, process.env.NODE_ENV === 'development')
    : processBlogContent(article.content, undefined, false);

  // Generate Article Schema
  const articleSchema = generateArticleSchema({
    headline: article.title,
    description: article.excerpt,
    url: `https://ecgkid.com/blog/${article.slug}`,
    datePublished: new Date(article.publishedAt).toISOString(),
    dateModified: new Date(article.updatedAt).toISOString(),
    author: {
      name: article.author,
      url: `https://ecgkid.com/author/${article.authorId}`,
    },
    image: {
      url: article.imageUrl.startsWith('http') ? article.imageUrl : `https://ecgkid.com${article.imageUrl}`,
      width: 1200,
      height: 630,
      alt: article.title,
    },
    keywords: article.tags,
  }, 'MedicalWebPage');

  // Generate Medical Web Page Schema for health content
  const medicalSchema = generateMedicalWebPageSchema({
    name: article.title,
    description: article.excerpt,
    url: `https://ecgkid.com/blog/${article.slug}`,
    datePublished: new Date(article.publishedAt).toISOString(),
    dateModified: new Date(article.updatedAt).toISOString(),
    author: {
      name: article.author,
      url: `https://ecgkid.com/author/${article.authorId}`,
    },
    image: {
      url: article.imageUrl.startsWith('http') ? article.imageUrl : `https://ecgkid.com${article.imageUrl}`,
      width: 1200,
      height: 630,
      alt: article.title,
    },
    medicalAudience: 'Practitioner',
    specialty: 'Cardiology',
  });

  // Generate Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://ecgkid.com' },
    { name: 'Blog', url: 'https://ecgkid.com/blog' },
    { name: article.title, url: `https://ecgkid.com/blog/${article.slug}` },
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <>
      {/* Reading Progress Indicator */}
      <ReadingProgress />
      
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      {/* Medical Web Page Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalSchema) }}
      />
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <Link 
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              ← Back to Articles
            </Link>
          </div>
        </header>

        {/* Article Header - Enhanced PDF-like hero */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-12 md:py-20 relative overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            {article.featured && (
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-6">
                ⭐ Featured Article
              </span>
            )}
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-4xl">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link href={`/author/${article.authorId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  RKR
                </div>
                <div>
                  <div className="font-bold text-lg">Dr. {article.author}</div>
                  <div className="text-sm text-white/80">{formatDate(article.publishedAt)}</div>
                </div>
              </Link>
              
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span>📚</span>
                <span>Medical Education</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - PDF-like layout */}
        <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            
            {/* Sidebar - Table of Contents */}
            <aside className="hidden lg:block lg:w-80 flex-shrink-0">
              <TableOfContents content={article.htmlContent || ''} />
              
              {/* Responsive Ad in Sidebar */}
              <ResponsiveAd className="mt-8" />
            </aside>

            {/* Main Article Content */}
            <article className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                
                {/* Content Container - Optimized for reading */}
                <div className="p-6 md:p-10 lg:p-14 xl:p-16">
                  
                  {/* PDF Download Section */}
                  <div className="mb-12 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border-2 border-red-200 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                          📄 Download for Offline Study
                        </h3>
                        <p className="text-sm text-gray-600">Save this article as PDF for reference and study</p>
                      </div>
                      <PDFDownloadButton 
                        post={{
                          id: article.slug,
                          title: article.title,
                          content: article.content,
                          author: article.author,
                          publishedAt: article.publishedAt,
                          tags: article.tags,
                          category: article.tags[0] || 'ECG',
                          excerpt: article.excerpt,
                          imageUrl: article.imageUrl,
                          featured: article.featured
                        }}
                        variant="primary"
                        size="md"
                      />
                    </div>
                  </div>

                  {/* Article Content with Enhanced Typography and Ads */}
                  <ContentWithAds htmlContent={article.htmlContent || ''} />

                  {/* Share & Download Section */}
                  <div className="mt-16 pt-10 border-t-2 border-slate-200">
                    <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 shadow-sm">
                      <h3 className="font-black text-slate-900 mb-6 text-xl flex items-center gap-2">
                        📤 Share & Save This Article
                      </h3>
                      <ShareButtons 
                        post={{
                          id: article.slug,
                          title: article.title,
                          content: article.content,
                          author: article.author,
                          publishedAt: article.publishedAt,
                          tags: article.tags,
                          category: article.tags[0] || 'ECG',
                          excerpt: article.excerpt,
                          imageUrl: article.imageUrl,
                          featured: article.featured
                        }}
                        articleUrl={`https://ecgkid.com/blog/${article.slug}`}
                      />
                    </div>
                  </div>

                  {/* App Download CTA */}
                  <AppCTA />

                </div>
              </div>

              {/* Multiplex Ad before Related Content */}
              <MultiplexAd className="mt-12" />

              {/* Related Content Section */}
              <div className="mt-12 space-y-8">
                {/* Related Videos */}
                {relatedVideos.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                    <RelatedVideos videos={relatedVideos} />
                  </div>
                )}

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                    <RelatedArticles articles={relatedArticles} />
                  </div>
                )}
              </div>
            </article>

            {/* Mobile Table of Contents */}
            <div className="lg:hidden">
              <TableOfContents content={article.htmlContent || ''} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}