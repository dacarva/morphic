'use client'

import { decodePromptResponse } from '@/app/utils/DecodePromptResponse'
import { promptCreator } from '@/app/utils/PromptCreator'
import { useState } from 'react'

export default function ApiTestForm() {
  const [documentNumber, setDocumentNumber] = useState('')
  const [responseReport, setResponseReport] = useState('')

  const fetchUserData = async (e: React.FormEvent) => {
    console.log('on fetchUserData')
    console.log(documentNumber)

    e.preventDefault()
    if (!documentNumber) {
      setResponseReport('Document number is required')
      return
    }
    const res = await fetch('/api/userReport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ documentNumber }),
    })

    const data = await res.json()
    console.log(data)
    const stringifiedData = JSON.stringify(data)
    console.log('points are', stringifiedData)

    const newPrompt = promptCreator(stringifiedData)
    console.log('newprompt is ', newPrompt)

    //testing Prompt gemini
    const requestedData = await fetch('/api/promptRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: newPrompt }),
    })
    const dataPrompt = await requestedData.json()
    console.log('dataPrompt is ', dataPrompt)

    console.log('dataPrompt.data is ', dataPrompt.data)

    const responseValues = decodePromptResponse(dataPrompt.data)
    console.log('response with values is', responseValues)
  }

  return (
    <div>
      <form
        onSubmit={fetchUserData}
        className="flex flex-col gap-5 items-center"
      >
        <input
          type="text"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
          placeholder="Enter User ID"
          className="text-black p-2"
        />
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          Fetch User report Data
        </button>
      </form>
      {responseReport && (
        <p className="text-center mt-5 text-blue-600">{responseReport}</p>
      )}
    </div>
  )
}
