# 🎬 Quick Start: Import YouTube Videos

## 🚀 5-Minute Setup

### 1. Get YouTube API Key (2 minutes)
```
1. Visit: https://console.cloud.google.com/
2. Enable "YouTube Data API v3"
3. Create API Key
4. Copy the key
```

### 2. Configure Script (1 minute)

Edit `/scripts/import-youtube-videos.js`:

```javascript
// Line 19-21: Add your credentials
const YOUTUBE_API_KEY = 'AIzaSyD...your-key-here';
const YOUTUBE_CHANNEL_ID = 'UC...your-channel-id'; // or '@yourhandle'
const TOTAL_VIDEOS_TO_FETCH = 400;

// Line 25: Update Firebase path
const serviceAccount = require('../firebase-service-account.json');
```

### 3. Run Import (2 minutes)

```bash
# Install dependencies (first time only)
npm install firebase-admin

# Run the import
node scripts/import-youtube-videos.js
```

## ✅ That's It!

Your videos are now:
- ✅ Imported to Firestore
- ✅ Accessible at `/watch/[video-slug]`
- ✅ Listed at `/videos`
- ✅ In sitemap for Google
- ✅ With rich VideoObject schema

## 🔍 Test Your Videos

1. **View a video**: `http://localhost:3000/watch/[any-video-slug]`
2. **Browse all**: `http://localhost:3000/videos`
3. **Test schema**: [Google Rich Results Test](https://search.google.com/test/rich-results)

## 📊 What Gets Imported

For each video:
```
✓ Title & Description
✓ Thumbnail (high-res)
✓ Duration
✓ Publish date
✓ Auto-categorization
✓ Auto-tagging
✓ SEO-friendly slug
✓ YouTube embed URL
```

## 🎯 Google SEO Benefits

Your videos will show in Google with:
- 📺 Video thumbnail
- ⏱️ Duration badge  
- 👤 Author (Dr. Raj K Reddy)
- 📅 Publish date
- 👁️ View count
- ⭐ Rich snippets

## 🔄 Re-run Anytime

To add new videos or update existing:
```bash
node scripts/import-youtube-videos.js
```

The script is **idempotent** - safe to run multiple times!

## 📞 Need Help?

See full guide: `YOUTUBE_VIDEO_SEO_GUIDE.md`

---

**Pro Tip**: After import, submit your sitemap to Google Search Console:
```
https://ecgkid.com/sitemap.xml
```
