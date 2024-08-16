import { onMounted, ref, watch } from 'vue'
import { useSupabaseUser, useAsyncData } from '#imports'
import { useSupabase } from '~/composables/useSupabase'
import { useAuthStore } from '~/store/auth'
import type { NamecardStatus, NamecardUser, Role } from '@vuejs-jp/model'

export function useNamecard(userId?: string) {
  const { fetchAttendeeDataByUserId } = useSupabase()
  const { signedUserId, setSignedUserId } = useAuthStore()

  async function getNamecardData() {
    const { data: attendeeByUserId } = await useAsyncData('attendeeByUserId', async () => {
      return await fetchAttendeeDataByUserId('attendees', userId ?? authUser.value?.id ?? signedUserId ??'')
    })
    attendeeDataByUserId.value = attendeeByUserId?.value?.data?.[0]
    statusKey.value = getStatus()
    namecardUser.value = {
      display_name: attendeeDataByUserId.value?.display_name ?? '',
      avatar_url: attendeeDataByUserId.value?.avatar_url ?? '',
      role: attendeeDataByUserId.value?.role as Role ?? '',
      receipt_id: attendeeDataByUserId.value?.receipt_id ?? '',
    }
  }

  function getStatus() {
      if (attendeeDataByUserId.value?.activated_at) {
        return 'inquiry_completed'
      } else if (!attendeeDataByUserId.value?.role){
       return 'not_created'
      } else if (attendeeDataByUserId.value?.canceled_at) {
        return 'inquiry_failed'
      } else {
        return 'inquiry_in_progress'
      }
  }

  const authUser = useSupabaseUser()
  const attendeeDataByUserId = ref()
  const statusKey = ref<NamecardStatus>()
  const namecardUser = ref<NamecardUser>()

  onMounted(async () => {
    await getNamecardData()
  })

  watch(authUser, async (newUser) => {
    if (newUser?.id) {
      await getNamecardData()
      setSignedUserId(newUser.id)
    }
  }, { immediate: true })

  return { authUser, attendeeDataByUserId, statusKey, namecardUser, getNamecardData }
}