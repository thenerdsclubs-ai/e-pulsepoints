/**
 * YouTube Video Importer Script - File-Based Version
 * 
 * This script fetches videos from a YouTube channel using the YouTube Data API v3
 * and creates YAML files for your file-based video system.
 * 
 * SETUP:
 * 1. YouTube API Key and Channel ID are already configured
 * 2. Run: node scripts/fetch-youtube-videos.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ============= CONFIGURATION =============
const YOUTUBE_API_KEY = 'AIzaSyAhayvy1tlI1UzeKP1BgH5ZW_ln5eN58_g';
const YOUTUBE_CHANNEL_ID = 'UClCMAPmUHzX3PXhuEc9uq1A';
const MAX_RESULTS = 50; // Max per request (YouTube allows 50)
const TOTAL_VIDEOS_TO_FETCH = 400; // Total videos to import
const OUTPUT_DIR = path.join(__dirname, '..', 'content', 'videos');

// ============= HELPER FUNCTIONS =============

/**
 * Convert ISO 8601 duration to human readable format
 * Example: PT1M33S = "1:33"
 */
function formatDuration(duration) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

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
  
  if (text.includes('stemi') || text.includes('myocardial infarction') || text.includes('heart attack') || text.includes('mi ')) {
    return 'STEMI & MI';
  }
  if (text.includes('arrhythmia') || text.includes('afib') || text.includes('atrial fibrillation') || text.includes('vtach') || text.includes('vfib')) {
    return 'Arrhythmias';
  }
  if (text.includes('block') || text.includes('av block') || text.includes('bundle branch') || text.includes('conduction')) {
    return 'Conduction Blocks';
  }
  if (text.includes('axis') || text.includes('lead') || text.includes('basics') || text.includes('fundamentals')) {
    return 'ECG Fundamentals';
  }
  if (text.includes('interpretation') || text.includes('reading') || text.includes('analysis')) {
    return 'ECG Interpretation';
  }
  if (text.includes('case') || text.includes('review') || text.includes('example')) {
    return 'Case Studies';
  }
  if (text.includes('emergency') || text.includes('acute') || text.includes('critical')) {
    return 'Emergency Medicine';
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
    'ecg', 'ekg', 'electrocardiogram',
    'stemi', 'nstemi', 'mi', 'myocardial infarction', 'heart attack',
    'arrhythmia', 'atrial fibrillation', 'afib', 'vtach', 'vfib', 'svt',
    'av block', 'bundle branch block', 'lbbb', 'rbbb', 'heart block',
    'axis deviation', 'left axis', 'right axis',
    'interpretation', 'diagnosis', 'analysis',
    'emergency medicine', 'cardiology', 'cardiac',
    'rhythm', 'wave', 'segment', 'interval',
    'pacemaker', 'defibrillator',
    'chest pain', 'shortness of breath'
  ];
  
  keywords.forEach(keyword => {
    if (text.includes(keyword)) {
      tags.add(keyword.replace(/\s+/g, ' ').trim());
    }
  });
  
  // Add specific ECG patterns
  const patterns = ['st elevation', 'st depression', 'q wave', 't wave', 'p wave', 'qrs complex'];
  patterns.forEach(pattern => {
    if (text.includes(pattern)) {
      tags.add(pattern);
    }
  });
  
  return Array.from(tags).slice(0, 8); // Limit to 8 tags
}

/**
 * Create YAML content for a video
 */
function createVideoYaml(video) {
  const yaml = `videoId: "${video.videoId}"
title: "${video.title.replace(/"/g, '\\"')}"
slug: "${video.slug}"
description: "${video.description.replace(/"/g, '\\"').substring(0, 500)}${video.description.length > 500 ? '...' : ''}"
thumbnailUrl: "https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg"
duration: "${video.duration}"
durationSeconds: ${video.durationSeconds}
publishedAt: "${video.publishedAt}"
updatedAt: "${new Date().toISOString()}"
category: "${video.category}"
tags:
${video.tags.map(tag => `  - "${tag}"`).join('\n')}
channelTitle: "${video.channelTitle || 'Dr. Raj K ECG Learning'}"
embedUrl: "https://www.youtube.com/embed/${video.videoId}"
youtubeUrl: "https://www.youtube.com/watch?v=${video.videoId}"
featured: ${video.featured}`;

  return yaml;
}

/**
 * Save video as YAML file
 */
function saveVideoFile(video) {
  const filename = `${video.slug}.yaml`;
  const filepath = path.join(OUTPUT_DIR, filename);
  const yamlContent = createVideoYaml(video);
  
  fs.writeFileSync(filepath, yamlContent, 'utf8');
  console.log(`✅ Saved: ${filename}`);
}

/**
 * Main import function
 */
async function importVideos() {
  try {
    console.log('🚀 Starting YouTube video import...');
    console.log(`📡 Fetching videos from channel: ${YOUTUBE_CHANNEL_ID}`);
    
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Get channel uploads playlist
    const uploadsPlaylistId = await getChannelUploadsPlaylistId(YOUTUBE_CHANNEL_ID);
    console.log(`📋 Found uploads playlist: ${uploadsPlaylistId}`);

    let allVideos = [];
    let nextPageToken = '';
    let totalFetched = 0;

    // Fetch videos with pagination
    while (totalFetched < TOTAL_VIDEOS_TO_FETCH) {
      console.log(`📥 Fetching batch ${Math.floor(totalFetched / MAX_RESULTS) + 1}...`);
      
      const playlistData = await fetchPlaylistVideos(uploadsPlaylistId, nextPageToken);
      
      if (!playlistData.items || playlistData.items.length === 0) {
        console.log('ℹ️ No more videos found');
        break;
      }

      // Get video IDs for detailed info
      const videoIds = playlistData.items.map(item => item.contentDetails.videoId);
      
      // Fetch detailed video information
      const videoDetails = await fetchVideoDetails(videoIds);
      
      // Process each video
      for (let i = 0; i < playlistData.items.length && totalFetched < TOTAL_VIDEOS_TO_FETCH; i++) {
        const item = playlistData.items[i];
        const details = videoDetails.items[i];
        
        if (!details || !item.snippet) continue;

        const title = item.snippet.title;
        const description = item.snippet.description || '';
        
        const video = {
          videoId: item.contentDetails.videoId,
          title: title,
          description: description,
          publishedAt: item.snippet.publishedAt,
          category: categorizeVideo(title, description),
          tags: extractTags(title, description),
          duration: formatDuration(details.contentDetails.duration),
          durationSeconds: parseDuration(details.contentDetails.duration),
          channelTitle: item.snippet.channelTitle,
          slug: createSlug(title),
          featured: totalFetched < 10 // First 10 videos are featured
        };

        allVideos.push(video);
        saveVideoFile(video);
        totalFetched++;
        
        console.log(`📹 ${totalFetched}/${TOTAL_VIDEOS_TO_FETCH}: ${title.substring(0, 60)}...`);
      }

      nextPageToken = playlistData.nextPageToken;
      if (!nextPageToken) {
        console.log('ℹ️ Reached end of playlist');
        break;
      }
      
      // Rate limiting - YouTube API allows 100 requests per 100 seconds
      await new Promise(resolve => setTimeout(resolve, 1100));
    }

    console.log(`\n🎉 Successfully imported ${totalFetched} videos!`);
    console.log(`📁 Files saved to: ${OUTPUT_DIR}`);
    
    // Create summary
    const categories = {};
    allVideos.forEach(video => {
      categories[video.category] = (categories[video.category] || 0) + 1;
    });
    
    console.log('\n📊 Categories breakdown:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} videos`);
    });

  } catch (error) {
    console.error('❌ Error importing videos:', error.message);
    console.error(error);
  }
}

// Run the import
importVideos();