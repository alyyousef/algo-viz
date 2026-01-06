import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function NoSqlPage(): JSX.Element {
  return (
    <TopicLayout
      title="NoSQL"
      subtitle="Placeholder"
      intro="Content for NoSQL is coming soon."
    >
      <TopicSection heading="Status">
        <p>Placeholder page for NoSQL. Add narrative, visuals, and examples here.</p>
      </TopicSection>
    </TopicLayout>
  )
}

