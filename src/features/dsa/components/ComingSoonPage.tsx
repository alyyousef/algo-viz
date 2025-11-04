import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export interface ComingSoonPageProps {
  title: string
  subtitle?: string
  intro?: string
  notes?: string[]
  backLink?: string
  backLabel?: string
}

const DEFAULT_NOTES = [
  'Outline the core ideas and motivation for this topic.',
  'List the algorithms, data structures, or visual aids that belong here.',
  'Link to practice problems or external references learners can use meanwhile.',
]

export default function ComingSoonPage({
  title,
  subtitle = 'Draft in progress',
  intro = 'We are reshaping this topic to match the new AlgoViz experience. Check back soon for refreshed notes, interactive walkthroughs, and practice prompts.',
  notes = DEFAULT_NOTES,
  backLink,
  backLabel,
}: ComingSoonPageProps): JSX.Element {
  return (
    <TopicLayout
      title={title}
      subtitle={subtitle}
      intro={intro}
      backLink={backLink}
      backLabel={backLabel}
    >
      <TopicSection heading="What will appear here">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </TopicSection>
    </TopicLayout>
  )
}

export const createComingSoonPage = ({
  title,
  subtitle,
  intro,
  notes,
  backLink,
  backLabel,
}: ComingSoonPageProps) =>
  function ComingSoonWrapped(): JSX.Element {
    return (
      <ComingSoonPage
        title={title}
        subtitle={subtitle}
        intro={intro}
        notes={notes}
        backLink={backLink}
        backLabel={backLabel}
      />
    )
  }
