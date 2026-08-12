import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const KB_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const decodeEntities = (text) => {
  return text
    .replace(/&#123;/g, '{')
    .replace(/&#125;/g, '}')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await processDirectory(fullPath)
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      let content = await fs.readFile(fullPath, 'utf-8')
      let changed = false

      const regex = /<pre className="bin98-codebox">\s*<code>([\s\S]*?)<\/code>\s*<\/pre>/g

      content = content.replace(regex, (match, codeContent) => {
        changed = true
        const decoded = decodeEntities(codeContent.trim())
        return `\`\`\`text\n${decoded}\n\`\`\``
      })

      if (changed) {
        await fs.writeFile(fullPath, content, 'utf-8')
        console.log(`Converted codeblocks in ${fullPath}`)
      }
    }
  }
}

async function run() {
  console.log('Converting to MD codeblocks...')
  await processDirectory(KB_DIR)
  console.log('Done!')
}

run().catch(console.error)
