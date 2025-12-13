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

export interface ForumTopic {
  id: string;
  title: string;
  description: string;
  category: 'general' | 'technical' | 'learning' | 'bugs' | 'feature-request' | 'app';
  authorId: string;
  authorName: string;
  status: 'open' | 'answered' | 'closed';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  views: number;
  replyCount: number;
  lastReplyAt?: Timestamp;
  resolved: boolean;
}

export interface ForumReply {
  id: string;
  topicId: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  likes: number;
  isAnswer: boolean;
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
