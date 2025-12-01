<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto"
    @click.self="handleClose"
  >
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div
        class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        @click.stop
      >
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">
              {{ patient?.nome_paciente }}
            </h2>
            <p class="text-sm text-gray-500 mt-1">ID: {{ patient?.id }}</p>
          </div>
          <button
            @click="handleClose"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto px-6 py-4">
          <div class="space-y-6">
            <!-- Patient Info -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-500">Email</label>
                <p class="text-gray-900">{{ patient?.email }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">Telefone</label>
                <p class="text-gray-900">{{ patient?.telefone_paciente }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">Tipo de Atendimento</label>
                <p class="text-gray-900">{{ patient?.tipo_atendimento }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">Gravidade</label>
                <div>
                  <GravidadeBadge v-if="patient" :gravidade="patient.gravidade" />
                </div>
              </div>
            </div>

            <!-- Resposta IA -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="text-sm font-medium text-gray-700">Resposta IA</label>
                <button
                  @click="copyRespostaIA"
                  :disabled="isCopyingIA"
                  class="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  {{ isCopyingIA ? 'Copiando...' : 'Copiar Resposta IA' }}
                </button>
              </div>
              <div class="bg-gray-50 rounded-md p-4 border border-gray-200">
                <p class="text-gray-700 whitespace-pre-wrap">{{ patient?.resposta_ia }}</p>
              </div>
            </div>

            <!-- Resposta Crua (Role-based) -->
            <div v-if="canAccessRespostaCrua && patient">
              <div class="flex items-center justify-between mb-2">
                <label class="text-sm font-medium text-gray-700">Resposta Crua</label>
                <button
                  @click="copyRespostaCrua"
                  :disabled="isCopyingCrua"
                  class="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  {{ isCopyingCrua ? 'Copiando...' : 'Copiar resposta crua' }}
                </button>
              </div>
              <div class="bg-gray-50 rounded-md p-4 border border-gray-200">
                <div class="space-y-4">
                  <div
                    v-for="(questions, key) in patient.resposta_crua"
                    :key="key"
                    class="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div class="space-y-2">
                      <div
                        v-for="(answer, question) in questions"
                        :key="question"
                        class="text-gray-700"
                      >
                        <span class="font-medium">{{ question }}:</span>
                        <span class="ml-2">{{ answer }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Access Denied Message -->
            <div v-else class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p class="text-sm text-yellow-800">
                  Você não tem permissão para visualizar a resposta crua. Apenas médicos têm acesso a esta informação.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            @click="handleClose"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Patient } from '@/types/patient'
import { useRole } from '@/composables/useRole'
import { copyToClipboard, formatRespostaCrua } from '@/utils/clipboard'
import GravidadeBadge from './GravidadeBadge.vue'

interface Props {
  isOpen: boolean
  patient: Patient | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const { canAccessRespostaCrua } = useRole()
const isCopyingIA = ref(false)
const isCopyingCrua = ref(false)

const handleClose = () => {
  emit('close')
}

const copyRespostaIA = async () => {
  if (!props.patient) return
  
  isCopyingIA.value = true
  try {
    await copyToClipboard(props.patient.resposta_ia)
    // Show success feedback (you can add a toast notification here)
    alert('Resposta IA copiada para a área de transferência!')
  } catch (error) {
    alert('Erro ao copiar resposta IA')
    console.error(error)
  } finally {
    isCopyingIA.value = false
  }
}

const copyRespostaCrua = async () => {
  if (!props.patient) return
  
  isCopyingCrua.value = true
  try {
    const formatted = formatRespostaCrua(props.patient.resposta_crua)
    await copyToClipboard(formatted)
    alert('Resposta crua copiada para a área de transferência!')
  } catch (error) {
    alert('Erro ao copiar resposta crua')
    console.error(error)
  } finally {
    isCopyingCrua.value = false
  }
}
</script>

<style scoped>
.text-primary {
  color: #558025;
}
</style>

