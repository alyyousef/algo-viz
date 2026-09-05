import { collectHeadingText, slugifyHeading } from '@/features/kb/utils/headings'

import { ArchitectureDiagram } from './ArchitectureDiagram'
import { Callout } from './Callout'
import { CodeBlock } from './CodeBlock'
import { ComparisonTable } from './ComparisonTable'
import { RelatedTopics } from './RelatedTopics'

import type { MDXComponents } from 'mdx/types'
import type { HTMLAttributes, ReactNode } from 'react'

const headingId = (id: string | undefined, children: ReactNode): string =>
  id ?? slugifyHeading(collectHeadingText(children))

const MdHeading = ({
  as: Tag,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { as: 'h2' | 'h3' }): ReactNode => (
  <Tag {...props} id={headingId(props.id, props.children)} className={className}>
    {props.children}
  </Tag>
)

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="bin98-doc-title" {...props} />,
  h2: (props) => (
    <MdHeading
      as="h2"
      className="bin98-heading"
      {...(props as HTMLAttributes<HTMLHeadingElement>)}
    />
  ),
  h3: (props) => (
    <MdHeading
      as="h3"
      className="bin98-subheading"
      {...(props as HTMLAttributes<HTMLHeadingElement>)}
    />
  ),
  hr: (props) => <hr className="bin98-divider" {...props} />,
  table: (props) => <table className="bin98-table" {...props} />,
  pre: CodeBlock, // use custom syntax highlighter for code blocks
  Callout,
  ComparisonTable,
  RelatedTopics,
  ArchitectureDiagram,
}
