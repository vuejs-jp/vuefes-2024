export type Staff = {
  id?: string
  name: string
  image_url: string
  x_id?: string
  github_id?: string
  is_open: boolean
  display_order?: number
  created_at: string
  updated_at: string
}

export type StaffInfo = {
  type: 'staff'
  title: string
  list: Staff[]
}
