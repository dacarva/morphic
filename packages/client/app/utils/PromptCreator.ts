const text1 = 'I have a dataset in stringified JSON format representing a cloud of points. Each point has the following structure:\n';
const structure = `{
  "creditHistoryLength": number,
  "creditScore": number,
  "date": string,
  "dti": number,
  "income": number
}`
const text2 = '\nI need you to parse this stringified JSON, perform a linear regression on the dataset to predict the creditScore based on the income, dti, and creditHistoryLength, and then provide the coefficients of the regression equation in the following format:\n';
const format = `
  Linear Regression Model Coefficients:
  Intercept: {intercept}
  Income Coefficient: {incomeCoefficient}
  DTI Coefficient: {dtiCoefficient}
  Credit History Length Coefficient: {creditHistoryCoefficient}\n`

const text3 = 'The dataset is as follows:\n';

// const note = '\n NOTE: avoid to add any code explanation, or code examples, just the requested prompt.';

export const promptCreator = (stringifiedData: string) : string | undefined => {
  if(!stringifiedData) {
    return undefined;
  }
  return text1 + structure + text2 + format + text3 + stringifiedData;
}