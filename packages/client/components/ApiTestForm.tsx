'use client'

import { useState } from 'react'

export default function ApiTestForm() {
  const [name, setName] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })

    const data = await res.json()
    setResponse(data.message)
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 items-center"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="text-black p-2"
        />
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          Submit
        </button>
      </form>
      {response && <p className="text-center mt-5">{response}</p>}
    </div>
  )
}
