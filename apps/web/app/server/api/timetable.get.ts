import db from '../db'
import { defineEventHandler } from 'h3'
import type { Speaker, Timetable } from '@vuejs-jp/model'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const response = await db.timetable.getList()
  const _timetable = response.default as Timetable

  const client = await serverSupabaseClient<Database>(event)
    const { data: speakers } = await client.from('speakers').select().eq('is_open', true) as { data: Speaker[] }
  
  const timetable = _timetable.map((data) => {
    data.rows = data.rows.map((row) => {
      if (row.sessions) {
        row.sessions = row.sessions.map((session) => {
          if (!session.id) return session
          const speaker = speakers.find((speaker) => speaker.id === session.id)
          return speaker!
        })
      }
      return row
    })
    return data
  })
  
  return timetable
})
