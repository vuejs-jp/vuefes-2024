import { useSupabaseClient } from '#imports'
import { bucket, type Table } from '@vuejs-jp/model'
import type { Database } from '~/types/generated/supabase'
import type { FormSpeaker, FormSponsor } from '~/types/supabase'

export function useSupabase() {
  const client = useSupabaseClient<Database>()

  async function fetchData(table: Table) {
    return await client.from(table).select()
  }

  async function upsertSpeaker(table: Extract<Table, 'speakers'>, target: FormSpeaker) {
    const targetData = { ...target }

    const { error } = await client.from(table).upsert(targetData)
    if (error) return
  }

  async function upsertSponsor(table: Extract<Table, 'sponsors'>, target: FormSponsor) {
    const targetData = { ...target }

    const { error } = await client.from(table).upsert(targetData)
    if (error) return
  }

  async function uploadAvatar(filePath: string, file: File) {
    await client.storage.from(bucket).upload(filePath, file)
  }

  return { fetchData, upsertSpeaker, upsertSponsor, uploadAvatar }
}
