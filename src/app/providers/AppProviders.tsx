import { BrowserRouter, useNavigate } from 'react-router-dom'

import { useEffect, type JSX, type ReactNode } from 'react'

export interface AppProvidersProps {
  children: ReactNode
}

function Win95ReturnHandler({ children }: AppProvidersProps): JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const control = target.closest('.win95-control')
      if (!control) {
        return
      }

      const label = control.getAttribute('aria-label')
      if (label && label !== 'Close window' && label !== 'Return') {
        return
      }

      event.preventDefault()
      event.stopPropagation()

      const historyState = window.history.state as { idx?: number } | null
      if (historyState?.idx && historyState.idx > 0) {
        navigate(-1)
      } else {
        navigate('/algoViz')
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [navigate])

  return <>{children}</>
}

export default function AppProviders({ children }: AppProvidersProps): JSX.Element {
  return (
    <BrowserRouter>
      <Win95ReturnHandler>{children}</Win95ReturnHandler>
    </BrowserRouter>
  )
}
