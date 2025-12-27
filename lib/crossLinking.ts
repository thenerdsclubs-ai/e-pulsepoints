import { getAllVideos, VideoData } from '@/lib/videos';
import { getAllArticles, Article } from '@/lib/articles';

/**
 * Find related videos based on article content and keywords
 */
export function findRelatedVideos(article: Article, limit: number = 3): VideoData[] {
  const allVideos = getAllVideos();
  
  // Extract keywords from article
  const articleText = `${article.title} ${article.excerpt} ${article.content}`.toLowerCase();
  const keywords = extractKeywords(articleText);
  
  // Score videos based on relevance
  const scoredVideos = allVideos
    .map(video => {
      let score = 0;
      const videoText = `${video.title} ${video.description}`.toLowerCase();
      
      // Check for keyword matches
      keywords.forEach(keyword => {
        if (videoText.includes(keyword)) {
          score += keyword.length > 3 ? 3 : 1; // Longer keywords get higher score
        }
      });
      
      // Check for tag matches
      if (video.tags && article.tags) {
        const matchingTags = video.tags.filter(tag => 
          article.tags.some(articleTag => 
            tag.toLowerCase().includes(articleTag.toLowerCase()) ||
            articleTag.toLowerCase().includes(tag.toLowerCase())
          )
        );
        score += matchingTags.length * 5;
      }
      
      // Check for category/topic similarity
      const medicalTerms = [
        'ecg', 'cardiac', 'heart', 'rhythm', 'arrhythmia', 'tachycardia', 'bradycardia',
        'fibrillation', 'flutter', 'stemi', 'mi', 'infarction', 'ischemia', 'st segment',
        'qt', 'qrs', 'pr interval', 'av block', 'bundle', 'pacemaker', 'atrial', 'ventricular'
      ];
      
      medicalTerms.forEach(term => {
        if (articleText.includes(term) && videoText.includes(term)) {
          score += 2;
        }
      });
      
      return { video, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ video }) => video);
  
  return scoredVideos;
}

/**
 * Find related articles based on video content and keywords
 */
export async function findRelatedArticles(video: VideoData, limit: number = 3): Promise<Article[]> {
  const allArticles = await getAllArticles();
  
  // Extract keywords from video
  const videoText = `${video.title} ${video.description}`.toLowerCase();
  const keywords = extractKeywords(videoText);
  
  // Score articles based on relevance
  const scoredArticles = allArticles
    .map(article => {
      let score = 0;
      const articleText = `${article.title} ${article.excerpt} ${article.content}`.toLowerCase();
      
      // Check for keyword matches
      keywords.forEach(keyword => {
        if (articleText.includes(keyword)) {
          score += keyword.length > 3 ? 3 : 1;
        }
      });
      
      // Check for tag matches
      if (video.tags && article.tags) {
        const matchingTags = article.tags.filter(tag => 
          video.tags!.some(videoTag => 
            tag.toLowerCase().includes(videoTag.toLowerCase()) ||
            videoTag.toLowerCase().includes(tag.toLowerCase())
          )
        );
        score += matchingTags.length * 5;
      }
      
      // Check for category/topic similarity
      const medicalTerms = [
        'ecg', 'cardiac', 'heart', 'rhythm', 'arrhythmia', 'tachycardia', 'bradycardia',
        'fibrillation', 'flutter', 'stemi', 'mi', 'infarction', 'ischemia', 'st segment',
        'qt', 'qrs', 'pr interval', 'av block', 'bundle', 'pacemaker', 'atrial', 'ventricular'
      ];
      
      medicalTerms.forEach(term => {
        if (videoText.includes(term) && articleText.includes(term)) {
          score += 2;
        }
      });
      
      return { article, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article }) => article);
  
  return scoredArticles;
}

/**
 * Extract meaningful keywords from text
 */
function extractKeywords(text: string): string[] {
  // Remove common words and extract meaningful terms
  const commonWords = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on',
    'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we',
    'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their',
    'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when',
    'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into',
    'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now',
    'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two',
    'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any',
    'these', 'give', 'day', 'most', 'us', 'is', 'was', 'are', 'been', 'has', 'had', 'were',
    'said', 'each', 'much', 'where', 'those', 'very', 'through', 'down', 'many', 'before',
    'here', 'should', 'between'
  ]);
  
  // Split into words and filter
  const words = text
    .replace(/[^\w\s]/g, ' ')
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.has(word))
    .filter((word, index, arr) => arr.indexOf(word) === index); // Remove duplicates
  
  // Extract medical phrases and compound terms
  const phrases = extractMedicalPhrases(text);
  
  return [...words, ...phrases];
}

/**
 * Extract common medical phrases and compound terms
 */
function extractMedicalPhrases(text: string): string[] {
  const phrases = [
    'st elevation', 'st depression', 'qt interval', 'pr interval', 'qrs complex',
    'atrial fibrillation', 'atrial flutter', 'ventricular tachycardia', 'ventricular fibrillation',
    'supraventricular tachycardia', 'av block', 'bundle branch block', 'heart block',
    'sinus rhythm', 'sinus bradycardia', 'sinus tachycardia', 'myocardial infarction',
    'acute coronary syndrome', 'stemi', 'nstemi', 'unstable angina', 'heart failure',
    'cardiac arrest', 'pacemaker rhythm', 'junctional rhythm', 'escape rhythm',
    'premature ventricular contraction', 'premature atrial contraction', 'wolff parkinson white',
    'long qt syndrome', 'torsades de pointes', 'brugada syndrome', 'hypertrophic cardiomyopathy'
  ];
  
  return phrases.filter(phrase => text.toLowerCase().includes(phrase));
}

/**
 * Generate internal links for content
 */
export function generateInternalLinks(content: string, currentSlug: string): string {
  // This would be used to automatically insert links in content
  // For now, we'll rely on manual linking and the related content sections
  return content;
}