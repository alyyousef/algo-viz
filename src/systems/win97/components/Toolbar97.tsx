import React, { forwardRef, type HTMLAttributes, type Ref, type ReactNode } from 'react'

import '@/styles/win97.css'

export interface Toolbar97Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const Toolbar97 = forwardRef(function Toolbar97(
  { className, children, role = 'toolbar', ...rest }: Toolbar97Props,
  ref: Ref<HTMLDivElement>,
) {
  const toolbarClassName = ['toolbar-97', className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={toolbarClassName} role={role} {...rest}>
      {children}
    </div>
  )
})

interface Toolbar97SpacerProps {
  className?: string
}

export const Toolbar97Spacer: React.FC<Toolbar97SpacerProps> = ({ className }) => (
  <span
    aria-hidden="true"
    className={['toolbar-97__spacer', className].filter(Boolean).join(' ')}
  />
)

export default Toolbar97

/*
Plain HTML usage example:
<div class="toolbar-97" role="toolbar">
  <button class="btn-97 bevel-out btn-97--sm">New</button>
  <span class="toolbar-97__spacer"></span>
  <button class="btn-97 bevel-out btn-97--sm">Open</button>
</div>
*/
