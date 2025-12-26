# API Testing Guide

## Current Status

The API endpoint `/api/wellness` is configured but may not work in local development without Vercel CLI.

## Testing Locally

### Option 1: Use Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Run dev server with API support
vercel dev
```

This will:
- Start your Vite dev server
- Handle `/api/wellness` endpoint properly
- Use environment variables from `.env.local`

### Option 2: Test API Directly

You can test the API endpoint directly with curl:

```bash
curl -X POST http://localhost:3000/api/wellness \
  -H "Content-Type: application/json" \
  -d '{
    "answers": {
      "1": "low",
      "2": "often",
      "3": "poor",
      "4": "poor",
      "5": "high",
      "6": "energy",
      "7": "no"
    }
  }'
```

## Production Deployment

**Yes, it will work in production!** Here's why:

1. ✅ **Runtime Changed**: Changed from `edge` to `nodejs` runtime for full compatibility
2. ✅ **Better Error Handling**: Added comprehensive error logging
3. ✅ **Fallback Models**: If `gemini-2.0-flash-exp` fails, tries `gemini-1.5-flash`
4. ✅ **CORS Headers**: Added for cross-origin requests
5. ✅ **Environment Variables**: Will work when set in Vercel dashboard

## What to Check in Production

1. **Environment Variables in Vercel**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Ensure `GEMINI_API_KEY` or `DEEPSEEK_API_KEY` is set
   - Make sure it's set for **Production**, **Preview**, and **Development** environments

2. **Check Vercel Function Logs**:
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on `/api/wellness`
   - Check the logs for any errors

3. **Test the Endpoint**:
   - After deployment, test: `https://your-domain.vercel.app/api/wellness`
   - Use the curl command above (replace localhost with your domain)

## Common Issues

### Issue: "API key not configured"
**Solution**: Set `GEMINI_API_KEY` or `DEEPSEEK_API_KEY` in Vercel environment variables

### Issue: "Unable to connect"
**Solution**: 
- In development: Use `vercel dev` instead of `npm run dev`
- In production: Check Vercel function logs for detailed errors

### Issue: "Empty response from API"
**Solution**: 
- Check API key is valid
- Check Vercel function logs
- Try a different model (code has fallback to `gemini-1.5-flash`)

## Debugging

The API now includes extensive logging:
- Logs when request is received
- Logs which provider is being used
- Logs API call attempts
- Logs errors with full details (in development)

Check your Vercel function logs to see what's happening!

