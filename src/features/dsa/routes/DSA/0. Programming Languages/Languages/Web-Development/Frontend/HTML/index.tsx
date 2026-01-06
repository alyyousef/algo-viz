import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function HtmlPage(): JSX.Element {
  return (
    <TopicLayout
      title="HTML"
      subtitle="Placeholder"
      intro="Content for HTML is coming soon."
    >
      <TopicSection heading="Status">
        <p>Placeholder page for HTML. Add narrative, visuals, and examples here.</p>
      </TopicSection>
    </TopicLayout>
  )
}

