class Speaker {
  async getList() {
    // TODO: supabaseからデータを取得する
    const speakers = await import('~/utils/data/speakers.json')
    return speakers
  }
}

export default new Speaker()