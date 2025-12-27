import { Timestamp } from 'firebase/firestore';

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: 'research' | 'clinical' | 'technology' | 'education';
  imageUrl?: string;
  tags: string[];
  publishedAt: Timestamp;
  updatedAt: Timestamp;
  views: number;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  authorId: string;
  imageUrl?: string;
  tags: string[];
  publishedAt: Timestamp;
  updatedAt: Timestamp;
  views: number;
  likes: number;
  commentCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Timestamp;
  likes: number;
}

export interface Video {
  id: string;
  videoId: string; // YouTube video ID
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string; // ISO 8601 format (PT1M33S)
  durationSeconds: number;
  publishedAt: Timestamp;
  updatedAt: Timestamp;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  channelTitle: string;
  embedUrl: string;
  youtubeUrl: string;
  featured: boolean;
  slug?: string;
  transcript?: string;
  relatedVideoIds?: string[];
}
