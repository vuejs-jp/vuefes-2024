import type { SignedUserId } from '@vuejs-jp/model'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const signedUserId = ref<SignedUserId>(null)

  const setSignedUserId = (target: SignedUserId) => {
    signedUserId.value = target
  }

  return {
    signedUserId: computed(() => signedUserId.value),
    setSignedUserId,
  }
})
