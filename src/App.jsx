import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import DSAIndex from './pages/DSA/index.jsx'
import NotFound from './pages/NotFound.jsx'

const dsaModules = import.meta.glob('./pages/DSA/**/index.jsx', { eager: true })

const slugifySegment = (segment) =>
  segment
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section'

const removeOrderingPrefix = (name) => name.replace(/^[0-9]+\.?\s*/, '')

const descriptionOverrides = {
  '0. Fundamentals':
    'Build essential intuition around primitives, complexity analysis, and foundational bitwise operations.',
  '1. Core Data Structures':
    'Investigate arrays, linked lists, trees, and other structures that power every algorithmic solution.',
  '2. Core Algorithms':
    'Focus on the algorithmic backbone—sorting, searching, dynamic programming, and more.',
  '3. Algorithmic Paradigms':
    'Compare problem-solving mindsets like divide and conquer, greedy, dynamic programming, and backtracking.',
  '4. Domain-Specific & Advanced':
    'Dive into strings, computational geometry, advanced graph theory, and probabilistic approaches.',
  '5. Specialized Applications':
    'Explore real-world applications spanning systems, databases, cryptography, AI, and beyond.'
}

const dsaEntries = Object.entries(dsaModules).map(([filePath, module]) => {
  const relative = filePath.replace('./pages/', '').replace(/\/index\.jsx$/, '')
  const segments = relative.split('/')
  const pathSegments = segments.map(slugifySegment)
  const path = `/${pathSegments.join('/')}`

  return {
    path,
    segments,
    label: segments[segments.length - 1],
    Component: module.default
  }
})

const dsaRootEntry = dsaEntries.find((entry) => entry.segments.length === 1)
const nestedEntries = dsaEntries.filter((entry) => entry !== dsaRootEntry)

const dsaSectionCards = nestedEntries
  .filter((entry) => entry.segments.length === 2)
  .map((entry) => {
    const rawTitle = entry.label
    const cleanedTitle = removeOrderingPrefix(rawTitle)

    return {
      path: entry.path,
      title: cleanedTitle,
      rawTitle,
      description:
        descriptionOverrides[rawTitle] ??
        `Explore core concepts, visualizations, and practice material for ${cleanedTitle.toLowerCase()}.`
    }
  })

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/algorithms/*" element={<Navigate to="/dsa" replace />} />
      <Route path="/dsa" element={<DSAIndex sections={dsaSectionCards} />} />
      {nestedEntries.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
