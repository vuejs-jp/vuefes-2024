import { useRuntimeConfig } from '#imports'

type NavLink = {
    text: string
    anchor: string
  }
  
export function useNav() {
  const config = useRuntimeConfig()

  const navLinks: NavLink[] = [
    { text: 'Message', anchor: '#message' },
    { text: 'Ticket', anchor: '#ticket' },
    { text: 'Speakers', anchor: '#speakers' },
    ...[config.public.showEvent ? { text: 'Event', anchor: '#event' } : undefined],
    ...[config.public.showTimetable ? { text: 'Time table', anchor: '#timetable' } : undefined],
    { text: 'Sponsors', anchor: '#sponsors' },
    // Uncomment out after job board implementation
    // { text: 'Job board', anchor: '#jobboard' },
    { text: 'Inquiry', anchor: '#form' },
  ].filter((l) => {
    return l !== undefined
  })

  return { navLinks }
}
