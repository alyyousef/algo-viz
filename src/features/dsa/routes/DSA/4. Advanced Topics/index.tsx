import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const overviewSections = [
  {
    title: 'What advanced topics are',
    body: 'Advanced Topics covers specialized algorithmic domains that sit beyond the standard interview core. These areas usually demand more modeling discipline, more mathematical or systems context, and more attention to failure modes than introductory data structure and algorithm patterns do.',
  },
  {
    title: 'Why this section exists',
    body: 'Once the basics are internalized, the next bottleneck is no longer just coding speed. It is domain recognition. Advanced problems often stop looking like generic arrays, graphs, and trees, and start looking like text indexing, modular arithmetic, geometric predicates, or concurrency control.',
  },
  {
    title: 'What makes them advanced',
    body: 'These topics usually combine several ideas at once: specialized data representations, nontrivial correctness proofs, stronger asymptotic tradeoffs, and implementation details where silent mistakes are common. The challenge is often less about syntax and more about choosing the right abstraction boundary.',
  },
  {
    title: 'How to approach them',
    body: 'Treat each domain as a toolkit rather than a list of named algorithms. Learn the core predicates, the canonical preprocessing steps, the standard asymptotic improvements, and the domain-specific bugs that break otherwise correct-looking code.',
  },
]

const historicalContext = [
  {
    title: 'Text processing became an indexing problem',
    detail:
      'String algorithms evolved as naive substring scanning stopped scaling. Prefix functions, suffix arrays, automata, and compressed indexes turned text from an opaque byte stream into a searchable structure.',
  },
  {
    title: 'Mathematics became an algorithmic runtime lever',
    detail:
      'Number theory and algebra moved from pure theory into practical software through cryptography, transforms, and modular arithmetic. Mathematical structure often replaces brute force with exact, provable shortcuts.',
  },
  {
    title: 'Geometry matured through robustness concerns',
    detail:
      'Computational geometry proved that asymptotic improvements are useless if geometric predicates are numerically unstable. The field became as much about reliable orientation and intersection tests as about hulls and sweeps.',
  },
  {
    title: 'Concurrency made correctness temporal',
    detail:
      'Systems and concurrency topics added a new dimension: an algorithm can be logically correct in isolation and still fail under interleavings, contention, or weak memory ordering. That changes both design and proof obligations.',
  },
]

const domainSurvey = [
  {
    name: 'String Algorithms',
    focus:
      'Pattern matching, indexing, substring queries, automata, suffix-based data structures, rolling hashes, and text normalization.',
    value:
      'This domain turns repeated text work into preprocessing and index lookups, making large-scale search practical.',
    route: '/dsa/4-advanced-topics/1-string-algorithms',
  },
  {
    name: 'Mathematical Algorithms',
    focus:
      'Number theory, modular arithmetic, combinatorics, matrix methods, transforms, primality, and exact counting identities.',
    value:
      'This domain replaces brute force with algebraic structure, reducing runtime and preserving correctness under large numeric constraints.',
    route: '/dsa/4-advanced-topics/2-mathematical-algorithms',
  },
  {
    name: 'Computational Geometry',
    focus:
      'Orientation, intersection, convex hulls, sweep lines, spatial decomposition, and robust floating or exact arithmetic.',
    value:
      'This domain converts spatial reasoning into reliable predicates and efficient event-driven structure.',
    route: '/dsa/4-advanced-topics/3-computational-geometry',
  },
  {
    name: 'Systems and Concurrency',
    focus:
      'Synchronization, memory ordering, progress guarantees, lock-free design, pipelines, ownership, and contention control.',
    value:
      'This domain is about maintaining correctness while multiple threads, cores, or stages interact under realistic scheduling and hardware behavior.',
    route: '/dsa/4-advanced-topics/4-systems-and-concurrency',
  },
]

const whyTheseTopicsMatter = [
  'They appear when plain textbook solutions stop meeting scale, latency, or correctness requirements.',
  'They force stronger engineering discipline because hidden assumptions break quickly under large inputs or hostile conditions.',
  'They teach reusable mental models: preprocessing vs query time, exactness vs approximation, robustness vs speed, and ownership vs contention.',
  'They connect algorithm design to real systems domains such as search, cryptography, GIS, scientific computing, and concurrent infrastructure.',
  'They are where implementation details often become part of the correctness proof rather than an afterthought.',
]

const topicSignals = [
  {
    title: 'Use String Algorithms when the input is text-like',
    body: 'If the workload revolves around substrings, lexicons, repeated pattern search, text similarity, or reusable indexes over large corpora, plain scanning is usually too weak. The right abstraction is often a matcher, automaton, suffix structure, or rolling hash.',
  },
  {
    title: 'Use Mathematical Algorithms when arithmetic structure dominates',
    body: 'If the problem statement mentions divisibility, congruences, combinations, recurrences, polynomial multiplication, or huge numeric constraints, the real solution may be algebraic rather than iterative.',
  },
  {
    title: 'Use Computational Geometry when coordinates are not just data, but logic',
    body: 'If correctness depends on relative position, angle, intersection, containment, or distance relationships, geometry predicates become the foundation and data structures build on top of them.',
  },
  {
    title: 'Use Systems and Concurrency when correctness depends on interaction timing',
    body: 'If multiple actors access shared state, or if throughput depends on work partitioning, queues, or backpressure, sequential reasoning is no longer sufficient and memory-model-aware design becomes necessary.',
  },
]

const engineeringThemes = [
  {
    title: 'Preprocessing buys predictable queries',
    body: 'String indexes, sieves, prefix structures, suffix arrays, and geometric search structures all shift work upfront so repeated queries stay fast and stable.',
  },
  {
    title: 'Representation changes feasibility',
    body: 'Compressed indexes, modular forms, event queues, sweep-line states, and shard ownership models are all examples where the right representation matters as much as the algorithmic loop.',
  },
  {
    title: 'Proof and implementation are tightly coupled',
    body: 'These domains are unforgiving. A bad epsilon policy, weak collision discipline, incorrect modulus normalization, or missing acquire-release edge can invalidate an otherwise elegant algorithm.',
  },
  {
    title: 'Tradeoffs are multidimensional',
    body: 'Time and space are not the only axes. You often trade exactness for speed, determinism for expected behavior, robustness for performance, or ease of reasoning for peak throughput.',
  },
]

const keyTakeaways = [
  'Advanced Topics is organized by domain-specific structure, not by one generic algorithm family.',
  'The right question is usually not "which algorithm do I remember?" but "what kind of object am I reasoning about: text, numbers, space, or interacting threads?"',
  'Robustness details are part of the solution in these topics, not optional cleanup.',
  'Preprocessing, representation choice, and proof discipline are the recurring themes across the whole section.',
  'These topics become manageable once you recognize the small set of core primitives each domain is built on.',
]

const coreFoundations = [
  {
    title: 'String foundations',
    body: 'Core primitives include normalization, prefix-based reuse, failure links, suffix ordering, and collision-aware hashing. If you cannot define the alphabet, encoding policy, and text canonicalization, you are not ready to build the higher-level algorithm yet.',
  },
  {
    title: 'Mathematical foundations',
    body: 'Core primitives include gcd and extended gcd, modular exponentiation, inverses, sieves, combinatorial precomputation, and transform-based convolution. Much of the domain is about choosing the correct identity before writing any code.',
  },
  {
    title: 'Geometric foundations',
    body: 'Core primitives include orientation tests, on-segment tests, distance and projection logic, and careful handling of degeneracies. Most geometry algorithms stand on a small number of predicates that must be trusted completely.',
  },
  {
    title: 'Concurrency foundations',
    body: 'Core primitives include ownership boundaries, synchronization edges, progress guarantees, queueing, and memory reclamation. The hard part is often not the data structure itself, but the rules that govern visibility and safe handoff.',
  },
]

const proofObligations = [
  {
    title: 'Text algorithms need deterministic matching semantics',
    body: 'You must know whether your search is exact, normalized, case folded, token aware, or collision verified. Ambiguous matching semantics produce bugs that survive tests and fail on production corpora.',
  },
  {
    title: 'Mathematical algorithms need identity-level correctness',
    body: 'The proof is often an algebraic statement: why an inverse exists, why a transform is exact under the chosen modulus, why CRT reconstruction is valid, or why a recurrence collapses under matrix exponentiation.',
  },
  {
    title: 'Geometry needs robust predicates',
    body: 'The proof frequently assumes exact orientation or intersection behavior. If floating comparisons are inconsistent, the implementation breaks the theorem even when the high-level algorithm is correct.',
  },
  {
    title: 'Concurrency needs happens-before reasoning',
    body: 'Correctness is no longer just about state values. It is about which writes become visible to which readers, in what order, and under what synchronization contract.',
  },
]

const commonFailureModes = [
  {
    title: 'String algorithms',
    body: 'Typical failures include Unicode mishandling, rolling-hash collisions treated as exact matches, off-by-one substring boundaries, and memory-heavy index structures that look good asymptotically but fail operationally.',
  },
  {
    title: 'Mathematical algorithms',
    body: 'Typical failures include modulus mismatch, overflow during multiplication, assuming inverses exist when they do not, mishandling non-coprime CRT cases, and applying a theorem outside its valid domain.',
  },
  {
    title: 'Computational geometry',
    body: 'Typical failures include unstable epsilon comparisons, unhandled collinearity, incorrect boundary inclusion policy, and assuming the same geometric logic works unchanged from 2D to 3D.',
  },
  {
    title: 'Systems and concurrency',
    body: 'Typical failures include data races, unsafe memory reclamation, assuming atomicity implies visibility, lock contention on global hot paths, and designs that benchmark well in isolation but collapse under real scheduler behavior.',
  },
]

const comparisons = [
  {
    title: 'Advanced topics versus core algorithms',
    body: 'Core algorithms teach general-purpose patterns. Advanced topics teach domain-specific structure. The difference is not that advanced topics are magically harder, but that they require you to model the domain correctly before the standard algorithmic moves even become visible.',
  },
  {
    title: 'Preprocessing-heavy versus on-the-fly solutions',
    body: 'String indexing, sieves, lookup tables, and spatial structures invest in build time and memory to reduce per-query cost. This is appropriate only when queries or repeated tasks justify the up-front cost.',
  },
  {
    title: 'Exactness versus robustness',
    body: 'Mathematical algorithms often demand exact correctness. Geometry and concurrency add a different axis: even a theoretically exact algorithm can fail because arithmetic or memory-ordering behavior is not represented faithfully in code.',
  },
  {
    title: 'Single-input reasoning versus environment-aware reasoning',
    body: 'In strings and math, correctness often depends mostly on the input. In concurrency and systems, correctness depends on environment behavior as well: scheduling, contention, memory model, and lifecycle management.',
  },
]

const studyChecklist = [
  'Learn the domain primitives before memorizing named algorithms.',
  'Practice recognizing the input shape that triggers each topic family.',
  'Treat preprocessing cost, query cost, and memory cost as separate design dimensions.',
  'Write down the main failure mode for the domain before implementing.',
  'Prefer exact or centralized predicate logic in geometry and exact normalization rules in strings.',
  'Document arithmetic assumptions explicitly in mathematical code.',
  'Document ownership, synchronization, and reclamation assumptions explicitly in concurrent code.',
]

const workedExamples = [
  {
    id: 'ex-strings',
    title: 'String Algorithms Example: Multi-Pattern Search',
    domain: 'String Algorithms',
    intro:
      'Suppose a service must scan a text stream for thousands of banned terms. Re-running a one-pattern matcher for each term is wasteful. The right abstraction is to compile the dictionary into an automaton and scan the text once.',
    whyFit:
      'This is the kind of workload where preprocessing dominates and per-character streaming cost matters more than a one-off search loop.',
    code: `build trie for all patterns
build failure links

state = root
for ch in text:
  while state has no transition on ch and state != root:
    state = failure[state]
  if transition exists:
    state = next(state, ch)
  emit every pattern ending at state`,
    takeaway:
      'Advanced string work is often about converting repeated scanning into one compiled structure plus one pass through the text.',
  },
  {
    id: 'ex-math',
    title: 'Mathematical Algorithms Example: Fast Modular Power',
    domain: 'Mathematical Algorithms',
    intro:
      'When exponents are large, repeated multiplication is too slow and too dangerous numerically. Binary exponentiation reduces the operation count logarithmically while staying inside a chosen modulus.',
    whyFit:
      'The problem is fundamentally arithmetic, and the main speedup comes from an algebraic decomposition of the exponent rather than a data-structure trick.',
    code: `powMod(base, exp, mod):
  result = 1
  base = base % mod

  while exp > 0:
    if exp is odd:
      result = (result * base) % mod
    base = (base * base) % mod
    exp = exp // 2

  return result`,
    takeaway:
      'Mathematical algorithms frequently replace linear repetition with a structural identity that cuts the runtime immediately.',
  },
  {
    id: 'ex-geometry',
    title: 'Computational Geometry Example: Segment Intersection',
    domain: 'Computational Geometry',
    intro:
      'A geometry task often reduces to trusted predicates. To determine whether two line segments intersect, orientation and boundary checks are the real algorithm; everything else is case management around those tests.',
    whyFit:
      'This is representative of the field because correctness comes from robust predicates, not from a long high-level algorithm.',
    code: `o1 = orient(a, b, c)
o2 = orient(a, b, d)
o3 = orient(c, d, a)
o4 = orient(c, d, b)

if o1 and o2 differ and o3 and o4 differ:
  return true

check collinear boundary cases explicitly
return false`,
    takeaway:
      'Geometry becomes manageable when you identify the small set of predicates that every larger algorithm depends on.',
  },
  {
    id: 'ex-concurrency',
    title: 'Systems and Concurrency Example: Producer-Consumer Handoff',
    domain: 'Systems and Concurrency',
    intro:
      'A producer writes data and then signals availability. A consumer waits for the signal and then reads the data. The subtlety is not the flag itself, but ensuring the data write becomes visible before the consumer trusts the flag.',
    whyFit:
      'This is the core shape of concurrent reasoning: a state transition is not enough unless the visibility contract is also correct.',
    code: `Producer:
payload = makeData()
ready.store(true, release)

Consumer:
if ready.load(acquire):
  use(payload)`,
    takeaway:
      'Concurrent code is often about establishing correct visibility edges, not just protecting one variable.',
  },
]

const glossary = [
  {
    term: 'Normalization',
    definition:
      'A deterministic policy for representing logically equivalent text or values in one canonical form.',
  },
  {
    term: 'Failure link',
    definition:
      'In string automata, a fallback edge that describes where matching should continue after a mismatch.',
  },
  {
    term: 'Suffix structure',
    definition:
      'An index built from sorted or linked suffixes of a string, used for efficient substring search.',
  },
  {
    term: 'Modulus discipline',
    definition:
      'The practice of keeping every arithmetic operation consistent with one clearly defined modulus and inverse policy.',
  },
  {
    term: 'Transform',
    definition:
      'A change of representation, such as FFT or NTT, that makes a hard operation like convolution easier to compute.',
  },
  {
    term: 'Predicate',
    definition:
      'A basic true-or-false geometric or logical test, such as orientation, intersection, or containment.',
  },
  {
    term: 'Degeneracy',
    definition:
      'A special geometric configuration such as collinearity, overlap, or duplicate points that requires explicit handling.',
  },
  {
    term: 'Happens-before',
    definition:
      "A concurrency relation stating that one operation's effects must be visible to another.",
  },
  {
    term: 'Backpressure',
    definition:
      'A mechanism that prevents producers from overwhelming slower consumers in pipelines or queues.',
  },
  {
    term: 'Ownership',
    definition:
      'A rule defining which thread, component, or stage is responsible for mutating a piece of state.',
  },
  {
    term: 'Contention',
    definition:
      'Competition among threads or operations for the same resource, often causing stalls or serialization.',
  },
  {
    term: 'Robustness',
    definition:
      'The ability of an algorithm to preserve correctness under edge cases, numerical issues, and real runtime conditions.',
  },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'adv-overview', label: 'Overview' },
    { id: 'adv-why', label: 'Why This Section Matters' },
    { id: 'adv-history', label: 'Historical Context' },
    { id: 'adv-survey', label: 'Domain Survey' },
    { id: 'adv-themes', label: 'Shared Engineering Themes' },
    { id: 'adv-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'adv-signals', label: 'Topic Signals' },
    { id: 'adv-foundations', label: 'Foundations' },
    { id: 'adv-proofs', label: 'Proof Obligations' },
    { id: 'adv-failures', label: 'Failure Modes' },
    { id: 'adv-compare', label: 'Compare and Contrast' },
    { id: 'adv-checklist', label: 'Study Checklist' },
  ],
  examples: workedExamples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'adv-glossary', label: 'Terms' }],
}

export default function AdvancedTopicsPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Advanced Topics',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Advanced Topics"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Advanced Topics</h1>
      <p className="adv98-intro">
        This page is the top-level overview for the advanced part of the DSA material. It explains
        what these domains are, how to recognize them, what kind of correctness burden they impose,
        and how the major subareas relate to one another.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="adv-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="adv-why" className="bin98-section">
            <h2 className="bin98-heading">Why This Section Matters</h2>
            <ul>
              {whyTheseTopicsMatter.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="adv-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="adv-survey" className="bin98-section">
            <h2 className="bin98-heading">Domain Survey</h2>
            {domainSurvey.map((item) => (
              <div key={item.name}>
                <h3 className="bin98-subheading">{item.name}</h3>
                <p>{item.focus}</p>
                <p>{item.value}</p>
                <p>
                  <Link to={item.route} className="adv98-inline-link">
                    Open {item.name}
                  </Link>
                </p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="adv-themes" className="bin98-section">
            <h2 className="bin98-heading">Shared Engineering Themes</h2>
            {engineeringThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="adv-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="adv-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="adv-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="adv-proofs" className="bin98-section">
            <h2 className="bin98-heading">Proof Obligations</h2>
            {proofObligations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="adv-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {commonFailureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="adv-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="adv-checklist" className="bin98-section">
            <h2 className="bin98-heading">Study Checklist</h2>
            <ul>
              {studyChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          {workedExamples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>
                <strong>Domain:</strong> {example.domain}
              </p>
              <p>{example.intro}</p>
              <p>
                <strong>Why this topic fits:</strong> {example.whyFit}
              </p>
              <div className="bin98-codebox">
                <code>{example.code}</code>
              </div>
              <p>
                <strong>Takeaway:</strong> {example.takeaway}
              </p>
            </section>
          ))}
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="adv-glossary" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((entry) => (
            <p key={entry.term}>
              <strong>{entry.term}:</strong> {entry.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
