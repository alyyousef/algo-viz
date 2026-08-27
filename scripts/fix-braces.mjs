import fs from 'fs/promises'
import path from 'path'

async function fixRelations() {
  const file = path.resolve('src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Relations/index.mdx')
  let content = await fs.readFile(file, 'utf8')
  content = content.replace(/\\{Alice, Bob\\}/g, '\\lbrace Alice, Bob \\rbrace')
  content = content.replace(/\\{\(Alice, Math\), \(Bob, History\)\\}/g, '\\lbrace (Alice, Math), (Bob, History) \\rbrace')
  content = content.replace(/\\lbrace Alice, Bob \\rbrace/g, '\\lbrace Alice, Bob \\rbrace')
  
  // Just in case it has raw brackets:
  content = content.replace(/\{Alice, Bob\}/g, '\\lbrace Alice, Bob \\rbrace')
  content = content.replace(/\{\(Alice, Math\), \(Bob, History\)\}/g, '\\lbrace (Alice, Math), (Bob, History) \\rbrace')
  
  await fs.writeFile(file, content, 'utf8')
  console.log('Fixed Relations')
}

async function fixSets() {
  const file = path.resolve('src/features/kb/routes/KB/8. Discrete Mathematics & Mathematics for Computing/8.1 Discrete Math/Sets/index.mdx')
  let content = await fs.readFile(file, 'utf8')
  content = content.replace(/\\{1, 2, 3\\}/g, '\\lbrace 1, 2, 3 \\rbrace')
  content = content.replace(/\\{\\}/g, '\\lbrace \\rbrace')
  
  // Just in case it has raw brackets
  content = content.replace(/\{ 1, 2, 3 \}/g, '\\lbrace 1, 2, 3 \\rbrace')
  content = content.replace(/\{ \}/g, '\\lbrace \\rbrace')
  content = content.replace(/\{1, 2, 3\}/g, '\\lbrace 1, 2, 3 \\rbrace')
  content = content.replace(/\{\}/g, '\\lbrace \\rbrace')
  
  await fs.writeFile(file, content, 'utf8')
  console.log('Fixed Sets')
}

async function main() {
  await fixRelations()
  await fixSets()
}

main().catch(console.error)
