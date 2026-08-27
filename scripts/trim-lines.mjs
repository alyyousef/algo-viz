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
      const lines = content.split('\n')
      let changed = false
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].endsWith(' ') || lines[i].endsWith('\t') || lines[i].endsWith('\r')) {
          lines[i] = lines[i].replace(/\s+$/, '')
          changed = true
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, lines.join('\n'))
        console.log(`Trimmed spaces in: ${fullPath}`)
      }
    }
  }
}

walk('src/features/kb/routes/KB')
console.log('Done trimming lines.')
