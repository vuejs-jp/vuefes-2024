import db from '../db'
import { defineEventHandler } from 'h3'
import type { RelatedEvent, RelatedEventInfo } from '@vuejs-jp/model'

export default defineEventHandler(async (event) => {
  const response = await db.event.getList()
  const eventData = response.default as RelatedEvent[]

  const eventsInfo: RelatedEventInfo = {
    type: 'related-event',
    title: 'related-event',
    list: eventData,
  }
  
  return { eventsInfo }
})
