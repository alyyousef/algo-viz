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
  const kbDir = path.resolve('src/features/kb/routes/KB')
  const files = await walk(kbDir)
  let count = 0
  for (const file of files) {
    let content = await fs.readFile(file, 'utf8')
    if (content.includes('\\r\\n')) {
      content = content.replace(/\\r\\n/g, '\\n')
      await fs.writeFile(file, content, 'utf8')
      count++
    }
  }
  console.log(\`Fixed line endings in \${count} files.\`)
}

main().catch(console.error)
