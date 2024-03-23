import { onMounted, onUnmounted, ref } from 'vue'

export function useHeader() {
  const headerRef = ref<HTMLElement | null>(null)
  const showHeader = ref(false)

  function checkShowHeader() {
    showHeader.value = window.pageYOffset > 50
  }

  onMounted(function () {
    checkShowHeader()
    window.addEventListener('scroll', checkShowHeader)
  })

  onUnmounted(function () {
    window.removeEventListener('scroll', checkShowHeader)
  })

  return { headerRef, showHeader }
}
