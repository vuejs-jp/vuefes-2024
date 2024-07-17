export const AdminPageMap = {
  speaker: 'speaker',
  sponsor: 'sponsor',
  job: 'job',
  namecard: 'namecard',
  adminUser: 'adminUser',
} as const

export const adminPageList = Object.values(AdminPageMap).map((value) => {
  return value.replace(/^[a-z]/g, function (val) {
    return val.toUpperCase()
  })
})
export type AdminPage = typeof AdminPageMap[keyof typeof AdminPageMap]

export type AdminUser = {
  id: string
  email: string
}
