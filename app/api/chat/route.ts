import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  
  const openrouter = createOpenRouter({
    apiKey: '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',
  });

  const result = streamText({
    model: openrouter.chat('openai/gpt-oss-20b:free'),
    system: '你是一个有帮助的AI助手。请用中文回答问题，保持友好和专业的语调。',
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
