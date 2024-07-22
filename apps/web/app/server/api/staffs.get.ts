import { defineEventHandler } from 'h3'
import type { Staff, StaffInfo } from '@vuejs-jp/model'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  let staffs: Staff[] = []

  const client = await serverSupabaseClient<Database>(event)
  const { data: _staffs } = await client.from('staffs').select() as { data: Staff[] }
  staffs = _staffs

  const allStaffs: StaffInfo = {
    type: 'staff',
    title: 'staff',
    list: staffs
      .filter((staff: Staff) => {
        if (process.env.NODE_ENV === 'production') return staff.is_open === true
        return true
      })
      .sort((a: Staff, b: Staff) => {
        if (a.display_order) return -1
        if (b.display_order) return -1
        if (!a.display_order) return a.name < b.name ? -1 : 1
        if (!b.display_order) return a.name < b.name ? -1 : 1
        return a.display_order - b.display_order
      }),
  }

  return { allStaffs }
})
