export const RoleMap = {
  attendee: 'attendee',
  attendeeParty: 'attendee + party',
  speaker: 'speaker',
  sponsor: 'sponsor',
  staff: 'staff',
} as const

export const roleList = Object.values(RoleMap).map((value) => {
  return value.replace(/^[a-z]/g, function (val) {
    return val.toUpperCase()
  })
})
export type Role = typeof RoleMap[keyof typeof RoleMap]

export const selectableRoleList = roleList
  .filter(role => role.indexOf('Attendee') !== -1)
  .map((role) => ({ value: role.toLowerCase(), text: role }))

export type Attendee = {
  activated_at?: string
  avatar_url: string
  created_at: string
  display_name?: string
  email: string
  id?: string
  provider: string
  receipt_id: string
  role?: Role
  updated_at: string
  user_id: string
  canceled_at?: string
}

export type NamecardUser = Pick<Attendee, 'display_name' | 'avatar_url' | 'role' | 'receipt_id'>

export type AttendeeInfo = {
  type: 'activated-attendee'
  title: string
  list: Attendee[]
}
