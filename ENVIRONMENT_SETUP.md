# Environment Configuration

This application supports two modes: **Demo Mode** and **Production Mode** (Firebase).

## Demo Mode (Default)

Demo mode is enabled by default in development (`NODE_ENV=development`). It provides:
- Local authentication with demo credentials
- In-memory product storage
- Simulated Firebase operations
- No external dependencies
- **Login form** is shown in the admin panel

### Demo Credentials
- **Email**: `admin@demo.com`
- **Password**: `demo123`

## Production Mode (Firebase)

Production mode uses Firebase for:
- Real authentication
- Firestore database
- Firebase Storage for images
- Real-time updates
- **No login form** - uses Firebase authentication directly

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Environment Configuration
# Set to 'true' for demo mode, 'false' for production (Firebase)
VITE_DEMO_MODE=true

# Firebase Configuration (for production mode)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Node Environment
NODE_ENV=development
```

### Switching Modes

1. **Demo Mode**: Set `VITE_DEMO_MODE=true` or use `NODE_ENV=development`
2. **Production Mode**: Set `VITE_DEMO_MODE=false` and configure Firebase variables

### Development vs Production

- **Development** (`NODE_ENV=development`): Automatically uses demo mode with login form
- **Production** (`NODE_ENV=production`): Uses Firebase authentication (no login form)

## Features by Mode

| Feature | Demo Mode | Production Mode |
|---------|-----------|-----------------|
| Authentication | Local demo | Firebase Auth |
| Login Form | ✅ Shown | ❌ Hidden |
| Product Storage | In-memory | Firestore |
| Image Upload | Placeholder URLs | Firebase Storage |
| Real-time Updates | Simulated | Real-time |
| Data Persistence | Session only | Permanent |

## Switching Between Modes

1. **To Demo Mode**: Set `VITE_DEMO_MODE=true` in `.env`
2. **To Production Mode**: 
   - Set `VITE_DEMO_MODE=false` in `.env`
   - Configure Firebase variables
   - Set up Firebase project

## Admin Panel Behavior

### Demo Mode
- Shows login form with demo credentials
- Displays "Mode: Demo" in the header
- Uses local authentication

### Production Mode
- **No login form** - redirects to Firebase auth
- Shows "Mode: Production" in the header
- Requires Firebase authentication setup

## Benefits

- **Development**: Fast iteration, no external dependencies
- **Testing**: Consistent demo data for testing
- **Production**: Scalable, real-time, persistent data
- **Deployment**: Easy switching between environments 