import db from '../db'
import { useRuntimeConfig } from '#imports'
import { defineEventHandler } from 'h3'
import type { PanelerInfo, Speaker, SpeakerInfo } from '@vuejs-jp/model'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  let speakers: Speaker[] = []
  let allSpeakers: Speaker[] = []

  if (config.public.speakerDatasource === 'local') {
    const response = await db.speaker.getList()
    speakers = response.default as Speaker[]
  }

  if (config.public.speakerDatasource === 'supabase') {
    const client = await serverSupabaseClient<Database>(event)
    const { data: _speakers } = await client.from('speakers').select().eq('is_open', true).neq('session_type', 'panel-event').order('display_order') as { data: Speaker[] }
    speakers = _speakers
    const { data: _allSpeakers } = await client.from('speakers').select().eq('is_open', true).order('display_order') as { data: Speaker[] }
    allSpeakers = _allSpeakers
  }

  const sessionSpeakers: SpeakerInfo = {
    type: 'session',
    title: 'Session',
    list: speakers
      .filter(speaker => speaker.session_type === 'session' && speaker.display_order !== null)
      .sort((a: Speaker, b: Speaker) => {
        if (b.display_order && a.display_order) return a.display_order - b.display_order
        return 1
      })
      .concat(
        speakers
          .filter((speaker: Speaker) => {
            if (process.env.NODE_ENV === 'production') return speaker.session_type === 'session' && speaker.is_open === true
            return speaker.session_type === 'session'
          })
          .filter(s => s.display_order === null)
          .sort((a: Speaker, b: Speaker) => {
            return a.created_at < b.created_at ? -1 : 1
          }),
      ),
  }

  const lightningTalkSpeakers: SpeakerInfo = {
    type: 'lightning-talk',
    title: 'Lightning talk',
    list: speakers
      .filter(speaker => speaker.session_type === 'lightning-talk' && speaker.display_order !== null)
      .sort((a: Speaker, b: Speaker) => {
        if (b.display_order && a.display_order) return a.display_order - b.display_order
        return 1
      })
      .concat(
        speakers
          .filter((speaker: Speaker) => {
            if (process.env.NODE_ENV === 'production') return speaker.session_type === 'lightning-talk' && speaker.is_open === true
            return speaker.session_type === 'lightning-talk'
          })
          .filter(s => s.display_order === null)
          .sort((a: Speaker, b: Speaker) => {
            return a.created_at < b.created_at ? -1 : 1
          }),
      ),
  }

  const sponsorSessionSpeakers: SpeakerInfo = {
    type: 'sponsor-session',
    title: 'Sponsor session',
    list: speakers
      .filter(speaker => (speaker.session_type === 'sponsor-session' || speaker.session_type === 'sponsor-lt') && speaker.display_order !== null)
      .sort((a: Speaker, b: Speaker) => {
        if (b.display_order && a.display_order) return a.display_order - b.display_order
        return 1
      })
      .concat(
        speakers
          .filter((speaker: Speaker) => {
            if (process.env.NODE_ENV === 'production') return (speaker.session_type === 'sponsor-session' || speaker.session_type === 'sponsor-lt') && speaker.is_open === true
            return speaker.session_type === 'sponsor-session' || speaker.session_type === 'sponsor-lt'
          })
          .filter(s => s.display_order === null)
          .sort((a: Speaker, b: Speaker) => {
            return a.created_at < b.created_at ? -1 : 1
          }),
      ),
  }

  const panelEventPanelers: PanelerInfo = {
    type: 'panel-event',
    title: 'Panel Event',
    list: {
      'welcome-vuejs-community': allSpeakers
        .filter((s: Speaker) => {
          if (!s['events']) return false
          if (process.env.NODE_ENV === 'production') return s['events'].includes('welcome-vuejs-community') && s.is_open === true
          return s['events'].includes('welcome-vuejs-community')
        })
        .sort((a: Speaker, b: Speaker) => {
          if (b.display_order && a.display_order) return a.display_order - b.display_order
          return a.created_at < b.created_at ? -1 : 1
        }),
      'nextgen-frontend-crosstalk': allSpeakers
        .filter((s: Speaker) => {
          if (!s['events']) return false
          if (process.env.NODE_ENV === 'production') return s['events'].includes('nextgen-frontend-crosstalk') && s.is_open === true
          return s['events'].includes('nextgen-frontend-crosstalk')
        })
        .sort((a: Speaker, b: Speaker) => {
          if (b.display_order && a.display_order) return a.display_order - b.display_order
          return a.created_at < b.created_at ? -1 : 1
        }),
    },
  }

  return {
   sessionSpeakers,
   lightningTalkSpeakers,
   sponsorSessionSpeakers,
   panelEventPanelers,
  }
})