import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const KB_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')
const BACKUP_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', '.rich_backup')

async function backupRichFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await backupRichFiles(fullPath)
    } else if (entry.isFile() && fullPath.endsWith('.mdx')) {
      const content = await fs.readFile(fullPath, 'utf-8')
      if (
        content.includes('TechnologyTemplate') ||
        content.includes('Callout') ||
        content.includes('ComparisonTable') ||
        content.includes('Mermaid')
      ) {
        // It's a rich file, copy it to backup dir
        const relativePath = path.relative(KB_DIR, fullPath)
        const backupPath = path.join(BACKUP_DIR, relativePath)
        await fs.mkdir(path.dirname(backupPath), { recursive: true })
        await fs.copyFile(fullPath, backupPath)
        console.log(`Backed up: ${relativePath}`)
      }
    }
  }
}

async function run() {
  await fs.mkdir(BACKUP_DIR, { recursive: true })
  console.log('Starting backup of rich files...')
  await backupRichFiles(KB_DIR)
  console.log('Backup complete!')
}

run().catch(console.error)
