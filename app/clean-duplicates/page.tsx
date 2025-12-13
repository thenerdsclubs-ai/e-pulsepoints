'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CleanDuplicatesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [duplicates, setDuplicates] = useState<any[]>([]);
  const [cleaning, setCleaning] = useState(false);
  const [progress, setProgress] = useState('');
  const router = useRouter();

  const adminEmails = ['ecgkidportal@gmail.com', 'admin@ecgkid.com', 'rajka@ecgkid.com'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && adminEmails.includes(currentUser.email || '')) {
        findDuplicates();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const findDuplicates = async () => {
    try {
      setLoading(true);
      const blogRef = collection(db, 'blog');
      const querySnapshot = await getDocs(blogRef);
      
      const titleMap: any = {};
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const title = data.title || 'Untitled';
        
        if (titleMap[title]) {
          titleMap[title].push({ id: doc.id, ...data });
        } else {
          titleMap[title] = [{ id: doc.id, ...data }];
        }
      });
      
      // Find titles with duplicates
      const dupsArray: any[] = [];
      Object.entries(titleMap).forEach(([title, articles]: [string, any]) => {
        if (articles.length > 1) {
          dupsArray.push({ title, articles });
        }
      });
      
      setDuplicates(dupsArray);
    } catch (error) {
      console.error('Error finding duplicates:', error);
    } finally {
      setLoading(false);
    }
  };

  const cleanDuplicates = async () => {
    if (!confirm(`This will delete ${duplicates.reduce((sum, dup) => sum + (dup.articles.length - 1), 0)} duplicate articles, keeping only the oldest copy of each. Continue?`)) {
      return;
    }

    try {
      setCleaning(true);
      let deletedCount = 0;
      
      for (const dup of duplicates) {
        setProgress(`Processing: ${dup.title}`);
        
        // Sort by publishedAt, keep the first (oldest)
        const sorted = [...dup.articles].sort((a, b) => {
          const aTime = a.publishedAt?.seconds || 0;
          const bTime = b.publishedAt?.seconds || 0;
          return aTime - bTime;
        });
        
        // Delete all except the first
        for (let i = 1; i < sorted.length; i++) {
          await deleteDoc(doc(db, 'blog', sorted[i].id));
          deletedCount++;
          setProgress(`Deleted ${deletedCount} duplicates...`);
          await new Promise(resolve => setTimeout(resolve, 300)); // Rate limit
        }
      }
      
      setProgress(`✅ Cleanup complete! Deleted ${deletedCount} duplicate articles.`);
      
      // Refresh the list
      setTimeout(() => {
        findDuplicates();
        setCleaning(false);
        setProgress('');
      }, 2000);
      
    } catch (error) {
      console.error('Error cleaning duplicates:', error);
      setProgress('❌ Error occurred during cleanup');
      setCleaning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Scanning for duplicates...</p>
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
            You need to be logged in as an admin to clean duplicates.
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
            Only admin accounts can clean duplicates.
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
                🗑️ Clean Duplicate Articles
              </h1>
              <p className="text-slate-600">
                Remove duplicate blog articles while keeping the oldest copy of each
              </p>
            </div>
            <Link
              href="/blog-stats"
              className="px-6 py-3 bg-slate-600 text-white rounded-xl font-bold hover:bg-slate-700 transition-all"
            >
              ← Back to Stats
            </Link>
          </div>

          {duplicates.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">No Duplicates Found!</h2>
              <p className="text-slate-600 mb-6">All blog articles are unique.</p>
              <Link
                href="/blog-stats"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                View Blog Stats
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">⚠️</div>
                  <div>
                    <h3 className="text-xl font-black text-orange-900">
                      {duplicates.length} Articles Have Duplicates
                    </h3>
                    <p className="text-orange-700">
                      Total duplicates to remove: {duplicates.reduce((sum, dup) => sum + (dup.articles.length - 1), 0)}
                    </p>
                  </div>
                </div>
              </div>

              {progress && (
                <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-300 rounded-xl text-center">
                  <p className="text-blue-900 font-bold">{progress}</p>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-2xl font-black text-slate-900 mb-4">Duplicate Articles</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {duplicates.map((dup, index) => (
                    <div key={index} className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-slate-900 flex-1">{dup.title}</h3>
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {dup.articles.length} copies
                        </span>
                      </div>
                      <div className="space-y-2">
                        {dup.articles.map((article: any, idx: number) => (
                          <div key={article.id} className="flex items-center gap-3 text-sm bg-white rounded-lg p-2 border border-slate-200">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${idx === 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {idx === 0 ? '✓ Keep' : '✗ Delete'}
                            </span>
                            <span className="text-slate-600">ID: {article.id}</span>
                            <span className="text-slate-400">
                              {article.publishedAt?.seconds 
                                ? new Date(article.publishedAt.seconds * 1000).toLocaleDateString()
                                : 'No date'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={cleanDuplicates}
                  disabled={cleaning}
                  className={`flex-1 px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
                    cleaning 
                      ? 'bg-slate-400 cursor-not-allowed' 
                      : 'bg-red-600 hover:bg-red-700 hover:shadow-xl'
                  }`}
                >
                  {cleaning ? '🔄 Cleaning...' : '🗑️ Clean All Duplicates'}
                </button>
                <button
                  onClick={() => router.push('/blog-stats')}
                  className="px-8 py-4 rounded-xl font-bold text-slate-700 bg-slate-200 hover:bg-slate-300 shadow-lg hover:shadow-xl transition-all"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <h3 className="font-bold text-blue-900 mb-2">ℹ️ How It Works</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Keeps the <strong>oldest copy</strong> of each article (by published date)</li>
                  <li>• Deletes all newer duplicates</li>
                  <li>• Cannot be undone - make sure you have a backup!</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
