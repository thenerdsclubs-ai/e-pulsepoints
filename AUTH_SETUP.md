# 🔐 Authentication Setup - Complete Guide

## ✅ What's Been Configured

1. **Email/Password Authentication** - Users can create accounts and login
2. **Google Sign-In** - One-click authentication with Google
3. **Admin Access** - Special privileges for admin emails
4. **User Profiles** - Automatic profile creation in Firestore

---

## 🚀 Enable Authentication in Firebase Console

### Step 1: Enable Email/Password Provider

1. Go to [Firebase Authentication](https://console.firebase.google.com/project/epulsepoints-website/authentication/providers)
2. Click **Get Started** (if first time)
3. Click **Email/Password**
4. Toggle **Enable** to ON
5. Click **Save**

### Step 2: Enable Google Sign-In Provider

1. In the same **Sign-in providers** page
2. Click **Google**
3. Toggle **Enable** to ON
4. **Project support email**: Select `ecgkidportal@gmail.com` (or your email)
5. Click **Save**

### Step 3: Add Authorized Domains (for production)

1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Add your production domain: `ecgkid.com`
3. `localhost` is already authorized for development

---

## 👤 Create Admin User (ecgkidportal@gmail.com)

### Option 1: Firebase Console (Recommended)

1. Go to [Authentication Users](https://console.firebase.google.com/project/epulsepoints-website/authentication/users)
2. Click **Add User**
3. Enter:
   - **Email**: `ecgkidportal@gmail.com`
   - **Password**: `vandatta` (or use a more secure password!)
4. Click **Add User**
5. **Copy the User UID** (you'll need it next)

### Option 2: Self Sign-Up (Easier)

1. Visit `http://localhost:3000/login`
2. Click **"Don't have an account? Sign up"**
3. Enter:
   - **Display Name**: Admin
   - **Email**: `ecgkidportal@gmail.com`
   - **Password**: `vandatta`
4. Click **Create Account**

---

## 🔑 Grant Admin Privileges

Go to [Firestore Database](https://console.firebase.google.com/project/epulsepoints-website/firestore/databases/-default-/data):

1. Look for the `admins` collection (create if doesn't exist)
2. Click **Add document**
3. **Document ID**: Paste the User UID from above
4. Add fields:
   ```
   Field: isAdmin
   Type: boolean
   Value: true
   
   Field: email
   Type: string
   Value: ecgkidportal@gmail.com
   ```
5. Click **Save**

**Note**: The email `ecgkidportal@gmail.com` is already configured as admin in the Firestore rules, so admin privileges will work automatically!

---

## 📱 Pages Available

### Public Pages
- **`/login`** - Beautiful login/signup page with Google Sign-In
- **`/news`** - News & Research
- **`/blog`** - Blog posts
- **`/forum`** - Community forum

### Protected Pages
- **`/admin`** - Admin dashboard (requires admin email)

---

## 🎯 Admin Emails (Auto-Configured)

The following emails have automatic admin access:
- ✅ `ecgkidportal@gmail.com` (with password: `vandatta`)
- ✅ `admin@ecgkid.com`
- ✅ `rajka@ecgkid.com`

---

## 🧪 Test Authentication

### Test Email Login:
1. Visit `http://localhost:3000/login`
2. Click **Sign up**
3. Create account with any email
4. Should redirect to homepage

### Test Google Sign-In:
1. Visit `http://localhost:3000/login`
2. Click **Continue with Google**
3. Select Google account
4. Should redirect to homepage

### Test Admin Access:
1. Visit `http://localhost:3000/admin`
2. Sign in with `ecgkidportal@gmail.com`
3. Should see admin dashboard

---

## 🔒 Security Features

✅ **Password Requirements**: Minimum 6 characters
✅ **Email Verification**: Can be enabled in Firebase Console
✅ **Google OAuth**: Secure authentication flow
✅ **User Profiles**: Automatic creation in Firestore
✅ **Admin Protection**: Firestore rules enforce admin access
✅ **Session Management**: Persistent login with Firebase Auth

---

## 🎨 UI Features

### Login Page (`/login`):
- Modern gradient background
- Email/Password authentication
- Google Sign-In button
- Toggle between Sign In/Sign Up
- Error handling with friendly messages
- Loading states
- Responsive design

### Admin Page (`/admin`):
- Beautiful login form
- Google Sign-In integration
- Admin verification
- Access denied screen for non-admins
- User session display
- Sign out functionality

---

## 🔧 Advanced Configuration (Optional)

### Enable Email Verification:
```javascript
// In your sign-up flow
import { sendEmailVerification } from 'firebase/auth';

await sendEmailVerification(userCredential.user);
```

### Add Password Reset:
```javascript
// Add to login page
import { sendPasswordResetEmail } from 'firebase/auth';

await sendPasswordResetEmail(auth, email);
```

### Enable Multi-Factor Authentication:
1. Go to Firebase Console → Authentication → Settings
2. Enable **Multi-factor authentication**

---

## 🚀 Quick Start Commands

```bash
# Start development server
npm run dev

# Deploy updated rules
npx firebase-tools deploy --only firestore:rules

# Check authentication status
npx firebase-tools auth:export users.json
```

---

## 📊 What Happens on Sign Up

1. User creates account (email or Google)
2. Firebase Authentication creates user
3. User profile created in Firestore `users` collection:
   ```javascript
   {
     email: "user@example.com",
     displayName: "User Name",
     createdAt: Timestamp,
     photoURL: "https://..." // from Google
   }
   ```
4. If email is admin email, Firestore rules grant admin access
5. User redirected to homepage

---

**🎉 Authentication is now fully configured!**

Visit `/login` to test it out!
