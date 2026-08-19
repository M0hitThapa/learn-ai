import { generateImageTool } from "@/tools/generate-image";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { convertToModelMessages, createUIMessageStreamResponse,  InferUITools, isStepCount, streamText, toUIMessageStream, UIMessage } from "ai";

const openrouter = createOpenRouter({
  apiKey:process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
})

const tools = {
  generateImage:generateImageTool
}

export type ChatTool = InferUITools<typeof tools>

export async function POST(req:Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()


  const result = streamText({
    model: openrouter.chat("openai/gpt-oss-20b:free"),
    messages: await convertToModelMessages(messages),
    stopWhen: isStepCount(5),
    tools
  })

  return createUIMessageStreamResponse({
    stream:toUIMessageStream({stream:result.stream})
  })

}
