import type { Patient } from '@/types/patient'

// Mock patient data
export const mockPatients: Patient[] = [
  {
    id: 1,
    nome_paciente: 'Roberto Silva',
    telefone_paciente: '51999131195',
    email: 'roberto@gmail.com',
    tipo_atendimento: 'Cirurgia Botox',
    gravidade: 'Urgente',
    resposta_ia: 'Paciente apresenta necessidade urgente de cirurgia estética. Recomenda-se avaliação imediata devido à complexidade do caso e possível comprometimento funcional. Histórico médico indica alergias a anestésicos locais. Requer atenção especial durante o procedimento.',
    resposta_crua: {
      pergunta_1: {
        'Qual sua dieta?': 'Dieta balanceada, evito alimentos processados'
      },
      pergunta_2: {
        'Tem alguma alergia?': 'Sim, alergia a anestésicos locais e penicilina'
      },
      pergunta_3: {
        'Já realizou procedimentos similares?': 'Sim, uma cirurgia plástica há 5 anos'
      },
      pergunta_4: {
        'Medicamentos em uso?': 'Antidepressivo (sertralina) e anti-hipertensivo'
      }
    }
  },
  {
    id: 2,
    nome_paciente: 'Maria Santos',
    telefone_paciente: '51998877665',
    email: 'maria.santos@email.com',
    tipo_atendimento: 'Consulta Dermatológica',
    gravidade: 'Moderado',
    resposta_ia: 'Paciente com quadro moderado de dermatite. Tratamento pode ser iniciado com medicação tópica. Seguimento em 2 semanas recomendado. Sem contraindicações identificadas.',
    resposta_crua: {
      pergunta_1: {
        'Quando começaram os sintomas?': 'Há aproximadamente 3 semanas'
      },
      pergunta_2: {
        'Já usou algum tratamento?': 'Sim, creme hidratante sem melhora'
      },
      pergunta_3: {
        'Histórico familiar de problemas de pele?': 'Mãe tem psoríase'
      }
    }
  },
  {
    id: 3,
    nome_paciente: 'João Oliveira',
    telefone_paciente: '51997766554',
    email: 'joao.oliveira@email.com',
    tipo_atendimento: 'Exame de Rotina',
    gravidade: 'Leve',
    resposta_ia: 'Paciente em bom estado geral. Exame de rotina sem alterações significativas. Manter acompanhamento anual. Recomendações de estilo de vida fornecidas.',
    resposta_crua: {
      pergunta_1: {
        'Pratica exercícios físicos?': 'Sim, 3 vezes por semana'
      },
      pergunta_2: {
        'Faz uso de tabaco ou álcool?': 'Não fumo, bebo socialmente'
      },
      pergunta_3: {
        'Histórico familiar de doenças?': 'Pai com diabetes tipo 2'
      }
    }
  },
  {
    id: 4,
    nome_paciente: 'Ana Costa',
    telefone_paciente: '51996655443',
    email: 'ana.costa@email.com',
    tipo_atendimento: 'Cirurgia Plástica',
    gravidade: 'Urgente',
    resposta_ia: 'Caso urgente de cirurgia plástica reparadora. Paciente apresenta lesão que requer intervenção cirúrgica imediata. Avaliação pré-operatória completa necessária. Risco moderado identificado.',
    resposta_crua: {
      pergunta_1: {
        'Motivo da cirurgia?': 'Reparação de lesão traumática no rosto'
      },
      pergunta_2: {
        'Quando ocorreu o trauma?': 'Há 2 semanas em acidente de trânsito'
      },
      pergunta_3: {
        'Medicamentos atuais?': 'Analgésicos e anti-inflamatórios'
      },
      pergunta_4: {
        'Condições médicas pré-existentes?': 'Hipertensão controlada'
      },
      pergunta_5: {
        'Cirurgias anteriores?': 'Apendicectomia há 10 anos'
      }
    }
  },
  {
    id: 5,
    nome_paciente: 'Carlos Mendes',
    telefone_paciente: '51995544332',
    email: 'carlos.mendes@email.com',
    tipo_atendimento: 'Consulta Cardiológica',
    gravidade: 'Moderado',
    resposta_ia: 'Paciente com sintomas moderados de arritmia. Eletrocardiograma necessário. Monitoramento cardíaco recomendado. Sem sinais de emergência imediata.',
    resposta_crua: {
      pergunta_1: {
        'Sintomas apresentados?': 'Palpitações e falta de ar ocasional'
      },
      pergunta_2: {
        'Frequência dos sintomas?': '2-3 vezes por semana'
      },
      pergunta_3: {
        'Histórico familiar cardíaco?': 'Pai com infarto aos 60 anos'
      }
    }
  },
  {
    id: 6,
    nome_paciente: 'Fernanda Lima',
    telefone_paciente: '51994433221',
    email: 'fernanda.lima@email.com',
    tipo_atendimento: 'Tratamento Estético',
    gravidade: 'Leve',
    resposta_ia: 'Paciente busca tratamento estético preventivo. Sem contraindicações. Procedimento de baixo risco. Expectativas realistas discutidas.',
    resposta_crua: {
      pergunta_1: {
        'Objetivo do tratamento?': 'Prevenção de rugas e melhora da textura'
      },
      pergunta_2: {
        'Expectativas?': 'Resultados naturais e sutis'
      },
      pergunta_3: {
        'Tratamentos anteriores?': 'Nenhum tratamento estético prévio'
      }
    }
  },
  {
    id: 7,
    nome_paciente: 'Pedro Alves',
    telefone_paciente: '51993322110',
    email: 'pedro.alves@email.com',
    tipo_atendimento: 'Cirurgia Botox',
    gravidade: 'Urgente',
    resposta_ia: 'Caso urgente de aplicação de Botox para espasmo muscular. Paciente apresenta blefaroespasmo que interfere na visão. Tratamento imediato recomendado.',
    resposta_crua: {
      pergunta_1: {
        'Sintomas principais?': 'Espasmos involuntários na pálpebra direita'
      },
      pergunta_2: {
        'Duração dos sintomas?': 'Há 1 mês, piorando progressivamente'
      },
      pergunta_3: {
        'Impacto na vida diária?': 'Dificulta leitura e direção'
      },
      pergunta_4: {
        'Tratamentos tentados?': 'Nenhum até o momento'
      }
    }
  },
  {
    id: 8,
    nome_paciente: 'Juliana Rocha',
    telefone_paciente: '51992211009',
    email: 'juliana.rocha@email.com',
    tipo_atendimento: 'Consulta Ginecológica',
    gravidade: 'Moderado',
    resposta_ia: 'Paciente com sintomas moderados que requerem investigação. Exames complementares necessários. Seguimento em 1 semana. Sem urgência imediata.',
    resposta_crua: {
      pergunta_1: {
        'Sintomas apresentados?': 'Irregularidade menstrual e desconforto'
      },
      pergunta_2: {
        'Duração?': 'Há 2 meses'
      },
      pergunta_3: {
        'Medicamentos?': 'Anticoncepcional oral'
      }
    }
  },
  {
    id: 9,
    nome_paciente: 'Ricardo Souza',
    telefone_paciente: '51991100998',
    email: 'ricardo.souza@email.com',
    tipo_atendimento: 'Exame de Rotina',
    gravidade: 'Leve',
    resposta_ia: 'Paciente assintomático para exame de rotina. Todos os parâmetros dentro da normalidade. Manter hábitos saudáveis. Retorno em 6 meses.',
    resposta_crua: {
      pergunta_1: {
        'Motivo da consulta?': 'Check-up anual'
      },
      pergunta_2: {
        'Sintomas?': 'Nenhum sintoma'
      },
      pergunta_3: {
        'Medicamentos?': 'Nenhum'
      }
    }
  },
  {
    id: 10,
    nome_paciente: 'Patricia Ferreira',
    telefone_paciente: '51990099887',
    email: 'patricia.ferreira@email.com',
    tipo_atendimento: 'Cirurgia Plástica',
    gravidade: 'Urgente',
    resposta_ia: 'Caso urgente de reconstrução mamária pós-mastectomia. Paciente em tratamento oncológico. Coordenação com equipe multidisciplinar necessária. Avaliação psicológica recomendada.',
    resposta_crua: {
      pergunta_1: {
        'Histórico médico?': 'Mastectomia há 6 meses, em tratamento quimioterápico'
      },
      pergunta_2: {
        'Expectativas?': 'Reconstrução natural e simétrica'
      },
      pergunta_3: {
        'Acompanhamento psicológico?': 'Sim, em terapia desde o diagnóstico'
      },
      pergunta_4: {
        'Medicamentos?': 'Quimioterapia e medicação de suporte'
      },
      pergunta_5: {
        'Condições atuais?': 'Boa recuperação pós-cirúrgica'
      }
    }
  },
  {
    id: 11,
    nome_paciente: 'Lucas Martins',
    telefone_paciente: '51989988776',
    email: 'lucas.martins@email.com',
    tipo_atendimento: 'Consulta Dermatológica',
    gravidade: 'Moderado',
    resposta_ia: 'Paciente com quadro moderado de acne cística. Tratamento sistêmico pode ser necessário. Avaliação de resistência a tratamentos anteriores. Seguimento em 4 semanas.',
    resposta_crua: {
      pergunta_1: {
        'Duração do problema?': 'Há 1 ano, piorando nos últimos 3 meses'
      },
      pergunta_2: {
        'Tratamentos anteriores?': 'Antibióticos tópicos sem sucesso'
      },
      pergunta_3: {
        'Impacto psicológico?': 'Moderado, afeta autoestima'
      }
    }
  },
  {
    id: 12,
    nome_paciente: 'Camila Torres',
    telefone_paciente: '51978877665',
    email: 'camila.torres@email.com',
    tipo_atendimento: 'Tratamento Estético',
    gravidade: 'Leve',
    resposta_ia: 'Paciente busca tratamento estético para manchas solares. Procedimento de baixo risco. Expectativas realistas. Sem contraindicações.',
    resposta_crua: {
      pergunta_1: {
        'Tipo de manchas?': 'Melasma e manchas solares no rosto'
      },
      pergunta_2: {
        'Exposição solar?': 'Uso regular de protetor solar'
      },
      pergunta_3: {
        'Tratamentos anteriores?': 'Cremes clareadores sem resultado satisfatório'
      }
    }
  },
  {
    id: 13,
    nome_paciente: 'Gabriel Nunes',
    telefone_paciente: '51967766554',
    email: 'gabriel.nunes@email.com',
    tipo_atendimento: 'Cirurgia Botox',
    gravidade: 'Urgente',
    resposta_ia: 'Caso urgente de aplicação de Botox para hiperidrose axilar severa. Impacto significativo na qualidade de vida. Tratamento imediato recomendado.',
    resposta_crua: {
      pergunta_1: {
        'Sintomas?': 'Sudorese excessiva nas axilas'
      },
      pergunta_2: {
        'Duração?': 'Há 5 anos, piorando'
      },
      pergunta_3: {
        'Impacto?': 'Afeta trabalho e relacionamentos'
      },
      pergunta_4: {
        'Tratamentos tentados?': 'Antiperspirantes clínicos sem sucesso'
      }
    }
  },
  {
    id: 14,
    nome_paciente: 'Isabela Campos',
    telefone_paciente: '51956655443',
    email: 'isabela.campos@email.com',
    tipo_atendimento: 'Consulta Cardiológica',
    gravidade: 'Moderado',
    resposta_ia: 'Paciente com sintomas moderados de hipertensão. Monitoramento de pressão arterial necessário. Ajuste medicamentoso pode ser requerido. Seguimento em 2 semanas.',
    resposta_crua: {
      pergunta_1: {
        'Valores de pressão?': '140/90 em média'
      },
      pergunta_2: {
        'Sintomas?': 'Dor de cabeça ocasional'
      },
      pergunta_3: {
        'Histórico familiar?': 'Mãe e avó com hipertensão'
      }
    }
  },
  {
    id: 15,
    nome_paciente: 'Thiago Ribeiro',
    telefone_paciente: '51945544332',
    email: 'thiago.ribeiro@email.com',
    tipo_atendimento: 'Exame de Rotina',
    gravidade: 'Leve',
    resposta_ia: 'Paciente jovem em excelente estado de saúde. Exame de rotina sem alterações. Manter estilo de vida saudável. Próximo retorno em 1 ano.',
    resposta_crua: {
      pergunta_1: {
        'Atividade física?': 'Exercícios 5 vezes por semana'
      },
      pergunta_2: {
        'Alimentação?': 'Dieta balanceada, rica em vegetais'
      },
      pergunta_3: {
        'Hábitos?': 'Não fuma, não bebe'
      }
    }
  }
]

