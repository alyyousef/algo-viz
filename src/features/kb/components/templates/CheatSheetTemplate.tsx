import { MdxPageShell } from '@/features/kb/components/templates/MdxPageShell'

import type { JSX, ReactNode } from 'react'

interface CheatSheetTemplateProps {
  title: string
  children: ReactNode
}

export function CheatSheetTemplate({ title, children }: CheatSheetTemplateProps): JSX.Element {
  return (
    <MdxPageShell
      title={title}
      titleSuffix="Cheat Sheet"
      showToc={false}
      titlebarStyle={{ background: 'linear-gradient(90deg, #800000 0%, #ff0000 100%)' }}
    >
      {children}
    </MdxPageShell>
  )
}
