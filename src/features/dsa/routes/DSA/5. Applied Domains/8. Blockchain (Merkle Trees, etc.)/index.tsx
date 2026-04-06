import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Trust minimization',
    detail:
      'Blockchains replace trusted operators with verifiable data structures and open consensus so anyone can check the ledger.',
    note: 'Prevents silent tampering when parties are anonymous or adversarial.',
  },
  {
    title: 'Verifiable state machines',
    detail:
      'Every state transition is replayable from transactions and state roots, enabling light clients to trust results without full history.',
    note: 'Avoids opaque black-box execution.',
  },
  {
    title: 'Economic security',
    detail:
      'Consensus ties validity to collateral or work; misbehavior is costly, aligning incentives with honest operation.',
    note: 'Shifts protection from purely technical to socio-technical.',
  },
  {
    title: 'Data availability as a first-class constraint',
    detail:
      'Publishing data (not just headers) makes fraud and validity proofs meaningful for rollups and light clients.',
    note: 'Stops withheld-data attacks that would otherwise halt proofs.',
  },
]

const history = [
  {
    title: '2008: Bitcoin whitepaper',
    detail: 'Nakamoto combined PoW, longest-chain, and Merkle trees for censorship-resistant money.',
  },
  {
    title: '2015: Ethereum launch',
    detail: 'Account model and EVM enabled on-chain programmable state; gas introduced economic metering.',
  },
  {
    title: '2016-2019: BFT PoS chains',
    detail: 'Tendermint, HotStuff, and Cosmos/Polkadot popularized fast-finality PoS with slashing.',
  },
  {
    title: '2021: Rollups and EIP-1559',
    detail: 'Basefee stabilized fee markets; rollups shifted scale to L2 with proofs posted on L1.',
  },
  {
    title: '2023+: Verkle/Proto-Danksharding',
    detail: 'Data-availability sampling and vector commitments aim to lower costs for proofs and scaling.',
  },
]

const pillars = [
  {
    title: 'Deterministic state transitions',
    detail: 'Execution (EVM/WASM) must yield identical results across nodes given the same inputs.',
  },
  {
    title: 'Commitment correctness',
    detail: 'Roots in headers must bind state, txs, receipts; proofs must be canonical and collision-resistant.',
  },
  {
    title: 'Consensus safety and liveness',
    detail: 'Protocols must avoid conflicting finalized states and keep producing blocks under network bounds.',
  },
  {
    title: 'Data availability',
    detail: 'Participants must be able to reconstruct block data; otherwise proofs cannot be verified.',
  },
  {
    title: 'Key and upgrade hygiene',
    detail: 'Operator keys, governance controls, and upgrade paths must avoid single points of failure.',
  },
]

const mentalModels = [
  {
    title: 'Blockchain as notarized log',
    detail:
      'Each block notarizes batches of entries; Merkle roots make it cheap to verify membership without replaying all entries.',
  },
  {
    title: 'Consensus as committee voting',
    detail: 'Validators are a rotating committee that sign the same block; 2/3 weight agrees for safety in BFT models.',
  },
  {
    title: 'State root as checksum',
    detail:
      'The state root is a checksum of all accounts/UTXOs. If it matches, the transition was valid; if not, reject.',
  },
  {
    title: 'Latency as fee market',
    detail: 'Demand for block space sets fees; high congestion raises costs and latency, similar to surge pricing for bandwidth.',
  },
]

const howItWorks = [
  {
    step: '1. Model state and transactions',
    detail: 'Choose UTXO or account model; define transition rules, gas metering, and validity constraints.',
  },
  {
    step: '2. Build blocks with commitments',
    detail:
      'Construct Merkle/Verkle roots for transactions, receipts, and state; include prev-hash, timestamp, proposer info.',
  },
  {
    step: '3. Run consensus',
    detail: 'PoW/PoS longest-chain or BFT commit decides the next block. Weight or signatures prove participation.',
  },
  {
    step: '4. Execute state transition',
    detail:
      'Apply transactions in order; update storage tries; compute new state root; ensure determinism and gas accounting.',
  },
  {
    step: '5. Verify and propagate',
    detail: 'Peers check signatures, proofs, and roots before gossiping; reject malformed or invalid blocks/txs early.',
  },
  {
    step: '6. Handle reorgs and finality',
    detail:
      'Track safe/justified/finalized heads; roll back if a heavier chain or conflicting vote set appears within bounds.',
  },
]

const complexityTable = [
  {
    approach: 'Merkle proof verification',
    time: 'O(log n)',
    space: 'O(log n)',
    note: 'n leaves; hash verification along path; cheap for light clients.',
  },
  {
    approach: 'Block validation (tx count t)',
    time: 'O(t log s)',
    space: 'O(log s)',
    note: 's state size; state trie updates dominate with log factors.',
  },
  {
    approach: 'BFT consensus (n validators)',
    time: 'O(1) rounds (happy path)',
    space: 'O(n)',
    note: 'Message complexity often O(n^2); signature aggregation can lower bandwidth.',
  },
  {
    approach: 'Gossip propagation',
    time: 'O(E)',
    space: 'O(V)',
    note: 'E edges in overlay; compact blocks cut bandwidth by reusing mempool data.',
  },
  {
    approach: 'Rollup proof verification',
    time: 'O(1) to O(log n)',
    space: 'O(1)',
    note: 'SNARKs verify in constant-ish time; fraud proofs depend on step count.',
  },
]

const applications = [
  {
    title: 'Digital cash and payments',
    detail: 'UTXO/account chains let untrusted parties settle value with public verification and predictable finality targets.',
  },
  {
    title: 'Smart contract platforms',
    detail:
      'Deterministic VMs with gas metering enable composable protocols (DEXs, lending) with on-chain state guarantees.',
  },
  {
    title: 'Verifiable logs and supply chains',
    detail:
      'Merkle commitments anchor event logs or item provenance so auditors can check inclusion without trusting operators.',
  },
  {
    title: 'Rollups and L2 scaling',
    detail: 'Off-chain execution with on-chain data and proofs keeps security while lowering per-tx costs.',
  },
  {
    title: 'Cross-chain bridges',
    detail:
      'Light-client proofs and multi-sig committees attest to events across chains; security hinges on proof quality and signer honesty.',
  },
]

const failureCallout = {
  title: 'Failure story: halted chain from missing data',
  detail:
    'A validator set finalized a block whose full data was withheld. Light clients could not verify, rollups could not prove, and the chain stalled until a manual override. Lesson: enforce data availability sampling and refuse to finalize without DA guarantees.',
}

const pitfalls = [
  'Non-deterministic execution (time, randomness, floating math) causes state divergence across nodes.',
  'Improper gas or fee accounting lets attackers craft DoS transactions that consume bandwidth for free.',
  'Malleable signatures or unordered fields break hash commitments; canonicalize encoding.',
  'Weak fork-choice or slow finality exposes users to deep reorg risk; communicate safe vs optimistic heads.',
  'Upgrades without replay protection or versioning can brick nodes or allow old-tx replays.',
]

const whenToUse = [
  'Use UTXO designs for simple transfers and parallel validation with small state surface.',
  'Use account models for rich contracts and shared state, accepting stricter nonce and replay rules.',
  'Use BFT PoS when low-latency finality and identifiable validators are acceptable.',
  'Use longest-chain PoW/PoS when open participation and probabilistic finality are acceptable.',
  'Use rollups when you need lower fees while inheriting L1 security and DA.',
]

const advanced = [
  {
    title: 'Verkle and vector commitments',
    detail: 'Shorter proofs and smaller state nodes reduce witness sizes for stateless clients.',
  },
  {
    title: 'Proposer-builder separation (PBS)',
    detail: 'Splits block building from proposing to mitigate MEV and centralization pressures.',
  },
  {
    title: 'Data-availability sampling',
    detail: 'Light clients sample erasure-coded chunks to detect withheld data without downloading full blocks.',
  },
  {
    title: 'Succinct proofs (SNARK/STARK)',
    detail: 'Compress execution traces into small proofs; enables zk-rollups and verifiable off-chain compute.',
  },
  {
    title: 'MEV-aware mempools',
    detail: 'Encrypted or private mempools reduce frontrunning; auctions internalize MEV into protocol revenue.',
  },
]

const codeExamples = [
  {
    title: 'Merkle inclusion verification',
    code: `type ProofStep = { sibling: string; isLeft: boolean }

function verifyMerkle(leaf: string, root: string, proof: ProofStep[]) {
  let hash = leaf
  for (const step of proof) {
    hash = step.isLeft ? hashPair(step.sibling, hash) : hashPair(hash, step.sibling)
  }
  return hash === root
}

function hashPair(a: string, b: string) {
  return sha256(a + b) // placeholder; use domain separation in practice
}`,
    explanation:
      'Builds the path hash bottom-up and checks it matches the committed root. Real systems domain-separate and validate proof ordering.',
  },
  {
    title: 'Header validation sketch',
    code: `type Header = { parent: string; stateRoot: string; txRoot: string; receiptsRoot: string; sigs: string[] }

function validateHeader(h: Header, parent: Header, committee: string[]) {
  if (h.parent !== hashHeader(parent)) return false
  if (!validateRoots(h)) return false // txRoot/stateRoot/receiptsRoot recomputed from body
  if (!aggregateVerify(committee, h)) return false // BFT or sync-committee signature check
  return true
}`,
    explanation:
      'Ensures linkage, recomputes commitments, and verifies quorum signatures. Body validation executes txs to recompute roots.',
  },
]

const keyTakeaways = [
  'Headers commit; proofs verify; nodes must never assume data they did not check.',
  'Consensus safety, liveness, and DA are co-equal; skipping one breaks the system.',
  'Determinism and canonical encoding prevent state divergence and malleability.',
  'Gas/fee markets shape throughput and user safety; communicate finality clearly.',
  'Advanced commitments and DA sampling push scale while keeping verification cheap.',
]

const glossary = [
  {
    term: 'Merkle tree',
    definition: 'A hash tree that commits to many leaves and enables O(log n) inclusion proofs.',
  },
  {
    term: 'Merkle proof',
    definition: 'A sibling-hash path that lets a verifier reconstruct the committed root for one leaf.',
  },
  {
    term: 'State root',
    definition: 'A commitment to the full account or UTXO state after executing a block.',
  },
  {
    term: 'Transaction root',
    definition: 'The header commitment that binds the ordered transaction list for a block.',
  },
  {
    term: 'Receipts root',
    definition: 'A commitment to execution results, logs, and outcomes derived from block transactions.',
  },
  {
    term: 'UTXO model',
    definition: 'A transaction model that spends prior outputs and creates new outputs instead of mutating accounts in place.',
  },
  {
    term: 'Account model',
    definition: 'A state model that tracks balances, nonces, and contract storage for named accounts.',
  },
  {
    term: 'BFT consensus',
    definition: 'A protocol family that targets safety and fast finality when less than one-third of validator weight is faulty.',
  },
  {
    term: 'Finality',
    definition: 'The point at which reverting a block becomes impossible or economically infeasible under the protocol assumptions.',
  },
  {
    term: 'Data availability',
    definition: 'The guarantee that block data can actually be reconstructed and checked by verifiers.',
  },
  {
    term: 'Rollup',
    definition: 'A scaling design that executes mostly off-chain while posting data or proofs back to an L1 chain.',
  },
  {
    term: 'SNARK/STARK',
    definition: 'Succinct proof systems that compress execution into small proofs that are cheap to verify.',
  },
  {
    term: 'PBS',
    definition: 'Proposer-builder separation, which splits block construction from final proposal to manage MEV and centralization.',
  },
  {
    term: 'MEV',
    definition: 'Maximal extractable value, or the profit available from transaction ordering, insertion, or exclusion.',
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
    { id: 'bp-history', label: 'History' },
    { id: 'bp-applications', label: 'Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-pillars', label: 'Core Pillars' },
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-workflow', label: 'How It Works' },
    { id: 'core-complexity', label: 'Complexity Reference' },
    { id: 'core-choices', label: 'When to Use What' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-advanced', label: 'Advanced Moves' },
  ],
  examples: [
    { id: 'examples-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const blockchainHelpStyles = `
.blockchain-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.blockchain-help-window {
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

.blockchain-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.blockchain-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.blockchain-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.blockchain-help-control {
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

.blockchain-help-control:active {
  border-top: 1px solid #404040;
  border-left: 1px solid #404040;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
}

.blockchain-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.blockchain-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.blockchain-help-tab.is-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.blockchain-help-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  background: #fff;
  border-top: 1px solid #404040;
}

.blockchain-help-toc {
  background: #f2f2f2;
  border-right: 1px solid #808080;
  padding: 12px;
  overflow: auto;
}

.blockchain-help-toc h2 {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.blockchain-help-toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.blockchain-help-toc li {
  margin: 0 0 8px;
}

.blockchain-help-toc a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.blockchain-help-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.blockchain-help-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.blockchain-help-intro {
  margin: 0 0 14px;
  font-size: 12px;
  line-height: 1.5;
}

.blockchain-help-section {
  margin: 0 0 20px;
}

.blockchain-help-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.blockchain-help-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.blockchain-help-content p,
.blockchain-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.blockchain-help-content p {
  margin: 0 0 10px;
}

.blockchain-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.blockchain-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.blockchain-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  overflow-x: auto;
}

.blockchain-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .blockchain-help-main {
    grid-template-columns: 1fr;
  }

  .blockchain-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .blockchain-help-titletext {
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

export default function BlockchainPage(): JSX.Element {
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
    document.title = `Blockchain (Merkle Trees, etc.) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Blockchain (Merkle Trees, etc.)',
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
    <div className="blockchain-help-page">
      <style>{blockchainHelpStyles}</style>
      <div className="blockchain-help-window" role="presentation">
        <header className="blockchain-help-titlebar">
          <span className="blockchain-help-titletext">Blockchain (Merkle Trees, etc.)</span>
          <div className="blockchain-help-controls">
            <button className="blockchain-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="blockchain-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="blockchain-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`blockchain-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="blockchain-help-main">
          <aside className="blockchain-help-toc" aria-label="Table of contents">
            <h2>Contents</h2>
            <ul>
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="blockchain-help-content">
            <h1 className="blockchain-help-doc-title">Blockchain (Merkle Trees, etc.)</h1>
            <p className="blockchain-help-intro">
              Blockchains combine hash commitments, deterministic execution, consensus, and data availability into a ledger that
              strangers can verify. This page keeps the original material intact, but presents it as a Windows-style help
              document: a manual focused on how the pieces fit, where they fail, and how Merkle-style commitments support cheap
              verification.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="blockchain-help-section">
                  <h2 className="blockchain-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="blockchain-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>

                <hr className="blockchain-help-divider" />

                <section id="bp-history" className="blockchain-help-section">
                  <h2 className="blockchain-help-heading">History</h2>
                  {history.map((event) => (
                    <p key={event.title}>
                      <strong>{event.title}:</strong> {event.detail}
                    </p>
                  ))}
                </section>

                <hr className="blockchain-help-divider" />

                <section id="bp-applications" className="blockchain-help-section">
                  <h2 className="blockchain-help-heading">Applications and Operational Context</h2>
                  {applications.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="blockchain-help-subheading">{failureCallout.title}</h3>
                  <p>{failureCallout.detail}</p>
                </section>

                <hr className="blockchain-help-divider" />

                <section id="bp-takeaways" className="blockchain-help-section">
                  <h2 className="blockchain-help-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-pillars" className="blockchain-help-section">
                  <h2 className="blockchain-help-heading">Core Pillars</h2>
                  {pillars.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-models" className="blockchain-help-section">
                  <h2 className="blockchain-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-workflow" className="blockchain-help-section">
                  <h2 className="blockchain-help-heading">How It Works</h2>
                  {howItWorks.map((item) => (
                    <p key={item.step}>
                      <strong>{item.step}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="blockchain-help-section">
                  <h2 className="blockchain-help-heading">Complexity Reference</h2>
                  {complexityTable.map((item) => (
                    <p key={item.approach}>
                      <strong>{item.approach}:</strong> time {item.time}, space {item.space}. {item.note}
                    </p>
                  ))}
                </section>

                <section id="core-choices" className="blockchain-help-section">
                  <h2 className="blockchain-help-heading">When to Use What</h2>
                  <ul>
                    {whenToUse.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-pitfalls" className="blockchain-help-section">
                  <h2 className="blockchain-help-heading">Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-advanced" className="blockchain-help-section">
                  <h2 className="blockchain-help-heading">Advanced Moves</h2>
                  {advanced.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="examples-code" className="blockchain-help-section">
                <h2 className="blockchain-help-heading">Examples</h2>
                {codeExamples.map((example) => (
                  <div key={example.title}>
                    <h3 className="blockchain-help-subheading">{example.title}</h3>
                    <pre className="blockchain-help-codebox">
                      <code>{example.code.trim()}</code>
                    </pre>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="blockchain-help-section">
                <h2 className="blockchain-help-heading">Glossary</h2>
                {glossary.map((item) => (
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
