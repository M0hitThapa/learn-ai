'use client'
import { type ModelMessage } from "ai"
import { useState } from "react"


export const InputChat = () => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ModelMessage[]>([])

  return (
    <div>
      <input className="bg-black text-white p-2" value={input} onChange={e => setInput(e.target.value)} onKeyDown={async event => {
        if (event.key === "Enter") {
          setMessages(currentMessages => [
            ...currentMessages,
            {role:"user", content:input}
          ])
          const response = await fetch('/api/generate-text-with-input', {
            method: "POST",
            body: JSON.stringify({
              messages:[...messages,{role:"user", content:input}]
            })

          })

          const { messages: newMessages } = await response.json();

          setMessages(currentMessages => [
            ...currentMessages,...newMessages
          ])
        }
      }}
      />
      {messages.map((message, index) => (
              <div key={`${message.role}-${index}`}>
                {typeof message.content === 'string'
                  ? message.content
                  : message.content
                      .filter(part => part.type === 'text')
                      .map((part, partIndex) => (
                        <div key={partIndex}>{part.text}</div>
                      ))}
              </div>
            ))}
</div>




  )
}
