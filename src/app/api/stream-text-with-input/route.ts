import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import {
  convertToModelMessages,
  toUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
  streamText
} from "ai"

const openrouter = createOpenRouter({
  apiKey:process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
})
export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: openrouter.chat("openai/gpt-oss-20b:free"),
    system: "You are a humble assistant",
    messages:await convertToModelMessages(messages)
  })

  return createUIMessageStreamResponse({
    stream:toUIMessageStream({stream:result.stream})
  })
}
