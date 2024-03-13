import { POSITION, useToast as useToastification } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export function useToast() {
  const toast = useToastification()

  function onSuccess(message: string, timeout: number) {
    toast.success(message, { timeout, position: POSITION.TOP_CENTER })
  }

  function onError(message: string, timeout: number) {
    toast.error(message, { timeout, position: POSITION.TOP_CENTER })
  }

  return { onSuccess, onError }
}
