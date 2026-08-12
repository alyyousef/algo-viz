const fs = require('fs')
const path = require('path')

function walk(dir) {
  fs.readdirSync(dir).forEach((f) => {
    let p = path.join(dir, f)
    if (fs.statSync(p).isDirectory()) {
      walk(p)
    } else if (p.endsWith('.mdx')) {
      let c = fs.readFileSync(p, 'utf8')
      if (c.includes('\\`')) {
        let fixed = c.replace(/\\`/g, '`')
        fs.writeFileSync(p, fixed)
        console.log('Fixed:', p)
      }
    }
  })
}

walk('src/features/kb/routes/KB/10. Operating Systems')
