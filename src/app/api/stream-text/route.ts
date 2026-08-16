import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText, createUIMessageStreamResponse, toUIMessageStream } from "ai";

const openrouter = createOpenRouter({
  apiKey:process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
})

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json()

  const result =  streamText({
    model: openrouter.chat("openai/gpt-oss-20b:free"),
    system:"You are a helful assistant",
    prompt
  })

  return createUIMessageStreamResponse({
    stream:toUIMessageStream({stream:result.stream})
  })
}
