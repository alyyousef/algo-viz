import { useState } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A proof that no algorithm can decide, for every program and input, whether the program will eventually halt.',
    notes: 'It is the canonical example of an undecidable problem in computation theory.',
  },
  {
    title: 'Why it matters',
    details: 'It sets a hard limit on what computers can decide automatically, even in principle.',
    notes: 'Many practical limits in program analysis reduce to the halting problem.',
  },
  {
    title: 'What it teaches',
    details:
      'Self-reference, diagonalization, and the difference between semi-decidable and decidable problems.',
    notes: 'It formalizes the idea that some questions have no general algorithmic solution.',
  },
]

const historicalContext = [
  {
    title: '1936: Alan Turing',
    details:
      'Turing proved the halting problem is undecidable using a self-referential machine construction.',
    notes: 'The same paper introduced the Turing machine model of computation.',
  },
  {
    title: '1936: Alonzo Church',
    details:
      'Church independently showed undecidability via the lambda calculus and the Entscheidungsproblem.',
    notes: 'Together these results shaped the Church-Turing thesis.',
  },
  {
    title: 'Modern era',
    details:
      'Undecidability results are now core to complexity theory, verification, and programming languages.',
    notes: 'They define what tools can and cannot guarantee about arbitrary code.',
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
    definition:
      'A way to show a problem is hard by converting instances of a known hard problem to it.',
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
    detail: 'Will P halt when run on input x, or will it run forever?',
  },
  {
    title: 'Goal',
    detail: 'Decide correctly for all possible (P, x) pairs with a single algorithm.',
  },
  {
    title: 'Claim',
    detail: 'No such algorithm exists. The general halting problem is undecidable.',
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
    detail: 'You can simulate P on x; if it halts, you will eventually see it halt.',
  },
  {
    title: 'Non-halting is not semi-decidable',
    detail: 'There is no algorithm that always halts and says no for all non-halting programs.',
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
    detail: 'Suppose H returns yes if P halts on x and no otherwise, and always terminates.',
  },
  {
    title: 'Construct a paradoxical program D',
    detail: 'Define D(P) to: if H(P, P) says yes, then loop forever; else halt immediately.',
  },
  {
    title: 'Evaluate D on itself',
    detail: 'What happens when D(D) runs? Either choice contradicts H, so H cannot exist.',
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
    detail: 'Other undecidable problems are shown by reducing from halting to them.',
  },
]

const ricesTheoremDetails = [
  {
    title: "Rice's theorem statement",
    detail:
      'Any nontrivial semantic property of programs (properties about what they compute, not how they are written) is undecidable.',
  },
  {
    title: 'Nontrivial means both yes and no',
    detail:
      'If a property holds for some programs but not all, then it is nontrivial and falls under the theorem.',
  },
  {
    title: 'Two witness programs',
    detail:
      'Pick a program A that has the property and a program B that does not. They serve as targets for a reduction.',
  },
  {
    title: 'Reduction from halting',
    detail:
      'Given (P, x), construct a new program that runs P(x) and then behaves like A if P halts, or like B if it does not.',
  },
  {
    title: 'Contradiction',
    detail:
      'If you could decide the property for the new program, you would decide halting. Therefore no such decider exists.',
  },
  {
    title: 'Key takeaway',
    detail:
      "Rice's theorem generalizes the halting problem: most interesting semantic questions about programs are undecidable.",
  },
]

const algorithmLandscape = [
  {
    title: 'Semi-decision by simulation',
    detail: 'Simulate P(x). If it halts, answer yes. If it does not, the simulation runs forever.',
  },
  {
    title: 'Restricted halting',
    detail: 'For specific program classes (finite-state, bounded loops), halting can be decidable.',
  },
  {
    title: 'Static analysis',
    detail: 'Practical tools can prove halting or non-halting for many cases but not all cases.',
  },
  {
    title: 'Proof-carrying code',
    detail: 'Instead of deciding automatically, require programs to ship proofs of properties.',
  },
]

const consequences = [
  {
    title: 'No perfect bug detector',
    detail: 'A tool that always detects infinite loops in all programs cannot exist.',
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
    detail: 'Another classic undecidable problem; used to show undecidability in formal languages.',
  },
  {
    title: 'Hilbert tenth problem',
    detail:
      'No algorithm can determine whether an arbitrary Diophantine equation has an integer solution.',
  },
]

const reductionsGallery = [
  {
    id: 'totality',
    title: 'Totality (halts on all inputs)',
    detail: 'Decide whether a program halts for every possible input.',
    reduction:
      'Given (P, x), build Q(y) that ignores y and simulates P(x). Q halts on all inputs iff P halts on x.',
  },
  {
    id: 'equivalence',
    title: 'Program equivalence',
    detail: 'Given programs P and Q, decide whether they compute the same partial function.',
    reduction:
      'Let R(y)=0 for all y. Build Q(y) that runs P(x) then returns 0. Q equals R iff P halts on x.',
  },
  {
    id: 'reachability',
    title: 'Reachability of a line',
    detail: 'Determine whether execution can reach a designated line L.',
    reduction: 'Insert L after simulating P(x). L is reachable iff P halts on x.',
  },
  {
    id: 'output-property',
    title: 'Nontrivial output property',
    detail: 'Does the program ever print 1?',
    reduction: 'Create Q that simulates P(x) and prints 1 if P halts. Q prints 1 iff P halts on x.',
  },
]

const haltingDemoPrograms = [
  {
    id: 'halts-fast',
    name: 'Return immediately',
    description: 'P(x) = x + 1; halts in one step.',
    haltsAfter: 1,
  },
  {
    id: 'countdown',
    name: 'Countdown loop',
    description: 'Repeat 5 steps, then halt (toy example).',
    haltsAfter: 5,
  },
  {
    id: 'infinite-loop',
    name: 'While true',
    description: 'An infinite loop that never halts.',
    haltsAfter: null,
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
    detail: 'Complexity assumes termination; halting asks whether termination happens at all.',
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
    explanation: 'Either answer contradicts H, so H cannot exist.',
  },
]

const pseudocode = [
  {
    title: 'Semi-decider by simulation',
    code: `function semiDecideHalting(P, x):
  simulate P on x step by step
  if P halts: return yes
  // otherwise run forever`,
    explanation: 'This recognizes halting instances but never confirms non-halting ones.',
  },
  {
    title: 'Hypothetical decider (impossible)',
    code: `function H(P, x):
  // supposed to always halt
  // returns yes if P halts on x, else no
  return ???`,
    explanation: 'Assuming this exists leads to the contradiction in the standard proof.',
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
    detail: 'Explain which restricted classes you can decide and why the general case fails.',
  },
  {
    title: 'Avoid false claims',
    detail:
      'Any claim of a universal halting detector must be rejected or restricted to a smaller domain.',
  },
  {
    title: 'Proof consistency',
    detail: 'Check that your self-referential construction actually contradicts the decider.',
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
    description: 'No matter how smart, any universal simulator cannot decide all instances.',
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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

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
    { id: 'bp-setup', label: 'Problem Setup' },
    { id: 'bp-claims', label: 'Core Claims' },
    { id: 'bp-intuition', label: 'Intuition' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-proof', label: 'Standard Proof Sketch' },
    { id: 'core-formal', label: 'Formal Notes' },
    { id: 'core-rice', label: "Rice's Theorem" },
    { id: 'core-landscape', label: 'Algorithm Landscape' },
    { id: 'core-consequences', label: 'Consequences' },
    { id: 'core-related', label: 'Related Problems' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-evaluate', label: 'Evaluation Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
    { id: 'ex-simulator', label: 'Halting Explorer' },
    { id: 'ex-reductions', label: 'Reductions Gallery' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function HaltingProblemPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Halting Problem',
    defaultTab: 'big-picture',
  })

  const defaultProgram = haltingDemoPrograms[0] ?? {
    id: 'fallback',
    name: 'Unavailable program',
    description: 'No demo programs are configured.',
    haltsAfter: null,
  }
  const defaultReduction = reductionsGallery[0] ?? {
    id: 'fallback',
    title: 'Unavailable reduction',
    detail: 'No reductions are configured.',
    reduction: 'Add reductions to display examples here.',
  }
  const [selectedProgramId, setSelectedProgramId] = useState(defaultProgram.id)
  const [steps, setSteps] = useState(0)
  const [selectedReductionId, setSelectedReductionId] = useState(defaultReduction.id)
  const selectedProgram =
    haltingDemoPrograms.find((program) => program.id === selectedProgramId) ?? defaultProgram
  const selectedReduction =
    reductionsGallery.find((item) => item.id === selectedReductionId) ?? defaultReduction
  const hasHalted = selectedProgram.haltsAfter !== null && steps >= selectedProgram.haltsAfter
  const statusText = hasHalted
    ? `Halted at step ${selectedProgram.haltsAfter}.`
    : `Running after ${steps} step(s). No conclusion about non-halting.`

  return (
    <TopicPageShell
      title="Halting Problem"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Halting Problem</h1>
      <p>
        The halting problem asks whether a program will eventually stop when run on a given input.
        Alan Turing showed in 1936 that no algorithm can solve this for every program and input. The
        result is not about performance or lack of cleverness; it is a fundamental logical limit.
        This document keeps the same subject matter as the original page, but presents it in a
        Windows 98 help-document format.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-setup" className="bin98-section">
            <h2 className="bin98-heading">Problem Setup</h2>
            {problemSetup.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-claims" className="bin98-section">
            <h2 className="bin98-heading">Core Claims</h2>
            {keyClaims.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              The halting problem is not hard, it is impossible to solve in general. The proof
              constructs a program that defeats any alleged decider by asking about its own
              behavior.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-intuition" className="bin98-section">
            <h2 className="bin98-heading">Intuition</h2>
            {intuition.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="core-proof" className="bin98-section">
            <h2 className="bin98-heading">Standard Proof Sketch</h2>
            {standardProofSketch.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-formal" className="bin98-section">
            <h2 className="bin98-heading">Formal Notes</h2>
            {formalNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-rice" className="bin98-section">
            <h2 className="bin98-heading">Rice&apos;s Theorem Proof Sketch (Details)</h2>
            {ricesTheoremDetails.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-landscape" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Landscape</h2>
            {algorithmLandscape.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-consequences" className="bin98-section">
            <h2 className="bin98-heading">Consequences in Practice</h2>
            {consequences.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-related" className="bin98-section">
            <h2 className="bin98-heading">Related Undecidable Problems</h2>
            {relatedProblems.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {compareContrast.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-evaluate" className="bin98-section">
            <h2 className="bin98-heading">How to Evaluate Explanations</h2>
            {evaluationChecklist.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((pitfall) => (
                <li key={pitfall.mistake}>
                  <strong>{pitfall.mistake}:</strong> {pitfall.description}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-worked" className="bin98-section">
            <h2 className="bin98-heading">Worked Examples</h2>
            {workedExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
          <section id="ex-pseudocode" className="bin98-section">
            <h2 className="bin98-heading">Pseudocode Reference</h2>
            {pseudocode.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
          <section id="ex-simulator" className="bin98-section">
            <h2 className="bin98-heading">Halting Explorer</h2>
            <p>
              Pick a toy program and step the simulator. If it halts, you will see it; if it keeps
              running, you cannot conclude non-halting. This mirrors why the general halting problem
              is undecidable.
            </p>
            <div className="halting98-button-row">
              {haltingDemoPrograms.map((program) => (
                <button
                  key={program.id}
                  type="button"
                  className="halting98-push"
                  onClick={() => {
                    setSelectedProgramId(program.id)
                    setSteps(0)
                  }}
                >
                  {program.name}
                </button>
              ))}
            </div>
            <p>
              <strong>Selected:</strong> {selectedProgram.name}
            </p>
            <p>{selectedProgram.description}</p>
            <p>
              <strong>Status:</strong> {statusText}
            </p>
            <div className="halting98-button-row">
              <button
                type="button"
                className="halting98-push"
                onClick={() => setSteps((prev) => prev + 1)}
              >
                Step
              </button>
              <button type="button" className="halting98-push" onClick={() => setSteps(0)}>
                Reset
              </button>
            </div>
            <p className="halting98-note">
              Simulation can certify halting when it happens, but continued execution does not prove
              non-halting.
            </p>
          </section>
          <section id="ex-reductions" className="bin98-section">
            <h2 className="bin98-heading">Reductions Gallery</h2>
            <p>
              Choose a target problem and review the reduction idea from halting. Reductions show
              that if the target were decidable, halting would be decidable too.
            </p>
            <div className="halting98-button-row">
              {reductionsGallery.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="halting98-push"
                  onClick={() => setSelectedReductionId(item.id)}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <p>
              <strong>{selectedReduction.title}:</strong> {selectedReduction.detail}
            </p>
            <p>{selectedReduction.reduction}</p>
            <h3 className="bin98-subheading">Reduction Notes</h3>
            {reductionsGallery.map((item) => (
              <p key={item.id}>
                <strong>{item.title}:</strong> {item.detail} {item.reduction}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
