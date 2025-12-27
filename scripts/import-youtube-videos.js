/**
 * YouTube Video Importer Script
 * 
 * This script fetches videos from a YouTube channel using the YouTube Data API v3
 * and imports them into Firestore for your video watch pages.
 * 
 * SETUP:
 * 1. Get YouTube API Key from: https://console.cloud.google.com/apis/credentials
 * 2. Enable YouTube Data API v3 in your Google Cloud Project
 * 3. Set your API key and channel ID below
 * 4. Run: node scripts/import-youtube-videos.js
 */

const https = require('https');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');

// ============= CONFIGURATION =============
const YOUTUBE_API_KEY = 'AIzaSyAhayvy1tlI1UzeKP1BgH5ZW_ln5eN58_g';
const YOUTUBE_CHANNEL_ID = 'UClCMAPmUHzX3PXhuEc9uq1A';
const MAX_RESULTS = 50; // Max per request (YouTube allows 50)
const TOTAL_VIDEOS_TO_FETCH = 400; // Total videos to import

// Firebase Admin SDK - Update path to your service account key
// Download from Firebase Console > Project Settings > Service Accounts
const serviceAccount = require('../firebase-service-account.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// ============= HELPER FUNCTIONS =============

/**
 * Convert ISO 8601 duration to seconds
 * Example: PT1M33S = 93 seconds
 */
function parseDuration(duration) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Create URL-friendly slug from title
 */
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

/**
 * Make HTTPS request to YouTube API
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Fetch channel uploads playlist ID
 */
async function getChannelUploadsPlaylistId(channelId) {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`;
  const data = await makeRequest(url);
  
  if (!data.items || data.items.length === 0) {
    throw new Error('Channel not found');
  }
  
  return data.items[0].contentDetails.relatedPlaylists.uploads;
}

/**
 * Fetch videos from playlist with pagination
 */
async function fetchPlaylistVideos(playlistId, pageToken = '') {
  let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=${MAX_RESULTS}&key=${YOUTUBE_API_KEY}`;
  
  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }
  
  return await makeRequest(url);
}

/**
 * Fetch detailed video information including duration
 */
async function fetchVideoDetails(videoIds) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics,snippet&id=${videoIds.join(',')}&key=${YOUTUBE_API_KEY}`;
  return await makeRequest(url);
}

/**
 * Categorize video based on title and description
 */
function categorizeVideo(title, description) {
  const text = (title + ' ' + description).toLowerCase();
  
  if (text.includes('stemi') || text.includes('myocardial infarction') || text.includes('heart attack')) {
    return 'STEMI & MI';
  }
  if (text.includes('arrhythmia') || text.includes('afib') || text.includes('atrial fibrillation') || text.includes('vtach')) {
    return 'Arrhythmias';
  }
  if (text.includes('block') || text.includes('av block') || text.includes('bundle branch')) {
    return 'Conduction Blocks';
  }
  if (text.includes('axis') || text.includes('lead') || text.includes('basics')) {
    return 'ECG Basics';
  }
  if (text.includes('interpretation') || text.includes('reading')) {
    return 'ECG Interpretation';
  }
  if (text.includes('case') || text.includes('review')) {
    return 'Case Studies';
  }
  
  return 'ECG Education';
}

/**
 * Extract tags from title and description
 */
function extractTags(title, description) {
  const tags = new Set();
  const text = (title + ' ' + description).toLowerCase();
  
  const keywords = [
    'ecg', 'ekg', 'stemi', 'nstemi', 'mi', 'myocardial infarction',
    'arrhythmia', 'atrial fibrillation', 'afib', 'vtach', 'vfib',
    'av block', 'bundle branch block', 'lbbb', 'rbbb',
    'axis', 'interpretation', 'diagnosis', 'emergency medicine',
    'cardiology', 'heart', 'cardiac', 'rhythm', 'wave'
  ];
  
  keywords.forEach(keyword => {
    if (text.includes(keyword)) {
      tags.add(keyword.replace(/\s+/g, '-'));
    }
  });
  
  return Array.from(tags).slice(0, 10); // Limit to 10 tags
}

/**
 * Import a batch of videos to Firestore
 */
async function importVideosToFirestore(videos) {
  const batch = db.batch();
  let importedCount = 0;
  
  for (const video of videos) {
    const videoRef = db.collection('videos').doc();
    
    const videoData = {
      videoId: video.videoId,
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      duration: video.duration,
      durationSeconds: video.durationSeconds,
      publishedAt: Timestamp.fromDate(new Date(video.publishedAt)),
      updatedAt: Timestamp.now(),
      category: video.category,
      tags: video.tags,
      views: 0, // Will be tracked on your site
      likes: 0,
      channelTitle: video.channelTitle,
      embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
      youtubeUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
      featured: false,
      slug: video.slug,
    };
    
    batch.set(videoRef, videoData);
    importedCount++;
    
    // Firestore batch limit is 500
    if (importedCount % 500 === 0) {
      await batch.commit();
      console.log(`Committed batch of ${importedCount} videos`);
    }
  }
  
  // Commit remaining
  if (importedCount % 500 !== 0) {
    await batch.commit();
  }
  
  return importedCount;
}

/**
 * Main import function
 */
async function importYouTubeVideos() {
  console.log('🎬 Starting YouTube video import...\n');
  
  try {
    // Step 1: Get channel uploads playlist
    console.log('📺 Fetching channel information...');
    const playlistId = await getChannelUploadsPlaylistId(YOUTUBE_CHANNEL_ID);
    console.log(`✅ Found uploads playlist: ${playlistId}\n`);
    
    // Step 2: Fetch all video IDs
    console.log('🔍 Fetching video list...');
    let allVideoItems = [];
    let pageToken = '';
    let pageCount = 0;
    
    while (allVideoItems.length < TOTAL_VIDEOS_TO_FETCH) {
      const response = await fetchPlaylistVideos(playlistId, pageToken);
      allVideoItems = allVideoItems.concat(response.items);
      pageCount++;
      
      console.log(`   Page ${pageCount}: Fetched ${response.items.length} videos (Total: ${allVideoItems.length})`);
      
      if (!response.nextPageToken) {
        break;
      }
      
      pageToken = response.nextPageToken;
    }
    
    // Limit to specified number
    allVideoItems = allVideoItems.slice(0, TOTAL_VIDEOS_TO_FETCH);
    console.log(`✅ Total videos to import: ${allVideoItems.length}\n`);
    
    // Step 3: Fetch detailed information in batches of 50
    console.log('📊 Fetching detailed video information...');
    const processedVideos = [];
    
    for (let i = 0; i < allVideoItems.length; i += 50) {
      const batch = allVideoItems.slice(i, i + 50);
      const videoIds = batch.map(item => item.contentDetails.videoId);
      
      const details = await fetchVideoDetails(videoIds);
      
      details.items.forEach((detail, index) => {
        const snippet = batch[index].snippet;
        const durationSeconds = parseDuration(detail.contentDetails.duration);
        
        processedVideos.push({
          videoId: detail.id,
          title: snippet.title,
          description: snippet.description,
          thumbnailUrl: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.medium.url,
          duration: detail.contentDetails.duration,
          durationSeconds: durationSeconds,
          publishedAt: snippet.publishedAt,
          category: categorizeVideo(snippet.title, snippet.description),
          tags: extractTags(snippet.title, snippet.description),
          channelTitle: snippet.channelTitle,
          slug: createSlug(snippet.title),
        });
      });
      
      console.log(`   Processed ${Math.min(i + 50, allVideoItems.length)}/${allVideoItems.length} videos`);
    }
    
    console.log(`✅ Processed all video details\n`);
    
    // Step 4: Import to Firestore
    console.log('💾 Importing to Firestore...');
    const importedCount = await importVideosToFirestore(processedVideos);
    console.log(`✅ Successfully imported ${importedCount} videos!\n`);
    
    // Step 5: Summary
    console.log('📈 Import Summary:');
    console.log(`   Total Videos: ${importedCount}`);
    
    const categories = {};
    processedVideos.forEach(v => {
      categories[v.category] = (categories[v.category] || 0) + 1;
    });
    
    console.log('\n   Categories:');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`   - ${cat}: ${count} videos`);
    });
    
    console.log('\n🎉 Import complete!');
    
  } catch (error) {
    console.error('❌ Error importing videos:', error.message);
    if (error.response) {
      console.error('API Response:', error.response);
    }
    process.exit(1);
  }
}

// Run the import
if (require.main === module) {
  importYouTubeVideos()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { importYouTubeVideos };
