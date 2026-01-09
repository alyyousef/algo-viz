import type { JSX } from 'react'

import { Link } from 'react-router-dom'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

const historicalMilestones = [
  {
    title: 'Trie foundations for prefix search (1960s)',
    detail:
      'Tries made multi-word lookup fast, but still required one search per pattern. They set the stage for automaton-based matching.',
  },
  {
    title: 'Aho and Corasick publish the algorithm (1975)',
    detail:
      'They unify many patterns into one finite automaton, enabling linear time scanning with failure links that reuse partial matches.',
  },
  {
    title: 'Adoption in intrusion detection and spam filters (1990s)',
    detail:
      'Signature scanning needs to match thousands of strings in real time; Aho-Corasick became a practical workhorse.',
  },
  {
    title: 'Modern uses in NLP and genomics (2000s+)',
    detail:
      'Token scanning, dictionary matching, and DNA motif search use the same automaton idea with large alphabets and streaming input.',
  },
]

const mentalModels = [
  {
    title: 'One mega-dictionary, one pass',
    detail:
      'Instead of searching each pattern separately, you build a single machine that knows all patterns and scan the text once.',
  },
  {
    title: 'Fallback arrows for partial progress',
    detail:
      'Failure links act like "try the next best suffix" pointers, so the machine never rewinds the text pointer.',
  },
  {
    title: 'A trie with memory',
    detail:
      'The trie stores prefixes. The automaton augments each node with where to go when the next character is missing.',
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
      'Can store pattern ids or lengths for start index reconstruction.',
    ],
  },
  {
    heading: 'Transition table',
    bullets: [
      'When an edge exists, follow it. Otherwise follow failures until a match or root.',
      'A dense table is fast but memory heavy; sparse maps save space.',
      'Some implementations precompute transitions for O(1) steps.',
    ],
  },
]

const buildSteps = [
  {
    title: 'Insert patterns into a trie',
    detail:
      'Each pattern walks from root along characters, creating nodes when missing. Mark the end node with the pattern id.',
  },
  {
    title: 'Compute failure links with BFS',
    detail:
      'Initialize root failure to itself. For each node, follow its parent failure until a matching edge is found.',
  },
  {
    title: 'Propagate output lists',
    detail:
      'A node should also output patterns from its failure node, so matches are reported without extra traversal.',
  },
  {
    title: 'Finalize transitions',
    detail:
      'Optionally precompute goto transitions for every node and character to make scanning strictly O(1) per symbol.',
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
      'If there is a child edge for the character, follow it. Otherwise follow failure links until one exists or you reach root.',
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

const complexityNotes = [
  {
    title: 'Construction time',
    detail:
      'O(total pattern length + alphabet transitions). BFS on the trie edges builds failure links once per node.',
  },
  {
    title: 'Search time',
    detail:
      'O(text length + number of matches). Each character causes at most a few failure transitions amortized.',
  },
  {
    title: 'Memory cost',
    detail:
      'O(total pattern length * alphabet representation). Dense tables grow with alphabet size; sparse maps grow with edges.',
  },
  {
    title: 'Best for many patterns',
    detail:
      'Overhead amortizes when patterns are numerous or reused across many searches or streams.',
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
]

const examples = [
  {
    title: 'Build the automaton',
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
      'Insert all patterns into a trie, then BFS to compute failure links and merge output lists so matches are immediate.',
  },
  {
    title: 'Scan a text stream',
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

const pitfalls = [
  'Forgetting to merge output lists from failure links, which hides matches for suffix patterns.',
  'Assuming dense alphabet tables are always faster; they can explode memory with Unicode or byte alphabets.',
  'Treating the root as a normal node; special-case root transitions to avoid infinite failure loops.',
  'Reporting duplicates when a pattern appears multiple times in the output chain without deduping ids.',
  'Using different normalization for patterns and text (case folding, Unicode) which breaks matches.',
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
]

const takeaways = [
  'Aho-Corasick turns many-pattern search into one linear pass by combining patterns into a trie and using failure links.',
  'Construction cost is upfront; scanning is fast and stable, especially for streaming data.',
  'Memory and alphabet representation are the main practical tradeoffs.',
  'Correct output reporting depends on failure-link outputs and consistent text normalization.',
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
