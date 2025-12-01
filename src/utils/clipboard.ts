/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when text is copied
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // Use modern clipboard API
      await navigator.clipboard.writeText(text)
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
        textArea.remove()
      } catch (err) {
        textArea.remove()
        throw err
      }
    }
  } catch (err) {
    console.error('Failed to copy text:', err)
    throw new Error('Falha ao copiar para a área de transferência')
  }
}

/**
 * Format resposta_crua as readable text
 * @param respostaCrua - The resposta_crua object
 * @returns Formatted string
 */
export function formatRespostaCrua(respostaCrua: Record<string, Record<string, string>>): string {
  const lines: string[] = []
  
  Object.entries(respostaCrua).forEach(([key, questions]) => {
    // Skip the key (pergunta_1, pergunta_2, etc.) and just show questions
    Object.entries(questions).forEach(([question, answer]) => {
      lines.push(`${question}: ${answer}`)
    })
    lines.push('') // Empty line between sections
  })
  
  return lines.join('\n')
}

