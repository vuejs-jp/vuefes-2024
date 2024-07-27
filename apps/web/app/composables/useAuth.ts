import { useSupabaseClient } from '#imports'
import type { AuthProvider } from '@vuejs-jp/model'

export function useAuth() {
  const supabase = useSupabaseClient()

  async function signIn(provider: Extract<AuthProvider, 'github' | 'google'>, path: string) {
    const uri = new URL(window.location.href)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${uri.origin}${path}`,
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

  async function getUser() {
    const { data,error } = await supabase.auth.getUser()
    if (error) {
      throw new Error('can not get user')
    }
   return data.user
  }

  return { signIn, signOut, getUser }
}
