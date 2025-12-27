/**
 * Convert Existing JSON Article Files to MDX
 * This script converts your existing ECG article JSON files to MDX format
 * No Firebase needed!
 */

const fs = require('fs');
const path = require('path');

/**
 * Convert HTML to Markdown (basic conversion)
 */
function htmlToMarkdown(html) {
  if (!html) return '';
  
  return html
    // Remove div wrappers
    .replace(/<div[^>]*>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    
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
    
    // Images
    .replace(/<img src="([^"]*)" alt="([^"]*)"[^>]*>/gi, '\n![Image]($1)\n*$2*\n')
    
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
    .replace(/&#39;/g, "'")
    
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
 * Get today's date in YYYY-MM-DD format
 */
function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Extract author name from author object or string
 */
function extractAuthorName(author) {
  if (typeof author === 'object' && author.name) {
    return author.name;
  }
  if (typeof author === 'string') {
    return author;
  }
  return 'Dr. Raj K Reddy';
}

/**
 * Escape YAML string
 */
function escapeYaml(str) {
  if (!str) return '""';
  const needsQuotes = /[:\{\}\[\],&*#?|\-<>=!%@`]/.test(str) || str.includes('\n');
  if (needsQuotes) {
    return '"' + str.replace(/"/g, '\\"').replace(/\n/g, ' ') + '"';
  }
  return str;
}

/**
 * Convert JSON article to MDX
 */
function convertArticleToMDX(article) {
  const slug = article.slug || createSlug(article.title);
  const authorName = extractAuthorName(article.author);
  const publishedAt = article.publishedAt ? article.publishedAt.split('T')[0] : getTodayDate();
  const updatedAt = article.updatedAt ? article.updatedAt.split('T')[0] : getTodayDate();
  
  // Convert content
  const markdownContent = htmlToMarkdown(article.content || '');
  
  // Create frontmatter
  const frontmatter = `---
title: ${escapeYaml(article.title)}
slug: "${slug}"
excerpt: ${escapeYaml(article.excerpt || '')}
author: "${authorName}"
authorId: "raj-k-reddy"
publishedAt: "${publishedAt}"
updatedAt: "${updatedAt}"
featured: ${article.featured || false}
imageUrl: "${article.imageUrl || ''}"
tags:
${(article.tags || ['ECG']).map(tag => `  - ${tag}`).join('\n')}
---

${markdownContent}
`;

  return { slug, content: frontmatter };
}

/**
 * Main conversion function
 */
async function convertJSONtoMDX() {
  console.log('🚀 Converting JSON Articles to MDX...\n');
  
  const articlesDir = path.join(__dirname, '../content/articles');
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }
  
  // JSON files to process
  const jsonFiles = [
    '../scripts/articles-clean-rhythm-part1.json',
    '../public/scripts/ecg-blog-best-images.json',
    '../public/scripts/ecg-blog-articles-v2.json',
    '../public/scripts/ecg-articles-clean-rhythm.json',
    '../public/scripts/mi-ecg-articles.json'
  ];
  
  let totalConverted = 0;
  let totalErrors = 0;
  
  for (const jsonFile of jsonFiles) {
    const fullPath = path.join(__dirname, jsonFile);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⏭️  Skipping ${jsonFile} (not found)`);
      continue;
    }
    
    console.log(`\n📂 Processing: ${jsonFile}`);
    
    try {
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      const articles = JSON.parse(fileContent);
      
      if (!Array.isArray(articles)) {
        console.log(`   ⚠️  Not an array, skipping`);
        continue;
      }
      
      console.log(`   Found ${articles.length} articles`);
      
      for (const article of articles) {
        try {
          const { slug, content } = convertArticleToMDX(article);
          const filename = `${slug}.mdx`;
          const filepath = path.join(articlesDir, filename);
          
          // Check if file already exists
          if (fs.existsSync(filepath)) {
            console.log(`   ⏭️  ${filename} (already exists)`);
            continue;
          }
          
          fs.writeFileSync(filepath, content, 'utf8');
          console.log(`   ✅ ${filename}`);
          totalConverted++;
          
        } catch (error) {
          console.error(`   ❌ Error converting article: ${error.message}`);
          totalErrors++;
        }
      }
      
    } catch (error) {
      console.error(`   ❌ Error reading file: ${error.message}`);
      totalErrors++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Conversion Summary:');
  console.log(`   ✅ Converted: ${totalConverted} articles`);
  console.log(`   ❌ Errors: ${totalErrors}`);
  console.log('='.repeat(60));
  
  if (totalConverted > 0) {
    console.log('\n✨ Success! Your articles are now in content/articles/');
    console.log('\n📝 Next Steps:');
    console.log('   1. Review the converted articles');
    console.log('   2. Test locally: npm run dev');
    console.log('   3. Deploy: git add . && git commit -m "Add ECG articles" && git push');
  }
}

// Run conversion
if (require.main === module) {
  convertJSONtoMDX().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { convertJSONtoMDX };
