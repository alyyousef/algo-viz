import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const requirements = [
  'Sub-50ms latency on each keystroke, often below 10ms in production.',
  'High recall for relevant completions without flooding the UI.',
  'Stable ranking that improves with user behavior and context.',
  'Graceful handling of typos, casing, and diacritics.',
  'Fast updates for new content, trending queries, and personalization.',
]

const historicalMoments = [
  {
    title: 'Telephone routing and prefix lookup (1960s)',
    detail:
      'Tries were used to route calls by prefix, foreshadowing the same longest-prefix match logic used in autocomplete.',
  },
  {
    title: 'Web search suggestion boxes (2000s)',
    detail:
      'Search engines popularized typeahead, pushing latency budgets into single-digit milliseconds.',
  },
  {
    title: 'Mobile keyboards (2010s)',
    detail:
      'On-device autocomplete required compact tries, personalization, and typo tolerance with limited memory.',
  },
  {
    title: 'Streaming personalization (2015+)',
    detail:
      'Real-time updates and ranking pipelines made autocomplete a live system with online learning signals.',
  },
]

const mentalModels = [
  {
    title: 'Prefix highway',
    detail:
      'Each character is a ramp onto a shared highway of common prefixes. Popular prefixes become fast lanes.',
  },
  {
    title: 'Top-k cache at every mile marker',
    detail:
      'A trie node is a checkpoint with its own top-k list so you do not need to explore the full subtree.',
  },
  {
    title: 'DFA with scores',
    detail:
      'A trie is a deterministic automaton; autocomplete adds scores and ranking to choose the best accept states.',
  },
  {
    title: 'Latency budget envelope',
    detail:
      'Think of a fixed budget: tokenize, traverse, score, and render. Each stage has a hard deadline.',
  },
]

const nodeMetadata = [
  'isTerminal flag for completed keys and ability to rank whole words.',
  'Frequency counters (global and per segment) for ranking.',
  'Top-k cache per node to avoid subtree scans at query time.',
  'Payload references to documents, IDs, or full strings.',
  'Last-updated timestamps for recency boosting.',
]

const normalizationRules = [
  {
    title: 'Case folding',
    detail: 'Lowercase inputs and stored phrases to keep the trie compact.',
  },
  {
    title: 'Unicode normalization',
    detail: 'Normalize accents and canonical forms to avoid duplicate paths.',
  },
  {
    title: 'Tokenization',
    detail: 'Split on whitespace and punctuation; handle language-specific rules.',
  },
  {
    title: 'Stopword handling',
    detail: 'Drop or downweight common tokens to prevent noisy prefixes.',
  },
  {
    title: 'Synonyms and aliases',
    detail: 'Map alternative spellings or synonyms to shared entries when needed.',
  },
]

const indexingStrategies = [
  {
    title: 'Single-field trie',
    detail: 'Index a primary field like title or name for fast prefix matches.',
  },
  {
    title: 'Multi-field blend',
    detail: 'Maintain separate tries for title, brand, and category, then merge results.',
  },
  {
    title: 'Token-level tries',
    detail: 'Autocomplete on token prefixes for multi-word queries and flexible ordering.',
  },
  {
    title: 'Hybrid index',
    detail: 'Combine trie prefix with n-gram or inverted index for substring backoff.',
  },
]

const multiTermHandling = [
  {
    title: 'Prefix of last token',
    detail: 'Keep earlier tokens fixed and autocomplete only the last token.',
  },
  {
    title: 'Rewriting and synonyms',
    detail: 'Expand terms with synonyms or locale-specific variants before search.',
  },
  {
    title: 'Phrase completion',
    detail: 'Suggest full phrases based on historical query sessions.',
  },
  {
    title: 'Fielded queries',
    detail: 'Support structured inputs like "brand:sony" using separate tries.',
  },
]

const blendingSources = [
  {
    title: 'Global suggestions',
    detail: 'Popular across all users; reliable fallback for cold starts.',
  },
  {
    title: 'Personalized layer',
    detail: 'User history and session intent for higher relevance.',
  },
  {
    title: 'Trending layer',
    detail: 'Recent spikes to surface breaking topics quickly.',
  },
  {
    title: 'Editorial and business',
    detail: 'Curated or promoted suggestions with policy constraints.',
  },
]

const dataPipeline = [
  {
    title: 'Data ingestion',
    detail:
      'Collect queries, clicks, purchases, and impressions. Normalize into a canonical schema with timestamps.',
  },
  {
    title: 'Text normalization',
    detail:
      'Lowercase, Unicode normalize, strip punctuation, and apply language-specific tokenization.',
  },
  {
    title: 'Vocabulary building',
    detail:
      'Extract candidate phrases, compute counts, and apply filters (minimum frequency, profanity, banned terms).',
  },
  {
    title: 'Trie build',
    detail:
      'Insert terms in descending popularity to warm top-k caches. Compress or pack nodes for memory efficiency.',
  },
  {
    title: 'Deployment',
    detail:
      'Ship read-only snapshots to edge or in-memory servers; keep deltas for fast hot updates.',
  },
]

const queryFlow = [
  'Normalize input (lowercase, Unicode normalization, trim, tokenization).',
  'Walk the trie for the prefix; fail fast on missing edges.',
  'Collect candidates via cached top-k or limited DFS/BFS.',
  'Score candidates using a ranking model and feature signals.',
  'Apply policy filters (blacklist, profanity, locale limits).',
  'Return suggestions with highlighting and metadata for UX.',
]

const rankingSignals = [
  'Prefix match quality: exact, token boundary, or fuzzy.',
  'Global popularity and click-through rates.',
  'Personalization: user history, session context, and geography.',
  'Recency and trend boosts for fresh content.',
  'Length and diversity controls to avoid near-duplicates.',
  'Business rules: promoted terms, safe search, category boosts.',
]

const rankingModeling = [
  {
    title: 'Static scoring',
    detail:
      'Weighted blend of popularity, recency, and prefix match quality. Simple and predictable.',
  },
  {
    title: 'Learning to rank',
    detail:
      'Use gradient boosted trees or neural rankers with features like CTR, dwell time, and user context.',
  },
  {
    title: 'Personalization layers',
    detail: 'Blend global suggestions with user and session-specific models to avoid overfitting.',
  },
  {
    title: 'Diversity controls',
    detail: 'Penalize near-duplicates and enforce category variety to improve perceived relevance.',
  },
]

const retrievalStrategies = [
  'Store top-k suggestions at each node for O(L + k) retrieval.',
  'Use a priority queue to traverse nodes by score when k is large.',
  'Cache results for popular prefixes and reuse across sessions.',
  'Incrementally update results as the user types one more character.',
  'Fallback to global popular suggestions if prefix is short or missing.',
]

const typoHandling = [
  'Levenshtein automaton over the trie for bounded edit distance.',
  'Keyboard adjacency rules for common substitution errors.',
  'Damerau edits (transpositions) for fast-typing errors.',
  'Phonetic or soundex matching for names and brands.',
  'Backoff to n-gram or fuzzy index when edit distance is large.',
]

const memoryChoices = [
  {
    title: 'Array children',
    detail: 'Fast indexing for small alphabets but memory heavy for sparse nodes.',
  },
  {
    title: 'Map or sorted vector',
    detail: 'Compact for large alphabets; slightly slower due to lookup overhead.',
  },
  {
    title: 'Radix/Patricia compression',
    detail: 'Collapse single-child paths into labeled edges to shrink node count.',
  },
  {
    title: 'DAWG or minimal DFA',
    detail: 'Share suffixes across words to minimize memory for large vocabularies.',
  },
  {
    title: 'Double-array trie or LOUDS',
    detail: 'Packed arrays or bitmaps for cache-friendly traversal and memory mapping.',
  },
]

const cachingLayers = [
  {
    title: 'Node-level top-k',
    detail: 'Precompute top suggestions per node for constant-time retrieval.',
  },
  {
    title: 'Prefix result cache',
    detail: 'Cache full results for hot prefixes; invalidate on updates or TTL.',
  },
  {
    title: 'Client-side cache',
    detail: 'Reuse suggestions across keystrokes and sessions to cut round trips.',
  },
  {
    title: 'Edge caching',
    detail: 'Serve popular prefixes from regional edges to reduce latency spikes.',
  },
]

const scalingPatterns = [
  {
    title: 'Prefix or hash sharding',
    detail: 'Distribute prefixes across servers; keep hot prefixes isolated.',
  },
  {
    title: 'Hot/cold tiers',
    detail: 'Serve popular prefixes from memory, spill rare ones to disk.',
  },
  {
    title: 'Async rebuilds',
    detail: 'Batch rebuilds for consistency while deltas handle freshness.',
  },
  {
    title: 'Streaming replication',
    detail: 'Ship updates via logs to keep replicas aligned without full rebuilds.',
  },
  {
    title: 'Multi-tenant layers',
    detail: 'Share structure but apply per-tenant ranking overlays.',
  },
]

const updateStrategies = [
  {
    title: 'Batch rebuilds',
    detail: 'Rebuild snapshots nightly or hourly for large corpora and consistent ranking.',
  },
  {
    title: 'Online deltas',
    detail: 'Apply incremental updates for trending queries and fresh inventory.',
  },
  {
    title: 'Dual index swap',
    detail: 'Build a new trie, then atomically swap pointers to avoid downtime.',
  },
  {
    title: 'Write-optimized overlay',
    detail: 'Merge a small mutable trie into a large immutable trie at query time.',
  },
]

const evaluationMetrics = [
  {
    title: 'Latency percentiles',
    detail: 'Track p50, p95, and p99 per keystroke to protect tail latency.',
  },
  {
    title: 'Recall and coverage',
    detail: 'Measure how often relevant items appear in the suggestion list.',
  },
  {
    title: 'Ranking quality',
    detail: 'Use MRR or NDCG to evaluate ordering against ground truth.',
  },
  {
    title: 'Online impact',
    detail: 'CTR uplift and time-to-result from controlled experiments.',
  },
  {
    title: 'Diversity',
    detail: 'Monitor duplication and category spread among suggestions.',
  },
]

const latencyBudget = [
  {
    title: 'Tokenization',
    detail: '1-2 ms for normalization, Unicode handling, and token splitting.',
  },
  {
    title: 'Trie traversal',
    detail: '1-3 ms for prefix walk and candidate retrieval from caches.',
  },
  {
    title: 'Ranking',
    detail: '2-5 ms for scoring and reordering, depending on model size.',
  },
  {
    title: 'Rendering',
    detail: '2-5 ms for UI render and highlighting on the client.',
  },
]

const uiConsiderations = [
  {
    title: 'Highlighting',
    detail: 'Emphasize matched prefix or token boundaries to build user confidence.',
  },
  {
    title: 'Result count',
    detail: 'Most UIs show 5-10 suggestions; more adds cognitive load.',
  },
  {
    title: 'Instant feedback',
    detail: 'Show loading indicators only when necessary; otherwise feel immediate.',
  },
  {
    title: 'Accessibility',
    detail: 'Keyboard navigation, screen reader hints, and predictable ordering.',
  },
]

const privacySafety = [
  {
    title: 'PII handling',
    detail: 'Do not leak user-specific queries in global suggestions.',
  },
  {
    title: 'Safe search and policy',
    detail: 'Filter sensitive or disallowed terms before ranking and output.',
  },
  {
    title: 'Abuse detection',
    detail: 'Rate-limit or block abusive prefixes and spammy trends.',
  },
  {
    title: 'Localization',
    detail: 'Respect language and region rules for tokenization and filtering.',
  },
]

const failureModes = [
  {
    title: 'Cold cache',
    detail: 'Latency spikes for rare prefixes; warm caches with offline prefetch.',
  },
  {
    title: 'Ranking drift',
    detail: 'Stale top-k lists or cached results mis-rank suggestions; refresh regularly.',
  },
  {
    title: 'Update lag',
    detail: 'New content missing in suggestions; mitigate with online delta indices.',
  },
  {
    title: 'Heavy fanout',
    detail: 'Very short prefixes can return huge candidate sets; enforce top-k.',
  },
]

const observability = [
  {
    title: 'Metrics',
    detail: 'Track latency percentiles, cache hit rate, candidate counts, and errors.',
  },
  {
    title: 'Logging',
    detail: 'Log prefixes, result sets, and user actions for offline evaluation.',
  },
  {
    title: 'Tracing',
    detail: 'Instrument traversal, ranking, and policy filters to spot slow stages.',
  },
  {
    title: 'A/B experiments',
    detail: 'Ship ranking changes behind feature flags and measure CTR and time-to-result.',
  },
]

const pitfalls = [
  'Skipping normalization leads to duplicate paths and missed matches.',
  'No terminal flag breaks words that are prefixes of longer words.',
  'Storing large strings in every node bloats memory.',
  'Tombstones or stale caches drift rankings over time.',
  'Aggressive personalization can hide globally relevant items.',
  'Ignoring multi-language segmentation causes poor tokenization.',
  'Returning too many suggestions hurts UX and increases compute.',
]

const testingChecklist = [
  'Unit tests for insert, delete, prefix query, and top-k ranking.',
  'Golden tests for normalization rules across locales.',
  'Load tests with high fanout and long prefixes.',
  'Fuzz tests for typo handling and edge cases.',
  'Cache invalidation tests after updates and deletes.',
  'A/B tests with offline replay of real query logs.',
]

const whenToUse = [
  'Use tries for fast prefix lookup, autocomplete, and lexicographic listing.',
  'Prefer hash maps for exact lookups when ordering and prefixes do not matter.',
  'Use search indices (inverted indexes, n-grams) for substring queries.',
  'Use suffix arrays or automata for large-scale substring matching.',
  'Combine tries with ranking models when relevance is as important as speed.',
]

const practiceIdeas = [
  'Build a trie that stores top-5 suggestions per node.',
  'Add recency and popularity scoring with tunable weights.',
  'Implement bounded edit-distance search over the trie.',
  'Compress the trie with radix edges and compare memory usage.',
  'Serve autocomplete with a cache and measure hit rates.',
]

const takeaways = [
  'Trie lookup is O(prefix length), but ranking and caching decide user-perceived latency.',
  'Top-k caches at nodes are the key to fast suggestions at scale.',
  'Normalization and tokenization errors are the fastest way to ruin relevance.',
  'Blend global, personal, and trending sources for robust coverage.',
  'Plan for updates and cold starts with batch rebuilds plus online deltas.',
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
    { id: 'bp-requirements', label: 'What To Deliver' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-pipeline', label: 'Data Pipeline' },
    { id: 'core-node', label: 'Node Metadata' },
    { id: 'core-normalization', label: 'Normalization' },
    { id: 'core-indexing', label: 'Indexing Strategies' },
    { id: 'core-query-flow', label: 'Query Flow' },
    { id: 'core-ranking-signals', label: 'Ranking Signals' },
    { id: 'core-blending', label: 'Blending Sources' },
    { id: 'core-ranking-models', label: 'Ranking Models' },
    { id: 'core-retrieval', label: 'Retrieval Strategies' },
    { id: 'core-caching', label: 'Caching Layers' },
    { id: 'core-typos', label: 'Typo Handling' },
    { id: 'core-memory', label: 'Memory Choices' },
    { id: 'core-scaling', label: 'Scaling Patterns' },
    { id: 'core-updates', label: 'Update Strategies' },
    { id: 'core-ui', label: 'UI Considerations' },
    { id: 'core-safety', label: 'Privacy and Safety' },
    { id: 'core-failure', label: 'Failure Modes' },
    { id: 'core-observability', label: 'Observability' },
  ],
  examples: [
    { id: 'ex-latency', label: 'Latency Budget' },
    { id: 'ex-metrics', label: 'Evaluation Metrics' },
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-tests', label: 'Testing Checklist' },
    { id: 'ex-practice', label: 'Practice Ideas' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const glossaryTerms = [
  {
    term: 'Trie',
    definition:
      'A prefix tree where each edge represents a character step and lookups scale with input length.',
  },
  {
    term: 'Top-k cache',
    definition: 'A precomputed best-suggestion list stored at a node for fast retrieval.',
  },
  {
    term: 'Prefix walk',
    definition: 'Traversal from root following characters of the current user input.',
  },
  { term: 'Terminal node', definition: 'A node that marks the end of a full word or phrase.' },
  {
    term: 'Levenshtein distance',
    definition: 'Edit distance based on insertions, deletions, and substitutions between strings.',
  },
  {
    term: 'Damerau edit',
    definition: 'Edit-distance variant that also counts transpositions as one operation.',
  },
  {
    term: 'Radix compression',
    definition: 'Path compression that merges single-child chains into longer edge labels.',
  },
  {
    term: 'DAWG',
    definition: 'Directed acyclic word graph that merges shared suffixes to reduce memory.',
  },
  {
    term: 'p95/p99 latency',
    definition: 'Tail latency percentiles capturing slower request behavior.',
  },
  {
    term: 'NDCG/MRR',
    definition: 'Ranking metrics measuring quality and ordering of returned suggestions.',
  },
]

export default function TrieApplicationsAutocompletePage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Trie Applications (Autocomplete)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Trie Applications (Autocomplete)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Trie Applications (Autocomplete)</h1>
      <p>
        Autocomplete turns partial input into ranked suggestions in milliseconds. Tries provide the
        core prefix lookup, but production quality needs ranking, personalization, typo handling,
        caching, and update pipelines.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Tries are a natural fit because lookup cost scales with prefix length, not corpus
              size. The trade-off is memory, so practical systems rely on compression and selective
              top-k caching.
            </p>
          </section>
          <section id="bp-requirements" className="bin98-section">
            <h2 className="bin98-heading">What Autocomplete Needs to Deliver</h2>
            <ul>
              {requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMoments.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <section id="bp-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
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
          <section id="core-pipeline" className="bin98-section">
            <h2 className="bin98-heading">Data Pipeline and Index Build</h2>
            {dataPipeline.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-node" className="bin98-section">
            <h2 className="bin98-heading">Node Data Model and Metadata</h2>
            <ul>
              {nodeMetadata.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-normalization" className="bin98-section">
            <h2 className="bin98-heading">Normalization and Text Hygiene</h2>
            {normalizationRules.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-indexing" className="bin98-section">
            <h2 className="bin98-heading">Indexing Strategies</h2>
            {indexingStrategies.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-query-flow" className="bin98-section">
            <h2 className="bin98-heading">End-to-End Query Flow</h2>
            <ol>
              {queryFlow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            {multiTermHandling.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-ranking-signals" className="bin98-section">
            <h2 className="bin98-heading">Ranking and Scoring Signals</h2>
            <ul>
              {rankingSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-blending" className="bin98-section">
            <h2 className="bin98-heading">Blending Multiple Sources</h2>
            {blendingSources.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-ranking-models" className="bin98-section">
            <h2 className="bin98-heading">Ranking Approaches</h2>
            {rankingModeling.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-retrieval" className="bin98-section">
            <h2 className="bin98-heading">Retrieval Strategies for Top-k</h2>
            <ul>
              {retrievalStrategies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-caching" className="bin98-section">
            <h2 className="bin98-heading">Caching Layers</h2>
            {cachingLayers.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-typos" className="bin98-section">
            <h2 className="bin98-heading">Handling Typos and Fuzzy Matches</h2>
            <ul>
              {typoHandling.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-memory" className="bin98-section">
            <h2 className="bin98-heading">Memory and Layout Choices</h2>
            {memoryChoices.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-scaling" className="bin98-section">
            <h2 className="bin98-heading">Scaling to Large Corpora</h2>
            {scalingPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-updates" className="bin98-section">
            <h2 className="bin98-heading">Update Strategies</h2>
            {updateStrategies.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-ui" className="bin98-section">
            <h2 className="bin98-heading">UI and UX Considerations</h2>
            {uiConsiderations.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-safety" className="bin98-section">
            <h2 className="bin98-heading">Privacy and Safety</h2>
            {privacySafety.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-failure" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes and Mitigation</h2>
            {failureModes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-observability" className="bin98-section">
            <h2 className="bin98-heading">Observability and Experimentation</h2>
            {observability.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-latency" className="bin98-section">
            <h2 className="bin98-heading">Latency Budget (Typical)</h2>
            {latencyBudget.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="ex-metrics" className="bin98-section">
            <h2 className="bin98-heading">Evaluation Metrics</h2>
            {evaluationMetrics.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            <h3 className="bin98-subheading">Top-k Autocomplete with Cached Suggestions</h3>
            <div className="bin98-codebox">
              <code>{`function insert(word, score):
    node = root
    for ch in normalize(word):
        node = node.children.getOrCreate(ch)
        node.topK = updateTopK(node.topK, word, score)
    node.isTerminal = true

function autocomplete(prefix, k):
    node = root
    for ch in normalize(prefix):
        if ch not in node.children: return []
        node = node.children[ch]
    return node.topK.first(k)`}</code>
            </div>
            <p>
              Store compact IDs in topK when dynamic scoring and personalization are applied at
              query time.
            </p>
            <h3 className="bin98-subheading">Bounded Edit-Distance Search</h3>
            <div className="bin98-codebox">
              <code>{`function fuzzySearch(node, prevRow, char, maxDist):
    currRow[0] = prevRow[0] + 1
    for i in 1..len(query):
        insertCost = currRow[i-1] + 1
        deleteCost = prevRow[i] + 1
        replaceCost = prevRow[i-1] + (query[i-1] == char ? 0 : 1)
        currRow[i] = min(insertCost, deleteCost, replaceCost)
    if currRow[len(query)] <= maxDist and node.isTerminal:
        emit(node.word)
    if min(currRow) <= maxDist:
        for (ch, child) in node.children:
            fuzzySearch(child, currRow, ch, maxDist)`}</code>
            </div>
          </section>
          <section id="ex-tests" className="bin98-section">
            <h2 className="bin98-heading">Testing Checklist</h2>
            <ul>
              {testingChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="ex-practice" className="bin98-section">
            <h2 className="bin98-heading">Practice and Build Ideas</h2>
            <ul>
              {practiceIdeas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="bin98-subheading">When to Use Tries (and When Not To)</h3>
            <ul>
              {whenToUse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="bin98-subheading">Common Pitfalls and Edge Cases</h3>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
