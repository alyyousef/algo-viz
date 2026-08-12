import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const KB_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')
const TAXONOMY_FILE = path.join(__dirname, 'taxonomy.md')

function sanitizeFolderName(name) {
  // Remove trailing/leading spaces, replace slashes with dashes, replace # with sharp, remove invalid Windows characters like < > : " \ | ? *
  return name
    .trim()
    .replace(/[\/\\]/g, '-')
    .replace(/#/g, 'sharp')
    .replace(/[<>:"|?*]/g, '')
}

function generateMdxContent(title) {
  return `import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="${title}">

> [!NOTE]
> This page has been scaffolded and is part of the expanded knowledge taxonomy. Comprehensive content is currently being generated.

</ConceptTemplate>
`
}

async function scaffoldTaxonomy() {
  console.log('Starting taxonomy scaffolding...')

  const content = await fs.readFile(TAXONOMY_FILE, 'utf-8')
  const lines = content.split('\n')

  let currentDomain = null
  let currentSubdomain = null

  let totalTopics = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line || line.startsWith('---')) continue

    if (line.startsWith('## ')) {
      // New Domain
      currentDomain = sanitizeFolderName(line.substring(3))
      currentSubdomain = null // Reset subdomain
      console.log(`\nProcessing Domain: ${currentDomain}`)
    } else if (line.startsWith('### ')) {
      // New Subdomain
      currentSubdomain = sanitizeFolderName(line.substring(4))
      console.log(`  Subdomain: ${currentSubdomain}`)
    } else {
      // It's a comma-separated list of topics
      // Ignore "Suggested Site Structure" or other paragraphs
      if (
        line.includes('Suggested Site Structure') ||
        line.startsWith('Computer Science') ||
        line.startsWith('→')
      ) {
        continue
      }
      if (!currentDomain) continue

      const topics = line
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
      for (const topic of topics) {
        // Some topics might have parentheticals like "Wolfram Language (Mathematica)"
        const sanitizedTopic = sanitizeFolderName(topic)

        let targetDir = path.join(KB_DIR, currentDomain)
        if (currentSubdomain) {
          targetDir = path.join(targetDir, currentSubdomain)
        }
        targetDir = path.join(targetDir, sanitizedTopic)

        // Create directory
        await fs.mkdir(targetDir, { recursive: true })

        // Write index.mdx
        const mdxPath = path.join(targetDir, 'index.mdx')
        // Check if file exists so we don't overwrite existing rich content if we accidentally hit it
        try {
          await fs.access(mdxPath)
          // File exists, skip scaffolding
          console.log(`    Skipping existing: ${sanitizedTopic}`)
        } catch {
          // File doesn't exist, create it
          await fs.writeFile(mdxPath, generateMdxContent(topic), 'utf-8')
          totalTopics++
        }
      }
    }
  }

  console.log(`\nScaffolding complete! Generated ${totalTopics} new topic pages.`)
}

scaffoldTaxonomy().catch(console.error)
