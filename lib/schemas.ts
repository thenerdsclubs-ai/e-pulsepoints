/**
 * Schema.org structured data helpers for SEO
 * Generates JSON-LD markup for various content types
 */

export interface ImageObjectInput {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
}

export interface AuthorInput {
  name: string;
  title?: string;
  avatar?: string;
  url?: string;
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: AuthorInput;
  image: ImageObjectInput | ImageObjectInput[];
  publisher?: {
    name: string;
    logo: ImageObjectInput;
  };
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
}

/**
 * Generate ImageObject schema
 */
export function generateImageObject(image: ImageObjectInput) {
  return {
    '@type': 'ImageObject',
    url: image.url,
    width: image.width,
    height: image.height,
    caption: image.caption || image.alt,
  };
}

/**
 * Generate Person schema for authors
 */
export function generatePersonSchema(author: AuthorInput) {
  const schema: any = {
    '@type': 'Person',
    name: author.name,
  };

  if (author.url) {
    schema.url = author.url;
  }

  if (author.avatar) {
    schema.image = generateImageObject({
      url: author.avatar,
      alt: `${author.name} profile photo`,
    });
  }

  if (author.title) {
    schema.jobTitle = author.title;
  }

  return schema;
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(
  name: string,
  url: string,
  logo: ImageObjectInput,
  description?: string
) {
  return {
    '@type': 'Organization',
    name,
    url,
    logo: generateImageObject(logo),
    description,
  };
}

/**
 * Generate Article schema (NewsArticle or Article)
 */
export function generateArticleSchema(
  input: ArticleSchemaInput,
  type: 'Article' | 'NewsArticle' | 'BlogPosting' | 'MedicalWebPage' = 'Article'
) {
  const images = Array.isArray(input.image) ? input.image : [input.image];
  
  const publisher = input.publisher || {
    name: 'E-PulsePoints',
    logo: {
      url: 'https://ecgkid.com/logo/logo.png',
      width: 512,
      height: 512,
      alt: 'E-PulsePoints logo',
    },
  };

  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline: input.headline,
    description: input.description,
    image: images.map(generateImageObject),
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: generatePersonSchema(input.author),
    publisher: generateOrganizationSchema(
      publisher.name,
      'https://ecgkid.com',
      publisher.logo,
      'E-PulsePoints - Master ECG interpretation through interactive learning'
    ),
    url: input.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url,
    },
    keywords: input.keywords?.join(', '),
    articleSection: input.articleSection,
    wordCount: input.wordCount,
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Course schema for educational content
 */
export function generateCourseSchema(input: {
  name: string;
  description: string;
  provider: string;
  url: string;
  image?: ImageObjectInput;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: input.name,
    description: input.description,
    provider: {
      '@type': 'Organization',
      name: input.provider,
      url: 'https://ecgkid.com',
    },
    url: input.url,
    image: input.image ? generateImageObject(input.image) : undefined,
  };
}

/**
 * Generate VideoObject schema
 */
export function generateVideoSchema(input: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string; // ISO 8601 format e.g., "PT1M33S"
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: input.name,
    description: input.description,
    thumbnailUrl: input.thumbnailUrl,
    uploadDate: input.uploadDate,
    contentUrl: input.contentUrl,
    embedUrl: input.embedUrl,
    duration: input.duration,
  };
}

/**
 * Generate HowTo schema for tutorials
 */
export function generateHowToSchema(input: {
  name: string;
  description: string;
  image?: ImageObjectInput;
  totalTime?: string; // ISO 8601 duration
  steps: { name: string; text: string; image?: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    image: input.image ? generateImageObject(input.image) : undefined,
    totalTime: input.totalTime,
    step: input.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  };
}
