import fs from 'fs'
import process from 'node:process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTES_ROOT = path.join(PROJECT_ROOT, 'src', 'features', 'dsa', 'routes', 'DSA')

const hierarchy = {
  '0. Fundamentals': {
    '1. Primitive Types': {},
    '2. Complexity Analysis (Big O)': {},
    '3. Bit Manipulation': {},
  },
  '1. Core Data Structures': {
    '1. Linear': {
      '1. Arrays & Lists': {},
      '2. Linked Lists': {},
      '3. Stacks': {},
      '4. Queues': {},
    },
    '2. Non-Linear': {
      '1. Trees': {},
      '2. Graphs': {},
    },
    '3. Hash-Based': {
      'Hash Tables & Maps': {},
    },
    '4. Advanced & Specialized': {
      '1. Heaps & Priority Queues': {},
      '2. Tries (Prefix Trees)': {},
      '3. Segment & Fenwick Trees': {},
      '4. Disjoint Set (Union-Find)': {},
      '5. Advanced Trees (AVL, Red-Black, B-Tree)': {},
    },
  },
  '2. Core Algorithms': {
    '1. Sorting & Searching': {},
    '2. Graph Algorithms': {},
    '3. Dynamic Programming': {},
    '4. Greedy Algorithms': {},
    '5. Divide and Conquer': {},
    '6. Backtracking': {},
  },
  '3. Algorithmic Paradigms': {
    '1. Brute Force': {},
    '2. Divide & Conquer': {},
    '3. Greedy Algorithms': {},
    '4. Dynamic Programming': {},
    '5. Backtracking': {},
    '6. Randomized Algorithms': {},
  },
  '4. Advanced Topics': {
    '1. String Algorithms': {},
    '2. Mathematical Algorithms': {},
    '3. Computational Geometry': {},
    '4. Systems & Concurrency': {},
  },
  '5. Applied Domains': {
    '1. Systems Design & Architecture': {},
    '2. Database & Indexing (B+ Trees, LSM Trees)': {},
    '3. OS & Kernel (Scheduling, Memory Mgmt)': {},
    '4. Network & Distributed Algorithms': {},
    '5. Cryptography': {},
    '6. Game Development (Pathfinding, etc.)': {},
    '7. AI & ML (Search, GNNs, etc.)': {},
    '8. Blockchain (Merkle Trees, etc.)': {},
    '9. Bioinformatics (Suffix Arrays, etc.)': {},
  },
}

const { promises: fsPromises } = fs

const escapeForTemplate = (value) => value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

const componentTemplate = (routeTitle) => {
  const safeTitle = escapeForTemplate(routeTitle)

  return `import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture'

const tabs: Array<{ id: TabId; label: string }> = [{ id: 'big-picture', label: 'Overview' }]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [{ id: 'overview', label: 'Overview' }],
}

export default function Page(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: '${safeTitle}',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="${safeTitle}"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">${safeTitle}</h1>
      <p className="bin98-doc-subtitle">Scaffolded topic page. Replace this placeholder with real content.</p>

      <section id="overview" className="bin98-section">
        <h2 className="bin98-heading">Implementation Checklist</h2>
        <ul>
          <li>Explain the core concepts and where they matter.</li>
          <li>Add concrete examples, tradeoffs, and glossary entries.</li>
          <li>Hook up any interactive visualizers or simulators that belong on the page.</li>
        </ul>
      </section>
    </TopicPageShell>
  )
}
`
}

const toRouteTitle = (dirPath) => {
  const relativePath = path.relative(ROUTES_ROOT, dirPath)
  if (!relativePath) {
    return 'DSA'
  }

  return path.basename(relativePath).replace(/^\d+\.\s*/, '')
}

const createIndexComponent = async (dirPath) => {
  const filePath = path.join(dirPath, 'index.tsx')
  const routeTitle = toRouteTitle(dirPath)
  const fileContents = componentTemplate(routeTitle)

  try {
    const existingContent = await fsPromises.readFile(filePath, 'utf8')

    if (existingContent.trim() === fileContents.trim()) {
      return
    }

    if (
      existingContent.includes('Content coming soon.') ||
      existingContent.includes('This is a placeholder page for')
    ) {
      await fsPromises.writeFile(filePath, fileContents, 'utf8')
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }

    await fsPromises.writeFile(filePath, fileContents, 'utf8')
  }
}

const ensureDirectory = async (dirPath) => {
  await fsPromises.mkdir(dirPath, { recursive: true })
}

const traverseHierarchy = async (currentPath, node) => {
  await ensureDirectory(currentPath)
  await createIndexComponent(currentPath)

  if (!node) {
    return
  }

  for (const [childName, childNode] of Object.entries(node)) {
    const nextPath = path.join(currentPath, childName)
    await traverseHierarchy(nextPath, childNode)
  }
}

const main = async () => {
  await traverseHierarchy(ROUTES_ROOT, hierarchy)
  console.log(`DSA directory structure ensured at: ${ROUTES_ROOT}`)
}

main().catch((error) => {
  console.error('Failed to generate DSA directory structure:', error)
  process.exitCode = 1
})
