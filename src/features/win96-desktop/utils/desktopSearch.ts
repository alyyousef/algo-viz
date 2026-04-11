import { dsaRouteDefinitions } from '@/features/dsa/routeManifest'

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

export interface DesktopSearchEntry {
  id: string
  title: string
  breadcrumb: string
  route: string
  routeLabel: string
  matchText: string
}

const cleanSegmentLabel = (segment: string): string => segment.replace(/^\d+\.\s*/, '').trim()

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

export const desktopSearchEntries: DesktopSearchEntry[] = dsaRouteDefinitions
  .map(({ filePath, path, segments }) => {
    const labels = segments.map(cleanSegmentLabel)
    const title = labels[labels.length - 1] ?? path
    const breadcrumb = labels.slice(0, -1).join(' / ')
    const routeLabel = path.replace(/^\/dsa\//, 'dsa/')
    const matchText = normalizeText(`${labels.join(' ')} ${path}`)

    return {
      id: filePath,
      title,
      breadcrumb,
      route: path,
      routeLabel,
      matchText,
    }
  })
  .sort(compareEntries)

const applyLimit = (entries: DesktopSearchEntry[], limit?: number): DesktopSearchEntry[] => {
  if (limit === undefined) {
    return entries
  }

  return entries.slice(0, limit)
}

const scoreEntry = (entry: DesktopSearchEntry, tokens: string[]): number => {
  const normalizedTitle = normalizeText(entry.title)
  const normalizedBreadcrumb = normalizeText(entry.breadcrumb)
  const normalizedRoute = normalizeText(entry.routeLabel)
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
  }

  return score - entry.breadcrumb.length
}

export const searchDesktopEntries = (rawQuery: string, limit?: number): DesktopSearchEntry[] => {
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
      .map(({ entry }) => entry),
    limit,
  )
}
