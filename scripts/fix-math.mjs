import fs from 'fs/promises'
import path from 'path'

async function walk(dir) {
  let results = []
  const list = await fs.readdir(dir)
  for (let file of list) {
    file = path.join(dir, file)
    const stat = await fs.stat(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(await walk(file))
    } else {
      if (file.endsWith('.mdx')) {
        results.push(file)
      }
    }
  }
  return results
}

async function main() {
  const kbDir = path.resolve('src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing')
  const files = await walk(kbDir)
  let count = 0
  for (const file of files) {
    let content = await fs.readFile(file, 'utf8')
    // We want to replace \\ with \
    // In JS regex, \\\\ matches a literal \\
    // We replace it with \\ which is a literal \
    if (content.includes('\\\\')) {
      content = content.replace(/\\\\/g, '\\')
      await fs.writeFile(file, content, 'utf8')
      count++
    }
  }
  console.log('Fixed math formatting in ' + count + ' files.')
}

main().catch(console.error)
