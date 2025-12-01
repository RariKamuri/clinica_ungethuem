export interface RespostaCrua {
  [key: string]: {
    [question: string]: string
  }
}

export interface Patient {
  id: number
  nome_paciente: string
  telefone_paciente: string
  email: string
  tipo_atendimento: string
  gravidade: 'Urgente' | 'Moderado' | 'Leve'
  resposta_ia: string
  resposta_crua: RespostaCrua
}

export type Gravidade = 'Urgente' | 'Moderado' | 'Leve'

export type UserRole = 'medic' | 'assistant'

