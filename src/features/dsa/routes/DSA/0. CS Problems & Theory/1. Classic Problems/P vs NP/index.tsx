import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it asks',
    details:
      'Are problems whose solutions can be verified quickly also solvable quickly?',
    notes:
      'Formally: is P equal to NP? It is one of the Clay Millennium problems.',
  },
  {
    title: 'Why it matters',
    details:
      'If P = NP, many hard problems become efficiently solvable; if not, limits are permanent.',
    notes:
      'It impacts cryptography, optimization, AI, and theoretical boundaries of computation.',
  },
  {
    title: 'What it teaches',
    details:
      'Complexity classes, reductions, NP-completeness, and the difference between solving and verifying.',
    notes:
      'It is the cornerstone question of theoretical computer science.',
  },
]

const historicalContext = [
  {
    title: '1960s: Birth of complexity theory',
    details:
      'Researchers began classifying problems by time and space needed to solve them.',
    notes:
      'This led to formal complexity classes like P and NP.',
  },
  {
    title: '1971: Cook-Levin theorem',
    details:
      'Showed SAT is NP-complete, launching the theory of NP-completeness.',
    notes:
      'If SAT is in P, then all NP problems are in P.',
  },
  {
    title: '1970s: Karp reductions',
    details:
      'Richard Karp identified 21 NP-complete problems via polynomial reductions.',
    notes:
      'These reductions made NP-completeness a practical tool for hardness.',
  },
  {
    title: '2000: Millennium Prize',
    details:
      'The Clay Mathematics Institute offered a $1,000,000 prize for a proof.',
    notes:
      'The problem remains open.',
  },
]

const quickGlossary = [
  {
    term: 'P',
    definition: 'Problems solvable in polynomial time by a deterministic algorithm.',
  },
  {
    term: 'NP',
    definition: 'Problems whose solutions can be verified in polynomial time.',
  },
  {
    term: 'NP-hard',
    definition: 'At least as hard as any problem in NP; not necessarily in NP itself.',
  },
  {
    term: 'NP-complete',
    definition: 'Problems in NP that are also NP-hard. The hardest problems in NP.',
  },
  {
    term: 'Reduction',
    definition: 'A polynomial-time transformation from one problem to another.',
  },
  {
    term: 'Certificate',
    definition: 'A short proof or witness that allows quick verification of a solution.',
  },
]

const problemSetup = [
  {
    title: 'P',
    detail:
      'Contains problems solvable in time n^k for some constant k.',
  },
  {
    title: 'NP',
    detail:
      'Contains problems verifiable in polynomial time given a certificate.',
  },
  {
    title: 'The question',
    detail:
      'Is every problem in NP also in P? Equivalently, is P = NP?',
  },
  {
    title: 'Consequences',
    detail:
      'If P = NP, every NP problem is efficiently solvable. If not, some are inherently hard.',
  },
]

const formalDefinitions = [
  {
    title: 'Deterministic polynomial time',
    detail:
      'A problem is in P if there exists a deterministic Turing machine that solves it in O(n^k) time.',
  },
  {
    title: 'Nondeterministic polynomial time',
    detail:
      'A problem is in NP if a nondeterministic machine can solve it in polynomial time.',
  },
  {
    title: 'Verifier definition',
    detail:
      'NP is the class of languages L for which there is a polynomial-time verifier V(x, y).',
  },
  {
    title: 'Certificate size',
    detail:
      'The certificate y must be polynomially bounded in |x| for verification to be efficient.',
  },
]

const whatMakesP = [
  {
    title: 'Deterministic algorithm',
    detail:
      'There is a clear, step-by-step procedure that always produces the correct answer.',
  },
  {
    title: 'Polynomial time bound',
    detail:
      'The runtime is bounded by n^k for some constant k, where n is input size.',
  },
  {
    title: 'Uniform for all inputs',
    detail:
      'The same algorithm works for every instance, not just special cases.',
  },
  {
    title: 'Decision form',
    detail:
      'P is formally defined over decision problems (yes/no). Optimization often reduces to decision.',
  },
]

const whatMakesNP = [
  {
    title: 'Short certificate exists',
    detail:
      'For every yes instance, there is a proof/witness whose size is polynomial in input size.',
  },
  {
    title: 'Fast verification',
    detail:
      'Given the certificate, a verifier can check correctness in polynomial time.',
  },
  {
    title: 'Nondeterministic view',
    detail:
      'A nondeterministic machine can guess the certificate and verify it in polynomial time.',
  },
  {
    title: 'Decision form',
    detail:
      'Like P, NP is defined for decision problems; optimization versions are related but distinct.',
  },
]

const pExamples = [
  {
    title: 'Sorting',
    detail:
      'Sort n numbers in O(n log n). Decision variant: is the k-th smallest <= x?',
  },
  {
    title: 'Shortest path (nonnegative edges)',
    detail:
      'Dijkstra runs in polynomial time. Decision: is there a path with length <= L?',
  },
  {
    title: 'Minimum spanning tree',
    detail:
      'Kruskal/Prim are polynomial. Decision: is there an MST with cost <= C?',
  },
  {
    title: 'Bipartite matching',
    detail:
      'Maximum matching in bipartite graphs is in P via flow.',
  },
  {
    title: '2-SAT',
    detail:
      'Satisfiability of 2-CNF formulas is in P via implication graphs.',
  },
  {
    title: 'Primality testing',
    detail:
      'AKS shows primality is in P (polynomial-time deterministic test).',
  },
]

const npExamples = [
  {
    title: 'SAT / 3-SAT',
    detail:
      'Given a Boolean formula, does a satisfying assignment exist? Certificate: the assignment.',
  },
  {
    title: 'Hamiltonian cycle',
    detail:
      'Does a graph contain a cycle visiting every vertex once? Certificate: the cycle order.',
  },
  {
    title: 'Clique',
    detail:
      'Is there a k-clique? Certificate: the set of k vertices.',
  },
  {
    title: 'Vertex cover',
    detail:
      'Is there a cover of size k? Certificate: the chosen vertices.',
  },
  {
    title: 'Subset sum',
    detail:
      'Is there a subset summing to T? Certificate: the subset.',
  },
  {
    title: 'Graph coloring (k-coloring)',
    detail:
      'Can the graph be colored with k colors? Certificate: the color assignment.',
  },
]

const decisionVsSearch = [
  {
    title: 'Decision vs optimization',
    detail:
      'Decision asks yes/no (exists a solution?). Optimization asks best value (min/max).',
  },
  {
    title: 'Decision vs search',
    detail:
      'Search asks for an explicit solution. Decision can often be used to find one via queries.',
  },
  {
    title: 'Why this matters',
    detail:
      'P and NP are defined for decision problems, but most real tasks are optimization or search.',
  },
]

const closureFacts = [
  {
    title: 'P is closed under',
    detail:
      'Union, intersection, complement, and polynomial-time reductions.',
  },
  {
    title: 'NP is closed under',
    detail:
      'Union and intersection; closure under complement is unknown (relates to NP vs co-NP).',
  },
  {
    title: 'Reductions preserve hardness',
    detail:
      'If A <=_p B and A is hard, B is at least as hard.',
  },
]

const mentalModels = [
  {
    title: 'Proof checking vs proof finding',
    detail:
      'Checking a proof can be easy even if finding it is hard. NP captures this gap.',
  },
  {
    title: 'Lock vs key',
    detail:
      'Verifying a key fits a lock is easy; finding the key might be hard.',
  },
  {
    title: 'Puzzle vs solution',
    detail:
      'Solving a Sudoku is hard; checking a completed grid is easy.',
  },
]

const relationships = [
  {
    title: 'Containments we know',
    detail:
      'P is a subset of NP. We do not know whether the containment is strict.',
  },
  {
    title: 'NP-complete core',
    detail:
      'If any NP-complete problem is in P, then P = NP.',
  },
  {
    title: 'NP-hard beyond NP',
    detail:
      'Some problems are NP-hard but not in NP (e.g., optimization versions with large outputs).',
  },
  {
    title: 'co-NP',
    detail:
      'Problems whose no answers have efficiently verifiable certificates.',
  },
  {
    title: 'NP-intermediate',
    detail:
      'If P != NP, there exist problems in NP that are neither in P nor NP-complete.',
  },
]

const classLandscape = [
  {
    title: 'PSPACE',
    detail:
      'Problems solvable with polynomial space. It contains NP and is believed to be larger.',
  },
  {
    title: 'PH (Polynomial Hierarchy)',
    detail:
      'A stack of classes extending NP and co-NP. Many believe P != NP implies PH does not collapse.',
  },
  {
    title: 'EXP',
    detail:
      'Problems solvable in exponential time. It contains NP and PSPACE.',
  },
  {
    title: 'BPP and randomized classes',
    detail:
      'Probabilistic polynomial time. Its relationship with NP is unknown.',
  },
]

const commonNPComplete = [
  {
    title: 'SAT / 3-SAT',
    detail:
      'Given a boolean formula, decide if there is a satisfying assignment.',
  },
  {
    title: 'Vertex cover',
    detail:
      'Choose k vertices that touch all edges.',
  },
  {
    title: 'Clique',
    detail:
      'Find a k-clique in a graph.',
  },
  {
    title: 'Hamiltonian cycle',
    detail:
      'Is there a cycle that visits every vertex exactly once?',
  },
  {
    title: 'Subset sum / Knapsack',
    detail:
      'Select numbers that sum to a target or maximize value under capacity.',
  },
]

const reductionPrimer = [
  {
    title: 'Direction matters',
    detail:
      'To show B is hard, reduce a known hard problem A to B (A <=_p B).',
  },
  {
    title: 'Preserving answers',
    detail:
      'The reduction must map yes instances to yes and no instances to no.',
  },
  {
    title: 'Polynomial time',
    detail:
      'The reduction itself must run in polynomial time.',
  },
  {
    title: 'Consequence',
    detail:
      'If B has a polynomial algorithm, then A does too.',
  },
]

const cookLevinSketch = [
  {
    title: 'Start with any NP verifier',
    detail:
      'Take a polynomial-time verifier for an NP language.',
  },
  {
    title: 'Encode computation',
    detail:
      'Express the computation tableau as a Boolean formula.',
  },
  {
    title: 'Satisfiability matches acceptance',
    detail:
      'The formula is satisfiable iff the verifier accepts some certificate.',
  },
  {
    title: 'Therefore SAT is NP-complete',
    detail:
      'SAT is in NP and every NP problem reduces to it.',
  },
]

const proofTechniques = [
  {
    title: 'Reductions',
    detail:
      'Show A <=_p B. If B is easy, then A is easy. Used to prove NP-hardness.',
  },
  {
    title: 'Diagonalization limits',
    detail:
      'Classic diagonalization does not resolve P vs NP due to relativization barriers.',
  },
  {
    title: 'Circuit complexity',
    detail:
      'Lower bounds on circuit size could separate classes, but strong bounds are hard.',
  },
  {
    title: 'Natural proofs barrier',
    detail:
      'Many proof techniques fail because they would break cryptographic assumptions.',
  },
  {
    title: 'Algebrization barrier',
    detail:
      'Some techniques that go beyond relativization still fail for P vs NP.',
  },
]

const evidenceAndBeliefs = [
  {
    title: 'Most experts believe P != NP',
    detail:
      'The prevailing view is that no polynomial algorithms exist for NP-complete problems.',
  },
  {
    title: 'No progress on strong lower bounds',
    detail:
      'Even proving superlinear lower bounds for general problems is extremely hard.',
  },
  {
    title: 'Successful reductions',
    detail:
      'Decades of reductions suggest a robust hardness web that is hard to collapse.',
  },
  {
    title: 'Cryptographic evidence',
    detail:
      'Modern cryptography assumes certain problems are hard, aligning with P != NP.',
  },
]

const consequences = [
  {
    title: 'Cryptography impact',
    detail:
      'If P = NP, many cryptographic systems based on hard problems would break.',
  },
  {
    title: 'Optimization and AI',
    detail:
      'Many scheduling and planning tasks would become efficiently solvable.',
  },
  {
    title: 'Mathematics',
    detail:
      'Automated theorem proving could potentially become dramatically more powerful.',
  },
  {
    title: 'Software engineering',
    detail:
      'Program synthesis and verification could change if hard constraints became easy.',
  },
]

const ifPNP = [
  {
    title: 'Polynomial-time algorithms for NP-complete problems',
    detail:
      'SAT, TSP, and many others would become efficiently solvable.',
  },
  {
    title: 'Cryptographic collapse',
    detail:
      'Many public-key systems would be insecure unless stronger assumptions are found.',
  },
  {
    title: 'Optimization revolution',
    detail:
      'Exact solutions would replace many approximations and heuristics.',
  },
  {
    title: 'Open problem: small exponents',
    detail:
      'Even if P = NP, algorithms might have huge exponents and be impractical.',
  },
]

const ifPNotNP = [
  {
    title: 'Hardness is permanent',
    detail:
      'Some problems provably resist any polynomial-time solution.',
  },
  {
    title: 'Approximation and heuristics stay central',
    detail:
      'We will continue to rely on approximation schemes and special cases.',
  },
  {
    title: 'Cryptography foundations strengthened',
    detail:
      'The existence of hard problems aligns with the security of many cryptosystems.',
  },
]

const misconceptions = [
  {
    mistake: 'NP means not polynomial',
    description:
      'NP stands for nondeterministic polynomial time, not non-polynomial.',
  },
  {
    mistake: 'P vs NP is solved',
    description:
      'No accepted proof exists as of today; claims appear often but are not validated.',
  },
  {
    mistake: 'NP problems are all equally hard',
    description:
      'NP contains easy and hard problems; NP-complete are the hardest ones.',
  },
  {
    mistake: 'If P != NP, everything is hopeless',
    description:
      'Approximation, heuristics, and special cases are still useful and often practical.',
  },
  {
    mistake: 'A faster computer solves NP-hardness',
    description:
      'Polynomial vs exponential growth means bigger machines still hit a wall quickly.',
  },
]

const workedExamples = [
  {
    title: 'Verification vs search',
    code: `Problem: Given a graph, does it have a Hamiltonian cycle?
Certificate: A list of vertices in order
Verification: Check edges and uniqueness in polynomial time
Search: Finding the cycle may require exponential time`,
    explanation:
      'This illustrates NP: quick verification, potentially hard discovery.',
  },
  {
    title: 'Reduction idea',
    code: `If SAT <=_p 3-SAT and 3-SAT is in P,
then SAT is in P. Since SAT is NP-complete,
P = NP would follow.`,
    explanation:
      'Reductions allow one hard problem to transfer difficulty to another.',
  },
  {
    title: 'Clique to vertex cover',
    code: `Graph G has a k-clique
iff G has a vertex cover of size n-k in the complement graph.
This gives a polynomial-time reduction.`,
    explanation:
      'Many NP-complete problems are linked by simple structural reductions.',
  },
]

const approximationNotes = [
  {
    title: 'Approximation ratios',
    detail:
      'Some NP-hard problems admit guaranteed approximations; others are hard to approximate.',
  },
  {
    title: 'PTAS and FPTAS',
    detail:
      'A PTAS gives (1+eps) solutions in poly time for fixed eps; FPTAS is poly in 1/eps too.',
  },
  {
    title: 'Hardness of approximation',
    detail:
      'For some problems, even approximate solutions are NP-hard to compute.',
  },
]

const complexityComparisons = [
  {
    title: 'Exponential vs polynomial',
    detail:
      'Polynomial time scales much better as input grows. Exponential time explodes quickly.',
  },
  {
    title: 'Worst-case vs average-case',
    detail:
      'P vs NP is about worst-case complexity. Many hard problems are easy on typical inputs.',
  },
  {
    title: 'Heuristics',
    detail:
      'Good heuristics can solve large instances without changing worst-case complexity.',
  },
]

const pseudocode = [
  {
    title: 'Polynomial verification',
    code: `verify(instance, certificate):
  if certificate length > poly(n): reject
  if certificate proves instance: accept
  else reject`,
    explanation:
      'NP is about efficient verification, not necessarily efficient solving.',
  },
  {
    title: 'Reduction template',
    code: `function reduce(A_instance):
  return B_instance  // computed in poly time
// A_instance is yes iff B_instance is yes`,
    explanation:
      'Polynomial-time reductions preserve yes/no answers.',
  },
  {
    title: 'Nondeterministic viewpoint',
    code: `guess certificate y
if verify(x, y): accept
else reject`,
    explanation:
      'A nondeterministic machine "guesses" a certificate and verifies it in polynomial time.',
  },
]

const evaluationChecklist = [
  {
    title: 'Class definitions',
    detail:
      'Are P, NP, NP-hard, NP-complete defined correctly?',
  },
  {
    title: 'Reduction clarity',
    detail:
      'Does the explanation make the direction of reductions explicit?',
  },
  {
    title: 'Current status',
    detail:
      'Always state that P vs NP remains open.',
  },
  {
    title: 'Limits vs practice',
    detail:
      'Mention approximations and heuristics as practical alternatives.',
  },
]

const keyTakeaways = [
  'P vs NP asks whether every efficiently verifiable problem is efficiently solvable.',
  'NP-complete problems are the hardest in NP; if any one is in P, then P = NP.',
  'The problem remains unsolved and is central to complexity theory.',
  'Barriers like relativization, algebrization, and natural proofs limit techniques.',
  'Regardless of the answer, approximations and special cases remain critical.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const pnp98Styles = `
.pnp98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.pnp98-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.pnp98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.pnp98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.pnp98-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.pnp98-control {
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
  font-family: inherit;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.pnp98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.pnp98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  font-family: inherit;
  white-space: nowrap;
  cursor: pointer;
}

.pnp98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.pnp98-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 236px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.pnp98-toc {
  padding: 12px;
  overflow: auto;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.pnp98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.pnp98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.pnp98-toc-list li {
  margin: 0 0 8px;
}

.pnp98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.pnp98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.pnp98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.pnp98-section {
  margin: 0 0 20px;
}

.pnp98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.pnp98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.pnp98-content p,
.pnp98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.pnp98-content p {
  margin: 0 0 10px;
}

.pnp98-content ul,
.pnp98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.pnp98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.pnp98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.pnp98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .pnp98-main {
    grid-template-columns: 1fr;
  }

  .pnp98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 560px) {
  .pnp98-titletext {
    font-size: 14px;
  }

  .pnp98-content {
    padding: 12px 14px 16px;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-setup', label: 'Problem Setup' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-defs', label: 'Formal Definitions' },
    { id: 'core-p', label: 'What Makes P' },
    { id: 'core-np', label: 'What Makes NP' },
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-pexamples', label: 'Examples in P' },
    { id: 'core-npexamples', label: 'Examples in NP' },
    { id: 'core-decision', label: 'Decision vs Search' },
    { id: 'core-rel', label: 'Class Relationships' },
    { id: 'core-closure', label: 'Closure and Reductions' },
    { id: 'core-landscape', label: 'Complexity Landscape' },
    { id: 'core-complete', label: 'NP-Complete Problems' },
    { id: 'core-reduction', label: 'Reduction Primer' },
    { id: 'core-cook', label: 'Cook-Levin Sketch' },
    { id: 'core-techniques', label: 'Proof Barriers' },
    { id: 'core-beliefs', label: 'Evidence and Beliefs' },
    { id: 'core-pnp', label: 'If P = NP' },
    { id: 'core-pneqnp', label: 'If P != NP' },
    { id: 'core-consequences', label: 'Consequences' },
    { id: 'core-approx', label: 'Approximation' },
    { id: 'core-comparisons', label: 'Complexity Comparisons' },
    { id: 'core-evaluate', label: 'Evaluation Checklist' },
    { id: 'core-misconceptions', label: 'Misconceptions' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function PvsNPPage(): JSX.Element {
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
    document.title = `P vs NP (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'P vs NP',
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
    <div className="pnp98-page">
      <style>{pnp98Styles}</style>
      <div className="pnp98-window" role="presentation">
        <header className="pnp98-titlebar">
          <span className="pnp98-titletext">P vs NP</span>
          <div className="pnp98-controls">
            <button className="pnp98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="pnp98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>
        <div className="pnp98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`pnp98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="pnp98-main">
          <aside className="pnp98-toc" aria-label="Table of contents">
            <h2 className="pnp98-toc-title">Contents</h2>
            <ul className="pnp98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="pnp98-content">
            <h1 className="pnp98-doc-title">P vs NP</h1>
            <p>
              P vs NP asks whether every problem whose solutions can be verified quickly can also be solved quickly. The answer is
              unknown, but its implications would be dramatic for cryptography, optimization, and AI. The theory of
              NP-completeness builds a web of reductions to identify the hardest problems in NP.
            </p>
            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="pnp98-section">
                  <h2 className="pnp98-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="pnp98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="pnp98-divider" />
                <section id="bp-history" className="pnp98-section">
                  <h2 className="pnp98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="pnp98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="pnp98-divider" />
                <section id="bp-setup" className="pnp98-section">
                  <h2 className="pnp98-heading">Problem Setup</h2>
                  {problemSetup.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="pnp98-divider" />
                <section id="bp-takeaways" className="pnp98-section">
                  <h2 className="pnp98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((takeaway) => (
                      <li key={takeaway}>{takeaway}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-defs" className="pnp98-section">
                  <h2 className="pnp98-heading">Formal Definitions</h2>
                  {formalDefinitions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    The verifier view is the most practical: NP is the set of problems where a short certificate can be checked
                    quickly.
                  </p>
                </section>
                <section id="core-p" className="pnp98-section">
                  <h2 className="pnp98-heading">What Makes a Problem P?</h2>
                  {whatMakesP.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-np" className="pnp98-section">
                  <h2 className="pnp98-heading">What Makes a Problem NP?</h2>
                  {whatMakesNP.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-models" className="pnp98-section">
                  <h2 className="pnp98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pexamples" className="pnp98-section">
                  <h2 className="pnp98-heading">Examples of P Problems</h2>
                  {pExamples.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-npexamples" className="pnp98-section">
                  <h2 className="pnp98-heading">Examples of NP Problems</h2>
                  {npExamples.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-decision" className="pnp98-section">
                  <h2 className="pnp98-heading">Decision vs Search vs Optimization</h2>
                  {decisionVsSearch.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-rel" className="pnp98-section">
                  <h2 className="pnp98-heading">Relationships Between Classes</h2>
                  {relationships.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    The single most important fact: if any NP-complete problem has a polynomial-time algorithm, then P = NP.
                  </p>
                </section>
                <section id="core-closure" className="pnp98-section">
                  <h2 className="pnp98-heading">Closure and Reduction Facts</h2>
                  {closureFacts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-landscape" className="pnp98-section">
                  <h2 className="pnp98-heading">Wider Complexity Landscape</h2>
                  {classLandscape.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complete" className="pnp98-section">
                  <h2 className="pnp98-heading">Canonical NP-Complete Problems</h2>
                  {commonNPComplete.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-reduction" className="pnp98-section">
                  <h2 className="pnp98-heading">Reduction Primer</h2>
                  {reductionPrimer.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-cook" className="pnp98-section">
                  <h2 className="pnp98-heading">Cook-Levin Proof Sketch</h2>
                  {cookLevinSketch.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-techniques" className="pnp98-section">
                  <h2 className="pnp98-heading">Proof Techniques and Barriers</h2>
                  {proofTechniques.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-beliefs" className="pnp98-section">
                  <h2 className="pnp98-heading">Evidence and Beliefs</h2>
                  {evidenceAndBeliefs.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pnp" className="pnp98-section">
                  <h2 className="pnp98-heading">Consequences if P = NP</h2>
                  {ifPNP.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pneqnp" className="pnp98-section">
                  <h2 className="pnp98-heading">Consequences if P != NP</h2>
                  {ifPNotNP.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-consequences" className="pnp98-section">
                  <h2 className="pnp98-heading">Consequences in Practice</h2>
                  {consequences.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-approx" className="pnp98-section">
                  <h2 className="pnp98-heading">Approximations and Heuristics</h2>
                  {approximationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Even if P != NP, many NP-hard problems are solvable in practice via heuristics or approximation.
                  </p>
                </section>
                <section id="core-comparisons" className="pnp98-section">
                  <h2 className="pnp98-heading">Complexity Comparisons</h2>
                  {complexityComparisons.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-evaluate" className="pnp98-section">
                  <h2 className="pnp98-heading">How to Evaluate an Explanation</h2>
                  {evaluationChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-misconceptions" className="pnp98-section">
                  <h2 className="pnp98-heading">Common Misconceptions</h2>
                  <ul>
                    {misconceptions.map((item) => (
                      <li key={item.mistake}>
                        <strong>{item.mistake}:</strong> {item.description}
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-worked" className="pnp98-section">
                  <h2 className="pnp98-heading">Worked Examples</h2>
                  {workedExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="pnp98-subheading">{example.title}</h3>
                      <div className="pnp98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-pseudocode" className="pnp98-section">
                  <h2 className="pnp98-heading">Pseudocode Reference</h2>
                  {pseudocode.map((example) => (
                    <div key={example.title}>
                      <h3 className="pnp98-subheading">{example.title}</h3>
                      <div className="pnp98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="pnp98-section">
                <h2 className="pnp98-heading">Glossary</h2>
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
