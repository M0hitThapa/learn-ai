"use client"

import { useState } from "react"

export const GenerateText = () => {
  const [generating, setGenerating] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const result = async () => {
    setIsLoading(true)
      await fetch("/api/generate-text", {
        method: "POST",
        body: JSON.stringify({
          prompt:"why my head feels so much pain in summer"
        })
      }).then(response => {
        response.json().then(json => {
          setGenerating(json._output)
          setIsLoading(false)
        })
      })
  }


  return (
    <div className="max-w-3xl mx-auto py-10">
      <div onClick={result}>
       Generate
      </div>
      {isLoading ? 'Loading...' : generating}


    </div>

  )
}
