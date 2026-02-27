import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Language } from '@/types'

const useLanguageStore = defineStore('language', () => {
  const languages = ref<Language[]>([
    { name: 'پارسی', code: 'FA' },
    { name: 'English', code: 'EN' },
  ])
  const selectedLanguage = ref<Language>(languages.value[1]!)

  return { languages, selectedLanguage }
})

export default useLanguageStore
