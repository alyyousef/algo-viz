#!/usr/bin/env node
/**
 * cleanup-migrated-pages.mjs
 *
 * Post-migration cleanup for all DSA route pages that have already been migrated
 * to TopicPageShell + useTopicTabs. Fixes three categories of leftover issues:
 *
 *   1. Dead router imports  — useLocation / useNavigate / useSearchParams no longer
 *                              needed (useTopicTabs handles all URL/navigate logic)
 *   2. Dead tab helpers     — module-level `isTabId` / `getTabFromSearch` / `type TabId`
 *                              functions that served the old tab URL pattern
 *   3. Stale win98-* classes — page-specific `win98-*` class names that should have
 *                              been substituted to `bin98-*` during migration but
 *                              weren't matched by the original regex (different prefix
 *                              shapes, or classes in JSX attributes the regex missed)
 *
 * Usage:
 *   node scripts/cleanup-migrated-pages.mjs            # all migrated pages
 *   node scripts/cleanup-migrated-pages.mjs "Barriers" # filter by path segment
 *   node scripts/cleanup-migrated-pages.mjs --dry-run  # preview only, no writes
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROUTES_DIR = path.join(__dirname, '..', 'src', 'features', 'dsa', 'routes', 'DSA')

const cliArgs = process.argv.slice(2)
const dryRun = cliArgs.includes('--dry-run')
const filterArg = cliArgs.find((a) => !a.startsWith('--')) ?? null

function stripImports(content) {
  return content.replace(/^import[^\n]*\n/gm, '')
}

// ─── File discovery ────────────────────────────────────────────────────────────

function findRouteFiles(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...findRouteFiles(full))
    else if (entry.name === 'index.tsx') results.push(full)
  }
  return results
}

// ─── 1. Dead router import cleanup ────────────────────────────────────────────
//
// Remove useLocation / useNavigate / useSearchParams from 'react-router-dom'
// imports when they are no longer referenced in the file body.
// Keep: Link, NavLink, useParams, useMatches, Outlet, etc.

const STALE_ROUTER_HOOKS = new Set(['useLocation', 'useNavigate', 'useSearchParams'])

function cleanRouterImport(content) {
  return content.replace(
    /^(import \{)([^}]+)(\} from 'react-router-dom')/m,
    (_, open, specifiers, close) => {
      const body = stripImports(content)
      const usesLink = /<Link[\s/>]/.test(body)
      const kept = specifiers
        .split(',')
        .map((s) => s.trim())
        .filter((s) => {
          if (!s) return false
          const name = s.replace(/^type\s+/, '')
          if (STALE_ROUTER_HOOKS.has(name)) {
            return new RegExp(`\\b${name}\\b`).test(body)
          }
          if (name === 'Link') return usesLink
          return true
        })
      if (kept.length === 0) return '' // remove entire import
      if (kept.length === specifiers.split(',').filter((s) => s.trim()).length) return _ // unchanged
      return `${open} ${kept.join(', ')} ${close}`
    },
  )
}

function cleanTopicTabsImport(content) {
  return content.replace(
    /^(import \{)([^}]+)(\} from '@\/features\/dsa\/hooks\/useTopicTabs')/m,
    (_, open, specifiers, close) => {
      const body = stripImports(content)
      const kept = specifiers
        .split(',')
        .map((s) => s.trim())
        .filter((s) => {
          if (!s) return false
          const name = s.replace(/^type\s+/, '')
          if (name === 'TopicTab') return /\bTopicTab\b/.test(body)
          return new RegExp(`\\b${name}\\b`).test(body)
        })
      if (kept.length === 0) return ''
      if (kept.length === specifiers.split(',').filter((s) => s.trim()).length) return _
      return `${open} ${kept.join(', ')} ${close}`
    },
  )
}

function cleanReactImport(content) {
  return content.replace(/^(import \{)([^}]+)(\} from 'react')/m, (_, open, specifiers, close) => {
    const body = stripImports(content)
    const kept = specifiers
      .split(',')
      .map((s) => s.trim())
      .filter((s) => {
        if (!s) return false
        const name = s.replace(/^type\s+/, '')
        return new RegExp(`\\b${name}\\b`).test(body)
      })
    if (kept.length === 0) return ''
    if (kept.length === specifiers.split(',').filter((s) => s.trim()).length) return _
    return `${open} ${kept.join(', ')} ${close}`
  })
}

// ─── 2. Dead tab helper functions ─────────────────────────────────────────────
//
// Remove module-level:
//   - `type TabId = '...' | ...`                 (single line)
//   - `function isTabId(...) { ... }`             (multi-line)
//   - `function getTabFromSearch(...) { ... }`    (multi-line)
//   - `const getTab... = (...) => { ... }`        (multi-line arrow)
//
// Only removed when they are NOT referenced anywhere in the JSX/body that matters.
// Since useTopicTabs handles tab resolution, these are always safe to remove from
// migrated pages (the JSX no longer calls them).

function removeDeadTabHelpers(content) {
  // type TabId = '...' | '...' (single line, at module level)
  // Only remove if TabId is referenced NOWHERE else in the file.
  // Migrated pages that keep `tabs: Array<{ id: TabId; ... }>` or
  // `sectionLinks: Record<TabId, ...>` still need this declaration.
  {
    const declMatch = content.match(/^type TabId\s*=[^\n]+\n/m)
    if (declMatch) {
      // Count references outside the declaration line itself
      const withoutDecl =
        content.slice(0, declMatch.index) + content.slice(declMatch.index + declMatch[0].length)
      if (!/\bTabId\b/.test(withoutDecl)) {
        content = withoutDecl
      }
    }
  }

  // Multi-line function/const declarations for tab helpers
  // Strategy: find the declaration line, then skip forward counting braces until balanced.
  content = removeMultilineDeclaration(
    content,
    /^function\s+(?:isTabId|getTabFromSearch|getTab\w*)\s*\(/,
  )
  content = removeMultilineDeclaration(
    content,
    /^const\s+(?:isTabId|getTabFromSearch|getTab\w*)\s*=\s*(?:function|\()/,
  )

  return content
}

function removeUnusedDerivedTabLabel(content) {
  content = removeUnusedConstStatement(content, 'activeTabLabel')
  content = removeUnusedConstStatement(content, 'currentTabLabel')
  return content
}

function removeUnusedTypeAlias(content, name) {
  const pattern = new RegExp(`^type\\s+${name}\\b`, 'm')
  const match = content.match(pattern)
  if (!match) return content

  const block = extractStatementAtLine(content, match.index)
  if (!block) return content

  const withoutBlock = content.slice(0, block.start) + content.slice(block.end)
  return new RegExp(`\\b${name}\\b`).test(withoutBlock) ? content : withoutBlock
}

function removeUnusedConstStatement(content, name) {
  const pattern = new RegExp(`^\\s*const\\s+${name}\\b`, 'm')
  const match = content.match(pattern)
  if (!match) return content

  const block = extractStatementAtLine(content, match.index)
  if (!block) return content

  const withoutBlock = content.slice(0, block.start) + content.slice(block.end)
  return new RegExp(`\\b${name}\\b`).test(withoutBlock) ? content : withoutBlock
}

function extractStatementAtLine(content, startIndex) {
  const lines = content.split('\n')
  let offset = 0
  let startLine = -1

  for (let i = 0; i < lines.length; i++) {
    const lineLength = lines[i].length + 1
    if (offset + lineLength > startIndex) {
      startLine = i
      break
    }
    offset += lineLength
  }

  if (startLine === -1) return null

  const start = offset
  let depth = 0
  let endLine = startLine

  for (let i = startLine; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    for (const ch of line) {
      if (ch === '(' || ch === '{' || ch === '[') depth++
      else if (ch === ')' || ch === '}' || ch === ']') depth--
    }

    const next = lines[i + 1]?.trim() ?? ''
    const endsWithContinuation =
      /(?:=|=>|[?:,+\-*/%(<>&|])$/.test(trimmed) || /\b(?:as|extends)\s*$/.test(trimmed)
    const nextContinues = /^[:?]/.test(next)

    endLine = i
    if (depth <= 0 && !endsWithContinuation && !nextContinues) break
  }

  let end = start
  for (let i = startLine; i <= endLine; i++) {
    end += lines[i].length + 1
  }

  if (lines[endLine + 1]?.trim() === '') {
    end += lines[endLine + 1].length + 1
  }

  return { start, end }
}

/**
 * Remove a multi-line declaration from content.
 * `pattern` matches the FIRST LINE of the declaration (anchored to start of line via /^/).
 */
function removeMultilineDeclaration(content, pattern) {
  const lines = content.split('\n')
  const result = []
  let i = 0
  while (i < lines.length) {
    if (pattern.test(lines[i])) {
      // Count open/close braces to find where this declaration ends
      let depth = 0
      let started = false
      let j = i
      while (j < lines.length) {
        for (const ch of lines[j]) {
          if (ch === '{') {
            depth++
            started = true
          } else if (ch === '}') depth--
        }
        j++
        if (started && depth <= 0) break
      }
      // Skip blank line immediately after the block
      if (j < lines.length && lines[j].trim() === '') j++
      i = j
      continue
    }
    result.push(lines[i])
    i++
  }
  return result.join('\n')
}

// ─── 3. win98-* → bin98-* class substitution ──────────────────────────────────
//
// The migration script only substituted classes matching the pattern:
//   [prefix]-[help-]?(section|heading|...)
// Some pages use `win98-button`, `win98-push`, `win98-step-box`, etc., which
// didn't match. Map them to the closest bin98-* equivalent or Tailwind utility.
//
// Classes that exist in bin98.css: section, heading, subheading, doc-title,
//   codebox, divider, table, mono, content
// Classes with no bin98 equivalent: button, push, button-row, inline-buttons,
//   inline-link, step-box, step-controls, doc-subtitle
//   → These keep their win98-* name. We add the missing ones to bin98.css.

const WIN98_TO_BIN98 = {
  'win98-section': 'bin98-section',
  'win98-heading': 'bin98-heading',
  'win98-subheading': 'bin98-subheading',
  'win98-doc-title': 'bin98-doc-title',
  'win98-codebox': 'bin98-codebox',
  'win98-divider': 'bin98-divider',
  'win98-table': 'bin98-table',
  'win98-mono': 'bin98-mono',
  // Interactive widget classes — will be added to bin98.css
  'win98-button': 'bin98-button',
  'win98-button-row': 'bin98-button-row',
  'win98-push': 'bin98-push',
  'win98-inline-buttons': 'bin98-inline-buttons',
  'win98-inline-link': 'bin98-inline-link',
  'win98-step-box': 'bin98-step-box',
  'win98-step-controls': 'bin98-step-controls',
  'win98-doc-subtitle': 'bin98-doc-subtitle',
}

function substituteWin98Classes(content) {
  for (const [from, to] of Object.entries(WIN98_TO_BIN98)) {
    // Replace in className="..." and className={`...`} contexts
    content = content.replaceAll(from, to)
  }
  return content
}

// ─── Per-file cleanup ──────────────────────────────────────────────────────────

function cleanupFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8')

  // Only process migrated pages
  if (!original.includes('useTopicTabs')) return { status: 'skip', filePath }

  let content = original

  content = removeDeadTabHelpers(content)
  content = removeUnusedDerivedTabLabel(content)
  content = removeUnusedConstStatement(content, 'currentSections')
  content = removeUnusedConstStatement(content, 'tocSections')
  content = removeUnusedConstStatement(content, 'activeSections')
  content = removeUnusedConstStatement(content, 'handleSectionJump')
  content = removeUnusedConstStatement(content, 'contentRef')
  content = removeUnusedTypeAlias(content, 'MinimizedHelpTask')
  content = cleanReactImport(content)
  content = cleanRouterImport(content)
  content = cleanTopicTabsImport(content)
  content = substituteWin98Classes(content)

  // Normalise excessive blank lines left by removals
  content = content.replace(/\n{4,}/g, '\n\n\n')

  if (content === original) return { status: 'skip', filePath }

  if (!dryRun) fs.writeFileSync(filePath, content, 'utf8')
  return { status: 'ok', filePath }
}

// ─── Entry point ───────────────────────────────────────────────────────────────

const allFiles = findRouteFiles(ROUTES_DIR)
const files = filterArg ? allFiles.filter((f) => f.includes(filterArg)) : allFiles

const results = { ok: [], skip: [], error: [] }

for (const file of files) {
  try {
    const result = cleanupFile(file)
    results[result.status].push(result)
  } catch (err) {
    results.error.push({ status: 'error', filePath: file, reason: err.message })
    console.error(`  ✗ ${path.relative(ROUTES_DIR, file)}: ${err.message}`)
  }
}

const label = dryRun ? 'Dry-run cleanup' : 'Cleanup'
console.log(`\n${label} summary:`)
console.log(`  ✓ Updated  : ${results.ok.length}`)
console.log(`  - Skipped  : ${results.skip.length}`)
console.log(`  ✗ Errors   : ${results.error.length}`)

if (results.error.length > 0) {
  console.log('\nFiles needing manual attention:')
  for (const r of results.error) {
    console.log(`  ${path.relative(ROUTES_DIR, r.filePath)} — ${r.reason}`)
  }
}
