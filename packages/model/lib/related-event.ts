export interface RelatedEvent {
  title: string
  description: string
  startedAt: string
  bannerUrl: string
  registerUrl: string
  disabled?: boolean
}

export interface RelatedEventInfo {
  type: 'related-event'
  title: 'related-event'
  list: RelatedEvent[]
}
