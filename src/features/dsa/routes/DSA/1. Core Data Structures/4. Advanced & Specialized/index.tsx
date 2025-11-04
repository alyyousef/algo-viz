import TopicPlaceholder from '@/features/dsa/components/TopicPlaceholder'

import type { JSX } from 'react'

export default function Page(): JSX.Element {
  return (
    <TopicPlaceholder
      title="Advanced & Specialised Structures"
      subtitle="Heaps, tries, DSU, and more"
      backLink="/dsa/1-core-data-structures"
      backLabel="Back to core data structures"
      notes={[
        'Explain what problem each specialised structure was invented to solve.',
        'Call out implementation tips: balancing requirements, pointer pitfalls, and common mistakes.',
        'Collect links to practice problems where these structures shine.',
      ]}
    />
  )
}
