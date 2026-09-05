import { Children, isValidElement, type ReactNode } from 'react'

export const slugifyHeading = (text: string): string =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section'

export const getNodeText = (node: ReactNode): string => {
  if (node == null || typeof node === 'boolean') {
    return ''
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join('')
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children)
  }

  return ''
}

export const collectHeadingText = (children: ReactNode): string =>
  Children.toArray(children).map(getNodeText).join('')
