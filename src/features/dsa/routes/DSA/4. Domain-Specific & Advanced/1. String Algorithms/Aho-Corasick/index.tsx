import type { JSX } from 'react'

import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'


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
export default function AhoCorasickPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Aho-Corasick</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Multi-pattern string matching in a single linear scan</div>
              <p className="win95-text">
                Aho-Corasick builds a trie of patterns and augments it with failure links, turning a dictionary of strings into
                a finite automaton. That automaton can scan text once, reporting every match for every pattern without backtracking.
                It shines when you have many patterns, repeated searches, or streaming input.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Aho-Corasick is a multi-string search algorithm that compiles a set of patterns into one machine. It merges the
                prefixes of all patterns in a trie and adds failure links so the search never moves backward in the text. The result
                is predictable, linear-time scanning that reports all matches as they occur.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
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
            <legend>Definitions and notation</legend>
            <div className="win95-grid win95-grid-2">
              {definitions.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: core components</legend>
            <div className="win95-grid win95-grid-3">
              {coreComponents.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Construction workflow</legend>
            <div className="win95-grid win95-grid-2">
              {buildSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Building the automaton is a one-time cost. Once built, it can be reused across many texts or long-lived streams.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Matching workflow</legend>
            <div className="win95-grid win95-grid-2">
              {matchSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm invariants</legend>
            <div className="win95-grid win95-grid-2">
              {invariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The algorithm is linear in the text size plus matches, but memory depends heavily on how you represent transitions.
                Choose dense tables for speed with small alphabets, or sparse maps for large alphabets and big pattern sets.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>
          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked example (patterns vs text)</legend>
            <div className="win95-panel win95-panel--raised">
              <div className="win95-heading">Pattern set</div>
              <p className="win95-text">{workedExample.patterns.join(', ')}</p>
              <div className="win95-heading">Text</div>
              <p className="win95-text">{workedExample.text}</p>
              <ul className="win95-list">
                {workedExample.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
            <div className="win95-panel">
              <div className="win95-heading">Step-by-step trace</div>
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Char</th>
                    <th>State after step</th>
                    <th>Action</th>
                    <th>Outputs</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleTrace.map((row) => (
                    <tr key={`${row.index}-${row.char}`}>
                      <td>{row.index}</td>
                      <td>{row.char}</td>
                      <td>{row.state}</td>
                      <td>{row.action}</td>
                      <td>{row.outputs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Output reporting strategy</legend>
            <div className="win95-grid win95-grid-2">
              {outputReporting.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Correctness intuition</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessSketch.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>
          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Edge cases to plan for</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {edgeCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>
          <fieldset className="win95-fieldset">
            <legend>Comparisons with related algorithms</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Algorithm</th>
                    <th>Strengths</th>
                    <th>Weaknesses</th>
                    <th>Best use</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.algorithm}>
                      <td>{row.algorithm}</td>
                      <td>{row.strengths}</td>
                      <td>{row.weaknesses}</td>
                      <td>{row.bestUse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance tuning checklist</legend>
            <div className="win95-grid win95-grid-2">
              {tuningTips.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variations and extensions</legend>
            <div className="win95-grid win95-grid-2">
              {variations.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation checklist</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {implementationChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
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
