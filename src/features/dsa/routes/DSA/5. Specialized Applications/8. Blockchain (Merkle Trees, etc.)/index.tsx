import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const dataStructures = [
  {
    title: 'Merkle trees and proofs',
    detail:
      'Hash leaves with domain separation; canonicalize ordering to avoid second-preimage tricks. Use multi-proofs/Verkle paths to batch membership checks.',
  },
  {
    title: 'Patricia/Sparse tries',
    detail:
      'Path-compressed radix tries store key prefixes efficiently; sparse Merkle tries map fixed keyspaces with logarithmic proofs and easy deletion.',
  },
  {
    title: 'UTXO vs account models',
    detail:
      'UTXO graphs simplify parallelism and stateless validation; accounts enable rich contracts but need replay protection and nonce discipline.',
  },
  {
    title: 'Commitments and state roots',
    detail:
      'Block headers commit to state, transactions, and receipts. Any state read/write must be provable from these roots for light clients to trust results.',
  },
]

const consensus = [
  {
    title: 'Nakamoto-style PoW/PoS longest-chain',
    detail:
      'Probabilistic finality via heaviest chain rule; handle orphan/stale blocks. Difficulty/weight adjustments keep fork rates and liveness stable.',
  },
  {
    title: 'BFT protocols (Tendermint/HotStuff)',
    detail:
      '2- or 3-phase commit with 2/3 voting power for safety; proposer rotation and timeouts guard liveness. Evidence of equivocation triggers slashing.',
  },
  {
    title: 'Finality gadgets and reorg handling',
    detail:
      'Checkpoints and justified/finalized epochs bound reorg depth. Clients track safe vs optimistic heads to trade speed for safety.',
  },
  {
    title: 'Data availability',
    detail:
      'Erasure coding and sampling reduce light-client trust in block producers. Blob commitments (rollups) need full DA to make fraud proofs useful.',
  },
]

const clientPatterns = [
  {
    title: 'Light clients',
    detail:
      'Sync headers only; verify state transitions with Merkle/Verkle proofs. Use checkpointing and sync committees to avoid long-range attacks.',
  },
  {
    title: 'Networking and propagation',
    detail:
      'Gossip protocols, compact blocks, and transaction relays reduce bandwidth and latency. Peer scoring and DoS guards keep the mesh healthy.',
  },
  {
    title: 'Mempool and fees',
    detail:
      'Fee markets (e.g., EIP-1559 basefee + priority tip) affect ordering. Manage replacement rules and max block gas to avoid spam and stuck txs.',
  },
  {
    title: 'State management',
    detail:
      'Prune old state or keep snapshots; use fast-sync with recent state roots. JIT fetching proofs enables semi-stateless validation.',
  },
]

const playbooks = [
  {
    title: 'Running a validator',
    steps: [
      'Harden keys with HSM or remote signer; separate validator and sentry nodes.',
      'Monitor missed attestations/blocks, peer count, and latency; alert on double-sign risks.',
      'Keep software versioned and reproducible; dry-run upgrades on testnets first.',
    ],
  },
  {
    title: 'Building a verifiable data log',
    steps: [
      'Batch entries, hash to leaves, and publish the Merkle root with inclusion proofs for clients.',
      'Provide append-only guarantees with signed tree heads; support consistency proofs across versions.',
      'Store proofs alongside entries for cheap client verification; rotate hash functions cautiously.',
    ],
  },
  {
    title: 'Smart contract safety',
    steps: [
      'Use well-reviewed libraries; avoid reentrancy and unchecked external calls.',
      'Cap gas for external interactions; prefer pull over push payments to limit surface.',
      'Add pausability/kill switches and upgrade plans with explicit governance controls.',
    ],
  },
  {
    title: 'Rollup pipeline hygiene',
    steps: [
      'Separate proving, sequencing, and data-availability layers with explicit interfaces.',
      'Validate state transitions off-chain; publish calldata/blobs for L1 verification.',
      'Keep fraud/validity proofs versioned; rehearse escape hatches and forced withdrawals.',
    ],
  },
]

const guardrails = [
  'Never sign two conflicting blocks/attestations; automate slashing protection.',
  'Validate every field in blocks/txs; reject malformed encodings and out-of-range values.',
  'Treat time with care: rely on consensus timestamps and bounded clock drift assumptions.',
  'Keep deterministic execution (e.g., EVM/wasm) to avoid state divergence across nodes.',
  'Back up keys and configs securely; test recovery from disk corruption and long-range attacks.',
]

export default function BlockchainPage(): JSX.Element {
  return (
    <TopicLayout
      title="Blockchain (Merkle Trees, etc.)"
      subtitle="Consensus and verification structures"
      intro="Blockchains bundle commitments, consensus, and networking so untrusted nodes can agree on state. Pair solid data structures with disciplined operations."
    >
      <TopicSection heading="Data structures">
        <div className="grid gap-3 md:grid-cols-2">
          {dataStructures.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Consensus layers">
        <div className="grid gap-3 md:grid-cols-2">
          {consensus.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Client patterns">
        <div className="grid gap-3 md:grid-cols-2">
          {clientPatterns.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Operational playbooks">
        <div className="grid gap-3 md:grid-cols-2">
          {playbooks.map((play) => (
            <article key={play.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{play.title}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {play.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Safety checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {guardrails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
