import { Role } from '@vuejs-jp/model'

export type { Database } from './generated/supabase'

import type { Database } from './generated/supabase'
export type FormAttendee = Database['public']['Tables']['attendees']['Insert']
export type FormAdminUser = Database['public']['Tables']['admin_users']['Insert']

export type AttendeeReceipt = {
  role: Extract<Role, 'attendee' | 'attendee + party'>
  receipt_id: string
}
