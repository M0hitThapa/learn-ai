'use client'

import { ChatTools } from "@/app/api/generate-image/route"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, UIMessage } from "ai"
import Image from "next/image"
import {  SubmitEvent, useState } from "react"

type ChatMessage = UIMessage<never,never,ChatTools>

export const GenerateImage = () => {
  const [input, setInput] = useState("")
  const { messages, sendMessage } = useChat<ChatMessage>({
    transport: new DefaultChatTransport({
      api:"/api/generate-image"
    })
  })

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e:SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    sendMessage({
      parts:[{type:'text',text:input}]
    })
    setInput('')
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="spacce-y-4">
        {messages.map(message => (
          <div className="whitespace-pre-wrap" key={message.id}>
            <div key={message.id}>
              <div className="text-black font-semibold">{message.role}</div>
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
                      <Image key={toolCallId}  src={`data:image/png;base64,${output.image}`} alt={input.prompt} height={400} width={400} />
                    )
                  }

                }
              })}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input className="bg-black text-white" value={input} placeholder="type something" onChange={handleInputChange} />
      </form>
    </div>
  )



}
