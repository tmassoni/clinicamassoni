import { expect, test } from 'bun:test'
import { preferredPageType } from '@/app/src/lib/accept'

const cases = [
  [null, 'text/html'],
  ['*/*;q=0.8', 'text/html'],
  ['text/*', 'text/html'],
  ['text/html', 'text/html'],
  ['text/markdown', 'text/markdown'],
  ['TEXT/MARKDOWN; charset="UTF-8"', 'text/markdown'],
  ['text/markdown, text/html', 'text/markdown'],
  ['text/html, text/markdown', 'text/markdown'],
  ['text/markdown;q=0.5, text/html;q=0.8', 'text/html'],
  ['text/markdown;q=0, text/*;q=1', 'text/html'],
  ['text/html;q=0, */*', 'text/markdown'],
  ['text/markdown; charset=us-ascii, text/html;q=0.5', 'text/html'],
  ['text/markdown; charset="utf-8";q=0, text/markdown, text/html;q=0.5', 'text/html'],
  ['text/markdown; profile="a,b;c", text/html;q=0.5', 'text/html'],
  ['text/markdown;q=1=invalid', undefined],
  ['application/pdf', undefined],
  ['text/markdown;q=0, text/html;q=0', undefined],
] as const

for (const [accept, expected] of cases) {
  test(`negotiates ${accept ?? 'an absent Accept header'}`, () => {
    expect(preferredPageType(accept)).toBe(expected)
  })
}
