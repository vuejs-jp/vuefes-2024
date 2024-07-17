type JobType = 'job'

export type Job = {
  id: string
  sponsor_id: string
  link_url?: string
  image_url?: string
  image_alt?: string
  is_open: boolean
  display_order?: number
  created_at: string
  updated_at: string
}

export type JobInfo = {
  type: JobType
  title: string
  list: Job[]
}
