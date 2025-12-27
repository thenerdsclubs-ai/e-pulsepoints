import { getAllVideos, VideoData } from './videos';
import { getAllArticles, Article } from './articles';

export interface RelatedContent {
  videos: VideoData[];
  articles: Article[];
}

/**
 * Find related videos for a blog article
 */
export async function getRelatedVideosForArticle(article: Article, limit: number = 4): Promise<VideoData[]> {
  const allVideos = getAllVideos();
  
  // Create keyword sets for matching
  const articleKeywords = extractKeywords(article.title + ' ' + article.excerpt + ' ' + article.tags.join(' '));
  
  // Score videos based on relevance
  const scoredVideos = allVideos.map(video => {
    const videoKeywords = extractKeywords(video.title + ' ' + video.description + ' ' + (video.tags?.join(' ') || ''));
    const score = calculateKeywordScore(articleKeywords, videoKeywords);
    return { video, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, limit)
  .map(item => item.video);

  return scoredVideos;
}

/**
 * Find related articles for a video
 */
export async function getRelatedArticlesForVideo(video: VideoData, limit: number = 3): Promise<Article[]> {
  const allArticles = await getAllArticles();
  
  // Create keyword sets for matching
  const videoKeywords = extractKeywords(video.title + ' ' + video.description + ' ' + (video.tags?.join(' ') || ''));
  
  // Score articles based on relevance
  const scoredArticles = allArticles.map(article => {
    const articleKeywords = extractKeywords(article.title + ' ' + article.excerpt + ' ' + article.tags.join(' '));
    const score = calculateKeywordScore(videoKeywords, articleKeywords);
    return { article, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, limit)
  .map(item => item.article);

  return scoredArticles;
}

/**
 * Extract meaningful keywords from text
 */
function extractKeywords(text: string): Set<string> {
  // Common medical/ECG terms that should be prioritized
  const priorityTerms = [
    'ecg', 'ekg', 'electrocardiogram', 'arrhythmia', 'rhythm', 'heart', 'cardiac',
    'atrial', 'ventricular', 'tachycardia', 'bradycardia', 'fibrillation',
    'stemi', 'myocardial', 'infarction', 'ischemia', 'coronary', 'angina',
    'pacemaker', 'conduction', 'block', 'bundle', 'axis', 'interval',
    'wave', 'segment', 'depression', 'elevation', 'st-segment', 'qrs',
    'p-wave', 't-wave', 'u-wave', 'qt', 'pr', 'rr',
    'sinus', 'atrial flutter', 'atrial fibrillation', 'supraventricular',
    'ventricular tachycardia', 'ventricular fibrillation', 'asystole',
    'pulseless electrical activity', 'pea', 'arrest', 'resuscitation',
    'emergency', 'critical', 'interpretation', 'diagnosis', 'treatment'
  ];

  const words = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ') // Remove punctuation except hyphens
    .split(/\s+/)
    .filter(word => word.length > 2) // Filter short words
    .filter(word => !isStopWord(word)); // Filter stop words

  const keywords = new Set<string>();
  
  // Add individual words
  words.forEach(word => {
    if (priorityTerms.includes(word)) {
      keywords.add(word);
    } else if (word.length > 3) {
      keywords.add(word);
    }
  });

  // Add priority terms that appear in the text
  priorityTerms.forEach(term => {
    if (text.toLowerCase().includes(term)) {
      keywords.add(term);
    }
  });

  // Add bigrams for important medical terms
  for (let i = 0; i < words.length - 1; i++) {
    const bigram = `${words[i]} ${words[i + 1]}`;
    if (priorityTerms.includes(bigram)) {
      keywords.add(bigram);
    }
  }

  return keywords;
}

/**
 * Calculate similarity score between two keyword sets
 */
function calculateKeywordScore(keywords1: Set<string>, keywords2: Set<string>): number {
  const intersection = new Set([...keywords1].filter(x => keywords2.has(x)));
  const union = new Set([...keywords1, ...keywords2]);
  
  if (union.size === 0) return 0;
  
  // Jaccard similarity with bonus for medical terms
  let score = intersection.size / union.size;
  
  // Bonus for medical/ECG specific matches
  const medicalTerms = [
    'ecg', 'ekg', 'arrhythmia', 'tachycardia', 'bradycardia', 'fibrillation',
    'stemi', 'myocardial infarction', 'atrial fibrillation', 'ventricular tachycardia'
  ];
  
  intersection.forEach(term => {
    if (medicalTerms.includes(term)) {
      score += 0.2; // Bonus for medical terms
    }
  });

  return score;
}

/**
 * Check if a word is a stop word
 */
function isStopWord(word: string): boolean {
  const stopWords = [
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with', 'you', 'your', 'this', 'these', 'they',
    'have', 'had', 'what', 'when', 'where', 'who', 'which', 'why', 'how',
    'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some',
    'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too',
    'very', 'can', 'could', 'should', 'would', 'may', 'might', 'must', 'shall'
  ];
  
  return stopWords.includes(word);
}

/**
 * Generate contextual links for article content
 */
export async function generateContextualLinks(content: string, currentSlug: string): Promise<string> {
  const allVideos = getAllVideos();
  const allArticles = await getAllArticles();
  
  let processedContent = content;
  
  // Define patterns and their replacements
  const linkPatterns = [
    // ECG patterns
    { pattern: /\b(atrial fibrillation|afib|af)\b/gi, type: 'video', search: 'atrial fibrillation' },
    { pattern: /\b(ventricular tachycardia|vtach|vt)\b/gi, type: 'video', search: 'ventricular tachycardia' },
    { pattern: /\b(stemi|st.elevation myocardial infarction|st elevation mi)\b/gi, type: 'video', search: 'stemi' },
    { pattern: /\b(bradycardia|slow heart rate)\b/gi, type: 'video', search: 'bradycardia' },
    { pattern: /\b(tachycardia|fast heart rate)\b/gi, type: 'video', search: 'tachycardia' },
    { pattern: /\b(heart block|av block|conduction block)\b/gi, type: 'video', search: 'heart block' },
    { pattern: /\b(bundle branch block|bbb|lbbb|rbbb)\b/gi, type: 'video', search: 'bundle branch block' },
    { pattern: /\b(pacemaker rhythm|paced rhythm)\b/gi, type: 'video', search: 'pacemaker' },
    { pattern: /\b(ecg interpretation|ecg reading)\b/gi, type: 'article', search: 'ecg interpretation' },
  ];

  // Process each pattern
  for (const linkPattern of linkPatterns) {
    const matches = processedContent.match(linkPattern.pattern);
    if (!matches) continue;

    // Find related content
    let relatedContent;
    if (linkPattern.type === 'video') {
      relatedContent = allVideos.filter(video => 
        video.slug !== currentSlug &&
        (video.title.toLowerCase().includes(linkPattern.search.toLowerCase()) ||
         video.description.toLowerCase().includes(linkPattern.search.toLowerCase()))
      )[0]; // Get first match
    } else {
      relatedContent = allArticles.filter(article => 
        article.slug !== currentSlug &&
        (article.title.toLowerCase().includes(linkPattern.search.toLowerCase()) ||
         article.excerpt.toLowerCase().includes(linkPattern.search.toLowerCase()))
      )[0]; // Get first match
    }

    if (relatedContent) {
      const linkUrl = linkPattern.type === 'video' 
        ? `/watch/${relatedContent.slug}`
        : `/blog/${relatedContent.slug}`;
      
      // Replace first occurrence only to avoid over-linking
      processedContent = processedContent.replace(
        linkPattern.pattern,
        `<a href="${linkUrl}" class="text-blue-600 hover:text-blue-800 underline" target="_blank">$1</a>`
      );
    }
  }

  return processedContent;
}

/**
 * Add "Watch Video" and "Read Article" suggestions to content
 */
export async function addContentSuggestions(article: Article): Promise<{
  relatedVideos: VideoData[];
  relatedArticles: Article[];
}> {
  const relatedVideos = await getRelatedVideosForArticle(article);
  const relatedArticles = await getRelatedArticlesForVideo(
    { 
      title: article.title, 
      description: article.excerpt,
      tags: article.tags 
    } as VideoData
  );

  return {
    relatedVideos: relatedVideos.slice(0, 3),
    relatedArticles: relatedArticles.slice(0, 2)
  };
}