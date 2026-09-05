const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

export interface DesktopSearchEntry {
  id: string
  title: string
  breadcrumb: string
  route: string
  routeLabel: string
  matchText: string
  body?: string
}

export interface DesktopSearchHit extends DesktopSearchEntry {
  snippet?: string
}

const normalizeText = (value: string): string =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const compareEntries = (left: DesktopSearchEntry, right: DesktopSearchEntry): number => {
  const breadcrumbComparison = collator.compare(left.breadcrumb, right.breadcrumb)
  if (breadcrumbComparison !== 0) {
    return breadcrumbComparison
  }

  return collator.compare(left.title, right.title)
}

export const desktopSearchEntries: DesktopSearchEntry[] = []

export const replaceDesktopSearchEntries = (entries: DesktopSearchEntry[]): void => {
  desktopSearchEntries.splice(0, desktopSearchEntries.length, ...entries)
}

export const loadDesktopSearchEntries = async (): Promise<void> => {
  if (desktopSearchEntries.length > 0) {
    return
  }
  try {
    const response = await fetch('/search-index.json')
    if (response.ok) {
      replaceDesktopSearchEntries((await response.json()) as DesktopSearchEntry[])
    }
  } catch (error) {
    console.error('Failed to load search index:', error)
  }
}

const applyLimit = (entries: DesktopSearchHit[], limit?: number): DesktopSearchHit[] => {
  if (limit === undefined) {
    return entries
  }

  return entries.slice(0, limit)
}

export const extractSearchSnippet = (
  body: string,
  tokens: string[],
  radius = 72,
): string | undefined => {
  const normalizedBody = normalizeText(body)
  const source = body.replace(/\s+/g, ' ').trim()
  if (!source) {
    return undefined
  }

  let bestIndex = -1
  for (const token of tokens) {
    const index = normalizedBody.indexOf(token)
    if (index !== -1) {
      bestIndex = index
      break
    }
  }

  if (bestIndex < 0) {
    return source.slice(0, radius * 2).trim()
  }

  const start = Math.max(0, bestIndex - radius)
  const end = Math.min(source.length, bestIndex + radius)
  return `${start > 0 ? '…' : ''}${source.slice(start, end).trim()}${end < source.length ? '…' : ''}`
}

const scoreEntry = (entry: DesktopSearchEntry, tokens: string[]): number => {
  const normalizedTitle = normalizeText(entry.title)
  const normalizedBreadcrumb = normalizeText(entry.breadcrumb)
  const normalizedRoute = normalizeText(entry.routeLabel)
  const normalizedBody = normalizeText(entry.body ?? '')
  let score = 0

  for (const token of tokens) {
    if (!entry.matchText.includes(token)) {
      return -1
    }

    if (normalizedTitle === token) {
      score += 140
      continue
    }

    if (normalizedTitle.startsWith(token)) {
      score += 100
    } else if (normalizedTitle.includes(` ${token}`)) {
      score += 80
    } else if (normalizedTitle.includes(token)) {
      score += 56
    }

    if (normalizedBreadcrumb.startsWith(token)) {
      score += 28
    } else if (normalizedBreadcrumb.includes(token)) {
      score += 18
    }

    if (normalizedRoute.includes(token)) {
      score += 8
    }

    if (normalizedBody.includes(token)) {
      score += 6
    }
  }

  return score - entry.breadcrumb.length
}

export const searchDesktopEntries = (rawQuery: string, limit?: number): DesktopSearchHit[] => {
  const normalizedQuery = normalizeText(rawQuery)
  if (!normalizedQuery) {
    return applyLimit(desktopSearchEntries, limit)
  }

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean)

  return applyLimit(
    desktopSearchEntries
      .map((entry) => ({ entry, score: scoreEntry(entry, tokens) }))
      .filter((candidate) => candidate.score >= 0)
      .sort((left, right) => {
        if (left.score !== right.score) {
          return right.score - left.score
        }

        return compareEntries(left.entry, right.entry)
      })
      .map(({ entry }) => {
        const titleHit = tokens.every((token) => normalizeText(entry.title).includes(token))
        const breadcrumbHit = tokens.every((token) =>
          normalizeText(entry.breadcrumb).includes(token),
        )
        return {
          ...entry,
          snippet:
            !titleHit && !breadcrumbHit && entry.body
              ? extractSearchSnippet(entry.body, tokens)
              : undefined,
        }
      }),
    limit,
  )
}
