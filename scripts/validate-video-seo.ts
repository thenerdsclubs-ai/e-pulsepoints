/**
 * Validation script for video SEO compliance
 * Checks all videos for proper formatting and SEO readiness
 */

import { getAllVideos } from '../lib/videos';
import fs from 'fs';
import path from 'path';

interface ValidationIssue {
  videoSlug: string;
  videoTitle: string;
  severity: 'error' | 'warning';
  message: string;
  field?: string;
}

/**
 * Validate ISO 8601 duration format
 */
function validateISO8601Duration(duration: string): boolean {
  const iso8601Pattern = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/;
  return iso8601Pattern.test(duration);
}

/**
 * Validate ISO 8601 date format
 */
function validateISO8601Date(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return false;
    }
    // Check if it's in ISO format
    const isoString = date.toISOString();
    return isoString.includes('T') && isoString.includes('Z');
  } catch {
    return false;
  }
}

/**
 * Convert seconds to ISO 8601 duration format
 */
function secondsToISO8601(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  let duration = 'PT';
  if (hours > 0) duration += `${hours}H`;
  if (minutes > 0) duration += `${minutes}M`;
  if (secs > 0 || duration === 'PT') duration += `${secs}S`;

  return duration;
}

/**
 * Validate all videos for SEO compliance
 */
function validateVideos(): {
  issues: ValidationIssue[];
  totalVideos: number;
  validVideos: number;
  warnings: number;
  errors: number;
} {
  const videos = getAllVideos();
  const issues: ValidationIssue[] = [];

  videos.forEach((video) => {
    // Required fields check
    if (!video.slug) {
      issues.push({
        videoSlug: video.slug || 'unknown',
        videoTitle: video.title,
        severity: 'error',
        message: 'Missing slug',
        field: 'slug',
      });
    }

    if (!video.title || video.title.length < 10) {
      issues.push({
        videoSlug: video.slug,
        videoTitle: video.title,
        severity: 'error',
        message: 'Title is missing or too short (minimum 10 characters)',
        field: 'title',
      });
    }

    if (video.title && video.title.length > 100) {
      issues.push({
        videoSlug: video.slug,
        videoTitle: video.title,
        severity: 'warning',
        message: `Title is too long (${video.title.length} characters, recommended max 100)`,
        field: 'title',
      });
    }

    if (!video.description || video.description.length < 50) {
      issues.push({
        videoSlug: video.slug,
        videoTitle: video.title,
        severity: 'error',
        message: 'Description is missing or too short (minimum 50 characters)',
        field: 'description',
      });
    }

    if (video.description && video.description.length > 5000) {
      issues.push({
        videoSlug: video.slug,
        videoTitle: video.title,
        severity: 'warning',
        message: `Description is too long (${video.description.length} characters, Google max 5000)`,
        field: 'description',
      });
    }

    // Duration validation
    if (!video.durationSeconds && !video.duration) {
      issues.push({
        videoSlug: video.slug,
        videoTitle: video.title,
        severity: 'error',
        message: 'Missing duration (both durationSeconds and duration fields)',
        field: 'duration',
      });
    } else if (video.durationSeconds) {
      if (video.durationSeconds < 0 || video.durationSeconds > 86400) {
        issues.push({
          videoSlug: video.slug,
          videoTitle: video.title,
          severity: 'error',
          message: `Invalid durationSeconds: ${video.durationSeconds} (must be 0-86400)`,
          field: 'durationSeconds',
        });
      }
    }

    // Date validation
    if (!video.publishedAt) {
      issues.push({
        videoSlug: video.slug,
        videoTitle: video.title,
        severity: 'error',
        message: 'Missing publishedAt date',
        field: 'publishedAt',
      });
    } else {
      const date = new Date(video.publishedAt);
      if (isNaN(date.getTime())) {
        issues.push({
          videoSlug: video.slug,
          videoTitle: video.title,
          severity: 'error',
          message: `Invalid publishedAt date: ${video.publishedAt}`,
          field: 'publishedAt',
        });
      }
    }

    // Thumbnail validation
    if (!video.thumbnailUrl) {
      issues.push({
        videoSlug: video.slug,
        videoTitle: video.title,
        severity: 'error',
        message: 'Missing thumbnailUrl',
        field: 'thumbnailUrl',
      });
    } else if (!video.thumbnailUrl.startsWith('http')) {
      issues.push({
        videoSlug: video.slug,
        videoTitle: video.title,
        severity: 'error',
        message: `Invalid thumbnailUrl format: ${video.thumbnailUrl}`,
        field: 'thumbnailUrl',
      });
    }

    // YouTube URL validation
    if (!video.youtubeUrl && !video.videoId) {
      issues.push({
        videoSlug: video.slug,
        videoTitle: video.title,
        severity: 'error',
        message: 'Missing youtubeUrl or videoId',
        field: 'youtubeUrl',
      });
    }

    // Category validation
    if (!video.category) {
      issues.push({
        videoSlug: video.slug,
        videoTitle: video.title,
        severity: 'warning',
        message: 'Missing category',
        field: 'category',
      });
    }

    // Tags validation
    if (!video.tags || video.tags.length === 0) {
      issues.push({
        videoSlug: video.slug,
        videoTitle: video.title,
        severity: 'warning',
        message: 'No tags defined (recommended for better SEO)',
        field: 'tags',
      });
    } else if (video.tags.length > 32) {
      issues.push({
        videoSlug: video.slug,
        videoTitle: video.title,
        severity: 'warning',
        message: `Too many tags (${video.tags.length}, Google max 32)`,
        field: 'tags',
      });
    }
  });

  const errors = issues.filter((i) => i.severity === 'error').length;
  const warnings = issues.filter((i) => i.severity === 'warning').length;
  const validVideos = videos.length - issues.filter((i) => i.severity === 'error' && i.videoSlug !== 'unknown').length;

  return {
    issues,
    totalVideos: videos.length,
    validVideos,
    warnings,
    errors,
  };
}

/**
 * Generate validation report
 */
function generateReport(results: ReturnType<typeof validateVideos>): string {
  let report = `
╔════════════════════════════════════════════════════════════════╗
║           VIDEO SEO VALIDATION REPORT                          ║
╚════════════════════════════════════════════════════════════════╝

📊 SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Videos:      ${results.totalVideos}
Valid Videos:      ${results.validVideos}
Errors:            ${results.errors}
Warnings:          ${results.warnings}
Success Rate:      ${((results.validVideos / results.totalVideos) * 100).toFixed(1)}%

`;

  if (results.errors === 0 && results.warnings === 0) {
    report += `
✅ ALL VIDEOS PASSED VALIDATION!

All ${results.totalVideos} videos meet SEO requirements and are ready for indexing.
`;
  } else {
    if (results.errors > 0) {
      report += `
🚨 ERRORS (${results.errors})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
      const errors = results.issues.filter((i) => i.severity === 'error');
      errors.forEach((issue, index) => {
        report += `
${index + 1}. ${issue.videoTitle}
   Slug: ${issue.videoSlug}
   Field: ${issue.field || 'N/A'}
   Issue: ${issue.message}
`;
      });
    }

    if (results.warnings > 0) {
      report += `
⚠️  WARNINGS (${results.warnings})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
      const warnings = results.issues.filter((i) => i.severity === 'warning');
      warnings.forEach((issue, index) => {
        report += `
${index + 1}. ${issue.videoTitle}
   Slug: ${issue.videoSlug}
   Field: ${issue.field || 'N/A'}
   Issue: ${issue.message}
`;
      });
    }
  }

  report += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 RECOMMENDATIONS:

1. Fix all ERRORS before submitting to Google Search Console
2. Address WARNINGS to improve video discoverability
3. Validate video sitemap at: https://ecgkid.com/video-sitemap.xml
4. Submit video sitemap in Google Search Console
5. Use Rich Results Test: https://search.google.com/test/rich-results

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated: ${new Date().toISOString()}
`;

  return report;
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Starting video SEO validation...\n');

  const results = validateVideos();
  const report = generateReport(results);

  // Print to console
  console.log(report);

  // Save to file
  const reportPath = path.join(process.cwd(), 'VIDEO_SEO_VALIDATION_REPORT.txt');
  fs.writeFileSync(reportPath, report, 'utf-8');
  console.log(`\n💾 Report saved to: ${reportPath}`);

  // Exit with error code if there are errors
  if (results.errors > 0) {
    process.exit(1);
  }
}

main();
