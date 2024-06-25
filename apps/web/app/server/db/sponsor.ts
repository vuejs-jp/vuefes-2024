
class Sponsor {
  async getList() {
    // TODO: supabaseからデータを取得する
    const sponsors = await import('~/utils/data/sponsors.json')
    return sponsors
  }
}

export default new Sponsor()
