import { defineEventHandler } from 'h3'
import type { Job, JobInfo } from '@vuejs-jp/model'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  let jobs: Job[] = []

  const client = await serverSupabaseClient<Database>(event)
  const { data: _jobs } = await client.from('jobs').select() as { data: Job[] }
  jobs = _jobs

  const allJobs: JobInfo = {
    type: 'job',
    title: 'job',
    list: jobs
      .filter((j: Job) => {
        if (process.env.NODE_ENV === 'production') return j.is_open === true
        return j
      })
      .sort((a: Job, b: Job) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
  }

  return { allJobs }
})
