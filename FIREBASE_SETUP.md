# Firebase Setup Guide for NoteGenie

## Step 1: Create Firebase Project

1. **Go to Firebase Console:**
   - Visit [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Click "Create a project"

2. **Project Setup:**
   - Enter project name: `NoteGenie` (or your preferred name)
   - Enable Google Analytics (optional)
   - Click "Create project"

## Step 2: Enable Authentication

1. **Navigate to Authentication:**
   - In Firebase Console, go to "Authentication" → "Sign-in method"

2. **Enable Email/Password:**
   - Click "Email/Password"
   - Enable "Email/Password"
   - Click "Save"

3. **Enable Google Sign-in:**
   - Click "Google"
   - Enable "Google"
   - Add your authorized domain (localhost for development)
   - Click "Save"

## Step 3: Create Firestore Database

1. **Navigate to Firestore:**
   - Go to "Firestore Database" → "Create database"

2. **Security Rules:**
   - Choose "Start in test mode" (we'll update rules later)
   - Select a location close to your users
   - Click "Done"

3. **Update Security Rules:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users can only access their own data
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
         
         // User-specific books
         match /books/{bookId} {
           allow read, write: if request.auth != null && request.auth.uid == userId;
         }
         
         // User-specific notes
         match /notes/{noteId} {
           allow read, write: if request.auth != null && request.auth.uid == userId;
         }
       }
     }
   }
   ```

## Step 4: Enable Storage

1. **Navigate to Storage:**
   - Go to "Storage" → "Get started"

2. **Security Rules:**
   - Choose "Start in test mode"
   - Select a location
   - Click "Done"

3. **Update Storage Rules:**
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /users/{userId}/{allPaths=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

## Step 5: Get Configuration

1. **Project Settings:**
   - Click the gear icon → "Project settings"

2. **Web App Configuration:**
   - Scroll to "Your apps"
   - Click the web icon (</>)
   - Register app with name: `NoteGenie Web`
   - Copy the configuration

3. **Configuration Object:**
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

## Step 6: Configure Environment Variables

1. **Create `.env.local`:**
   ```bash
   cp env.example .env.local
   ```

2. **Add Firebase Config:**
   ```bash
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
   ```

## Step 7: Test the Integration

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Test Authentication:**
   - Go to `/auth`
   - Try signing up with email/password
   - Try signing in with Google
   - Check Firebase Console → Authentication → Users

3. **Test Database:**
   - Add books to your library
   - Check Firebase Console → Firestore → Data

## Features Implemented

### ✅ Authentication
- Email/Password sign-up and sign-in
- Google OAuth integration
- User profile creation
- Session management

### ✅ Database (Firestore)
- User-specific book library
- Note management
- User profiles and preferences
- Real-time data synchronization

### ✅ Storage
- File upload for notes
- Image upload for avatars
- Secure file access
- File validation and size limits

### ✅ Security
- User-specific data isolation
- Secure authentication
- Protected file access
- Environment-based configuration

## Troubleshooting

### "Firebase not initialized" error
- Check that all environment variables are set
- Restart the development server
- Verify Firebase config values

### Authentication errors
- Check Firebase Console → Authentication → Sign-in methods
- Ensure Email/Password and Google are enabled
- Verify authorized domains

### Database permission errors
- Check Firestore security rules
- Ensure rules allow user access to their data
- Test with authenticated user

### Storage upload errors
- Check Storage security rules
- Verify file size limits
- Ensure proper file types

## Next Steps

1. **Deploy to Production:**
   - Set up Firebase Hosting
   - Configure production domains
   - Update security rules for production

2. **Advanced Features:**
   - User roles and permissions
   - Advanced search functionality
   - Real-time collaboration
   - Push notifications

3. **Monitoring:**
   - Set up Firebase Analytics
   - Monitor usage and performance
   - Set up error tracking

Your NoteGenie app now has a complete Firebase backend with authentication, database, and file storage! 🚀 