class TimeTable {
  async getList() {
    // TODO: supabaseからデータを取得する
    const timeTable = await import('~/utils/data/timeTable.json')
    return timeTable
  }
}

export default new TimeTable()