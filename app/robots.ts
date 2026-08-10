import type { MetadataRoute } from 'next'
import { CLINIC_WEBSITE } from '@/app/src/lib/constants'

// Answer-engine and search crawlers allowed explicitly. The wildcard rule
// already covers them; naming them removes ambiguity and documents the intent.
// TODO_COMPLIANCE: GPTBot, ClaudeBot, Google-Extended and Applebot-Extended are
// the training-adjacent crawlers. Confirm whether the client wants indexing
// without training, and drop those entries if so.
const AI_CRAWLERS = [
  // OpenAI
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  // Anthropic
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google / Apple answer surfaces
  'Google-Extended',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${CLINIC_WEBSITE}/sitemap.xml`,
    host: CLINIC_WEBSITE,
  }
}
