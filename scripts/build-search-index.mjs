import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'public', 'search-index.json')

const baseSlugify = (segment) =>
  segment
    .trim()
    .toLowerCase()
    .replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section'

const slugifySegment = (segment) => baseSlugify(segment.replace(/&/g, ' and '))

const cleanSegmentLabel = (segment) => segment.replace(/^\d+\.\s*/, '').trim()

const normalizeText = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const BODY_LIMIT = 4000

const extractSearchBody = (source) =>
  source
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/^import\s[\s\S]*?from\s+['"][^'"]+['"];?\s*/gm, '')
    .replace(/^export\s.+$/gm, '')
    .replace(/```[\w+-]*\n([\s\S]*?)```/g, ' $1 ')
    .replace(/<\/?[A-Za-z][^>]*>/g, ' ')
    .replace(/[#>*_`[\]()|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, BODY_LIMIT)

async function walk(dir) {
  let results = []
  const list = await fs.readdir(dir)
  for (const file of list) {
    const filePath = path.join(dir, file)
    const stat = await fs.stat(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(await walk(filePath))
    } else {
      if (filePath.endsWith('index.tsx') || filePath.endsWith('index.mdx')) {
        results.push(filePath)
      }
    }
  }
  return results
}

async function buildIndex() {
  const files = await walk(ROUTE_DIR)
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

  const entries = await Promise.all(
    files.map(async (filePath) => {
      const relativePath = path.relative(ROUTE_DIR, filePath).replace(/\\/g, '/')
      const segments = relativePath.replace(/\/index\.(tsx|mdx)$/, '').split('/')
      if (segments.length === 1 && segments[0] === '') segments.pop()

      const source = await fs.readFile(filePath, 'utf8')
      const body = extractSearchBody(source)
      const routePath = `/kb/${segments.map(slugifySegment).join('/')}`
      const labels = segments.map(cleanSegmentLabel)
      const title = labels[labels.length - 1] ?? routePath
      const breadcrumb = labels.slice(0, -1).join(' / ')
      const routeLabel = routePath.replace(/^\/kb\//, 'kb/')
      const matchText = normalizeText(`${labels.join(' ')} ${routePath} ${body}`)
      const importPath = `./routes/KB/${relativePath}`

      return {
        id: importPath,
        title,
        breadcrumb,
        route: routePath,
        routeLabel,
        matchText,
        body,
      }
    }),
  )

  entries.sort((left, right) => {
    const breadcrumbComparison = collator.compare(left.breadcrumb, right.breadcrumb)
    if (breadcrumbComparison !== 0) {
      return breadcrumbComparison
    }
    return collator.compare(left.title, right.title)
  })

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true })
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(entries), 'utf-8')
  console.log(`Generated search index with ${entries.length} entries.`)
}

buildIndex().catch((err) => {
  console.error('Failed to build search index:', err)
  process.exit(1)
})
