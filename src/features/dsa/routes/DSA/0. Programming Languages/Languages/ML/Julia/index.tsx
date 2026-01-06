import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function JuliaPage(): JSX.Element {
  return (
    <TopicLayout
      title="Julia"
      subtitle="Placeholder"
      intro="Content for Julia is coming soon."
    >
      <TopicSection heading="Status">
        <p>Placeholder page for Julia. Add narrative, visuals, and examples here.</p>
      </TopicSection>
    </TopicLayout>
  )
}

