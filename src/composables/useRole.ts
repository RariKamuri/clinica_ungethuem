import { ref, computed } from 'vue'
import { useAuth } from './useAuth'
import type { UserRole } from '@/types/patient'

// State (similar to useState in React)
const currentRole = ref<UserRole>('assistant') // Default role

// Get role from user data or localStorage
const initializeRole = (): void => {
  const { user } = useAuth()
  
  // Check localStorage first
  const storedRole = localStorage.getItem('user_role') as UserRole | null
  if (storedRole && (storedRole === 'medic' || storedRole === 'assistant')) {
    currentRole.value = storedRole
    return
  }

  // Check user data from auth
  if (user.value?.role) {
    const role = user.value.role as UserRole
    if (role === 'medic' || role === 'assistant') {
      currentRole.value = role
      localStorage.setItem('user_role', role)
      return
    }
  }

  // Default to assistant
  currentRole.value = 'assistant'
  localStorage.setItem('user_role', 'assistant')
}

// Set role
const setRole = (role: UserRole): void => {
  if (role === 'medic' || role === 'assistant') {
    currentRole.value = role
    localStorage.setItem('user_role', role)
  }
}

// Computed properties
const isMedic = computed(() => currentRole.value === 'medic')
const isAssistant = computed(() => currentRole.value === 'assistant')

// Check if user can access resposta_crua
const canAccessRespostaCrua = computed(() => isMedic.value)

// Export composable
export function useRole() {
  // Initialize on first use
  if (!localStorage.getItem('user_role')) {
    initializeRole()
  } else {
    const storedRole = localStorage.getItem('user_role') as UserRole
    if (storedRole === 'medic' || storedRole === 'assistant') {
      currentRole.value = storedRole
    }
  }

  return {
    // State
    role: computed(() => currentRole.value),
    isMedic,
    isAssistant,
    canAccessRespostaCrua,

    // Methods
    setRole,
    initializeRole,
  }
}

