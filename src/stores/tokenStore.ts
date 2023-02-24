import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore('token', () => {
  const savedToken = ref('')

  const addToken = (token: string) => {
    savedToken.value = token
  }

  const deleteToken = () => {
    savedToken.value = ''
  }

  return { savedToken, addToken, deleteToken }
})
