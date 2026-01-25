import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

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
  'Barriers like relativization and natural proofs limit many proof techniques.',
  'Regardless of the answer, approximations and special cases remain critical.',
]

export default function PvsNPPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">P vs NP</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">The central open question of complexity theory</div>
              <p className="win95-text">
                P vs NP asks whether every problem whose solutions can be verified quickly can also be solved quickly. The answer is
                unknown, but its implications would be dramatic for cryptography, optimization, and AI. The theory of NP-completeness
                builds a web of reductions to identify the hardest problems in NP.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The Big Picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical Context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalContext.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Quick Glossary</legend>
            <div className="win95-grid win95-grid-2">
              {quickGlossary.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.definition}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Problem Setup</legend>
            <div className="win95-grid win95-grid-2">
              {problemSetup.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Mental Models</legend>
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
            <legend>Relationships Between Classes</legend>
            <div className="win95-grid win95-grid-2">
              {relationships.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The single most important fact: if any NP-complete problem has a polynomial-time algorithm, then P = NP.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Canonical NP-Complete Problems</legend>
            <div className="win95-grid win95-grid-2">
              {commonNPComplete.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Proof Techniques and Barriers</legend>
            <div className="win95-grid win95-grid-2">
              {proofTechniques.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Consequences if P = NP (or not)</legend>
            <div className="win95-grid win95-grid-2">
              {consequences.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common Misconceptions</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {misconceptions.map((item) => (
                  <li key={item.mistake}>
                    <strong>{item.mistake}:</strong> {item.description}
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked Examples</legend>
            <div className="win95-stack">
              {workedExamples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pseudocode Reference</legend>
            <div className="win95-stack">
              {pseudocode.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How to Evaluate an Explanation</legend>
            <div className="win95-grid win95-grid-2">
              {evaluationChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((takeaway) => (
                <div key={takeaway} className="win95-panel">
                  <p className="win95-text">{takeaway}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
