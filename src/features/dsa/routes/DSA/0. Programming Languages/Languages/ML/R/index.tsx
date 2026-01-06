import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function RPage(): JSX.Element {
  return (
    <TopicLayout
      title="R"
      subtitle="Placeholder"
      intro="Content for R is coming soon."
    >
      <TopicSection heading="Status">
        <p>Placeholder page for R. Add narrative, visuals, and examples here.</p>
      </TopicSection>
    </TopicLayout>
  )
}

