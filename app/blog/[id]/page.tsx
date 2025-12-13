'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, increment, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { generateArticleSchema } from '@/lib/schemas';

interface Article {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  publishedAt: any;
  views: number;
  featured: boolean;
  schema?: any;
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterCard: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;
  };
}

export default function BlogArticlePage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchArticle(params.id as string);
    }
  }, [params.id]);

  const fetchArticle = async (slugOrId: string) => {
    try {
      // First try to find by slug
      const blogRef = collection(db, 'blog');
      const q = query(blogRef, where('slug', '==', slugOrId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const data = { id: docSnap.id, ...docSnap.data() } as Article;
        setArticle(data);
        
        // Increment view count
        await updateDoc(doc(db, 'blog', docSnap.id), {
          views: increment(1)
        });
      } else {
        // Fallback to ID lookup
        const docRef = doc(db, 'blog', slugOrId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() } as Article;
          setArticle(data);
          
          // Increment view count
          await updateDoc(docRef, {
            views: increment(1)
          });
        } else {
          router.push('/blog');
        }
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Article not found</p>
        </div>
      </div>
    );
  }

  // Generate Article Schema
  const articleSchema = generateArticleSchema({
    headline: article.title,
    description: article.excerpt,
    url: `https://ecgkid.com/blog/${article.slug || article.id}`,
    datePublished: article.publishedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    dateModified: article.publishedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    author: {
      name: article.author.name,
      title: article.author.title,
      avatar: article.author.avatar,
    },
    image: {
      url: article.imageUrl.startsWith('http') ? article.imageUrl : `https://ecgkid.com${article.imageUrl}`,
      width: 1200,
      height: 630,
      alt: article.title,
    },
    keywords: article.tags,
    articleSection: article.category,
  }, 'BlogPosting');

  return (
    <>
      {/* Article Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Legacy schema support (if article has custom schema) */}
      {article.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(article.schema) }}
        />
      )}

      <div className="min-h-screen bg-slate-50">
        {/* SEO Meta Tags would go in head component */}
        
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <Link 
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold capitalize">
                {article.category}
              </span>
              <span className="text-white/80">•</span>
              <span className="text-white/80">{article.views} views</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              {article.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-4">
              <Image
                src={article.author.avatar}
                alt={`${article.author.name} - ${article.author.title} profile photo`}
                width={56}
                height={56}
                className="rounded-full border-4 border-white/20"
              />
              <div>
                <div className="font-bold text-lg">{article.author.name}</div>
                <div className="text-sm text-white/80">{article.author.title}</div>
              </div>
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
                prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
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

            {/* Share */}
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
              <h3 className="font-black text-slate-900 mb-4 text-lg">📤 Share this article</h3>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => {
                    const url = window.location.href;
                    const text = article.title;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  🐦 Share on Twitter
                </button>
                <button 
                  onClick={() => {
                    const url = window.location.href;
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                  }}
                  className="px-6 py-3 bg-blue-800 text-white rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl"
                >
                  📘 Share on Facebook
                </button>
                <button 
                  onClick={() => {
                    const url = window.location.href;
                    const text = article.title;
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                  }}
                  className="px-6 py-3 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl"
                >
                  💼 Share on LinkedIn
                </button>
              </div>
            </div>

            {/* Author Info */}
            <div className="mt-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border-2 border-slate-200">
              <div className="flex items-start gap-4">
                <Image
                  src={article.author.avatar}
                  alt={`${article.author.name}, ${article.author.title} - medical expert and article author headshot`}
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-white shadow-lg"
                />
                <div>
                  <h3 className="font-black text-slate-900 text-xl mb-1">{article.author.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{article.author.title}</p>
                  <p className="text-slate-600 leading-relaxed">
                    Board-certified Emergency Medicine physician with extensive experience in acute cardiac care and ECG interpretation. 
                    Passionate about medical education and bringing evidence-based emergency medicine knowledge to healthcare providers worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Resources Section */}
        <div className="container mx-auto px-6 max-w-6xl pb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Continue Your Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* More Tutorials */}
            <Link
              href="/tutorials"
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all group"
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                More ECG Tutorials
              </h3>
              <p className="text-slate-600 mb-4">
                Explore comprehensive guides on arrhythmias, conduction blocks, and MI patterns.
              </p>
              <span className="text-purple-600 font-semibold">Browse Tutorials →</span>
            </Link>

            {/* Practice with App */}
            <Link
              href="/#app-section"
              className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all group"
            >
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                Practice with Our App
              </h3>
              <p className="text-slate-600 mb-4">
                Download the mobile app to test your ECG skills with real cases and instant feedback.
              </p>
              <span className="text-blue-600 font-semibold">Get the App →</span>
            </Link>

            {/* More Articles */}
            <Link
              href="/blog"
              className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 hover:shadow-xl transition-all group"
            >
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                Read More Articles
              </h3>
              <p className="text-slate-600 mb-4">
                Discover more case studies, expert tips, and clinical pearls from our blog.
              </p>
              <span className="text-orange-600 font-semibold">View All Posts →</span>
            </Link>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="container mx-auto px-6 max-w-4xl pb-16">
          <Link
            href="/blog"
            className="block text-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            ← Back to All Blog Articles
          </Link>
        </div>
      </div>
    </>
  );
}
