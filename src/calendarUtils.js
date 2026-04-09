export function buildCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay  = new Date(year, month + 1, 0)

  let startOffset = firstDay.getDay() - 1
  if (startOffset < 0) startOffset = 6

  const days = []

  for (let i = startOffset - 1; i >= 0; i--) {
    const d = new Date(year, month, -i)
    days.push({ date: d, currentMonth: false })
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push({ date: new Date(year, month, d), currentMonth: true })
  }

  const remaining = 42 - days.length
  for (let d = 1; d <= remaining; d++) {
    days.push({ date: new Date(year, month + 1, d), currentMonth: false })
  }

  return days
}

export function isSameDay(a, b) {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate()
  )
}

export function isBetween(date, start, end) {
  if (!start || !end) return false
  const t  = date.getTime()
  const lo = Math.min(start.getTime(), end.getTime())
  const hi = Math.max(start.getTime(), end.getTime())
  return t > lo && t < hi
}

export function isRangeStart(date, start, end) {
  if (!start || !end) return false
  const earlier = start.getTime() <= end.getTime() ? start : end
  return isSameDay(date, earlier)
}

export function isRangeEnd(date, start, end) {
  if (!start || !end) return false
  const later = start.getTime() >= end.getTime() ? start : end
  return isSameDay(date, later)
}

export function formatShort(date) {
  if (!date) return ''
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function daysBetween(a, b) {
  if (!a || !b) return 0
  return Math.abs(Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)))
}