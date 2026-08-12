#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROUTES_DIR = path.join(__dirname, '..', 'src', 'features', 'dsa', 'routes', 'DSA')

const PLACEHOLDER_COPY_PATTERNS = [
  [
    /'The original page was a placeholder\. That original intent is preserved here as a roadmap so the subsection can keep deepening while staying aligned with the same goals\.',/g,
    `'This page provides a roadmap for the subsection and sets priorities for deeper follow-on topics.',`,
  ],
  [
    /'The original page was a placeholder\. That original intent is preserved here as a roadmap so the subsection can continue expanding while keeping the same scope goals\.',/g,
    `'This page provides a roadmap for the subsection and clarifies the scope for deeper follow-on topics.',`,
  ],
  [
    /'The original page was a placeholder\. That original intent is preserved here as a roadmap so the section can continue to deepen while remaining faithful to the same coverage goals\.',/g,
    `'This page provides a roadmap for the section and sets the coverage priorities for deeper follow-on topics.',`,
  ],
  [
    /'The original page was a placeholder\. That original intent is preserved here as a roadmap so the subsection can keep growing while remaining aligned with the original scope\.',/g,
    `'This page provides a roadmap for the subsection and keeps the deeper follow-on topics aligned with the same scope.',`,
  ],
  [
    /'The original page was a placeholder\. That original intent is preserved here so the subsection can continue expanding while staying aligned with the same coverage goals\.',/g,
    `'This page provides a roadmap for the subsection and keeps deeper follow-on topics aligned with the same coverage goals.',`,
  ],
  [
    /'The original page scope was placeholder content for ([^']+?)\. This help-style version keeps that scope while expanding it into a fuller reference covering ([^']+?)\.',/g,
    (_, subject, coverage) => `'This help-style reference covers ${subject} across ${coverage}.',`,
  ],
  [
    /'The original page scope was placeholder content for ([^']+?)\. This help-style version keeps that scope while organizing the material into ([^']+?)\.',/g,
    (_, subject, coverage) => `'This help-style reference covers ${subject} across ${coverage}.',`,
  ],
  [
    /'The original page scope was placeholder content for ([^']+?), with planned notes on ([^']+?)\. This help-style version keeps that scope and expands it into a fuller(?: technical)? reference(?: page)?\.',/g,
    (_, subject, coverage) => `'This help-style reference covers ${subject} across ${coverage}.',`,
  ],
  [
    /'The original page scope was placeholder content for ([^']+?), with planned notes on ([^']+?)\. This help-style version keeps that scope but expands it into a more complete reference page\.',/g,
    (_, subject, coverage) => `'This help-style reference covers ${subject} across ${coverage}.',`,
  ],
  [
    /'The original page scope was placeholder content for ([^']+?), with planned notes on ([^']+?)\. This help-style page keeps that scope and expands it into a fuller technical reference\.',/g,
    (_, subject, coverage) => `'This help-style reference covers ${subject} across ${coverage}.',`,
  ],
  [
    /'The original page scope was placeholder content promising ([^']+?)\. This page keeps that scope but turns it into a full help-style manual that explains where each approach fits, where the comparison is oversimplified, and how real engineering decisions are usually made\.',/g,
    (_, coverage) =>
      `'This help-style manual covers ${coverage} while explaining where each approach fits, where the comparison is oversimplified, and how real engineering decisions are usually made.',`,
  ],
]

const WIN95_TARGETS = [
  path.join(
    ROUTES_DIR,
    '1. Core Data Structures',
    '4. Advanced & Specialized',
    '2. Tries (Prefix Trees)',
    'index.tsx',
  ),
  path.join(
    ROUTES_DIR,
    '1. Core Data Structures',
    '4. Advanced & Specialized',
    '3. Segment & Fenwick Trees',
    'index.tsx',
  ),
  path.join(ROUTES_DIR, '4. Advanced Topics', '1. String Algorithms', 'index.tsx'),
  path.join(ROUTES_DIR, '4. Advanced Topics', '2. Mathematical Algorithms', 'index.tsx'),
  path.join(ROUTES_DIR, '4. Advanced Topics', '3. Computational Geometry', 'index.tsx'),
  path.join(
    ROUTES_DIR,
    '5. Applied Domains',
    '3. OS & Kernel (Scheduling, Memory Mgmt)',
    'index.tsx',
  ),
]

const slugify = (segment) =>
  segment
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section'

function findRouteFiles(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...findRouteFiles(full))
    else if (entry.name === 'index.tsx') results.push(full)
  }
  return results
}

function cleanupPlaceholderCopy(content) {
  let updated = content
  for (const [pattern, replacement] of PLACEHOLDER_COPY_PATTERNS) {
    updated = updated.replace(pattern, replacement)
  }
  return updated
}

function indentBlock(text, spaces = 6) {
  const indent = ' '.repeat(spaces)
  return text
    .trim()
    .split('\n')
    .map((line) => (line ? indent + line : line))
    .join('\n')
}

function transformWin95Body(body) {
  let updated = body.trim()

  updated = updated.replace(
    /className="win95-panel win95-panel--raised"/g,
    'className="bin98-section"',
  )
  updated = updated.replace(/className="win95-panel"/g, 'className="bin98-section"')
  updated = updated.replace(/className="win95-heading"/g, 'className="bin98-subheading"')
  updated = updated.replace(/className="win95-subheading"/g, 'className="bin98-subheading"')
  updated = updated.replace(/className="win95-code"/g, 'className="bin98-codebox"')
  updated = updated.replace(/className="win95-table"/g, 'className="bin98-table"')
  updated = updated.replace(
    /className="win95-list win95-list--numbered"/g,
    'className="list-decimal pl-5 space-y-2"',
  )
  updated = updated.replace(/className="win95-list"/g, 'className="list-disc pl-5 space-y-2"')
  updated = updated.replace(
    /className="win95-grid win95-grid-2"/g,
    'className="grid gap-4 md:grid-cols-2"',
  )
  updated = updated.replace(
    /className="win95-grid win95-grid-3"/g,
    'className="grid gap-4 md:grid-cols-3"',
  )
  updated = updated.replace(/className="win95-row"/g, 'className="grid gap-4 md:grid-cols-2"')
  updated = updated.replace(/className="win95-stack"/g, 'className="space-y-4"')
  updated = updated.replace(/\sclassName="win95-text"/g, '')

  return updated
}

function extractWin95Header(content) {
  const match = content.match(
    /<div className="win95-header-row">[\s\S]*?<div className="win95-subheading">([\s\S]*?)<\/div>[\s\S]*?<p className="win95-text">([\s\S]*?)<\/p>[\s\S]*?<\/div>\s*<Link to="\/algoViz" className="win95-button" role="button">[\s\S]*?<\/Link>\s*<\/div>/,
  )
  if (!match) return null

  return {
    subtitle: match[1].trim(),
    intro: match[2].trim(),
  }
}

function extractWin95Fieldsets(content) {
  return Array.from(
    content.matchAll(
      /<fieldset className="win95-fieldset">\s*<legend>([\s\S]*?)<\/legend>([\s\S]*?)<\/fieldset>/g,
    ),
  ).map((match) => ({
    legend: match[1].trim(),
    body: match[2].trim(),
  }))
}

function extractWin95Title(content, filePath) {
  const title = content.match(/<span className="win95-title">([\s\S]*?)<\/span>/)
  if (title) return title[1].trim()
  return path.basename(path.dirname(filePath)).replace(/^\d+\.\s*/, '')
}

function extractFunctionName(content) {
  const match = content.match(/export default function (\w+)\(\): JSX\.Element \{/)
  return match?.[1] ?? 'Page'
}

function buildOverviewSection(header) {
  if (!header) return ''

  return `      <section id="overview" className="bin98-section">
        <h2 className="bin98-heading">Overview</h2>
        <div className="bin98-subheading">${header.subtitle}</div>
        <p>${header.intro}</p>
      </section>`
}

function buildTocLinks(header, fieldsets) {
  const seen = new Set()
  const links = []

  if (header) {
    links.push({ id: 'overview', label: 'Overview' })
    seen.add('overview')
  }

  for (const fieldset of fieldsets) {
    let id = slugify(fieldset.legend)
    let suffix = 2
    while (seen.has(id)) {
      id = `${slugify(fieldset.legend)}-${suffix}`
      suffix++
    }
    seen.add(id)
    links.push({ id, label: fieldset.legend })
    fieldset.id = id
  }

  return links
}

function buildFieldsetSections(fieldsets) {
  return fieldsets
    .map(
      (fieldset) => `      <section id="${fieldset.id}" className="bin98-section">
        <h2 className="bin98-heading">${fieldset.legend}</h2>
${indentBlock(transformWin95Body(fieldset.body), 8)}
      </section>`,
    )
    .join('\n\n')
}

function migrateWin95Page(content, filePath) {
  const title = extractWin95Title(content, filePath)
  const funcName = extractFunctionName(content)
  const header = extractWin95Header(content)
  const fieldsets = extractWin95Fieldsets(content)

  if (fieldsets.length === 0) {
    throw new Error('No win95 fieldsets found')
  }

  const tocLinks = buildTocLinks(header, fieldsets)
  const overviewSection = buildOverviewSection(header)
  const fieldsetSections = buildFieldsetSections(fieldsets)
  const pageTitle = JSON.stringify(title)

  const contentSections = [overviewSection, fieldsetSections].filter(Boolean).join('\n\n')

  return `import TopicPageShell from '@/features/kb/components/TopicPageShell'
import { type TopicTab, useTopicTabs } from '@/features/kb/hooks/useTopicTabs'

import type { JSX } from 'react'

${extractDataBlock(content).trim()}

const tabs: TopicTab<'big-picture'>[] = [{ id: 'big-picture', label: 'Big Picture' }]

const tocLinks = ${JSON.stringify(tocLinks, null, 2)}

export default function ${funcName}(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: ${pageTitle},
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title=${pageTitle}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={tocLinks}
      onMinimize={handleMinimize}
    >
      {activeTab === 'big-picture' && (
        <>
${contentSections}
        </>
      )}
    </TopicPageShell>
  )
}
`
}

function extractDataBlock(content) {
  const fnIndex = content.lastIndexOf('\nexport default function ')
  if (fnIndex === -1) return content
  return content
    .slice(0, fnIndex)
    .replace(/^import[^\n]*\n/gm, '')
    .trim()
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8')
  let updated = cleanupPlaceholderCopy(original)

  if (WIN95_TARGETS.includes(filePath) && updated.includes('className="win95-page"')) {
    updated = migrateWin95Page(updated, filePath)
  }

  if (updated === original) return false

  fs.writeFileSync(filePath, updated, 'utf8')
  return true
}

let updatedCount = 0

for (const filePath of findRouteFiles(ROUTES_DIR)) {
  if (processFile(filePath)) updatedCount++
}

console.log(`Unified DSA outliers: ${updatedCount} file(s) updated.`)
