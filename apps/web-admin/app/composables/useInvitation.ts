import { computed, ref } from 'vue'
import { useFormError } from '@vuejs-jp/composable'

export function useInvitation() {
  const email = ref('')
  const id = ref('')
  const { ...rest } = useFormError()

  const isSubmittingId = computed(() => {
    if (!id.value) return false
    return rest.idError.value === ''
  })

  const isSubmittingEmail = computed(() => {
    if (!email.value) return false
    return rest.emailError.value === ''
  })

  async function publish(type: 'invite' | 'delete', target: string) {
    // eslint-disable-next-line no-undef
    await $fetch(`/api/${type}-user`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',      
      },
      body: JSON.stringify(type === 'invite' ? { email: target } : { id: target }),
    })
  }

  return { publish, isSubmittingId, isSubmittingEmail, email, id, ...rest }
}
