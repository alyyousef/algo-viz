import { useLayoutEffect, useState, type RefObject } from 'react'

import { slugifyHeading } from '@/features/kb/utils/headings'

import type { SectionLink } from '@/features/kb/components/TopicPageShell'

const usedIds = (headings: HTMLHeadingElement[]): Set<string> => {
  const ids = new Set<string>()
  headings.forEach((heading) => {
    if (heading.id) {
      ids.add(heading.id)
    }
  })
  return ids
}

export const useContentHeadings = (
  containerRef: RefObject<HTMLElement | null>,
  children: unknown,
): SectionLink[] => {
  const [links, setLinks] = useState<SectionLink[]>([])

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) {
      setLinks([])
      return
    }

    const headings = [...root.querySelectorAll('h2')]
    const taken = usedIds(headings)

    const nextLinks = headings.map((heading) => {
      const label = heading.textContent?.trim() ?? 'Section'
      if (!heading.id) {
        let id = slugifyHeading(label)
        let suffix = 2
        while (taken.has(id)) {
          id = `${slugifyHeading(label)}-${suffix}`
          suffix += 1
        }
        heading.id = id
        taken.add(id)
      }

      return { id: heading.id, label }
    })

    setLinks(nextLinks)
  }, [children, containerRef])

  return links
}
