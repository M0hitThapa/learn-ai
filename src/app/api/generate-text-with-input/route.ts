import { NextRequest } from "next/server";
import {generateText, type ModelMessage} from "ai"
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey:process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
})

export async function POST(req:NextRequest) {
  const { messages }: { messages: ModelMessage[] } = await req.json()

  const {responseMessages} = await generateText({
    model: openrouter.chat("openai/gpt-oss-20b:free"),
    instructions:"you are a very humble and intelligent doctor",
    messages,
  })


  return Response.json({messages:responseMessages})

}
