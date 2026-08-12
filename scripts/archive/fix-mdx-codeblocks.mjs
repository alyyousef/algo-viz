import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const KB_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await processDirectory(fullPath)
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      let content = await fs.readFile(fullPath, 'utf-8')
      let changed = false

      // Match <pre><code>...</code></pre> blocks non-greedily
      const regex = /<pre className="bin98-codebox">\s*<code>([\s\S]*?)<\/code>\s*<\/pre>/g

      content = content.replace(regex, (match, codeContent) => {
        // Only escape curly braces if they aren't already escaped or in JSX expressions
        // Actually, just blindly replacing { with &#123; is safest inside literal code text
        // But wait, what if they already use {"{"}?
        let escaped = codeContent.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;')

        // Revert any mistaken double-escapes if they existed
        escaped = escaped.replace(/&#123;"&#123;"&#125;/g, '&#123;')

        if (escaped !== codeContent) {
          changed = true
        }
        return `<pre className="bin98-codebox">\n<code>${escaped}</code>\n</pre>`
      })

      if (changed) {
        await fs.writeFile(fullPath, content, 'utf-8')
        console.log(`Fixed curly braces in ${fullPath}`)
      }
    }
  }
}

async function run() {
  console.log('Fixing MDX codeblocks...')
  await processDirectory(KB_DIR)
  console.log('Done!')
}

run().catch(console.error)
