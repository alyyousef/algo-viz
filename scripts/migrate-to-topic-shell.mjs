#!/usr/bin/env node
/**
 * migrate-to-topic-shell.mjs
 *
 * Migrates every non-migrated DSA route page from the old "inline-CSS + self-contained
 * Win98 chrome" pattern to the shared TopicPageShell + useTopicTabs pattern.
 *
 * Safe to re-run: pages that already import TopicPageShell or useTopicTabs are skipped.
 *
 * Usage:
 *   node scripts/migrate-to-topic-shell.mjs               # all pages
 *   node scripts/migrate-to-topic-shell.mjs "3. Algorithmic Paradigms"  # one section
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROUTES_DIR = path.join(__dirname, '..', 'src', 'features', 'dsa', 'routes', 'DSA')

const cliArgs = process.argv.slice(2)
const fixupMode = cliArgs.includes('--fixup')
const filterArg = cliArgs.find((a) => !a.startsWith('--')) ?? null

// ─── File discovery ───────────────────────────────────────────────────────────

function findRouteFiles(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...findRouteFiles(full))
    else if (entry.name === 'index.tsx') results.push(full)
  }
  return results
}

function needsMigration(content) {
  if (content.includes('useTopicTabs') || content.includes('TopicPageShell')) return false
  return /const \w+[Ss]tyles\s*=\s*`/.test(content)
}

// ─── CSS blob removal ─────────────────────────────────────────────────────────

function removeCssBlob(content) {
  // Matches: const xyzStyles = `...` (possibly multiline, possibly indented)
  const startRx = /\n\s*const \w+[Ss]tyles\s*=\s*`/
  const m = content.match(startRx)
  if (!m) return content

  const blobStart = m.index
  let pos = blobStart + m[0].length

  // Scan for the matching closing backtick
  while (pos < content.length) {
    if (content[pos] === '\\') {
      pos += 2
      continue
    }
    if (content[pos] === '`') {
      pos++ // move past closing backtick
      // consume rest of that line
      while (pos < content.length && content[pos] !== '\n') pos++
      if (pos < content.length) pos++ // consume newline
      break
    }
    pos++
  }

  // Preserve the leading \n so surrounding declarations stay on separate lines
  return content.slice(0, blobStart) + '\n' + content.slice(pos)
}

// ─── Remove the <style> injection ─────────────────────────────────────────────

function removeStyleTag(content) {
  return content.replace(/\n?\s*<style>\{[^}]+\}<\/style>/g, '')
}

// ─── Remove boilerplate constants / functions ─────────────────────────────────

function removeBoilerplate(content) {
  // Remove: const MINIMIZED_HELP_TASKS_KEY = '...'
  content = content.replace(/\nconst MINIMIZED_HELP_TASKS_KEY\s*=\s*'[^']*'\s*\n/, '\n')

  // NOTE: We intentionally do NOT strip `type TabId` here.
  // It is still referenced by `tabs`, `sectionLinks`, and `isTabId` at module level.

  // NOTE: We intentionally do NOT strip `isTabId` or `getTabFromSearch` here.
  // Some pages have module-level tab-URL helper functions that call `isTabId`.
  // They become dead code after migration, but stripping only `isTabId` would leave
  // orphan references in those helpers.  Dead code is harmless; broken references are not.

  return content
}

// ─── Update import statements ─────────────────────────────────────────────────

// Hooks that were ONLY used for tab/minimize boilerplate and are never needed
// after migration (useTopicTabs handles everything they did).
const ALWAYS_STALE_HOOKS = new Set(['useEffect'])
// Hooks that may be used in custom interactive state — keep only if still present
// in the preserved body or children text.
const CONDITIONALLY_STALE_HOOKS = new Set(['useState', 'useMemo', 'useReducer', 'useCallback'])

function filterReactSpecifiers(specifiers, usesFragment, childrenText) {
  return specifiers
    .split(',')
    .map((s) => s.trim())
    .filter((s) => {
      if (!s) return false
      if (s === 'Fragment') return usesFragment
      if (ALWAYS_STALE_HOOKS.has(s)) return false
      // Conditionally-stale hooks: keep only if they still appear in the output
      if (CONDITIONALLY_STALE_HOOKS.has(s)) return childrenText.includes(s)
      // Keep useRef, useCallback, useContext, etc. only if they appear in content
      return childrenText.includes(s)
    })
}

function replaceReactImport(specifiers, usesFragment, childrenText) {
  const keep = filterReactSpecifiers(specifiers, usesFragment, childrenText)
  if (keep.length === 0) return null
  return `import { ${keep.join(', ')} } from 'react'`
}

function updateImports(content, childrenText) {
  const usesFragment = /\bFragment\b/.test(childrenText)
  const usesLink = /<Link[\s/>]/.test(childrenText)

  // Handle react import at START of file (no leading newline)
  content = content.replace(/^import \{([^}]+)\} from 'react'\n/, (_, specifiers) => {
    const line = replaceReactImport(specifiers, usesFragment, childrenText)
    return line ? line + '\n' : ''
  })

  // Handle react import MID-file (has leading newline)
  content = content.replace(/\nimport \{([^}]+)\} from 'react'\n/g, (_, specifiers) => {
    const line = replaceReactImport(specifiers, usesFragment, childrenText)
    return line ? `\n${line}\n` : '\n'
  })

  // Update react-router-dom: keep Link if used, drop all router hooks
  const replaceRouterImport = (_, specifiers) => {
    const keep = specifiers
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s === 'Link' && usesLink)
    return keep.length ? `\nimport { ${keep.join(', ')} } from 'react-router-dom'\n` : '\n'
  }
  content = content.replace(/\nimport \{([^}]+)\} from 'react-router-dom'\n/g, replaceRouterImport)

  // Add new imports right before `import type { JSX }`
  const shellImport = `import TopicPageShell from '@/features/dsa/components/TopicPageShell'`
  const hooksImport = `import { type TopicTab, useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'`

  if (content.includes('import type { JSX }')) {
    content = content.replace(
      /\nimport type \{ JSX \}/,
      `\n${shellImport}\n${hooksImport}\n\nimport type { JSX }`,
    )
  } else {
    // Fallback: insert before the first blank line
    const firstBlank = content.indexOf('\n\n')
    if (firstBlank !== -1) {
      content =
        content.slice(0, firstBlank) +
        `\n${shellImport}\n${hooksImport}` +
        content.slice(firstBlank)
    }
  }

  // Collapse 3+ consecutive blank lines left behind after removals
  content = content.replace(/\n{4,}/g, '\n\n\n')

  return content
}

// ─── Import fixup for already-migrated files ──────────────────────────────────
// Strips stale react/router imports that were missed on the initial run.

function fixupImports(content) {
  // Remove useEffect / useState / useMemo from react import (start or mid-file)
  content = content.replace(/^import \{([^}]+)\} from 'react'\n/, (_, specifiers) => {
    const keep = specifiers
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s && !ALWAYS_STALE_HOOKS.has(s))
    return keep.length ? `import { ${keep.join(', ')} } from 'react'\n` : ''
  })
  content = content.replace(/\nimport \{([^}]+)\} from 'react'\n/g, (_, specifiers) => {
    const keep = specifiers
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s && !ALWAYS_STALE_HOOKS.has(s))
    return keep.length ? `\nimport { ${keep.join(', ')} } from 'react'\n` : '\n'
  })
  // Remove stale router-hooks import lines if they still exist
  content = content.replace(/\nimport \{([^}]+)\} from 'react-router-dom'\n/g, (_, specifiers) => {
    const keep = specifiers
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s === 'Link')
    return keep.length ? `\nimport { ${keep.join(', ')} } from 'react-router-dom'\n` : '\n'
  })
  content = content.replace(/\n{4,}/g, '\n\n\n')
  return content
}

function runFixup(filePath) {
  const original = fs.readFileSync(filePath, 'utf8')
  if (!original.includes('useTopicTabs')) return { status: 'skip', filePath }
  const fixed = fixupImports(original)
  if (fixed === original) return { status: 'skip', filePath }
  fs.writeFileSync(filePath, fixed, 'utf8')
  return { status: 'ok', filePath }
}

// ─── Extract page title ────────────────────────────────────────────────────────

function extractTitle(content, filePath) {
  // 1. From h1 with doc-title / title class in the JSX
  const h1 = content.match(/<h1[^>]*className="[^"]*(?:doc-title|title)[^"]*"[^>]*>([^<{]+)<\/h1>/)
  if (h1) return h1[1].trim()

  // 2. From span with title class in the titlebar
  const span = content.match(/<span[^>]*className="[^"]*title[^"]*"[^>]*>([^<{]+)<\/span>/)
  if (span) return span[1].trim()

  // 3. From document.title assignment in useEffect
  const docTitle = content.match(/document\.title\s*=\s*`([^`$\n]+)/)
  if (docTitle) return docTitle[1].replace(/\s*\(.*/, '').trim()

  // 4. Derive from function name: export default function XxxYyyPage
  const fnName = content.match(/export default function (\w+)(?:Page)?\(\)/)
  if (fnName) {
    return fnName[1]
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .replace(/\s+/g, ' ')
  }

  // 5. Derive from folder name
  return path.basename(path.dirname(filePath)).replace(/^\d+\.\s*/, '')
}

// ─── Extract component function name ──────────────────────────────────────────

function extractFunctionName(content) {
  const m = content.match(/export default function (\w+)\(\)/)
  return m?.[1] ?? 'Page'
}

// ─── Extract default tab ───────────────────────────────────────────────────────

function extractDefaultTab(content) {
  // 1. From: isTabId(x) ? x : 'big-picture'
  const guard = content.match(/isTabId\([^)]+\)\s*\?\s*\w+\s*:\s*'([^']+)'/)
  if (guard) return guard[1]

  // 2. First tab id in the tabs array — this is the canonical source of truth
  const firstTab = content.match(/const tabs[^=]*=\s*\[[\s\S]*?id:\s*'([^']+)'/)
  if (firstTab) return firstTab[1]

  // 3. From: ?? 'big-picture' — last resort, only match kebab-case tab IDs
  //    (NOT display labels like 'The Big Picture', and NOT state initializer fallbacks like 'decompose')
  //    Restrict to lines that mention activeTab or TabId to avoid false positives.
  const lines = content.split('\n')
  for (const line of lines) {
    if (/activeTab|TabId/.test(line)) {
      const m = line.match(/\?\?\s*'([a-z][a-z0-9-]*)'\s*(?:as TabId)?/)
      if (m) return m[1]
    }
  }

  return 'big-picture'
}

// ─── Find the sectionLinks variable name used in the TOC ──────────────────────

function extractSectionLinksVar(content) {
  // Pattern in JSX: {varName[activeTab].map(
  const mapMatch = content.match(/\{(\w+)\[activeTab\]\.map\(/)
  if (mapMatch) return mapMatch[1]

  // Pattern: sectionLinks[activeTab] or tocLinks[activeTab]
  const indexMatch = content.match(/\b(\w*(?:section|toc|link)\w*)\[activeTab\]/i)
  if (indexMatch) return indexMatch[1]

  // No TOC variable found — this page uses an inline TOC (or none at all)
  return null
}

// ─── Extract the inner content children (what goes inside TopicPageShell) ─────

function extractContentChildren(content) {
  const lines = content.split('\n')

  // Find the return statement start line
  let returnLine = -1
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*return\s*\(/.test(lines[i])) {
      returnLine = i
      break
    }
  }
  if (returnLine === -1) return null

  // Find the content element: <main or <div with a class ending in "-content"
  // We want the SHALLOWEST (least indented) such element after the return.
  // If multiple matches, take the one with minimum indent.
  let contentOpenLine = -1
  let minIndent = Infinity

  for (let i = returnLine; i < lines.length; i++) {
    const line = lines[i]
    if (
      /className="[^"]*-content"/.test(line) &&
      (/<main\b/.test(line) || /<div\b/.test(line) || /<article\b/.test(line))
    ) {
      const indent = line.match(/^(\s*)/)?.[1].length ?? 0
      if (indent < minIndent) {
        minIndent = indent
        contentOpenLine = i
      }
    }
  }

  if (contentOpenLine === -1) return null

  // Children start on the line AFTER the content element's opening tag.
  // The opening tag is guaranteed to close with > on the same line.
  const childrenStart = contentOpenLine + 1

  // Children END just before the closing tag of the content element.
  // The closing tag will be at the SAME indentation level as the opening tag.
  const contentIndent = lines[contentOpenLine].match(/^(\s*)/)?.[1].length ?? 0

  let childrenEnd = -1
  for (let i = childrenStart; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    if (!trimmed) continue
    const lineIndent = lines[i].match(/^(\s*)/)?.[1].length ?? 0
    if (lineIndent === contentIndent && /^<\/(main|div|article)>/.test(trimmed)) {
      childrenEnd = i
      break
    }
  }

  if (childrenEnd === -1) return null

  return lines.slice(childrenStart, childrenEnd).join('\n')
}

// ─── Apply class name substitutions ───────────────────────────────────────────

function applyClassSubstitutions(content) {
  // Replace page-specific CSS class names with the shared bin98-* equivalents.
  // Examples:
  //   "dd-help-section"          → "bin98-section"
  //   "win98-help-heading"       → "bin98-heading"
  //   "brute-force-help-codebox" → "bin98-codebox"
  //   "sat-doc-title"            → "bin98-doc-title"
  return content.replace(
    /className="[a-z0-9-]+-(?:help-)?(section|heading|subheading|doc-title|codebox|divider|table|mono)"/g,
    (_, suffix) => `className="bin98-${suffix}"`,
  )
}

// ─── Extract the "before component" block ─────────────────────────────────────

function extractPreComponent(content) {
  // Use lastIndexOf so code examples embedded in template-literal strings
  // (e.g. `export default function Counter()`) don't fool us into splitting mid-literal.
  const fnIdx = content.lastIndexOf('\nexport default function ')
  if (fnIdx === -1) return content
  return content.slice(0, fnIdx)
}

// ─── Extract the component body (hooks/state/derived values before return) ────
//
// Returns { bodyPreamble: string, extraPre: string }
//   bodyPreamble — custom state hooks / event handlers to emit inside the new component
//   extraPre     — tabs / sectionLinks / TabId declarations found inside the old component
//                  that must be hoisted out to the module-level `pre` block (rare pattern)
//
// Boilerplate patterns (tab management, minimize, router hooks) are stripped.
// Custom state (selectedId, stepIndex, etc.) is preserved.

function extractComponentBodyPreamble(content) {
  const fnIdx = content.lastIndexOf('\nexport default function ')
  if (fnIdx === -1) return { bodyPreamble: '', extraPre: '' }

  const braceIdx = content.indexOf('{', fnIdx)
  if (braceIdx === -1) return { bodyPreamble: '', extraPre: '' }

  const bodySlice = content.slice(braceIdx + 1)
  const returnMatch = bodySlice.match(/\n\s*return\s*\(/)
  if (!returnMatch) return { bodyPreamble: '', extraPre: '' }

  const rawBody = bodySlice.slice(0, returnMatch.index)
  const cleaned = removeBodyBoilerplate(rawBody)

  // Separate out any tabs / sectionLinks / TabId declarations that ended up in
  // the body (they should be at module level so useTopicTabs({ tabs }) works).
  const extraPreLines = []
  const bodyLines = []
  let inTabsBlock = false
  let blockDepth = 0

  for (const line of cleaned.split('\n')) {
    const t = line.trim()
    if (blockDepth > 0) {
      // Inside a hoisted block — still part of extraPre
      for (const ch of line) {
        if (ch === '{' || ch === '[' || ch === '(') blockDepth++
        else if (ch === '}' || ch === ']' || ch === ')') blockDepth--
      }
      extraPreLines.push(line)
      if (blockDepth <= 0) {
        blockDepth = 0
        inTabsBlock = false
      }
      continue
    }
    if (
      /^const\s+tabs\s*[=:]/.test(t) ||
      /^const\s+sectionLinks\s*[=:]/.test(t) ||
      /^type\s+Tab\b/.test(t) ||
      /^type\s+TabId\b/.test(t)
    ) {
      inTabsBlock = true
      extraPreLines.push(line)
      for (const ch of line) {
        if (ch === '{' || ch === '[' || ch === '(') blockDepth++
        else if (ch === '}' || ch === ']' || ch === ')') blockDepth--
      }
      if (blockDepth <= 0) {
        blockDepth = 0
        inTabsBlock = false
      }
      continue
    }
    bodyLines.push(line)
  }

  return {
    bodyPreamble: bodyLines.join('\n').trim(),
    extraPre: extraPreLines.join('\n').trim(),
  }
}

/**
 * Returns true if a trimmed line begins a tab-management / minimize boilerplate
 * statement that should be dropped from the new component body.
 * useTopicTabs replaces ALL of these.
 */
function isBoilerplateLine(t) {
  return (
    // --- activeTab declarations (all forms) ---
    // Destructured: const [activeTab, setActiveTab] = useState(...)
    /^const\s+\[activeTab[,\s\]]/.test(t) ||
    // Direct: const activeTab: TabId = ... OR const activeTab =
    /^const\s+activeTab[\s:=]/.test(t) ||
    // --- derived tab variables ---
    // const currentTab / tabParam / requestedTab / tab = searchParams.get(...)
    /^const\s+(?:currentTab|tabParam|requestedTab)\s*=/.test(t) ||
    // Generic: any `const \w+ = searchParams.get(` line
    /^const\s+\w+\s*=\s*(?:searchParams|urlParams)\s*\.get\s*\(/.test(t) ||
    // --- tab change handler (any naming variant) ---
    /^const\s+handle(?:Tab|TabChange)\b/.test(t) ||
    /^const\s+on(?:Tab|TabChange)\b/.test(t) ||
    // NOTE: activeTabLabel / currentTabLabel are intentionally NOT stripped here.
    // Some pages reference them in JSX content (e.g. as a heading), so keeping
    // them is safe.  They compute `tabs.find(...)?.label` which is correct post-migration.

    // --- minimize handler ---
    /^const\s+handleMinimize\b/.test(t) ||
    /^const\s+MINIMIZED_HELP_TASKS_KEY\b/.test(t) ||
    // --- useEffect hooks (all of them are tab-sync / document.title in these pages) ---
    /^useEffect\s*\(/.test(t) ||
    // --- router hooks used only for tab URL sync and minimize navigation ---
    /^const\s+\w+\s*=\s*use(?:Location|Navigate)\s*\(\s*\)/.test(t) ||
    /^const\s+\[.*?\]\s*=\s*useSearchParams\s*\(/.test(t) ||
    /^const\s+\w+\s*=\s*useSearchParams\s*\(/.test(t) ||
    // --- document.title direct assignment (covered by useTopicTabs) ---
    /^document\.title\s*=/.test(t) ||
    // --- isTabId guard (used only for tab parsing, replaced by useTopicTabs) ---
    // Note: isTabId declared inside component is stripped; module-level isTabId is kept
    // (some pages have helper functions that call it).
    /^const\s+isTabId\b/.test(t) ||
    /^function\s+isTabId\b/.test(t)

    // NOTE: `type TabId` is intentionally NOT stripped here.
    // For pages that declare it inside the component, it needs to be hoisted to module level.
    // For pages that declare it outside the component, `removeBoilerplate` on `pre` handles it.
  )
}

/**
 * Walk the raw body text (between `{` and `return (`) and remove every top-level
 * statement that matches `isBoilerplateLine`.  Multi-line statements are skipped
 * by tracking the net depth of `(`, `)`, `{`, `}` characters.
 *
 * This does NOT try to parse string literals — it assumes that any `(`, `)`,
 * `{`, `}` inside template-literal `${...}` expressions are balanced (true for
 * all tab-management boilerplate in this codebase).
 */
function removeBodyBoilerplate(body) {
  const lines = body.split('\n')
  const result = []
  let depth = 0 // net paren/brace depth while skipping a block

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const t = line.trim()

    if (depth > 0) {
      // We're inside a boilerplate block — count depth and keep skipping
      for (const ch of line) {
        if (ch === '(' || ch === '{') depth++
        else if (ch === ')' || ch === '}') {
          depth--
          if (depth < 0) depth = 0
        }
      }
      continue
    }

    // depth === 0: evaluate this as the start of a new statement
    if (t && isBoilerplateLine(t)) {
      // Start a block-skip for this statement
      for (const ch of line) {
        if (ch === '(' || ch === '{') depth++
        else if (ch === ')' || ch === '}') {
          depth--
          if (depth < 0) depth = 0
        }
      }
      // If depth is still 0 after the line, it was single-line — already consumed
      continue
    }

    result.push(line)
  }

  return result.join('\n')
}

// ─── Build the migrated component function ────────────────────────────────────

function buildNewComponent(
  funcName,
  title,
  defaultTab,
  sectionLinksVar,
  rawChildren,
  bodyPreamble,
) {
  const children = applyClassSubstitutions(removeStyleTag(rawChildren))
  const safeTitle = title.replace(/'/g, "\\'")

  const extraBody = bodyPreamble ? `\n${bodyPreamble}\n` : ''
  // When no named sectionLinks variable exists, fall back to empty array
  const tocLinksExpr = sectionLinksVar ? `${sectionLinksVar}[activeTab]` : '[]'

  return `export default function ${funcName}(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: '${safeTitle}',
    defaultTab: '${defaultTab}',
  })
${extraBody}
  return (
    <TopicPageShell
      title="${safeTitle}"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={${tocLinksExpr}}
      onMinimize={handleMinimize}
    >
${children}
    </TopicPageShell>
  )
}
`
}

// ─── Full file migration ───────────────────────────────────────────────────────

function migrateFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8')

  if (!needsMigration(original)) {
    return { status: 'skip', filePath }
  }

  // --- Extract information from the original before modifying ---
  const title = extractTitle(original, filePath)
  const funcName = extractFunctionName(original)
  const defaultTab = extractDefaultTab(original)
  const sectionLinksVar = extractSectionLinksVar(original)
  const children = extractContentChildren(original)

  if (!children) {
    return { status: 'error', reason: 'could not extract content children', filePath }
  }

  let { bodyPreamble, extraPre } = extractComponentBodyPreamble(original)
  // Some pages embed the CSS blob inside the component body — strip it from the preamble too
  bodyPreamble = removeCssBlob('\n' + bodyPreamble).trim()

  // --- Build the pre-component section (data arrays, tabs, sectionLinks, etc.) ---
  let pre = extractPreComponent(original)
  // removeBoilerplate must run BEFORE removeCssBlob: the CSS blob `\nconst styles = \``
  // consumes the leading \n that removeBoilerplate's regex depends on to find
  // MINIMIZED_HELP_TASKS_KEY. Running boilerplate removal first avoids that collision.
  pre = removeBoilerplate(pre)
  pre = removeCssBlob(pre)
  pre = removeStyleTag(pre)
  pre = updateImports(pre, children + '\n' + bodyPreamble)

  // If the original had tabs / sectionLinks inside the component body, hoist them out
  if (extraPre) {
    pre = pre.trimEnd() + '\n\n' + extraPre
  }

  // Normalise excessive blank lines
  pre = pre.replace(/\n{4,}/g, '\n\n\n').trimEnd()

  // --- Build the new component ---
  const newComponent = buildNewComponent(
    funcName,
    title,
    defaultTab,
    sectionLinksVar,
    children,
    bodyPreamble,
  )

  const newContent = pre + '\n\n' + newComponent

  fs.writeFileSync(filePath, newContent, 'utf8')
  return { status: 'ok', filePath }
}

// ─── Entry point ──────────────────────────────────────────────────────────────

const allFiles = findRouteFiles(ROUTES_DIR)
const files = filterArg ? allFiles.filter((f) => f.includes(filterArg)) : allFiles

const results = { ok: [], skip: [], error: [] }

for (const file of files) {
  const result = fixupMode ? runFixup(file) : migrateFile(file)
  results[result.status].push(result)
  if (result.status === 'error') {
    console.error(`  ✗ ${path.relative(ROUTES_DIR, file)}: ${result.reason}`)
  }
}

const rel = (f) => path.relative(ROUTES_DIR, f.filePath)
const label = fixupMode ? 'Import fixup' : 'Migration'

console.log(`\n${label} summary:`)
console.log(`  ✓ Updated  : ${results.ok.length}`)
console.log(`  - Skipped  : ${results.skip.length}`)
console.log(`  ✗ Errors   : ${results.error.length}`)

if (results.error.length > 0) {
  console.log('\nFiles needing manual attention:')
  for (const r of results.error) {
    console.log(`  ${rel(r)} — ${r.reason}`)
  }
}
