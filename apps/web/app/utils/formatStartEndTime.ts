export function formatStartEndTime(timeFrom: string, duration: number): string {
  const formattedTimeFrom = new Date(timeFrom).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  })
  const formattedTimeTo = new Date(
    new Date(timeFrom).getTime() + duration * 60 * 1000,
  ).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${formattedTimeFrom} - ${formattedTimeTo}`
}