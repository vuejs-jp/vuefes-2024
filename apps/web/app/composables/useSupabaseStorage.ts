import { useRuntimeConfig } from '#imports'

export function useSupabaseStorage() {
  const config = useRuntimeConfig()
  const { supabaseUrl } = config.public

  function getFullAvatarUrl(avatarUrl: string) {
    if (!avatarUrl) return `${supabaseUrl}/storage/v1/object/public/common_asset/default.png`
    if (avatarUrl?.startsWith(supabaseUrl)) return avatarUrl
    return `${supabaseUrl}/storage/v1/object/public/common_asset${avatarUrl}`
  }

  return { getFullAvatarUrl }
}
