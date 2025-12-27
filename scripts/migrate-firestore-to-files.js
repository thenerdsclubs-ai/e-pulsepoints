/**
 * Complete Migration Script: Firestore to File-Based System
 * 
 * This script migrates:
 * 1. Blog posts from Firestore to MDX files
 * 2. Videos from Firestore to YAML files
 * 
 * Run: node scripts/migrate-firestore-to-files.js
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('../firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/**
 * Convert HTML to Markdown (basic conversion)
 */
function htmlToMarkdown(html) {
  if (!html) return '';
  
  return html
    // Headings
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n')
    
    // Bold and italic
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    
    // Lists
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<ul[^>]*>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    
    // Paragraphs
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n')
    
    // Links
    .replace(/<a href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    
    // Code
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    .replace(/<pre[^>]*>(.*?)<\/pre>/gi, '\n```\n$1\n```\n')
    
    // Remove remaining HTML tags
    .replace(/<[^>]+>/g, '')
    
    // Clean up entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    
    // Clean up extra newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Create slug from title
 */
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

/**
 * Escape YAML string
 */
function escapeYaml(str) {
  if (!str) return '""';
  const needsQuotes = /[:\{\}\[\],&*#?|\-<>=!%@`]/.test(str) || str.includes('\n');
  if (needsQuotes) {
    return '"' + str.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }
  return str;
}

/**
 * Migrate Blog Posts to MDX
 */
async function migrateBlogPosts() {
  console.log('\n📝 Migrating Blog Posts...\n');
  
  const articlesDir = path.join(__dirname, '../content/articles');
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }
  
  try {
    const blogRef = db.collection('blog');
    const snapshot = await blogRef.get();
    
    let migrated = 0;
    let errors = 0;
    
    for (const doc of snapshot.docs) {
      try {
        const data = doc.data();
        
        // Extract author info
        let authorName = 'Dr. Raj K Reddy';
        let authorId = 'raj-k-reddy';
        
        if (typeof data.author === 'object' && data.author.name) {
          authorName = data.author.name;
        } else if (typeof data.author === 'string') {
          authorName = data.author;
        }
        
        // Get dates
        const publishedAt = data.publishedAt?.toDate?.() || new Date();
        const updatedAt = data.updatedAt?.toDate?.() || publishedAt;
        
        // Create slug
        const slug = data.slug || createSlug(data.title || doc.id);
        
        // Convert content to markdown
        const markdownContent = htmlToMarkdown(data.content || '');
        
        // Create frontmatter
        const frontmatter = `---
title: ${escapeYaml(data.title || 'Untitled')}
slug: "${slug}"
excerpt: ${escapeYaml(data.excerpt || '')}
author: "${authorName}"
authorId: "${authorId}"
publishedAt: "${publishedAt.toISOString().split('T')[0]}"
updatedAt: "${updatedAt.toISOString().split('T')[0]}"
featured: ${data.featured || false}
imageUrl: "${data.imageUrl || ''}"
tags:
${(data.tags || ['ECG']).map(tag => `  - ${tag}`).join('\n')}
---

${markdownContent}
`;

        const filename = `${slug}.mdx`;
        const filepath = path.join(articlesDir, filename);
        
        fs.writeFileSync(filepath, frontmatter, 'utf8');
        
        console.log(`✅ ${filename}`);
        migrated++;
        
      } catch (error) {
        console.error(`❌ Error migrating ${doc.id}:`, error.message);
        errors++;
      }
    }
    
    console.log(`\n📊 Blog Migration Complete:`);
    console.log(`   ✅ Migrated: ${migrated}`);
    console.log(`   ❌ Errors: ${errors}`);
    
  } catch (error) {
    console.error('Error migrating blog posts:', error);
  }
}

/**
 * Migrate Videos to YAML
 */
async function migrateVideos() {
  console.log('\n🎬 Migrating Videos...\n');
  
  const videosDir = path.join(__dirname, '../content/videos');
  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true });
  }
  
  try {
    const videosRef = db.collection('videos');
    const snapshot = await videosRef.get();
    
    let migrated = 0;
    let errors = 0;
    
    for (const doc of snapshot.docs) {
      try {
        const data = doc.data();
        
        const publishedAt = data.publishedAt?.toDate?.() || new Date();
        const updatedAt = data.updatedAt?.toDate?.() || publishedAt;
        
        const slug = data.slug || createSlug(data.title || doc.id);
        
        // Create YAML content
        const yamlContent = `videoId: "${data.videoId}"
title: ${escapeYaml(data.title)}
slug: "${slug}"
description: ${escapeYaml(data.description || '')}
thumbnailUrl: "${data.thumbnailUrl}"
duration: "${data.duration || 'PT0S'}"
durationSeconds: ${data.durationSeconds || 0}
publishedAt: "${publishedAt.toISOString()}"
updatedAt: "${updatedAt.toISOString()}"
category: "${data.category || 'ECG Education'}"
tags:
${(data.tags || []).map(tag => `  - ${tag}`).join('\n')}
channelTitle: "${data.channelTitle || 'E-PulsePoints'}"
embedUrl: "${data.embedUrl || `https://www.youtube.com/embed/${data.videoId}`}"
youtubeUrl: "${data.youtubeUrl || `https://www.youtube.com/watch?v=${data.videoId}`}"
featured: ${data.featured || false}
`;

        const filename = `${slug}.yaml`;
        const filepath = path.join(videosDir, filename);
        
        fs.writeFileSync(filepath, yamlContent, 'utf8');
        
        console.log(`✅ ${filename}`);
        migrated++;
        
      } catch (error) {
        console.error(`❌ Error migrating ${doc.id}:`, error.message);
        errors++;
      }
    }
    
    console.log(`\n📊 Video Migration Complete:`);
    console.log(`   ✅ Migrated: ${migrated}`);
    console.log(`   ❌ Errors: ${errors}`);
    
  } catch (error) {
    console.error('Error migrating videos:', error);
  }
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('🚀 Starting Firestore to File-Based Migration...');
  
  await migrateBlogPosts();
  await migrateVideos();
  
  console.log('\n✨ Migration Complete!\n');
  console.log('📁 Files created in:');
  console.log('   - content/articles/ (blog posts)');
  console.log('   - content/videos/ (videos)');
  console.log('\n📝 Next Steps:');
  console.log('   1. Review migrated files');
  console.log('   2. Install: npm install yaml');
  console.log('   3. Replace blog/video pages with static versions');
  console.log('   4. Update Firestore rules (keep only auth)');
  console.log('   5. Test locally: npm run dev');
  console.log('   6. Deploy: git push');
  
  process.exit(0);
}

// Run migration
if (require.main === module) {
  migrate().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { migrate, migrateBlogPosts, migrateVideos };
