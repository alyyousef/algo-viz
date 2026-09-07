import fs from 'fs/promises'
import path from 'path'
import { compilerPagesA } from './comp44-pages-compilers-a.mjs'
import { compilerPagesB } from './comp44-pages-compilers-b.mjs'
import { theoryPages } from './comp44-pages-theory.mjs'

const ROOT = path.resolve(
  'src/features/kb/routes/KB/44. Compilers, Interpreters & Theory of Computation',
)
const files = [...compilerPagesA, ...compilerPagesB, ...theoryPages].map((f) => f.rel)

const needed = [
  'export default function Layout',
  '## 1. Deep Dive and Mechanics',
  '## 2. Mathematical / Theoretical Foundation',
  '## 3. Real-World Implementation',
  '## 4. Visualizations',
  '## 5. Interview Prep',
  '## 6. Production Use Cases',
  'mermaid',
  '<Callout',
  '<ComparisonTable',
]

let bad = 0
for (const rel of files) {
  const p = path.join(ROOT, rel)
  const t = await fs.readFile(p, 'utf8')
  const misses = needed.filter((s) => !t.includes(s))
  if (t.includes('TICK3') || t.includes('TICK1')) misses.push('leftover TICK')
  const icons = [...t.matchAll(/icon="([^"]+)"/g)].map((m) => m[1])
  const badIcon = icons.filter((i) => !['info', 'warning', 'error', 'tip'].includes(i))
  if (badIcon.length) misses.push('bad icon ' + badIcon.join(','))
  let body = t.replace(/```[\s\S]*?```/g, '')
  const lines = body.split('\n').filter((l) => {
    const s = l.trim()
    if (s.startsWith('import ') || s.startsWith('export ') || s.startsWith('return')) return false
    if (s.startsWith('<') || s.startsWith('}') || s.includes('{children}')) return false
    if (s.includes('headers={') || s.includes('rows={')) return false
    if (s.startsWith('[') || s === '/>' || s === '{' || s === ']}') return false
    return true
  })
  const braceLines = lines.filter((l) => l.includes('{'))
  if (braceLines.length) {
    misses.push(
      'brace-prose: ' +
        braceLines
          .slice(0, 3)
          .map((x) => x.trim())
          .join(' | '),
    )
  }
  if (misses.length) {
    bad += 1
    console.log('FAIL', rel)
    for (const m of misses) console.log('  ', m)
  }
}
console.log(bad === 0 ? 'ALL OK ' + files.length : 'FAILED ' + bad)
