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

      // Ensure blank line BEFORE closing tags
      content = content.replace(/([^\n])\n(<\/(ConceptTemplate|ComparisonTable|Callout)>)/g, '$1\n\n$2')
      content = content.replace(/([^\n])(<\/(ConceptTemplate|ComparisonTable|Callout)>)/g, '$1\n\n$2') // if no newline at all

      // Ensure blank line AFTER opening tags
      // (This requires matching the end of the opening tag. Since tags can have attributes, we match >)
      content = content.replace(/(<(ConceptTemplate|ComparisonTable|Callout)[^>]*>)\n([^\n])/g, '$1\n\n$3')

      if (content !== original) {
        fs.writeFileSync(fullPath, content)
        console.log(`Fixed blank lines in ${fullPath}`)
      }
    }
  }
}

walk('src/features/kb/routes/KB')
console.log('Done.')
