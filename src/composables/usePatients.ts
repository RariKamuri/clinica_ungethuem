import { ref, computed } from 'vue'
import type { Patient, Gravidade } from '@/types/patient'
import { mockPatients } from '@/services/mockPatients'

// State (similar to useState in React)
const patients = ref<Patient[]>([])
const isLoading = ref<boolean>(false)
const error = ref<string | null>(null)

// Filters
const searchQuery = ref<string>('')
const tipoAtendimentoFilter = ref<string>('all')
const gravidadeFilter = ref<string>('all')

// Computed properties
const filteredPatients = computed(() => {
  let filtered = [...patients.value]

  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(
      (patient) =>
        patient.nome_paciente.toLowerCase().includes(query) ||
        patient.email.toLowerCase().includes(query) ||
        patient.telefone_paciente.includes(query) ||
        patient.tipo_atendimento.toLowerCase().includes(query)
    )
  }

  // Tipo atendimento filter
  if (tipoAtendimentoFilter.value !== 'all') {
    filtered = filtered.filter(
      (patient) => patient.tipo_atendimento === tipoAtendimentoFilter.value
    )
  }

  // Gravidade filter
  if (gravidadeFilter.value !== 'all') {
    filtered = filtered.filter(
      (patient) => patient.gravidade === gravidadeFilter.value
    )
  }

  return filtered
})

// Get unique tipos de atendimento
const tiposAtendimento = computed(() => {
  const tipos = new Set(patients.value.map((p) => p.tipo_atendimento))
  return Array.from(tipos).sort()
})

// Fetch patients (mock implementation)
const fetchPatients = async (): Promise<void> => {
  isLoading.value = true
  error.value = null

  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock: Return mock data
    patients.value = mockPatients
  } catch (err: any) {
    error.value = err.message || 'Erro ao carregar pacientes'
    console.error('Error fetching patients:', err)
  } finally {
    isLoading.value = false
  }
}

// Get patient by ID
const getPatientById = (id: number): Patient | undefined => {
  return patients.value.find((p) => p.id === id)
}

// Export composable
export function usePatients() {
  return {
    // State
    patients: computed(() => patients.value),
    filteredPatients,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    searchQuery,
    tipoAtendimentoFilter,
    gravidadeFilter,
    tiposAtendimento,

    // Methods
    fetchPatients,
    getPatientById,
  }
}

