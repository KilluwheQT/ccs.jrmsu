# CCS Forum - Deployment Guide

This guide provides step-by-step instructions for deploying the CCS Forum application to Vercel.

## 🚀 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Vercel account
- Firebase project

## 📋 Pre-deployment Checklist

### 1. Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Enter project name (e.g., "ccs-forum")
   - Follow the setup wizard

2. **Enable Authentication**
   - In Firebase Console, go to "Authentication"
   - Click "Get started"
   - Go to "Sign-in method" tab
   - Enable "Email/Password" provider

3. **Enable Firestore Database**
   - In Firebase Console, go to "Firestore Database"
   - Click "Create database"
   - Choose "Start in test mode" (for development)
   - Select a location close to your users

4. **Get Firebase Configuration**
   - In Firebase Console, go to "Project settings"
   - Scroll down to "Your apps" section
   - Click the web app icon (</>) to add a web app
   - Register your app and copy the configuration

### 2. Update Firebase Configuration

The application is already configured with the provided Firebase credentials. If you want to use your own Firebase project:

1. Open `src/firebase/config.js`
2. Replace the `firebaseConfig` object with your own configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

### 3. Firestore Security Rules

Update your Firestore security rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all posts and comments
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /comments/{commentId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🚀 Deployment Steps

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Deploy to Vercel**
   ```bash
   vercel
   ```

5. **Follow the prompts**
   - Link to existing project or create new
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Deploy

### Method 2: Vercel Dashboard

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Deploy

### Method 3: GitHub Integration

1. **Fork or clone the repository**
2. **Push to your GitHub account**
3. **Connect to Vercel**
   - Vercel will automatically detect it's a Vite project
   - Configure environment variables if needed
   - Deploy

## 🔧 Environment Variables

If using your own Firebase project, add these environment variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add the following variables:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 📊 Post-Deployment

### 1. Test the Application

1. **Visit your deployed URL**
2. **Test authentication**
   - Try signing up with a new account
   - Try logging in
   - Test logout functionality

3. **Test forum features**
   - Create a new post
   - Add comments
   - Verify real-time updates

### 2. Seed Demo Data (Optional)

To populate your Firestore with demo data:

1. **Run the seeding script**
   ```bash
   node scripts/seed-data.js
   ```

2. **Verify data in Firebase Console**
   - Go to Firestore Database
   - Check that posts and comments were added

### 3. Custom Domain (Optional)

1. **Add custom domain in Vercel**
   - Go to project settings
   - Navigate to "Domains"
   - Add your custom domain
   - Configure DNS settings

## 🔍 Troubleshooting

### Common Issues

1. **Build fails**
   - Check Node.js version (should be 16+)
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for syntax errors in code

2. **Firebase connection issues**
   - Verify Firebase configuration
   - Check Firestore security rules
   - Ensure Authentication is enabled

3. **Authentication not working**
   - Verify Firebase Auth is enabled
   - Check email/password provider is active
   - Review browser console for errors

4. **Forum posts not loading**
   - Check Firestore security rules
   - Verify collection names match
   - Check network tab for API errors

### Debug Steps

1. **Check browser console**
   - Look for JavaScript errors
   - Check network requests

2. **Check Vercel logs**
   - Go to Vercel dashboard
   - Check "Functions" tab for serverless function logs

3. **Check Firebase logs**
   - Go to Firebase Console
   - Check "Functions" for any deployed functions

## 📈 Performance Optimization

### 1. Enable Caching

The `vercel.json` file includes caching headers for static assets:

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. Image Optimization

- Use WebP format for images
- Optimize images before uploading
- Consider using a CDN for large assets

### 3. Code Splitting

Vue Router automatically handles code splitting for routes.

## 🔒 Security Considerations

1. **Firestore Security Rules**
   - Implement proper access control
   - Validate data on the server side
   - Use authentication checks

2. **Environment Variables**
   - Never commit sensitive data to Git
   - Use Vercel environment variables
   - Rotate API keys regularly

3. **Authentication**
   - Enable email verification
   - Implement password strength requirements
   - Consider adding 2FA

## 📞 Support

If you encounter issues:

1. **Check the documentation**
2. **Review Firebase and Vercel documentation**
3. **Create an issue in the repository**
4. **Contact the development team**

---

**Happy Deploying! 🚀**
