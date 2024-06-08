import { v4 as uuidv4 } from 'uuid'
import type { LoginUser } from '~/types/auth'
import { getExtension, getPathWithSlash } from '~/utils/file'

const BUCKETNAME = 'sample'

function _useSupabase() {
  const supabase = useSupabaseClient()
  const error = ref<Error>(null)
  const hasAuth = ref(false)
  const loginUser = ref<LoginUser | null>(null)
  const authState = ref(null)
  const connecting = ref(false)

  const { data } = supabase.auth.onAuthStateChange((event: string, session: any) => {
    authState.value = event
    if (!session) {
      hasAuth.value = false
      loginUser.value = false
      return
    }

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

  const loginWithGithub = async (): Promise<string> => {
    connecting.value = true
    const { data, error: myerror } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })

    connecting.value = false
    if (myerror) {
      error.value = new Error(myerror.message)
      return ''
    }
    return data.url
  }

  const logout = async () => {
    connecting.value = true
    const { error: myerror } = await supabase.auth.signOut()
    connecting.value = false
    if (myerror) {
      error.value = new Error(myerror.message)
      return
    }
  }

  const fetchSample = async () => {
    connecting.value = true
    try {
      const { data, error } = await supabase.from('sample').select('*').order('created_at')
      if (error) throw new Error(error)
      return data
    } catch (e: any) {
      error.value = new Error(e.message)
    } finally {
      connecting.value = false
    }
  }

  const uploadImage = async (file: File, path: string = '/') => {
    connecting.value = true
    const { fileNameRnd, fileName } = getUploadFileName(file)
    const url = `${getPathWithSlash(path)}${fileNameRnd}`
    const { data, error } = await supabase.storage.from(BUCKETNAME).upload(url, file, {
      cacheControl: '3600',
      upsert: false,
    })
    connecting.value = false
    if (error) {
      return { error: error.message, fileName, path: '' }
    }
    return {
      path: data?.path ?? null,
      error: null,
      fileName
    }
  }

  const cleanUp = async () => {
    data.subscription.unsubscribe()
  }

  return {
    error,
    connecting,
    hasAuth,
    logout,
    loginUser,
    loginWithGithub,
    cleanUp,
    fetchSample,
    authState,
    uploadImage,
  }
}

let client: ReturnType<typeof _useSupabase> | null = null

/**
 * export as singleton
 */
export const useSupabase = () => {
  if (client === null) client = _useSupabase()
  return client
}

function getUploadFileName(file: File) {
  const { extension, fileName } = getExtension(file.name)
  if (!extension) {
    return {fileNameRnd: '', fileName}
  }
  return { fileNameRnd: `${fileName}-${uuidv4()}.${extension}`, fileName }
}
