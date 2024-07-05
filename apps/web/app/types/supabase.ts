export type { Database } from './generated/supabase'

import type { Database } from './generated/supabase'
export type FormSpeaker = Database['public']['Tables']['speakers']['Insert']
export type FormSponsor = Database['public']['Tables']['sponsors']['Insert']
export type FormAttendee = Database['public']['Tables']['attendees']['Insert']
export type FormStaff = Database['public']['Tables']['staffs']['Insert']
