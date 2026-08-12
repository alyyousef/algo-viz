const fs = require('fs')
let code = fs.readFileSync('scripts/generate-mega21.mjs', 'utf8')

// The file currently has \\\\\\\` which is written as \\\` in JS string.
// I need to change \\\` to \`
// In javascript string literal of the script, it's currently written as "\\\\\\`".
// We want to replace "\\\\\\`" with "\\`".
code = code.replace(/\\\\\\`/g, '\\`')

fs.writeFileSync('scripts/generate-mega21.mjs', code)
console.log('Fixed backticks!')
