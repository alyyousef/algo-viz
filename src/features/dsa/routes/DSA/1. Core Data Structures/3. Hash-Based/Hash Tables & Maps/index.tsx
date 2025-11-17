import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const operations = [
  {
    title: 'Insert / Update',
    detail:
      'Hash the key, then either append a new entry to the bucket or update the existing slot. Everything happens in constant time once you hit the target index.',
  },
  {
    title: 'Lookup',
    detail:
      'Apply the same hash function, jump to the bucket, and scan only the small chain or probe sequence. Most lookups finish in O(1), though collisions can add a tiny scan.',
  },
  {
    title: 'Delete',
    detail:
      'Locate the key via hashing and remove it from the bucket or probe sequence, making sure to re-link chained nodes or re-mark probes so future searches still find their entries.',
  },
  {
    title: 'Resize / rehash',
    detail:
      'When load factors climb, grow the bucket array (usually to a prime or power-of-two size) and reinsert every entry so future hashes keep spreading evenly.',
  },
]

const strategies = [
  {
    title: 'Hash functions',
    detail:
      "Deterministic but unpredictable mixing of the key bits keeps hot keys from clustering. Choose well-tested mixers or use the language runtime's hash helpers so redistribution stays uniform.",
  },
  {
    title: 'Separate chaining',
    detail:
      'Each bucket stores a small list or tree of entries. Collisions degrade gracefully and you can cap bucket length with things like trees or small arrays.',
  },
  {
    title: 'Open addressing',
    detail:
      'Entries live directly in the bucket array. Probe sequences (linear, quadratic, double hashing) search nearby spots, making deletions trickier but memory tighter.',
  },
]

const winConditions = [
  'Need fast key -> value lookups without sorting the data.',
  'Work with dynamic sets where insertions and deletions occur frequently.',
  'Build caches, memoization maps, adjacency lists, or frequency counters.',
]

const checklist = [
  'Pick table sizes (and resize policies) that keep the load factor well below 1 for predictable performance.',
  'Beware of hash-equality collisions: always compare keys or fall back to identity when hashing cannot distinguish duplicates.',
  'Use immutable keys, or copy/memoize them before storing so their hash values cannot change while in the table.',
]

export default function HashTablesPage(): JSX.Element {
  return (
    <TopicLayout
      title="Hash Tables & Maps"
      subtitle="Average O(1) lookups, careful hash engineering"
      intro="Hash tables turn keys into bucket indexes so you can retrieve values without walking a tree or shifting an array. The constant-time promise depends on even spreading of keys and smart collision handling."
    >
      <TopicSection heading="How hash tables store data">
        <p>
          Every key goes through a hash function that returns an index inside the bucket array. When the bucket already holds entries, you either
          chain them together or probe for a nearby empty slot. Because lookups replay the same hash we use for insertion, locating a key only scans the
          bucket, not the entire table.
        </p>
        <p>
          The table remembers its size and load factor so you can grow the array when it becomes too crowded. Resizing rehashes every key, so keep this
          operation rare and schedule it for large jumps to minimize copies.
        </p>
      </TopicSection>

      <TopicSection heading="Core operations">
        <div className="grid gap-3 md:grid-cols-2">
          {operations.map((op) => (
            <article key={op.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{op.title}</h3>
              <p className="text-sm text-white/80">{op.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Hashing & collision strategies">
        <div className="grid gap-3 md:grid-cols-2">
          {strategies.map((strategy) => (
            <article
              key={strategy.title}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <p className="text-sm font-semibold text-white">{strategy.title}</p>
              <p className="text-sm text-white/80">{strategy.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="When hash tables shine">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          {winConditions.map((condition) => (
            <li key={condition}>{condition}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Checklist before reaching for a hash table">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
