export type { Database } from './generated/supabase'
import type { Role } from '@vuejs-jp/model'

import type { Database } from './generated/supabase'
export type FormSpeaker = Database['public']['Tables']['speakers']['Insert']
export type FormSponsor = Database['public']['Tables']['sponsors']['Insert']
export type FormJob = Database['public']['Tables']['jobs']['Insert']
export type FormAttendee = Database['public']['Tables']['attendees']['Insert']
export type FormAttendeeOverride = Omit<FormAttendee, 'role'> & {
  role?: Role;
};
export type FormStaff = Database['public']['Tables']['staffs']['Insert']
