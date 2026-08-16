'use client'
import { useCompletion } from "@ai-sdk/react"

export const StreamText = () => {
  const { complete, completion } = useCompletion({
    api:"/api/stream-text"
  })

  return (
    <div>
      <div onClick={async () => {
      await  complete("why is the sky blue")
      }}>
        generate
      </div>
      {completion}
    </div>
  )
}
