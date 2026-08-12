import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const KB_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')
const BACKUP_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', '.rich_backup')

async function getAllNewFolders(dir) {
  let folders = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(dir, entry.name)
      folders.push({ name: entry.name, fullPath })
      const subFolders = await getAllNewFolders(fullPath)
      folders = folders.concat(subFolders)
    }
  }
  return folders
}

async function restoreRichFiles(dir, allNewFolders) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await restoreRichFiles(fullPath, allNewFolders)
    } else if (entry.isFile() && fullPath.endsWith('.mdx')) {
      // The parent folder name of the backed up file is the topic
      const topicName = path.basename(path.dirname(fullPath))

      // Find matching folder in new KB dir
      const matches = allNewFolders.filter((f) => f.name === topicName)

      if (matches.length === 1) {
        // Perfect match
        const destPath = path.join(matches[0].fullPath, 'index.mdx')
        await fs.copyFile(fullPath, destPath)
        console.log(`Restored: ${topicName} -> ${path.relative(KB_DIR, matches[0].fullPath)}`)
      } else if (matches.length > 1) {
        console.warn(`WARN: Multiple matches for ${topicName}, skipping auto-restore.`)
      } else {
        console.warn(`WARN: No match found for ${topicName} in new taxonomy.`)
      }
    }
  }
}

async function run() {
  console.log('Building index of new taxonomy folders...')
  const allNewFolders = await getAllNewFolders(KB_DIR)

  console.log('Restoring rich files...')
  await restoreRichFiles(BACKUP_DIR, allNewFolders)
  console.log('Restore complete!')
}

run().catch(console.error)
