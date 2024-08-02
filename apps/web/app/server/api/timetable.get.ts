import db from '../db'
import { defineEventHandler } from 'h3'
import type { TimeTable } from '@vuejs-jp/model'

export default defineEventHandler(async () => {
  const response = await db.timeTable.getList()
  const timeTable = response.default as TimeTable

  return {
   timeTable
  }
})
