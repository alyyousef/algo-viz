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
      
      // Fix Callout blocks
      content = content.replace(/<Callout([^>]*)>/g, '\n\n<Callout$1>\n\n')
      content = content.replace(/<\/Callout>/g, '\n\n</Callout>\n\n')
      
      // Fix ComparisonTable blocks (if any are left)
      content = content.replace(/<ComparisonTable([^>]*)>/g, '\n\n<ComparisonTable$1>\n\n')
      content = content.replace(/<\/ComparisonTable>/g, '\n\n</ComparisonTable>\n\n')
      
      // Fix self-closing tags
      content = content.replace(/<ArchitectureDiagram([^>]*)\/>/g, '\n\n<ArchitectureDiagram$1/>\n\n')
      content = content.replace(/<RelatedTopics([^>]*)\/>/g, '\n\n<RelatedTopics$1/>\n\n')
      
      // Replace '< ' with '&lt; ' ONLY OUTSIDE of math blocks.
      // We can do this by matching all math blocks and text blocks sequentially.
      const regex = /(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g;
      const parts = content.split(regex);
      
      for (let j = 0; j < parts.length; j++) {
        if (j % 2 === 0) {
          // Even indices are plain text
          parts[j] = parts[j].replace(/ < /g, ' &lt; ')
          parts[j] = parts[j].replace(/</g, (match, offset) => {
            const nextChars = parts[j].slice(offset, offset + 20)
            if (nextChars.match(/^<\/?(Callout|ConceptTemplate|ComparisonTable|ArchitectureDiagram|RelatedTopics|Math|span|div|a|b|i|strong|em|p|br|hr|ul|ol|li)/)) {
              return match
            }
            if (nextChars.match(/^<\s/)) {
              return '&lt;'
            }
            return match
          })
        }
      }
      
      content = parts.join('');
      
      // Clean up triple+ blank lines
      content = content.replace(/\n{4,}/g, '\n\n\n')
      
      fs.writeFileSync(fullPath, content)
    }
  }
}

walk('src/features/kb/routes/KB')
console.log('Fixed MDX syntax across KB!')
