import {
  GoogleGenAI,
  LiveServerMessage,
  Modality,
  Blob,
  Type,
  FunctionDeclaration,
} from '@google/genai';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { SYSTEM_PROMPT, QUESTIONS } from '../constants';

interface VoiceAssessmentProps {
  onComplete: (recommendation: string) => void;
  onCancel: () => void;
}

const VoiceAssessment: React.FC<VoiceAssessmentProps> = ({ onComplete, onCancel }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sessionRef = useRef<any>(null);

  // Define helper functions (moved before useEffect to be available)
  const encode = useCallback((bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }, []);

  const createBlob = useCallback(
    (data: Float32Array): Blob => {
      const l = data.length;
      const int16 = new Int16Array(l);
      for (let i = 0; i < l; i++) int16[i] = data[i] * 32768;
      return { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
    },
    [encode]
  );

  // Define the completion tool (memoized to avoid recreating on every render)
  const completeAssessmentTool: FunctionDeclaration = useMemo(
    () => ({
      name: 'completeAssessment',
      parameters: {
        type: Type.OBJECT,
        description:
          "MANDATORY: Call this function immediately after you finish speaking your final recommendation and disclaimer. This will automatically open the user's custom wellness plan page.",
        properties: {
          recommendationText: {
            type: Type.STRING,
            description:
              'The full, detailed recommendation following the 6-part structure (BODY INSIGHT, RECOMMENDED SUPPORT, etc.)',
          },
        },
        required: ['recommendationText'],
      },
    }),
    []
  );

  useEffect(() => {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === '' || apiKey === 'your_api_key_here') {
      setError(
        'No API key configured. Please ensure your environment is set up. See .env.example for reference.'
      );
      return;
    }

    const initVoiceSession = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Initialize AudioContexts
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioCtx({ sampleRate: 16000 });
        outputAudioContextRef.current = new AudioCtx({ sampleRate: 24000 });

        // Ensure contexts are resumed (crucial for some browsers)
        await audioContextRef.current.resume();
        await outputAudioContextRef.current.resume();

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY });

        const questionList = QUESTIONS.map(q => `- ${q.text}`).join('\n');

        const voiceSystemPrompt = `
${SYSTEM_PROMPT}

CONVERSATION PROTOCOL:
1. START IMMEDIATELY: Greet the user and ask the first question immediately when the session begins.
2. QUIZ FLOW: You must ask these 7 questions one by one. Do not skip any:
${questionList}
3. BE CONCISE: Keep your responses very brief (under 10 seconds per turn).
4. THE RECOMMENDATION: After the 7th question, give a 15-second verbal summary of your recommendation.
5. NO PERMISSION NEEDED: Do not ask "Would you like to see your plan?".
6. AUTO-COMPLETE: Immediately after finishing your final spoken sentence, call the 'completeAssessment' tool.

TOTAL TIME LIMIT: Keep the entire session under 60 seconds.
        `;

        const sessionPromise = ai.live.connect({
          model: 'gemini-2.0-flash-exp',
          callbacks: {
            onopen: () => {
              setIsConnected(true);
              const source = audioContextRef.current!.createMediaStreamSource(stream);
              const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);

              scriptProcessor.onaudioprocess = (e: AudioProcessingEvent) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const pcmBlob = createBlob(inputData);
                sessionPromise.then(session => {
                  // Only send if we are connected and not redirecting
                  if (!isRedirecting) {
                    session.sendRealtimeInput({ media: pcmBlob });
                  }
                });
              };

              source.connect(scriptProcessor);
              scriptProcessor.connect(audioContextRef.current!.destination);

              // TRIGGER START: Send a text message to make the model start the conversation
              setTimeout(() => {
                sessionPromise.then(session => {
                  session.sendRealtimeInput({
                    text: 'Please start the assessment now by greeting me warmly and asking the first question.',
                  });
                });
              }, 500);
            },
            onmessage: async (message: LiveServerMessage) => {
              // Handle Tool Call
              if (message.toolCall?.functionCalls) {
                for (const fc of message.toolCall.functionCalls) {
                  if (fc.name === 'completeAssessment' && fc.args) {
                    const text = fc.args.recommendationText as string;
                    setIsRedirecting(true);
                    // Close session and redirect
                    setTimeout(() => onComplete(text), 1000);
                    return;
                  }
                }
              }

              // Handle Audio Output
              const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
              if (base64Audio) {
                setIsSpeaking(true);
                const ctx = outputAudioContextRef.current!;
                if (ctx.state === 'suspended') await ctx.resume();

                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);

                const buffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);

                source.addEventListener('ended', () => {
                  sourcesRef.current.delete(source);
                  if (sourcesRef.current.size === 0) setIsSpeaking(false);
                });

                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += buffer.duration;
                sourcesRef.current.add(source);
              }

              if (message.serverContent?.interrupted) {
                for (const s of sourcesRef.current) {
                  try {
                    s.stop();
                  } catch (e) {
                    // Ignore errors when stopping source
                  }
                }
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
                setIsSpeaking(false);
              }
            },
            onerror: e => {
              console.error('Live API Error Event:', e);
              setIsConnected(false);
              setError('The connection encountered an issue. Please try restarting the guide.');
            },
            onclose: () => {
              setIsConnected(false);
            },
          },
          config: {
            responseModalities: [Modality.AUDIO],
            tools: [{ functionDeclarations: [completeAssessmentTool] }],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
            },
            systemInstruction: voiceSystemPrompt,
          },
        });

        sessionRef.current = await sessionPromise;
      } catch (err) {
        console.error('Initialization Error:', err);
        setError('Could not access microphone. Please check your browser permissions.');
      }
    };

    initVoiceSession();

    return () => {
      if (sessionRef.current) {
        try {
          sessionRef.current.close();
        } catch (e) {
          // Ignore errors when closing session
        }
      }
      if (audioContextRef.current) audioContextRef.current.close();
      if (outputAudioContextRef.current) outputAudioContextRef.current.close();
    };
  }, [completeAssessmentTool, createBlob, isRedirecting, onComplete]);

  function decode(base64: string) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let c = 0; c < numChannels; c++) {
      const channelData = buffer.getChannelData(c);
      for (let i = 0; i < frameCount; i++)
        channelData[i] = dataInt16[i * numChannels + c] / 32768.0;
    }
    return buffer;
  }

  return (
    <div className="max-w-3xl mx-auto py-20 px-4 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="glass-card rounded-none p-12 w-full text-center border-none border-t-2 border-[#C5A059] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#C5A059]/20" />

        <h2 className="text-3xl font-bold text-white mb-12 italic tracking-wide">
          Chimdum Voice Guide
        </h2>

        {error ? (
          <div className="py-8">
            <p className="text-red-400 mb-8 font-medium">{error}</p>
            <button
              onClick={onCancel}
              className="px-10 py-4 gold-bg text-black font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg active:scale-95"
              aria-label="Go back to start"
            >
              Back to Start
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-12">
            <div
              className={`relative w-40 h-40 flex items-center justify-center transition-all duration-1000 ${isSpeaking ? 'scale-110' : 'scale-100'}`}
            >
              <div className={`absolute inset-0 gold-bg rounded-full opacity-10 animate-ping`} />
              <div
                className={`absolute inset-4 border border-[#C5A059]/30 rounded-full animate-spin-slow`}
              />
              <div
                className={`absolute inset-0 bg-[#C5A059] rounded-full blur-2xl opacity-20 ${isSpeaking ? 'animate-pulse' : ''}`}
              />
              <div className="relative z-10 w-20 h-20 gold-bg rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(197,160,89,0.5)]">
                <svg
                  className="w-10 h-10 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" />
                </svg>
              </div>
            </div>

            <div className="text-center">
              <p
                className="text-zinc-400 text-sm font-light italic leading-relaxed max-w-sm mx-auto"
                aria-live="polite"
              >
                {isRedirecting
                  ? 'Dr. Chimdum is preparing your plan...'
                  : isConnected
                    ? 'Guide is ready. Listening to you now...'
                    : 'Connecting to the ancestral wisdom...'}
              </p>
              {isRedirecting && (
                <div className="mt-6 flex justify-center gap-2" aria-label="Loading">
                  <div className="w-2 h-2 bg-[#C5A059] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-[#C5A059] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-[#C5A059] rounded-full animate-bounce"></div>
                </div>
              )}
            </div>

            {!isRedirecting && (
              <button
                onClick={onCancel}
                className="mt-8 text-zinc-500 hover:text-white transition-colors text-[10px] uppercase tracking-[0.4em] border-b border-transparent hover:border-white/20 pb-1"
                aria-label="Cancel voice assessment session"
              >
                Cancel Session
              </button>
            )}
          </div>
        )}
      </div>

      <p className="mt-12 text-center text-zinc-700 text-[10px] uppercase tracking-[0.8em]">
        Safe • Private • Natural
      </p>
    </div>
  );
};

export default VoiceAssessment;
