import React, { type HTMLAttributes, type ReactNode, forwardRef, type Ref } from 'react'

import '@/styles/win97.css'
import StartButton97, { type StartButton97Props } from './StartButton97'

export interface Taskbar97Props extends HTMLAttributes<HTMLElement> {
  startButtonProps?: StartButton97Props
  runningItems?: ReactNode
  tray?: ReactNode
}

const Taskbar97 = forwardRef(function Taskbar97(
  { className, startButtonProps, runningItems, tray, children, ...rest }: Taskbar97Props,
  ref: Ref<HTMLElement>,
) {
  const composedClassName = ['taskbar-97', className].filter(Boolean).join(' ')

  return (
    <footer ref={ref} className={composedClassName} {...rest}>
      <div className="taskbar-97__start">
        <StartButton97 {...startButtonProps} />
      </div>
      <div className="taskbar-97__items" aria-label="Running tasks">
        {runningItems ?? children ?? (
          <span className="taskbar-97__placeholder">Start a program</span>
        )}
      </div>
      <div className="taskbar-97__tray" aria-label="System tray">
        {tray ?? null}
      </div>
    </footer>
  )
})

export default Taskbar97

/*
Plain HTML usage example:
<footer class="taskbar-97">
  <div class="taskbar-97__start">
    <button class="btn-97 bevel-out start-button-97">
      <span class="start-button-97__logo">
        <svg class="start-button-97__svg" viewBox="0 0 16 16" aria-hidden="true">
          <!-- windows logo paths -->
        </svg>
        <span class="start-button-97__emoji" aria-hidden="true">&#x1FA9F;</span>
      </span>
      <span class="start-button-97__label">Start</span>
    </button>
  </div>
  <div class="taskbar-97__items" aria-label="Running tasks">
    <span class="taskbar-97__placeholder">Start a program</span>
  </div>
  <div class="taskbar-97__tray" aria-label="System tray"></div>
</footer>
*/
