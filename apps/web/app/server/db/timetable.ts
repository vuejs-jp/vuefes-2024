class Timetable {
  async getList() {
    const pcData = await import('~/utils/data/timetable_pc.json')
    const spData = await import('~/utils/data/timetable_sp.json')
    return { pcData, spData }
  }
}

export default new Timetable()
