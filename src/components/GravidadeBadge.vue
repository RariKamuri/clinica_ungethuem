<template>
  <span
    :class="badgeClasses"
    class="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
  >
    {{ gravidade }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Gravidade } from '@/types/patient'

interface Props {
  gravidade: Gravidade
}

const props = defineProps<Props>()

const badgeClasses = computed(() => {
  switch (props.gravidade) {
    case 'Urgente':
      return 'bg-red-100 text-red-800 border border-red-200'
    case 'Moderado':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    case 'Leve':
      return 'bg-green-100 text-green-800 border border-green-200'
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
})
</script>

