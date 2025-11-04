import TopicLayout, { TopicSection } from './TopicLayout'

import type { JSX } from 'react'

export interface TopicPlaceholderProps {
  title: string
  subtitle?: string
  intro?: string
  notes?: string[]
  backLink?: string
  backLabel?: string
}

const DEFAULT_NOTES = [
  'Summarise the key ideas you want learners to remember.',
  'Share how this topic connects to real-world use cases.',
  'Link to visual experiments, walkthroughs, or external practice sets.',
]

export default function TopicPlaceholder({
  title,
  subtitle,
  intro = 'Content for this topic is on the way. Use the checklist below as a guide while the deep dive is being prepared.',
  notes = DEFAULT_NOTES,
  backLink,
  backLabel,
}: TopicPlaceholderProps): JSX.Element {
  return (
    <TopicLayout
      title={title}
      subtitle={subtitle}
      intro={intro}
      backLink={backLink}
      backLabel={backLabel}
    >
      <TopicSection heading="What to add next">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </TopicSection>
    </TopicLayout>
  )
}
