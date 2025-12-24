# Vercel Deployment Guide

## Setting Up Environment Variables

Since `.env.local` files are not committed to git (for security), you need to configure environment variables directly in Vercel.

### Steps to Add Environment Variables in Vercel:

1. **Go to your Vercel Dashboard**
   - Navigate to: https://vercel.com/dashboard
   - Select your project: `chimdum`

2. **Open Project Settings**
   - Click on your project
   - Go to **Settings** → **Environment Variables**

3. **Add the Gemini API Key**
   - Click **Add New**
   - **Name:** `GEMINI_API_KEY`
   - **Value:** `AIzaSyAUWC2nvn8-2Pn_92wvN94krs5w-sCTzZY` (your actual API key)
   - **Environment:** Select all (Production, Preview, Development)
   - Click **Save**

4. **Redeploy**
   - After adding the environment variable, go to **Deployments**
   - Click the **⋯** menu on the latest deployment
   - Select **Redeploy**
   - Or push a new commit to trigger automatic redeployment

### Alternative: Using Vercel CLI

You can also set environment variables using the Vercel CLI:

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Set environment variable
vercel env add GEMINI_API_KEY
# When prompted, enter your API key: AIzaSyAUWC2nvn8-2Pn_92wvN94krs5w-sCTzZY
# Select all environments (Production, Preview, Development)
```

### Required Environment Variables

- **GEMINI_API_KEY** (Required)
  - Your Gemini API key from https://ai.google.dev/
  - Example: `AIzaSyAUWC2nvn8-2Pn_92wvN94krs5w-sCTzZY`

### Optional Environment Variables

- **API_TIMEOUT** (Optional)
  - Default: `30000` (30 seconds)
  - API request timeout in milliseconds

- **API_RETRY_ATTEMPTS** (Optional)
  - Default: `3`
  - Number of retry attempts for failed API calls

### Verifying Environment Variables

After adding the environment variable and redeploying, you can verify it's working by:

1. Check the deployment logs in Vercel
2. The app should load without the "Configuration Error" message
3. You should be able to use both text and voice assessments

### Troubleshooting

**If you still see the configuration error:**

1. Make sure the environment variable name is exactly `GEMINI_API_KEY` (case-sensitive)
2. Ensure it's enabled for all environments (Production, Preview, Development)
3. Redeploy the application after adding the variable
4. Check that the API key value doesn't have extra spaces or quotes

**If the build fails:**

- Check that all dependencies are installed correctly
- Verify that `.npmrc` is configured properly (should have `legacy-peer-deps=true`)
- Check the build logs in Vercel for specific error messages

