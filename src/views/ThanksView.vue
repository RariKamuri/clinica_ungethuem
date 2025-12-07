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
    <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-2xl">
        <div class="bg-white rounded-lg shadow-2xl p-8 md:p-12 text-center">
          <!-- Success Icon -->
          <div class="flex justify-center mb-6">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>

          <!-- Thank You Message -->
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Obrigado!
          </h1>
          
          <p class="text-lg md:text-xl text-gray-600 mb-6">
            Recebemos seu formulário de pré-consulta com sucesso.
          </p>
          
          <p class="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
            Agradecemos por compartilhar suas informações conosco. Nossa equipe da Clínica Ungethuem entrará em contato em breve para agendar sua consulta e dar continuidade ao seu atendimento.
          </p>
          
          <p class="text-base text-gray-600 mb-8">
            Estamos comprometidos em oferecer o melhor cuidado e tratamento para sua saúde.
          </p>

          <!-- Additional Info -->
          <div class="bg-green-50 rounded-lg p-6 mb-6">
            <p class="text-sm text-gray-700">
              <strong>Próximos passos:</strong> Você receberá um e-mail ou ligação de confirmação em até 48 horas úteis com informações sobre o agendamento da sua consulta.
            </p>
          </div>

          <!-- Logo -->
          <div class="flex items-center justify-center gap-3 mt-8">
            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Clínica Ungethuem</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Thanks view - no logic needed
</script>

<style scoped>
/* Additional styles if needed */
</style>

