# Firebase Setup Guide for Admin Panel

This guide will help you set up Firebase for your e-commerce admin panel.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "yd-bloom-admin")
4. Follow the setup wizard (you can disable Google Analytics if not needed)
5. Click "Create project"

## Step 2: Enable Firebase Services

### Enable Authentication
1. In Firebase Console, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

### Enable Firestore Database
1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

### Enable Storage
1. Go to "Storage" in the left sidebar
2. Click "Get started"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In Firebase Console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "YD Bloom Admin")
6. Copy the Firebase config object

## Step 4: Update Firebase Configuration

1. Open `src/services/firebase.ts`
2. Replace the placeholder config with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 5: Create Admin User

1. In Firebase Console, go to "Authentication" → "Users"
2. Click "Add user"
3. Enter admin email and password
4. Click "Add user"

## Step 6: Set Up Security Rules (Optional but Recommended)

### Firestore Rules
Go to Firestore Database → Rules and update to:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules
Go to Storage → Rules and update to:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 7: Test the Admin Panel

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:5173/admin`
3. Login with your admin credentials
4. Try adding a product to test the functionality

## Features Available

✅ **Product Management**
- Add new products with images
- Edit existing products
- Delete products
- Upload images to Firebase Storage

✅ **Authentication**
- Secure admin login
- Protected admin routes
- Session management

✅ **Real-time Updates**
- Products automatically sync across the site
- No need to manually update `products.ts`

✅ **Image Management**
- Automatic image upload to Firebase Storage
- Image preview before upload
- Automatic image deletion when products are deleted

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/user-not-found)"**
   - Make sure you created an admin user in Firebase Authentication

2. **"Firebase: Error (auth/wrong-password)"**
   - Check your password in Firebase Authentication

3. **"Firebase: Error (storage/unauthorized)"**
   - Check your Storage security rules

4. **"Firebase: Error (firestore/permission-denied)"**
   - Check your Firestore security rules

### Getting Help:
- Check Firebase Console for error logs
- Verify your Firebase config is correct
- Ensure all Firebase services are enabled

## Next Steps

After setup, you can:
1. Add products through the admin panel
2. Customize the product fields as needed
3. Set up additional security rules for production
4. Add more admin features like order management 