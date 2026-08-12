import { ArchitectureDiagram } from './ArchitectureDiagram'
import { Callout } from './Callout'
import { CodeBlock } from './CodeBlock'
import { ComparisonTable } from './ComparisonTable'
import { RelatedTopics } from './RelatedTopics'

import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="bin98-doc-title" {...props} />,
  h2: (props) => <h2 className="bin98-heading" {...props} />,
  h3: (props) => <h3 className="bin98-subheading" {...props} />,
  hr: (props) => <hr className="bin98-divider" {...props} />,
  table: (props) => <table className="bin98-table" {...props} />,
  pre: CodeBlock, // use custom syntax highlighter for code blocks
  Callout,
  ComparisonTable,
  RelatedTopics,
  ArchitectureDiagram,
}
