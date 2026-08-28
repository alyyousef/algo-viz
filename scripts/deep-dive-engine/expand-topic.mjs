import fs from 'fs/promises'
import path from 'path'
import { SYSTEM_PROMPT } from './prompts.mjs'

// We will use the Google Gemini API or OpenAI API
// To run this, the user must set GEMINI_API_KEY in their terminal.
async function expandTopic(filePath, apiKey) {
  const absolutePath = path.resolve(filePath)
  let originalContent = ''
  try {
    originalContent = await fs.readFile(absolutePath, 'utf8')
  } catch (err) {
    console.error(`❌ Could not read file: ${filePath}`, err.message)
    return false
  }

  console.log(`🚀 Expanding: ${filePath}`)

  // Prepare payload for Gemini (or OpenAI if preferred)
  // For this example, we use Gemini's REST API to avoid needing to install a new SDK.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`

  const payload = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `Please expand the following MDX file into a massive, textbook-quality deep dive:\n\n${originalContent}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 8192,
    },
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ API Error for ${filePath}: ${response.status} - ${errorText}`)
      return false
    }

    const data = await response.json()
    let newContent = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!newContent) {
      console.error(`❌ Received empty response from API for ${filePath}`)
      return false
    }

    // Strip markdown code block wrapper if the LLM output it
    if (newContent.startsWith('\`\`\`mdx')) {
      newContent = newContent.replace(/^\`\`\`mdx\n/, '').replace(/\n\`\`\`$/, '')
    } else if (newContent.startsWith('\`\`\`markdown')) {
      newContent = newContent.replace(/^\`\`\`markdown\n/, '').replace(/\n\`\`\`$/, '')
    } else if (newContent.startsWith('\`\`\`')) {
      newContent = newContent.replace(/^\`\`\`\n/, '').replace(/\n\`\`\`$/, '')
    }

    // Backup original just in case
    await fs.writeFile(absolutePath + '.backup', originalContent, 'utf8')

    // Write new content
    await fs.writeFile(absolutePath, newContent, 'utf8')
    console.log(`✅ Successfully expanded and saved: ${filePath}`)
    return true
  } catch (err) {
    console.error(`❌ Network/Processing Error for ${filePath}:`, err.message)
    return false
  }
}

export { expandTopic }
