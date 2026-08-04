const POST_DATE_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

/**
 * Formats a `YYYY-MM-DD` frontmatter date for display. Parsed as UTC so the
 * rendered day never drifts by one depending on the build machine's timezone.
 */
export function formatPostDate(isoDate: string): string {
  return POST_DATE_FORMATTER.format(new Date(`${isoDate}T00:00:00Z`))
}
