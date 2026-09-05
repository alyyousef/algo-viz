import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import go from 'highlight.js/lib/languages/go'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import python from 'highlight.js/lib/languages/python'
import rust from 'highlight.js/lib/languages/rust'
import sql from 'highlight.js/lib/languages/sql'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import {
  Children,
  isValidElement,
  useState,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
} from 'react'

import { getNodeText } from '@/features/kb/utils/headings'

import { ArchitectureDiagram } from './ArchitectureDiagram'

let registered = false

const registerLanguages = () => {
  if (registered) {
    return
  }

  hljs.registerLanguage('bash', bash)
  hljs.registerLanguage('sh', bash)
  hljs.registerLanguage('shell', bash)
  hljs.registerLanguage('c', c)
  hljs.registerLanguage('cpp', cpp)
  hljs.registerLanguage('c++', cpp)
  hljs.registerLanguage('go', go)
  hljs.registerLanguage('java', java)
  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('js', javascript)
  hljs.registerLanguage('json', json)
  hljs.registerLanguage('python', python)
  hljs.registerLanguage('py', python)
  hljs.registerLanguage('rust', rust)
  hljs.registerLanguage('sql', sql)
  hljs.registerLanguage('typescript', typescript)
  hljs.registerLanguage('ts', typescript)
  hljs.registerLanguage('xml', xml)
  hljs.registerLanguage('html', xml)
  hljs.registerLanguage('yaml', yaml)
  hljs.registerLanguage('yml', yaml)
  registered = true
}

registerLanguages()

const languageFromClassName = (className?: string): string | undefined => {
  const match = className?.match(/language-([\w+#]+)/)
  return match?.[1]?.toLowerCase()
}

const extractCode = (children: ReactNode): { code: string; language?: string } => {
  const child = Children.toArray(children)[0]
  if (
    isValidElement<{ className?: string; children?: ReactNode }>(child) &&
    child.type === 'code'
  ) {
    return {
      code: getNodeText(child.props.children),
      language: languageFromClassName(child.props.className),
    }
  }

  return { code: getNodeText(children) }
}

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const highlightCode = (code: string, language?: string): string => {
  try {
    if (language && hljs.getLanguage(language)) {
      return hljs.highlight(code, { language, ignoreIllegals: true }).value
    }
  } catch {
    return escapeHtml(code)
  }

  return escapeHtml(code)
}

export function CodeBlock(props: HTMLAttributes<HTMLPreElement>): JSX.Element {
  const [copied, setCopied] = useState(false)
  const { code, language } = extractCode(props.children)

  const handleCopy = () => {
    void navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        return null
      })
      .catch(console.error)
  }

  if (language === 'mermaid') {
    return <ArchitectureDiagram chart={code} />
  }

  return (
    <div className="bin98-code-wrap">
      <pre
        className={`bin98-codebox${language ? ` language-${language}` : ''}`}
        dangerouslySetInnerHTML={{
          __html: `<code class="hljs">${highlightCode(code, language)}</code>`,
        }}
      />
      <button type="button" className="bin98-button bin98-code-copy" onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
