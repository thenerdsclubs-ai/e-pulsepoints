# File-Based Articles Setup Guide

## 🎯 Why File-Based Articles?

Moving from Firestore to file-based articles:
- ✅ **$0 Database Costs** - No Firestore reads/writes
- ✅ **Faster** - Pre-rendered at build time
- ✅ **Version Control** - All content in Git
- ✅ **SEO Optimized** - Static HTML pages
- ✅ **Auto Deploy** - Push to GitHub → Vercel builds

## 📁 New Structure

```
content/
  articles/
    stemi-recognition-complete-guide.mdx
    atrial-fibrillation-ecg-features.mdx
    ... (all your articles as MDX files)
```

## 🚀 Setup Steps

### 1. Install Dependencies

```bash
npm install gray-matter remark remark-html
```

### 2. Create Articles Directory

Already created at: `content/articles/`

### 3. Use New Blog Pages

I've created static versions:
- `app/blog/page-static.tsx` - List all articles
- `app/blog/[id]/page-static.tsx` - Individual article pages

### 4. Replace Current Pages

```bash
# Backup old files
mv app/blog/page.tsx app/blog/page-firestore-backup.tsx
mv app/blog/[id]/page.tsx app/blog/[id]/page-firestore-backup.tsx

# Use new static files
mv app/blog/page-static.tsx app/blog/page.tsx
mv app/blog/[id]/page-static.tsx app/blog/[id]/page.tsx
```

## ✍️ Writing Articles

### Article Format (MDX)

```mdx
---
title: "Your Article Title"
slug: "url-friendly-slug"
excerpt: "Short description for SEO"
author: "Dr. Raj K Reddy"
authorId: "raj-k-reddy"
publishedAt: "2024-12-27"
updatedAt: "2024-12-27"
featured: true
imageUrl: "/images/article-image.jpg"
tags:
  - ECG
  - STEMI
  - Emergency Medicine
---

## Your Content Here

Write your article content using Markdown...

### Subheadings

- Bullet points
- More content

[Links work](/other-article)
```

### Create New Article

1. Create new `.mdx` file in `content/articles/`
2. Add frontmatter (metadata)
3. Write content in Markdown
4. Commit to Git
5. Push to GitHub
6. Vercel auto-builds and deploys!

## 📊 Hybrid Approach (Recommended)

Keep different content types optimized:

### File-Based (Free, Static)
- ✅ **Articles** - In `content/articles/` as MDX
- ✅ **Tutorials** - Static content
- ✅ **About/Privacy pages** - Rarely change

### Firestore (Dynamic, Counted)
- ✅ **Videos** - Need view counting, dynamic
- ✅ **User data** - Profiles, preferences
- ✅ **Analytics** - View counts, engagement

## 🔄 Migration Script

Convert existing Firestore articles to MDX:

```javascript
// scripts/migrate-articles-to-mdx.js
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase
const serviceAccount = require('../firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrateArticles() {
  const articlesRef = db.collection('blog');
  const snapshot = await articlesRef.get();
  
  const articlesDir = path.join(__dirname, '../content/articles');
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    
    const frontmatter = `---
title: "${data.title}"
slug: "${data.slug || doc.id}"
excerpt: "${data.excerpt}"
author: "${data.author}"
authorId: "${data.authorId || 'raj-k-reddy'}"
publishedAt: "${data.publishedAt?.toDate().toISOString().split('T')[0]}"
updatedAt: "${data.updatedAt?.toDate().toISOString().split('T')[0]}"
featured: ${data.featured || false}
imageUrl: "${data.imageUrl || ''}"
tags:
${data.tags?.map(tag => `  - ${tag}`).join('\n') || '  - ECG'}
---

${data.content}
`;

    const filename = `${data.slug || doc.id}.mdx`;
    fs.writeFileSync(
      path.join(articlesDir, filename),
      frontmatter,
      'utf8'
    );
    
    console.log(`✅ Migrated: ${filename}`);
  }
  
  console.log(`\n🎉 Migration complete!`);
  process.exit(0);
}

migrateArticles().catch(console.error);
```

Run it:
```bash
node scripts/migrate-articles-to-mdx.js
```

## 🎨 Features Available

### In Article Files
- ✅ **React Components** - Import and use in MDX
- ✅ **Images** - Reference from `/public`
- ✅ **Code Blocks** - Syntax highlighting
- ✅ **Tables** - Markdown tables
- ✅ **Links** - Internal and external

### Example with Components

```mdx
---
title: "Interactive ECG Guide"
---

import { EcgCalculator } from '@/components/calculators'

## ECG Axis Calculator

<EcgCalculator type="axis" />

Regular markdown continues...
```

## 📈 Build Process

### Local Development

```bash
npm run dev
# Articles load from files
# Hot reload on changes
```

### Production Build

```bash
npm run build
# All articles pre-rendered as static HTML
# Super fast page loads
```

### Vercel Deploy

```bash
git add .
git commit -m "Add new article"
git push origin main

# Vercel automatically:
# 1. Detects push
# 2. Runs build
# 3. Deploys static site
# 4. Articles now live!
```

## 🔍 SEO Benefits

### Static Generation
- Pre-rendered HTML (best for SEO)
- Instant page loads
- Perfect Lighthouse scores

### Metadata in Frontmatter
- Easy to manage
- Version controlled
- Consistent structure

### Automatic Sitemap
Articles auto-included in sitemap.xml

## 💰 Cost Comparison

### Before (Firestore)
- 100,000 reads/day = ~$0.36/day
- 1M reads/month = ~$10.80/month
- Growing with traffic 📈

### After (Static Files)
- Build-time only (free)
- Unlimited page views
- $0.00/month 🎉

## 📝 Workflow

### Adding New Article

1. **Create file**:
   ```bash
   code content/articles/new-article.mdx
   ```

2. **Write content** with frontmatter

3. **Preview locally**:
   ```bash
   npm run dev
   # Visit http://localhost:3000/blog/new-article
   ```

4. **Commit & push**:
   ```bash
   git add content/articles/new-article.mdx
   git commit -m "Add: New ECG article"
   git push
   ```

5. **Live in 2 minutes** on Vercel! ✨

### Updating Article

1. Edit the `.mdx` file
2. Commit and push
3. Auto-deploys

## 🎯 Best Practices

### File Naming
- Use slugs: `stemi-recognition.mdx`
- Lowercase, hyphens only
- No spaces or special chars

### Image Optimization
- Store in `/public/images/articles/`
- Use Next.js Image component
- Provide alt text

### Content Structure
- Clear H2/H3 hierarchy
- Short paragraphs
- Bullet points for lists
- Internal links to related content

## ✅ Benefits Summary

| Feature | Firestore | File-Based |
|---------|-----------|------------|
| Cost | 💰 Per read | 🆓 Free |
| Speed | ⚡ Fast | 🚀 Instant |
| SEO | ✅ Good | ⭐ Excellent |
| Version Control | ❌ No | ✅ Git |
| Offline Dev | ❌ Need connection | ✅ Works offline |
| Content Review | 🔧 Complex | 👁️ Easy (Git PR) |
| Backup | 🔄 Manual | ✅ Automatic (Git) |

## 🎉 Next Steps

1. ✅ Install dependencies: `npm install gray-matter remark remark-html`
2. ✅ Replace blog pages with static versions
3. ✅ Run migration script to convert Firestore articles
4. ✅ Test locally
5. ✅ Push to GitHub
6. ✅ Verify deployment on Vercel
7. ✅ Start writing new articles as MDX files!

---

**Result**: Fast, free, SEO-optimized blog with zero database costs! 🚀
