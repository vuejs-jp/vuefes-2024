export const AdminPageMap = {
  sponsor: 'sponsor',
  speaker: 'speaker',
  staff: 'staff',
} as const

export const adminPageList = Object.values(AdminPageMap).map((value) => {
  return value.replace(/^[a-z]/g, function (val) {
    return val.toUpperCase()
  })
})
export type AdminPage = typeof AdminPageMap[keyof typeof AdminPageMap]
