import { defineEventHandler } from 'h3'
import type { Job, JobInfo } from '@vuejs-jp/model'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  let jobs: Job[] = []

  const client = await serverSupabaseClient<Database>(event)
  const { data: _jobs } = await client.from('jobs').select().order('display_order') as { data: Job[] }
  jobs = _jobs

  const allJobs: JobInfo = {
    type: 'job',
    title: 'job',
    list: jobs
      .filter(job => {
        if (process.env.NODE_ENV === 'production') return job.is_open === true
        return job
      })
      .sort((a: Job, b: Job) => {
        if (b.display_order && a.display_order) return a.display_order - b.display_order
        return 1
      })
      .concat(
        jobs
          .filter((job: Job) => {
            if (process.env.NODE_ENV === 'production') return job.is_open === true
            return job
          })
          .filter(s => s.display_order === null)
          .sort((a: Job, b: Job) => {
            return a.created_at < b.created_at ? -1 : 1
          }),
      ),
  }

  return { allJobs }
})
