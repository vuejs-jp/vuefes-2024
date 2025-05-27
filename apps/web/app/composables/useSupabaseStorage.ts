import { useRuntimeConfig } from '#imports'
import { bucket } from '@vuejs-jp/model'
import { REDIRECT_URL } from '../utils/environment.constants'

export function useSupabaseStorage() {
  const config = useRuntimeConfig()
  const { supabaseUrl } = config.public

  function getStaticAvatarUrl(avatarUrl?: string) {
    if (!avatarUrl) return `${REDIRECT_URL}/supabase/common/default.png`

    return `${REDIRECT_URL}/supabase/common/${new URL(avatarUrl).pathname.split('/').pop()}`
  }

  function getFullAvatarUrl(avatarUrl: string) {
    if (!avatarUrl) return `${supabaseUrl}/storage/v1/object/public/${bucket}/default.png`
    if (avatarUrl?.startsWith(supabaseUrl)) return avatarUrl
    return `${supabaseUrl}/storage/v1/object/public/${bucket}${avatarUrl}`
  }

  return { getStaticAvatarUrl, getFullAvatarUrl }
}
