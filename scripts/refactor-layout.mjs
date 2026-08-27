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
      const original = content

      // If it has export default function Layout, but is missing </ConceptTemplate> before the closing paren
      if (content.includes('export default function Layout') && !content.includes('</ConceptTemplate>')) {
        content = content.replace(/(\s*)\)\n\}/, '$1</ConceptTemplate>\n  )\n}')
        fs.writeFileSync(fullPath, content)
        console.log(`Fixed missing closing tag in ${fullPath}`)
      }
    }
  }
}

walk('src/features/kb/routes/KB')
console.log('Done refactoring layouts.')
