# Quick Schema Implementation Guide

## How to Add Schemas to New Content

### 1. Blog Articles (Already Implemented)

Articles automatically get BlogPosting schema. The schema is generated in [app/blog/[id]/page.tsx](app/blog/[id]/page.tsx).

### 2. Adding Video Schema to a Page

```tsx
import { generateVideoSchema } from '@/lib/schemas';

export default function VideoPage() {
  const videoSchema = generateVideoSchema({
    name: "ECG Interpretation Basics",
    description: "Learn fundamental ECG reading skills",
    thumbnailUrl: "https://ecgkid.com/thumbnails/ecg-basics.jpg",
    uploadDate: "2024-12-13",
    contentUrl: "https://ecgkid.com/videos/ecg-basics.mp4",
    duration: "PT10M30S", // 10 minutes 30 seconds
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      {/* Your page content */}
    </>
  );
}
```

### 3. Adding HowTo Schema for Tutorials

```tsx
import { generateHowToSchema } from '@/lib/schemas';

export default function TutorialPage() {
  const howToSchema = generateHowToSchema({
    name: "How to Read an ECG in 5 Steps",
    description: "A beginner's guide to ECG interpretation",
    totalTime: "PT15M", // 15 minutes
    image: {
      url: "https://ecgkid.com/tutorials/ecg-reading.jpg",
      width: 1200,
      height: 630,
    },
    steps: [
      {
        name: "Calculate Heart Rate",
        text: "Count the number of QRS complexes in 6 seconds and multiply by 10",
        image: "https://ecgkid.com/steps/heart-rate.jpg"
      },
      {
        name: "Determine Rhythm",
        text: "Check if R-R intervals are regular or irregular",
      },
      {
        name: "Analyze P Waves",
        text: "Look for presence, shape, and relationship to QRS",
      },
      {
        name: "Measure Intervals",
        text: "Check PR interval, QRS duration, and QT interval",
      },
      {
        name: "Check ST Segments",
        text: "Look for elevation or depression indicating ischemia",
      }
    ]
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {/* Tutorial content */}
    </>
  );
}
```

### 4. Adding FAQ Schema

```tsx
import { generateFAQSchema } from '@/lib/schemas';

export default function FAQPage() {
  const faqSchema = generateFAQSchema([
    {
      question: "What is an ECG?",
      answer: "An electrocardiogram (ECG) is a test that measures the electrical activity of the heart. It records the timing and strength of electrical signals as they travel through the heart."
    },
    {
      question: "How long does it take to learn ECG interpretation?",
      answer: "Basic ECG interpretation can be learned in a few weeks with consistent practice. Mastery typically takes several months of regular study and clinical exposure."
    },
    {
      question: "Is the E-PulsePoints app free?",
      answer: "Yes! The E-PulsePoints app offers a comprehensive free tier with access to basic lessons, practice cases, and community features. Premium features are available for advanced learners."
    }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* FAQ content */}
    </>
  );
}
```

### 5. Adding Course Schema for Learning Modules

```tsx
import { generateCourseSchema } from '@/lib/schemas';

export default function CoursePage() {
  const courseSchema = generateCourseSchema({
    name: "Complete ECG Mastery Course",
    description: "Comprehensive 12-week course covering all aspects of ECG interpretation from basics to advanced arrhythmias",
    provider: "E-PulsePoints",
    url: "https://ecgkid.com/courses/ecg-mastery",
    image: {
      url: "https://ecgkid.com/courses/ecg-mastery-cover.jpg",
      width: 1200,
      height: 630,
    }
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {/* Course content */}
    </>
  );
}
```

### 6. Adding Breadcrumb Schema

```tsx
import { generateBreadcrumbSchema } from '@/lib/schemas';

export default function ArticlePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://ecgkid.com" },
    { name: "Blog", url: "https://ecgkid.com/blog" },
    { name: "Case Studies", url: "https://ecgkid.com/blog?tag=case-studies" },
    { name: "STEMI Case Analysis", url: "https://ecgkid.com/blog/stemi-case" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Page content */}
    </>
  );
}
```

### 7. Custom Image Schema

```tsx
import { generateImageObject } from '@/lib/schemas';

// For individual images that need schema
const imageSchema = generateImageObject({
  url: "https://ecgkid.com/images/ecg-lead-placement.jpg",
  width: 1920,
  height: 1080,
  alt: "Proper 12-lead ECG electrode placement diagram",
  caption: "Standard electrode positions for 12-lead ECG acquisition"
});
```

## Image Best Practices

### Descriptive Alt Text Template

```tsx
// Pattern: [Subject] [Action/Context] [Relevant Details]

// ✅ Examples:
<Image 
  src="/ecg.jpg" 
  alt="12-lead ECG showing ST-segment elevation in anterior leads indicating acute myocardial infarction"
/>

<Image 
  src="/mascot.png" 
  alt="Dr. Pulse mascot demonstrating proper stethoscope placement for cardiac auscultation"
/>

<Image 
  src="/app-screenshot.jpg" 
  alt="E-PulsePoints mobile app dashboard displaying daily ECG challenge and progress statistics"
/>
```

### Image Dimensions for SEO

Recommended sizes:
- **Open Graph/Twitter Cards**: 1200x630 px
- **Logo**: 512x512 px (square)
- **Blog thumbnails**: 800x450 px (16:9)
- **Article featured images**: 1200x630 px
- **Author avatars**: 400x400 px (square)

## Testing Checklist

After adding schemas, test with:

1. ✅ **Rich Results Test**: https://search.google.com/test/rich-results
2. ✅ **Schema Validator**: https://validator.schema.org/
3. ✅ **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. ✅ **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
5. ✅ **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

## Common Issues & Solutions

### Issue: Schema Not Showing in Search Console
**Solution**: Wait 24-48 hours after publishing. Google needs time to crawl and index.

### Issue: Invalid Date Format
**Solution**: Use ISO 8601 format: `2024-12-13T10:30:00Z` or `.toISOString()`

### Issue: Missing Required Fields
**Solution**: Check Schema.org documentation for required properties of your schema type

### Issue: Image Not Loading in Rich Results
**Solution**: 
- Ensure image URL is absolute (https://ecgkid.com/...)
- Image must be publicly accessible (no auth required)
- Recommended: 1200x630 px for best display

## Quick Reference

| Content Type | Schema Type | Key Fields |
|--------------|-------------|------------|
| Blog Post | BlogPosting | headline, author, datePublished, image |
| Tutorial | HowTo | name, steps, totalTime |
| FAQ | FAQPage | questions, answers |
| Video | VideoObject | name, thumbnailUrl, duration, uploadDate |
| Course | Course | name, provider, description |
| Navigation | BreadcrumbList | items with name, url |

---

**Need Help?** Check [IMAGE_SEO_IMPLEMENTATION.md](IMAGE_SEO_IMPLEMENTATION.md) for complete documentation.
