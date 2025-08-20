import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response('Missing OPENROUTER_API_KEY', { status: 500 });
  }
  
  const openrouter = createOpenRouter({
    apiKey,
  });

  const result = streamText({
    model: openrouter.chat('openai/gpt-oss-20b:free'),
    system: '你是一个有帮助的AI助手。请用中文回答问题，保持友好和专业的语调。',
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
