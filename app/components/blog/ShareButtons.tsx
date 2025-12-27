'use client';

import PDFDownloadButton from './PDFDownloadButton';
import { BlogPost } from '@/lib/pdfGenerator';

interface ShareButtonsProps {
  post: BlogPost;
  articleUrl?: string;
}

export default function ShareButtons({ post, articleUrl }: ShareButtonsProps) {
  const handleTwitterShare = () => {
    const url = articleUrl || (typeof window !== 'undefined' ? window.location.href : '');
    const text = post.title;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleFacebookShare = () => {
    const url = articleUrl || (typeof window !== 'undefined' ? window.location.href : '');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = articleUrl || (typeof window !== 'undefined' ? window.location.href : '');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <PDFDownloadButton 
        post={post}
        variant="primary"
        size="md"
        className="w-full justify-center bg-red-600 hover:bg-red-700 border-red-600"
      />
      <button 
        onClick={handleTwitterShare}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg text-center"
      >
        🐦 Twitter
      </button>
      <button 
        onClick={handleFacebookShare}
        className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all shadow-md hover:shadow-lg text-center"
      >
        📘 Facebook
      </button>
      <button 
        onClick={handleLinkedInShare}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-center"
      >
        💼 LinkedIn
      </button>
    </div>
  );
}
