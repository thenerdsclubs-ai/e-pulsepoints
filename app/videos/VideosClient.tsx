'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VideoData } from '@/lib/videos';

interface VideoCardProps {
  video: VideoData;
}

function VideoCard({ video }: VideoCardProps) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <Link 
      href={`/watch/${video.slug}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Thumbnail */}
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

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
          {video.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
          {video.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
            {video.category}
          </span>
          <span className="text-gray-500 text-xs">
            {new Date(video.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}

interface VideosClientProps {
  videos: VideoData[];
  categories: string[];
  totalVideos: number;
  currentPage: number;
  initialCategory?: string;
  initialSearch?: string;
}

export default function VideosClient({ 
  videos, 
  categories, 
  totalVideos, 
  currentPage, 
  initialCategory, 
  initialSearch 
}: VideosClientProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialSearch || '');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');

  // Update URL when filters change
  const updateFilters = (newSearch: string, newCategory: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newCategory && newCategory !== 'all') params.set('category', newCategory);
    // Reset to page 1 when filters change
    
    const queryString = params.toString();
    const newUrl = `/videos${queryString ? `?${queryString}` : ''}`;
    router.push(newUrl);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(searchTerm, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateFilters(searchTerm, category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-4">ECG Educational Videos</h1>
          <p className="text-xl text-red-100 max-w-3xl">
            Master ECG interpretation through our comprehensive video library. Watch expert-guided lessons on cardiac rhythms, arrhythmias, and advanced interpretation techniques.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search videos..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {selectedCategory === 'all' ? 'All Videos' : selectedCategory}
          </h2>
          <p className="text-gray-600">
            Showing {((currentPage - 1) * 12) + 1}-{Math.min(currentPage * 12, totalVideos)} of {totalVideos} videos
          </p>
        </div>

        {/* Videos Grid */}
        {videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No videos found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.slug} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}