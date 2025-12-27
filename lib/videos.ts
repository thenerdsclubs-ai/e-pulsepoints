import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const videosDirectory = path.join(process.cwd(), 'content/videos');

export interface VideoData {
  videoId: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  durationSeconds: number;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags?: string[];
  channelTitle: string;
  embedUrl: string;
  youtubeUrl: string;
  featured: boolean;
  transcript?: string;
}

/**
 * Get all video slugs for static generation
 */
export function getAllVideoSlugs(): string[] {
  if (!fs.existsSync(videosDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(videosDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.yaml') || fileName.endsWith('.yml'))
    .map(fileName => fileName.replace(/\.ya?ml$/, ''));
}

/**
 * Get video by slug
 */
export function getVideoBySlug(slug: string): VideoData | null {
  try {
    const fullPath = path.join(videosDirectory, `${slug}.yaml`);
    
    // Try .yaml first, then .yml
    let fileContents: string;
    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } else {
      const ymlPath = path.join(videosDirectory, `${slug}.yml`);
      if (fs.existsSync(ymlPath)) {
        fileContents = fs.readFileSync(ymlPath, 'utf8');
      } else {
        return null;
      }
    }

    // Parse YAML
    const data = yaml.parse(fileContents) as Partial<VideoData>;
    
    // Add missing required properties
    const video: VideoData = {
      ...data,
      slug,
      channelTitle: data.channelTitle || 'ECG Kid',
      embedUrl: data.embedUrl || `https://www.youtube.com/embed/${data.videoId}`,
      youtubeUrl: data.youtubeUrl || `https://www.youtube.com/watch?v=${data.videoId}`,
      featured: data.featured ?? false,
      tags: data.tags || [data.category].filter(Boolean)
    } as VideoData;
    
    return video;
    
  } catch (error) {
    console.error(`Error reading video ${slug}:`, error);
    return null;
  }
}

/**
 * Get video by YouTube ID
 */
export function getVideoByYoutubeId(videoId: string): VideoData | null {
  const allSlugs = getAllVideoSlugs();
  
  for (const slug of allSlugs) {
    const video = getVideoBySlug(slug);
    if (video && video.videoId === videoId) {
      return video;
    }
  }
  
  return null;
}

/**
 * Get all videos sorted by date
 */
export function getAllVideos(): VideoData[] {
  const slugs = getAllVideoSlugs();
  
  const videos = slugs
    .map(slug => getVideoBySlug(slug))
    .filter((video): video is VideoData => video !== null)
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });

  return videos;
}

/**
 * Get videos by category
 */
export function getVideosByCategory(category: string): VideoData[] {
  const allVideos = getAllVideos();
  return allVideos.filter(video => 
    video.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get featured videos
 */
export function getFeaturedVideos(limit: number = 5): VideoData[] {
  const allVideos = getAllVideos();
  return allVideos.filter(video => video.featured).slice(0, limit);
}

/**
 * Get related videos based on tags and category
 */
export function getRelatedVideos(
  currentSlug: string,
  limit: number = 5
): VideoData[] {
  const currentVideo = getVideoBySlug(currentSlug);
  if (!currentVideo) return [];

  const allVideos = getAllVideos();
  
  // Score videos by number of matching tags + same category
  const scoredVideos = allVideos
    .filter(video => video.slug !== currentSlug)
    .map(video => {
      let score = 0;
      
      // Same category gets 2 points
      if (video.category === currentVideo.category) {
        score += 2;
      }
      
      // Each matching tag gets 1 point
      const matchingTags = (video.tags || []).filter(tag =>
        (currentVideo.tags || []).includes(tag)
      ).length;
      score += matchingTags;
      
      return { video, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.video);

  return scoredVideos;
}

/**
 * Search videos by title, description, or tags
 */
export function searchVideos(query: string): VideoData[] {
  const allVideos = getAllVideos();
  const lowerQuery = query.toLowerCase();
  
  return allVideos.filter(video =>
    video.title.toLowerCase().includes(lowerQuery) ||
    video.description.toLowerCase().includes(lowerQuery) ||
    (video.tags || []).some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    video.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const allVideos = getAllVideos();
  const categories = new Set(allVideos.map(v => v.category));
  return Array.from(categories).sort();
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const allVideos = getAllVideos();
  const tags = new Set<string>();
  allVideos.forEach(video => {
    (video.tags || []).forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get paginated videos
 */
export function getPaginatedVideos(page: number = 1, limit: number = 12, category?: string, search?: string) {
  let videos = getAllVideos();
  
  // Apply category filter
  if (category && category !== 'all') {
    videos = videos.filter(video => video.category === category);
  }
  
  // Apply search filter
  if (search) {
    const searchTerm = search.toLowerCase();
    videos = videos.filter(video => 
      video.title.toLowerCase().includes(searchTerm) ||
      video.description.toLowerCase().includes(searchTerm) ||
      video.category.toLowerCase().includes(searchTerm) ||
      (video.tags && video.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }
  
  const totalVideos = videos.length;
  const totalPages = Math.ceil(totalVideos / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedVideos = videos.slice(startIndex, endIndex);
  
  return {
    videos: paginatedVideos,
    totalVideos,
    totalPages,
    currentPage: page,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
}
