#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTES_ROOT = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const MOJIBAKE_MARKERS = [
  '\u00c3',
  '\u00c2',
  '\u00e2',
  '\u20ac',
  '\u2122',
  '\u0153',
  '\u2020',
  '\u017d',
  '\u00a2',
]

function findFiles(dir, predicate) {
  const results = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      results.push(...findFiles(fullPath, predicate))
      continue
    }

    if (predicate(fullPath)) {
      results.push(fullPath)
    }
  }

  return results
}

function toRelative(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, '/')
}

function createIssueStore() {
  const issues = []

  return {
    add(filePath, line, message) {
      issues.push({ filePath, line, message })
    },
    flush() {
      if (issues.length === 0) {
        console.log('Repo validation passed.')
        return 0
      }

      console.error(`Repo validation failed with ${issues.length} issue(s):`)
      for (const issue of issues) {
        const location = issue.line
          ? `${toRelative(issue.filePath)}:${issue.line}`
          : toRelative(issue.filePath)
        console.error(`- ${location} ${issue.message}`)
      }
      return 1
    },
  }
}

function validateRouteClasses(routeFiles, issueStore) {
  for (const filePath of routeFiles) {
    const text = fs.readFileSync(filePath, 'utf8')
    const lines = text.split('\n')

    lines.forEach((line, index) => {
      for (const match of line.matchAll(/className="([^"]+)"/g)) {
        for (const token of match[1].split(/\s+/)) {
          if (!token) {
            continue
          }

          if (/(?:help|helper)/.test(token) && !token.startsWith('bin98-')) {
            issueStore.add(filePath, index + 1, `leftover route helper class "${token}"`)
          }

          if (/\b[a-z]+bin98-/.test(token) && !token.startsWith('bin98-')) {
            issueStore.add(filePath, index + 1, `invalid bin98 variant "${token}"`)
          }
        }
      }

      if (/pageTitle:\s*'[^']+ Page'/.test(line) || /title="[^"]+ Page"/.test(line)) {
        issueStore.add(filePath, index + 1, 'generator-style page title suffix still present')
      }
    })
  }
}

function validateMojibake(issueStore) {
  const filesToScan = [
    path.join(PROJECT_ROOT, 'README.md'),
    ...findFiles(path.join(PROJECT_ROOT, 'src'), (filePath) =>
      /\.(?:ts|tsx|js|mjs|css|md)$/.test(filePath),
    ),
    ...findFiles(path.join(PROJECT_ROOT, 'scripts'), (filePath) =>
      /\.(?:ts|tsx|js|mjs|css|md)$/.test(filePath),
    ),
  ]

  for (const filePath of filesToScan) {
    const text = fs.readFileSync(filePath, 'utf8')
    const lines = text.split('\n')

    lines.forEach((line, index) => {
      const marker = MOJIBAKE_MARKERS.find((value) => line.includes(value))
      if (marker) {
        issueStore.add(filePath, index + 1, `possible mojibake marker "${marker}"`)
      }
    })
  }
}

function validateScripts(issueStore) {
  const migrateScriptPath = path.join(PROJECT_ROOT, 'scripts', 'migrate-to-topic-shell.mjs')
  const migrateScript = fs.readFileSync(migrateScriptPath, 'utf8')

  if (
    /const\s*\{\s*activeTab\s*,\s*setActiveTab\s*,\s*handleMinimize\s*\}\s*=\s*useTopicTabs/.test(
      migrateScript,
    )
  ) {
    issueStore.add(migrateScriptPath, null, 'stale useTopicTabs handleMinimize destructuring')
  }

  if (migrateScript.includes('onMinimize=')) {
    issueStore.add(migrateScriptPath, null, 'stale TopicPageShell onMinimize prop reference')
  }

  const structureScriptPath = path.join(PROJECT_ROOT, 'scripts', 'generate-dsa-structure.js')
  const structureScript = fs.readFileSync(structureScriptPath, 'utf8')

  if (structureScript.includes('4. Domain-Specific & Advanced')) {
    issueStore.add(structureScriptPath, null, 'stale Advanced Topics taxonomy')
  }

  if (structureScript.includes('5. Specialized Applications')) {
    issueStore.add(structureScriptPath, null, 'stale Applied Domains taxonomy')
  }
}

const issueStore = createIssueStore()
const routeFiles = findFiles(ROUTES_ROOT, (filePath) => path.basename(filePath) === 'index.tsx')

validateRouteClasses(routeFiles, issueStore)
validateMojibake(issueStore)
validateScripts(issueStore)

process.exitCode = issueStore.flush()
