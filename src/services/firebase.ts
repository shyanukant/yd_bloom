import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';

// Your Firebase configuration
// Replace with your actual Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Demo admin credentials for testing
const DEMO_CREDENTIALS = {
  email: 'admin@demo.com',
  password: 'demo123'
};

// Demo user state
let demoUser: any = null;

// Authentication functions
export const signIn = async (email: string, password: string) => {
  try {
    // Demo login for testing
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      demoUser = { uid: 'demo-user', email };
      return { success: true, user: demoUser };
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signOutUser = async () => {
  try {
    // Clear demo user if logged in
    if (demoUser) {
      demoUser = null;
      return { success: true };
    }
    
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = (): User | null => {
  // Return demo user if available
  if (demoUser) {
    return demoUser;
  }
  return auth.currentUser;
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  // For demo purposes, immediately call with demo user if available
  if (demoUser) {
    callback(demoUser);
  }
  
  return onAuthStateChanged(auth, callback);
}; 