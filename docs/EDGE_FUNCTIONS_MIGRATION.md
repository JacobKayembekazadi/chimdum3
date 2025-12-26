# Edge Functions Migration Guide

## Overview

We've migrated the wellness recommendation API from client-side to Vercel Edge Functions for better security and to fix the 400 error.

## Why Edge Functions?

1. **Security**: API keys are no longer exposed in client-side code
2. **Error Fix**: The 400 error was likely due to API key exposure or CORS issues
3. **Better Performance**: Edge Functions run closer to users
4. **Cost Effective**: Server-side rate limiting and caching

## Changes Made

### 1. Created Edge Function (`api/wellness.ts`)

- Handles wellness recommendation requests server-side
- Keeps API key secure in environment variables
- Uses the same SYSTEM_PROMPT and QUESTIONS as client-side

### 2. Updated Client Service (`services/geminiService.ts`)

- Now calls `/api/wellness` endpoint instead of directly calling Gemini API
- Removed API key dependency from client-side code
- Maintains same interface for backward compatibility

### 3. Updated Vite Config (`vite.config.ts`)

- Removed API key exposure in `define` configuration
- API keys are now only used server-side

## Voice Assessment

**Note**: Voice assessment (`VoiceAssessment.tsx`) still requires client-side API key access because:

- Gemini Live API requires direct WebSocket connection from browser
- Cannot be proxied through Edge Functions easily
- This is a known limitation for real-time voice features

**Future Solution**: Consider creating a token-based authentication system where:

1. Client requests a temporary token from Edge Function
2. Client uses token to authenticate with Gemini Live API
3. Token expires after session ends

## Environment Variables

### Required in Vercel

- `GEMINI_API_KEY` - Your Gemini API key (set in Vercel dashboard)

### Local Development

Create `.env.local`:

```
GEMINI_API_KEY=your_api_key_here
```

## Testing

1. **Local Testing**:

   ```bash
   npm run dev
   # Edge Functions work automatically with Vercel CLI
   ```

2. **Production**:
   - Deploy to Vercel
   - Set `GEMINI_API_KEY` in Vercel environment variables
   - Test the wellness recommendation flow

## API Endpoint

### POST `/api/wellness`

**Request**:

```json
{
  "answers": {
    "1": "low",
    "2": "often",
    "3": "poor",
    "4": "poor",
    "5": "high",
    "6": "energy",
    "7": "no"
  }
}
```

**Response**:

```json
{
  "recommendation": "Welcome. I've reviewed your answers..."
}
```

**Error Response**:

```json
{
  "error": "Unable to generate recommendation",
  "details": "Error details (development only)"
}
```

## Benefits

✅ **Security**: API keys never exposed to clients
✅ **Reliability**: Better error handling and retry logic
✅ **Performance**: Edge Functions run globally
✅ **Cost**: Server-side rate limiting prevents abuse
✅ **Maintainability**: Centralized API logic

## Migration Checklist

- [x] Create Edge Function for wellness recommendations
- [x] Update client service to use Edge Function
- [x] Remove API key from Vite config
- [ ] Test locally with Vercel CLI
- [ ] Deploy to Vercel
- [ ] Set environment variables in Vercel
- [ ] Test production deployment
- [ ] Update documentation
- [ ] Consider token-based auth for voice (future)

## Troubleshooting

### 400 Error

- Check that `GEMINI_API_KEY` is set in Vercel
- Verify API key is valid and has proper permissions
- Check Edge Function logs in Vercel dashboard

### CORS Issues

- Edge Functions handle CORS automatically
- No additional configuration needed

### API Key Not Found

- Ensure `.env.local` exists for local development
- Verify environment variable is set in Vercel dashboard
- Check variable name is exactly `GEMINI_API_KEY`

