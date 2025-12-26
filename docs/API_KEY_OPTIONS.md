# API Key Options & Provider Switching

## Overview

The Edge Function (`/api/wellness`) supports **both DeepSeek and Gemini APIs** with automatic provider detection. You can easily switch between providers by setting the appropriate environment variable.

## Supported Providers

### 1. DeepSeek API (Recommended)

- **Cost-effective** and fast
- **OpenAI-compatible** API
- **Environment Variable:** `DEEPSEEK_API_KEY`
- **Key Format:** Starts with `sk-` (e.g., `sk-001c05a90fad45f0858ea3015134ed68`)

### 2. Google Gemini API

- **Advanced features** (supports voice in future)
- **Native Google AI** integration
- **Environment Variable:** `GEMINI_API_KEY`
- **Key Format:** Google API key format (e.g., `AIzaSy...`)

## Automatic Provider Detection

The Edge Function automatically detects which provider to use based on available environment variables:

**Priority Order:**

1. `DEEPSEEK_API_KEY` (if set and starts with `sk-`) → Uses DeepSeek
2. `GEMINI_API_KEY` (if set) → Uses Gemini
3. `API_KEY` (fallback):
   - If starts with `sk-` → Uses DeepSeek
   - Otherwise → Uses Gemini

## Switching Providers

### Option 1: Set Environment Variable in Vercel

**For DeepSeek:**

```bash
# Production
vercel env add DEEPSEEK_API_KEY production
# Enter your DeepSeek API key when prompted

# Preview
vercel env add DEEPSEEK_API_KEY preview

# Development
vercel env add DEEPSEEK_API_KEY development
```

**For Gemini:**

```bash
# Production
vercel env add GEMINI_API_KEY production
# Enter your Gemini API key when prompted

# Preview
vercel env add GEMINI_API_KEY preview

# Development
vercel env add GEMINI_API_KEY development
```

### Option 2: Vercel Dashboard

1. Go to: https://vercel.com/[your-project]/settings/environment-variables
2. Click **"Add New"**
3. Enter:
   - **Name:** `DEEPSEEK_API_KEY` or `GEMINI_API_KEY`
   - **Value:** Your API key
   - **Environment:** Select all (Production, Preview, Development)
4. Click **"Save"**
5. **Redeploy** your latest deployment

### Option 3: Remove One to Use the Other

To switch providers:

- **Use DeepSeek:** Set `DEEPSEEK_API_KEY`, remove/leave `GEMINI_API_KEY` unset
- **Use Gemini:** Set `GEMINI_API_KEY`, remove/leave `DEEPSEEK_API_KEY` unset

## Current Production Configuration

✅ **DeepSeek API is currently configured** in production:

- Environment Variable: `DEEPSEEK_API_KEY`
- Provider: DeepSeek
- Model: `deepseek-chat`

## API Differences

### DeepSeek API

```typescript
// Uses OpenAI-compatible format
const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

const response = await client.chat.completions.create({
  model: 'deepseek-chat',
  messages: [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: prompt },
  ],
  temperature: 0.7,
  max_tokens: 2000,
});
```

### Gemini API

```typescript
// Uses Google GenAI format
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash-exp',
  contents: prompt,
  config: {
    systemInstruction: SYSTEM_PROMPT,
    temperature: 0.7,
  },
});
```

## Benefits of Each Provider

### DeepSeek Advantages

- ✅ **Lower cost** - More affordable pricing
- ✅ **Fast responses** - Optimized for speed
- ✅ **OpenAI-compatible** - Easy to switch to OpenAI if needed
- ✅ **Reliable** - Good uptime and stability

### Gemini Advantages

- ✅ **Advanced features** - Better for complex tasks
- ✅ **Voice support** - Can support voice features (if re-enabled)
- ✅ **Google ecosystem** - Integrates with Google services
- ✅ **Multimodal** - Supports images and other media

## Verifying Current Provider

To check which provider is active:

1. **Check Vercel Environment Variables:**

   ```bash
   vercel env ls
   ```

2. **Check Deployment Logs:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on latest deployment → View Function Logs
   - Look for which API is being called

3. **Test the API:**
   - Complete the quiz
   - Check browser console/network tab
   - Should see successful API calls to `/api/wellness`

## Troubleshooting

### "API key not configured" Error

- Ensure at least one API key is set in Vercel
- Check that the key is set for the correct environment (Production/Preview/Development)
- Redeploy after adding environment variables

### Wrong Provider Being Used

- Check environment variable priority (DeepSeek is checked first)
- Remove the unwanted API key if you want to force a specific provider
- Verify key format (DeepSeek keys start with `sk-`)

### Switching Doesn't Work

- **Always redeploy** after changing environment variables
- Clear browser cache if testing locally
- Check Vercel deployment logs for errors

## Best Practices

1. **Use DeepSeek for Production** (cost-effective)
2. **Keep Gemini as Backup** (set both keys, DeepSeek will be used first)
3. **Test Before Switching** (test in Preview environment first)
4. **Monitor Costs** (check API usage in provider dashboards)
5. **Document Changes** (note which provider is active)

## Future Enhancements

- [ ] Add provider selection in UI (admin panel)
- [ ] Support for OpenAI API (same format as DeepSeek)
- [ ] Automatic failover between providers
- [ ] Cost tracking per provider
- [ ] Provider performance metrics

