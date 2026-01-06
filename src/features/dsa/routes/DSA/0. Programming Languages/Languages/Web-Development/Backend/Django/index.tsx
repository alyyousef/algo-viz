import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function DjangoPage(): JSX.Element {
  return (
    <TopicLayout
      title="Django"
      subtitle="Placeholder"
      intro="Content for Django is coming soon."
    >
      <TopicSection heading="Status">
        <p>Placeholder page for Django. Add narrative, visuals, and examples here.</p>
      </TopicSection>
    </TopicLayout>
  )
}

