import fs from 'fs/promises'
import path from 'path'
import { compilerPagesA } from './comp44-pages-compilers-a.mjs'
import { compilerPagesB } from './comp44-pages-compilers-b.mjs'
import { theoryPages } from './comp44-pages-theory.mjs'

const ROOT = path.resolve(
  'src/features/kb/routes/KB/44. Compilers, Interpreters & Theory of Computation',
)

function ticks(s) {
  return s.replaceAll('TICK3', '```').replaceAll('TICK1', '`')
}

function page(title, description, body) {
  return ticks(
    [
      '---',
      `title: "${title.replaceAll('"', '\\"')}"`,
      `description: "${description}"`,
      '---',
      "import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'",
      "import { Callout } from '@/features/kb/components/mdx/Callout'",
      "import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'",
      '',
      'export default function Layout({ children }) {',
      '  return (',
      `    <ConceptTemplate title="${title}">`,
      '      {children}',
      '    </ConceptTemplate>',
      '  )',
      '}',
      '',
      body.trim(),
      '',
    ].join('\n'),
  )
}

const all = [...compilerPagesA, ...compilerPagesB, ...theoryPages]

for (const f of all) {
  const dest = path.join(ROOT, f.rel)
  await fs.mkdir(path.dirname(dest), { recursive: true })
  await fs.writeFile(dest, page(f.title, f.description, f.body), 'utf8')
}

const written = all.map(
  (f) => `src/features/kb/routes/KB/44. Compilers, Interpreters & Theory of Computation/${f.rel}`,
)
for (const p of written) console.log(p)
console.log('wrote', written.length)
