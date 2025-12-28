import { GoogleGenAI } from '@google/genai';
// eslint-disable-next-line import/no-named-as-default
import OpenAI from 'openai';

export const config = {
  runtime: 'nodejs',
};

type ApiProvider = 'gemini' | 'deepseek';

/**
 * Detects which API provider to use based on environment variables
 */
function detectProvider(): { provider: ApiProvider; apiKey: string } | null {
  // PRIORITY 1: Check for DeepSeek API key explicitly set
  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  if (deepseekKey && deepseekKey.trim() !== '') {
    console.log('Using DEEPSEEK_API_KEY (explicitly set)');
    return { provider: 'deepseek', apiKey: deepseekKey.trim() };
  }

  // PRIORITY 2: Check for generic API_KEY that looks like DeepSeek (starts with 'sk-')
  const genericKey = process.env.API_KEY;
  if (genericKey && genericKey.trim() !== '' && genericKey.startsWith('sk-')) {
    console.log('Using API_KEY as DeepSeek (starts with sk-)');
    return { provider: 'deepseek', apiKey: genericKey.trim() };
  }

  // PRIORITY 3: Check for Gemini API key
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey && geminiKey.trim() !== '') {
    console.log('Using GEMINI_API_KEY');
    return { provider: 'gemini', apiKey: geminiKey.trim() };
  }

  // PRIORITY 4: Fallback to generic API_KEY as Gemini
  if (genericKey && genericKey.trim() !== '') {
    console.log('Using API_KEY as Gemini (fallback)');
    return { provider: 'gemini', apiKey: genericKey.trim() };
  }

  console.error('No API key found in environment variables');
  return null;
}

/**
 * Wraps an async operation with a timeout using Promise.race
 * This ensures the promise is rejected if it takes too long
 * Note: This doesn't cancel the underlying operation, but prevents the caller from waiting indefinitely
 */
async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string
): Promise<T> {
  let timeoutId: NodeJS.Timeout;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      console.error(`Operation timed out after ${timeoutMs}ms: ${errorMessage}`);
      reject(new Error(`Timeout: ${errorMessage} (${timeoutMs}ms)`));
    }, timeoutMs);
  });

  try {
    // Race between the actual promise and timeout
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId!);
    return result;
  } catch (error) {
    clearTimeout(timeoutId!);
    throw error;
  }
}

/**
 * Calls DeepSeek API with timeout protection
 */
async function callDeepSeekAPI(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const client = new OpenAI({
    apiKey,
    baseURL: 'https://api.deepseek.com',
    // Don't rely on client timeout - we'll use our own wrapper
  });

  console.log('Calling DeepSeek API with model: deepseek-chat');
  const startTime = Date.now();

  // Wrap the API call with a 50-second timeout (leaves 10s buffer for client 60s timeout)
  const response = await withTimeout(
    client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
    50000, // 50 second timeout (leaves 10s buffer for client 60s timeout)
    'DeepSeek API call'
  );

  const duration = Date.now() - startTime;
  console.log(`DeepSeek API response received in ${duration}ms`);

  const result = response.choices[0]?.message?.content || '';

  if (!result) {
    console.error('DeepSeek returned empty result. Response:', JSON.stringify(response, null, 2));
    throw new Error('DeepSeek API returned empty response');
  }

  console.log(`DeepSeek result length: ${result.length} characters`);
  return result;
}

/**
 * Calls Gemini API with timeout protection
 */
async function callGeminiAPI(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });

  console.log('Calling Gemini API with model: gemini-2.0-flash-exp');
  const startTime = Date.now();

  // Wrap the API call with a 50-second timeout (leaves 10s buffer for client 60s timeout)
  const response = await withTimeout(
    ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    }),
    50000, // 50 second timeout (leaves 10s buffer for client 60s timeout)
    'Gemini API call'
  );

  const duration = Date.now() - startTime;
  console.log(`Gemini API response received in ${duration}ms`);

  // Extract text from response - handle different response formats
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typedResponse = response as any;
  let result = '';

  if (typedResponse?.text) {
    result = typeof typedResponse.text === 'function' ? typedResponse.text() : typedResponse.text;
  } else if (typedResponse?.candidates?.[0]?.content?.parts?.[0]?.text) {
    result = typedResponse.candidates[0].content.parts[0].text;
  }

  // Try fallback model if empty
  if (!result) {
    console.warn('Gemini returned empty result, trying fallback model: gemini-1.5-flash');
    const fallbackResponse = await withTimeout(
      ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      }),
      50000, // 50 second timeout
      'Gemini fallback API call'
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typedFallback = fallbackResponse as any;
    if (typedFallback?.text) {
      result = typeof typedFallback.text === 'function' ? typedFallback.text() : typedFallback.text;
    } else if (typedFallback?.candidates?.[0]?.content?.parts?.[0]?.text) {
      result = typedFallback.candidates[0].content.parts[0].text;
    }
  }

  if (!result) {
    throw new Error('Gemini API returned empty response');
  }

  return result;
}

export default async function handler(req: Request): Promise<Response> {
  // ═══════════════════════════════════════════════════════════════════════════
  // DEBUG: Comprehensive logging for troubleshooting
  // ═══════════════════════════════════════════════════════════════════════════
  const debugInfo = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    environment: {
      NODE_ENV: process.env.NODE_ENV || 'not set',
      VERCEL_ENV: process.env.VERCEL_ENV || 'not set',
      hasDeepSeekKey: !!process.env.DEEPSEEK_API_KEY,
      deepSeekKeyLength: process.env.DEEPSEEK_API_KEY?.length || 0,
      deepSeekKeyPrefix: process.env.DEEPSEEK_API_KEY?.substring(0, 5) || 'none',
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      geminiKeyLength: process.env.GEMINI_API_KEY?.length || 0,
      geminiKeyPrefix: process.env.GEMINI_API_KEY?.substring(0, 5) || 'none',
      hasGenericApiKey: !!process.env.API_KEY,
      genericKeyLength: process.env.API_KEY?.length || 0,
      genericKeyPrefix: process.env.API_KEY?.substring(0, 5) || 'none',
    },
  };

  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('🔍 WELLNESS API DEBUG INFO');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log(JSON.stringify(debugInfo, null, 2));
  console.log('═══════════════════════════════════════════════════════════════════');

  // CORS headers for all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // GET request returns debug info (for testing deployment)
  if (req.method === 'GET') {
    try {
      console.log('GET request - detecting provider...');
      const providerInfo = detectProvider();
      console.log('Provider detected, building response...');

      const responseData = {
        status: 'ok',
        message: 'Wellness API is running',
        provider: providerInfo ? providerInfo.provider : 'none',
        hasApiKey: !!providerInfo,
        timestamp: new Date().toISOString(),
      };

      console.log('Sending response:', JSON.stringify(responseData));

      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: corsHeaders,
      });
    } catch (error) {
      console.error('GET handler error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to process GET request', message: String(error) }),
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }
  }

  // Only allow POST for actual recommendations
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({
        error: 'Method not allowed. Use GET for debug info or POST for recommendations.',
      }),
      {
        status: 405,
        headers: corsHeaders,
      }
    );
  }

  try {
    // Parse request body with timeout protection
    let answers: Record<number, string>;
    try {
      const body = await req.json();
      answers = body.answers;
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return new Response(JSON.stringify({ error: 'Invalid request: unable to parse JSON body' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    console.log('Received request with answers:', JSON.stringify(answers));

    if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid request: answers required' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Detect provider
    const providerInfo = detectProvider();
    if (!providerInfo) {
      console.error('No API key found. Available env vars:', {
        hasDeepSeek: !!process.env.DEEPSEEK_API_KEY,
        hasGemini: !!process.env.GEMINI_API_KEY,
        hasGeneric: !!process.env.API_KEY,
      });
      return new Response(
        JSON.stringify({
          error: 'API key not configured',
          message: 'Please set DEEPSEEK_API_KEY or GEMINI_API_KEY in environment variables',
        }),
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }

    const { provider, apiKey } = providerInfo;
    console.log(`Using provider: ${provider}, API key length: ${apiKey.length}`);

    // Questions matching the client-side constants
    const QUESTIONS = [
      {
        id: 1,
        text: 'How has your energy been lately?',
        options: [
          { label: 'Very low', value: 'low' },
          { label: 'Up and down', value: 'fluctuating' },
          { label: 'Strong and steady', value: 'steady' },
        ],
      },
      {
        id: 2,
        text: 'How often do you feel run-down or get sick?',
        options: [
          { label: 'Often', value: 'often' },
          { label: 'Occasionally', value: 'occasionally' },
          { label: 'Rarely', value: 'rarely' },
        ],
      },
      {
        id: 3,
        text: 'How is your digestion?',
        options: [
          { label: 'Bloating or discomfort', value: 'poor' },
          { label: 'Inconsistent', value: 'inconsistent' },
          { label: 'Smooth and regular', value: 'good' },
        ],
      },
      {
        id: 4,
        text: 'How is your sleep?',
        options: [
          { label: 'Poor or restless', value: 'poor' },
          { label: 'Average', value: 'average' },
          { label: 'Deep and restful', value: 'restful' },
        ],
      },
      {
        id: 5,
        text: 'How would you describe your stress levels?',
        options: [
          { label: 'High', value: 'high' },
          { label: 'Moderate', value: 'moderate' },
          { label: 'Low', value: 'low' },
        ],
      },
      {
        id: 6,
        text: 'What is your MAIN goal right now?',
        options: [
          { label: 'More energy & drive', value: 'energy' },
          { label: 'Stronger immunity', value: 'immunity' },
          { label: 'Better digestion & cleansing', value: 'digestion' },
          { label: 'Overall balance', value: 'balance' },
        ],
      },
      {
        id: 7,
        text: 'Are you currently taking any herbal products?',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
    ];

    const SYSTEM_PROMPT = `
You are "The Chimdum Wellness Guide", a holistic, non-medical digital assistant built around the philosophy, teachings, and products of Dr. Chimdum.

PURPOSE:
Guide users toward the correct Chimdum herbal product or bundle based on how their body feels, using educational, supportive, and culturally grounded language.

STRICT RULES:
- You do NOT diagnose, treat, prevent, or cure disease.
- You do NOT give medical advice.
- You do NOT recommend any products outside of Chimdum's catalog.
- You do NOT invent health claims.
- You ALWAYS use supportive language such as "may support", "traditionally used", "commonly associated with".
- You ALWAYS include a short disclaimer at the end of recommendations.

PRODUCTS YOU MAY RECOMMEND:
1. Chimdum Bitters
2. Ghanga Tonic
3. Immune Booster
4. Official Chimdum bundles:
   - Vitality Duo (Ghanga Tonic + Immune Booster)
   - Daily Reset (Chimdum Bitters + Immune Booster)
   - Total Balance (All three)

TONE & BRAND:
- Calm, grounded, confident.
- African-rooted wisdom + modern clarity.
- Never salesy.
- Simple language, no jargon.

START YOUR RESPONSE WITH:
"Welcome. I've reviewed your answers to understand what your body may need support with right now. This guidance is educational and based on Dr. Chimdum's holistic approach."

DECISION LOGIC (STRICT):
- If LOW energy, HIGH stress, low drive → Recommend Ghanga Tonic.
- If frequent sickness, fatigue, weak resistance → Recommend Immune Booster.
- If digestion issues, bloating, detox goals → Recommend Chimdum Bitters.
- If user shows TWO or MORE weak areas → Recommend a bundle (Vitality Duo or Daily Reset).
- If user selects "overall balance" → Recommend Total Balance bundle.

OUTPUT STRUCTURE (EXACT):
1. BODY INSIGHT (2–3 sentences)
Explain what the user's answers may indicate about their body using simple, non-medical language.

2. RECOMMENDED SUPPORT
Clearly name the product or bundle.

3. SIMPLE DAILY ROUTINE
- Morning: [product + purpose]
- Evening: [product + purpose]

4. WHY THIS MAY HELP
1–2 sentences connecting the routine to their stated goal.

5. NEXT STEP CTA
Encourage action without pressure.

6. DISCLAIMER (REQUIRED)
"This guidance is educational and not intended to diagnose, treat, or replace medical care."
`;

    // Construct answer summary
    const answerSummary = QUESTIONS.map(q => {
      const answerValue = answers[q.id];
      const answerLabel = q.options.find(o => o.value === answerValue)?.label || 'Not answered';
      return `${q.text}: ${answerLabel}`;
    }).join('\n');

    const userPrompt = `Based on the following user assessment, provide a wellness recommendation following your strict rules and output format:

User Assessment:
${answerSummary}

Ensure the recommendation strictly follows the Decision Logic and Output Format specified in your system instructions.`;

    // Call the appropriate API with timeout protection
    let result: string;
    try {
      if (provider === 'deepseek') {
        result = await callDeepSeekAPI(apiKey, SYSTEM_PROMPT, userPrompt);
      } else {
        result = await callGeminiAPI(apiKey, SYSTEM_PROMPT, userPrompt);
      }
    } catch (apiError) {
      console.error(`${provider} API call failed:`, apiError);
      const errorMessage = apiError instanceof Error ? apiError.message : String(apiError);

      // Check if it's a timeout
      if (errorMessage.includes('Timeout') || errorMessage.includes('timeout')) {
        return new Response(
          JSON.stringify({
            error: 'Request timeout',
            message: 'The AI service took too long to respond. Please try again.',
          }),
          {
            status: 504,
            headers: corsHeaders,
          }
        );
      }

      // Check if it's an authentication error
      if (
        errorMessage.includes('401') ||
        errorMessage.includes('unauthorized') ||
        errorMessage.includes('Invalid API key')
      ) {
        return new Response(
          JSON.stringify({
            error: 'Authentication failed',
            message: 'Invalid API key. Please check your API key configuration.',
          }),
          {
            status: 401,
            headers: corsHeaders,
          }
        );
      }

      // Generic API error
      throw new Error(`${provider} API error: ${errorMessage}`);
    }

    // Validate result
    if (!result || result.trim() === '') {
      console.error('API returned empty result');
      return new Response(JSON.stringify({ error: 'Empty response from API' }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    console.log(`API call successful, result length: ${result.length}`);

    // Return success response
    return new Response(JSON.stringify({ recommendation: result }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    // Catch-all error handler
    console.error('Wellness API error:', error);
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorResponse = {
      error: 'Unable to generate recommendation',
      message: errorMessage,
    };

    console.error('Returning error response:', JSON.stringify(errorResponse, null, 2));

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
