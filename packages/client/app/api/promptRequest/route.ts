import { NextResponse } from 'next/server'
const { GoogleGenerativeAI } = require('@google/generative-ai')

export async function POST(request: Request) {
  try {
    console.log('entered to request open ai')
    const { prompt } = await request.json()

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { message: 'API key is required' },
        { status: 500 },
      )
    }
    console.log('apiKey', apiKey)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(prompt)
    console.log('result was ', result.response.text())

    return NextResponse.json({ data: result.response.text() })
  } catch (error) {
    console.log('error on request', error)
  }
}
