import type { Speaker } from './speaker'
import type { Track } from './track'


export type Timetable = {
  time: string
  rows: Row[]
}[]

export type Row = {
  title?: string
  title_en?: string
  subTitle?: string
  subTitle_en?: string
  description?: string
  description_en?: string
  colspan: number
  rowspan: number
  sessions?: Speaker[]
  track?: Track
  isClose?: boolean
  isOpeningOrKeyNote?: boolean
  isTranslation?: boolean
  isSponsor?: boolean
  noDisplayTime?: boolean
  time?: string
  isEvent?: boolean
  type?: 'handson'| 'crosstalk' | 'welcome-vuejs-community'
}
