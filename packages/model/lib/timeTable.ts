export type TimeTable = {
  time: string
  tracks: Track[]
}[]

type Track = {
  colspan?: number
  sessions: Session[]
}

type Session = {
  id: string
  category: string
  title: string
  titleKey: string
  speaker: string
  speakerKey: string
  sponsorSession?: string
  archives: Archive[]
}

type Archive = {
  slide?: string
  youtube?: string
}
