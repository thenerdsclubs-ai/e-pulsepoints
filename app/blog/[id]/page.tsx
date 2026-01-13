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

                  {/* Article Content with Enhanced Typography */}
                  <div 
                    className="medical-article-content
                      prose prose-lg lg:prose-xl max-w-none
                      
                      /* Base Typography - PDF-like */
                      [&>*]:max-w-[75ch]
                      
                      /* Headings - Chapter-like */
                      prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
                      
                      /* H2 - Major Sections (like PDF chapters) */
                      prose-h2:text-2xl md:prose-h2:text-3xl lg:prose-h2:text-4xl 
                      prose-h2:mt-16 md:prose-h2:mt-20 lg:prose-h2:mt-24
                      prose-h2:mb-8 md:prose-h2:mb-10
                      prose-h2:pb-6
                      prose-h2:border-b-[3px] prose-h2:border-blue-400
                      prose-h2:relative
                      prose-h2:scroll-mt-24
                      after:prose-h2:content-[''] after:prose-h2:absolute after:prose-h2:left-0 after:prose-h2:bottom-0 
                      after:prose-h2:w-20 after:prose-h2:h-[3px] after:prose-h2:bg-blue-600
                      
                      /* H3 - Subsections */
                      prose-h3:text-xl md:prose-h3:text-2xl lg:prose-h3:text-3xl
                      prose-h3:mt-12 md:prose-h3:mt-14 lg:prose-h3:mt-16
                      prose-h3:mb-6 md:prose-h3:mb-7
                      prose-h3:text-blue-900
                      prose-h3:border-l-4 prose-h3:border-blue-500
                      prose-h3:pl-6
                      prose-h3:py-2
                      prose-h3:bg-gradient-to-r prose-h3:from-blue-50/50 prose-h3:to-transparent
                      prose-h3:scroll-mt-24
                      
                      /* H4 - Minor Sections */
                      prose-h4:text-lg md:prose-h4:text-xl lg:prose-h4:text-2xl
                      prose-h4:mt-8 md:prose-h4:mt-10
                      prose-h4:mb-4 md:prose-h4:mb-5
                      prose-h4:text-slate-800
                      prose-h4:font-bold
                      prose-h4:scroll-mt-24
                      
                      /* Paragraphs - Optimal line height for readability */
                      prose-p:text-slate-700 prose-p:leading-[1.8]
                      prose-p:text-base md:prose-p:text-lg lg:prose-p:text-xl
                      prose-p:mb-6 md:prose-p:mb-7
                      prose-p:max-w-[75ch]
                      
                      /* Links */
                      prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline 
                      hover:prose-a:underline prose-a:underline-offset-4
                      prose-a:transition-all
                      
                      /* Strong/Bold */
                      prose-strong:text-slate-900 prose-strong:font-bold
                      
                      /* Lists - Better spacing */
                      prose-ul:my-8 md:prose-ul:my-10 prose-ul:space-y-3
                      prose-ol:my-8 md:prose-ol:my-10 prose-ol:space-y-3
                      prose-li:text-slate-700 prose-li:leading-[1.8] 
                      prose-li:text-base md:prose-li:text-lg
                      prose-li:pl-2
                      [&_ul]:list-disc [&_ul]:marker:text-blue-600 [&_ul]:pl-6
                      [&_ol]:list-decimal [&_ol]:marker:text-blue-600 [&_ol]:marker:font-bold [&_ol]:pl-6
                      [&_li>ul]:mt-3 [&_li>ol]:mt-3
                      [&_li_strong]:text-slate-900 [&_li_strong]:font-bold
                      
                      /* Images - Enhanced presentation */
                      prose-img:rounded-2xl 
                      prose-img:shadow-2xl 
                      prose-img:my-10 md:prose-img:my-14
                      prose-img:border-2 prose-img:border-slate-200
                      prose-img:w-full
                      prose-img:transition-transform prose-img:duration-300
                      hover:prose-img:scale-[1.02]
                      
                      /* Code */
                      prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 
                      prose-code:rounded prose-code:text-sm 
                      prose-code:text-red-600 prose-code:font-mono
                      prose-code:before:content-[''] prose-code:after:content-['']
                      
                      prose-pre:bg-slate-900 prose-pre:text-slate-50 
                      prose-pre:p-6 md:prose-pre:p-8
                      prose-pre:rounded-2xl prose-pre:overflow-x-auto 
                      prose-pre:my-8 md:prose-pre:my-10
                      prose-pre:shadow-xl
                      
                      /* Blockquotes - Styled like callouts */
                      prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 
                      prose-blockquote:pl-8 prose-blockquote:pr-6
                      prose-blockquote:py-6
                      prose-blockquote:italic 
                      prose-blockquote:bg-gradient-to-r prose-blockquote:from-indigo-50 prose-blockquote:to-transparent
                      prose-blockquote:rounded-r-2xl
                      prose-blockquote:my-8 md:prose-blockquote:my-10
                      prose-blockquote:shadow-sm
                      prose-blockquote:text-slate-700
                      
                      /* Tables - Professional styling */
                      prose-table:w-full prose-table:my-10 md:prose-table:my-12
                      prose-table:border-2 prose-table:border-slate-300 
                      prose-table:rounded-xl prose-table:overflow-hidden
                      prose-table:shadow-lg
                      
                      prose-thead:bg-gradient-to-r prose-thead:from-blue-600 prose-thead:to-indigo-600
                      prose-thead:text-white
                      
                      prose-th:px-6 prose-th:py-4 prose-th:text-left prose-th:font-bold
                      prose-th:text-base md:prose-th:text-lg
                      
                      prose-td:px-6 prose-td:py-4 prose-td:border-t prose-td:border-slate-200
                      prose-td:text-slate-700
                      
                      prose-tbody:bg-white
                      [&_tbody_tr:nth-child(even)]:bg-slate-50
                      [&_tbody_tr]:transition-colors
                      hover:[&_tbody_tr]:bg-blue-50
                      
                      /* Horizontal Rules - Section dividers */
                      prose-hr:border-slate-300 prose-hr:my-16 md:prose-hr:my-20
                      prose-hr:border-t-2
                      
                      /* Ensure content doesn't overflow */
                      [&>*]:break-words
                      [&_*]:scroll-mt-24
                      
                      /* Better spacing for nested elements */
                      [&>*+*]:mt-6
                      [&_h2+*]:mt-8
                      [&_h3+*]:mt-6
                      [&_h4+*]:mt-4
                      "
                    dangerouslySetInnerHTML={{ __html: article.htmlContent || '' }}
                        />

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

                </div>
              </div>

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