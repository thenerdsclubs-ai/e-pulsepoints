import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found - ECG Kid',
  description: 'The page you are looking for could not be found. Explore our ECG learning resources.',
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md mx-auto">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-red-100 mb-4">404</div>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you may have entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            href="/"
            className="inline-block w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            href="/learn-ecg"
            className="inline-block w-full sm:w-auto px-6 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
          >
            Start Learning ECG
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Sections
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <Link href="/blog" className="text-gray-600 hover:text-red-600 transition-colors">
              Blog Posts
            </Link>
            <Link href="/videos" className="text-gray-600 hover:text-red-600 transition-colors">
              Video Library
            </Link>
            <Link href="/tools" className="text-gray-600 hover:text-red-600 transition-colors">
              ECG Tools
            </Link>
            <Link href="/practice-tests" className="text-gray-600 hover:text-red-600 transition-colors">
              Practice Tests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}