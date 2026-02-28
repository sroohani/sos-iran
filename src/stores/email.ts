import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { EmailRecipient } from '@/types'

const useEmailStore = defineStore('email', () => {
  const isEmailEditorVisible = ref(false)
  const emailRecipient = ref<EmailRecipient>('')

  return { isEmailEditorVisible, emailRecipient }
})

export default useEmailStore
