<template>
  <div
    @click="handleClick"
    class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 hover:border-primary/30 p-6"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ patient.nome_paciente }}
          </h3>
          <span class="text-xs text-gray-500">ID: {{ patient.id }}</span>
        </div>
        <p class="text-sm text-gray-600 mb-1">
          {{ patient.tipo_atendimento }}
        </p>
      </div>
      <GravidadeBadge :gravidade="patient.gravidade" />
    </div>

    <div class="space-y-2 text-sm text-gray-500">
      <div class="flex items-center gap-2">
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <span class="truncate">{{ patient.email }}</span>
      </div>
      <div class="flex items-center gap-2">
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
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span>{{ patient.telefone_paciente }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Patient } from '@/types/patient'
import GravidadeBadge from './GravidadeBadge.vue'

interface Props {
  patient: Patient
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [patient: Patient]
}>()

const handleClick = () => {
  emit('click', props.patient)
}
</script>

