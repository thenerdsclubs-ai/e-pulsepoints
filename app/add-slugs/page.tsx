'use client';

import { useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddSlugsPage() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const adminEmails = ['ecgkidportal@gmail.com', 'admin@ecgkid.com', 'rajka@ecgkid.com'];

  useState(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  });

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[-\s]+/g, '-')
      .trim()
      .substring(0, 100);
  };

  const addSlugsToFirestore = async () => {
    if (!confirm('This will add slug fields to all blog posts in Firestore. Continue?')) {
      return;
    }

    try {
      setLoading(true);
      setProgress('Fetching all blog posts...');

      const blogRef = collection(db, 'blog');
      const querySnapshot = await getDocs(blogRef);
      
      let updatedCount = 0;
      let skippedCount = 0;

      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        
        if (!data.slug) {
          const slug = createSlug(data.title || 'untitled');
          await updateDoc(doc(db, 'blog', docSnap.id), { slug });
          updatedCount++;
          setProgress(`Updated ${updatedCount} posts...`);
          await new Promise(resolve => setTimeout(resolve, 300)); // Rate limit
        } else {
          skippedCount++;
        }
      }

      setProgress(`✅ Complete! Updated ${updatedCount} posts, skipped ${skippedCount} (already had slugs)`);
    } catch (error) {
      console.error('Error adding slugs:', error);
      setProgress('❌ Error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-black text-slate-900 mb-4">Authentication Required</h1>
          <button
            onClick={() => router.push('/admin')}
            className="w-full px-8 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700"
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
          <h1 className="text-2xl font-black text-slate-900 mb-4">Access Denied</h1>
          <p className="text-sm text-slate-500 mb-6">Logged in as: {user.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-2">🔗 Add Slugs to Blog Posts</h1>
              <p className="text-slate-600">Add SEO-friendly URL slugs to all blog articles</p>
            </div>
            <Link
              href="/blog-stats"
              className="px-6 py-3 bg-slate-600 text-white rounded-xl font-bold hover:bg-slate-700"
            >
              ← Back
            </Link>
          </div>

          {progress && (
            <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-300 rounded-xl text-center">
              <p className="text-blue-900 font-bold">{progress}</p>
            </div>
          )}

          <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3">ℹ️ What This Does</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Converts article titles to URL-friendly slugs</li>
              <li>• Example: "Atrial Fibrillation: ECG..." → "atrial-fibrillation-ecg..."</li>
              <li>• URLs will change from /blog/abc123 to /blog/atrial-fibrillation-ecg...</li>
              <li>• Skips articles that already have slugs</li>
              <li>• Makes URLs better for SEO and user-friendly</li>
            </ul>
          </div>

          <button
            onClick={addSlugsToFirestore}
            disabled={loading}
            className={`w-full px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
              loading
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl'
            }`}
          >
            {loading ? '🔄 Adding Slugs...' : '🔗 Add Slugs to All Posts'}
          </button>
        </div>
      </div>
    </div>
  );
}
