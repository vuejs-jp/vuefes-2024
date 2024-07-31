export const TrackMap = {
  medpeer: 'medpeer',
  mntsq: 'mntsq',
  kickflow: 'kickflow',
  vue: 'vue',
} as const

export const trackList = Object.values(TrackMap).map((value) => {
  return value.replace(/^[a-z]/g, function (val) {
    return val.toUpperCase()
  })
})
export type Track = typeof TrackMap[keyof typeof TrackMap]

export type SessionTrack = Extract<Track, 'medpeer' | 'mntsq' | 'kickflow'>
