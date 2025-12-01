<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="border-b bg-white sticky top-0 z-10 shadow-sm">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" class="h-12 w-12" />
          <div>
            <h1 class="text-2xl font-bold text-primary">Clínica Ungethuem</h1>
            <p class="text-sm text-muted-foreground">Gestão de Pré atendimento</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <RoleSwitcher />
          <div class="text-right hidden sm:block">
            <p class="text-sm font-medium text-foreground">
              {{ user?.email || user?.username || 'Usuário' }}
            </p>
            <p class="text-xs text-muted-foreground">Usuário</p>
          </div>
          <button
            @click="handleLogout"
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center gap-2 transition-colors"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sair
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Stats Summary -->
      <div class="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div class="text-sm text-gray-500 mb-1">Total de Pacientes</div>
          <div class="text-2xl font-bold text-gray-900">{{ filteredPatients.length }}</div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div class="text-sm text-gray-500 mb-1">Urgentes</div>
          <div class="text-2xl font-bold text-red-600">
            {{ filteredPatients.filter(p => p.gravidade === 'Urgente').length }}
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div class="text-sm text-gray-500 mb-1">Moderados</div>
          <div class="text-2xl font-bold text-yellow-600">
            {{ filteredPatients.filter(p => p.gravidade === 'Moderado').length }}
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div class="text-sm text-gray-500 mb-1">Leves</div>
          <div class="text-2xl font-bold text-green-600">
            {{ filteredPatients.filter(p => p.gravidade === 'Leve').length }}
          </div>
        </div>
      </div>

      <!-- Filters -->
      <FiltersBar @search="handleSearch" @filter="handleFilter" />

      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p class="text-gray-500">Carregando pacientes...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-red-800">{{ error }}</p>
        </div>
      </div>

      <!-- Patients Grid -->
      <div v-else-if="filteredPatients.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PatientCard
          v-for="patient in filteredPatients"
          :key="patient.id"
          :patient="patient"
          @click="handlePatientClick"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-lg shadow-md p-12 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Nenhum paciente encontrado</h3>
        <p class="text-gray-500">Tente ajustar os filtros de busca</p>
      </div>
    </main>

    <!-- Patient Report Modal -->
    <PatientReportModal
      :is-open="isModalOpen"
      :patient="selectedPatient"
      @close="handleCloseModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { usePatients } from '@/composables/usePatients'
import PatientCard from '@/components/PatientCard.vue'
import FiltersBar from '@/components/FiltersBar.vue'
import PatientReportModal from '@/components/PatientReportModal.vue'
import RoleSwitcher from '@/components/RoleSwitcher.vue'
import type { Patient } from '@/types/patient'

const { user, logout } = useAuth()
const {
  filteredPatients,
  isLoading,
  error,
  fetchPatients,
} = usePatients()

const isModalOpen = ref(false)
const selectedPatient = ref<Patient | null>(null)

onMounted(() => {
  fetchPatients()
})

const handleLogout = async () => {
  await logout()
}

const handleSearch = () => {
  // Search is handled reactively by the composable
}

const handleFilter = () => {
  // Filter is handled reactively by the composable
}

const handlePatientClick = (patient: Patient) => {
  selectedPatient.value = patient
  isModalOpen.value = true
}

const handleCloseModal = () => {
  isModalOpen.value = false
  selectedPatient.value = null
}
</script>

<style scoped>
.text-primary {
  color: #558025;
}

.text-muted-foreground {
  color: #6b7280;
}

.text-foreground {
  color: #111827;
}
</style>

