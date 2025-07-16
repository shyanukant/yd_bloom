import { isDemoMode } from '@/config/environment';
import { demoAuthService, DemoUser } from './demoAuthService';
import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged as firebaseOnAuthStateChanged, User, getAuth, updatePassword as firebaseUpdatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from './firebase';

// Unified user interface
export interface AuthUser {
  uid: string;
  email: string;
  displayName?: string;
}

// Convert Firebase User to AuthUser
const convertFirebaseUser = (user: User | null): AuthUser | null => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || undefined
  };
};

// Unified authentication service
export const authService = {
  // Sign in
  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    if (isDemoMode()) {
      return demoAuthService.signIn(email, password);
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true };
      } catch (error: any) {
        return { 
          success: false, 
          error: error.message || 'Authentication failed' 
        };
      }
    }
  },

  // Sign out
  async signOut(): Promise<void> {
    if (isDemoMode()) {
      return demoAuthService.signOut();
    } else {
      return firebaseSignOut(auth);
    }
  },

  // Get current user
  getCurrentUser(): AuthUser | null {
    if (isDemoMode()) {
      const demoUser = demoAuthService.getCurrentUser();
      return demoUser ? {
        uid: demoUser.uid,
        email: demoUser.email,
        displayName: demoUser.displayName
      } : null;
    } else {
      const firebaseUser = auth.currentUser;
      return convertFirebaseUser(firebaseUser);
    }
  },

  // Listen to auth state changes
  onAuthStateChanged(listener: (user: AuthUser | null) => void): () => void {
    if (isDemoMode()) {
      return demoAuthService.onAuthStateChanged((demoUser) => {
        const user = demoUser ? {
          uid: demoUser.uid,
          email: demoUser.email,
          displayName: demoUser.displayName
        } : null;
        listener(user);
      });
    } else {
      return firebaseOnAuthStateChanged(auth, (firebaseUser) => {
        const user = convertFirebaseUser(firebaseUser);
        listener(user);
      });
    }
  },

  // Re-authenticate user
  async reauthenticate(email: string, currentPassword: string): Promise<void> {
    if (isDemoMode()) {
      // No-op for demo
      return;
    } else {
      const user = getAuth().currentUser;
      if (!user) throw new Error('No user');
      const cred = EmailAuthProvider.credential(email, currentPassword);
      await reauthenticateWithCredential(user, cred);
    }
  },

  // Update password
  async updatePassword(newPassword: string): Promise<void> {
    if (isDemoMode()) {
      // No-op for demo
      return;
    } else {
      const user = getAuth().currentUser;
      if (!user) throw new Error('No user');
      await firebaseUpdatePassword(user, newPassword);
    }
  }
}; 