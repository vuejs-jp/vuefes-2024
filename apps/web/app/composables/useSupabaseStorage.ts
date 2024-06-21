import { useRuntimeConfig } from '#imports'
import { bucket } from '@vuejs-jp/model'

export function useSupabaseStorage() {
  const config = useRuntimeConfig()
  const { supabaseUrl } = config.public

  function getFullAvatarUrl(avatarUrl: string) {
    if (!avatarUrl) return `${supabaseUrl}/storage/v1/object/public/${bucket}/default.png`
    if (avatarUrl?.startsWith(supabaseUrl)) return avatarUrl
    return `${supabaseUrl}/storage/v1/object/public/${bucket}${avatarUrl}`
  }

  return { getFullAvatarUrl }
}
