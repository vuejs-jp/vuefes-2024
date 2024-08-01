export function useString() {
  function count(target: string) {
    let index = 0
    for (let i = 0; i < target.length; i++) {
      const charCode = target.charCodeAt(i)
      if (charCode >= 0 && charCode <= 255) {
        index += 1 // 半角の場合は 1 文字としてカウント
      } else {
        index += 2 // 全角の場合は 2 文字としてカウント
      }
    }
    return index
  }

  return { count }
}