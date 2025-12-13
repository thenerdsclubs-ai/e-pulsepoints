'use client';

import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Create user profile if doesn't exist
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          displayName: result.user.displayName || result.user.email?.split('@')[0],
          createdAt: new Date(),
          photoURL: result.user.photoURL || null
        });
      }
      
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Google sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 max-w-5xl w-full border border-white/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Mascot */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <div className="relative w-80 h-80 mb-6">
              <Image
                src="/mascots/heart-mascot-hello.png"
                alt="Dr. Pulse mascot welcoming medical professionals and students to E-PulsePoints learning platform"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-2xl font-black text-white text-center mb-2">
              Welcome to E-PulsePoints!
            </h2>
            <p className="text-white/90 text-center px-4">
              Join thousands of medical professionals mastering ECG interpretation
            </p>
          </div>

          {/* Right Side - Login Form */}
          <div>
            <div className="text-center mb-8">
              <div className="lg:hidden mb-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="/mascots/heart-mascot-hello.png"
                    alt="Dr. Pulse mascot greeting - E-PulsePoints friendly learning companion"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">
                Sign In
              </h1>
              <p className="text-slate-600">
                Access your ECG learning journey
              </p>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold px-6 py-4 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-3 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-lg">Continue with Google</span>
            </button>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">
                ⚠️ {error}
              </div>
            )}

            {/* Info Box */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-3">What you'll get:</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Access to comprehensive ECG learning resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Interactive MI case studies and quizzes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Community forum to connect with peers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Track your learning progress and achievements</span>
                </li>
              </ul>
            </div>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-slate-600 hover:text-slate-900 text-sm inline-flex items-center gap-1 font-semibold"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
