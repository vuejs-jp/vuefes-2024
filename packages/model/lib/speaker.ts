export type SpeakerType = 'session' | 'lightning-talk' | 'sponsor-session' | 'panel-event'

export type SpeakerCategory =
  | 'sessionSpeakers'
  | 'lightningTalkSpeakers'
  | 'sponsorSessionSpeakers'
  | 'panelEventSpeakers'

export type Speaker = {
  id?: string
  name_ja: string
  name_en: string
  detail_page_id?: string
  image_url?: string
  caption_ja?: string
  caption_en?: string
  description_ja: string
  description_en: string
  github_id?: string
  x_id?: string
  session_type: 'session' | 'lightning-talk' | 'sponsor-session' | 'panel-event'
  is_open: boolean
  display_order?: number
  session_title_ja?: string
  session_title_en?: string
  session_description_ja?: string
  session_description_en?: string
  session_comment_ja?: string
  session_comment_en?: string
  session_place?: string
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