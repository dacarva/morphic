'use client'

import { Fragment, useState } from 'react'

export default function ApiTestForm() {
  const [name, setName] = useState('')
  const [documentNumber, setDocumentNumber] = useState('')
  const [response, setResponse] = useState('')
  const [responseReport, setResponseReport] = useState('')

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

  const fetchUserData = async (e: React.FormEvent) => {
    console.log('on fetchUserData');
    console.log(documentNumber);
    
    e.preventDefault()
    if(!documentNumber) {
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
    console.log(data);
    
  }

  return (
    <Fragment>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 items-center"
        >
          <input
            type="text"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            placeholder="Enter User ID"
            className="text-black p-2"
          />
          <button className="bg-blue-500 text-white p-2 rounded" onClick={fetchUserData}>
            Fetch User report Data
          </button>
        </form>
        {responseReport && <p className="text-center mt-5 text-blue-600">{responseReport}</p>}
      </div>
      <div className='mt-20'>
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
    </Fragment>
  )
}
