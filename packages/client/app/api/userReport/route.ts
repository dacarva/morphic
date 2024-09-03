import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { documentNumber } = await request.json()

  if (!documentNumber) {
    return NextResponse.json(
      { message: 'Document number is required' },
      { status: 400 },
    )
  }

  const generateData = (numSamples: number) => {
    const data = []
    let currentDate = new Date()

    let baseIncome = 50000
    let baseDTI = 20
    let baseCreditHistoryLength = 10

    for (let i = 0; i < numSamples; i++) {
      const income = baseIncome + i * 500 + Math.random() * 1000 - 500 
      const dti = baseDTI + i * 0.6 + Math.random() * 1 - 0.5
      const creditHistoryLength = baseCreditHistoryLength + i + Math.random() * 2 - 1

      // based on ----> Credit Score=486.72+2.98×Income+0.36×DTI+1.26×Credit History Length
      const creditScore =
        486.72 +
        2.98 * (income / 1000) +
        0.36 * dti +
        1.26 * creditHistoryLength

      data.push({
        date: currentDate.toISOString(),
        income: Math.round(income * 100) / 100, 
        dti: Math.round(dti * 100) / 100,
        creditHistoryLength: Math.round(creditHistoryLength * 100) / 100,
        creditScore: Math.round(creditScore * 100) / 100, //Just for testing purposes, and to calibrate, we shouldnt return it
      })
      currentDate.setMonth(currentDate.getMonth() - 1)
    }
    return data
  }

  const sampleData = generateData(10)
  return NextResponse.json({ documentNumber, sampleData })
}
