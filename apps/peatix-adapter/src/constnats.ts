export const Constants = {
  PEATIX_LOGIN_URL: 'https://peatix.com/signin',
  PEATIX_DASHBOARD_URL: 'https://peatix.com/event/',
  PEATIX_GENERAL_TICKET: '一般チケット',
  PEATIX_WITH_PARTY_TICKET: '一般＋アフターパーティーチケット',
  PEATIX_HANDSON_TICKET: 'ハンズオンチケット',
  PEATIX_PERSONAL_SPONSOR_TICKET: '個人スポンサーチケット',
  PEATIX_GENERAL_ROLE: 'attendee',
  PEATIX_WITH_PARTY_ROLE: 'attendee + party',
} as const

export type TicketRole = Extract<typeof Constants[keyof typeof Constants], 'attendee' | 'attendee + party'>
