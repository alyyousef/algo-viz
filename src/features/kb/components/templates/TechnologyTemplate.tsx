import { MdxPageShell } from '@/features/kb/components/templates/MdxPageShell'

import type { JSX, ReactNode } from 'react'

interface TechnologyTemplateProps {
  title: string
  children: ReactNode
}

export function TechnologyTemplate({ title, children }: TechnologyTemplateProps): JSX.Element {
  return (
    <MdxPageShell
      title={title}
      titleSuffix="Technology Overview"
      titlebarStyle={{ background: 'linear-gradient(90deg, #004000 0%, #008000 100%)' }}
    >
      {children}
    </MdxPageShell>
  )
}
