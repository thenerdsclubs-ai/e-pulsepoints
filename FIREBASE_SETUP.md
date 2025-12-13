# Firebase Setup Guide

## 🔥 Firebase Configuration

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Firestore Database
4. Create a Web App in project settings

### 2. Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your Firebase credentials:

```bash
cp .env.local.example .env.local
```

Get your config from Firebase Console → Project Settings → Your Apps → SDK setup and configuration

### 3. Firestore Collections Structure

#### News Collection (`news`)
```typescript
{
  title: string
  content: string
  excerpt: string
  author: string
  category: 'research' | 'clinical' | 'technology' | 'education'
  imageUrl?: string
  tags: string[]
  publishedAt: Timestamp
  updatedAt: Timestamp
  views: number
  featured: boolean
}
```

#### Blog Collection (`blog`)
```typescript
{
  title: string
  content: string
  excerpt: string
  author: string
  authorId: string
  imageUrl?: string
  tags: string[]
  publishedAt: Timestamp
  updatedAt: Timestamp
  views: number
  likes: number
  commentCount: number
}
```

#### Forum Collection (`forum`)
```typescript
{
  title: string
  description: string
  category: 'general' | 'technical' | 'learning' | 'bugs' | 'feature-request'
  authorId: string
  authorName: string
  status: 'open' | 'answered' | 'closed'
  priority: 'low' | 'medium' | 'high'
  tags: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
  views: number
  replyCount: number
  lastReplyAt?: Timestamp
  resolved: boolean
}
```

### 4. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // News - read public, write authenticated
    match /news/{newsId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Blog - read public, write authenticated
    match /blog/{blogId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Forum - read public, write authenticated
    match /forum/{forumId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                             (request.auth.uid == resource.data.authorId || 
                              request.auth.token.admin == true);
    }
    
    // Forum Replies
    match /forum/{forumId}/replies/{replyId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                             request.auth.uid == resource.data.authorId;
    }
  }
}
```

### 5. Firestore Indexes

Create composite indexes for queries:

1. **News by category and date:**
   - Collection: `news`
   - Fields: `category` (Ascending), `publishedAt` (Descending)

2. **Forum by category and date:**
   - Collection: `forum`
   - Fields: `category` (Ascending), `createdAt` (Descending)

### 6. Admin Panel (Future Enhancement)

For posting news and blogs, you can:
- Use Firebase Admin SDK in API routes
- Create protected admin pages with authentication
- Use Firebase Console directly to add documents

### 7. Authentication Setup (Optional)

If you want user authentication for forum posting:

```bash
# Enable Authentication in Firebase Console
# Enable Email/Password and/or Google Sign-in
```

Update the forum to use real user auth instead of demo user.

## 📄 Pages Available

- `/news` - News & Research articles
- `/blog` - Blog posts and tutorials  
- `/forum` - Community forum and support tickets

## 🚀 Next Steps

1. Set up Firebase project and get credentials
2. Configure environment variables
3. Set Firestore security rules
4. Create indexes
5. Add initial content via Firebase Console
6. (Optional) Add authentication for user accounts
7. (Optional) Build admin panel for content management
