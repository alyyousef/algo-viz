import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'What it is',
    details:
      'A proof that no algorithm can decide, for every program and input, whether the program will eventually halt.',
    notes:
      'It is the canonical example of an undecidable problem in computation theory.',
  },
  {
    title: 'Why it matters',
    details:
      'It sets a hard limit on what computers can decide automatically, even in principle.',
    notes:
      'Many practical limits in program analysis reduce to the halting problem.',
  },
  {
    title: 'What it teaches',
    details:
      'Self-reference, diagonalization, and the difference between semi-decidable and decidable problems.',
    notes:
      'It formalizes the idea that some questions have no general algorithmic solution.',
  },
]

const historicalContext = [
  {
    title: '1936: Alan Turing',
    details:
      'Turing proved the halting problem is undecidable using a self-referential machine construction.',
    notes:
      'The same paper introduced the Turing machine model of computation.',
  },
  {
    title: '1936: Alonzo Church',
    details:
      'Church independently showed undecidability via the lambda calculus and the Entscheidungsproblem.',
    notes:
      'Together these results shaped the Church-Turing thesis.',
  },
  {
    title: 'Modern era',
    details:
      'Undecidability results are now core to complexity theory, verification, and programming languages.',
    notes:
      'They define what tools can and cannot guarantee about arbitrary code.',
  },
]

const quickGlossary = [
  {
    term: 'Decidable',
    definition: 'A problem with an algorithm that always terminates and answers correctly.',
  },
  {
    term: 'Semi-decidable (recognizable)',
    definition:
      'An algorithm halts and answers yes for positive instances, but may loop forever for negative ones.',
  },
  {
    term: 'Undecidable',
    definition: 'No algorithm can correctly decide all instances and always halt.',
  },
  {
    term: 'Turing machine',
    definition: 'A mathematical model of computation used to define algorithms and decidability.',
  },
  {
    term: 'Reduction',
    definition: 'A way to show a problem is hard by converting instances of a known hard problem to it.',
  },
  {
    term: 'Diagonalization',
    definition: 'A proof technique that constructs a counterexample against any proposed decider.',
  },
]

const problemSetup = [
  {
    title: 'Input',
    detail:
      'A description of a program P and an input x for that program (often encoded as strings).',
  },
  {
    title: 'Question',
    detail:
      'Will P halt when run on input x, or will it run forever?',
  },
  {
    title: 'Goal',
    detail:
      'Decide correctly for all possible (P, x) pairs with a single algorithm.',
  },
  {
    title: 'Claim',
    detail:
      'No such algorithm exists. The general halting problem is undecidable.',
  },
]

const keyClaims = [
  {
    title: 'There is no universal halting decider',
    detail:
      'Any algorithm that claims to decide halting for all programs can be used to build a contradiction.',
  },
  {
    title: 'Halting is semi-decidable',
    detail:
      'You can simulate P on x; if it halts, you will eventually see it halt.',
  },
  {
    title: 'Non-halting is not semi-decidable',
    detail:
      'There is no algorithm that always halts and says no for all non-halting programs.',
  },
]

const intuition = [
  {
    title: 'Self-reference trap',
    detail:
      'If you could decide halting, you could ask a program about its own behavior and force a paradox.',
  },
  {
    title: 'No global shortcut',
    detail:
      'Some programs only halt after extremely complex behavior; there is no general shortcut to predict this.',
  },
  {
    title: 'Simulation is not enough',
    detail:
      'Running a program can confirm halting, but it can never conclusively confirm non-halting.',
  },
]

const standardProofSketch = [
  {
    title: 'Assume a decider H(P, x)',
    detail:
      'Suppose H returns yes if P halts on x and no otherwise, and always terminates.',
  },
  {
    title: 'Construct a paradoxical program D',
    detail:
      'Define D(P) to: if H(P, P) says yes, then loop forever; else halt immediately.',
  },
  {
    title: 'Evaluate D on itself',
    detail:
      'What happens when D(D) runs? Either choice contradicts H, so H cannot exist.',
  },
]

const formalNotes = [
  {
    title: 'Encoding programs',
    detail:
      'Programs and inputs can be encoded as strings or numbers so that a universal machine can read them.',
  },
  {
    title: 'Universal computation',
    detail:
      'A universal machine U can simulate any program P on input x given the encoding of (P, x).',
  },
  {
    title: 'Many-one reduction',
    detail:
      'Other undecidable problems are shown by reducing from halting to them.',
  },
]

const algorithmLandscape = [
  {
    title: 'Semi-decision by simulation',
    detail:
      'Simulate P(x). If it halts, answer yes. If it does not, the simulation runs forever.',
  },
  {
    title: 'Restricted halting',
    detail:
      'For specific program classes (finite-state, bounded loops), halting can be decidable.',
  },
  {
    title: 'Static analysis',
    detail:
      'Practical tools can prove halting or non-halting for many cases but not all cases.',
  },
  {
    title: 'Proof-carrying code',
    detail:
      'Instead of deciding automatically, require programs to ship proofs of properties.',
  },
]

const consequences = [
  {
    title: 'No perfect bug detector',
    detail:
      'A tool that always detects infinite loops in all programs cannot exist.',
  },
  {
    title: 'Limits of optimization',
    detail:
      'Some compiler optimizations depend on knowing termination, which is undecidable in general.',
  },
  {
    title: 'Boundaries of verification',
    detail:
      'Formal methods can prove properties for restricted systems but cannot solve all cases universally.',
  },
]

const relatedProblems = [
  {
    title: 'Rice theorem',
    detail:
      'Any nontrivial semantic property of programs is undecidable, generalizing the halting problem.',
  },
  {
    title: 'Post correspondence problem',
    detail:
      'Another classic undecidable problem; used to show undecidability in formal languages.',
  },
  {
    title: 'Hilbert tenth problem',
    detail:
      'No algorithm can determine whether an arbitrary Diophantine equation has an integer solution.',
  },
]

const compareContrast = [
  {
    title: 'Halting vs total correctness',
    detail:
      'Total correctness asks both termination and correctness; undecidability of halting blocks full automation.',
  },
  {
    title: 'Halting vs complexity',
    detail:
      'Complexity assumes termination; halting asks whether termination happens at all.',
  },
  {
    title: 'Decidable subcases',
    detail:
      'Finite automata always halt; bounded loops can be analyzed exactly. These do not contradict the theorem.',
  },
]

const workedExamples = [
  {
    title: 'A simple halting program',
    code: `Program P(x):
  return x + 1
Input: 7
Observation: P always halts in one step`,
    explanation:
      'Many programs clearly halt, but the halting problem concerns all programs, including adversarial ones.',
  },
  {
    title: 'A simple non-halting program',
    code: `Program Q(x):
  while true:
    pass
Input: 0
Observation: Q loops forever`,
    explanation:
      'Some programs clearly do not halt, but detecting this for all possible programs is impossible.',
  },
  {
    title: 'The paradox program idea',
    code: `Assume H(P, x) decides halting.
Define D(P):
  if H(P, P) == yes:
    loop forever
  else:
    halt
Now ask: does D(D) halt?`,
    explanation:
      'Either answer contradicts H, so H cannot exist.',
  },
]

const pseudocode = [
  {
    title: 'Semi-decider by simulation',
    code: `function semiDecideHalting(P, x):
  simulate P on x step by step
  if P halts: return yes
  // otherwise run forever`,
    explanation:
      'This recognizes halting instances but never confirms non-halting ones.',
  },
  {
    title: 'Hypothetical decider (impossible)',
    code: `function H(P, x):
  // supposed to always halt
  // returns yes if P halts on x, else no
  return ???`,
    explanation:
      'Assuming this exists leads to the contradiction in the standard proof.',
  },
]

const evaluationChecklist = [
  {
    title: 'Clarify the model',
    detail:
      'State whether you use Turing machines, lambda calculus, or real programming languages with encodings.',
  },
  {
    title: 'State decidable scope',
    detail:
      'Explain which restricted classes you can decide and why the general case fails.',
  },
  {
    title: 'Avoid false claims',
    detail:
      'Any claim of a universal halting detector must be rejected or restricted to a smaller domain.',
  },
  {
    title: 'Proof consistency',
    detail:
      'Check that your self-referential construction actually contradicts the decider.',
  },
]

const pitfalls = [
  {
    mistake: 'Confusing halting with timeouts',
    description:
      'A timeout only says you did not see a halt yet; it is not a proof of non-halting.',
  },
  {
    mistake: 'Assuming a smarter simulator solves it',
    description:
      'No matter how smart, any universal simulator cannot decide all instances.',
  },
  {
    mistake: 'Mixing decidable subcases with the general case',
    description:
      'The theorem only applies to the general case; restricted domains can still be decidable.',
  },
  {
    mistake: 'Ignoring encoding details',
    description:
      'The proof requires that programs can be encoded as input and run by a universal machine.',
  },
]

const keyTakeaways = [
  'There is no algorithm that decides halting for all possible programs and inputs.',
  'Halting is semi-decidable: you can confirm yes cases but not all no cases.',
  'The proof hinges on self-reference and contradiction using a diagonal program.',
  'Undecidability sets a hard limit on what automatic program analysis can guarantee.',
  'Many other undecidable problems reduce from the halting problem.',
]

export default function HaltingProblemPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Halting Problem</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Why no program can decide termination for all programs</div>
              <p className="win95-text">
                The halting problem asks whether a program will eventually stop when run on a given input. Alan Turing showed in 1936
                that no algorithm can solve this for every program and input. The result is not about performance or lack of cleverness;
                it is a fundamental logical limit. This page focuses on the general undecidability result and its practical meaning.
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
            <legend>Core Claims</legend>
            <div className="win95-grid win95-grid-2">
              {keyClaims.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The halting problem is not hard, it is impossible to solve in general. The proof constructs a program that defeats any
                alleged decider by asking about its own behavior.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Intuition</legend>
            <div className="win95-grid win95-grid-2">
              {intuition.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Standard Proof Sketch</legend>
            <div className="win95-grid win95-grid-2">
              {standardProofSketch.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Formal Notes</legend>
            <div className="win95-grid win95-grid-2">
              {formalNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm Landscape</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmLandscape.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Consequences in Practice</legend>
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
            <legend>Related Undecidable Problems</legend>
            <div className="win95-grid win95-grid-2">
              {relatedProblems.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Compare and Contrast</legend>
            <div className="win95-grid win95-grid-2">
              {compareContrast.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <legend>How to Evaluate Explanations</legend>
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
            <legend>Common Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((pitfall) => (
                  <li key={pitfall.mistake}>
                    <strong>{pitfall.mistake}:</strong> {pitfall.description}
                  </li>
                ))}
              </ul>
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
