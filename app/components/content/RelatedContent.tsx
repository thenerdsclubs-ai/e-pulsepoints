'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VideoData } from '@/lib/videos';
import { Article } from '@/lib/articles';

interface RelatedVideosProps {
  videos: VideoData[];
}

export function RelatedVideos({ videos }: RelatedVideosProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (videoId: string) => {
    setImageErrors(prev => new Set([...prev, videoId]));
  };

  if (videos.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        Related Videos
      </h3>
      <div className="space-y-4">
        {videos.map((video) => {
          const hasImageError = imageErrors.has(video.videoId);
          
          return (
            <Link
              key={video.slug}
              href={`/watch/${video.slug}`}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-16 h-12 bg-gray-200 rounded overflow-hidden">
                <Image
                  src={hasImageError ? `/api/placeholder/${video.videoId}` : video.thumbnailUrl}
                  alt={video.title}
                  width={64}
                  height={48}
                  className="object-cover w-full h-full"
                  onError={() => handleImageError(video.videoId)}
                  unoptimized={hasImageError}
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                  {video.title}
                </h4>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full mr-2">
                    {video.category}
                  </span>
                  <span>{video.duration}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link
          href="/videos"
          className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center"
        >
          View all videos
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (slug: string) => {
    setImageErrors(prev => new Set([...prev, slug]));
  };

  const getValidImageUrl = (imageUrl: string | undefined): string | null => {
    if (!imageUrl) return null;
    
    try {
      new URL(imageUrl);
      return imageUrl;
    } catch {
      return imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl;
    }
  };

  if (articles.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
        Related Articles
      </h3>
      <div className="space-y-4">
        {articles.map((article) => {
          const imageUrl = getValidImageUrl(article.imageUrl);
          const hasImageError = imageErrors.has(article.slug);
          
          return (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-16 h-12 bg-gray-200 rounded overflow-hidden">
                {imageUrl && !hasImageError ? (
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    width={64}
                    height={48}
                    className="object-cover w-full h-full"
                    onError={() => handleImageError(article.slug)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <span className="text-blue-400 text-sm">📄</span>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  {article.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link
          href="/blog"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
        >
          View all articles
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}