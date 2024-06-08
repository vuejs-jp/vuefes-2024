export const getExtension = (fileName: string) => {
  const tmp = fileName.split('.')
  if (tmp.length === 1) {
    return { extension: '', fileName: '' }
  }
  return { extension: tmp.pop(), fileName: tmp.join('.') }
}

export const getPathWithSlash = (path: string) => {
  if (path.match(/.+\/$/)) {
    return path
  }
  return `${path}/`
}
