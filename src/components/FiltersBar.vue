<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
      Filtros
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Search -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Buscar</label>
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Nome, email, telefone ou tipo..."
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            @input="handleSearch"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <!-- Tipo Atendimento Filter -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Tipo de Atendimento</label>
        <select
          v-model="tipoAtendimentoFilter"
          @change="handleFilterChange"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">Todos</option>
          <option
            v-for="tipo in tiposAtendimento"
            :key="tipo"
            :value="tipo"
          >
            {{ tipo }}
          </option>
        </select>
      </div>

      <!-- Gravidade Filter -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Gravidade</label>
        <select
          v-model="gravidadeFilter"
          @change="handleFilterChange"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">Todas</option>
          <option value="Urgente">Urgente</option>
          <option value="Moderado">Moderado</option>
          <option value="Leve">Leve</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePatients } from '@/composables/usePatients'

const {
  searchQuery,
  tipoAtendimentoFilter,
  gravidadeFilter,
  tiposAtendimento,
} = usePatients()

const emit = defineEmits<{
  search: []
  filter: []
}>()

const handleSearch = () => {
  emit('search')
}

const handleFilterChange = () => {
  emit('filter')
}
</script>

<style scoped>
.text-primary {
  color: #558025;
}
</style>

