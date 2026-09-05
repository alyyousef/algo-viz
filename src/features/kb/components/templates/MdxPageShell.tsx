import { useMemo, useRef, type CSSProperties, type JSX, type ReactNode } from 'react'

import { wrapInterviewQuestions } from '@/features/kb/components/mdx/wrapInterviewQuestions'
import TopicBreadcrumb from '@/features/kb/components/TopicBreadcrumb'
import TopicPageNavigation from '@/features/kb/components/TopicPageNavigation'
import { useContentHeadings } from '@/features/kb/hooks/useContentHeadings'

interface MdxPageShellProps {
  title: string
  children: ReactNode
  titlebarStyle?: CSSProperties
  titleSuffix?: string
  showToc?: boolean
}

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
}

export function MdxPageShell({
  title,
  children,
  titlebarStyle,
  titleSuffix,
  showToc = true,
}: MdxPageShellProps): JSX.Element {
  const contentRef = useRef<HTMLDivElement>(null)
  const decoratedChildren = useMemo(() => wrapInterviewQuestions(children), [children])
  const tocLinks = useContentHeadings(contentRef, decoratedChildren)
  const titleText = titleSuffix ? `${title} - ${titleSuffix}` : title

  return (
    <div className="bin98-help-page">
      <div className="bin98-window" role="presentation">
        <header className="bin98-titlebar" style={titlebarStyle}>
          <span className="bin98-title-text">{titleText}</span>
          <div className="bin98-title-controls">
            <button
              className="bin98-control"
              type="button"
              aria-label="Close"
              data-return-target="history-or-desktop"
            >
              X
            </button>
          </div>
        </header>

        <div className="bin98-crumb-row">
          <TopicBreadcrumb />
          <TopicPageNavigation />
        </div>

        <div className={`bin98-main${showToc ? ' bin98-main--with-toc' : ' bin98-main--no-toc'}`}>
          {showToc ? (
            <aside className="bin98-toc" aria-label="Table of contents">
              <h2 className="bin98-toc-title">Contents</h2>
              {tocLinks.length > 0 ? (
                <ul className="bin98-toc-list">
                  {tocLinks.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(event) => {
                          event.preventDefault()
                          scrollToSection(section.id)
                        }}
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="bin98-toc-empty">No sections on this page.</p>
              )}
            </aside>
          ) : null}
          <div className="bin98-content" ref={contentRef} style={{ padding: '20px' }}>
            <h1 className="bin98-doc-title">{title}</h1>
            {decoratedChildren}
          </div>
        </div>
      </div>
    </div>
  )
}
