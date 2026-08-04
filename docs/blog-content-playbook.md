# Blog Content Playbook — Dr. Enor Massoni

Operational contract for creating and maintaining posts in this project.
Strategy lives in `docs/seo-strategy.md`; compliance in
`docs/compliance-guidelines.md` — **read §8 of that file before every publish.**

The two rules that most often catch a dental post, both from
Resolução CFO-196/2019:

- **No procedure-in-progress imagery** (art. 3º) — only diagnosis and
  conclusion images may be published, and only by the dentist who performed
  the procedure, with a signed TCLE on file.
- **No "antes / durante / depois" framing** (Código de Ética art. 44 I and XII).
  Caption images as clinical description of what is visible, never as a
  before/after pair.

## Where content lives

Note this repo's layout: the App Router lives at `app/`, and components/lib live
under `app/src/` — not `src/app/`.

| Thing | Path |
|---|---|
| Posts | `content/posts/<slug>.md` |
| Listing page | `app/blog/page.tsx` |
| Post route | `app/blog/[slug]/page.tsx` |
| Parser + excerpt + post schema | `app/src/lib/blog.ts` |
| Reusable schema/OG generators | `app/src/lib/seo-schemas.ts` |
| Post images | `public/images/posts/<slug>/` |
| Markdown element mapping | `app/src/components/blog/mdx-components.tsx` |
| Markdown image renderer | `app/src/components/ui/MdxImage.tsx` |
| Intrinsic dimensions registry | `app/src/lib/mdx-image-dimensions.ts` |
| Author registry + disclaimer | `app/src/lib/constants.ts` |
| Machine-readable inventory | `public/llms.txt` |

## Frontmatter contract

Filename **must** equal the `slug` field.

```yaml
---
title: 'Sentence case title'
metaDescription: 'Under 160 chars'
slug: 'post-slug'
publishDate: 'YYYY-MM-DD'
lastModified: 'YYYY-MM-DD'
primaryKeyword: 'the one query'
secondaryKeywords: ['variant 1', 'variant 2']
targetAudience: 'patients'      # patients | referring-doctors | general-public
intent: 'awareness'             # awareness | consideration | decision
articleSection: 'Odontologia preventiva'
author: 'enor'                  # key in POST_AUTHORS (constants.ts): enor | thiago
featured: false
order: <max existing + 1>
relatedPosts: ['existing-slug'] # optional, must resolve or the build throws
faqs:
  - question: '…?'
    answer: '…'
---
```

`slug` must equal the filename and `metaDescription` must be ≤160 characters —
both are asserted by `tests/content-discovery.test.ts`.

## Card subtitle — the italic hook

The listing card subtitle comes from the **first non-heading paragraph**. If it's
fully italic, that text is used verbatim (markers stripped). So every post opens
with one italic hook line immediately after the frontmatter, before any heading.

```md
_One line framing the tension the article resolves._
```

The **first markdown image** in the body becomes the card image.

## Capitalization

Sentence case for `title` and all `##` / `###` headings. Capitalize only the
first word and proper nouns. Never Title Case.

## Body conventions

- `##` headings phrased as the question a patient would type
- The answer in the first sentence under each heading, then detail
- Each section self-contained — answer engines retrieve chunks, not pages
- Bullet lists for symptoms, indications, criteria
- Cover the negative case: when something is *not* indicated, limits, recurrence
- CTA in the conclusion, linking to the owner service page

## Image workflow

```md
![Descriptive accessible alt text](/images/posts/<slug>/<name>.webp)
```

1. WebP unless transparency requires PNG
2. Lowercase hyphenated filename, namespaced under the slug
3. Check the file's **real** dimensions; if they differ from the registry
   default (1600×1067), add an exact entry to
   `app/src/lib/mdx-image-dimensions.ts`
4. Run the dimension test — it verifies against the real file with `image-size`

Conversion used for the existing post (source JPEGs are outside this repo, in
`../blog-posts/<topic>/`):

```bash
magick <src>.JPG -resize 1600x -strip -quality 82 \
  public/images/posts/<slug>/<name>.webp
```

**Patient photography is a compliance decision, not an editorial one.** Any
image of a patient's mouth needs documented consent on file and a check against
`docs/compliance-guidelines.md` before it ships. Crop out identifying features
(facial hair, lips beyond the retractors, skin) as a matter of course.

## Discovery

New posts enter the sitemap automatically. They must **also** be added to
`public/llms.txt` under the right topic cluster — the discovery test asserts set
equality, so both a missing entry and a stale one fail.

## Footer block — identical on every post

Rendered automatically by `AuthorByline` from the `author` frontmatter key and
`MEDICAL_DISCLAIMER` in `constants.ts` — **do not** write it into the markdown
body. To change who a post is attributed to, change `author:` in the frontmatter.

> TODO_COMPLIANCE: `MEDICAL_DISCLAIMER` is a reasonable draft, not the
> regulator's wording. Replace it once `docs/compliance-guidelines.md` exists.

## Compliance pass — mandatory before publish

Run the checklist in `docs/compliance-guidelines.md` §8. Nothing ships that
depends on an open question from §10.

## Authoring workflow

1. Scan existing posts for overlapping intent
2. Decide: update / differentiate / consolidate / create
3. Name the primary query, the reader question, and the owner service page
4. Create the file with valid frontmatter
5. Italic hook + body
6. Images + register non-default dimensions
7. Add to `public/llms.txt`
8. Identification + disclaimer footer
9. Compliance pass
10. Tests, lint, build
11. Review the `/blog` card and the rendered article at phone width

## Validation

```bash
rg -n "<topic>" content/posts        # duplicate check
bun test                             # discovery, image dimensions, SEO metadata
bun run lint && bun run build
```
