const fs = require('fs')
let code = fs.readFileSync('scripts/generate-mega24.mjs', 'utf8')

// split the code by \n
let lines = code.split('\n')
for (let i = 0; i < lines.length; i++) {
  // If the line is the start or end of the template literal, don't replace
  if (lines[i].match(/": `---$/)) continue
  if (lines[i].match(/^`,$/)) continue
  if (lines[i].match(/^`$/)) continue

  // Replace unescaped backticks with escaped backticks
  // Since some might already be escaped, unescape them all first just to be safe.
  lines[i] = lines[i].replace(/\\\\`/g, '`')
  // Then escape them properly with `\\`` (which in this JS file is written as \\\\`)
  lines[i] = lines[i].replace(/`/g, '\\\\`')
}
fs.writeFileSync('scripts/generate-mega24.mjs', lines.join('\n'))
console.log('Fixed!')
