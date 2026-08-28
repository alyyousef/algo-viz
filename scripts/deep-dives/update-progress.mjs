import fs from 'fs/promises'
import path from 'path'

const files = [
  'src/features/kb/routes/KB/12. Linux & Shell Administration/sudo/index.mdx',
  'src/features/kb/routes/KB/12. Linux & Shell Administration/syslog/index.mdx',
  'src/features/kb/routes/KB/12. Linux & Shell Administration/system monitoring/index.mdx',
  'src/features/kb/routes/KB/12. Linux & Shell Administration/systemctl/index.mdx',
]

async function run() {
  const progressPath = path.resolve('scripts/deep-dives/progress.json')
  const progress = JSON.parse(await fs.readFile(progressPath, 'utf8'))

  const processedPaths = files.map((f) => f.replace(/\\/g, '/'))
  progress.pending = progress.pending.filter((p) => !processedPaths.includes(p))
  progress.completed.push(...processedPaths)

  await fs.writeFile(progressPath, JSON.stringify(progress, null, 2), 'utf8')
  console.log(`✅ Progress updated. ${progress.pending.length} files remaining.`)
}

run().catch(console.error)
