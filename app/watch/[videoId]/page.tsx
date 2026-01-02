import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getVideoBySlug, getAllVideoSlugs, getRelatedVideos } from '@/lib/videos';
import { findRelatedArticles } from '@/lib/crossLinking';
import { generateEducationalVideoSchema, generateBreadcrumbSchema } from '@/lib/schemas';
import RelatedVideos from './RelatedVideos';
import { RelatedArticles } from '@/app/components/content/RelatedContent';

export async function generateStaticParams() {
  const slugs = getAllVideoSlugs();
  return slugs.map((slug) => ({
    videoId: slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ videoId: string }> 
}): Promise<Metadata> {
  const { videoId } = await params;
  const video = getVideoBySlug(videoId);
  
  if (!video) {
    return {
      title: 'Video Not Found - ECG Kid',
      description: 'The requested video could not be found.',
    };
  }

  const title = `${video.title} - ECG Kid`;
  const description = video.description.length > 160 
    ? video.description.substring(0, 160) + '...' 
    : video.description;

  return {
    title,
    description,
    keywords: (video.tags ?? [video.category]).join(', '),
    openGraph: {
      title,
      description,
      url: `https://ecgkid.com/watch/${video.slug}`,
      siteName: 'ECG Kid',
      images: [{
        url: video.thumbnailUrl,
        width: 1280,
        height: 720,
        alt: video.title,
      }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [video.thumbnailUrl],
    },
  };
}

interface RelatedVideoProps {
  video: {
    slug: string;
    title: string;
    thumbnailUrl: string;
    duration: string;
    publishedAt: string;
  };
}

export default async function VideoPage({ 
  params 
}: { 
  params: Promise<{ videoId: string }> 
}) {
  const { videoId } = await params;
  const video = getVideoBySlug(videoId);
  
  if (!video) {
    notFound();
  }

  const relatedVideos = getRelatedVideos(video.slug, 6);
  const relatedArticles = await findRelatedArticles(video, 3);

  // Extract video ID from YouTube URL for embedding
  const youtubeId = video.videoId;
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;

  // Convert duration to ISO 8601 format (PT#H#M#S)
  const secondsToISO8601Duration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    let duration = 'PT';
    if (hours > 0) duration += `${hours}H`;
    if (minutes > 0) duration += `${minutes}M`;
    if (secs > 0 || duration === 'PT') duration += `${secs}S`;

    return duration;
  };

  // Ensure date is in ISO 8601 format
  const toISO8601Date = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return new Date().toISOString();
      }
      return date.toISOString();
    } catch {
      return new Date().toISOString();
    }
  };

  // Generate Video Schema with proper ISO 8601 formatting
  const videoSchema = generateEducationalVideoSchema({
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: toISO8601Date(video.publishedAt),
    embedUrl: embedUrl,
    contentUrl: video.youtubeUrl,
    duration: video.durationSeconds 
      ? secondsToISO8601Duration(video.durationSeconds)
      : video.duration && !isNaN(parseInt(video.duration))
        ? secondsToISO8601Duration(parseInt(video.duration))
        : secondsToISO8601Duration(180), // Default 3 minutes if not available
    category: video.category,
    learningResourceType: 'Tutorial',
    educationalLevel: video.category.includes('Advanced') ? 'Advanced' : 
                      video.category.includes('Fundamentals') ? 'Beginner' : 'Intermediate',
  });

  // Generate Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://ecgkid.com' },
    { name: 'Videos', url: 'https://ecgkid.com/videos' },
    { name: video.category, url: `https://ecgkid.com/videos?category=${encodeURIComponent(video.category)}` },
    { name: video.title, url: `https://ecgkid.com/watch/${video.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Video Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Video Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              />
            </div>

            {/* Video Info */}
            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  {video.category}
                </span>
                <span className="text-sm text-gray-500">
                  {video.duration}
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  {new Date(video.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {video.title}
              </h1>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    EK
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{video.channelTitle}</p>
                    <p className="text-sm text-gray-500">ECG Education Channel</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Watch on YouTube
                  </a>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">About this video</h3>
                <div className="text-gray-700 prose prose-sm max-w-none">
                  {video.description.split('\n').map((paragraph, index) => (
                    <p key={index} className={index > 0 ? 'mt-2' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Topics covered</h3>
                <div className="flex flex-wrap gap-2">
                  {(video.tags || [video.category]).filter(Boolean).map((tag) => (
                    <span 
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Transcript */}
              {video.transcript && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Transcript</h3>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
                    {video.transcript}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="sticky top-6">
              {/* Navigation */}
              <div className="mb-6">
                <Link 
                  href="/videos"
                  className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Videos
                </Link>
              </div>

              {/* Related Articles */}
              <RelatedArticles articles={relatedArticles} />
              
              {/* Related Videos */}
              <RelatedVideos videos={relatedVideos} />

              {/* Subscribe CTA */}
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 mb-2">
                  Stay Updated
                </h3>
                <p className="text-sm text-red-700 mb-3">
                  Subscribe to get notified about new ECG educational content and updates.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Subscribe for Updates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}