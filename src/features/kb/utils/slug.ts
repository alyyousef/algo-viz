const baseSlugify = (segment: string): string =>
  segment
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section'

export const slugifySegment = (segment: string): string =>
  baseSlugify(segment.replace(/&/g, ' and '))

export const slugifySegmentWithoutAmpersand = (segment: string): string =>
  baseSlugify(segment.replace(/&/g, ' '))
