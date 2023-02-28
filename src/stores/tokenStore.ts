import type DecodedToken from '@/types/decodedToken'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTokenStore = defineStore('token', () => {
  const decodedToken = ref<DecodedToken | null>()

  const addToken = (token: DecodedToken) => {
    decodedToken.value = token
  }

  const deleteToken = () => {
    decodedToken.value = null
  }

  const userRoles = computed(() => decodedToken.value?.userInfo.roles)
  const userId = computed(() => decodedToken.value?.userInfo.userId)
  const userName = computed(() => decodedToken.value?.userInfo.userName)
  const isSeller = computed(() => decodedToken.value?.userInfo.roles.includes('seller'))

  return { addToken, deleteToken, userRoles, userId, userName, isSeller }
})
