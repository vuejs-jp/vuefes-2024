import { computed } from 'vue'
import { useSupabaseUser, useAsyncData } from '#imports'
import { useSupabase } from '~/composables/useSupabase' 
import type { NamecardStatus, NamecardUser, Role } from '@vuejs-jp/model'

export async function useNamecard(userId?: string) {
  const { fetchAttendeeDataByUserId } = useSupabase()

  const authUser = useSupabaseUser()

  const { data: attendeeByUserId } = await useAsyncData('attendeeByUserId', async () => {
    return await fetchAttendeeDataByUserId('attendees', userId ?? authUser.value?.id ?? '')
  })

  const attendeeDataByUserId = computed(() => {
    return attendeeByUserId.value?.data?.[0]
  })

  const statusKey = computed<NamecardStatus>(() => {
    if (attendeeDataByUserId.value?.activated_at) {
      return 'inquiry_completed'
    } else if (!attendeeDataByUserId.value?.role){
     return 'not_created'
    } else if (attendeeDataByUserId.value?.canceled_at) {
      return 'inquiry_failed'
    } else {
      return 'inquiry_in_progress'
    }
  })

  const namecardUser = computed<NamecardUser>(() => {
    return {
      display_name: attendeeDataByUserId.value?.display_name ?? '',
      avatar_url: attendeeDataByUserId.value?.avatar_url ?? '',
      role: attendeeDataByUserId.value?.role as Role ?? '',
      receipt_id: attendeeDataByUserId.value?.receipt_id ?? '',
    }
  })

  return { authUser, attendeeDataByUserId, statusKey, namecardUser }
}