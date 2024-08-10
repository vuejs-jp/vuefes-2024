import { createClient, type AuthChangeEvent } from '@supabase/supabase-js'
import { match } from 'ts-pattern'
import { useRuntimeConfig } from '#imports'
import { computed } from 'vue'
import { useAuthStore } from '~/store/auth'

export function useAuthSession() {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const supabaseKey = config.public.supabaseKey

  let _onAuthChanged: (e: AuthChangeEvent) => void = () => {}
  const onAuthChanged = (callback: (e: AuthChangeEvent) => void) => {
    _onAuthChanged = callback
  }

  if (!supabaseUrl || !supabaseKey) {
    return { onAuthChanged }
  }
  const supabase = createClient(supabaseUrl, supabaseKey)

  // const signedUserId = ref<string | null>(null)
  // const setSignedUserId = (target: string | null) => signedUserId.value = target

  // const hasAuth = computed(() => signedUserId.value !== null)

  const auth = useAuthStore()
  const hasAuth = computed(() => auth.signedUserId !== null)

  supabase.auth.onAuthStateChange((e, session) => {
    match(e)
      .with('INITIAL_SESSION', 'SIGNED_IN', () => {
        if (session?.user) {
          // setSignedUserId(session.user.id)
          auth.setSignedUserId(session.user.id)
        }
        _onAuthChanged(e)
      })
      .with('SIGNED_OUT', () => {
        // setSignedUserId(null)
        auth.setSignedUserId(null)
      })
      .with(
        'MFA_CHALLENGE_VERIFIED',
        'PASSWORD_RECOVERY',
        'TOKEN_REFRESHED',
        'USER_UPDATED',
        () => {},
      )
      .exhaustive()
  })

  return {
    hasAuth,
    // signedUserId,
    onAuthChanged,
  }
}
