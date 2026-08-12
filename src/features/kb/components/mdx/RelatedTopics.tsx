import { Link } from 'react-router-dom'

import type { JSX } from 'react'

interface RelatedTopic {
  label: string
  route: string
}

export function RelatedTopics({ topics }: { topics: RelatedTopic[] }): JSX.Element {
  return (
    <div
      style={{
        margin: '14px 0',
        padding: '10px',
        border: '1px solid #808080',
        background: '#f2f2f2',
      }}
    >
      <h3 className="bin98-subheading" style={{ marginBottom: '8px' }}>
        Related Topics
      </h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {topics.map((t) => (
          <Link
            key={t.route}
            to={t.route}
            className="bin98-button"
            style={{ textDecoration: 'none' }}
          >
            {t.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
