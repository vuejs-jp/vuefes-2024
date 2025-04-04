export const EventMap = {
  'welcome-vuejs-community': 'welcome-vuejs-community',
  'vuejs-handson': 'vuejs-handson',
  'nextgen-frontend-crosstalk': 'nextgen-frontend-crosstalk',
  'creative-wall': 'creative-wall',
  'free-drinks-and-snacks': 'free-drinks-and-snacks',
  'tattoo-space': 'tattoo-space',
  'cocktail-bash': 'cocktail-bash',
  'sponsor-booth-fotolary': 'sponsor-booth-fotolary',
} as const

export const eventList = Object.values(EventMap).map((value) => {
  return value.replace(/^[a-z]/g, function (val) {
    return val.toUpperCase()
  })
})
export type Event = typeof EventMap[keyof typeof EventMap]
