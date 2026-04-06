import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Trie foundations for prefix search (1960s)',
    detail:
      'Trie data structures made dictionary lookup fast, but each pattern still required its own scan. This set the stage for a unified automaton.',
  },
  {
    title: 'Aho and Corasick publish the algorithm (1975)',
    detail:
      'They unify many patterns into one finite automaton with failure links, enabling linear-time scanning with no text backtracking.',
  },
  {
    title: 'Pattern libraries in intrusion detection (1980s-1990s)',
    detail:
      'Network intrusion systems needed to match thousands of signatures in real time; the automaton model fit streaming data well.',
  },
  {
    title: 'Large-scale text search adoption (1990s)',
    detail:
      'Search engines and spam filters used multi-pattern matching to scan massive corpora efficiently.',
  },
  {
    title: 'Bioinformatics and genomics (2000s)',
    detail:
      'DNA motif search and protein sequence scanning benefited from multi-pattern matching on large alphabets.',
  },
  {
    title: 'Modern uses in NLP and security (2010s+)',
    detail:
      'Token scanning, malware signatures, and keyword spotting reuse the same automaton idea for high-throughput streams.',
  },
]

const mentalModels = [
  {
    title: 'One mega-dictionary, one pass',
    detail:
      'Instead of searching each pattern separately, you compile them all into one machine and scan the text once.',
  },
  {
    title: 'A trie with escape routes',
    detail:
      'Aho-Corasick is a trie augmented with failure links that tell you where to jump when the next character mismatches.',
  },
  {
    title: 'Longest suffix tracker',
    detail:
      'The current node always represents the longest suffix of the text seen so far that is also a pattern prefix.',
  },
  {
    title: 'Streaming-friendly automaton',
    detail:
      'The text index never moves backward, so it naturally supports streams and large inputs.',
  },
  {
    title: 'Report as you land',
    detail:
      'Every node carries the set of pattern ids that end there or via its failure chain, so outputs are immediate.',
  },
]

const coreComponents = [
  {
    heading: 'Trie nodes',
    bullets: [
      'Edges labeled by characters form prefixes of all patterns.',
      'Every pattern ends at a node; store pattern ids or lengths there.',
      'The root represents the empty prefix and handles initial transitions.',
    ],
  },
  {
    heading: 'Failure links',
    bullets: [
      'A link points to the longest proper suffix that is also a trie prefix.',
      'It lets the automaton continue matching without rescanning text.',
      'Computed with BFS from the root to ensure shorter links are ready.',
    ],
  },
  {
    heading: 'Output lists',
    bullets: [
      'A node may correspond to multiple patterns that end here or via suffixes.',
      'Outputs often include patterns from the failure chain.',
      'Store pattern ids or lengths for start index reconstruction.',
    ],
  },
  {
    heading: 'Transition function (goto)',
    bullets: [
      'Follow the edge when it exists, otherwise follow failures.',
      'Dense tables are fast but memory heavy for large alphabets.',
      'Sparse maps save space but add lookup cost.',
    ],
  },
  {
    heading: 'BFS build queue',
    bullets: [
      'Failure links are built level-by-level from the root.',
      'Each node is processed once, and each edge is visited once.',
      'Ensures failure targets are already computed when needed.',
    ],
  },
  {
    heading: 'Alphabet encoding',
    bullets: [
      'Map characters to indices consistently across patterns and text.',
      'Normalization (case fold, Unicode) must match on both sides.',
      'Byte alphabets (0-255) are common for network or binary data.',
    ],
  },
]

const definitions = [
  {
    term: 'Pattern',
    detail: 'A string you want to find in the text. Often many patterns are searched together.',
  },
  {
    term: 'Text (haystack)',
    detail: 'The input sequence scanned from left to right, possibly streaming.',
  },
  {
    term: 'Trie prefix',
    detail: 'A string that matches a path from the root to a node in the trie.',
  },
  {
    term: 'Failure link',
    detail: 'A pointer to the longest proper suffix of the current prefix that is also in the trie.',
  },
  {
    term: 'Output list',
    detail: 'All patterns that end at a node, including those inherited from failure links.',
  },
  {
    term: 'Goto transition',
    detail: 'The automaton transition for a character; often derived from trie edges and failures.',
  },
]

const buildSteps = [
  {
    title: 'Insert patterns into a trie',
    detail:
      'Each pattern walks from root along characters, creating nodes when missing. Mark the end node with the pattern id.',
  },
  {
    title: 'Initialize root and first layer',
    detail:
      'Root fails to itself. All immediate children of root fail to root and enter the BFS queue.',
  },
  {
    title: 'Compute failure links with BFS',
    detail:
      'For each node v and each outgoing edge (v -ch-> u), follow v.fail until an edge labeled ch is found or you reach root.',
  },
  {
    title: 'Assign failure target for child',
    detail:
      'If a matching edge exists from the failure state, set u.fail to that child; otherwise u.fail = root.',
  },
  {
    title: 'Propagate output lists',
    detail:
      'Merge outputs from u.fail into u.output so matches are reported without extra traversal.',
  },
  {
    title: 'Finalize transitions (optional)',
    detail:
      'Precompute transitions for every node and character to make scanning O(1) per symbol in tight loops.',
  },
]

const matchSteps = [
  {
    title: 'Start at root',
    detail: 'Maintain a current node in the automaton while scanning the text left to right.',
  },
  {
    title: 'Consume a character',
    detail:
      'If a child edge exists for the character, follow it. Otherwise follow failure links until one exists or you reach root.',
  },
  {
    title: 'Fallback to root if needed',
    detail:
      'If you reach root and still have no matching edge, stay at root and move on to the next character.',
  },
  {
    title: 'Report outputs',
    detail:
      'Every time you land on a node, emit all pattern ids in its output list. Each represents a match ending here.',
  },
  {
    title: 'Continue without backtracking',
    detail:
      'The text index only moves forward, so total work is linear in text length plus reported matches.',
  },
]

const invariants = [
  {
    title: 'Longest suffix invariant',
    detail:
      'After processing text[0..i], the current node corresponds to the longest suffix of that prefix that is a trie prefix.',
  },
  {
    title: 'Failure link correctness',
    detail:
      'The failure of node v points to the longest proper suffix of v that is also in the trie.',
  },
  {
    title: 'Output completeness',
    detail:
      'If a pattern ends at position i, its id is in the output list of the current node at i.',
  },
  {
    title: 'No backtracking',
    detail:
      'The automaton never rewinds the text pointer; all work is done by state transitions.',
  },
]

const complexityNotes = [
  {
    title: 'Construction time',
    detail:
      'O(total pattern length + number of edges). Each node and edge is processed once in BFS.',
  },
  {
    title: 'Search time',
    detail:
      'O(text length + number of matches). Failure transitions are amortized, and outputs are emitted once per match.',
  },
  {
    title: 'Memory cost',
    detail:
      'O(total pattern length + transitions + output lists). Dense tables increase space with alphabet size.',
  },
  {
    title: 'Best for many patterns',
    detail:
      'Upfront build cost amortizes when patterns are numerous or reused across many searches or streams.',
  },
]

const realWorldUses = [
  {
    context: 'Security scanning',
    detail:
      'IDS/IPS engines match thousands of signatures in network traffic without per-pattern scans.',
  },
  {
    context: 'Spam and content filters',
    detail:
      'Email and chat filters detect keyword sets in streaming text and report all hits in one pass.',
  },
  {
    context: 'Bioinformatics',
    detail:
      'Find DNA or protein motifs across long genomes where exhaustive separate searches would be too slow.',
  },
  {
    context: 'Autocomplete and tokenization',
    detail:
      'Detect dictionary words, keywords, or reserved tokens inside source code or log files.',
  },
  {
    context: 'Log analysis',
    detail:
      'Match lists of error signatures or compliance keywords in massive log streams.',
  },
]

const examples = [
  {
    title: 'Build the automaton (pseudocode)',
    code: `// Pseudocode
function build(patterns):
    root = new Node()
    for id, pat in patterns:
        node = root
        for ch in pat:
            node = node.next[ch] ??= new Node()
        node.output.push(id)

    queue = []
    root.fail = root
    for ch, child in root.next:
        child.fail = root
        queue.push(child)

    while queue not empty:
        v = queue.pop()
        for ch, u in v.next:
            f = v.fail
            while f != root and ch not in f.next:
                f = f.fail
            if ch in f.next and f.next[ch] != u:
                u.fail = f.next[ch]
            else:
                u.fail = root
            u.output += u.fail.output
            queue.push(u)
    return root`,
    explanation:
      'Insert patterns into a trie, then BFS to compute failure links and merge output lists so matches are immediate.',
  },
  {
    title: 'Scan a text stream (pseudocode)',
    code: `// Pseudocode
function search(root, text):
    node = root
    for i in 0..text.length-1:
        ch = text[i]
        while node != root and ch not in node.next:
            node = node.fail
        if ch in node.next:
            node = node.next[ch]
        else:
            node = root
        for id in node.output:
            reportMatch(id, i) // pattern id ends at i`,
    explanation:
      'The text pointer never moves backward, and every emitted id corresponds to a pattern ending at the current index.',
  },
  {
    title: 'Recover match positions',
    code: `// If you store pattern lengths:
for id in node.output:
    length = patternLengths[id]
    start = i - length + 1
    emit(patterns[id], start, i)`,
    explanation:
      'Store lengths or strings for each pattern to recover the start index when a match is found.',
  },
]

const workedExample = {
  patterns: ['he', 'she', 'his', 'hers'],
  text: 'ushers',
  notes: [
    'Patterns share prefixes (h, he, her) and suffixes (he in she and hers).',
    'This causes multiple outputs at the same text position.',
    'The automaton reports all overlapping matches without rescanning.',
  ],
}

const exampleTrace = [
  {
    index: 0,
    char: 'u',
    state: 'root',
    action: 'No edge from root on u, stay at root.',
    outputs: 'None',
  },
  {
    index: 1,
    char: 's',
    state: 's',
    action: 'Goto edge root -> s.',
    outputs: 'None',
  },
  {
    index: 2,
    char: 'h',
    state: 'sh',
    action: 'Goto edge s -> sh.',
    outputs: 'None',
  },
  {
    index: 3,
    char: 'e',
    state: 'she',
    action: 'Goto edge sh -> she.',
    outputs: 'she, he (via failure link)',
  },
  {
    index: 4,
    char: 'r',
    state: 'her',
    action: 'Failure from she to he, then goto he -> her.',
    outputs: 'None',
  },
  {
    index: 5,
    char: 's',
    state: 'hers',
    action: 'Goto edge her -> hers.',
    outputs: 'hers',
  },
]

const outputReporting = [
  {
    title: 'Store ids vs store strings',
    detail:
      'Storing ids keeps output lists small; keep a separate array for pattern lengths and strings.',
  },
  {
    title: 'Deduplicate if needed',
    detail:
      'If patterns can repeat, normalize ids or use a set during build to prevent duplicates in output lists.',
  },
  {
    title: 'Report with end index',
    detail:
      'Outputs are naturally aligned with the end index i. Start index is i - length + 1.',
  },
  {
    title: 'Streaming compatibility',
    detail:
      'Carry the current node across chunks to keep matches across boundary splits.',
  },
]

const pitfalls = [
  'Forgetting to merge output lists from failure links, which hides matches for suffix patterns.',
  'Assuming dense alphabet tables are always faster; they can explode memory with Unicode or byte alphabets.',
  'Treating the root as a normal node; special-case root transitions to avoid infinite failure loops.',
  'Reporting duplicates when a pattern appears multiple times in the output chain without deduping ids.',
  'Using different normalization for patterns and text (case folding, Unicode) which breaks matches.',
  'Failing to keep the current node between chunks in streaming scans, losing cross-boundary matches.',
]

const decisionGuidance = [
  'Need to match many patterns at once or reuse a fixed dictionary across many texts.',
  'Input arrives as a stream and you cannot rewind or store it entirely.',
  'You care about total throughput more than per-pattern flexibility.',
  'Alphabet is moderate (ASCII, bytes). If huge, use sparse transitions or hashed edges.',
  'If only one or few patterns are searched once, KMP or direct search may be simpler.',
]

const advancedInsights = [
  {
    title: 'Sparse vs dense transitions',
    detail:
      'Dense tables give O(1) transitions but cost O(nodes * alphabet). Sparse maps trade some lookup cost for memory savings.',
  },
  {
    title: 'Compressed outputs',
    detail:
      'Large pattern sets can store outputs as linked lists or bitsets to reduce duplication at the expense of slower reporting.',
  },
  {
    title: 'Streaming and chunking',
    detail:
      'Keep the current node between chunks to continue matching across boundaries without rescanning.',
  },
  {
    title: 'Failure link depth heuristics',
    detail:
      'Patterns with long shared suffixes benefit most; measuring automaton depth guides performance expectations.',
  },
  {
    title: 'Automaton serialization',
    detail:
      'You can prebuild the automaton, serialize it, and reload in production to skip startup cost.',
  },
  {
    title: 'Cache-friendly layouts',
    detail:
      'Store nodes in arrays with contiguous transitions to improve CPU cache behavior in hot loops.',
  },
]

const variations = [
  {
    title: 'Case-insensitive matching',
    detail:
      'Normalize patterns and text (e.g., lowercase) before building and scanning, or expand transitions for both cases.',
  },
  {
    title: 'Wildcard and character classes',
    detail:
      'Extend trie edges to sets of characters or use NFA-style expansions, but note the potential blowup.',
  },
  {
    title: 'Dynamic updates',
    detail:
      'Classic Aho-Corasick is static. For frequent inserts/removals, rebuild or use incremental variants with more overhead.',
  },
  {
    title: 'Multiple alphabets',
    detail:
      'For byte-level scanning across arbitrary binary data, build transitions on 256 symbols or use sparse tables.',
  },
  {
    title: 'Parallel scanning',
    detail:
      'Partition the text with overlap of max pattern length to parallelize, or maintain per-thread state for streaming.',
  },
]

const correctnessSketch = [
  {
    title: 'Why failures work',
    detail:
      'If the current path fails on ch, the longest suffix that is a prefix is exactly what the failure links follow.',
  },
  {
    title: 'No missed matches',
    detail:
      'Every pattern match ends at a node reachable by transitions; the output list ensures it is reported immediately.',
  },
  {
    title: 'Linear time',
    detail:
      'Each character advances once; failure transitions only move along existing links and are amortized across the scan.',
  },
]

const implementationChecklist = [
  'Normalize text and patterns consistently before building the trie.',
  'Store pattern lengths or strings to recover match start indices.',
  'Build failure links with BFS from the root.',
  'Merge outputs from failure links into each node.',
  'Handle root transitions explicitly to avoid infinite loops.',
  'Keep the current node across stream chunks if input is segmented.',
]

const comparisonRows = [
  {
    algorithm: 'Aho-Corasick',
    strengths: 'Many patterns, single pass, streaming friendly.',
    weaknesses: 'Higher memory; upfront build cost.',
    bestUse: 'Large dictionaries and repeated scans.',
  },
  {
    algorithm: 'KMP',
    strengths: 'Single pattern, linear time, small memory.',
    weaknesses: 'One pattern at a time.',
    bestUse: 'One-off searches with strong worst-case guarantees.',
  },
  {
    algorithm: 'Rabin-Karp',
    strengths: 'Fast average case; good for equal-length pattern sets.',
    weaknesses: 'Hash collisions; probabilistic unless verified.',
    bestUse: 'Large texts where hash filtering saves work.',
  },
  {
    algorithm: 'Suffix Array',
    strengths: 'Powerful substring queries on fixed text.',
    weaknesses: 'Build cost; not streaming-friendly.',
    bestUse: 'Many queries on the same text corpus.',
  },
]

const tuningTips = [
  {
    title: 'Choose transition representation early',
    detail:
      'Sparse maps suit large alphabets; dense arrays are faster for small alphabets like ASCII.',
  },
  {
    title: 'Minimize output duplication',
    detail:
      'Store output as pattern ids; merge lists carefully to avoid repeated ids in long failure chains.',
  },
  {
    title: 'Avoid per-character allocations',
    detail:
      'Preallocate node arrays and use integer indices for transitions to reduce GC pressure.',
  },
  {
    title: 'Batch reporting',
    detail:
      'If outputs are heavy, buffer matches and flush in batches to reduce overhead in tight loops.',
  },
]

const edgeCases = [
  'Empty pattern set: build only the root and return no matches.',
  'Very long patterns: ensure indices do not overflow if using 32-bit integers.',
  'Repeated patterns: dedupe at insertion to keep output lists stable.',
  'Unicode input: normalize (NFC/NFKC) consistently to avoid mismatches.',
  'Binary data: treat input as bytes and build a 256-sized alphabet.',
]

const takeaways = [
  'Aho-Corasick turns many-pattern search into one linear pass by combining patterns into a trie and using failure links.',
  'Construction cost is upfront; scanning is fast and stable, especially for streaming data.',
  'Memory and alphabet representation are the main practical tradeoffs.',
  'Correct output reporting depends on failure-link outputs and consistent text normalization.',
  'The algorithm scales well when the pattern dictionary is large and reused often.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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
    { id: 'bp-applications', label: 'Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-definitions', label: 'Definitions' },
    { id: 'core-components', label: 'Core Components' },
    { id: 'core-build', label: 'Construction Workflow' },
    { id: 'core-match', label: 'Matching Workflow' },
    { id: 'core-invariants', label: 'Invariants' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-output', label: 'Output Reporting' },
    { id: 'core-correctness', label: 'Correctness' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-edge-cases', label: 'Edge Cases' },
    { id: 'core-when', label: 'When to Use' },
    { id: 'core-comparison', label: 'Comparisons' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-tuning', label: 'Tuning Tips' },
    { id: 'core-variations', label: 'Variations' },
    { id: 'core-implementation', label: 'Implementation Checklist' },
  ],
  examples: [
    { id: 'ex-code', label: 'Practical Examples' },
    { id: 'ex-worked', label: 'Worked Example' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const ahoHelpStyles = `
.aho-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.aho-help-window {
  width: 100%;
  min-height: 100dvh;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.aho-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.aho-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.aho-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.aho-help-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  padding: 0;
}

.aho-help-control:active {
  border-top: 1px solid #404040;
  border-left: 1px solid #404040;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
}

.aho-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.aho-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.aho-help-tab.is-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.aho-help-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  background: #fff;
  border-top: 1px solid #404040;
}

.aho-help-toc {
  background: #f2f2f2;
  border-right: 1px solid #808080;
  padding: 12px;
  overflow: auto;
}

.aho-help-toc h2 {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.aho-help-toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.aho-help-toc li {
  margin: 0 0 8px;
}

.aho-help-toc a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.aho-help-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.aho-help-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.aho-help-intro {
  margin: 0 0 14px;
  font-size: 12px;
  line-height: 1.5;
}

.aho-help-section {
  margin: 0 0 20px;
}

.aho-help-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.aho-help-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.aho-help-content p,
.aho-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.aho-help-content p {
  margin: 0 0 10px;
}

.aho-help-content ul,
.aho-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.aho-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.aho-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  overflow-x: auto;
}

.aho-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .aho-help-main {
    grid-template-columns: 1fr;
  }

  .aho-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .aho-help-titletext {
    position: static;
    transform: none;
    margin: 0 auto 0 6px;
    font-size: 13px;
    white-space: normal;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function AhoCorasickPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Aho-Corasick (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Aho-Corasick',
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
    <div className="aho-help-page">
      <style>{ahoHelpStyles}</style>
      <div className="aho-help-window" role="presentation">
        <header className="aho-help-titlebar">
          <span className="aho-help-titletext">Aho-Corasick</span>
          <div className="aho-help-controls">
            <button className="aho-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="aho-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="aho-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`aho-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="aho-help-main">
          <aside className="aho-help-toc" aria-label="Table of contents">
            <h2>Contents</h2>
            <ul>
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="aho-help-content">
            <h1 className="aho-help-doc-title">Aho-Corasick</h1>
            <p className="aho-help-intro">
              Aho-Corasick compiles a dictionary of patterns into one automaton, then scans text in a single forward pass without
              backtracking. This page keeps the original material intact, but presents it as a Windows-style help document focused on
              failure links, reporting, and the practical tradeoffs of multi-pattern search.
            </p>
            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="aho-help-section">
                  <h2 className="aho-help-heading">Overview</h2>
                  <p>
                    Aho-Corasick is a multi-string search algorithm that compiles a set of patterns into one machine. It merges the
                    prefixes of all patterns in a trie and adds failure links so the search never moves backward in the text. The result
                    is predictable, linear-time scanning that reports all matches as they occur.
                  </p>
                </section>

                <hr className="aho-help-divider" />

                <section id="bp-history" className="aho-help-section">
                  <h2 className="aho-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="aho-help-divider" />

                <section id="bp-applications" className="aho-help-section">
                  <h2 className="aho-help-heading">Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="aho-help-divider" />

                <section id="bp-takeaways" className="aho-help-section">
                  <h2 className="aho-help-heading">Key Takeaways</h2>
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
                <section id="core-models" className="aho-help-section">
                  <h2 className="aho-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-definitions" className="aho-help-section">
                  <h2 className="aho-help-heading">Definitions and Notation</h2>
                  {definitions.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-components" className="aho-help-section">
                  <h2 className="aho-help-heading">Core Components</h2>
                  {coreComponents.map((block) => (
                    <div key={block.heading}>
                      <h3 className="aho-help-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-build" className="aho-help-section">
                  <h2 className="aho-help-heading">Construction Workflow</h2>
                  {buildSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-match" className="aho-help-section">
                  <h2 className="aho-help-heading">Matching Workflow</h2>
                  {matchSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-invariants" className="aho-help-section">
                  <h2 className="aho-help-heading">Algorithm Invariants</h2>
                  {invariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="aho-help-section">
                  <h2 className="aho-help-heading">Complexity Analysis and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-output" className="aho-help-section">
                  <h2 className="aho-help-heading">Output Reporting Strategy</h2>
                  {outputReporting.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-correctness" className="aho-help-section">
                  <h2 className="aho-help-heading">Correctness Intuition</h2>
                  {correctnessSketch.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="aho-help-section">
                  <h2 className="aho-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-edge-cases" className="aho-help-section">
                  <h2 className="aho-help-heading">Edge Cases to Plan For</h2>
                  <ul>
                    {edgeCases.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-when" className="aho-help-section">
                  <h2 className="aho-help-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-comparison" className="aho-help-section">
                  <h2 className="aho-help-heading">Comparisons with Related Algorithms</h2>
                  {comparisonRows.map((row) => (
                    <div key={row.algorithm}>
                      <h3 className="aho-help-subheading">{row.algorithm}</h3>
                      <p><strong>Strengths:</strong> {row.strengths}</p>
                      <p><strong>Weaknesses:</strong> {row.weaknesses}</p>
                      <p><strong>Best use:</strong> {row.bestUse}</p>
                    </div>
                  ))}
                </section>

                <section id="core-advanced" className="aho-help-section">
                  <h2 className="aho-help-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-tuning" className="aho-help-section">
                  <h2 className="aho-help-heading">Performance Tuning Checklist</h2>
                  {tuningTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-variations" className="aho-help-section">
                  <h2 className="aho-help-heading">Variations and Extensions</h2>
                  {variations.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-implementation" className="aho-help-section">
                  <h2 className="aho-help-heading">Implementation Checklist</h2>
                  <ol>
                    {implementationChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-code" className="aho-help-section">
                  <h2 className="aho-help-heading">Practical Examples</h2>
                  {examples.map((item) => (
                    <div key={item.title}>
                      <h3 className="aho-help-subheading">{item.title}</h3>
                      <pre className="aho-help-codebox">
                        <code>{item.code.trim()}</code>
                      </pre>
                      <p>{item.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-worked" className="aho-help-section">
                  <h2 className="aho-help-heading">Worked Example</h2>
                  <p><strong>Pattern set:</strong> {workedExample.patterns.join(', ')}</p>
                  <p><strong>Text:</strong> {workedExample.text}</p>
                  <ul>
                    {workedExample.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                  <h3 className="aho-help-subheading">Step-by-step trace</h3>
                  {exampleTrace.map((row) => (
                    <p key={`${row.index}-${row.char}`}>
                      <strong>Index {row.index} ({row.char}):</strong> state `{row.state}`. {row.action} Outputs: {row.outputs}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="aho-help-section">
                <h2 className="aho-help-heading">Glossary</h2>
                {definitions.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.detail}
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
