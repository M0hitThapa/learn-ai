'use client';

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";


export const StreamTextWithInput = () => {
  const [input, setInput] = useState("")

  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api:"/api/stream-text-with-input"
    })
  })
  return (
    <div>
      <input className="bg-black text-white" value={input} onChange={e => setInput(e.target.value)} onKeyDown={async event => {
        if (event.key === "Enter") {
          sendMessage({
            parts:[{type:"text", text:input}]
          })
        }
      }} />

      {messages.map((message,index) => (
        <div key={index}>
          {message.parts.map(part => {
            if (part.type === "text") {
              return <div  key={`${message.id} - text`}>{part.text}</div>
            }
          })}
        </div>
      ))}
  </div>
)
}
