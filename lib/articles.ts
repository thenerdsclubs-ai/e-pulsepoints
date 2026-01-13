import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  authorId: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  imageUrl: string;
  tags: string[];
}

export interface Article extends ArticleFrontmatter {
  content: string;
  htmlContent?: string;
}

/**
 * Get all article slugs for static generation
 */
export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.mdx?$/, ''));
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    
    // Try .mdx first, then .md
    let fileContents: string;
    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } else {
      const mdPath = path.join(articlesDirectory, `${slug}.md`);
      if (fs.existsSync(mdPath)) {
        fileContents = fs.readFileSync(mdPath, 'utf8');
      } else {
        return null;
      }
    }

    // Parse frontmatter
    const { data, content } = matter(fileContents);

    // Clean up content: remove extra whitespace and fix formatting
    const cleanedContent = content
      .replace(/\n\s{4,}/g, '\n')  // Remove excessive indentation
      .replace(/\n{3,}/g, '\n\n')  // Replace multiple newlines with double
      .trim();

    // Convert markdown to HTML with GitHub Flavored Markdown support
    const processedContent = await remark()
      .use(remarkGfm) // Enable images, tables, strikethrough, etc.
      .use(html, { sanitize: false })
      .process(cleanedContent);
    const htmlContent = processedContent.toString();

    return {
      ...(data as ArticleFrontmatter),
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

/**
 * Get all articles sorted by date
 */
export async function getAllArticles(): Promise<Article[]> {
  const slugs = getAllArticleSlugs();
  
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const article = await getArticleBySlug(slug);
      return article;
    })
  );

  // Filter out nulls and sort by date
  return articles
    .filter((article): article is Article => article !== null)
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });
}

/**
 * Get articles by tag
 */
export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const allArticles = await getAllArticles();
  return allArticles.filter(article => 
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles(limit: number = 3): Promise<Article[]> {
  const allArticles = await getAllArticles();
  return allArticles.filter(article => article.featured).slice(0, limit);
}

/**
 * Get related articles based on tags
 */
export async function getRelatedArticles(
  currentSlug: string,
  limit: number = 3
): Promise<Article[]> {
  const currentArticle = await getArticleBySlug(currentSlug);
  if (!currentArticle) return [];

  const allArticles = await getAllArticles();
  
  // Score articles by number of matching tags
  const scoredArticles = allArticles
    .filter(article => article.slug !== currentSlug)
    .map(article => {
      const matchingTags = article.tags.filter(tag =>
        currentArticle.tags.includes(tag)
      ).length;
      return { article, score: matchingTags };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);

  return scoredArticles;
}

/**
 * Search articles by title or content
 */
export async function searchArticles(query: string): Promise<Article[]> {
  const allArticles = await getAllArticles();
  const lowerQuery = query.toLowerCase();
  
  return allArticles.filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.excerpt.toLowerCase().includes(lowerQuery) ||
    article.content.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get paginated articles
 */
export async function getPaginatedArticles(page: number = 1, limit: number = 12, search?: string) {
  let articles = await getAllArticles();
  
  // Apply search filter
  if (search) {
    const searchTerm = search.toLowerCase();
    articles = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.excerpt.toLowerCase().includes(searchTerm) ||
      article.content.toLowerCase().includes(searchTerm) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  const totalArticles = articles.length;
  const totalPages = Math.ceil(totalArticles / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedArticles = articles.slice(startIndex, endIndex);
  
  return {
    articles: paginatedArticles,
    totalArticles,
    totalPages,
    currentPage: page,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
}
