import { ref } from 'vue'

export function useFormError() {
  const idError = ref('')
  const nameError = ref('')
  const emailError = ref('')
  const detailError = ref('')

  function validateId(value: string) {
    if (value === '') {
      idError.value = 'IDを入力してください'
      return
    }
    nameError.value = ''
  }

  function validateName(value: string) {
    if (value === '') {
      nameError.value = '名前を入力してください'
      return
    }
    nameError.value = ''
  }

  function validateEmail(value: string) {
    if (value === '') {
      emailError.value = 'メールアドレスを入力してください'
      return
    } else if (!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/.test(value)) {
      emailError.value = 'メールアドレスの形式を確認してください'
      return
    }
    emailError.value = ''
  }

  function validateAdminEmail(value: string) {
    if (!/[A-Za-z0-9._%+-]+\+supaadmin@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/.test(value)) {
      emailError.value = 'メールアドレスの形式を確認してください'
      return
    }
    console.log('email: ', value)

    validateEmail(value)
    console.log('emailError: ', emailError)
  }

  function validateDetail(value: string) {
    if (value === '') {
      detailError.value = '問い合わせ内容を入力してください'
      return
    }
    detailError.value = ''
  }

  return {
    idError,
    nameError,
    emailError,
    detailError,
    validateId,
    validateName,
    validateEmail,
    validateAdminEmail,
    validateDetail,
  }
}
