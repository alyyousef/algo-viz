import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function CPage(): JSX.Element {
  return (
    <TopicLayout
      title="C"
      subtitle="Placeholder"
      intro="Content for C is coming soon."
    >
      <TopicSection heading="Status">
        <p>Placeholder page for C. Add narrative, visuals, and examples here.</p>
      </TopicSection>
    </TopicLayout>
  )
}

