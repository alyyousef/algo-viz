import type { JSX } from 'react'

const historicalMoments = [
  {
    title: 'Rene de la Briandais sketches prefix trees (1959)',
    detail:
      'While building dictionary data structures, he described storing words as chains of characters, sparking the idea of sharing prefixes to shrink search time.',
  },
  {
    title: 'Edward Fredkin coins the term trie (1960)',
    detail:
      "Working on telephone routing and coding theory, he popularized the structure and pronounced it 'tree,' highlighting the role of tries in routing based on prefixes.",
  },
  {
    title: 'Patricia and radix compression become standard (Morrison 1968)',
    detail:
      'Patricia (Practical Algorithm To Retrieve Information Coded In Alphanumeric) compressed one-child paths into labeled edges, solving the memory bloat of sparse tries.',
  },
  {
    title: 'Aho-Corasick turns tries into multi-pattern automata (1975)',
    detail:
      'Aho and Corasick added failure links to a trie, enabling simultaneous pattern matching in linear time. Modern IDS systems and text scanners rely on this trick.',
  },
  {
    title: 'Longest-prefix routing and DAWGs industrialize tries (1980s-1990s)',
    detail:
      'BSD routers adopted radix tries for IP prefixes, while directed acyclic word graphs merged suffix-sharing into tries for dictionaries and search engines.',
  },
]

const mentalModels = [
  {
    title: 'Telephone directory walk',
    detail:
      'Each digit or character you dial walks one level deeper. By the time you finish the prefix, you either land on a subscriber (word end) or discover the number never existed.',
  },
  {
    title: 'Deterministic finite automaton',
    detail:
      'A trie is a DFA for a set of strings: states are prefixes, edges are characters, accepting states mark full words. This automaton view clarifies why lookup costs depend on string length, not set size.',
  },
  {
    title: 'Branching factor budget',
    detail:
      'You trade depth for width. Larger alphabets shrink height but inflate per-node memory. Tight alphabets (digits, lowercase letters) make fixed arrays appealing; wide Unicode alphabets push you toward maps or compression.',
  },
  {
    title: 'Shared spine of common prefixes',
    detail:
      'Popular prefixes become highways that many strings share. Optimizing these spines (compression, cache-friendly layouts) pays off more than micro-optimizing rare leaves.',
  },
]

const mechanics = [
  {
    heading: 'Node layout',
    bullets: [
      'Children map: array indexed by alphabet symbol for tiny alphabets (for example, 26 lowercase letters), or hash/map for large alphabets.',
      'Metadata: end-of-word flag, optional stored value, frequency counts for autocomplete ranking, and subtree size for prefix analytics.',
      'Compression: radix or Patricia tries store edge labels as substrings instead of single characters to collapse single-child paths.',
    ],
  },
  {
    heading: 'Core operations',
    bullets: [
      'Search: walk characters; fail fast on missing edge. O(L) in string length L, independent of number of keys.',
      'Insert: create nodes along the path; mark terminal. With compression, split edges when a new word diverges mid-label.',
      'Delete: unmark terminal; prune nodes that have no children to reclaim space. Lazy deletes retain structure but save CPU.',
    ],
  },
  {
    heading: 'Traversal and queries',
    bullets: [
      'Prefix query: land on prefix node, then DFS/BFS to enumerate completions in lexicographic order.',
      'Longest-prefix match: walk until the path breaks while remembering the deepest terminal node; critical for IP routing.',
      'Fuzzy search: augment nodes with dynamic programming states (Levenshtein automaton) or BK-tree overlay to bound edit distance.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Lookup, insert, delete',
    detail:
      'O(L) where L is the key length. For a million URLs averaging 30 characters, lookup takes ~30 character steps rather than O(log n) comparisons in a balanced tree.',
  },
  {
    title: 'Memory footprint',
    detail:
      'Naive fixed arrays cost O(A * N) pointers, where A is alphabet size and N nodes. A 64-child pointer array per node (ASCII letters, digits, dash, dot) at 8 bytes each is ~512 bytes per node. Compression and sparse maps reduce this sharply.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Pointer chasing hurts locality. Packed representations (double-array tries, LOUDS bitmaps) turn traversals into contiguous array accesses and can double or triple throughput on modern CPUs.',
  },
  {
    title: 'Construction cost',
    detail:
      'Building from M strings of average length L is O(M * L). Bulk construction from sorted input can compress shared prefixes more efficiently than inserting one-by-one.',
  },
]

const realWorld = [
  {
    context: 'Autocomplete and search suggestions',
    detail:
      'Search boxes rank completions by frequency stored at trie nodes. Query latency stays near O(prefix length), so latency barely grows as the corpus scales.',
  },
  {
    context: 'Routers and firewalls',
    detail:
      'Patricia and multi-bit tries implement longest-prefix match for IP routes. Juniper, Cisco, and Linux routing stacks use compressed tries to fit full tables in cache and meet microsecond budgets.',
  },
  {
    context: 'Spell-checkers and language tooling',
    detail:
      'Dictionaries live in tries or DAWGs so that one edit-distance search touches only nearby branches. Tokenizers and morphological analyzers in MeCab and Sudachi use double-array tries for Japanese text.',
  },
  {
    context: 'Bioinformatics',
    detail:
      'Genome indexes store k-mers in compressed tries or suffix-based variants to count frequency and locate motifs without loading entire sequences into memory.',
  },
  {
    context: 'Configuration and logging',
    detail:
      "Feature flags, structured log schemas, and metric name hierarchies often use tries for prefix filtering (for example, 'payments.api.*') with predictable latency.",
  },
]

const examples = [
  {
    title: 'Basic insert and search',
    code: `class TrieNode:
    def __init__(self):
        self.children = {}      # map char -> TrieNode
        self.is_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.children.setdefault(ch, TrieNode())
        node.is_word = True

    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.is_word`,
    explanation:
      'Lookup cost scales with word length. Inserting or searching 10 million strings of average length 12 still takes about 12 edge traversals per operation.',
  },
  {
    title: 'Longest-prefix match (routing flavor)',
    code: `function longestPrefix(node, query):
    best = null
    for ch in query:
        if ch not in node.children:
            break
        node = node.children[ch]
        if node.is_word:
            best = node  // update deepest match
    return best`,
    explanation:
      'Routers track the deepest terminal node visited so far. Even with thousands of prefixes, the walk cost is bounded by address length (32 or 128 bits).',
  },
  {
    title: 'Radix split on insert',
    code: `// edge label holds a string, not a single char
function insert(root, word):
    node = root
    while word not empty:
        find edge (label, child) sharing a common prefix with word
        if no edge: add new edge labeled word to a new leaf; return
        common = longestCommonPrefix(label, word)
        if common.length < label.length:
            // split existing edge
            suffix = label[common.length:]
            newChild = new Node()
            newChild.edges.append((suffix, child))
            replace edge label with common pointing to newChild
            child = newChild
        word = word[common.length:]
        node = child
    node.is_word = true`,
    explanation:
      'Radix compression collapses chains of single-child edges into one labeled edge. This cut can slash memory by 2x to 10x on sparse datasets according to benchmarks from CLRS and implementations on GeeksforGeeks.',
  },
]

const pitfalls = [
  'Storing full child arrays for large alphabets balloons memory. Prefer maps or compressed edges when the alphabet is wide or sparsely used.',
  'Forgetting to normalize input (case, Unicode normalization, trimming) creates duplicate paths and missed matches.',
  "Not marking terminal nodes separately from leaf status breaks words that are prefixes of other words (for example, 'art' vs 'artist').",
  'Deletion that removes a node without checking shared prefixes can orphan other words. Use reference counts or check child counts before pruning.',
  'Ignoring cache locality turns tries into pointer-chasing benchmarks. Packed representations or small-character arrays can double throughput.',
]

const decisionGuidance = [
  'Use a trie when you need predictable O(L) prefix queries, lexicographic enumeration, or longest-prefix match and can afford extra memory.',
  'Use a hash map when you only need exact membership and memory is tight; hashes avoid wide branching costs but cannot list prefixes efficiently.',
  'Use a balanced BST when you need ordered iteration but memory overhead of tries is unacceptable; expect O(log n) comparisons instead of O(L) character steps.',
  'Use radix or Patricia variants when the alphabet is sparse or keys are long (URLs, IP addresses).',
  'Use DAWGs or suffix arrays when you need to compress massive dictionaries or run many substring queries with lower memory.',
]

const advancedInsights = [
  {
    title: 'Double-array tries and LOUDS',
    detail:
      'Double-array tries store two integer arrays (base, check) so traversals use contiguous memory. LOUDS encodes tree topology in bitmaps with rank/select, enabling memory-mapped tries used in search engines.',
  },
  {
    title: 'Persistent and concurrent tries',
    detail:
      'Path-copying yields persistent tries for functional languages (Clojure, Haskell) so snapshots share most structure. Lock-free concurrent tries use compare-and-swap on edge pointers to scale updates.',
  },
  {
    title: 'Weighted and compressed autocompletion',
    detail:
      'Nodes can store top-k completions or cumulative scores to answer "best 5 suggestions" without scanning full subtrees. This mirrors production search bars at Google and Netflix.',
  },
  {
    title: 'Hybridization with automata',
    detail:
      'Aho-Corasick adds failure links for multi-pattern search; Levenshtein automata over tries support bounded edit distance queries in near linear time in pattern length.',
  },
]

const takeaways = [
  'Lookup and prefix queries run in O(L) where L is key length, independent of the number of keys.',
  'Memory is the tax: compress edges or switch child maps to keep tries practical on wide alphabets.',
  'Tries double as automata, powering autocomplete, routing, and multi-pattern matching in real systems.',
  'Choose the variant intentionally: radix for sparsity, double-array for cache locality, DAWG for extreme compression.',
]

export default function TriesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{`
        .win95-page {
          background: #C0C0C0;
          min-height: 100vh;
          width: 100%;
          margin: 0;
          padding: 0;
          color: #000;
          font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
          font-size: 12px;
          -webkit-font-smoothing: none;
        }
        .win95-page * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          background: #C0C0C0;
        }
        .win95-window {
          border: 2px solid;
          border-color: #fff #404040 #404040 #fff;
          background: #C0C0C0;
          width: 100%;
          min-height: 100vh;
        }
        .win95-titlebar {
          background: #000080;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 6px;
          height: 28px;
        }
        .win95-title {
          font-weight: bold;
          font-size: 12px;
          line-height: 1;
        }
        .win95-close {
          background: #C0C0C0;
          border: 2px solid;
          border-color: #fff #404040 #404040 #fff;
          width: 24px;
          height: 22px;
          display: grid;
          place-items: center;
          font-weight: bold;
          font-size: 12px;
          padding: 0;
          cursor: pointer;
        }
        .win95-close:active {
          border-color: #404040 #fff #fff #404040;
        }
        .win95-content {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .win95-panel {
          border: 2px solid;
          border-color: #808080 #fff #fff #808080;
          padding: 10px;
          background: #C0C0C0;
        }
        .win95-panel.raised {
          border-color: #fff #404040 #404040 #fff;
        }
        .win95-fieldset {
          border: 2px solid;
          border-color: #808080 #404040 #404040 #808080;
          padding: 10px;
          margin: 0;
        }
        .win95-fieldset legend {
          padding: 0 6px;
          font-weight: bold;
          font-size: 12px;
        }
        .win95-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 8px;
        }
        .win95-panel-title {
          margin: 0 0 4px 0;
          font-weight: bold;
          font-size: 12px;
        }
        .win95-body-text {
          margin: 0;
          line-height: 1.4;
        }
        .win95-list {
          margin: 0;
          padding-left: 16px;
          line-height: 1.4;
        }
        .win95-code {
          background: #b0b0b0;
          border: 2px solid;
          border-color: #404040 #fff #fff #404040;
          padding: 8px;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          margin: 6px 0;
          overflow-x: auto;
          white-space: pre;
          color: #000;
        }
        a {
          color: #000;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        button:focus-visible,
        a:focus-visible {
          outline: 1px dotted #000;
        }
        button:focus-visible {
          outline-offset: -3px;
        }
        a:focus-visible {
          outline-offset: 1px;
        }
        h1 {
          margin: 0 0 4px 0;
          font-size: 14px;
        }
        .win95-subtitle {
          margin: 0 0 6px 0;
          font-size: 11px;
        }
        .win95-note {
          margin: 8px 0 0 0;
          font-size: 11px;
        }
      `}</style>

      <div className="win95-window">
        <div className="win95-titlebar">
          <span className="win95-title">Tries (Prefix Trees)</span>
          <button className="win95-close" aria-label="Close" type="button">
            X
          </button>
        </div>

        <div className="win95-content">
          <div className="win95-panel raised">
            <h1>Tries (Prefix Trees)</h1>
            <p className="win95-subtitle">Prefix-guided lookup, autocomplete, and longest-match data structures</p>
            <p className="win95-body-text">
              Tries index strings by walking characters from root to leaf. They buy predictable O(length) lookups,
              lexicographic traversal, and longest-prefix matching at the cost of extra memory and careful engineering around
              sparsity and cache locality. This page unpacks how tries work, the variants professionals use, and the pitfalls that
              have broken routers, search bars, and spell-checkers in the wild.
            </p>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-body-text">
                When datasets are strings or tokens, the natural question is how quickly you can answer prefix-heavy queries
                without hashing the entire string or performing many comparisons. Tries answer by turning each character into a
                step along a path. The time bound tracks the query length, not the corpus size, so million-scale dictionaries
                still answer in a handful of steps. The trade-off is space: every possible branching option costs memory unless
                you compress or encode it smartly.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid">
              {historicalMoments.map((item) => (
                <article key={item.title} className="win95-panel">
                  <p className="win95-panel-title">{item.title}</p>
                  <p className="win95-body-text">{item.detail}</p>
                </article>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid">
              {mentalModels.map((item) => (
                <article key={item.title} className="win95-panel">
                  <p className="win95-panel-title">{item.title}</p>
                  <p className="win95-body-text">{item.detail}</p>
                </article>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid">
              {mechanics.map((block) => (
                <article key={block.heading} className="win95-panel">
                  <p className="win95-panel-title">{block.heading}</p>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity and performance</legend>
            <div className="win95-grid">
              {complexityNotes.map((note) => (
                <article key={note.title} className="win95-panel">
                  <p className="win95-panel-title">{note.title}</p>
                  <p className="win95-body-text">{note.detail}</p>
                </article>
              ))}
            </div>
            <p className="win95-note">
              Think in constants: 30 character steps at a few cycles each is microseconds; three cache misses per level can dwarf
              asymptotic wins. Packed layouts and compression often matter more than shaving a comparison.
            </p>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid">
              {realWorld.map((item) => (
                <article key={item.context} className="win95-panel">
                  <p className="win95-panel-title">{item.context}</p>
                  <p className="win95-body-text">{item.detail}</p>
                </article>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-panel">
              <div className="win95-grid">
                {examples.map((example) => (
                  <article key={example.title} className="win95-panel raised">
                    <p className="win95-panel-title">{example.title}</p>
                    <pre className="win95-code">
                      <code>{example.code}</code>
                    </pre>
                    <p className="win95-body-text">{example.explanation}</p>
                  </article>
                ))}
              </div>
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
              <ol className="win95-list">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights and current frontiers</legend>
            <div className="win95-grid">
              {advancedInsights.map((item) => (
                <article key={item.title} className="win95-panel">
                  <p className="win95-panel-title">{item.title}</p>
                  <p className="win95-body-text">{item.detail}</p>
                </article>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel raised">
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
