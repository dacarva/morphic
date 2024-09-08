const defaultResponse = `Here are the coefficients for the linear regression model:

Linear Regression Model Coefficients:

Intercept: 486.457
Income Coefficient: 0.00298
DTI Coefficient: 0.3635
Credit History Length Coefficient: 1.2569`

interface PromptResponse {
  coefficients: {
    intercept: number
    incomeCoefficient: number
    dtiCoefficient: number
    creditHistoryCoefficient: number
  }
}
export const decodePromptResponse = (
  response: string | null,
): PromptResponse | undefined => {
  console.log('response in the decode function is ', response)

  const regex =
    /Intercept:\s*(\d+\.?\d*)\s*Income Coefficient:\s*(\d+\.?\d*)\s*DTI Coefficient:\s*(\d+\.?\d*)\s*Credit History Length Coefficient:\s*(\d+\.?\d*)/

  const matches = response
    ? response.match(regex)
    : defaultResponse.match(regex)

  if (matches) {
    const intercept = parseFloat(matches[1])
    const incomeCoefficient = parseFloat(matches[2])
    const dtiCoefficient = parseFloat(matches[3])
    const creditHistoryCoefficient = parseFloat(matches[4])

    console.log({
      intercept,
      incomeCoefficient,
      dtiCoefficient,
      creditHistoryCoefficient,
    })
    return {
      coefficients: {
        intercept,
        incomeCoefficient,
        dtiCoefficient,
        creditHistoryCoefficient,
      },
    }
  }
  return undefined
}
