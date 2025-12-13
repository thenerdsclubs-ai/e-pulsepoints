'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BlogStatsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const router = useRouter();

  const adminEmails = ['ecgkidportal@gmail.com', 'admin@ecgkid.com', 'rajka@ecgkid.com'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && adminEmails.includes(currentUser.email || '')) {
        fetchStats();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const blogRef = collection(db, 'blog');
      const querySnapshot = await getDocs(blogRef);
      
      const articles: any[] = [];
      const categories: any = {};
      const tags: any = {};
      const authors: any = {};
      const titleCount: any = {};
      const duplicates: any[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        articles.push({ id: doc.id, ...data });
        
        // Count by category
        const category = data.category || 'uncategorized';
        categories[category] = (categories[category] || 0) + 1;
        
        // Count by tags
        if (data.tags && Array.isArray(data.tags)) {
          data.tags.forEach((tag: string) => {
            tags[tag] = (tags[tag] || 0) + 1;
          });
        }
        
        // Count by author
        const authorName = typeof data.author === 'object' ? data.author.name : data.author;
        authors[authorName] = (authors[authorName] || 0) + 1;
        
        // Detect duplicates by title
        const title = data.title || 'Untitled';
        if (titleCount[title]) {
          titleCount[title].count++;
          titleCount[title].ids.push(doc.id);
        } else {
          titleCount[title] = { count: 1, ids: [doc.id] };
        }
      });
      
      // Find duplicates
      Object.entries(titleCount).forEach(([title, data]: [string, any]) => {
        if (data.count > 1) {
          duplicates.push({ title, count: data.count, ids: data.ids });
        }
      });

      setStats({
        totalArticles: articles.length,
        categories,
        tags,
        authors,
        articles,
        duplicates,
        uniqueArticles: Object.keys(titleCount).length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading stats...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-black text-slate-900 mb-4">
            Authentication Required
          </h1>
          <p className="text-slate-600 mb-6">
            You need to be logged in as an admin to view blog statistics.
          </p>
          <button
            onClick={() => router.push('/admin')}
            className="w-full px-8 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  if (!adminEmails.includes(user.email || '')) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">⛔</div>
          <h1 className="text-2xl font-black text-slate-900 mb-4">
            Access Denied
          </h1>
          <p className="text-slate-600 mb-2">
            Only admin accounts can view blog statistics.
          </p>
          <p className="text-sm text-slate-500 mb-6">
            Logged in as: {user.email}
          </p>
          <button
            onClick={() => router.push('/')}
            className="w-full px-8 py-4 rounded-xl font-bold text-white bg-slate-600 hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-2">
                📊 Blog Statistics Dashboard
              </h1>
              <p className="text-slate-600">
                Overview of all blog articles and their organization
              </p>
            </div>
            <Link
              href="/upload-articles"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              Upload Articles
            </Link>
          </div>

          {/* Total Count */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6">
              <div className="text-4xl font-black mb-2">{stats?.totalArticles || 0}</div>
              <div className="text-blue-100">Total Articles</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6">
              <div className="text-4xl font-black mb-2">{stats?.uniqueArticles || 0}</div>
              <div className="text-green-100">Unique Articles</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6">
              <div className="text-4xl font-black mb-2">{Object.keys(stats?.categories || {}).length}</div>
              <div className="text-purple-100">Categories</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl p-6">
              <div className="text-4xl font-black mb-2">{Object.keys(stats?.tags || {}).length}</div>
              <div className="text-pink-100">Unique Tags</div>
            </div>
          </div>

          {/* Duplicates Warning */}
          {stats?.duplicates && stats.duplicates.length > 0 && (
            <div className="mb-8 p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">⚠️</div>
                <div>
                  <h3 className="text-xl font-black text-orange-900">Duplicate Articles Detected</h3>
                  <p className="text-orange-700">Found {stats.duplicates.length} articles with multiple copies (Total: {stats.totalArticles}, Unique: {stats.uniqueArticles})</p>
                </div>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {stats.duplicates.map((dup: any, index: number) => (
                  <div key={index} className="bg-white rounded-lg p-3 border-2 border-orange-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex-1">{dup.title}</span>
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold ml-2">
                        {dup.count} copies
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">IDs: {dup.ids.join(', ')}</div>
                  </div>
                ))}
              </div>
              <Link
                href="/clean-duplicates"
                className="mt-4 block text-center px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all"
              >
                🗑️ Clean Up Duplicates
              </Link>
            </div>
          )}

          {/* Categories Breakdown */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-4">📁 Articles by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(stats?.categories || {}).map(([category, count]) => (
                <div key={category} className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 capitalize">{category}</span>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {count as number}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Authors Breakdown */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-4">✍️ Articles by Author</h2>
            <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
              {Object.entries(stats?.authors || {}).map(([author, count]) => (
                <div key={author} className="flex items-center justify-between py-3 border-b border-slate-200 last:border-0">
                  <span className="font-bold text-slate-900">{author}</span>
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    {count as number} articles
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Tags */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-4">🏷️ Top Tags</h2>
            <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
              <div className="flex flex-wrap gap-2">
                {Object.entries(stats?.tags || {})
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .slice(0, 30)
                  .map(([tag, count]) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-white border-2 border-blue-200 rounded-full text-sm font-semibold text-slate-700"
                    >
                      #{tag} ({count})
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* All Articles List */}
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">📝 All Articles</h2>
            <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {stats?.articles?.map((article: any, index: number) => (
                  <div key={article.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold min-w-[3rem] text-center">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Link href={`/blog/${article.id}`} className="font-bold text-slate-900 hover:text-blue-600 block">
                        {article.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                        <span className="capitalize bg-slate-100 px-2 py-0.5 rounded">{article.category}</span>
                        <span>•</span>
                        <span>{typeof article.author === 'object' ? article.author.name : article.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border-2 border-green-200">
            <h3 className="text-lg font-black text-slate-900 mb-3">💡 Recommendations</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Expected: <strong>39 articles total</strong> (17 from clean_rhythm_ecg + 22 from best_ecg_images)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>All articles should be by <strong>Dr. Raj K</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Categories should be: <strong>clinical, education, technology</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
