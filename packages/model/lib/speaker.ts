import type { Event } from './event'
import type { Track } from './track'

export type SpeakerType = 'session' | 'lightning-talk' | 'sponsor-session' | 'panel-event'

export type SpeakerCategory =
  | 'sessionSpeakers'
  | 'lightningTalkSpeakers'
  | 'sponsorSessionSpeakers'
  | 'panelEventPanelers'

export type Speaker = {
  id?: string
  name_ja: string
  name_en: string
  detail_page_id?: string
  image_url?: string
  company_ja?: string
  company_en?: string
  position_ja?: string
  position_en?: string
  description_ja: string
  description_en: string
  github_id?: string
  x_id?: string
  events?: string[]
  session_type: 'session' | 'lightning-talk' | 'sponsor-session' | 'sponsor-lt' | 'panel-event'
  is_open: boolean
  display_order?: number
  session_title_ja?: string
  session_title_en?: string
  session_description_ja?: string
  session_description_en?: string
  session_comment_ja?: string
  session_comment_en?: string
  session_place?: Track
  session_time_from?: string
  session_time_duration?: number
  session_doc_title_ja?: string
  session_doc_title_en?: string
  session_doc_url?: string
  created_at: string
  updated_at: string
}

export type SpeakerInfo = {
  type: SpeakerType
  title: string
  list: Speaker[]
}

export type PanelerInfo = {
  type: SpeakerType
  title: string
  list: Record<Extract<Event, 'welcome-vuejs-community' | 'nextgen-frontend-crosstalk'>, Speaker[]>
}
