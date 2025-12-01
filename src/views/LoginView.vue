<template>
  <div class="min-h-screen flex items-center justify-center p-4" style="background-color: #fafafa;">
    <div class="w-full max-w-md shadow-2xl bg-white rounded-lg">
      <div class="p-8 text-center space-y-4">
        <div class="flex justify-center">
          <img src="/logo.svg" alt="Logo" class="h-24 w-24" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-primary">Clínica Ungethuem</h1>
          <p class="text-base mt-2 text-muted-foreground">
            Gestão de Pré atendimento
          </p>
        </div>
      </div>
      <div class="px-8 pb-8">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {{ error }}
          </div>
          <div class="space-y-2">
            <label for="email" class="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email"
              v-model="email"
              required
              :disabled="isLoading"
              class="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
              autocomplete="email"
            />
          </div>
          <div class="space-y-2">
            <label for="password" class="text-sm font-medium">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              v-model="password"
              required
              :disabled="isLoading"
              class="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            />
          </div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full h-11 text-base font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style="background-color: #558025;"
          >
            {{ isLoading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

// State (similar to useState in React)
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref<string | null>(null)

const { login } = useAuth()
const router = useRouter()

const handleSubmit = async () => {
  error.value = null
  
  // Normalize email
  const normalizedEmail = email.value.trim().toLowerCase()
  
  isLoading.value = true

  try {
    await login(normalizedEmail, password.value)
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.message || 'Erro ao fazer login. Por favor, tente novamente.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.text-primary {
  color: #558025;
}

.text-muted-foreground {
  color: #6b7280;
}
</style>

