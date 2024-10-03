class Speaker {
  async getList() {
    const speakers = await import('~/utils/data/speakers.json')
    return speakers
  }
}

export default new Speaker()
