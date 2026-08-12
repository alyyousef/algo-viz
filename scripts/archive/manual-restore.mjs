import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const BACKUP_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', '.rich_backup')
const KB_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const manualMappings = {
  '8. Artificial Intelligence & ML/Matplotlib/index.mdx':
    '23. Data Science & Analytics/Matplotlib/index.mdx',
  '8. Artificial Intelligence & ML/NumPy/index.mdx': '23. Data Science & Analytics/NumPy/index.mdx',
  '8. Artificial Intelligence & ML/Pandas/index.mdx':
    '23. Data Science & Analytics/Pandas/index.mdx',
  '8. Artificial Intelligence & ML/PyTorch/index.mdx':
    '26. Deep Learning/26.1 Frameworks/PyTorch/index.mdx',
  '8. Artificial Intelligence & ML/TensorFlow/index.mdx':
    '26. Deep Learning/26.1 Frameworks/TensorFlow/index.mdx',
  '8. Artificial Intelligence & ML/Transformers/index.mdx':
    '27. Natural Language Processing/Transformers/index.mdx',
  '3. Mobile Development/iOS/index.mdx': '20. Mobile Development/iOS/index.mdx',
  '5. Databases & Storage/SQL/index.mdx': '21. Databases — Fundamentals/SQL/index.mdx',
  '6. Cloud Computing/AWS/index.mdx':
    '35. Cloud Computing — Fundamentals/35.1 Amazon Web Services/Amazon Web Services/index.mdx',
  '6. Cloud Computing/Azure/index.mdx':
    '35. Cloud Computing — Fundamentals/35.2 Microsoft Azure/Microsoft Azure/index.mdx',
  '6. Cloud Computing/GCP/index.mdx':
    '35. Cloud Computing — Fundamentals/35.3 Google Cloud Platform/Google Cloud Platform/index.mdx',
  '6. Cloud Computing/OCI/index.mdx':
    '35. Cloud Computing — Fundamentals/35.4 Oracle Cloud Infrastructure/Oracle Cloud Infrastructure/index.mdx',
}

async function restoreManual() {
  for (const [backupPath, targetPath] of Object.entries(manualMappings)) {
    const src = path.join(BACKUP_DIR, backupPath)
    const dest = path.join(KB_DIR, targetPath)

    try {
      await fs.access(src)
      await fs.mkdir(path.dirname(dest), { recursive: true })
      await fs.copyFile(src, dest)
      console.log(`Restored ${path.basename(backupPath)} to ${targetPath}`)
    } catch (err) {
      console.error(`Failed to restore ${backupPath}: ${err.message}`)
    }
  }

  // Now delete the entire backup directory
  console.log('Deleting .rich_backup directory...')
  await fs.rm(BACKUP_DIR, { recursive: true, force: true })
  console.log('Cleanup complete!')
}

restoreManual().catch(console.error)
