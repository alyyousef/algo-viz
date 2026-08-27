import fs from 'fs'

const content = fs.readFileSync('src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Recurrence relations/index.mdx', 'utf8')

console.log("File length:", content.length)
for (let i = 0; i < content.length; i++) {
  const c = content[i]
  const code = content.charCodeAt(i)
  if (code < 32 || code > 126) {
    console.log(`Char ${i}: [${code}]`)
  }
}
