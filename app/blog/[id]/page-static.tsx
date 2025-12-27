import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles } from '@/lib/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { generateArticleSchema } from '@/lib/schemas';

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({
    id: slug,
  }));
}

export const dynamicParams = false; // Only pre-render known articles

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticleBySlug(params.id);
  
  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.slug, 3);

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
  }, 'BlogPosting');

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
        <article className="container mx-auto px-6 max-w-4xl py-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div 
              className="ecg-article-content
                prose prose-lg max-w-none
                prose-headings:font-black prose-headings:text-slate-900
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b-2 prose-h2:border-blue-200 prose-h2:pb-4
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-blue-900
                prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-lg
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-900 prose-strong:font-bold
                prose-ul:my-6 prose-li:my-2 prose-li:text-slate-700
                prose-ol:my-6 prose-ol:text-slate-700
                prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-8
                prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded"
              dangerouslySetInnerHTML={{ __html: article.htmlContent || '' }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t-2 border-slate-200">
              <h3 className="font-black text-slate-900 mb-4 text-xl">📑 Article Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold hover:from-blue-200 hover:to-purple-200 transition-all cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Info */}
            <div className="mt-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border-2 border-slate-200">
              <div className="flex items-start gap-4">
                <Link href={`/author/${article.authorId}`} className="flex-shrink-0 hover:opacity-80 transition-opacity">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                    RKR
                  </div>
                </Link>
                <div>
                  <Link href={`/author/${article.authorId}`} className="hover:text-blue-600 transition-colors">
                    <h3 className="font-black text-slate-900 text-xl mb-1">{article.author}</h3>
                  </Link>
                  <p className="text-blue-600 font-semibold mb-3">Board-Certified Emergency Medicine Physician</p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Expert in acute cardiac care and ECG interpretation with extensive emergency medicine experience.
                  </p>
                  <Link
                    href={`/author/${article.authorId}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                  >
                    View Full Profile & More Articles →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all group"
                  >
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </>
  );
}
