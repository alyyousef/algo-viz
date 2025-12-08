import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Control who learns and who alters',
    detail: 'Encryption hides content; authentication and MACs prove integrity and origin.',
    note: 'Both are needed to resist active attackers.',
  },
  {
    title: 'Keys are the real asset',
    detail: 'Primitive strength means little if keys leak, repeat, or lack rotation.',
    note: 'Key lifecycle and storage dominate real incidents.',
  },
  {
    title: 'Protocols are glue',
    detail: 'Safe primitives still fail when combined without labels, nonces, and identities.',
    note: 'Context binding prevents replay and misrouting.',
  },
  {
    title: 'Performance is layered',
    detail: 'Public-key work is rare and latency bound; symmetric work is frequent and throughput bound.',
    note: 'Optimize handshakes for correctness, bulk crypto for speed.',
  },
]

const history = [
  {
    title: '1976: Diffie-Hellman',
    detail: 'Key exchange over open channels without pre-shared secrets.',
    note: 'Birth of practical public-key cryptography.',
  },
  {
    title: '1977: RSA',
    detail: 'Asymmetric encryption and signatures from factoring hardness.',
    note: 'Made digital signatures mainstream.',
  },
  {
    title: '1990s: Modern security definitions',
    detail: 'IND-CPA, IND-CCA, and provable security frameworks formalize goals.',
    note: 'Clarified what “secure” means for developers.',
  },
  {
    title: '2006: Curve25519',
    detail: 'Safe, fast elliptic-curve operations with side-channel hardening.',
    note: 'Adopted in TLS 1.3, Signal, and SSH.',
  },
  {
    title: '2022+: Post-quantum finalists',
    detail: 'Kyber (KEM) and Dilithium (signatures) selected for standardization.',
    note: 'Hybrid use begins in production to hedge quantum risk.',
  },
]

const pillars = [
  {
    title: 'Confidentiality + integrity together',
    detail: 'Use AEAD so ciphertext cannot be altered without detection.',
  },
  {
    title: 'Nonce discipline',
    detail: 'Nonces must never repeat under a key; counters or random 96-bit values with tracking.',
  },
  {
    title: 'Identity and context binding',
    detail: 'Bind messages to identities and metadata (AAD) so attackers cannot replay across contexts.',
  },
  {
    title: 'Key lifecycle',
    detail: 'Generate with entropy, store in hardware when possible, rotate with versioning, retire on compromise.',
  },
]

const mentalModels = [
  {
    title: 'Sealed envelope with a receipt',
    detail: 'AEAD seals the letter and signs the envelope label. If the seal or label check fails, drop it unopened.',
  },
  {
    title: 'One-time pad caution',
    detail: 'Reusing a nonce with stream ciphers is like reusing a one-time pad; differences of plaintexts leak.',
  },
  {
    title: 'Budgeted hardness',
    detail: 'Parameters translate to attacker work. Pick sizes so attacks cost more time/energy than your asset is worth.',
  },
]

const howItWorks = [
  {
    title: 'Pick primitives with safe defaults',
    detail: 'AES-GCM or ChaCha20-Poly1305 for AEAD; X25519/P-256 for key exchange; Ed25519 for signatures.',
  },
  {
    title: 'Bind identities and context',
    detail: 'Use certificates or pre-shared identities; include headers as associated data in AEAD.',
  },
  {
    title: 'Manage nonces and keys',
    detail: 'Use counters or random nonces with tracking; derive subkeys with HKDF to avoid reuse.',
  },
  {
    title: 'Harden passwords and secrets',
    detail: 'Use Argon2id/scrypt with salts for passwords; avoid storing secrets in code repos.',
  },
  {
    title: 'Plan rotation and revocation',
    detail: 'Version keys, support dual-read/write during rotation, and verify revocation paths work.',
  },
  {
    title: 'Test for timing and replay',
    detail: 'Check constant-time comparisons and explicit replay protection where needed.',
  },
]

const complexityTable = [
  {
    approach: 'AES-GCM encrypt',
    time: 'O(n)',
    space: 'O(1)',
    note: 'n = bytes; hardware AES-NI makes it near memory-speed.',
  },
  {
    approach: 'ChaCha20-Poly1305',
    time: 'O(n)',
    space: 'O(1)',
    note: 'Great on CPUs without AES acceleration.',
  },
  {
    approach: 'ECDH (X25519/P-256)',
    time: 'O(k^2)',
    space: 'O(1)',
    note: 'k = key size; latency dominates, done per session.',
  },
  {
    approach: 'Argon2id',
    time: 'O(t * m)',
    space: 'O(m)',
    note: 't = iterations, m = memory; intentionally expensive for attackers.',
  },
]

const applications = [
  {
    title: 'TLS 1.3',
    detail: 'ECDHE (X25519/P-256) plus HKDF for keys; AEAD for records; forward secrecy by default.',
    note: 'Short handshakes and no legacy RSA key transport.',
  },
  {
    title: 'Messaging protocols',
    detail: 'Signal uses X25519 handshakes and a double ratchet with AEAD for per-message keys.',
    note: 'Rapid key churn limits damage from compromise.',
  },
  {
    title: 'Software supply chain',
    detail: 'Sign releases with Ed25519/RSA, publish transparency logs, and verify on install.',
    note: 'Prevents tampered artifacts from entering builds.',
  },
  {
    title: 'Storage at rest',
    detail: 'XTS-AES for disks; envelope encryption with key IDs for backups and objects.',
    note: 'Keys rotate without rewriting data.',
  },
]

const failureStory =
  'A payments service reused AES-GCM nonces after a deployment bug; attackers could xor ciphertexts to recover card details. Adding monotonic counters per key and strict nonce validation stopped reuse and forced key rotation.'

const pitfalls = [
  {
    title: 'Nonce reuse',
    detail: 'Repeating a nonce with a stream/AEAD key leaks plaintext relations.',
  },
  {
    title: 'DIY crypto',
    detail: 'Custom padding, RNGs, or protocols often break under scrutiny; use vetted libraries.',
  },
  {
    title: 'Skipping identity checks',
    detail: 'Ignoring hostname or certificate validation enables trivial man-in-the-middle attacks.',
  },
  {
    title: 'Missing context binding',
    detail: 'Failing to MAC headers or metadata lets attackers replay or misroute ciphertexts.',
  },
  {
    title: 'Stale or exposed keys',
    detail: 'Long-lived keys in repos or logs expand blast radius; rotate and isolate storage.',
  },
]

const whenToUse = [
  {
    title: 'Need confidentiality and integrity',
    detail: 'Use AEAD; pick AES-GCM where AES-NI exists, ChaCha20-Poly1305 where it does not.',
  },
  {
    title: 'Need fresh shared keys',
    detail: 'Use ECDHE (X25519/P-256) with authentication; avoid static RSA key transport.',
  },
  {
    title: 'Need tamper evidence',
    detail: 'Sign with Ed25519 when possible; use RSA/ECDSA where compatibility demands.',
  },
  {
    title: 'Need password storage',
    detail: 'Use Argon2id or scrypt with salts and tuned memory/time limits.',
  },
]

const advanced = [
  {
    title: 'Hybrid post-quantum handshakes',
    detail: 'Combine ECDHE with Kyber KEM to maintain security if quantum breaks ECC later.',
    note: 'Hedges future risk while keeping today secure.',
  },
  {
    title: 'Replay and duplicate defense',
    detail: 'Track seen nonces or sequence numbers; discard duplicates before decryption.',
    note: 'Prevents padding-oracle style gadgets.',
  },
  {
    title: 'Side-channel hygiene',
    detail: 'Use constant-time comparisons and implementations; avoid branching on secrets.',
    note: 'Needed on shared hardware or hostile environments.',
  },
  {
    title: 'Key management services',
    detail: 'Store keys in HSMs or KMS with audit logs and per-use limits.',
    note: 'Reduces blast radius of application bugs.',
  },
]

const codeExamples = [
  {
    title: 'AEAD encrypt/decrypt',
    code: `function seal(key: Uint8Array, nonce: Uint8Array, plaintext: Uint8Array, aad: Uint8Array) {
  // Use a vetted AEAD; here we sketch ChaCha20-Poly1305 style inputs
  const { ciphertext, tag } = aeadEncrypt(key, nonce, plaintext, aad)
  return { nonce, ciphertext, tag }
}

function open(key: Uint8Array, nonce: Uint8Array, ciphertext: Uint8Array, tag: Uint8Array, aad: Uint8Array) {
  const plaintext = aeadDecrypt(key, nonce, ciphertext, aad, tag)
  if (!plaintext) throw new Error('integrity check failed')
  return plaintext
}`,
    explanation: 'AEAD seals both data and associated context; decryption must reject on any tag failure without revealing data.',
  },
  {
    title: 'Argon2id password hashing',
    code: `type HashRecord = { salt: Uint8Array; params: { m: number; t: number; p: number }; digest: Uint8Array }

function hashPassword(password: Uint8Array): HashRecord {
  const salt = randomBytes(16)
  const params = { m: 64 * 1024, t: 3, p: 2 } // memory KB, iterations, lanes
  const digest = argon2id(password, salt, params)
  return { salt, params, digest }
}

function verifyPassword(password: Uint8Array, record: HashRecord): boolean {
  const digest = argon2id(password, record.salt, record.params)
  return constantTimeEqual(digest, record.digest)
}`,
    explanation: 'Memory-hard hashing slows offline guessing; constant-time compare avoids timing leaks.',
  },
]

const keyTakeaways = [
  {
    title: 'Pair secrecy with integrity',
    detail: 'Confidentiality alone is not enough; always use AEAD or a MAC.',
  },
  {
    title: 'Nonces and keys are fragile',
    detail: 'Prevent reuse, rotate regularly, and isolate storage.',
  },
  {
    title: 'Identity checks are part of crypto',
    detail: 'Certificate validation, AAD, and signatures bind data to the right parties.',
  },
  {
    title: 'Plan the future now',
    detail: 'Design for rotation, revocation, and post-quantum upgrades before incidents force change.',
  },
]

export default function CryptographyPage(): JSX.Element {
  return (
    <TopicLayout
      title="Cryptography"
      subtitle="Secrecy, integrity, and identity in practice"
      intro="Cryptography turns untrusted networks into workable systems by hiding data, detecting tampering, and binding identities. Real security comes from disciplined key handling, nonce hygiene, and protocols that treat failure as normal."
    >
      <TopicSection heading="Big picture">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {bigPicture.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
              <p className="text-xs text-white/60">{item.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="History that shaped practice">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {history.map((event) => (
            <article key={event.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">{event.title}</p>
              <p className="text-sm text-white/80">{event.detail}</p>
              <p className="text-xs text-white/60">{event.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Pillars and mental hooks">
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

      <TopicSection heading="How it works, step by step">
        <div className="grid gap-3 md:grid-cols-3">
          {howItWorks.map((step, idx) => (
            <article key={step.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold text-white/60">Step {idx + 1}</p>
              <h3 className="text-sm font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-white/80">{step.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity at a glance">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-white/80">
            <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-white/60">
              <tr>
                <th className="px-3 py-2">Approach</th>
                <th className="px-3 py-2">Time</th>
                <th className="px-3 py-2">Space</th>
                <th className="px-3 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {complexityTable.map((row) => (
                <tr key={row.approach} className="border-b border-white/5">
                  <td className="px-3 py-2 font-semibold text-white">{row.approach}</td>
                  <td className="px-3 py-2 text-white/80">{row.time}</td>
                  <td className="px-3 py-2 text-white/80">{row.space}</td>
                  <td className="px-3 py-2 text-white/70">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TopicSection>

      <TopicSection heading="Where it shows up">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((app) => (
            <article key={app.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{app.title}</h3>
              <p className="text-sm text-white/80">{app.detail}</p>
              <p className="text-xs text-white/60">{app.note}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100">
          <p className="font-semibold text-red-200">Failure mode</p>
          <p>{failureStory}</p>
        </div>
      </TopicSection>

      <TopicSection heading="Pitfalls to avoid">
        <div className="space-y-2 rounded-lg bg-white/5 p-4">
          {pitfalls.map((item) => (
            <div key={item.title} className="rounded-md border border-white/5 p-3">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="When to reach for each tool">
        <div className="space-y-2 rounded-lg bg-white/5 p-4">
          {whenToUse.map((item) => (
            <div key={item.title} className="rounded-md border border-white/5 p-3">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Advanced moves">
        <div className="grid gap-3 md:grid-cols-2">
          {advanced.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
              <p className="text-xs text-white/60">{item.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Code examples">
        <div className="grid gap-3 md:grid-cols-2">
          {codeExamples.map((example) => (
            <article key={example.title} className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{example.title}</h3>
              <pre className="overflow-x-auto rounded-md bg-black/40 p-3 text-xs text-white">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {keyTakeaways.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
