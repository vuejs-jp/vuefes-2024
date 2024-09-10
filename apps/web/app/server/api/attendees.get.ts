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
    list: attendees
      .filter((attendee) => {
        return attendee.user_id !== 'f5087332-0381-4fc7-8ffb-616475842842' && attendee.user_id !== 'c77d6932-7bd6-4421-a80a-06b99162ae6a' && attendee.user_id !== '44687b52-9c76-4665-8e11-e2255a4dfc93'
      }),
  }

  return { activatedAttendees }
})
