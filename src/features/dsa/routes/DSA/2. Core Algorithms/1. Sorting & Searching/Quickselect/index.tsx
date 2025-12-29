import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function QuickselectPage(): JSX.Element {
  return (
    <TopicLayout
      title="Quickselect"
      subtitle="Placeholder"
      intro="Content for Quickselect is coming soon."
    >
      <TopicSection heading="Status">
        <p>Placeholder page for Quickselect. Add narrative, visuals, and examples here.</p>
      </TopicSection>
    </TopicLayout>
  )
}
