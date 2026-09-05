export const formatKbSegment = (segment: string): string =>
  segment.replace(/^\d+(?:\.\d+)*\.?\s+/, '').trim() || segment

export const formatKbBreadcrumb = (segments: string[], separator = ' \\ '): string =>
  segments.join(separator)

export const formatKbTitle = (segments: string[]): string =>
  formatKbSegment(segments[segments.length - 1] ?? 'Topic')
