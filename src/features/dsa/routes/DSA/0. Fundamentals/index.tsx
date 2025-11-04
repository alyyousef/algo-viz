import TopicPlaceholder from '@/features/dsa/components/TopicPlaceholder'

import type { JSX } from 'react'

export default function Page(): JSX.Element {
  return (
    <TopicPlaceholder
      title="Fundamentals"
      subtitle="DSA groundwork"
      backLink="/dsa"
      backLabel="Back to DSA overview"
      notes={[
        'Outline the core goals: what should someone understand before moving on?',
        'Give quick reminders about primitives, math basics, and how they show up in code.',
        'Point to early exercises or references that reinforce the essentials.',
      ]}
    />
  )
}
