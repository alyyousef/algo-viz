import { BrowserRouter } from 'react-router-dom'

import type { JSX, ReactNode } from 'react'

export interface AppProvidersProps {
  children: ReactNode
}

export default function AppProviders({ children }: AppProvidersProps): JSX.Element {
  return <BrowserRouter>{children}</BrowserRouter>
}
