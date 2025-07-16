// Environment configuration
export const ENV_CONFIG = {
  // Simple demo mode: true = demo, false = production (Firebase)
  DEMO_MODE: true, // Change this to false for production
  
  // Demo credentials
  DEMO_CREDENTIALS: {
    email: 'admin@demo.com',
    password: 'demo123'
  }
};

// Helper functions
export const isDemoMode = () => ENV_CONFIG.DEMO_MODE;
export const isProductionMode = () => !ENV_CONFIG.DEMO_MODE;

// Environment info
export const getEnvironmentInfo = () => ({
  mode: isDemoMode() ? 'demo' : 'production',
  demoMode: ENV_CONFIG.DEMO_MODE
}); 