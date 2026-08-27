import fs from 'fs/promises'
import { compile } from '@mdx-js/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkMdxMathEnhanced from 'remark-mdx-math-enhanced'
import rehypeKatex from 'rehype-katex'

async function main() {
  const file = 'src/features/kb/routes/KB/25. Machine Learning/25.2 Algorithms/Naive Bayes/index.mdx'
  const content = await fs.readFile(file, 'utf8')
  
  try {
    const result = await compile(content, {
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkMdxMathEnhanced],
      rehypePlugins: [rehypeKatex],
      jsx: true
    })
    console.log("SUCCESS!")
  } catch (err) {
    console.error("MDX COMPILE ERROR:")
    console.error(err)
    if (err.cause) {
      console.error("CAUSE:", err.cause)
    }
  }
}

main().catch(console.error)
