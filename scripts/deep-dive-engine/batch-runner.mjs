import fs from 'fs/promises'
import path from 'path'
import { expandTopic } from './expand-topic.mjs'

const KB_DIR = path.resolve('src/features/kb/routes/KB')

// A helper to recursively find all index.mdx files
async function findIndexFiles(dir) {
  let results = []
  const list = await fs.readdir(dir, { withFileTypes: true })
  for (const file of list) {
    const fullPath = path.join(dir, file.name)
    if (file.isDirectory()) {
      results = results.concat(await findIndexFiles(fullPath))
    } else if (file.name === 'index.mdx') {
      results.push(fullPath)
    }
  }
  return results
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('❌ ERROR: GEMINI_API_KEY environment variable is not set.')
    console.error('Usage: GEMINI_API_KEY="your-key" node scripts/deep-dive-engine/batch-runner.mjs')
    process.exit(1)
  }

  // Get arguments. If an argument is provided, process only that specific directory/file
  const target = process.argv[2] ? path.resolve(process.argv[2]) : KB_DIR

  let filesToProcess = []
  const stat = await fs.stat(target)
  if (stat.isDirectory()) {
    filesToProcess = await findIndexFiles(target)
  } else if (stat.isFile() && target.endsWith('.mdx')) {
    filesToProcess = [target]
  }

  console.log(`Found ${filesToProcess.length} files to process in ${target}`)

  // Simple sequential processing to respect API rate limits
  for (let i = 0; i < filesToProcess.length; i++) {
    const file = filesToProcess[i]
    console.log(`\n[${i + 1}/${filesToProcess.length}] Processing ${file}...`)

    // Check if it has already been expanded by looking for the Layout string
    const content = await fs.readFile(file, 'utf8')
    if (content.includes('export default function Layout')) {
      console.log(`⏩ Skipping ${file} (Layout found, already processed)`)
      continue
    }

    const success = await expandTopic(file, apiKey)
    if (!success) {
      console.error(`⚠️ Halting batch due to failure on ${file}`)
      process.exit(1)
    }

    // Sleep for 15 seconds to avoid brutal rate limiting on standard API keys
    console.log('Sleeping for 15 seconds to respect rate limits...')
    await new Promise((resolve) => setTimeout(resolve, 15000))
  }

  console.log('\n🎉 Batch processing complete!')
}

main().catch(console.error)
