import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const overviewSections = [
  {
    title: 'What applied domains are',
    body: 'Applied Domains is where algorithmic ideas stop living as isolated textbook patterns and start operating inside real systems. The questions become less about whether you know a named algorithm and more about whether you can map the problem to the right domain constraints: latency, durability, throughput, adversaries, physics, or noisy data.',
  },
  {
    title: 'Why this section exists',
    body: 'A core DSA toolbox is necessary but not sufficient for production engineering. Real domains reshape algorithm choices through workload shape, hardware limits, reliability targets, and user-visible failure modes. Applied domains teach how the same underlying ideas change once they become part of a larger system.',
  },
  {
    title: 'What changes in applied work',
    body: 'Complexity analysis still matters, but it is no longer the whole story. Tail latency, memory overhead, persistence guarantees, synchronization, observability, and recovery behavior often matter just as much as asymptotic runtime.',
  },
  {
    title: 'How to study this section',
    body: 'Each domain should be read as a stack of recurring constraints, core data structures, failure models, and tradeoffs. The goal is to learn the domain language well enough that the algorithmic shape becomes obvious when a practical system problem appears.',
  },
]

const historicalContext = [
  {
    title: 'Systems pressure created specialized patterns',
    detail:
      'Caching, indexes, schedulers, and distributed protocols did not appear because theory wanted variety. They appeared because simple solutions failed under real latency, concurrency, and durability demands.',
  },
  {
    title: 'Storage and networking made tradeoffs explicit',
    detail:
      'Databases, consensus systems, and file layouts forced engineers to reason in budgets: read amplification, write amplification, compaction debt, replication lag, quorum cost, and failure recovery time.',
  },
  {
    title: 'Domain-specific data changed the algorithms',
    detail:
      'Genome strings, game worlds, model-serving pipelines, and cryptographic proofs all require representations that differ sharply from general-purpose array or graph examples, even when the core algorithmic ideas are recognizable underneath.',
  },
  {
    title: 'Engineering correctness became context-dependent',
    detail:
      'Correctness in applied domains is often conditional: correct under packet loss, correct after crashes, correct under stale cache entries, correct under floating-point noise, correct under adversarial input, or correct under repeated retries.',
  },
]

const domainSurvey = [
  {
    name: 'Systems Design and Architecture',
    focus:
      'Caching, sharding, consistency patterns, rate control, storage tiers, and operational tradeoffs.',
    value:
      'This domain teaches how to turn algorithmic thinking into service-level behavior under bursty traffic and mixed workloads.',
    route: '/dsa/5-applied-domains/1-systems-design-and-architecture',
  },
  {
    name: 'Database and Indexing',
    focus:
      'B+ trees, LSM trees, write-ahead logs, indexes, compaction, and read-write amplification budgets.',
    value:
      'This domain is about making data durable, queryable, and fast under real storage constraints.',
    route: '/dsa/5-applied-domains/2-database-and-indexing-b-trees-lsm-trees',
  },
  {
    name: 'OS and Kernel',
    focus:
      'Scheduling, paging, memory management, locality, fairness, preemption, and overload behavior.',
    value:
      'This domain shows how runtime behavior depends on CPU time, memory residency, and isolation rather than just user-space logic.',
    route: '/dsa/5-applied-domains/3-os-and-kernel-scheduling-memory-mgmt',
  },
  {
    name: 'Network and Distributed Algorithms',
    focus:
      'Retries, pacing, routing, quorums, consensus, partial failure, and observability-aware protocols.',
    value:
      'This domain explains how to keep systems correct when the network drops, delays, duplicates, or reorders reality.',
    route: '/dsa/5-applied-domains/4-network-and-distributed-algorithms',
  },
  {
    name: 'Cryptography',
    focus:
      'Hashing, signatures, key exchange, authenticated data structures, proofs, and threat-model-aware design.',
    value: 'This domain is about turning mathematical hardness into verifiable safety properties.',
    route: '/dsa/5-applied-domains/5-cryptography',
  },
  {
    name: 'Game Development',
    focus:
      'Pathfinding, navigation meshes, local avoidance, frame budgets, determinism, and crowd movement.',
    value:
      'This domain turns search and geometry into real-time decision making under strict latency budgets.',
    route: '/dsa/5-applied-domains/6-game-development-pathfinding-etc',
  },
  {
    name: 'AI and ML',
    focus:
      'Search, heuristics, model serving, graph neural networks, evaluation, and budget-aware inference.',
    value:
      'This domain combines classical search with learned representations and operational safety constraints.',
    route: '/dsa/5-applied-domains/7-ai-and-ml-search-gnns-etc',
  },
  {
    name: 'Blockchain',
    focus:
      'Merkle trees, consensus, state commitments, data availability, and deterministic replay.',
    value:
      'This domain blends distributed systems, cryptography, and economic incentives into verifiable state machines.',
    route: '/dsa/5-applied-domains/8-blockchain-merkle-trees-etc',
  },
  {
    name: 'Bioinformatics',
    focus:
      'Suffix arrays, FM-indexes, alignment, scoring, reference fidelity, and reproducible pipelines.',
    value:
      'This domain applies advanced string algorithms and dynamic programming to noisy biological data at massive scale.',
    route: '/dsa/5-applied-domains/9-bioinformatics-suffix-arrays-etc',
  },
]

const whyAppliedDomainsMatter = [
  'They expose the real constraints that production systems operate under: timeouts, crashes, skew, noise, and hardware limits.',
  'They force you to combine multiple algorithmic ideas rather than selecting one textbook pattern in isolation.',
  'They teach workload-driven design instead of one-size-fits-all complexity arguments.',
  'They make failure handling part of the primary design, not an afterthought.',
  'They explain why many engineering decisions are really algorithmic tradeoffs dressed in domain language.',
]

const engineeringThemes = [
  {
    title: 'Workload first',
    body: 'Applied domains usually start by characterizing the workload: read-heavy versus write-heavy, low-latency versus high-throughput, exact versus approximate, interactive versus batch, adversarial versus cooperative. The wrong workload model invalidates otherwise excellent algorithms.',
  },
  {
    title: 'Persistence, locality, and visibility matter',
    body: 'Algorithms do not run in empty space. They hit disks, caches, queues, NUMA nodes, networks, and replicas. Real performance often comes from locality and disciplined state visibility rather than pure operation counts.',
  },
  {
    title: 'Failure models shape design',
    body: 'In distributed systems the failure is packet loss or split brain. In storage it is torn writes or compaction debt. In ML it is drift or leakage. In games it is frame spikes. In bioinformatics it is noisy reads and reference mismatch. Domain design begins by naming the likely failures.',
  },
  {
    title: 'Observability is part of the algorithm',
    body: 'You cannot tune caches without hit-rate data, networks without retransmit and latency data, schedulers without run-queue and residency data, or ML serving without drift and calibration signals. Monitoring is not separate from the design; it closes the loop.',
  },
]

const keyTakeaways = [
  'Applied domains are where algorithms inherit real-world constraints and become engineering decisions.',
  'The recurring design move is to start from workload shape and failure model, not from a memorized algorithm name.',
  'Tail behavior, correctness under failure, and operational visibility often matter as much as average-case complexity.',
  'Most applied solutions are layered: data structure, protocol, workload assumptions, and recovery strategy all interact.',
  'Once you recognize the domain, the relevant algorithms and tradeoffs become much easier to predict.',
]

const topicSignals = [
  {
    title: 'Systems Design and Architecture',
    body: 'Choose this lens when the main challenge is service behavior under scale: cache tiers, fanout, consistency tradeoffs, hot keys, admission control, or keeping a backend alive under burst traffic.',
  },
  {
    title: 'Database and Indexing',
    body: 'Choose this lens when performance depends on page layout, indexes, range scans, write paths, WAL discipline, or balancing read, write, and space amplification.',
  },
  {
    title: 'OS and Kernel',
    body: 'Choose this lens when latency or throughput depends on scheduling, preemption, page faults, allocator behavior, NUMA locality, or CPU isolation.',
  },
  {
    title: 'Network and Distributed Algorithms',
    body: 'Choose this lens when correctness depends on retries, timeouts, ordering, quorums, election stability, idempotence, or behavior under packet loss and partial failure.',
  },
  {
    title: 'Cryptography',
    body: 'Choose this lens when the problem involves adversaries, tamper evidence, authentication, integrity, secrecy, proofs, or trust minimization.',
  },
  {
    title: 'Game Development',
    body: 'Choose this lens when the system must plan and react under frame budgets, moving obstacles, deterministic simulation rules, and path quality constraints visible to players.',
  },
  {
    title: 'AI and ML',
    body: 'Choose this lens when search, ranking, inference latency, dataset quality, evaluation drift, and learned heuristics define the performance envelope.',
  },
  {
    title: 'Blockchain',
    body: 'Choose this lens when you need verifiable state transitions, consensus, authenticated histories, public auditability, and trust assumptions that can be checked rather than declared.',
  },
  {
    title: 'Bioinformatics',
    body: 'Choose this lens when you are matching or aligning noisy biological sequences against large references, balancing sensitivity, throughput, and reproducibility.',
  },
]

const coreFoundations = [
  {
    title: 'Source of truth and handoff discipline',
    body: 'Many applied systems depend on knowing exactly where truth lives and how it propagates. Caches, replicas, indexes, model snapshots, and state roots all require explicit rules for freshness, durability, or visibility.',
  },
  {
    title: 'Budget-aware design',
    body: 'Every domain has a budget that dominates implementation choices: p99 latency, memory residency, compaction IO, packet retransmits, proof size, frame time, GPU memory, or sequencing turnaround time.',
  },
  {
    title: 'Operationally meaningful invariants',
    body: 'The important invariants are often domain-specific: no stale leader may commit, no unverified hash match may be trusted, no page may be acknowledged before WAL durability, no agent may overspend the frame budget, no pipeline run may become unreproducible.',
  },
  {
    title: 'Recovery and rollback paths',
    body: 'An applied design is incomplete if it only explains the happy path. You also need to know what happens after a crash, timeout, rollback, stale read, desync, or contaminated batch.',
  },
]

const proofObligations = [
  {
    title: 'Systems and storage proofs',
    body: 'You often need ordering guarantees: write-ahead logging before visibility, invalidation before stale serve windows close, compaction or checkpoint metadata that permits correct recovery, and isolation rules that preserve source-of-truth semantics.',
  },
  {
    title: 'Distributed and concurrent proofs',
    body: 'The proof is frequently about ordering, quorum intersection, retry safety, or happens-before relationships rather than a simple function from input to output.',
  },
  {
    title: 'Cryptographic and blockchain proofs',
    body: 'The proof is usually reduction-based or commitment-based: why a signature authenticates, why a Merkle proof binds membership, why a consensus threshold prevents conflicting finalized states, or why a proof system really verifies the claimed computation.',
  },
  {
    title: 'Data and model pipeline proofs',
    body: 'In AI/ML and bioinformatics, correctness includes reproducibility and evaluation hygiene. Leakage, reference mismatch, or untracked parameters can invalidate a result even when the code runs exactly as written.',
  },
]

const commonFailureModes = [
  {
    title: 'Tail-latency blindness',
    body: 'Averages hide the practical failures. Systems often pass benchmarks while failing users because p95 or p99 behavior is dominated by queueing, retries, compaction, paging, or cold caches.',
  },
  {
    title: 'Correct algorithm, wrong environment model',
    body: 'A design can be theoretically sound yet operationally wrong because it assumes stable clocks, no packet reordering, uniform key distributions, perfect floating arithmetic, or static workloads.',
  },
  {
    title: 'Broken recovery semantics',
    body: 'If the crash path is underspecified, the algorithm is unfinished. WAL ordering, replay safety, checkpoint validity, idempotent handlers, and reproducible restarts are all part of correctness.',
  },
  {
    title: 'Mismatched cost model',
    body: 'Optimizing the wrong resource produces fragile systems: reducing average CPU while exploding memory, minimizing writes while creating read fanout, or improving top-1 accuracy while violating serving latency.',
  },
  {
    title: 'Unobserved drift',
    body: 'Workloads, traffic mixes, graph structure, model inputs, and biological references all change. A design with no feedback loop silently decays.',
  },
]

const comparisons = [
  {
    title: 'Applied domains versus advanced topics',
    body: 'Advanced topics organize around specialized algorithmic structures such as strings, geometry, or concurrency. Applied domains organize around real-world settings where those structures appear under operational pressure.',
  },
  {
    title: 'Core algorithms versus production behavior',
    body: 'A shortest-path algorithm, hash table, or balanced tree is rarely the full production answer. Applied domains add durability, retries, observability, access control, batching, and resource ceilings on top of the core data structure or search routine.',
  },
  {
    title: 'Optimality versus service-level usefulness',
    body: 'In many applied problems, the best practical algorithm is not the most theoretically elegant one. A slightly weaker answer that fits p99 latency, memory, and recovery budgets may be the correct engineering choice.',
  },
  {
    title: 'Domain logic versus platform behavior',
    body: 'A design may look correct at the application level while failing because of storage layout, cache hierarchy, NUMA traffic, network retries, or scheduler interference. Applied work forces both layers to be modeled together.',
  },
]

const studyChecklist = [
  'Identify the domain first, then name the primary workload and failure model.',
  'Write down what the system must optimize: throughput, p99 latency, durability, accuracy, fairness, or reproducibility.',
  'Find the source of truth and describe how derived state stays valid.',
  'List the dominant amplification or overhead budget in the domain.',
  'Describe what happens on retry, restart, or crash.',
  'Decide what must be measured continuously in production.',
  'Treat domain-specific edge cases as part of the main algorithm, not post-processing.',
]

const workedExamples = [
  {
    id: 'ex-cache',
    title: 'Systems Design Example: Cache-Aside Read Path',
    domain: 'Systems Design and Architecture',
    intro:
      'A product page endpoint is read-heavy and backed by a slower primary store. A near-cache can cut latency dramatically, but only if the miss path, invalidation policy, and source-of-truth contract are explicit.',
    whyFit:
      'The core challenge is not just lookup time. It is balancing latency, load shedding, and staleness risk under a realistic traffic pattern.',
    code: `value = cache.get(key)
if value exists:
  return value

value = database.read(key)
cache.set(key, value, ttl)
return value`,
    takeaway:
      'Applied systems work starts once the cache hit path is written: consistency, invalidation, TTL policy, and hot-key behavior decide whether the design actually holds.',
  },
  {
    id: 'ex-index',
    title: 'Database Example: WAL Before Visibility',
    domain: 'Database and Indexing',
    intro:
      "An indexed write should not become visible until the recovery path is defined. The typical discipline is append to WAL first, then update in-memory state, then flush or checkpoint later under the engine's protocol.",
    whyFit:
      'The hard part is durability ordering and crash recovery, not just inserting a key into a tree or memtable.',
    code: `append log record to WAL
fsync if policy requires durability now
apply write to memtable or page cache
acknowledge write according to durability mode`,
    takeaway: 'Storage algorithms are inseparable from their persistence protocol.',
  },
  {
    id: 'ex-retry',
    title: 'Distributed Systems Example: Idempotent Retry Handler',
    domain: 'Network and Distributed Algorithms',
    intro:
      'Retries are mandatory in unreliable networks, but they are safe only if the receiver can detect duplicates or replay the same effect without double-applying it.',
    whyFit:
      'The domain is defined by packet loss, timeout uncertainty, and the need to stay correct under duplicated requests.',
    code: `if requestId already processed:
  return stored response

result = apply operation once
store response by requestId
return result`,
    takeaway:
      'In networked systems, retry safety is not a feature add-on. It is part of the base algorithm.',
  },
  {
    id: 'ex-nav',
    title: 'Game Development Example: Navmesh Path Plus Local Avoidance',
    domain: 'Game Development',
    intro:
      'A game agent needs a plausible route to a goal and also needs to avoid moving characters without replanning globally every frame. The solution is usually layered: global planning on navigation data plus local steering.',
    whyFit:
      'The applied constraint is frame budget. You need path quality and responsiveness without spending unbounded CPU every update.',
    code: `globalPath = navmeshAStar(start, goal)
smoothedPath = funnel(globalPath)

each frame:
  desiredVelocity = steerToward(smoothedPath)
  actualVelocity = avoidNeighbors(desiredVelocity)
  move(actualVelocity)`,
    takeaway:
      'Real-time domains often split the problem into a stable global plan and a cheap local correction loop.',
  },
  {
    id: 'ex-ml',
    title: 'AI and ML Example: Retrieval Then Rerank',
    domain: 'AI and ML',
    intro:
      'A recommendation or search system may have millions of candidates. Serving a large model against every candidate is too expensive, so the pipeline usually uses a fast retrieval stage to narrow the set before applying a heavier ranker.',
    whyFit:
      'The domain is defined by budget-aware inference: latency and throughput shape the algorithmic decomposition.',
    code: `candidates = retrieveFast(queryEmbedding, index)
scored = rerankWithModel(query, candidates)
return topK(scored)`,
    takeaway:
      'In applied ML, the winning design is often a staged pipeline that spends computation where it changes outcomes the most.',
  },
]

const glossary = [
  {
    term: 'Source of truth',
    definition:
      'The component or dataset whose state is considered authoritative when derived copies disagree.',
  },
  {
    term: 'Tail latency',
    definition:
      'High-percentile response time, such as p95 or p99, which often dominates user experience in distributed systems.',
  },
  {
    term: 'Amplification',
    definition:
      'Extra read, write, or space cost incurred by a storage or indexing design beyond the logical operation itself.',
  },
  {
    term: 'Idempotence',
    definition:
      'A property where repeating the same operation does not change the final result after the first successful application.',
  },
  {
    term: 'Checkpoint',
    definition:
      'A durable snapshot marker that allows a system to recover without replaying all history from the beginning.',
  },
  {
    term: 'Compaction debt',
    definition:
      'Deferred background merge work in LSM-style systems that eventually harms read latency and storage efficiency if ignored.',
  },
  {
    term: 'Backpressure',
    definition:
      'A control mechanism that prevents producers from overwhelming slower consumers or downstream services.',
  },
  {
    term: 'Determinism',
    definition:
      'The property that the same input and state produce the same output across runs or nodes.',
  },
  {
    term: 'Threat model',
    definition:
      'An explicit statement of what adversaries can do, what they cannot do, and what security property must still hold.',
  },
  {
    term: 'Reproducibility',
    definition:
      'The ability to rerun a pipeline with the same data, parameters, and software versions and obtain the same result.',
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
    { id: 'app-overview', label: 'Overview' },
    { id: 'app-why', label: 'Why Applied Domains Matter' },
    { id: 'app-history', label: 'Historical Context' },
    { id: 'app-survey', label: 'Domain Survey' },
    { id: 'app-themes', label: 'Shared Engineering Themes' },
    { id: 'app-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'app-signals', label: 'Topic Signals' },
    { id: 'app-foundations', label: 'Foundations' },
    { id: 'app-proofs', label: 'Proof Obligations' },
    { id: 'app-failures', label: 'Failure Modes' },
    { id: 'app-compare', label: 'Compare and Contrast' },
    { id: 'app-checklist', label: 'Study Checklist' },
  ],
  examples: workedExamples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'app-glossary', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

const appliedDomainsStyles = `
.app98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.app98-window {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.app98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 28px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.app98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.app98-title-controls {
  display: inline-flex;
  gap: 2px;
}

.app98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.app98-control:focus-visible,
.app98-tab:focus-visible,
.app98-toc-link:focus-visible,
.app98-inline-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.app98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.app98-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b7b7b7;
  padding: 5px 10px 4px;
  font-size: 12px;
  line-height: 1.2;
  cursor: pointer;
}

.app98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.app98-main {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.app98-toc {
  overflow: auto;
  padding: 12px 12px 18px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.app98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.app98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.app98-toc-item + .app98-toc-item {
  margin-top: 8px;
}

.app98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.35;
}

.app98-content {
  overflow: auto;
  padding: 16px 22px 24px;
  background: #ffffff;
}

.app98-doc-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
}

.app98-intro {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
}

.app98-section {
  margin: 0 0 22px;
}

.app98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.app98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.app98-divider {
  margin: 14px 0 16px;
  border: 0;
  border-top: 1px solid #d4d4d4;
}

.app98-content p,
.app98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.app98-content p {
  margin: 0 0 10px;
}

.app98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.app98-content li + li {
  margin-top: 4px;
}

.app98-inline-link {
  color: #000080;
  text-decoration: underline;
}

.app98-codebox {
  margin: 8px 0 10px;
  padding: 8px 9px;
  background: #f3f3f3;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.app98-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .app98-main {
    grid-template-columns: 1fr;
  }

  .app98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .app98-title {
    font-size: 13px;
    max-width: calc(100% - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .app98-content {
    padding: 14px 14px 18px;
  }
}
`

export default function AppliedDomainsPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const requestedTab = searchParams.get('tab')
  const activeTab: TabId = isTabId(requestedTab) ? requestedTab : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(location.search)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Applied Domains (${activeTabLabel})`
  }, [activeTab, activeTabLabel, location.search, setSearchParams])

  const handleTabChange = (tab: TabId) => {
    if (tab === activeTab) {
      return
    }

    const nextParams = new URLSearchParams(location.search)
    nextParams.set('tab', tab)
    setSearchParams(nextParams)
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Applied Domains',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }

    void navigate('/algoViz')
  }

  return (
    <div className="app98-help-page">
      <style>{appliedDomainsStyles}</style>
      <div className="app98-window" role="presentation">
        <header className="app98-titlebar">
          <span className="app98-title">Applied Domains</span>
          <div className="app98-title-controls">
            <button
              className="app98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="app98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="app98-tabs" role="tablist" aria-label="Applied Domains Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`app98-tab ${activeTab === tab.id ? 'app98-tab-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="app98-main">
          <aside className="app98-toc" aria-label="Table of contents">
            <h2 className="app98-toc-title">Contents</h2>
            <ul className="app98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="app98-toc-item">
                  <a href={`#${section.id}`} className="app98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="app98-content">
            <h1 className="app98-doc-title">Applied Domains</h1>
            <p className="app98-intro">
              This page is the top-level overview for the applied part of the DSA material. It
              explains how core algorithms transform when they are embedded in storage engines,
              distributed systems, operating systems, games, ML pipelines, cryptographic protocols,
              and scientific workloads.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="app-overview" className="app98-section">
                  <h2 className="app98-heading">Overview</h2>
                  {overviewSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="app98-subheading">{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="app98-divider" />

                <section id="app-why" className="app98-section">
                  <h2 className="app98-heading">Why Applied Domains Matter</h2>
                  <ul>
                    {whyAppliedDomainsMatter.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="app98-divider" />

                <section id="app-history" className="app98-section">
                  <h2 className="app98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="app98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="app98-divider" />

                <section id="app-survey" className="app98-section">
                  <h2 className="app98-heading">Domain Survey</h2>
                  {domainSurvey.map((item) => (
                    <div key={item.name}>
                      <h3 className="app98-subheading">{item.name}</h3>
                      <p>{item.focus}</p>
                      <p>{item.value}</p>
                      <p>
                        <Link to={item.route} className="app98-inline-link">
                          Open {item.name}
                        </Link>
                      </p>
                    </div>
                  ))}
                </section>

                <hr className="app98-divider" />

                <section id="app-themes" className="app98-section">
                  <h2 className="app98-heading">Shared Engineering Themes</h2>
                  {engineeringThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="app98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="app98-divider" />

                <section id="app-takeaways" className="app98-section">
                  <h2 className="app98-heading">Key Takeaways</h2>
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
                <section id="app-signals" className="app98-section">
                  <h2 className="app98-heading">Topic Signals</h2>
                  {topicSignals.map((item) => (
                    <div key={item.title}>
                      <h3 className="app98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="app-foundations" className="app98-section">
                  <h2 className="app98-heading">Foundations</h2>
                  {coreFoundations.map((item) => (
                    <div key={item.title}>
                      <h3 className="app98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="app-proofs" className="app98-section">
                  <h2 className="app98-heading">Proof Obligations</h2>
                  {proofObligations.map((item) => (
                    <div key={item.title}>
                      <h3 className="app98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="app-failures" className="app98-section">
                  <h2 className="app98-heading">Failure Modes</h2>
                  {commonFailureModes.map((item) => (
                    <div key={item.title}>
                      <h3 className="app98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="app-compare" className="app98-section">
                  <h2 className="app98-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <div key={item.title}>
                      <h3 className="app98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="app-checklist" className="app98-section">
                  <h2 className="app98-heading">Study Checklist</h2>
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
                  <section key={example.id} id={example.id} className="app98-section">
                    <h2 className="app98-heading">{example.title}</h2>
                    <p>
                      <strong>Domain:</strong> {example.domain}
                    </p>
                    <p>{example.intro}</p>
                    <p>
                      <strong>Why this domain fits:</strong> {example.whyFit}
                    </p>
                    <div className="app98-codebox">
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
              <section id="app-glossary" className="app98-section">
                <h2 className="app98-heading">Glossary</h2>
                {glossary.map((entry) => (
                  <p key={entry.term}>
                    <strong>{entry.term}:</strong> {entry.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
