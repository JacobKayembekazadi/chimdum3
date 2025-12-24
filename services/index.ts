/**
 * Services barrel export
 */

// Primary service - Gemini (supports voice)
export { generateWellnessRecommendation, GeminiServiceError } from './geminiService';

// Alternative service - DeepSeek (text only, OpenAI-compatible)
// Note: DeepSeek service is deprecated but kept for reference
// Uncomment if needed:
// export { generateWellnessRecommendation as generateWellnessRecommendationDeepSeek, DeepSeekServiceError } from './deepseekService';
