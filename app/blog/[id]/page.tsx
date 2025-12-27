import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles } from '@/lib/articles';
import { findRelatedVideos } from '@/lib/crossLinking';
import { processBlogContent } from '@/lib/contentProcessor';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { generateArticleSchema, generateMedicalWebPageSchema, generateBreadcrumbSchema } from '@/lib/schemas';
import PDFDownloadButton from '@/app/components/blog/PDFDownloadButton';
import ShareButtons from '@/app/components/blog/ShareButtons';
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

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <Link 
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← Back to Articles
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            {article.featured && (
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-4">
                ⭐ Featured Article
              </span>
            )}
            
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              {article.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-4">
              <Link href={`/author/${article.authorId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  RKR
                </div>
                <div>
                  <div className="font-bold text-lg">{article.author}</div>
                  <div className="text-sm text-white/80">{formatDate(article.publishedAt)}</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 sm:px-6 max-w-4xl py-8 md:py-12">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 lg:p-12">
            
            {/* PDF Download Section */}
            <div className="mb-8 p-5 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">📄 Download for Offline Study</h3>
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

            <div 
              className="ecg-article-content
                prose prose-base md:prose-lg lg:prose-xl max-w-none
                
                /* Headings */
                prose-headings:font-black prose-headings:text-slate-900 prose-headings:break-words prose-headings:leading-tight
                
                /* H2 Styling */
                prose-h2:text-2xl md:prose-h2:text-3xl lg:prose-h2:text-4xl 
                prose-h2:mt-12 md:prose-h2:mt-16 
                prose-h2:mb-6 md:prose-h2:mb-8 
                prose-h2:pb-4 md:prose-h2:pb-5
                prose-h2:border-b-4 prose-h2:border-blue-300
                prose-h2:bg-gradient-to-r prose-h2:from-blue-50 prose-h2:to-transparent
                prose-h2:px-4 prose-h2:py-3
                prose-h2:rounded-lg
                
                /* H3 Styling */
                prose-h3:text-xl md:prose-h3:text-2xl lg:prose-h3:text-3xl
                prose-h3:mt-8 md:prose-h3:mt-10 
                prose-h3:mb-4 md:prose-h3:mb-6
                prose-h3:text-blue-900
                prose-h3:border-l-4 prose-h3:border-blue-500
                prose-h3:pl-4
                
                /* H4 Styling */
                prose-h4:text-lg md:prose-h4:text-xl lg:prose-h4:text-2xl
                prose-h4:mt-6 md:prose-h4:mt-8
                prose-h4:mb-3 md:prose-h4:mb-4
                prose-h4:text-slate-800
                prose-h4:font-bold
                
                /* Paragraphs */
                prose-p:text-slate-700 prose-p:leading-relaxed 
                prose-p:text-base md:prose-p:text-lg lg:prose-p:text-xl
                prose-p:mb-4 md:prose-p:mb-6
                prose-p:break-words
                
                /* Links */
                prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-a:break-words
                
                /* Strong/Bold */
                prose-strong:text-slate-900 prose-strong:font-bold
                
                /* Lists */
                prose-ul:my-6 md:prose-ul:my-8 prose-ul:pl-6 md:prose-ul:pl-8 prose-ul:space-y-2
                prose-ol:my-6 md:prose-ol:my-8 prose-ol:pl-6 md:prose-ol:pl-8 prose-ol:space-y-2
                prose-li:text-slate-700 prose-li:leading-relaxed prose-li:text-base md:prose-li:text-lg prose-li:break-words
                prose-li:my-2
                [&_ul]:list-disc [&_ul]:marker:text-blue-600
                [&_ol]:list-decimal [&_ol]:marker:text-blue-600 [&_ol]:marker:font-bold
                [&_li_strong]:text-slate-900 [&_li_strong]:font-bold
                
                /* Images */
                prose-img:rounded-xl md:prose-img:rounded-2xl 
                prose-img:shadow-lg md:prose-img:shadow-2xl 
                prose-img:my-8 md:prose-img:my-10 
                prose-img:w-full
                prose-img:border-2 prose-img:border-slate-200
                
                /* Code */
                prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded 
                prose-code:text-sm prose-code:break-words prose-code:text-red-600 prose-code:font-mono
                prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:p-4 md:prose-pre:p-6
                prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:my-6
                
                /* Blockquotes */
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
                prose-blockquote:pl-6 prose-blockquote:italic 
                prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
                prose-blockquote:my-6
                
                /* Tables */
                prose-table:w-full prose-table:overflow-x-auto prose-table:block md:prose-table:table
                prose-table:my-8 prose-table:border-2 prose-table:border-slate-200 prose-table:rounded-lg
                
                /* Horizontal Rules */
                prose-hr:border-slate-300 prose-hr:my-12
                
                [&>*]:break-words
                [&_*]:scroll-mt-24"
              dangerouslySetInnerHTML={{ __html: article.htmlContent || '' }}
            />

            {/* Share & Download Section */}
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
              <h3 className="font-black text-slate-900 mb-4 text-lg">📤 Share & Save This Article</h3>
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

          {/* Related Videos */}
          {relatedVideos.length > 0 && (
            <div className="mt-12">
              <RelatedVideos videos={relatedVideos} />
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-8">
              <RelatedArticles articles={relatedArticles} />
            </div>
          )}
        </article>
      </div>
    </>
  );
}
