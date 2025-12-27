# How to Get Firebase Service Account Key

## Step 1: Go to Firebase Console

1. Visit: https://console.firebase.google.com/
2. Select your **epulsepoints-website** project

## Step 2: Access Project Settings

1. Click the **gear icon** ⚙️ next to "Project Overview"
2. Select **Project settings**

## Step 3: Navigate to Service Accounts

1. Click the **Service accounts** tab at the top
2. You'll see "Firebase Admin SDK" section

## Step 4: Generate New Private Key

1. Scroll down to **Firebase Admin SDK** section
2. Make sure **Node.js** is selected
3. Click **Generate new private key** button
4. A popup will warn you to keep it secure
5. Click **Generate key**

## Step 5: Save the File

1. A JSON file will download (e.g., `epulsepoints-website-firebase-adminsdk-xxxxx.json`)
2. **Rename it to:** `firebase-service-account.json`
3. **Move it to:** `C:\Users\rajka\epulsepoints-website\` (your project root)

## Important Security Notes

⚠️ **CRITICAL:**
- This file contains sensitive credentials
- **NEVER** commit it to Git
- It's already in `.gitignore`
- Keep it secure on your local machine only

## Verify It's in the Right Place

Run this command to check:
```powershell
Test-Path .\firebase-service-account.json
```

Should return: `True`

## Visual Guide

```
Your project structure should look like:
epulsepoints-website/
├── firebase-service-account.json  ← Put it here!
├── package.json
├── scripts/
│   └── migrate-firestore-to-files.js
└── content/
    └── articles/
```

## After You Have the File

Run the migration:
```bash
node scripts/migrate-firestore-to-files.js
```

This will:
- ✅ Export ALL your existing blog posts from Firestore
- ✅ Convert them to MDX files
- ✅ Save them in `content/articles/`
- ✅ Preserve all images, metadata, and content
- ✅ Keep your ECG images safe

---

**Estimated Time:** 5 minutes

**Next Step:** Once you have the file, run the migration script!
