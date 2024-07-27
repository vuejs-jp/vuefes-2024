import { computed } from 'vue'
import { useSupabase, useAsyncData, useAuth } from '#imports'
import type { Status } from '~/components/namecard/CreationStatus.vue'
import type { NamecardUser, Role } from '@vuejs-jp/model'

export async function useNamecard(userId?:string) {
  const { fetchAttendeeDataByUserId } = useSupabase()
  const { getUser } = useAuth()

  const { data: authUser } = await useAsyncData('authUser', async () => {
    return await getUser()
  })

  const { data: attendeeByUserId } = await useAsyncData('attendeeByUserId', async () => {
    return await fetchAttendeeDataByUserId('attendees', authUser.value?.id ?? userId ?? '')
  })

  const attendeeDataByUserId = computed(() => {
    return attendeeByUserId.value?.data?.[0]
  })

  const statusKey = computed<Status>(() => {
    // TODO ここにステータスの判定ロジックを書く
    if (attendeeDataByUserId.value?.activated_at) {
      return 'inquiry_completed'
    } else {
      
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