export type Staff = {
  id?: string
  name: string
  detail_page_id: string
  image_url: string
  x_id?: string
  github_id?: string
  is_open: boolean
  display_order?: number
  is_volunteer: boolean
  created_at: string
  updated_at: string
}

export type StaffInfo = {
  type: 'staff'
  title: string
  list: Staff[]
}
