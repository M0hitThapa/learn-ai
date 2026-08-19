'use client'

import { ChatTools } from "@/app/api/generate-image/route"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, UIMessage } from "ai"
import Image from "next/image"
import { SubmitEvent, useState } from "react"


type ChatMessage = UIMessage<never,never,ChatTools>

export const AiChat = () => {

  const [input, setInput] = useState("")
  const { messages, sendMessage } = useChat<ChatMessage>({
    transport: new DefaultChatTransport({
      api: "/api/chat-app"
    })
  })

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    sendMessage({
      parts: [{ type: 'text', text: input }]
    })
    setInput('')
  }


  return (
    <div className="h-screen max-w-4xl w-full mx-auto py-5 border-x-2 border-dotted px-5 border-neutral-200 flex flex-col  ">
      <div className="flex-1 space-y-4 overflow-y-auto">
        {messages.map(message => (
          <div key={message.id} className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-xl px-4 py-2 whitespace-pre-wrap ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-black'}`}>
              {message.parts.map((part, partIndex) => {
                const { type } = part

                if (type === "text") {
                  return (
                    <div key={`${message.id}-part-${partIndex}`}>{part.text}</div>
                  )
                }

                if (type === "tool-generateImage") {
                  const { state, toolCallId } = part

                  if (state === "input-available") {
                    return (
                      <div key={`${message.id}-part-${partIndex}`}>Generating image...</div>
                    )
                  }
                  if (state === "output-available") {
                    const { input, output } = part
                    return (
                      <Image key={toolCallId} src={`data:image/png;base64,${output.image}`} alt={input.prompt} height={400} width={400} />
                    )
                  }

                }
              })}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <input onChange={handleInputImage} value={input} placeholder="type something..." className="bg-neutral-50 w-full border-2 border-neutral-100 px-4 py-2 bottom-2  focus:outline-cyan-500" />
      </form>
    </div>
  )
}
