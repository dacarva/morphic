import { useState } from 'react'
import ApiTestForm from './components/ApiTestForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-10">Morphic</h1>
      <ApiTestForm />
    </main>
  )
}
