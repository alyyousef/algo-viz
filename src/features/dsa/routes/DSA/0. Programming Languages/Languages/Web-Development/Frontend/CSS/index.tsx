import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function CssPage(): JSX.Element {
  return (
    <TopicLayout
      title="CSS"
      subtitle="Placeholder"
      intro="Content for CSS is coming soon."
    >
      <TopicSection heading="Status">
        <p>Placeholder page for CSS. Add narrative, visuals, and examples here.</p>
      </TopicSection>
    </TopicLayout>
  )
}

