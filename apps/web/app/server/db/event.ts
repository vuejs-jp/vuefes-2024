class Event {
  async getList() {
    const events = await import('~/utils/data/events.json')
    return events
  }
}

export default new Event()
