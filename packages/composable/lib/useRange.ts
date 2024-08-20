export function useRange() {
  function time(date: Date) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  function range(start?: string, duration?: number, type?: 'default' | 'hyphen') {
    if (!start || !duration) return [new Date(), new Date()]
    if (!type) type = 'default'

    const startDate = new Date(start)
    // startDate.setHours(startDate.getHours() + 9)
    const endDate = new Date(startDate)
    endDate.setMinutes(startDate.getMinutes() + duration)

    return type === 'hyphen'
      ? `${time(new Date(startDate))} - ${time(new Date(endDate))}` 
      : `${time(new Date(startDate))}〜${time(new Date(endDate))}`
  }

  return { range }
}
