export const configuration = () => ({
  peatixEventId: process.env.PEATIX_EVENT_ID || '',
  peatixBasicEmail: process.env.PEATIX_BASIC_EMAIL || '',
  peatixBasicPassword: process.env.PEATIX_BASIC_PASSWORD || '',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_KEY || '',
  sentryDsn: process.env.SENTRY_DSN || '',
})
