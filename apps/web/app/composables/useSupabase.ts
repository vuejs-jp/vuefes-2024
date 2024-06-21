import { useSupabaseClient } from '#imports'
import type { Database } from '~/types/generated/supabase'
import type { FormSpeaker } from '~/types/supabase'

export function useSupabase() {
  const client = useSupabaseClient<Database>()

  async function fetchData(table: 'speakers') {
    return await client.from(table).select()
  }

  async function upsertSpeaker(table: 'speakers', target: FormSpeaker) {
    const targetData = { ...target }

    const { error } = await client.from(table).upsert(targetData)
    if (error) return
  }

  async function uploadAvatar(filePath: string, file: File) {
    await client.storage.from('common_asset').upload(filePath, file)
  }

  return { fetchData, upsertSpeaker, uploadAvatar }
}
