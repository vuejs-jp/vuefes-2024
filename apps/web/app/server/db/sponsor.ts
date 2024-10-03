
class Sponsor {
  async getList() {
    const sponsors = await import('~/utils/data/sponsors.json')
    return sponsors
  }
}

export default new Sponsor()
