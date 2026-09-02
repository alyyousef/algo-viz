const fs = require('fs')
const file = 'scripts/deep-dives/generate-batch-020.mjs'
let content = fs.readFileSync(file, 'utf8')
content = content.replace(/\\\\"/g, '\\"')
fs.writeFileSync(file, content)
