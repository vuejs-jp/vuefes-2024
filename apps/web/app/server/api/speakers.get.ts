import db from '../db'
import { defineEventHandler } from 'h3'
import type { Speaker, SpeakerInfo } from '@vuejs-jp/model'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  let speakers: Speaker[] = []

  if (config.public.speakerDatasource === 'local') {
    const response = await db.speaker.getList()
    speakers = response.default as Speaker[]
  }

  if (config.public.speakerDatasource === 'supabase') {
    const client = await serverSupabaseClient<Database>(event)
    const { data: _speakers } = await client.from('speakers').select().eq('is_open', true).neq('session_type', 'panel-event') as { data: Speaker[] }
    speakers = _speakers
  }

  const sessionSpeakers: SpeakerInfo = {
    type: 'session',
    title: 'Session',
    list: speakers
      .filter((speaker: Speaker) => {
        if (process.env.NODE_ENV === 'production') return speaker.session_type === 'session' && speaker.is_open === true
        return speaker.session_type === 'session'
      })
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
      .filter((speaker: Speaker) => {
        if (process.env.NODE_ENV === 'production') return speaker.session_type === 'lightning-talk' && speaker.is_open === true
        return speaker.session_type === 'lightning-talk'
      })
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
      .filter((speaker: Speaker) => {
        if (process.env.NODE_ENV === 'production') return speaker.session_type === 'sponsor-session' && speaker.is_open === true
        return speaker.session_type === 'sponsor-session'
      })
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