# DeepSeek API Migration Guide

## Overview

The application has been migrated from Google Gemini API to DeepSeek API. DeepSeek uses OpenAI-compatible endpoints, making it easy to integrate.

## Changes Made

### 1. API Service

- **Old:** `services/geminiService.ts` (using @google/genai)
- **New:** `services/deepseekService.ts` (using OpenAI SDK)
- Legacy `geminiService.ts` now re-exports from `deepseekService.ts` for backward compatibility

### 2. Dependencies

- **Removed:** `@google/genai`
- **Added:** `openai` (OpenAI SDK, compatible with DeepSeek)

### 3. Environment Variables

- **Primary:** `DEEPSEEK_API_KEY`
- **Legacy Support:** `GEMINI_API_KEY` and `API_KEY` still work for backward compatibility

### 4. API Configuration

- **Base URL:** `https://api.deepseek.com`
- **Model:** `deepseek-chat`
- **Format:** OpenAI-compatible chat completions API

## Important Notes

### Voice Assessment

⚠️ **Voice assessment is currently disabled** because DeepSeek API doesn't support live voice/audio streaming like Gemini Live API.

**Options:**

1. Use text-based assessment (fully functional)
2. Implement a workaround using text-to-speech and speech-to-text
3. Keep Gemini for voice features only (requires maintaining both APIs)

### API Key Format

- DeepSeek API keys typically start with `sk-` and are 40+ characters
- Your API key: `sk-dc6dda6292794117a0a13a61221b8328` ✅

## Migration Steps

1. **Update Environment Variables**

   ```bash
   # In .env.local
   DEEPSEEK_API_KEY=sk-dc6dda6292794117a0a13a61221b8328
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # This will install 'openai' and remove '@google/genai'
   ```

3. **Test the Application**
   ```bash
   npm run dev
   # Test the text-based assessment
   ```

## API Differences

### Request Format

**Gemini (Old):**

```typescript
ai.models.generateContent({
  model: 'gemini-3-flash-preview',
  contents: prompt,
  config: {
    systemInstruction: SYSTEM_PROMPT,
    temperature: 0.7,
  },
});
```

**DeepSeek (New):**

```typescript
client.chat.completions.create({
  model: 'deepseek-chat',
  messages: [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: prompt },
  ],
  temperature: 0.7,
  max_tokens: 2000,
});
```

### Response Format

**Gemini:** `response.text`
**DeepSeek:** `response.choices[0].message.content`

## Benefits

1. **Cost-Effective:** DeepSeek offers competitive pricing
2. **OpenAI-Compatible:** Easy to switch between providers
3. **Fast:** DeepSeek models are optimized for speed
4. **Reliable:** Stable API with good uptime

## Troubleshooting

### API Key Issues

- Ensure your API key starts with `sk-`
- Check that the key is set in `.env.local`
- Verify the key is active on DeepSeek platform

### Import Errors

- Run `npm install` to ensure `openai` package is installed
- Clear node_modules and reinstall if needed

### Voice Assessment Not Working

- This is expected - DeepSeek doesn't support live voice API
- Use text-based assessment instead
- Voice feature can be re-enabled if switching back to Gemini

## Support

- DeepSeek API Docs: https://api-docs.deepseek.com/
- DeepSeek Platform: https://platform.deepseek.com/

