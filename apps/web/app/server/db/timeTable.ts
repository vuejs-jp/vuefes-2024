class Timetable {
  async getList() {
    const timetable = await import('~/utils/data/timetable.json')
    return timetable
  }
}

export default new Timetable()
