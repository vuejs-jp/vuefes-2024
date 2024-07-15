import { useSupabaseClient } from '#imports'
import { bucket, type Role, type Table } from '@vuejs-jp/model'
import type { Database } from '~/types/generated/supabase'
import type { FormSpeaker, FormSponsor, FormAttendee, FormStaff } from '~/types/supabase'

export function useSupabase() {
  const client = useSupabaseClient<Database>()

  async function fetchData(table: Table, options?: { id?: string; detailPageId?: string }) {
    if (options?.id) {
      return await client.from(table).select().eq('id', options.id)
    }
    if (options?.detailPageId) {
      return await client.from(table).select().eq('detail_page_id', options.detailPageId)
    }
    return await client.from(table).select()
  }

  async function fetchAttendeeData(table: Extract<Table, 'attendees'>, role: Role) {
    return await client.from(table).select().eq('role', role)
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

  async function upsertAttendee(table: Extract<Table, 'attendees'>, target: FormAttendee) {
    const targetData = { ...target }

    const { error } = await client.from(table).upsert(targetData)
    if (error) return
  }

  async function upsertStaff(table: Extract<Table, 'staffs'>, target: FormStaff) {
    const targetData = { ...target }

    const { error } = await client.from(table).upsert(targetData)
    if (error) return
  }

  async function uploadAvatar(filePath: string, file: File) {
    await client.storage.from(bucket).upload(filePath, file)
  }

  return { fetchData, fetchAttendeeData, upsertSpeaker, upsertSponsor, upsertAttendee, upsertStaff, uploadAvatar }
}
