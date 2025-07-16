import { ENV_CONFIG } from '@/config/environment';

export interface DemoUser {
  uid: string;
  email: string;
  displayName?: string;
}

// Demo authentication service
class DemoAuthService {
  private currentUser: DemoUser | null = null;
  private authStateListeners: ((user: DemoUser | null) => void)[] = [];

  // Sign in with demo credentials
  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    if (email === ENV_CONFIG.DEMO_CREDENTIALS.email && password === ENV_CONFIG.DEMO_CREDENTIALS.password) {
      this.currentUser = {
        uid: 'demo-user-123',
        email: email,
        displayName: 'Demo Admin'
      };
      
      // Notify listeners
      this.authStateListeners.forEach(listener => listener(this.currentUser));
      
      return { success: true };
    } else {
      return { success: false, error: 'Invalid credentials. Use admin@demo.com / demo123' };
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    this.currentUser = null;
    this.authStateListeners.forEach(listener => listener(null));
  }

  // Get current user
  getCurrentUser(): DemoUser | null {
    return this.currentUser;
  }

  // Listen to auth state changes
  onAuthStateChanged(listener: (user: DemoUser | null) => void): () => void {
    this.authStateListeners.push(listener);
    
    // Call immediately with current state
    listener(this.currentUser);
    
    // Return unsubscribe function
    return () => {
      const index = this.authStateListeners.indexOf(listener);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }
}

export const demoAuthService = new DemoAuthService(); 