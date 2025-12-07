<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Blurred Background Image -->
    <div 
      class="absolute inset-0 bg-cover bg-center"
      :style="{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&q=80)',
        filter: 'blur(8px)',
        transform: 'scale(1.1)'
      }"
    ></div>
    
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/20"></div>

    <!-- Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
      <!-- Loading State -->
      <div v-if="isLoading" class="w-full max-w-2xl">
        <div class="bg-white rounded-lg shadow-2xl p-8 md:p-12 text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p class="text-gray-600">Carregando formulário...</p>
        </div>
      </div>

      <!-- Welcome Screen -->
      <div v-else-if="currentStep === 0" class="w-full max-w-2xl">
        <div class="bg-[#1e3a5f] rounded-lg p-8 md:p-12 text-white shadow-2xl">
          <!-- Logo -->
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold">Clínica Ungethuem</h2>
          </div>
          
          <p class="text-lg mb-4">
            Olá! Bem-vindo ao formulário de pré-consulta da Clínica Ungethuem.
          </p>
          <p class="text-lg mb-6">
            Preencha as informações abaixo para agilizar seu atendimento e garantir que nossa equipe esteja preparada para recebê-lo da melhor forma possível.
          </p>
          <p class="text-xl font-semibold mb-8">
            {{ totalQuestions }} Perguntas
          </p>
          
          <button
            @click="startForm"
            class="w-full bg-primary hover:bg-primary-foreground text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            COMEÇAR →
          </button>
        </div>
      </div>

      <!-- Question Form -->
      <div v-else-if="currentStep <= totalQuestions" class="w-full max-w-2xl">
        <div class="bg-white rounded-lg shadow-2xl p-6 md:p-8">
          <!-- Question Title -->
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            {{ currentQuestion }}
          </h2>
          
          <!-- Input Field -->
          <div class="mb-6">
            <input
              v-model="answers[currentQuestionKey]"
              type="text"
              :placeholder="getPlaceholder(currentQuestionKey)"
              class="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              @keyup.enter="nextQuestion"
              ref="questionInput"
            />
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between gap-4 bg-green-50 p-4 rounded-lg -mx-6 md:-mx-8 -mb-6 md:-mb-8">
            <button
              v-if="currentStep > 1"
              @click="previousQuestion"
              class="px-6 py-3 bg-primary hover:bg-primary-foreground text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              ← ANTERIOR
            </button>
            <div v-else></div>
            
            <button
              v-if="currentStep < totalQuestions"
              @click="nextQuestion"
              :disabled="!answers[currentQuestionKey]?.trim()"
              class="px-6 py-3 bg-primary hover:bg-primary-foreground text-white font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              PRÓXIMO →
            </button>
            <button
              v-else
              @click="submitForm"
              :disabled="!answers[currentQuestionKey]?.trim() || isSubmitting"
              class="px-6 py-3 bg-primary hover:bg-primary-foreground text-white font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              {{ isSubmitting ? 'Enviando...' : 'TERMINAR E ENVIAR' }}
            </button>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mt-8">
          <div class="flex items-center justify-center gap-2 mb-2">
            <div
              v-for="(question, index) in questionKeys"
              :key="index"
              :class="[
                'w-3 h-3 rounded-full transition-all',
                index + 1 < currentStep ? 'bg-green-600' : 
                index + 1 === currentStep ? 'bg-primary w-4 h-4' : 
                'bg-gray-300'
              ]"
            ></div>
          </div>
          <div class="flex items-center justify-center gap-2 text-white">
            <span class="font-semibold">{{ currentStep }} de {{ totalQuestions }}</span>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { fetchQuestions, submitForm as submitFormApi } from '@/services/formApi'

const router = useRouter()

// State
const questions = ref<Record<string, string>>({})
const answers = ref<Record<string, string>>({})
const currentStep = ref(0)
const isLoading = ref(true)
const isSubmitting = ref(false)
const questionInput = ref<HTMLInputElement | null>(null)

// Computed
const questionKeys = computed(() => {
  // Sort questions by key to ensure proper order (pergunta_1, pergunta_2, etc.)
  return Object.keys(questions.value).sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0')
    const numB = parseInt(b.match(/\d+/)?.[0] || '0')
    return numA - numB
  })
})
const totalQuestions = computed(() => questionKeys.value.length)
const currentQuestionKey = computed(() => questionKeys.value[currentStep.value - 1])
const currentQuestion = computed(() => questions.value[currentQuestionKey.value] || '')

// Methods
const getPlaceholder = (key: string): string => {
  const lowerKey = key.toLowerCase()
  if (lowerKey.includes('nome')) {
    return 'Nome completo'
  }
  if (lowerKey.includes('data')) {
    return 'DD/MM/AAAA'
  }
  if (lowerKey.includes('email') || lowerKey.includes('e-mail')) {
    return 'seu@email.com'
  }
  if (lowerKey.includes('telefone')) {
    return '(00) 00000-0000'
  }
  if (lowerKey.includes('motivo')) {
    return 'Descreva o motivo da consulta...'
  }
  if (lowerKey.includes('tempo') || lowerKey.includes('quanto tempo')) {
    return 'Ex: 2 semanas, 1 mês, 3 meses...'
  }
  if (lowerKey.includes('exame') || lowerKey.includes('tratamento')) {
    return 'Descreva exames ou tratamentos anteriores...'
  }
  if (lowerKey.includes('medicamento') || lowerKey.includes('alergia')) {
    return 'Liste medicamentos ou alergias conhecidas...'
  }
  return 'Digite sua resposta...'
}

const startForm = () => {
  currentStep.value = 1
  nextTick(() => {
    questionInput.value?.focus()
  })
}

const nextQuestion = () => {
  if (currentStep.value < totalQuestions.value) {
    currentStep.value++
    nextTick(() => {
      questionInput.value?.focus()
    })
  }
}

const previousQuestion = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    nextTick(() => {
      questionInput.value?.focus()
    })
  }
}

const submitForm = async () => {
  if (!answers.value[currentQuestionKey.value]?.trim()) {
    return
  }

  isSubmitting.value = true

  try {
    await submitFormApi(answers.value)
    router.push('/thanks')
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Erro ao enviar formulário. Por favor, tente novamente.')
  } finally {
    isSubmitting.value = false
  }
}

// Load questions on mount
onMounted(async () => {
  try {
    questions.value = await fetchQuestions()
    isLoading.value = false
  } catch (error) {
    console.error('Error loading questions:', error)
    isLoading.value = false
    alert('Erro ao carregar perguntas. Por favor, recarregue a página.')
  }
})
</script>

<style scoped>
/* Additional styles if needed */
</style>

