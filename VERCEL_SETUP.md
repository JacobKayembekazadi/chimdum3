# Vercel Setup & Troubleshooting

## Current Error: "[ERROR] API error: /api/wellness"

This error indicates the API endpoint is being called but failing. Here's how to fix it:

## Step 1: Set Environment Variables in Vercel

**CRITICAL**: The API won't work without an API key!

1. Go to: https://vercel.com/jacobkayembekazadi-gmailcoms-projects/chimdum/settings/environment-variables

2. Add ONE of these:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development

   OR

   - **Name**: `DEEPSEEK_API_KEY`  
   - **Value**: Your DeepSeek API key (must start with `sk-`)
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development

3. **Redeploy**: After adding the variable, go to Deployments and click "Redeploy" on the latest deployment

## Step 2: Check Vercel Function Logs

1. Go to: https://vercel.com/jacobkayembekazadi-gmailcoms-projects/chimdum/functions
2. Click on `/api/wellness`
3. Check the "Logs" tab to see detailed error messages

The logs will show:
- Whether API key was found
- Which provider is being used
- Any API call errors
- Full error details

## Step 3: Verify API Key Format

### For Gemini:
- Should be a long string (no specific prefix required)
- Get it from: https://ai.google.dev/

### For DeepSeek:
- Must start with `sk-`
- Get it from: https://platform.deepseek.com/

## Common Issues

### Issue: "API key not configured"
**Solution**: Set `GEMINI_API_KEY` or `DEEPSEEK_API_KEY` in Vercel environment variables

### Issue: "Empty response from API"
**Solution**: 
- Check API key is valid
- Check Vercel function logs for detailed errors
- Try a different model (code has fallback)

### Issue: "Request timed out"
**Solution**: 
- Check your internet connection
- API might be slow, wait and retry
- Check Vercel function timeout settings

## Testing the API

After setting environment variables and redeploying, test with:

```bash
curl -X POST https://your-domain.vercel.app/api/wellness \
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

Expected response:
```json
{
  "recommendation": "Welcome. I've reviewed your answers..."
}
```

## Quick Fix Checklist

- [ ] Environment variable set in Vercel (`GEMINI_API_KEY` or `DEEPSEEK_API_KEY`)
- [ ] Environment variable set for all environments (Production, Preview, Development)
- [ ] Redeployed after setting environment variable
- [ ] Checked Vercel function logs for detailed errors
- [ ] Verified API key is valid and has proper format

## Need Help?

Check the Vercel function logs - they now include detailed error messages that will tell you exactly what's wrong!

