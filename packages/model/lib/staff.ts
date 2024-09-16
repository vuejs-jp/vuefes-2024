export type StaffCategory =
  | 'coreStaffs'
  | 'volunteerStaffs'

export type Staff = TeamData & {
  id?: string
  detail_page_id: string
  is_open: boolean
  display_order?: number
  is_volunteer: boolean
  created_at: string
  updated_at: string
}

export type TeamData = {
  name: string
  image_url: string
  x_id?: string
  github_id?: string
}

export type StaffInfo = {
  type: 'core-staff' | 'volunteer-staff'
  title: string
  list: Staff[]
}
