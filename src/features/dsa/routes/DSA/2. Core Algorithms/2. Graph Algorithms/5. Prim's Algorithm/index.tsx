import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const mentalModels = [
  {
    title: 'Growing coral reef',
    detail:
      'Start with a seed node and keep attaching the cheapest edge that touches the reef without creating a cycle.',
  },
  {
    title: 'Cut property in action',
    detail:
      'At any step, the lightest edge crossing the cut between the tree and the rest is always safe to add.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Pick an arbitrary start node; mark it visited.',
      'Push all outgoing edges to a min-heap keyed by weight.',
      'Pop the lightest edge; if it reaches an unvisited node, add it to the tree, mark the node visited, and push its outgoing edges.',
      'Repeat until all vertices are visited or the heap empties (disconnected graphs yield a forest).',
    ],
  },
  {
    heading: 'Data structure choices',
    bullets: [
      'Binary heap: O((V + E) log V) with simple code.',
      'Fibonacci/pairing heap: O(E + V log V) in theory, with higher constants.',
      'Array for dense graphs: O(V^2) but often faster when V is small and E is dense.',
    ],
  },
  {
    heading: 'Correctness levers',
    bullets: [
      'Relies on the cut property: minimum crossing edge is always in some MST.',
      'Visited set prevents cycles; heap ensures we always pick the cheapest crossing edge.',
      'Disconnected graphs produce a minimum spanning forest if you reseed after exhaustion.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O((V + E) log V) with a binary heap and adjacency lists; O(V^2) with adjacency matrix or array-based selection.',
  },
  {
    title: 'Space',
    detail:
      'O(V) for visited and parent; heap holds up to O(E) edges in the worst case.',
  },
  {
    title: 'Practical guidance',
    detail:
      'On dense graphs or small V, the simple array implementation can beat heaps. On sparse large graphs, heaps dominate.',
  },
]

const realWorldUses = [
  {
    context: 'Network design',
    detail:
      'Builds low-cost backbones for fiber, power, or road planning when a connected, minimal-cost scaffold is needed.',
  },
  {
    context: 'Approximation baselines',
    detail:
      'Provides cheap spanning structures used in approximation algorithms (e.g., for TSP heuristics).',
  },
  {
    context: 'Graphics and clustering',
    detail:
      'MST-based clustering and mesh generation can start from Prim, especially on dense proximity graphs.',
  },
]

const examples = [
  {
    title: "Prim's with min-heap",
    code: `function prim(graph, start):
    visited = set([start])
    heap = new MinHeap() // (w, u, v)
    mst = []

    for (v, w) in graph.neighbors(start):
        heap.push((w, start, v))

    while heap and len(visited) < graph.size():
        (w, u, v) = heap.pop_min()
        if v in visited:
            continue
        visited.add(v)
        mst.append((u, v, w))
        for (nxt, wt) in graph.neighbors(v):
            if nxt not in visited:
                heap.push((wt, v, nxt))

    return mst`,
    explanation:
      'Heap ordering guarantees the lightest crossing edge is picked next, satisfying the cut property at every step.',
  },
]

const pitfalls = [
  'Forgetting the visited check can add duplicate vertices and cycles.',
  'Using Prim on a graph with non-existent edges (disconnected) without reseeding yields incomplete trees; treat components separately.',
  'Sorting all edges first turns Prim into Kruskal with extra overhead; stick to adjacency-driven pushes.',
]

const decisionGuidance = [
  'Dense graphs or adjacency-driven contexts: Prim is often faster than Kruskal.',
  'Sparse graphs with edge lists ready: Kruskal may be simpler with Union-Find.',
  'Small integer weights: consider bucketed Prim to reduce heap overhead.',
  'Disconnected graph: run Prim from each component to get a minimum spanning forest.',
]

const takeaways = [
  "Prim's grows one tree outward, always picking the cheapest edge crossing the current cut.",
  'Heap choice affects constants; array-based selection can shine on dense graphs.',
  'Visited checks preserve correctness and avoid cycles.',
]

export default function PrimsAlgorithmPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Prim's Algorithm</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Growing an MST from a single seed</div>
              <p className="win95-text">
                Prim's algorithm builds a minimum spanning tree by always adding the lightest edge that connects the current tree to a new
                vertex. It is a cut-property-driven greedy that thrives on adjacency access and dense graphs.
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
                Where Kruskal sorts edges globally, Prim grows locally from a seed. It maintains a frontier of crossing edges and
                repeatedly picks the cheapest one, ensuring every addition is safe for the MST.
              </p>
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
            <legend>How it works: mechanics in motion</legend>
            <div className="win95-grid win95-grid-3">
              {mechanics.map((block) => (
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
            <legend>Complexity analysis and intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
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
            <legend>Practical example</legend>
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

