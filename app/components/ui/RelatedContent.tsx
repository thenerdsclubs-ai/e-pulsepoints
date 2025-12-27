'use client';

import Link from 'next/link';
import Image from 'next/image';
import { VideoData } from '@/lib/videos';
import { Article } from '@/lib/articles';
import { useState } from 'react';

interface RelatedVideosProps {
  videos: VideoData[];
  title?: string;
}

export function RelatedVideos({ videos, title = "Related Videos" }: RelatedVideosProps) {
  if (videos.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 000 2h8a1 1 0 100-2H5z" />
        </svg>
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <RelatedVideoCard key={video.slug} video={video} />
        ))}
      </div>
    </div>
  );
}

function RelatedVideoCard({ video }: { video: VideoData }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link 
      href={`/watch/${video.slug}`}
      className="group block bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-video">
        <Image
          src={imageError ? `/api/placeholder/${video.videoId}` : video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          unoptimized={imageError}
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-medium text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 text-sm">
          {video.title}
        </h4>
        <p className="text-xs text-gray-600 mt-1">
          {video.category}
        </p>
      </div>
    </Link>
  );
}

interface RelatedArticlesProps {
  articles: Article[];
  title?: string;
}

export function RelatedArticles({ articles, title = "Related Articles" }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
        {title}
      </h3>
      <div className="space-y-4">
        {articles.map((article) => (
          <RelatedArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

function RelatedArticleCard({ article }: { article: Article }) {
  return (
    <Link 
      href={`/blog/${article.slug}`}
      className="group flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
    >
      {article.imageUrl && (
        <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden">
          <Image
            src={article.imageUrl.startsWith('/') ? article.imageUrl : `/${article.imageUrl}`}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm mb-1">
          {article.title}
        </h4>
        <p className="text-xs text-gray-600 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 mt-2">
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}