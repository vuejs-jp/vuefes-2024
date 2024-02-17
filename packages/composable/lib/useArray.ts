/**
 * コレクション系の hooks を useArray に置く
 */
export function useArray() {
  // https://github.com/vuejs-jp/vuefes-2023/blob/main/app/composables/useArray.ts#L8
  function unique<T>(items: T[], key: keyof T) {
    return Array.from(new Map(items.map((item) => [item[key], item])).values())
  }

  return { unique }
}