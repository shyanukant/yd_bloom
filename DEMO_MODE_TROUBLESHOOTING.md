# Demo Mode Setup Guide

## 🎯 Simple Configuration

Just set one environment variable in your `.env` file:

```env
VITE_DEMO_MODE=true    # Demo mode (login form, localStorage)
VITE_DEMO_MODE=false   # Production mode (Firebase auth)
```

## 🔧 Quick Setup

### Step 1: Create `.env` File

Create a `.env` file in your root directory:

```env
VITE_DEMO_MODE=true
```

### Step 2: Restart Server

```bash
npm run dev
```

### Step 3: Test

- Go to `/admin`
- Should see login form
- Use: `admin@demo.com` / `demo123`

## 🎯 Demo Mode Features

When `VITE_DEMO_MODE=true`:
- ✅ **Login form** visible in admin panel
- ✅ **Demo credentials** shown
- ✅ **localStorage** for data storage
- ✅ **No Firebase** required

## 🚀 Production Mode Features

When `VITE_DEMO_MODE=false`:
- ✅ **Firebase authentication** required
- ✅ **No login form** (redirects to Firebase)
- ✅ **Real database** (Firestore)
- ✅ **Real storage** (Firebase Storage)

## 🧪 Testing

### Demo Mode Test
1. Set `VITE_DEMO_MODE=true`
2. Go to `/admin`
3. Should see login form
4. Login with `admin@demo.com` / `demo123`

### Production Mode Test
1. Set `VITE_DEMO_MODE=false`
2. Configure Firebase
3. Go to `/admin`
4. Should redirect to Firebase auth

## ✅ Success Indicators

**Demo Mode Working:**
- Login form visible
- "Mode: Demo" in header
- Can login with demo credentials
- Products stored in localStorage

**Production Mode Working:**
- No login form
- "Mode: Production" in header
- Firebase authentication required

---

**That's it! Simple true/false logic. No complex configurations.** 