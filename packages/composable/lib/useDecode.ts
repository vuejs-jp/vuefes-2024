export function useDecode() {
  function decodeHtml(htmlStr: string, tag: 'textarea') {
    if ((import.meta as any).client) {
      const txt = document.createElement(tag)
      txt.innerHTML = htmlStr
      return txt.value
    }
  }

  return { decodeHtml }    
}
