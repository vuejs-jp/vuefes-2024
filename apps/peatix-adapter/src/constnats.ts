export const Constants = {
  PEATIX_LOGIN_URL: 'https://peatix.com/signin',
  PEATIX_DASHBOARD_URL: 'https://peatix.com/event/',
  PEATIX_GENERAL_TICKET: '一般チケット',
  PEATIX_WITH_PARTY_TICKET: '一般＋アフターパーティーチケット',
  PEATIX_HANDSON_TICKET: 'ハンズオンチケット',
  PEATIX_PERSONAL_SPONSOR_TICKET: '個人スポンサーチケット',
  PEATIX_RECEIPT_ID_ROW_INDEX: 0, // レシート ID
  PEATIX_APPLIED_AT_ROW_INDEX: 3, // 申込日時
  PEATIX_RECEIPTS_TICKET_NAME_ROW_INDEX: 4, // チケット名
  PEATIX_PERSONAL_SPONSOR_NAME_ROW_INDEX: 16, // 個人スポンサー クレジット名
  PEATIX_GENERAL_ROLE: 'attendee',
  PEATIX_WITH_PARTY_ROLE: 'attendee + party',
} as const

export type TicketRole = Extract<typeof Constants[keyof typeof Constants], 'attendee' | 'attendee + party'>
