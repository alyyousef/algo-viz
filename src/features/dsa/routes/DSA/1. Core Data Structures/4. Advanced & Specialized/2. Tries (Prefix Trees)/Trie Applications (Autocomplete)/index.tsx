import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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
    detail:
      'Lowercase inputs and stored phrases to keep the trie compact.',
  },
  {
    title: 'Unicode normalization',
    detail:
      'Normalize accents and canonical forms to avoid duplicate paths.',
  },
  {
    title: 'Tokenization',
    detail:
      'Split on whitespace and punctuation; handle language-specific rules.',
  },
  {
    title: 'Stopword handling',
    detail:
      'Drop or downweight common tokens to prevent noisy prefixes.',
  },
  {
    title: 'Synonyms and aliases',
    detail:
      'Map alternative spellings or synonyms to shared entries when needed.',
  },
]

const indexingStrategies = [
  {
    title: 'Single-field trie',
    detail:
      'Index a primary field like title or name for fast prefix matches.',
  },
  {
    title: 'Multi-field blend',
    detail:
      'Maintain separate tries for title, brand, and category, then merge results.',
  },
  {
    title: 'Token-level tries',
    detail:
      'Autocomplete on token prefixes for multi-word queries and flexible ordering.',
  },
  {
    title: 'Hybrid index',
    detail:
      'Combine trie prefix with n-gram or inverted index for substring backoff.',
  },
]

const multiTermHandling = [
  {
    title: 'Prefix of last token',
    detail:
      'Keep earlier tokens fixed and autocomplete only the last token.',
  },
  {
    title: 'Rewriting and synonyms',
    detail:
      'Expand terms with synonyms or locale-specific variants before search.',
  },
  {
    title: 'Phrase completion',
    detail:
      'Suggest full phrases based on historical query sessions.',
  },
  {
    title: 'Fielded queries',
    detail:
      'Support structured inputs like "brand:sony" using separate tries.',
  },
]

const blendingSources = [
  {
    title: 'Global suggestions',
    detail:
      'Popular across all users; reliable fallback for cold starts.',
  },
  {
    title: 'Personalized layer',
    detail:
      'User history and session intent for higher relevance.',
  },
  {
    title: 'Trending layer',
    detail:
      'Recent spikes to surface breaking topics quickly.',
  },
  {
    title: 'Editorial and business',
    detail:
      'Curated or promoted suggestions with policy constraints.',
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
    detail:
      'Blend global suggestions with user and session-specific models to avoid overfitting.',
  },
  {
    title: 'Diversity controls',
    detail:
      'Penalize near-duplicates and enforce category variety to improve perceived relevance.',
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
    detail:
      'Fast indexing for small alphabets but memory heavy for sparse nodes.',
  },
  {
    title: 'Map or sorted vector',
    detail:
      'Compact for large alphabets; slightly slower due to lookup overhead.',
  },
  {
    title: 'Radix/Patricia compression',
    detail:
      'Collapse single-child paths into labeled edges to shrink node count.',
  },
  {
    title: 'DAWG or minimal DFA',
    detail:
      'Share suffixes across words to minimize memory for large vocabularies.',
  },
  {
    title: 'Double-array trie or LOUDS',
    detail:
      'Packed arrays or bitmaps for cache-friendly traversal and memory mapping.',
  },
]

const cachingLayers = [
  {
    title: 'Node-level top-k',
    detail:
      'Precompute top suggestions per node for constant-time retrieval.',
  },
  {
    title: 'Prefix result cache',
    detail:
      'Cache full results for hot prefixes; invalidate on updates or TTL.',
  },
  {
    title: 'Client-side cache',
    detail:
      'Reuse suggestions across keystrokes and sessions to cut round trips.',
  },
  {
    title: 'Edge caching',
    detail:
      'Serve popular prefixes from regional edges to reduce latency spikes.',
  },
]

const scalingPatterns = [
  {
    title: 'Prefix or hash sharding',
    detail:
      'Distribute prefixes across servers; keep hot prefixes isolated.',
  },
  {
    title: 'Hot/cold tiers',
    detail:
      'Serve popular prefixes from memory, spill rare ones to disk.',
  },
  {
    title: 'Async rebuilds',
    detail:
      'Batch rebuilds for consistency while deltas handle freshness.',
  },
  {
    title: 'Streaming replication',
    detail:
      'Ship updates via logs to keep replicas aligned without full rebuilds.',
  },
  {
    title: 'Multi-tenant layers',
    detail:
      'Share structure but apply per-tenant ranking overlays.',
  },
]

const updateStrategies = [
  {
    title: 'Batch rebuilds',
    detail:
      'Rebuild snapshots nightly or hourly for large corpora and consistent ranking.',
  },
  {
    title: 'Online deltas',
    detail:
      'Apply incremental updates for trending queries and fresh inventory.',
  },
  {
    title: 'Dual index swap',
    detail:
      'Build a new trie, then atomically swap pointers to avoid downtime.',
  },
  {
    title: 'Write-optimized overlay',
    detail:
      'Merge a small mutable trie into a large immutable trie at query time.',
  },
]

const evaluationMetrics = [
  {
    title: 'Latency percentiles',
    detail:
      'Track p50, p95, and p99 per keystroke to protect tail latency.',
  },
  {
    title: 'Recall and coverage',
    detail:
      'Measure how often relevant items appear in the suggestion list.',
  },
  {
    title: 'Ranking quality',
    detail:
      'Use MRR or NDCG to evaluate ordering against ground truth.',
  },
  {
    title: 'Online impact',
    detail:
      'CTR uplift and time-to-result from controlled experiments.',
  },
  {
    title: 'Diversity',
    detail:
      'Monitor duplication and category spread among suggestions.',
  },
]

const latencyBudget = [
  {
    title: 'Tokenization',
    detail:
      '1-2 ms for normalization, Unicode handling, and token splitting.',
  },
  {
    title: 'Trie traversal',
    detail:
      '1-3 ms for prefix walk and candidate retrieval from caches.',
  },
  {
    title: 'Ranking',
    detail:
      '2-5 ms for scoring and reordering, depending on model size.',
  },
  {
    title: 'Rendering',
    detail:
      '2-5 ms for UI render and highlighting on the client.',
  },
]

const uiConsiderations = [
  {
    title: 'Highlighting',
    detail:
      'Emphasize matched prefix or token boundaries to build user confidence.',
  },
  {
    title: 'Result count',
    detail:
      'Most UIs show 5-10 suggestions; more adds cognitive load.',
  },
  {
    title: 'Instant feedback',
    detail:
      'Show loading indicators only when necessary; otherwise feel immediate.',
  },
  {
    title: 'Accessibility',
    detail:
      'Keyboard navigation, screen reader hints, and predictable ordering.',
  },
]

const privacySafety = [
  {
    title: 'PII handling',
    detail:
      'Do not leak user-specific queries in global suggestions.',
  },
  {
    title: 'Safe search and policy',
    detail:
      'Filter sensitive or disallowed terms before ranking and output.',
  },
  {
    title: 'Abuse detection',
    detail:
      'Rate-limit or block abusive prefixes and spammy trends.',
  },
  {
    title: 'Localization',
    detail:
      'Respect language and region rules for tokenization and filtering.',
  },
]

const failureModes = [
  {
    title: 'Cold cache',
    detail:
      'Latency spikes for rare prefixes; warm caches with offline prefetch.',
  },
  {
    title: 'Ranking drift',
    detail:
      'Stale top-k lists or cached results mis-rank suggestions; refresh regularly.',
  },
  {
    title: 'Update lag',
    detail:
      'New content missing in suggestions; mitigate with online delta indices.',
  },
  {
    title: 'Heavy fanout',
    detail:
      'Very short prefixes can return huge candidate sets; enforce top-k.',
  },
]

const observability = [
  {
    title: 'Metrics',
    detail:
      'Track latency percentiles, cache hit rate, candidate counts, and errors.',
  },
  {
    title: 'Logging',
    detail:
      'Log prefixes, result sets, and user actions for offline evaluation.',
  },
  {
    title: 'Tracing',
    detail:
      'Instrument traversal, ranking, and policy filters to spot slow stages.',
  },
  {
    title: 'A/B experiments',
    detail:
      'Ship ranking changes behind feature flags and measure CTR and time-to-result.',
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

export default function TrieApplicationsAutocompletePage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Trie Applications (Autocomplete)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-hero">
            <div className="win95-subheading">
              Production-grade typeahead built on prefix trees, ranking, and careful systems design
            </div>
            <p className="win95-text">
              Autocomplete turns partial input into ranked suggestions in milliseconds. Tries provide the core prefix lookup,
              but the real system also needs ranking, personalization, typo handling, caching, and update pipelines. This page
              walks through the full stack of decisions that make trie-based autocomplete fast, relevant, and robust.
            </p>
          </div>

          <fieldset className="win95-fieldset">
            <legend>What autocomplete needs to deliver</legend>
            <div className="win95-panel">
              <p className="win95-text">
                A usable typeahead system is more than fast lookup. It has to return relevant, diverse suggestions while the
                user is still typing. That requires predictable latency, strong ranking, and operational hygiene around data
                updates.
              </p>
              <ul className="win95-list">
                {requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMoments.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Why tries are a natural fit</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Tries index strings by prefix. A lookup cost scales with input length rather than corpus size, which makes
                them ideal for incremental typing. The same structure supports lexicographic enumeration and longest-prefix
                matches, both common in search UIs and routing.
              </p>
              <p className="win95-text">
                The trade-off is memory: each node can hold many outgoing edges. Practical systems mitigate this with
                compression, compact child representations, and selective caching of top suggestions.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Data pipeline and index build</legend>
            <div className="win95-grid win95-grid-2">
              {dataPipeline.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Node data model and metadata</legend>
            <div className="win95-panel">
              <p className="win95-text">
                A trie node is not just a character. For autocomplete, you need metadata that enables ranking and fast
                retrieval without walking entire subtrees.
              </p>
              <ul className="win95-list">
                {nodeMetadata.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Normalization and text hygiene</legend>
            <div className="win95-grid win95-grid-2">
              {normalizationRules.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Indexing strategies</legend>
            <div className="win95-grid win95-grid-2">
              {indexingStrategies.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>End-to-end query flow</legend>
            <div className="win95-panel">
              <p className="win95-text">
                The query pipeline is a mix of string processing, traversal, ranking, and policy filtering. A consistent
                pipeline prevents inconsistent suggestions between clients and keeps metrics stable.
              </p>
              <ol className="win95-list win95-list--numbered">
                {queryFlow.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Multi-term query handling</legend>
            <div className="win95-grid win95-grid-2">
              {multiTermHandling.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Ranking and scoring signals</legend>
            <div className="win95-panel">
              <p className="win95-text">
                A trie answers which completions exist. Ranking decides which to show. Most systems combine multiple
                features with tunable weights or a learned model.
              </p>
              <ul className="win95-list">
                {rankingSignals.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Blending multiple sources</legend>
            <div className="win95-grid win95-grid-2">
              {blendingSources.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Ranking approaches</legend>
            <div className="win95-grid win95-grid-2">
              {rankingModeling.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Retrieval strategies for top-k</legend>
            <div className="win95-panel">
              <p className="win95-text">
                The naive approach is to traverse the whole subtree and sort results, which is too slow. Production systems
                trade memory for speed by caching top suggestions or using bounded priority queues.
              </p>
              <ul className="win95-list">
                {retrievalStrategies.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Caching layers</legend>
            <div className="win95-grid win95-grid-2">
              {cachingLayers.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Handling typos and fuzzy matches</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Users type quickly and make mistakes. A strong autocomplete system tolerates small errors without returning
                unrelated results. Trie-based fuzzy matching keeps the search space controlled.
              </p>
              <ul className="win95-list">
                {typoHandling.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Memory and layout choices</legend>
            <div className="win95-grid win95-grid-2">
              {memoryChoices.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Update strategies</legend>
            <div className="win95-grid win95-grid-2">
              {updateStrategies.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Scaling to large corpora</legend>
            <div className="win95-grid win95-grid-2">
              {scalingPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Evaluation metrics</legend>
            <div className="win95-grid win95-grid-2">
              {evaluationMetrics.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Latency budget (typical)</legend>
            <div className="win95-grid win95-grid-2">
              {latencyBudget.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>UI and UX considerations</legend>
            <div className="win95-grid win95-grid-2">
              {uiConsiderations.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Privacy and safety</legend>
            <div className="win95-grid win95-grid-2">
              {privacySafety.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Failure modes and mitigation</legend>
            <div className="win95-grid win95-grid-2">
              {failureModes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Observability and experimentation</legend>
            <div className="win95-grid win95-grid-2">
              {observability.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Example: top-k autocomplete with cached suggestions</legend>
            <div className="win95-panel">
              <p className="win95-text">
                A common approach stores top suggestions at each node so retrieval is fast and deterministic. You update the
                cached list during insert or in batch rebuilds.
              </p>
              <pre className="win95-code">
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
              </pre>
              <p className="win95-text">
                This model avoids scanning the subtree on every query. If you need dynamic scores (for recency or
                personalization), store compact IDs in topK and resolve scores at query time.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Example: bounded edit-distance search</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Use dynamic programming as you traverse the trie. Keep a row of edit distances per node and prune branches
                that exceed the maximum allowed distance.
              </p>
              <pre className="win95-code">
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
              </pre>
              <p className="win95-text">
                This keeps the search bounded by edit distance rather than scanning the entire trie.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls and edge cases</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Testing checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {testingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use tries (and when not to)</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practice and build ideas</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {practiceIdeas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
