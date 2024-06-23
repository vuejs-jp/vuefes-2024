// import db from '../db'
import { defineEventHandler } from 'h3'
import type { Speaker, SpeakerInfo } from '@vuejs-jp/model'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  // const response = await db.speaker.getList()
  // const speakers = response.default as Speaker[]

  const client = await serverSupabaseClient<Database>(event)
  const { data: speakers } = await client.from('speakers').select() as { data: Speaker[] }

  const sessionSpeakers: SpeakerInfo = {
    type: 'session',
    title: 'Session',
    list: speakers
      .filter((speaker: Speaker) => speaker.session_type === 'session' && speaker.is_open === true)
      .sort((a: Speaker, b: Speaker) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
  }
  const lightningTalkSpeakers: SpeakerInfo = {
    type: 'lightning-talk',
    title: 'Lightning talk',
    list: speakers
      .filter((speaker: Speaker) => speaker.session_type === 'lightning-talk' && speaker.is_open === true)
      .sort((a: Speaker, b: Speaker) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
  }
  const sponsorSessionSpeakers: SpeakerInfo = {
    type: 'sponsor-session',
    title: 'Sponsor session',
    list: speakers
      .filter((speaker: Speaker) => speaker.session_type === 'sponsor-session' && speaker.is_open === true)
      .sort((a: Speaker, b: Speaker) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
  }

  return {
   sessionSpeakers,
   lightningTalkSpeakers,
   sponsorSessionSpeakers,
  }
})