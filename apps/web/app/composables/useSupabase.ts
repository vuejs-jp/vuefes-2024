import { useRuntimeConfig } from '#app'
import { createClient } from '@supabase/supabase-js'
import type { LoginUser } from '~/types/auth'

function useSupabase() {
  const { supabaseProjectUrl, supabaseApiKey } = useRuntimeConfig()
  const supabase = useSupabaseClient()
  const hasAuth = ref(false)
  const loginUser = ref<LoginUser | null>(null)
  const debug = ref(null)

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    // console.log(event, session)
    debug.value = event

    if (event === 'INITIAL_SESSION') {
      // handle initial session
    } else if (event === 'SIGNED_IN') {
      // handle sign in event
    } else if (event === 'SIGNED_OUT') {
      // handle sign out event
    } else if (event === 'PASSWORD_RECOVERY') {
      // handle password recovery event
    } else if (event === 'TOKEN_REFRESHED') {
      // handle token refreshed event
    } else if (event === 'USER_UPDATED') {
      // handle user updated event
    }
    if (session.access_token) {
      hasAuth.value = true
    }
    if (session.user) {
      loginUser.value = {
        id: session.user.id,
        email: session.user.email,
        avatar_url: session.user.user_metadata.avatar_url,
        user_name: session.user.user_metadata.user_name,
      } as LoginUser
    }
  })

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
    if (error) {
      console.log('ログインエラー', error)
      return
    }
    console.log('login supabase', data)
  }

  const fetchSample = async () => {
    console.log('fetchSample')
    try {
      const { data, error } = await supabase.from('sample').select('*').order('created_at')

      if (error) throw new Error(error)

      return data
    } catch (e) {
      console.error(e.message)
    }
  }
  const cleanUp = async () => {
    data.subscription.unsubscribe()
  }

  return { hasAuth, loginUser, login, cleanUp, fetchSample, debug }
}

export const supabaseClient = useSupabase()
