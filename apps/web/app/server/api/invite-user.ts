import { defineEventHandler, useRuntimeConfig } from '#imports'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email: string = body.email.toString()

  if (!email) {
    return event.node.res.end('No email')
  }

  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const serviceKey = config.public.serviceKey

  if (!supabaseUrl || !serviceKey) {
    return event.node.res.end('No authentication')
  }

  const supabase = createClient(supabaseUrl, serviceKey)
  const { error } = await supabase.auth.admin.inviteUserByEmail(
    email,
    { data: { user_role: 'admin' } },
  )

  if (error) {
    return event.node.res.end(error)
  }
})
