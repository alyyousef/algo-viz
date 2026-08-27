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
      
      content = content.replace(/<ComparisonTable[\s\S]*?\/>/g, (match) => {
        changed = true
        // Remove all newlines and multiple spaces
        return match.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ')
      })
      
      if (changed) {
        fs.writeFileSync(fullPath, content)
      }
    }
  }
}

walk('src/features/kb/routes/KB')
console.log('Fixed ComparisonTables!')
