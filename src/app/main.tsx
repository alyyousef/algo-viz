import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/app/App'
import AppProviders from '@/app/providers/AppProviders'

import '@fontsource-variable/inter'
import '@/styles/globals.css'
import '@/styles/bin98.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found. Make sure index.html includes a root element.')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
