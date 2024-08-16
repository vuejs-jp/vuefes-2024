import { useSupabaseClient } from '#imports'
import { bucket, type Role, type Table } from '@vuejs-jp/model'
import type { Database } from '~/types/generated/supabase'
import type { FormSpeaker, FormSponsor, FormAttendeeOverride, FormStaff, FormJob } from '~/types/supabase'

export function useSupabase() {
  const client = useSupabaseClient<Database>()

  async function fetchData(table: Table, options?: { id?: string; speakerId?: string[]; detailPageId?: string; sponsorId?: string }) {
    if (options?.id) {
      return await client.from(table).select().eq('id', options.id)
    }
    if (options?.speakerId) {
      return await client.from(table).select().in('id', options.speakerId)
    }
    if (options?.detailPageId) {
      return await client.from(table).select().eq('detail_page_id', options.detailPageId)
    }
    if (options?.sponsorId) {
      return await client.from(table).select().eq('sponsor_id', options.sponsorId)
    }
    return await client.from(table).select()
  }

  async function fetchAttendeeData(table: Extract<Table, 'attendees'>, role: Role) {
    return await client.from(table).select().eq('role', role)
  }

  async function fetchAttendeeDataByUserId(table: Extract<Table, 'attendees'>, userId:string) {
    return await client.from(table).select().eq('user_id', userId)
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

  async function upsertJob(table: Extract<Table, 'jobs'>, target: FormJob) {
    const targetData = { ...target }

    const { error } = await client.from(table).upsert(targetData)
    if (error) return
  }

  async function upsertAttendee(table: Extract<Table, 'attendees'>, target: FormAttendeeOverride) {
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

  return {
    fetchData,
    fetchAttendeeData,
    fetchAttendeeDataByUserId,
    upsertSpeaker,
    upsertSponsor,
    upsertJob,
    upsertAttendee,
    upsertStaff,
    uploadAvatar,
  }
}
