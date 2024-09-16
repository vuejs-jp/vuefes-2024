import { defineEventHandler } from 'h3'
import type { Attendee, AttendeeInfo } from '@vuejs-jp/model'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  let attendees: Attendee[] = []

  const client = await serverSupabaseClient<Database>(event)
  const { data: _attendees } = await client.from('attendees').select().not('activated_at', 'is', null) as { data: Attendee[] }
  attendees = _attendees

  const activatedAttendees: AttendeeInfo = {
    type: 'activated-attendee',
    title: 'activated-attendee',
    list: attendees,
  }

  return { activatedAttendees }
})
