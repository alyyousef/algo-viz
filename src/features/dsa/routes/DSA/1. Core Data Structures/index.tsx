import TopicPlaceholder from '@/features/dsa/components/TopicPlaceholder'

import type { JSX } from 'react'

export default function Page(): JSX.Element {
  return (
    <TopicPlaceholder
      title="Core Data Structures"
      subtitle="Linear, non-linear, and everything in between"
      backLink="/dsa"
      backLabel="Back to DSA overview"
      notes={[
        'Summarise how arrays, lists, trees, and hash tables complement each other.',
        'Highlight the kinds of problems each structure solves best.',
        'Link to visual walkthroughs, code labs, or practice questions for each family.',
      ]}
    />
  )
}
