import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMoments = [
  {
    title: 'AVL trees debut (Adelson-Velsky and Landis, 1962)',
    detail:
      'The first self-balancing binary search tree, enforcing height difference of at most 1 between child subtrees to guarantee O(log n) operations.',
  },
  {
    title: 'Bayer and McCreight publish B-trees (1972)',
    detail:
      'Designed for magnetic disks, B-trees pack many keys per node to reduce I/O. Their fanout keeps height tiny, inspiring nearly every database index and filesystem.',
  },
  {
    title: "Red-black trees formalized (Guibas and Sedgewick, 1978)",
    detail:
      "Red-black trees reframe Bayer's symmetric binary B-trees with colors and simple rotation rules, balancing update cost with easy implementation.",
  },
  {
    title: '2-3-4 trees connect B-trees and red-black trees (late 1970s)',
    detail:
      'Viewing red-black trees as encoded 2-3-4 trees clarified correctness proofs and taught how black-height parity preserves balance.',
  },
  {
    title: 'B+ trees and bulk-loading (1980s-2000s)',
    detail:
      'B+ trees moved all payloads to leaves and linked them for fast range scans. Bulk-loading and buffer trees adapted them to streaming and log-structured workloads.',
  },
]

const mentalModels = [
  {
    title: 'Height as a performance contract',
    detail:
      'AVL enforces a tight contract on height; red-black relaxes it for cheaper updates; B-trees shrink height by widening nodes. Every rule exists to keep paths logarithmic.',
  },
  {
    title: 'Rotations as weight transfers',
    detail:
      'Tree rotations move weight between siblings the way you would rebalance a bookshelf. They preserve in-order sequence while adjusting local height.',
  },
  {
    title: 'Parity bookkeeping',
    detail:
      'Red-black colors encode a 2-3-4 tree. Black links are single edges; a red edge fuses two nodes. Keeping black-heights equal across siblings preserves balance.',
  },
  {
    title: 'B-tree as a page of sorted slots',
    detail:
      'A B-tree node is a disk page of sorted keys with child pointers between them. Splitting a full page is like moving overflow books to a new shelf and promoting a divider key upward.',
  },
]

const mechanics = [
  {
    heading: 'AVL essentials',
    bullets: [
      'Invariant: balance factor of each node (height(left) - height(right)) is -1, 0, or +1.',
      'Updates: single or double rotations (LL, RR, LR, RL) restore balance after inserts/deletes.',
      'Height bound: h <= 1.44 log2(n + 2), giving tighter search depth than red-black.',
    ],
  },
  {
    heading: 'Red-black essentials',
    bullets: [
      'Properties: roots and leaves are black; red nodes have black children; all root-to-leaf paths contain the same number of black nodes.',
      'Fix-up rules: recolor and rotate to resolve red-red violations after insert/delete. At most O(1) rotations per update.',
      'Height bound: h <= 2 log2(n + 1). Looser than AVL but cheaper rebalancing.',
    ],
  },
  {
    heading: 'B-tree essentials',
    bullets: [
      'Order t: each node has between t and 2t children (except root); keys are kept sorted with separators guiding search.',
      'Node split: when a node overflows, split around the median key and promote it to the parent. Merge or borrow on deletion.',
      'Height: O(log_t n); with fanout 256, a million keys fit in height 3 or 4, minimizing disk or cache misses.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time bounds',
    detail:
      'All guarantee O(log n) search, insert, and delete. AVL offers smaller constant height; red-black offers bounded rotations; B-trees minimize I/O with wide nodes.',
  },
  {
    title: 'Rotation costs',
    detail:
      'AVL may rotate up to O(log n) nodes on delete; red-black typically uses a constant number of rotations. B-trees split or merge nodes along a root-to-leaf path, also O(log n).',
  },
  {
    title: 'Cache and disk behavior',
    detail:
      'Binary trees are pointer-heavy and cache-unfriendly; B-trees and B+ trees pack keys contiguously so a single cache line or disk page yields many comparisons.',
  },
  {
    title: 'Memory footprint',
    detail:
      'AVL and red-black: one color or height byte plus two child pointers per node. B-trees: arrays of keys and child pointers sized to the block or page; overhead pays off by reducing height.',
  },
]

const realWorld = [
  {
    context: 'Language runtimes and standard libraries',
    detail:
      'C++ std::map, Java TreeMap, and Linux kernel rbtree use red-black trees for ordered maps and scheduling queues. AVL appears in some language symbol tables for faster lookups.',
  },
  {
    context: 'Databases and storage engines',
    detail:
      'B+ trees back PostgreSQL and InnoDB indexes; SQLite uses B-trees for tables and indexes; LMDB uses B+ trees in memory-mapped pages.',
  },
  {
    context: 'Filesystems',
    detail:
      'NTFS, XFS, APFS, and ext4 HTree variants rely on B-tree like structures to index directories and metadata with minimal disk seeks.',
  },
  {
    context: 'Compilers and tooling',
    detail:
      'Red-black and AVL trees maintain ordered symbol tables and interval trees for source maps and register allocation.',
  },
  {
    context: 'Networking and OS kernels',
    detail:
      'Route caches, process schedulers, and timer wheels leverage red-black trees for predictable log-time insertion and lookup under contention.',
  },
]

const examples = [
  {
    title: 'AVL rotation sketch (right rotation)',
    code: `function rotateRight(y):
    x = y.left
    T2 = x.right
    x.right = y
    y.left = T2
    updateHeight(y)
    updateHeight(x)
    return x  // new subtree root

// Used in LL or LR cases after balance checks`,
    explanation:
      'Rotations preserve in-order traversal while shifting height from one side to the other. Double rotations (LR, RL) chain two single rotations.',
  },
  {
    title: 'Red-black insert fix-up (outline)',
    code: `insert node as red using BST insert
while parent(node) is red:
    if parent is left child:
        uncle = right sibling of parent
        if uncle is red: recolor parent, uncle black; grandparent red; node = grandparent
        else:
            if node is right child: node = parent; rotateLeft(node)
            parent(node).color = black; grandparent.color = red; rotateRight(grandparent)
    else: mirror cases
root.color = black`,
    explanation:
      'Recoloring handles red-red via 2-3-4 tree split. Rotations resolve structural violations. At most a constant number of rotations are needed.',
  },
  {
    title: 'B-tree search (order t)',
    code: `function search(node, key):
    i = 0
    while i < node.keys.length and key > node.keys[i]:
        i += 1
    if i < node.keys.length and key == node.keys[i]:
        return (node, i)
    if node.isLeaf: return null
    return search(node.children[i], key)`,
    explanation:
      'Each node acts like a small sorted array; you scan or binary search within it, then follow one child. Height stays tiny because each node fans out widely.',
  },
]

const pitfalls = [
  'Incorrectly updating heights or balance factors after AVL rotations leads to silent drift and future imbalances.',
  'Forgetting to recolor and fix red-red cases in red-black insert/delete causes property violations that may not surface until deep traversals.',
  'Choosing too small a B-tree order wastes space and I/O; too large increases in-node search cost. Tune fanout to page size and key width.',
  'Mixing payload storage between internal and leaf nodes in B-trees complicates range scans; B+ trees place payloads only in leaves for predictable iteration.',
  'Neglecting bulk-loading for sorted inserts into B+ trees causes repeated splits and fragmentation.',
]

const decisionGuidance = [
  'Pick AVL when read-heavy workloads demand minimal height and updates are not too frequent.',
  'Pick red-black as a general-purpose in-memory ordered map with balanced read/write performance and simple constant-rotation fixes.',
  'Pick B+ trees for disk or cache-aware indexes, range scans, and when fanout shrinks height dramatically.',
  'Pick treaps or skip lists when probabilistic balance is acceptable and implementation simplicity matters more than worst-case guarantees.',
  'If writes dominate and can be batched, consider log-structured merge trees instead of constantly rebalancing a B-tree.',
]

const advancedInsights = [
  {
    title: 'Order statistics and intervals',
    detail:
      'Augment nodes with subtree sizes to answer k-th element and rank queries in O(log n); store interval max endpoints to build interval trees on top of red-black or AVL bases.',
  },
  {
    title: 'Bulk-loading and buffer trees',
    detail:
      'Building B+ trees from sorted data achieves O(n) construction. Buffer trees batch writes at internal nodes to amortize I/O, useful for append-heavy workloads.',
  },
  {
    title: 'Relaxed balancing',
    detail:
      'Weak AVL and chromatic trees allow temporary violations resolved by background fixes, smoothing latency spikes for real-time systems.',
  },
  {
    title: 'Cache-aware layouts',
    detail:
      'Eytzinger or van Emde Boas layouts store complete binary trees in arrays to exploit spatial locality while preserving log-time search.',
  },
]

const takeaways = [
  'AVL, red-black, and B-tree families all enforce logarithmic height with different trade-offs: strictness vs rotation cost vs fanout.',
  'Red-black trees dominate general-purpose ordered maps; AVL offers faster lookups with potentially costlier updates.',
  'B+ trees win on disk and cache efficiency, especially for range scans and large fanout indexes.',
  'Match the tree to workload: memory vs disk, read vs write mix, need for range scans, and tolerance for probabilistic balance.',
]

const quickGlossary = [
  {
    term: 'AVL tree',
    definition: 'A self-balancing BST with strict local height-balance constraints.',
  },
  {
    term: 'Red-black tree',
    definition:
      'A self-balancing BST using node colors and black-height invariants for near-balanced depth.',
  },
  {
    term: 'B-tree',
    definition:
      'A multiway search tree optimized for block storage by keeping many keys per node.',
  },
  {
    term: 'B+ tree',
    definition:
      'A B-tree variant that stores payloads in leaves and links leaves for fast range scans.',
  },
  {
    term: 'Rotation',
    definition:
      'A local tree transformation preserving in-order order while changing subtree heights.',
  },
  {
    term: 'Fanout',
    definition: 'The number of children per internal node in a multiway tree.',
  },
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
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'Structure and Operations' },
    { id: 'core-complexity', label: 'Complexity and Performance' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-usage', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const tree98HelpStyles = `
.tree98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.tree98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.tree98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.tree98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.tree98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.tree98-control {
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
  cursor: pointer;
}

.tree98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.tree98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.tree98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.tree98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.tree98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.tree98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.tree98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tree98-toc-list li {
  margin: 0 0 8px;
}

.tree98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.tree98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.tree98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.tree98-section {
  margin: 0 0 20px;
}

.tree98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.tree98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.tree98-content p,
.tree98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.tree98-content p {
  margin: 0 0 10px;
}

.tree98-content ul,
.tree98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.tree98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.tree98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
  overflow-x: auto;
}

.tree98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .tree98-main {
    grid-template-columns: 1fr;
  }

  .tree98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

export default function AdvancedTreesPage(): JSX.Element {
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
    document.title = `Advanced Trees (AVL, Red-Black, B-Tree) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Advanced Trees (AVL, Red-Black, B-Tree)',
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
    <div className="tree98-help-page">
      <style>{tree98HelpStyles}</style>
      <div className="tree98-window" role="presentation">
        <header className="tree98-titlebar">
          <span className="tree98-title-text">Advanced Trees (AVL, Red-Black, B-Tree)</span>
          <div className="tree98-title-controls">
            <button className="tree98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="tree98-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="tree98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tree98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tree98-main">
          <aside className="tree98-toc" aria-label="Table of contents">
            <h2 className="tree98-toc-title">Contents</h2>
            <ul className="tree98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="tree98-content">
            <h1 className="tree98-doc-title">Advanced Trees (AVL, Red-Black, B-Tree)</h1>
            <p>
              Balanced trees enforce logarithmic height so lookups and updates stay predictable. AVL tightens height strictly,
              red-black eases balancing for cheaper updates, and B-tree families trade depth for wide fanout to minimize cache and
              disk misses.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="tree98-section">
                  <h2 className="tree98-heading">Overview</h2>
                  <p>
                    Balanced trees solve the same problem with different levers: control height. AVL uses strict balance factors,
                    red-black uses color parity, and B-trees widen nodes to slash depth.
                  </p>
                  <p>
                    The right choice depends on where time is spent: CPU rotations, cache locality, or disk I/O. All three
                    families guarantee logarithmic operations, but with different constants and data layout tradeoffs.
                  </p>
                </section>

                <hr className="tree98-divider" />

                <section id="bp-history" className="tree98-section">
                  <h2 className="tree98-heading">Historical Context</h2>
                  {historicalMoments.map((item) => (
                    <div key={item.title}>
                      <h3 className="tree98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="tree98-divider" />

                <section id="bp-takeaways" className="tree98-section">
                  <h2 className="tree98-heading">Key Takeaways</h2>
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
                <section id="core-models" className="tree98-section">
                  <h2 className="tree98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="tree98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="core-mechanics" className="tree98-section">
                  <h2 className="tree98-heading">Structure and Operations</h2>
                  {mechanics.map((item) => (
                    <div key={item.heading}>
                      <h3 className="tree98-subheading">{item.heading}</h3>
                      <ul>
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-complexity" className="tree98-section">
                  <h2 className="tree98-heading">Complexity and Performance Intuition</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    Heights differ subtly but matter: AVL height about 1.44 log2 n, red-black about 2 log2 n, B-tree height about
                    log base fanout of n. Cache and I/O dominate constants, so choose structure with your memory hierarchy in mind.
                  </p>
                </section>

                <section id="core-applications" className="tree98-section">
                  <h2 className="tree98-heading">Real-World Applications</h2>
                  {realWorld.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="tree98-section">
                  <h2 className="tree98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-usage" className="tree98-section">
                  <h2 className="tree98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-advanced" className="tree98-section">
                  <h2 className="tree98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="tree98-section">
                <h2 className="tree98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="tree98-subheading">{example.title}</h3>
                    <div className="tree98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="tree98-section">
                <h2 className="tree98-heading">Glossary</h2>
                {quickGlossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
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
