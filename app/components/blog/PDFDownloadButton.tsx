'use client';

import { useState } from 'react';
import { downloadBlogPostPDF, BlogPost } from '@/lib/pdfGenerator';

interface PDFDownloadButtonProps {
  post: BlogPost;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function PDFDownloadButton({ 
  post, 
  className = '', 
  variant = 'primary',
  size = 'md'
}: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      await downloadBlogPostPDF(post);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border-transparent',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-transparent',
    outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border-blue-600 hover:border-blue-700'
  };

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    border transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className={baseClasses}
      title="Download article as PDF"
    >
      <svg 
        className={`${isGenerating ? 'animate-spin' : ''} ${
          size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
        } mr-2`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        {isGenerating ? (
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        ) : (
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        )}
      </svg>
      {isGenerating ? (
        size === 'sm' ? 'Generating...' : 'Generating PDF...'
      ) : (
        size === 'sm' ? 'PDF' : 'Download PDF'
      )}
    </button>
  );
}

// Floating PDF Download Button Component
export function FloatingPDFButton({ post }: { post: BlogPost }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <PDFDownloadButton 
        post={post}
        variant="primary"
        size="lg"
        className="shadow-lg hover:shadow-xl transform hover:scale-105"
      />
    </div>
  );
}

// PDF Download Card Component
export function PDFDownloadCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Take This Article Offline
          </h3>
          <p className="text-gray-600 mb-4">
            Download a beautifully formatted PDF version of this article for offline reading, 
            study sessions, or sharing with colleagues.
          </p>
          <div className="flex flex-wrap gap-3">
            <PDFDownloadButton 
              post={post}
              variant="primary"
              size="md"
            />
            <div className="text-sm text-gray-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Professional formatting
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 2h10" />
              </svg>
              Print-ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}