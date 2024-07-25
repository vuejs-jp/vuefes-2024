import { GENERAL_TICKET, RoleMap, WITH_PARTY_TICKET } from '@vuejs-jp/model'

export const Constants = {
  PEATIX_LOGIN_URL: 'https://peatix.com/signin',
  PEATIX_DASHBOARD_URL: 'https://peatix.com/event/',
  PEATIX_GENERAL_TICKET: GENERAL_TICKET,
  PEATIX_WITH_PARTY_TICKET: WITH_PARTY_TICKET,
  PEATIX_GENERAL_ROLE: RoleMap.attendee,
  PEATIX_WITH_PARTY_ROLE: RoleMap.attendeeParty,
} as const

export type TicketRole = Extract<typeof Constants[keyof typeof Constants], 'attendee' | 'attendee + party'>
