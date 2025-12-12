import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'
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
    detail:
      'Validators are a rotating committee that sign the same block; 2/3 weight agrees for safety in BFT models.',
  },
  {
    title: 'State root as checksum',
    detail:
      'The state root is a checksum of all accounts/UTXOs. If it matches, the transition was valid; if not, reject.',
  },
  {
    title: 'Latency as fee market',
    detail:
      'Demand for block space sets fees; high congestion raises costs and latency, similar to surge pricing for bandwidth.',
  },
]

const howItWorks = [
  {
    step: '1. Model state and transactions',
    detail:
      'Choose UTXO or account model; define transition rules, gas metering, and validity constraints.',
  },
  {
    step: '2. Build blocks with commitments',
    detail:
      'Construct Merkle/Verkle roots for transactions, receipts, and state; include prev-hash, timestamp, proposer info.',
  },
  {
    step: '3. Run consensus',
    detail:
      'PoW/PoS longest-chain or BFT commit decides the next block. Weight or signatures prove participation.',
  },
  {
    step: '4. Execute state transition',
    detail:
      'Apply transactions in order; update storage tries; compute new state root; ensure determinism and gas accounting.',
  },
  {
    step: '5. Verify and propagate',
    detail:
      'Peers check signatures, proofs, and roots before gossiping; reject malformed or invalid blocks/txs early.',
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
    detail:
      'UTXO/account chains let untrusted parties settle value with public verification and predictable finality targets.',
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
    detail:
      'Off-chain execution with on-chain data and proofs keeps security while lowering per-tx costs.',
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

export default function BlockchainPage(): JSX.Element {
  return (
    <TopicLayout
      title="Blockchain (Merkle Trees, etc.)"
      subtitle="Consensus-backed verifiable state"
      intro="Blockchains tie commitments, consensus, and data availability into a verifiable ledger. Secure designs balance determinism, economic incentives, and upgrade hygiene."
    >
      <TopicSection heading="Big picture">
        <div className="grid gap-3 md:grid-cols-2">
          {bigPicture.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
              <p className="text-xs text-white/60">{item.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="History">
        <div className="grid gap-3 md:grid-cols-2">
          {history.map((event) => (
            <article key={event.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{event.title}</h3>
              <p className="text-sm text-white/80">{event.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core pillars and mental hooks">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                <p className="text-sm text-white/80">{pillar.detail}</p>
              </article>
            ))}
          </div>
          <div className="space-y-3">
            {mentalModels.map((model) => (
              <article key={model.title} className="rounded-lg bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">{model.title}</h3>
                <p className="text-sm text-white/80">{model.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </TopicSection>

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-2">
          {howItWorks.map((item) => (
            <article key={item.step} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{item.step}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity reference">
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="bg-white/10 text-xs uppercase tracking-wide text-white/70">
              <tr>
                <th className="px-4 py-2">Approach</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Space</th>
                <th className="px-4 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {complexityTable.map((row) => (
                <tr key={row.approach} className="odd:bg-white/5">
                  <td className="px-4 py-2 font-semibold text-white">{row.approach}</td>
                  <td className="px-4 py-2">{row.time}</td>
                  <td className="px-4 py-2">{row.space}</td>
                  <td className="px-4 py-2 text-white/70">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TopicSection>

      <TopicSection heading="Applications">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
          <p className="text-sm font-semibold text-white">{failureCallout.title}</p>
          <p className="text-sm text-red-100">{failureCallout.detail}</p>
        </div>
      </TopicSection>

      <TopicSection heading="Pitfalls">
        <ul className="space-y-2 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item} className="rounded-lg bg-white/5 p-3">
              {item}
            </li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use what">
        <ul className="space-y-2 text-sm text-white/80">
          {whenToUse.map((item) => (
            <li key={item} className="rounded-lg border border-white/10 bg-white/5 p-3">
              {item}
            </li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Advanced moves">
        <div className="grid gap-3 md:grid-cols-2">
          {advanced.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Code examples">
        <div className="grid gap-3 md:grid-cols-2">
          {codeExamples.map((example) => (
            <article key={example.title} className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="overflow-x-auto rounded bg-black/40 p-3 text-xs text-white">
                <code>{example.code}</code>
              </pre>
              <p className="text-xs text-white/70">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="grid gap-3 md:grid-cols-2">
          {keyTakeaways.map((item) => (
            <article key={item} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item}</p>
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
