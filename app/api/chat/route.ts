import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = "nodejs";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // console.log('📨 Chat route called');

    const { messages } = await req.json();

    const model = google('gemini-2.5-flash-lite');

    const result = await streamText({
      model: model,
      system: `You are EcoBot, a friendly and knowledgeable environmental assistant.
      
YOUR PERSONALITY:
- Warm, encouraging, and passionate about sustainability
- Use nature-themed language (e.g., "Green Warrior")
- Keep responses conversational yet informative

FORMATTING:
- Use **Bold** for key terms
- Use lists for steps
- Keep it readable`,
      messages,
      // Log server-side errors
      onError: ({ error }) => {
        console.error('🔥 Error inside streamText generation:', error);
      },
    });

    console.log('✅ Stream initialized successfully');

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        console.log('⚠️ Sending detailed error to client:', error);
        if (error instanceof Error) {
          return error.message;
        }
        return JSON.stringify(error);
      }
    });

  } catch (error) {
    console.error('❌ Fatal error in chat route:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Server failed to process request', 
        details: error instanceof Error ? error.message : String(error) 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}