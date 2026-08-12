const fs = require('fs')

let content = fs.readFileSync('scripts/generate-mega20.mjs', 'utf-8')

// The file has a structure where values in contentMap are template literals.
// We want to escape all backticks that are NOT at the beginning or end of the template literal.

// We can just find all backticks, and escape them, EXCEPT the ones that are followed by `,` or `\n};` or preceded by `: ` or `\n  "src/`...
// Better yet, just replace all backticks with \`, then fix the outer ones!

let lines = content.split('\n')

for (let i = 4; i < lines.length - 10; i++) {
  // If the line is the start of a dictionary entry, e.g. `  "src/...": \`---`
  if (lines[i].match(/": `---$/)) {
    lines[i] = lines[i].replace(/": `---$/, '": \\`---') // Temporarily escape it so we can do a global replace
  }
  // If the line is the end of a dictionary entry, e.g. ``,`
  if (lines[i].match(/^`,$/)) {
    lines[i] = '\\`,'
  }
  if (lines[i].match(/^`$/)) {
    lines[i] = '\\`'
  }
}

content = lines.join('\n')

// Now escape all unescaped backticks
// Wait, if I just replace ALL ` with \`, then restore the outer ones:
content = content.replace(/`/g, '\\`')

// Restore outer ones:
content = content.replace(/": \\`---/g, '": `---')
content = content.replace(/^\\`,$/gm, '`,')
content = content.replace(/^\\`$/gm, '`')

fs.writeFileSync('scripts/generate-mega20.mjs', content, 'utf-8')
console.log('Fixed backticks!')
