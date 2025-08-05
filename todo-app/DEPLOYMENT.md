# Deployment Guide

## Prerequisites

1. **Firebase Project Setup**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Enable Authentication with Email/Password provider
   - Create a Firestore database

2. **Vercel Account**
   - Create an account at [Vercel](https://vercel.com/)
   - Install Vercel CLI: `npm install -g vercel`

## Step 1: Configure Firebase

### 1.1 Authentication Setup
1. Go to Firebase Console > Authentication > Sign-in method
2. Enable "Email/Password" provider
3. Add your domain to authorized domains (Vercel will provide this after deployment)

### 1.2 Firestore Database Setup
1. Go to Firebase Console > Firestore Database
2. Create database in production mode
3. Update security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### 1.3 Get Firebase Configuration
1. Go to Project Settings > General > Your apps
2. Click on the web app or create a new web app
3. Copy the Firebase configuration object

## Step 2: Deploy to Vercel

### 2.1 Using Vercel CLI

1. Login to Vercel:
   ```bash
   vercel login
   ```

2. Deploy the project:
   ```bash
   vercel --prod
   ```

3. Add environment variables:
   ```bash
   vercel env add REACT_APP_FIREBASE_API_KEY
   vercel env add REACT_APP_FIREBASE_AUTH_DOMAIN
   vercel env add REACT_APP_FIREBASE_PROJECT_ID
   vercel env add REACT_APP_FIREBASE_STORAGE_BUCKET
   vercel env add REACT_APP_FIREBASE_MESSAGING_SENDER_ID
   vercel env add REACT_APP_FIREBASE_APP_ID
   ```

4. Redeploy with environment variables:
   ```bash
   vercel --prod
   ```

### 2.2 Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Add environment variables in the "Environment Variables" section:
   - `REACT_APP_FIREBASE_API_KEY`
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`
   - `REACT_APP_FIREBASE_PROJECT_ID`
   - `REACT_APP_FIREBASE_STORAGE_BUCKET`
   - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
   - `REACT_APP_FIREBASE_APP_ID`
5. Deploy

### 2.3 Using GitHub Integration

1. Push your code to a GitHub repository
2. Connect your GitHub account to Vercel
3. Import the repository
4. Add environment variables
5. Deploy automatically on every push

## Step 3: Update Firebase Authorization

After deployment, add your Vercel domain to Firebase:

1. Go to Firebase Console > Authentication > Settings > Authorized domains
2. Add your Vercel domain (e.g., `your-app.vercel.app`)

## Step 4: Test Your Application

1. Visit your deployed URL
2. Test user registration
3. Test user login
4. Test todo CRUD operations
5. Test logout functionality

## Environment Variables Reference

Create a `.env.local` file in your project root:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Troubleshooting

### Common Issues

1. **Firebase Auth Domain Error**
   - Ensure your domain is added to authorized domains in Firebase Console

2. **Firestore Permission Denied**
   - Check that security rules are correctly configured
   - Ensure user is authenticated before accessing Firestore

3. **Environment Variables Not Working**
   - Ensure all environment variables start with `REACT_APP_`
   - Restart development server after adding new variables
   - Check Vercel dashboard for correct environment variable configuration

4. **Build Errors**
   - Run `npm run build` locally to check for issues
   - Ensure all dependencies are properly installed

### Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://reactjs.org/docs)

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Firebase Rules**: Always use proper security rules in production
3. **HTTPS**: Vercel automatically provides HTTPS
4. **API Keys**: Firebase API keys are safe to expose in client-side code as they're restricted by Firebase security rules

## Performance Optimization

1. **Code Splitting**: Already implemented with React Router
2. **Bundle Size**: Optimized during build process
3. **Caching**: Vercel automatically handles caching
4. **CDN**: Vercel provides global CDN