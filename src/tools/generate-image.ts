import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { generateImage, tool } from "ai"
import { z } from "zod"

const openrouter = createOpenRouter({
  apiKey:process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
})

export const generateImageTool = tool({
  description: "Generate a image",
  inputSchema: z.object({
    prompt:z.string().describe("the prompt to generate image for"),

  }),
  execute: async ({ prompt }) => {
    const { image } = await generateImage({
      model: openrouter.imageModel("qwen/qwen-image-3"),
      aspectRatio: "1:1",
      prompt

    })
    return {image:image.base64,prompt}
  }
})
