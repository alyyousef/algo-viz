import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function JavaPage(): JSX.Element {
  return (
    <TopicLayout
      title="Java"
      subtitle="Placeholder"
      intro="Content for Java is coming soon."
    >
      <TopicSection heading="Status">
        <p>Placeholder page for Java. Add narrative, visuals, and examples here.</p>
      </TopicSection>
    </TopicLayout>
  )
}

