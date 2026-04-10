import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Hashing popularized in search (1970s)',
    detail:
      'Rolling hashes introduced a way to compare substrings by numeric fingerprints instead of character-by-character scans.',
  },
  {
    title: 'Rabin and Karp publish the algorithm (1987)',
    detail:
      'They formalize a hash-based string search that can check many alignments quickly with rolling updates.',
  },
  {
    title: 'Used in plagiarism and document search (1990s)',
    detail:
      'Fingerprinting substrings enabled fast similarity detection and large-scale document comparison.',
  },
  {
    title: 'Modern use in deduplication and streaming (2000s+)',
    detail:
      'Chunking and content-defined fingerprints for storage systems rely on rolling hash ideas.',
  },
]

const mentalModels = [
  {
    title: 'Fingerprint each window',
    detail:
      'Compute a hash for the current text window and compare it to the pattern hash before doing an exact check.',
  },
  {
    title: 'Sliding window arithmetic',
    detail:
      'A rolling hash updates the window hash in O(1) by removing the old character and adding the new one.',
  },
  {
    title: 'Hash first, verify later',
    detail:
      'Hashes can collide, so a match on hash is only a candidate that must be verified with real comparison.',
  },
]

const coreComponents = [
  {
    heading: 'Rolling hash',
    bullets: [
      'Treat the window as a base-B number modulo M.',
      'Hash update: remove leading char contribution, multiply by base, add new char.',
      'Choose large prime modulus to reduce collisions.',
    ],
  },
  {
    heading: 'Window alignment',
    bullets: [
      'Slide a fixed-length window across the text.',
      'When window hash equals pattern hash, do a direct comparison.',
      'If the hashes differ, you skip character checks.',
    ],
  },
  {
    heading: 'Collision handling',
    bullets: [
      'Hash equality is not proof; verify to avoid false positives.',
      'Double hashing reduces collision probability.',
      'Worst-case degrades to O(n*m) if many collisions.',
    ],
  },
  {
    heading: 'Parameter choices',
    bullets: [
      'Base is often alphabet size or a random small integer.',
      'Modulus should fit in 64-bit arithmetic to avoid overflow.',
      'Precompute base^(m-1) for removing leading char.',
    ],
  },
]

const buildSteps = [
  {
    title: 'Pick base and modulus',
    detail: 'Choose a base (e.g., 256) and a large prime modulus; precompute base^(m-1) mod M.',
  },
  {
    title: 'Hash the pattern',
    detail: 'Compute the polynomial hash of the pattern of length m.',
  },
  {
    title: 'Hash the first window',
    detail: 'Compute the hash of text[0..m-1] using the same base and modulus.',
  },
  {
    title: 'Prepare rolling update',
    detail: 'Use the formula: newHash = (oldHash - lead*power) * base + newChar (mod M).',
  },
]

const matchSteps = [
  {
    title: 'Compare hashes',
    detail: 'If window hash equals the pattern hash, verify with direct character comparison.',
  },
  {
    title: 'Slide the window',
    detail: 'Update the hash in O(1) using the rolling formula and move one character forward.',
  },
  {
    title: 'Repeat to the end',
    detail: 'Each step does O(1) hash work plus occasional verification.',
  },
  {
    title: 'Report matches',
    detail: 'When verification succeeds, the window start index is a match.',
  },
]

const complexityNotes = [
  {
    title: 'Average time',
    detail:
      'Expected O(n + m) with good hash choices; most windows are discarded by hash mismatch.',
  },
  {
    title: 'Worst-case time',
    detail: 'O(n*m) when many hash collisions or adversarial input.',
  },
  {
    title: 'Memory cost',
    detail: 'O(1) beyond the pattern and a few constants.',
  },
  {
    title: 'Good for many patterns',
    detail: 'Multiple pattern hashes can be compared quickly for the same window length.',
  },
]

const realWorldUses = [
  {
    context: 'Plagiarism detection',
    detail: 'Fingerprinting substrings helps compare large documents efficiently.',
  },
  {
    context: 'Deduplication systems',
    detail: 'Rolling hashes locate chunk boundaries and detect repeated blocks in storage.',
  },
  {
    context: 'Search in large logs',
    detail: 'Quickly reject non-matching windows before performing heavier checks.',
  },
  {
    context: 'Multimatch with same length',
    detail:
      'If many patterns have equal length, compare window hash against a set of pattern hashes.',
  },
]

const examples = [
  {
    title: 'Rolling hash setup',
    code: `// Pseudocode
function hashOf(s, base, mod):
    h = 0
    for ch in s:
        h = (h * base + code(ch)) % mod
    return h`,
    explanation:
      'Polynomial rolling hash treats the string like a base-B number in modular arithmetic.',
  },
  {
    title: 'Rabin-Karp search',
    code: `// Pseudocode
function search(text, pattern):
    m = pattern.length
    base = 256
    mod = 1_000_000_007
    power = pow(base, m - 1) % mod
    patHash = hashOf(pattern, base, mod)
    winHash = hashOf(text[0..m-1], base, mod)
    for i in 0..text.length - m:
        if winHash == patHash and text[i..i+m-1] == pattern:
            report(i)
        if i < text.length - m:
            lead = code(text[i])
            next = code(text[i + m])
            winHash = (winHash - lead * power) % mod
            if winHash < 0: winHash += mod
            winHash = (winHash * base + next) % mod`,
    explanation:
      'Hashes filter candidates; direct comparison confirms matches to avoid collision errors.',
  },
  {
    title: 'Double hashing',
    code: `// Use two moduli to reduce collisions
if hash1 == patHash1 and hash2 == patHash2:
    verify characters`,
    explanation: 'Two independent hashes drastically reduce collision probability in practice.',
  },
]

const pitfalls = [
  'Skipping verification after hash match; collisions can cause false positives.',
  'Using a small modulus or base that increases collision probability.',
  'Forgetting to normalize negative values after subtraction in modular arithmetic.',
  'Applying Rabin-Karp for many different pattern lengths without rehashing.',
  'Assuming worst-case is linear; adversarial inputs can still degrade performance.',
]

const decisionGuidance = [
  'Need fast average-case single-pattern search with a simple implementation.',
  'Searching for many equal-length patterns in the same text.',
  'You can tolerate probabilistic hashing and verify matches.',
  'Input is huge and you want to filter most windows quickly.',
  'If worst-case guarantees are required, prefer KMP.',
]

const advancedInsights = [
  {
    title: 'Content-defined chunking',
    detail:
      'Rolling hashes can detect boundaries based on hash properties, enabling block-level deduplication.',
  },
  {
    title: 'Unicode and large alphabets',
    detail:
      'Map code points consistently; consider hashing bytes after normalization for stability.',
  },
  {
    title: 'Modular arithmetic safety',
    detail:
      'Use 64-bit integers or bigint to prevent overflow when computing (hash * base + char).',
  },
  {
    title: 'Hybrid strategies',
    detail:
      'Use Rabin-Karp to filter candidates, then switch to KMP or direct compare for verification.',
  },
]

const takeaways = [
  'Rabin-Karp uses rolling hashes to compare many alignments quickly.',
  'It is fast on average but needs verification to avoid collision errors.',
  'Choosing base and modulus well is critical to reliability.',
  'Great for equal-length multi-pattern search and large-scale filtering.',
]

const quickGlossary = [
  {
    term: 'Rolling hash',
    definition:
      'A hash that can be updated in O(1) when the window slides by removing the old leading character and adding the new trailing character.',
  },
  {
    term: 'Window alignment',
    definition:
      'One candidate substring position in the text where the pattern-length window is currently placed.',
  },
  {
    term: 'Candidate match',
    definition:
      'A window whose hash equals the pattern hash and therefore requires direct verification.',
  },
  {
    term: 'Collision',
    definition:
      'A case where different substrings produce the same hash value, which is why Rabin-Karp must verify matches.',
  },
  {
    term: 'Base',
    definition:
      'The multiplier used in the polynomial hash, often chosen near the alphabet size or as a small random integer.',
  },
  {
    term: 'Modulus',
    definition:
      'The number used to keep hash values bounded; a large prime is typically chosen to reduce collisions.',
  },
  {
    term: 'Double hashing',
    definition: 'Using two independent hashes so that a collision in both is much less likely.',
  },
  {
    term: 'Verification',
    definition:
      'The exact character-by-character comparison performed after a hash match to confirm a real occurrence.',
  },
  {
    term: 'Content-defined chunking',
    definition:
      'A storage technique that uses rolling hash properties to decide chunk boundaries for deduplication.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-components', label: 'Core Components' },
    { id: 'core-setup', label: 'Hash Setup Workflow' },
    { id: 'core-matching', label: 'Matching Workflow' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-when', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-walkthrough', label: 'Search Walkthrough' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function RabinKarpPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Rabin-Karp',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Rabin-Karp"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Rabin-Karp</h1>
      <p>
        Rabin-Karp compares substrings by hash instead of direct character checks. A rolling hash
        lets the algorithm slide a window across the text in O(1) per step, only verifying actual
        characters when hashes match.
      </p>
      <p>
        This page keeps the material as a help document: use the tabs to switch sections, the
        contents pane to jump within the current tab, or return to the{' '}
        <Link to="/algoViz" className="rk-help-link">
          catalog
        </Link>
        .
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Rabin-Karp turns substring search into hash comparison. It precomputes a hash for the
              pattern and then uses a rolling hash to update the text window efficiently. Hash
              matches are candidates; direct comparison confirms true matches.
            </p>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <p>
              The base and modulus define the fingerprint. Good choices reduce collisions and keep
              hashing stable, which is why Rabin-Karp is fast on average but depends on good hashing
              to keep collisions rare.
            </p>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mental-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <section id="core-components" className="bin98-section">
            <h2 className="bin98-heading">Core Components</h2>
            {coreComponents.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section id="core-setup" className="bin98-section">
            <h2 className="bin98-heading">Hash Setup Workflow</h2>
            {buildSteps.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-matching" className="bin98-section">
            <h2 className="bin98-heading">Matching Workflow</h2>
            {matchSteps.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity and Tradeoffs</h2>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
          </section>

          <section id="core-applications" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="core-when" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            {examples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <pre>{example.code}</pre>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>

          <section id="ex-walkthrough" className="bin98-section">
            <h2 className="bin98-heading">Search Walkthrough</h2>
            <h3 className="bin98-subheading">Before the scan</h3>
            <ol>
              {buildSteps.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}:</strong> {item.detail}
                </li>
              ))}
            </ol>
            <h3 className="bin98-subheading">During the scan</h3>
            <ol>
              {matchSteps.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}:</strong> {item.detail}
                </li>
              ))}
            </ol>
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
