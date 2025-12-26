# Development Setup Guide

## API Endpoint Issue

The wellness recommendation API uses Vercel Edge Functions (`/api/wellness`). This requires special setup for local development.

## Option 1: Use Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Link your project** (if not already linked):
   ```bash
   vercel link
   ```

4. **Run development server with Vercel**:
   ```bash
   vercel dev
   ```

   This will:
   - Start the Vite dev server
   - Handle Edge Functions automatically
   - Use environment variables from `.env.local`

## Option 2: Local Development Server

If you can't use Vercel CLI, you can create a simple local API server:

1. **Create a local API server** (see `scripts/dev-api-server.js`)

2. **Run both servers**:
   ```bash
   # Terminal 1: Run Vite dev server
   npm run dev

   # Terminal 2: Run API server
   node scripts/dev-api-server.js
   ```

## Option 3: Deploy to Vercel

The easiest solution is to deploy to Vercel:

1. **Push to GitHub**
2. **Import to Vercel**
3. **Set environment variables** in Vercel dashboard:
   - `GEMINI_API_KEY` or `DEEPSEEK_API_KEY`
4. **Deploy**

The API will work automatically in production.

## Environment Variables

Create `.env.local` in the project root:

```env
# For Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# OR for DeepSeek API
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# OR generic (auto-detected)
API_KEY=your_api_key_here
```

## Troubleshooting

### Error: "Unable to connect to the wellness guide"

This means the `/api/wellness` endpoint is not available. Solutions:

1. **Use Vercel CLI**: Run `vercel dev` instead of `npm run dev`
2. **Check API key**: Ensure your API key is set in `.env.local`
3. **Deploy to Vercel**: The API works automatically when deployed

### Error: "API key not configured"

1. Check that `.env.local` exists
2. Verify the API key variable name matches (`GEMINI_API_KEY` or `DEEPSEEK_API_KEY`)
3. Restart the dev server after adding environment variables

### Error: "Request timed out"

1. Check your internet connection
2. Verify the API key is valid
3. Check API service status (Gemini/DeepSeek)

## Testing the API

You can test the API endpoint directly:

```bash
curl -X POST http://localhost:3000/api/wellness \
  -H "Content-Type: application/json" \
  -d '{"answers":{"1":"low","2":"often","3":"poor","4":"poor","5":"high","6":"energy","7":"no"}}'
```

Expected response:
```json
{
  "recommendation": "Welcome. I've reviewed your answers..."
}
```

