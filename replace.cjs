const fs = require('fs')
const path = require('path')

function walk(dir) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    file = path.join(dir, file)
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file))
    } else {
      if (
        file.endsWith('.ts') ||
        file.endsWith('.tsx') ||
        file.endsWith('.js') ||
        file.endsWith('.mjs')
      ) {
        results.push(file)
      }
    }
  })
  return results
}

const files = walk('src').concat(walk('scripts'))
files.forEach((f) => {
  let content = fs.readFileSync(f, 'utf8')
  let changed = false

  // Replace imports
  if (content.includes('features/dsa')) {
    content = content.replace(/features\/dsa/g, 'features/kb')
    changed = true
  }

  // Replace dsaRoute -> kbRoute
  if (content.includes('dsaRoute')) {
    content = content.replace(/dsaRoute/g, 'kbRoute')
    changed = true
  }
  if (content.includes('DsaRoute')) {
    content = content.replace(/DsaRoute/g, 'KbRoute')
    changed = true
  }

  if (content.includes('dsaModuleFactories')) {
    content = content.replace(/dsaModuleFactories/g, 'kbModuleFactories')
    changed = true
  }
  if (content.includes('DsaModuleFactory')) {
    content = content.replace(/DsaModuleFactory/g, 'KbModuleFactory')
    changed = true
  }
  if (content.includes('dsaLegacyRedirectEntries')) {
    content = content.replace(/dsaLegacyRedirectEntries/g, 'kbLegacyRedirectEntries')
    changed = true
  }
  if (content.includes("'/dsa/")) {
    content = content.replace(/'\/dsa\//g, "'/kb/")
    changed = true
  }
  if (content.includes('"/dsa/')) {
    content = content.replace(/"\/dsa\//g, '"/kb/')
    changed = true
  }
  if (content.includes('to="/dsa/')) {
    content = content.replace(/to="\/dsa\//g, 'to="/kb/')
    changed = true
  }
  if (content.includes('routes/DSA')) {
    content = content.replace(/routes\/DSA/g, 'routes/KB')
    changed = true
  }

  if (changed) {
    fs.writeFileSync(f, content)
  }
})
console.log('Replacement complete.')
