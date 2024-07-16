import { Role } from '@vuejs-jp/model'
import { TicketRole } from '../constnats'

export type { Database } from './generated/supabase'

import type { Database } from './generated/supabase'
export type FormAttendee = Database['public']['Tables']['attendees']['Insert']
export type FormAdminUser = Database['public']['Tables']['admin_users']['Insert']

export type AttendeeReceipt = {
  role: Extract<Role, TicketRole>
  receipt_id: string
}
