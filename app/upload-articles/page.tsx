'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function ArticleUploader() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('clean-rhythm');
  const router = useRouter();

  const adminEmails = ['ecgkidportal@gmail.com', 'admin@ecgkid.com', 'rajka@ecgkid.com'];

  const fileOptions = [
    { value: 'clean-rhythm', label: 'Clean Rhythm ECG (17 articles)', file: 'ecg-blog-articles-v2.json' },
    { value: 'best-images', label: 'Best ECG Images (22 articles)', file: 'ecg-blog-best-images.json' },
    { value: 'mi-articles', label: 'MI ECG Database (12 articles)', file: 'mi-ecg-articles.json' },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const uploadArticles = async () => {
    if (!user) {
      setProgress('❌ Error: You must be logged in as an admin to upload articles.');
      return;
    }

    if (!adminEmails.includes(user.email || '')) {
      setProgress('❌ Error: Only admin accounts can upload articles.');
      return;
    }

    setUploading(true);
    setProgress('Loading articles to upload...');
    setResults([]);

    try {
      // Import the selected JSON file
      const selectedOption = fileOptions.find(opt => opt.value === selectedFile);
      const response = await fetch(`/scripts/${selectedOption?.file}`);
      const articles = await response.json();

      setProgress(`Found ${articles.length} articles from ${selectedOption?.label}. Starting upload to BLOG collection...`);

      for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        
        try {
          // Convert ISO timestamp to Firestore Timestamp
          const articleData = {
            ...article,
            publishedAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          };

          const docRef = await addDoc(collection(db, 'blog'), articleData);
          
          const result = `✓ ${i + 1}/${articles.length}: ${article.title.substring(0, 50)}... (ID: ${docRef.id})`;
          setResults(prev => [...prev, result]);
          setProgress(`Uploaded ${i + 1} of ${articles.length} articles to blog collection`);

          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 300));

        } catch (error: any) {
          const errorMsg = `✗ Error uploading article ${i + 1}: ${error.message}`;
          setResults(prev => [...prev, errorMsg]);
        }
      }

      setProgress(`✅ Upload complete! Successfully uploaded ${articles.length} articles.`);

    } catch (error: any) {
      setProgress(`❌ Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
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
            You need to be logged in as an admin to upload articles.
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
            Only admin accounts can upload articles.
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-black text-slate-900">
              � ECG Blog Article Uploader
            </h1>
            <div className="text-sm text-slate-500">
              {user.email}
            </div>
          </div>
          <p className="text-slate-600 mb-6">
            Add comprehensive ECG blog articles with rich snippets and SEO optimization to Firebase.
          </p>

          {/* File Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Select Article Set to Upload:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fileOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFile(option.value)}
                  disabled={uploading}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedFile === option.value
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                  } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="font-bold mb-1">{option.label.split('(')[0]}</div>
                  <div className="text-sm opacity-75">({option.label.split('(')[1]}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={uploadArticles}
            disabled={uploading}
            className={`w-full px-8 py-4 rounded-xl font-bold text-white transition-all ${
              uploading
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {uploading ? 'Uploading...' : `Add ${fileOptions.find(o => o.value === selectedFile)?.label.split('(')[1].replace(')', '')} to Blog`}
          </button>

          {progress && (
            <div className={`mt-6 p-4 rounded-xl ${
              progress.includes('✅') ? 'bg-green-100 text-green-800' :
              progress.includes('❌') ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              <p className="font-semibold">{progress}</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-slate-900 mb-3">Upload Log:</h2>
              <div className="bg-slate-100 rounded-xl p-4 max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`text-sm py-1 font-mono ${
                      result.startsWith('✓') ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">📊 Article Collections:</h3>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="p-3 bg-white rounded-lg">
                <h4 className="font-bold text-blue-600 mb-1">Clean Rhythm ECG (17 articles)</h4>
                <ul className="space-y-1 ml-4 text-xs">
                  <li>• Basic rhythms: NSR, AFib, Flutter, PVCs</li>
                  <li>• AV blocks: First degree, Mobitz I, Complete heart block</li>
                  <li>• Paced rhythms: Atrial, Ventricular, Dual chamber</li>
                  <li>• Arrhythmias: SVT, VT, VFib, Torsades</li>
                </ul>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <h4 className="font-bold text-purple-600 mb-1">Best ECG Images (22 articles)</h4>
                <ul className="space-y-1 ml-4 text-xs">
                  <li>• Advanced conditions: STEMI variants, Cardiac tamponade</li>
                  <li>• Bundle branch blocks: LBBB, RBBB, Incomplete RBBB</li>
                  <li>• WPW syndrome, Long QT, Early repolarization</li>
                  <li>• Emergency rhythms: PEA, Monomorphic VT, AFib RVR</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-slate-500">
            <p>
              After upload, visit{' '}
              <a href="/blog" className="text-blue-600 hover:underline">
                /blog
              </a>{' '}
              to see your articles!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
