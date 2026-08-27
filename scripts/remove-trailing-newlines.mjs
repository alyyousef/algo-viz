import fs from 'fs'
import path from 'path'

function walk(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath)
    } else if (fullPath.endsWith('.mdx')) {
      let content = fs.readFileSync(fullPath, 'utf8')
      let changed = false
      
      // Keep only one newline at EOF, or no newline at EOF?
      // Let's remove ALL trailing whitespace including newlines
      const original = content
      content = content.replace(/\s+$/, '')
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content)
      }
    }
  }
}

walk('src/features/kb/routes/KB')
console.log('Removed trailing whitespace/newlines from all MDX files.')
