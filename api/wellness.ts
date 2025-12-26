import { GoogleGenAI } from '@google/genai';
// eslint-disable-next-line import/no-named-as-default
import OpenAI from 'openai';

export const config = {
  runtime: 'nodejs', // Changed from 'edge' to 'nodejs' for better compatibility with AI libraries
};

// UserAnswers type is inferred from request body

type ApiProvider = 'gemini' | 'deepseek';

function detectProvider(): { provider: ApiProvider; apiKey: string } | null {
  // Check for DeepSeek first (starts with 'sk-')
  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  if (deepseekKey && deepseekKey.trim() !== '' && deepseekKey.startsWith('sk-')) {
    return { provider: 'deepseek', apiKey: deepseekKey };
  }

  // Check for Gemini
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey && geminiKey.trim() !== '') {
    return { provider: 'gemini', apiKey: geminiKey };
  }

  // Fallback to generic API_KEY (treat as DeepSeek if starts with 'sk-', otherwise Gemini)
  const genericKey = process.env.API_KEY;
  if (genericKey && genericKey.trim() !== '') {
    if (genericKey.startsWith('sk-')) {
      return { provider: 'deepseek', apiKey: genericKey };
    }
    return { provider: 'gemini', apiKey: genericKey };
  }

  return null;
}

export default async function handler(req: Request) {
  // Add CORS headers for development
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const { answers } = await req.json();
    console.log('Received request with answers:', JSON.stringify(answers));

    if (!answers || typeof answers !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid request: answers required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
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

    const prompt = `Based on the following user assessment, provide a wellness recommendation following your strict rules and output format:

User Assessment:
${answerSummary}

Ensure the recommendation strictly follows the Decision Logic and Output Format specified in your system instructions.`;

    let result: string;

    if (provider === 'deepseek') {
      // Use DeepSeek API (OpenAI-compatible)
      const client = new OpenAI({
        apiKey,
        baseURL: 'https://api.deepseek.com',
      });

      const response = await client.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      result = response.choices[0]?.message?.content || '';
    } else {
      // Use Gemini API
      console.log('Attempting Gemini API call...');
      try {
        const ai = new GoogleGenAI({ apiKey });
        console.log('GoogleGenAI instance created, calling generateContent...');
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash-exp',
          contents: prompt,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.7,
          },
        });

        console.log('Gemini API response received');
        result = response.text || '';
        
        if (!result) {
          console.warn('Gemini returned empty result, trying fallback model...');
          // Try fallback model
          const fallbackResponse = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
            config: {
              systemInstruction: SYSTEM_PROMPT,
              temperature: 0.7,
            },
          });
          result = fallbackResponse.text || '';
        }
      } catch (geminiError) {
        console.error('Gemini API error:', geminiError);
        console.error('Error details:', {
          message: geminiError instanceof Error ? geminiError.message : 'Unknown',
          name: geminiError instanceof Error ? geminiError.name : 'Unknown',
          stack: geminiError instanceof Error ? geminiError.stack : 'No stack',
        });
        
        // If Gemini fails, try with a simpler model name
        try {
          console.log('Trying fallback model: gemini-1.5-flash');
          const ai = new GoogleGenAI({ apiKey });
          const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
            config: {
              systemInstruction: SYSTEM_PROMPT,
              temperature: 0.7,
            },
          });
          result = response.text || '';
          console.log('Fallback model succeeded');
        } catch (fallbackError) {
          console.error('Gemini fallback error:', fallbackError);
          throw new Error(`Gemini API error: ${geminiError instanceof Error ? geminiError.message : 'Unknown error'}. Fallback also failed: ${fallbackError instanceof Error ? fallbackError.message : 'Unknown'}`);
        }
      }
    }
    
    console.log(`API call successful, result length: ${result.length}`);

    if (!result || result.trim() === '') {
      return new Response(JSON.stringify({ error: 'Empty response from API' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ recommendation: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Wellness API error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error instanceof Error ? {
      message: error.message,
      name: error.name,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    } : { message: 'Unknown error' };

    return new Response(
      JSON.stringify({
        error: 'Unable to generate recommendation',
        message: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
}
