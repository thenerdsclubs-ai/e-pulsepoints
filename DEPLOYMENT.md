# Production Deployment Guide

## 🚀 Deploy to Firebase

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Initialize Firebase (Already Done)
The project is already configured with:
- `firebase.json` - Firebase configuration
- `firestore.rules` - Security rules
- `firestore.indexes.json` - Database indexes
- `.firebaserc` - Project settings

### Step 4: Deploy Firestore Rules & Indexes
```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### Step 5: Set Up Admin Access

#### Option 1: Using Firebase Console (Recommended)
1. Go to [Firebase Console](https://console.firebase.google.com/project/epulsepoints-website)
2. Navigate to **Authentication** → Enable **Email/Password** provider
3. Add admin user:
   - Click **Add user**
   - Email: `admin@epulsepoints.com` (or your email)
   - Password: Create a strong password
4. Create admin collection:
   - Go to **Firestore Database**
   - Create collection: `admins`
   - Add document with ID = the user UID from Authentication
   - Fields: `{ isAdmin: true, email: "admin@epulsepoints.com" }`

#### Option 2: Using Firebase Admin SDK (Advanced)
```bash
# Install Firebase Admin SDK
npm install firebase-admin --save-dev
```

Create `scripts/setAdminClaim.js`:
```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const email = 'admin@epulsepoints.com';

admin.auth().getUserByEmail(email)
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: true });
  })
  .then(() => {
    console.log('Admin claim set successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
```

Run: `node scripts/setAdminClaim.js`

### Step 6: Build for Production
```bash
npm run build
```

### Step 7: Deploy to Vercel/Netlify (Next.js Hosting)

#### Vercel (Recommended for Next.js):
```bash
npm install -g vercel
vercel
```

#### Or use Vercel Dashboard:
1. Connect GitHub repository
2. Import project
3. Deploy automatically

### Step 8: Environment Variables (Production)

Add to Vercel/Netlify dashboard (if using env variables):
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAfJqvLiGDD0fh6a_OMgvksJgx3x0nHtPM
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=epulsepoints-website.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=epulsepoints-website
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=epulsepoints-website.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=62943682240
NEXT_PUBLIC_FIREBASE_APP_ID=1:62943682240:web:80c73a4d310036a2d09725
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-3G8P117R88
```

## 🔒 Security Checklist

✅ Firestore security rules deployed
✅ Authentication enabled
✅ Admin access configured
✅ Indexes created for query optimization
✅ Environment variables secured (if applicable)

## 📊 Admin Access Emails

The following emails have admin access (configured in firestore.rules):
- `admin@ecgkid.com`
- `rajka@ecgkid.com`
- `ecgkidportal@gmail.com`

## 🎯 Quick Deploy Commands

```bash
# Deploy everything
firebase deploy

# Deploy only rules
firebase deploy --only firestore:rules

# Deploy only indexes
firebase deploy --only firestore:indexes

# Check deployment status
firebase projects:list
```

## 🔧 Post-Deployment Tasks

1. **Test Admin Login**: Visit `/admin` and sign in
2. **Create Sample Content**: Post test article/blog
3. **Verify Forum**: Create test topic
4. **Check Analytics**: Verify Firebase Analytics working
5. **Monitor**: Set up Firebase Performance Monitoring

## 📱 URLs

- **Production**: `https://ecgkid.com`
- **Firebase Console**: https://console.firebase.google.com/project/epulsepoints-website
- **Admin Panel**: `https://ecgkid.com/admin`

## 🆘 Troubleshooting

### "Missing or insufficient permissions"
- Check Firestore rules are deployed
- Verify user is authenticated
- Check admin collection exists

### "Index not found"
- Run: `firebase deploy --only firestore:indexes`
- Wait 2-3 minutes for indexes to build

### "Auth not enabled"
- Enable Email/Password in Firebase Console → Authentication → Sign-in method
