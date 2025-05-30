import { useSupabaseClient } from '#imports'
import type { AuthProvider } from '@vuejs-jp/model'
import { REDIRECT_URL } from '~/utils/environment.constants'

export function useAuth() {
  const supabase = useSupabaseClient()

  async function signIn(provider: Extract<AuthProvider, 'github' | 'google'>, path: string) {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${REDIRECT_URL}${path}`,
      }
    })
    if (error) console.log(error)
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error('can not signout')
    }
  }

  return { signIn, signOut }
}
