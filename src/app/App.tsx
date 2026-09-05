import { MDXProvider } from '@mdx-js/react'
import { Navigate, Route, Routes } from 'react-router-dom'

import NotFound from '@/app/routes/NotFound'
import { mdxComponents } from '@/features/kb/components/mdx/MdxComponents'
import { kbLegacyRedirectEntries } from '@/features/kb/routeManifest'
import Win96AlgoVizDesktop from '@/features/win96-desktop/Win96AlgoVizDesktop'

import type { JSX } from 'react'

export default function App(): JSX.Element {
  return (
    <MDXProvider components={mdxComponents}>
      <Routes>
        <Route path="/" element={<Navigate to="/algoViz" replace />} />
        {kbLegacyRedirectEntries.map(({ from, to }) => (
          <Route key={`${from}->${to}`} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route element={<Win96AlgoVizDesktop />}>
          <Route path="/algoViz" element={<></>} />
          <Route path="/kb/*" element={<></>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MDXProvider>
  )
}
