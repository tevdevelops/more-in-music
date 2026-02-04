export interface CalendarEventInput {
  title: string
  start: string | Date
  end?: string | Date | null
  description?: string | null
  location?: string | null
}

export interface CalendarLinkSet {
  google: string
  outlook: string
  yahoo: string
  ics: {
    href: string
    filename: string
    content: string
  }
}

const DEFAULT_EVENT_DURATION_HOURS = 2

/**
 * Determine whether an event occurs in the past relative to `referenceDate`.
 * All-day events (no explicit time) expire at local midnight following the date.
 */
export function isEventInPast(
  dateString: string | null | undefined,
  referenceDate: Date = new Date()
): boolean {
  if (!dateString) {
    return false
  }

  const eventDate = new Date(dateString)
  if (Number.isNaN(eventDate.getTime())) {
    return false
  }

  const eventIsAllDay =
    eventDate.getHours() === 0 &&
    eventDate.getMinutes() === 0 &&
    eventDate.getSeconds() === 0

  if (eventIsAllDay) {
    const endOfDay = new Date(eventDate)
    endOfDay.setDate(endOfDay.getDate() + 1)
    endOfDay.setMilliseconds(endOfDay.getMilliseconds() - 1)
    return endOfDay.getTime() < referenceDate.getTime()
  }

  return eventDate.getTime() < referenceDate.getTime()
}

export function createCalendarLinks(event: CalendarEventInput): CalendarLinkSet {
  const startDate = normalizeToDate(event.start)
  const eventIsAllDay =
    startDate.getHours() === 0 &&
    startDate.getMinutes() === 0 &&
    startDate.getSeconds() === 0

  const endDate = resolveEndDate(event, startDate, eventIsAllDay)

  const googleDates = formatCalendarDateRange(startDate, endDate, eventIsAllDay)
  const googleUrl = buildGoogleCalendarUrl(event, googleDates)
  const outlookUrl = buildOutlookCalendarUrl(event, startDate, endDate)
  const yahooUrl = buildYahooCalendarUrl(event, startDate, endDate, eventIsAllDay)

  const icsContent = buildICSContent(event, startDate, endDate, eventIsAllDay)
  const icsHref = `data:text/calendar;charset=utf-8,${encodeURIComponent(
    icsContent
  )}`
  const icsFilename = `${slugifyTitle(event.title)}.ics`

  return {
    google: googleUrl,
    outlook: outlookUrl,
    yahoo: yahooUrl,
    ics: {
      href: icsHref,
      filename: icsFilename,
      content: icsContent,
    },
  }
}

function normalizeToDate(value: string | Date): Date {
  if (value instanceof Date) {
    return new Date(value.getTime())
  }
  return new Date(value)
}

function resolveEndDate(
  event: CalendarEventInput,
  startDate: Date,
  allDay: boolean
): Date {
  if (event.end) {
    return normalizeToDate(event.end)
  }

  const derivedEnd = new Date(startDate.getTime())

  if (allDay) {
    derivedEnd.setDate(derivedEnd.getDate() + 1)
  } else {
    derivedEnd.setHours(derivedEnd.getHours() + DEFAULT_EVENT_DURATION_HOURS)
  }

  return derivedEnd
}

function formatCalendarDateRange(
  start: Date,
  end: Date,
  allDay: boolean
): { start: string; end: string } {
  if (allDay) {
    return {
      start: formatDateForAllDay(start),
      end: formatDateForAllDay(end),
    }
  }

  return {
    start: formatDateForCalendar(start),
    end: formatDateForCalendar(end),
  }
}

function formatDateForCalendar(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z')
}

function formatDateForAllDay(date: Date): string {
  return (
    date.getUTCFullYear().toString().padStart(4, '0') +
    (date.getUTCMonth() + 1).toString().padStart(2, '0') +
    date.getUTCDate().toString().padStart(2, '0')
  )
}

function buildGoogleCalendarUrl(
  event: CalendarEventInput,
  formattedDates: { start: string; end: string }
): string {
  const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE'

  const params = new URLSearchParams({
    text: event.title,
    dates: `${formattedDates.start}/${formattedDates.end}`,
  })

  if (event.description) {
    params.set('details', event.description)
  }

  if (event.location) {
    params.set('location', event.location)
  }

  return `${baseUrl}&${params.toString()}`
}

function buildOutlookCalendarUrl(
  event: CalendarEventInput,
  start: Date,
  end: Date
): string {
  const baseUrl =
    'https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent'

  const params = new URLSearchParams({
    subject: event.title,
    startdt: start.toISOString(),
    enddt: end.toISOString(),
  })

  if (event.description) {
    params.set('body', event.description)
  }

  if (event.location) {
    params.set('location', event.location)
  }

  return `${baseUrl}&${params.toString()}`
}

function buildYahooCalendarUrl(
  event: CalendarEventInput,
  start: Date,
  end: Date,
  allDay: boolean
): string {
  const baseUrl = 'https://calendar.yahoo.com/?v=60'

  const params = new URLSearchParams({
    title: event.title,
    st: allDay ? formatDateForAllDay(start) : formatDateForCalendar(start),
    et: allDay ? formatDateForAllDay(end) : formatDateForCalendar(end),
  })

  if (event.description) {
    params.set('desc', event.description)
  }

  if (event.location) {
    params.set('in_loc', event.location)
  }

  if (!allDay) {
    params.set('dur', deriveYahooDuration(start, end))
  }

  return `${baseUrl}&${params.toString()}`
}

function deriveYahooDuration(start: Date, end: Date): string {
  const diffMs = end.getTime() - start.getTime()
  const totalMinutes = Math.max(Math.round(diffMs / 60000), 30)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours.toString().padStart(2, '0')}${minutes
    .toString()
    .padStart(2, '0')}`
}

function buildICSContent(
  event: CalendarEventInput,
  start: Date,
  end: Date,
  allDay: boolean
): string {
  const now = new Date()
  const dtStamp = formatDateForCalendar(now)
  const dtStart = allDay
    ? `DTSTART;VALUE=DATE:${formatDateForAllDay(start)}`
    : `DTSTART:${formatDateForCalendar(start)}`
  const dtEnd = allDay
    ? `DTEND;VALUE=DATE:${formatDateForAllDay(end)}`
    : `DTEND:${formatDateForCalendar(end)}`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//More In Music//Events//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${generateUID(start, event.title)}`,
    `DTSTAMP:${dtStamp}`,
    dtStart,
    dtEnd,
    `SUMMARY:${escapeICSText(event.title)}`,
  ]

  if (event.description) {
    lines.push(`DESCRIPTION:${escapeICSText(event.description)}`)
  }

  if (event.location) {
    lines.push(`LOCATION:${escapeICSText(event.location)}`)
  }

  lines.push('END:VEVENT', 'END:VCALENDAR')

  return lines.join('\r\n')
}

function escapeICSText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

function generateUID(start: Date, title: string): string {
  const base = `${start.getTime()}-${title}`.toLowerCase()
  return `${slugifyTitle(base)}@more-in-music`
}

function slugifyTitle(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 120) || 'event'
}
