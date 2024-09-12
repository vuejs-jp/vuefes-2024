import { defineEventHandler } from 'h3'
import type { Staff, StaffInfo } from '@vuejs-jp/model'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  let staffs: Staff[] = []

  const client = await serverSupabaseClient<Database>(event)
  const { data: _staffs } = await client.from('staffs').select().order('display_order') as { data: Staff[] }
  staffs = _staffs

  const coreStaffs: StaffInfo = {
    type: 'core-staff',
    title: 'core-staff',
    list: staffs
      .filter((staff: Staff) => {
        if (process.env.NODE_ENV === 'production') return staff.is_open === true && staff.is_volunteer === false
        return staff.is_volunteer === false
      })
      .filter(staff => staff.display_order !== null)
      .sort((a: Staff, b: Staff) => {
        if (b.display_order && a.display_order) return a.display_order - b.display_order
        return 1
      })
      .concat(
        staffs
          .filter((staff: Staff) => {
            if (process.env.NODE_ENV === 'production') return staff.is_open === true && staff.is_volunteer === false
            return staff.is_volunteer === false
          })
          .filter(staff => staff.display_order === null)
          .sort((a: Staff, b: Staff) => {
            return a.created_at < b.created_at ? -1 : 1
          }),
        ),
  }

  const volunteerStaffs: StaffInfo = {
    type: 'volunteer-staff',
    title: 'volunteer-staff',
    list: staffs
      .filter((staff: Staff) => {
        if (process.env.NODE_ENV === 'production') return staff.is_open === true && staff.is_volunteer === true
        return staff.is_volunteer === true
      })
      .sort((a: Staff, b: Staff) => {
        return a.created_at < b.created_at ? -1 : 1
      }),
  }

  return { coreStaffs, volunteerStaffs }
})
