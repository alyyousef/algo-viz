import fs from 'fs/promises'
import path from 'path'

const KB_DIR = path.resolve('src/features/kb/routes/KB')
const PROGRESS_FILE = path.resolve('scripts/deep-dives/progress.json')

async function findIndexFiles(dir) {
  let results = []
  const list = await fs.readdir(dir, { withFileTypes: true })
  for (const file of list) {
    const fullPath = path.join(dir, file.name)
    if (file.isDirectory()) {
      results = results.concat(await findIndexFiles(fullPath))
    } else if (file.name === 'index.mdx') {
      results.push(fullPath)
    }
  }
  return results
}

async function main() {
  await fs.mkdir(path.dirname(PROGRESS_FILE), { recursive: true })

  let progress = { completed: [], pending: [] }
  try {
    const data = await fs.readFile(PROGRESS_FILE, 'utf8')
    progress = JSON.parse(data)
    console.log('Progress file already exists.')
    return
  } catch (err) {
    // File doesn't exist, create it
  }

  const allFiles = await findIndexFiles(KB_DIR)

  // Convert absolute paths to relative paths from repo root for cleaner JSON
  const root = path.resolve('.')
  const relativeFiles = allFiles.map((f) => path.relative(root, f).replace(/\\/g, '/'))

  // Sort them alphabetically to ensure deterministic order
  relativeFiles.sort()

  progress.pending = relativeFiles

  await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf8')
  console.log(`Initialized progress.json with ${progress.pending.length} pending files.`)
}

main().catch(console.error)
