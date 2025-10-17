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

const removeOrderingPrefix = (value = '') => value.replace(/^[0-9]+\.?\s*/, '').trim()

const descriptionOverrides = {
  '0. Fundamentals':
    'Build essential intuition around primitives, complexity analysis, and foundational bitwise operations.',
  '1. Core Data Structures':
    'Investigate arrays, linked lists, trees, and other structures that power every algorithmic solution.',
  '2. Core Algorithms':
    'Focus on the algorithmic backbone - sorting, searching, dynamic programming, and more.',
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
  const rawTitle = segments[segments.length - 1]

  return {
    relative,
    segments,
    path,
    rawTitle,
    title: removeOrderingPrefix(rawTitle) || rawTitle,
    Component: module.default,
    children: []
  }
})

const entryByRelative = new Map(dsaEntries.map((entry) => [entry.relative, entry]))

dsaEntries.forEach((entry) => {
  const parentSegments = entry.segments.slice(0, -1)
  const parentRelative = parentSegments.length ? parentSegments.join('/') : null

  entry.parentRelative = parentRelative
  entry.parent = parentRelative ? entryByRelative.get(parentRelative) : null

  if (entry.parent) {
    entry.parent.children.push(entry)
  }
})

const sortByRawTitle = (a, b) => a.rawTitle.localeCompare(b.rawTitle, undefined, { numeric: true })
dsaEntries.forEach((entry) => {
  entry.children.sort(sortByRawTitle)
})

const dsaRootEntry = entryByRelative.get('DSA')

const getCardDescription = (parentEntry, childEntry) => {
  const override = descriptionOverrides[childEntry.rawTitle]
  if (override) {
    return override
  }

  const childTitle = childEntry.title.toLowerCase()
  const parentTitle = removeOrderingPrefix(parentEntry?.rawTitle ?? 'DSA').toLowerCase()

  if (!parentEntry || parentEntry === dsaRootEntry) {
    return `Explore core concepts, visual aids, and practice material for ${childTitle}.`
  }

  return `Dive into ${childTitle} within the ${parentTitle} track.`
}

const buildSectionProps = (entry) => {
  if (!entry || entry.children.length === 0) {
    return null
  }

  const isRoot = entry === dsaRootEntry
  const parent = entry.parent
  const parentTitle = parent ? removeOrderingPrefix(parent.rawTitle ?? parent.title) : null
  const entryTitle = removeOrderingPrefix(entry.rawTitle ?? entry.title)

  const sections = entry.children.map((child) => ({
    path: child.path,
    rawTitle: child.rawTitle,
    title: child.title,
    description: getCardDescription(entry, child),
    badge: (isRoot ? 'CLUSTER' : entryTitle.toUpperCase()) || 'TOPIC',
    ctaLabel: child.children.length ? 'View subtopics ->' : 'Open topic ->'
  }))

  const heading = isRoot ? 'Choose a topic cluster' : `Explore ${entryTitle}`
  const description = isRoot
    ? 'Explore curated roadmaps for fundamental concepts, canonical data structures, and advanced algorithmic techniques. Pick a cluster to dive into guided overviews and TODOs.'
    : `Select a subject within ${entryTitle.toLowerCase()} to continue exploring curated notes and TODO checklists.`

  const badgeLabel = isRoot ? 'DSA CATALOG' : `${entryTitle} track`.toUpperCase()
  const backLink = parent ? parent.path : '/'
  const backLabel = parent ? `Back to ${parentTitle}` : 'Back to home'
  const defaultCta = entry.children.some((child) => child.children.length) ? 'View subtopics ->' : 'Open topic ->'

  return {
    sections,
    badgeLabel,
    heading,
    description,
    backLink,
    backLabel,
    ctaLabel: defaultCta
  }
}

const nonRootEntries = dsaEntries.filter((entry) => entry !== dsaRootEntry)

function App() {
  const rootSectionProps = buildSectionProps(dsaRootEntry)

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/algorithms/*" element={<Navigate to="/dsa" replace />} />
      {rootSectionProps ? (
        <Route path="/dsa" element={<DSAIndex {...rootSectionProps} />} />
      ) : (
        <Route path="/dsa" element={<NotFound />} />
      )}
      {nonRootEntries.map((entry) => {
        const sectionProps = buildSectionProps(entry)

        if (sectionProps) {
          return <Route key={entry.path} path={entry.path} element={<DSAIndex {...sectionProps} />} />
        }

        const EntryComponent = entry.Component
        return <Route key={entry.path} path={entry.path} element={<EntryComponent />} />
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
