import { useSupabaseClient } from '#imports'
import { type Table } from '@vuejs-jp/model'
import type { Database } from '~/types/generated/supabase'

export function useSupabaseCsv() {
  const client = useSupabaseClient<Database>()

  async function exportSpeaker(table: Extract<Table, 'speakers'>) {
    const { data, error } = await client.from(table)
      .select()
      .eq('is_open', true)
      .csv()
    if (error) return

    return data
  }

  async function exportSponsor(table: Extract<Table, 'sponsors'>) {
    const { data, error } = await client.from(table)
      .select()
      .eq('is_open', true)
      .csv()
    if (error) return

    return data
  }

  async function exportJob(table: Extract<Table, 'jobs'>) {
    const { data, error } = await client.from(table)
      .select()
      .eq('is_open', true)
      .csv()
    if (error) return

    return data
  }

  async function exportAttendee(table: Extract<Table, 'attendees'>) {
    const { data, error } = await client.from(table)
      .select('display_name, image_url, image_file_name')
      .neq('activated_at', null)
      .csv()
    if (error) return

    return data
  }

  async function exportStaff(table: Extract<Table, 'staffs'>) {
    const { data, error } = await client.from(table)
      .select()
      .eq('is_open', true)
      .csv()
    if (error) return

    return data
  }

  return { exportSpeaker, exportSponsor, exportJob, exportAttendee, exportStaff }
}
