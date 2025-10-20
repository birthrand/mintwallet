# MintWallet Setup Guide

## Environment Variables

This project requires Firebase configuration. Create a `.env` file in the root directory with the following variables:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Getting Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (mintwallet-app)
3. Click on the gear icon → Project Settings
4. Under "Your apps", select your web app
5. Copy the configuration values

### For Vercel Deployment

Add these environment variables in your Vercel project settings:
1. Go to https://vercel.com/your-team/mintwallet/settings/environment-variables
2. Add each variable from above
3. Redeploy the application

## Running the App

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Seed database with sample data
npm run seed
```

## Security Note

⚠️ Never commit your `.env` file to version control. It's already included in `.gitignore`.
