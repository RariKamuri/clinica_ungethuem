// Mock API service for form questions and submission

interface QuestionsResponse {
  [key: string]: string
}

interface SubmitResponse {
  success: boolean
  message?: string
}

// Mock questions data - Proctology Clinic
const mockQuestions: QuestionsResponse = {
  pergunta_1: "Qual é o seu nome completo?",
  pergunta_2: "Qual é a sua data de nascimento?",
  pergunta_3: "Qual é o seu endereço de e-mail?",
  pergunta_4: "Qual é o seu número de telefone para contato?",
  pergunta_5: "Qual é o principal motivo da sua consulta?",
  pergunta_6: "Há quanto tempo você está apresentando esses sintomas?",
  pergunta_7: "Você já realizou algum exame ou tratamento relacionado a essa condição anteriormente?",
  pergunta_8: "Você toma algum medicamento regularmente ou possui alguma alergia medicamentosa?",
}

// Fetch questions from backend (mocked)
export const fetchQuestions = async (): Promise<QuestionsResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // In real implementation, this would be:
  // const response = await fetch('/api/questions')
  // return await response.json()
  
  return mockQuestions
}

// Submit form answers to backend (mocked)
export const submitForm = async (answers: Record<string, string>): Promise<SubmitResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // In real implementation, this would be:
  // const response = await fetch('/api/submit', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(answers)
  // })
  // return await response.json()
  
  console.log('Form submitted with answers:', answers)
  
  return {
    success: true,
    message: 'Formulário enviado com sucesso!'
  }
}

