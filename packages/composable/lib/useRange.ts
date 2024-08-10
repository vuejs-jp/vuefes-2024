export function useRange() {
  function time(date: Date) {
    return `${date.getHours()}:${date.getMinutes()}`
  }

  function range(start?: string, duration?: number) {
    if (!start || !duration) return [new Date(), new Date()]

    const startDate = new Date(start)
    // startDate.setHours(startDate.getHours() + 9)
    const endDate = new Date(startDate)
    endDate.setMinutes(startDate.getMinutes() + duration)

    return `${time(new Date(startDate))}〜${time(new Date(endDate))}`
  }

  return { range }
}
