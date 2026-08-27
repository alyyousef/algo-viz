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
      if (!content.endsWith('\n\n')) {
        content = content.replace(/\s+$/, '') + '\n\n'
        fs.writeFileSync(fullPath, content)
        console.log(`Appended newlines to: ${fullPath}`)
      }
    }
  }
}

walk('src/features/kb/routes/KB')
console.log('Done appending newlines.')
