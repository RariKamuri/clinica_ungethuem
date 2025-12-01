<template>
  <div class="flex items-center gap-2">
    <span class="text-sm text-gray-600">Role:</span>
    <select
      :value="role"
      @change="handleRoleChange"
      class="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    >
      <option value="assistant">Assistant</option>
      <option value="medic">Medic</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useRole } from '@/composables/useRole'

const { role, setRole } = useRole()

const handleRoleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  setRole(target.value as 'medic' | 'assistant')
  // Reload page to apply role changes
  window.location.reload()
}
</script>

<style scoped>
.text-primary {
  color: #558025;
}
</style>

