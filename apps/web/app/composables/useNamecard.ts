import { computed } from 'vue'
import { useSupabase, useAsyncData, useAuth } from '#imports'
import type { Status } from '~/components/namecard/CreationStatus.vue'
import type { Attendee } from '@vuejs-jp/model'


export async function useNamecard(userId?:string) {
  const { fetchAttendeeDataByUserId } = useSupabase()
  const { getUser } = useAuth()

  const { data: authUserId } = await useAsyncData('authUserId', async () => {
    return (await getUser()).id
  })

  const { data: attendeeByUserId } = await useAsyncData('attendeeByUserId', async () => {
    return await fetchAttendeeDataByUserId('attendees', authUserId.value ?? userId ?? '')
  })

  const userData = computed(() => {
    return attendeeByUserId.value?.data?.[0]
  })

  const statusKey = computed<Status>(() => {
    // TODO テーブルのどの箇所を参照して全ステータスを判定する？
    if (userData.value?.activated_at) {
      return 'inquiry_in_progress'
    } else {
      return 'not_created'
    }
  })

  const attendee = computed<Attendee>(() => {
    // TODO time 系は空文字じゃない方が良い。supabase側で設定できるのか、フロント側でnew Date使うのか？
    return {
      id: userData.value?.id ?? '',
      user_id: userData.value?.user_id ?? '',
      activated_at: userData.value?.activated_at ?? '',
      created_at: userData.value?.created_at ?? '',
      updated_at: userData.value?.updated_at ?? '',
      display_name: userData.value?.display_name ?? '',
      email: userData.value?.email ?? '',
      provider: userData.value?.provider ?? '',
      avatar_url: userData.value?.avatar_url ?? '',
      role: userData.value?.role ?? '',
      receipt_id: userData.value?.receipt_id ?? '',
    }
  })
  return { authUserId, userData, statusKey, attendee }
}