import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function Page(): JSX.Element {
  return (
    <TopicLayout
      title="Hash-Based Structures"
      subtitle="Constant-time lookups when the hash behaves"
      intro="Hash tables, maps, and sets trade a little randomness for blazing fast average-time operations. Use this quick brief to remember the moving parts before you dive into code."
      backLink="/dsa/1-core-data-structures"
      backLabel="Back to core data structures"
    >
      <TopicSection heading="Core idea">
        <p>
          Hash-based structures convert a key into a bucket index, then store the value at that
          bucket. When the hash spreads keys evenly, inserts, lookups, and deletes feel
          instantaneous.
        </p>
      </TopicSection>

      <TopicSection heading="Key ingredients">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            A <strong>hash function</strong> that distributes keys across the available buckets.
          </li>
          <li>
            A <strong>collision strategy</strong> for when two keys land in the same bucket—usually
            chaining or open addressing.
          </li>
          <li>
            A <strong>load factor policy</strong> to decide when to resize the table and keep
            performance steady.
          </li>
        </ul>
      </TopicSection>

      <TopicSection heading="Quick reminders">
        <ul className="list-disc space-y-2 pl-5">
          <li>Always think about worst-case behaviour: poor hash functions can degrade to O(n).</li>
          <li>
            Hash sets store only keys; hash maps associate keys with values using the same machinery.
          </li>
          <li>
            When ordering matters, pair a hash table with a list or reach for a different structure.
          </li>
        </ul>
      </TopicSection>
    </TopicLayout>
  )
}
