export interface Peatix {
  user: PeatixLocale
  likeEventUrl: string
  ticketUrl: string
  watchStreamUrl: string
  event: PeatixEvent
}

export interface PeatixLocale {
  locale: 'en_US'
}

export interface PeatixEvent {
  datetimeEnd: string
  ticketsCount: number
  showNumAttendees: boolean
  venueAddress: string
  isFinished: boolean
  timeStart: string
  cutoff: string
  alternativePaymentMethods: Method[]
  typeIsRestricted: boolean
  isOpen: boolean
  weekDateEnd: string
  timezoneLabel: string
  formattedCutoff: string
  insecureEventUrl: string
  isContactAble: boolean
  eventUrl: string
  attendees: Attendee[]
  organizerId: string
  entriesTotal: number
  venueUrl: string
  attendeesUri: string
  days: number
  showAttendeesName: boolean
  datetime_format_weekdate_time_days: string
  weekDate: string
  isOnline: boolean
  isSelfTagged: boolean
  duration: number
  date: string
  datetime: string
  timezoneId: string
  tags: Tag[]
  tickets: Ticket[]
  shortUrl: string
  countryName: string
  isTokenGated: boolean
  timeEnd: string
  typeIsPrivate: boolean
  twitterHandle: string
  description: string
  isSuspended: boolean
  name: string
  pod: Pod
  venueName: string
  tokenGatedTicketsCount: number
  seatsSold: number
  isSelectionEvent: boolean
  id: number
  luwakScore: number
  status: string
}

export interface Method {
  salesCutoffForEvent: string
  code: string
  label: string
  blurb: string
  paymentCutoffDays: number
}

export interface Attendee {
  isProfileVisible: number
  id: string
  profilePictureUrl: string
  profileUri: string
  nickname: string
}

export interface Tag {
  id: string
  tag: string
  tagUri: string
}

export interface Ticket {
  seatsAvailable: number
  status: number
  seatsSold: number
  id: number
  name: string
  seatsMax: number
  formattedCurrency: string
  price : number
}

export interface Pod {
  logo: string
  numFollowers: number
  name: string
  cover: string
  canonicalUri: string
}

export interface PeatixCsv {
  orderId: string
  name: string
  displayName: string
  appliedAt: string
  ticketName: string
  count: string
  status: string
  contactId: string
  ticketId: string
}
