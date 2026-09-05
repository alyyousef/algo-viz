import { MdxPageShell } from '@/features/kb/components/templates/MdxPageShell'

import type { JSX, ReactNode } from 'react'

interface ConceptTemplateProps {
  title: string
  children: ReactNode
}

export function ConceptTemplate({ title, children }: ConceptTemplateProps): JSX.Element {
  return <MdxPageShell title={title}>{children}</MdxPageShell>
}
