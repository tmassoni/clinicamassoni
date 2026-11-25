const REPRESENTATIONS = ['text/html', 'text/markdown'] as const

/** A specific range overrides a wildcard, even when its quality is zero. */
export function preferredPageType(accept: string | null): (typeof REPRESENTATIONS)[number] | undefined {
  if (!accept?.trim()) return 'text/html'

  const ranges = (accept.match(/(?:[^",]|"(?:[^"\\]|\\.)*")+/g) ?? []).map((entry) => {
    const [type, ...parameters] = (entry.match(/(?:[^";]|"(?:[^"\\]|\\.)*")+/g) ?? [])
      .map((part) => part.trim().toLowerCase())
    const weight = parameters.findIndex((parameter) => /^q\s*=/.test(parameter))
    const mediaParameters = weight === -1 ? parameters : parameters.slice(0, weight)
    const quality = weight === -1 ? '1' : parameters[weight].replace(/^q\s*=\s*/, '')
    const specificity = type === '*/*' ? 0 : type?.endsWith('/*') ? 1 : 2

    return {
      type,
      quality: /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(quality) ? Number(quality) : 0,
      specificity: specificity * 2 + mediaParameters.length,
      supported: mediaParameters.every((parameter) => /^charset\s*=\s*(?:utf-8|"utf-8")$/.test(parameter)),
    }
  })

  const candidates = REPRESENTATIONS.map((type) => {
    const match = ranges
      .filter((range) => range.supported &&
        (range.type === type || range.type === 'text/*' || range.type === '*/*'))
      .sort((a, b) => b.specificity - a.specificity || b.quality - a.quality)[0]
    return { type, quality: match?.quality ?? 0, specificity: match?.specificity ?? 0 }
  }).filter((candidate) => candidate.quality > 0)

  const [first, second] = candidates.sort((a, b) =>
    b.quality - a.quality || b.specificity - a.specificity
  )
  // Prefer Markdown when explicitly offered alongside equally acceptable HTML.
  if (second && first.quality === second.quality && first.specificity === second.specificity &&
    first.specificity >= 4) return 'text/markdown'
  return first?.type
}
