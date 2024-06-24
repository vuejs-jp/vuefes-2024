export const AdminPageMap = {
  speaker: 'speaker',
  sponsor: 'sponsor',
} as const

export const adminPageList = Object.values(AdminPageMap).map((value) => {
  return value.replace(/^[a-z]/g, function (val) {
    return val.toUpperCase()
  })
})
export type AdminPage = typeof AdminPageMap[keyof typeof AdminPageMap]
