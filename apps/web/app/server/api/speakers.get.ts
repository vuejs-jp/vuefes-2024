import db from '../db'
import { defineEventHandler } from 'h3'
import type { Speaker, SpeakerInfo } from '@vuejs-jp/model'

export default defineEventHandler(async () => {
  const response = await db.speaker.getList()
  const speakers = response.default as Speaker[]
  
  const sessionSpeakers: SpeakerInfo = {
    type: 'session',
    title: 'Session',
    list: speakers.filter((speaker: Speaker) => speaker.session_type === 'session')
  }

  return {
   sessionSpeakers
  }
})