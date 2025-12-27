'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VideoData } from '@/lib/videos';

interface RelatedVideoCardProps {
  video: VideoData;
}

function RelatedVideoCard({ video }: RelatedVideoCardProps) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <Link 
      href={`/watch/${video.slug}`}
      className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <div className="flex-shrink-0">
        <div className="relative">
          <Image
            src={imageError ? `/api/placeholder/${video.videoId}` : video.thumbnailUrl}
            alt={video.title}
            width={120}
            height={68}
            className="rounded-lg object-cover"
            onError={() => setImageError(true)}
          />
          <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
            {video.duration}
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-1">
          {video.title}
        </h4>
        <p className="text-xs text-gray-500">
          {new Date(video.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>
    </Link>
  );
}

interface RelatedVideosProps {
  videos: VideoData[];
}

export default function RelatedVideos({ videos }: RelatedVideosProps) {
  if (videos.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Related Videos</h3>
      <div className="space-y-1">
        {videos.map((video) => (
          <RelatedVideoCard key={video.slug} video={video} />
        ))}
      </div>
    </div>
  );
}