import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  [
    'Secrecy + integrity',
    'Encryption hides data; integrity detects tampering and forgery.',
    'Always pair confidentiality with authentication (AEAD or MAC).',
  ],
  [
    'Keys are the asset',
    'Strong primitives fail if keys are leaked, reused, or never rotated.',
    'Key lifecycle dominates real-world security incidents.',
  ],
  [
    'Protocols glue primitives',
    'Safe primitives can still be misused without nonces, context binding, and identity.',
    'Most failures are protocol and integration mistakes.',
  ],
  [
    'Performance is layered',
    'Public-key operations are rare and latency-bound; symmetric crypto is frequent and throughput-bound.',
    'Optimize handshakes for correctness, bulk crypto for speed.',
  ],
] as const

const history = [
  [
    '1976: Diffie-Hellman',
    'Key exchange over open channels without pre-shared secrets.',
    'Birth of practical public-key cryptography.',
  ],
  [
    '1977: RSA',
    'Asymmetric encryption and signatures based on factoring.',
    'Made digital signatures mainstream.',
  ],
  [
    '1990s: Security definitions',
    'IND-CPA, IND-CCA, and provable security formalize what "secure" means.',
    'Shifted crypto from intuition to proof-driven design.',
  ],
  [
    '2006: Curve25519',
    'Safe, fast elliptic-curve operations with strong side-channel resistance.',
    'Adopted in TLS 1.3, Signal, and SSH.',
  ],
  [
    '2018: TLS 1.3',
    'Removed legacy ciphers; mandatory forward secrecy.',
    'Simplified handshakes and reduced downgrade risk.',
  ],
  [
    '2022+: Post-quantum finalists',
    'Kyber (KEM) and Dilithium (signatures) selected for standardization.',
    'Hybrid deployments begin to hedge future risk.',
  ],
] as const

const pillars = [
  [
    'AEAD first',
    'Authenticated encryption (AES-GCM, ChaCha20-Poly1305) provides confidentiality + integrity.',
  ],
  ['Nonce discipline', 'Nonces must never repeat under a key; track or use counters.'],
  ['Identity binding', 'Bind messages to identities and metadata using signatures or AAD.'],
  [
    'Key lifecycle',
    'Generate with entropy, store securely, rotate regularly, and revoke on compromise.',
  ],
] as const

const mentalModels = [
  [
    'Sealed envelope with receipt',
    'AEAD seals the letter and signs the label; reject if seal or label is wrong.',
  ],
  ['One-time pad warning', 'Nonce reuse with a stream cipher is like reusing a one-time pad.'],
  ['Tamper-evident bag', 'Integrity checks show if something changed even if you cannot read it.'],
  ['Budgeted hardness', 'Parameter sizes translate to attacker cost; pick based on asset value.'],
] as const

const howItWorks = [
  [
    'Choose modern primitives',
    'AES-GCM or ChaCha20-Poly1305 for AEAD; X25519/P-256 for key exchange; Ed25519 for signatures.',
  ],
  [
    'Bind identities and context',
    'Use certificates or PSK identities; include headers as AAD to prevent replay or misrouting.',
  ],
  ['Manage nonces and keys', 'Use counters or unique random nonces; derive subkeys with HKDF.'],
  [
    'Protect passwords and secrets',
    'Use Argon2id or scrypt with salts; never store secrets in repos or logs.',
  ],
  [
    'Rotate and revoke',
    'Version keys; support dual read/write during rotation; verify revocation paths.',
  ],
  ['Test for side channels', 'Use constant-time comparisons and audit for timing or error leaks.'],
  [
    'Monitor security posture',
    'Track key usage, failure rates, and signature verification errors.',
  ],
] as const

const primitiveAnatomy = [
  ['Symmetric ciphers', 'AES and ChaCha20 provide fast confidentiality for bulk data.'],
  ['AEAD modes', 'GCM and Poly1305 authenticate ciphertext plus metadata (AAD).'],
  ['Hash functions', 'SHA-256/SHA-3 produce fixed-size digests; used for integrity and KDFs.'],
  ['Key derivation', 'HKDF extracts and expands secrets into multiple subkeys safely.'],
  ['Public-key crypto', 'ECC and RSA enable key exchange and signatures.'],
  ['Password hashing', 'Argon2id and scrypt are memory-hard by design.'],
] as const

const protocolAnatomy = [
  ['Handshake', 'Agree on keys, cipher suites, and identities.'],
  ['Key schedule', 'Derive traffic keys from shared secrets with HKDF.'],
  ['Transcript binding', 'Sign or MAC the handshake to prevent downgrade attacks.'],
  ['Forward secrecy', 'Ephemeral keys ensure past traffic stays safe after key compromise.'],
  ['Session resumption', 'PSK tickets reduce latency; must be bound to context to avoid replay.'],
  ['Rekeying', 'Rotate traffic keys after a byte or time limit.'],
] as const

const trustModel = [
  ['PKI and certificates', 'CAs bind public keys to identities for TLS and code signing.'],
  ['Web of trust', 'PGP-style signatures allow decentralized trust paths.'],
  ['Pre-shared keys', 'Simpler but requires secure distribution and rotation.'],
  ['Transparency logs', 'Public logs make certificate issuance auditable.'],
  ['Hardware trust', 'TPMs/HSMs protect private keys and attest software state.'],
  ['Least privilege', 'Limit where and when keys can be used.'],
] as const

const tradeoffMatrix = [
  ['Speed', 'Very fast (AES/ChaCha).', 'Slower; used sparingly (handshakes/signatures).'],
  [
    'Key distribution',
    'Harder; requires secure pre-sharing.',
    'Easier; public keys can be shared openly.',
  ],
  ['Forward secrecy', 'Requires extra protocol design.', 'ECDHE makes it natural.'],
  [
    'Operational complexity',
    'Simpler primitives; harder key distribution.',
    'Certificate management and validation overhead.',
  ],
  ['Typical usage', 'Bulk data encryption.', 'Key exchange and signatures.'],
  ['Failure mode', 'Nonce/key reuse catastrophic.', 'Signature misuse or CA compromise.'],
] as const

const complexityTable = [
  ['AES-GCM encrypt', 'O(n)', 'O(1)', 'n = bytes; AES-NI makes it near memory-speed.'],
  ['ChaCha20-Poly1305', 'O(n)', 'O(1)', 'Fast on CPUs without AES acceleration.'],
  ['ECDH (X25519/P-256)', 'O(k^2)', 'O(1)', 'k = key size; latency-bound per session.'],
  ['Ed25519 signature verify', 'O(k^2)', 'O(1)', 'Fast verification; ideal for code signing.'],
  ['Argon2id', 'O(t * m)', 'O(m)', 't = iterations, m = memory cost.'],
  ['HKDF derive', 'O(n)', 'O(1)', 'Linear in output size.'],
] as const

const applications = [
  [
    'TLS 1.3',
    'ECDHE + HKDF for keys; AEAD for records; forward secrecy by default.',
    'Short handshakes and no legacy RSA key transport.',
  ],
  [
    'Messaging protocols',
    'Signal uses X25519 handshakes and a double ratchet for per-message keys.',
    'Rapid key churn limits compromise damage.',
  ],
  [
    'Software supply chain',
    'Sign releases; verify signatures and transparency logs on install.',
    'Stops tampered artifacts from entering builds.',
  ],
  [
    'Storage at rest',
    'XTS-AES for disks; envelope encryption with KMS for backups.',
    'Keys rotate without rewriting data.',
  ],
] as const

const failureStory =
  'A payment service reused AES-GCM nonces after a deployment bug. Attackers XORed ciphertexts to recover card data. A monotonic per-key nonce counter and strict nonce validation eliminated reuse and forced immediate key rotation.'

const pitfalls = [
  ['Nonce reuse', 'Repeating a nonce with a stream/AEAD key leaks plaintext relations.'],
  ['DIY crypto', 'Custom padding, RNGs, or protocols often break under scrutiny.'],
  [
    'Skipping identity checks',
    'Ignoring certificate/hostname validation enables trivial MITM attacks.',
  ],
  ['Missing context binding', 'Failing to MAC headers or metadata allows replay or misrouting.'],
  ['Stale or exposed keys', 'Long-lived keys in repos or logs expand blast radius.'],
  ['Weak randomness', 'Bad RNGs ruin key security; use OS-provided CSPRNGs.'],
] as const

const whenToUse = [
  [
    'Need secrecy + integrity',
    'Use AEAD; AES-GCM where AES-NI exists, ChaCha20-Poly1305 where it does not.',
  ],
  [
    'Need fresh shared keys',
    'Use ECDHE (X25519/P-256) with authentication; avoid static RSA key transport.',
  ],
  ['Need tamper evidence', 'Sign with Ed25519 when possible; use RSA/ECDSA for compatibility.'],
  ['Need password storage', 'Use Argon2id or scrypt with tuned memory/time costs.'],
  ['Need data at rest', 'Use envelope encryption with versioned keys and KMS/HSM support.'],
  ['Need quantum hedge', 'Adopt hybrid handshakes or PQC algorithms where available.'],
] as const

const advanced = [
  [
    'Hybrid post-quantum handshakes',
    'Combine ECDHE with Kyber KEM to hedge future quantum risk.',
    'Maintains current security while preparing for PQC.',
  ],
  [
    'Replay and duplicate defense',
    'Track seen nonces or sequence numbers; reject duplicates before decryption.',
    'Prevents replay and some oracle gadgets.',
  ],
  [
    'Side-channel hygiene',
    'Avoid branching on secrets; use constant-time primitives.',
    'Critical on shared or untrusted hardware.',
  ],
  [
    'Key isolation',
    'Store private keys in HSM/KMS and restrict usage by policy.',
    'Reduces blast radius of application bugs.',
  ],
  [
    'Deterministic signatures',
    'Ed25519 avoids RNG failures that break ECDSA.',
    'Prevents catastrophic key leakage from bad randomness.',
  ],
  [
    'Threshold crypto',
    'Split signing or decryption across multiple parties.',
    'No single node holds the full secret.',
  ],
] as const

const tuningChecklist = [
  ['Nonce management', 'Track counters per key and enforce unique nonces.'],
  ['Key rotation cadence', 'Rotate on schedule and after incident indicators.'],
  ['Cipher suite policy', 'Disable legacy ciphers and enforce modern AEAD suites.'],
  ['Password hashing cost', 'Set Argon2id/scrypt memory and time to match threat model.'],
  ['Certificate validation', 'Enforce hostname checks and revocation/CT policies.'],
  ['Audit logging', 'Log key usage, signature failures, and policy violations.'],
] as const

const observability = [
  ['Key usage patterns', 'Monitor key age, use counts, and rotations.'],
  ['Handshake failures', 'Track TLS errors, certificate issues, and downgrade attempts.'],
  ['Integrity failures', 'Alert on AEAD tag or signature verification failures.'],
  ['Nonce violations', 'Detect nonce reuse and counter regressions.'],
  ['Password hash load', 'Track hashing latency to avoid login bottlenecks.'],
  ['HSM/KMS health', 'Monitor latency and error rates for key services.'],
] as const

const codeExamples = [
  {
    title: 'AEAD encrypt/decrypt',
    code: `function seal(key: Uint8Array, nonce: Uint8Array, plaintext: Uint8Array, aad: Uint8Array) {
  const { ciphertext, tag } = aeadEncrypt(key, nonce, plaintext, aad)
  return { nonce, ciphertext, tag }
}

function open(key: Uint8Array, nonce: Uint8Array, ciphertext: Uint8Array, tag: Uint8Array, aad: Uint8Array) {
  const plaintext = aeadDecrypt(key, nonce, ciphertext, aad, tag)
  if (!plaintext) throw new Error('integrity check failed')
  return plaintext
}`,
    explanation: 'AEAD seals data and metadata; decryption must reject on any tag failure.',
  },
  {
    title: 'HKDF key schedule',
    code: `function hkdfExtract(salt: Uint8Array, ikm: Uint8Array) {
  return hmac(salt, ikm)
}

function hkdfExpand(prk: Uint8Array, info: Uint8Array, len: number) {
  let t = new Uint8Array([])
  const out: number[] = []
  let i = 1
  while (out.length < len) {
    t = hmac(prk, concat(t, info, Uint8Array.of(i)))
    out.push(...t)
    i++
  }
  return new Uint8Array(out.slice(0, len))
}`,
    explanation: 'HKDF safely derives multiple subkeys from a shared secret.',
  },
  {
    title: 'Ed25519 sign/verify (sketch)',
    code: `function sign(message: Uint8Array, secretKey: Uint8Array) {
  return ed25519Sign(message, secretKey)
}

function verify(message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array) {
  return ed25519Verify(message, signature, publicKey)
}`,
    explanation: 'Signatures bind identity and integrity to messages and artifacts.',
  },
  {
    title: 'Argon2id password hashing',
    code: `type HashRecord = { salt: Uint8Array; params: { m: number; t: number; p: number }; digest: Uint8Array }

function hashPassword(password: Uint8Array): HashRecord {
  const salt = randomBytes(16)
  const params = { m: 64 * 1024, t: 3, p: 2 }
  const digest = argon2id(password, salt, params)
  return { salt, params, digest }
}

function verifyPassword(password: Uint8Array, record: HashRecord): boolean {
  const digest = argon2id(password, record.salt, record.params)
  return constantTimeEqual(digest, record.digest)
}`,
    explanation:
      'Memory-hard hashing slows offline guessing; constant-time compare avoids timing leaks.',
  },
]

const keyTakeaways = [
  ['Pair secrecy with integrity', 'Confidentiality alone is not enough; always use AEAD or a MAC.'],
  ['Keys and nonces are fragile', 'Prevent reuse, rotate regularly, and isolate storage.'],
  [
    'Identity checks are part of crypto',
    'Certificate validation, AAD, and signatures bind data to the right parties.',
  ],
  ['Plan for change', 'Design for rotation, revocation, and post-quantum upgrades now.'],
] as const

const glossary = [
  [
    'AEAD',
    'Authenticated encryption with associated data that provides confidentiality and integrity together.',
  ],
  ['Nonce', 'A unique per-message value that must not repeat under the same key.'],
  ['HKDF', 'HMAC-based key derivation function used to extract and expand secrets into subkeys.'],
  [
    'Forward secrecy',
    'Property that keeps old traffic safe even if long-term keys are later compromised.',
  ],
  [
    'Argon2id',
    'Memory-hard password hashing algorithm designed to resist offline guessing attacks.',
  ],
  [
    'Ed25519',
    'Modern elliptic-curve signature scheme with fast verification and deterministic signing.',
  ],
  ['AAD', 'Associated data authenticated but not encrypted by an AEAD scheme.'],
  ['KMS/HSM', 'Managed or hardware-backed key storage and policy enforcement systems.'],
] as const

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
    { id: 'bp-history', label: 'History' },
    { id: 'bp-applications', label: 'Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-pillars', label: 'Pillars' },
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-flow', label: 'How It Works' },
    { id: 'core-primitives', label: 'Primitive Anatomy' },
    { id: 'core-protocols', label: 'Protocol Anatomy' },
    { id: 'core-trust', label: 'Trust Models' },
    { id: 'core-tradeoffs', label: 'Tradeoff Matrix' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-when', label: 'When to Use' },
    { id: 'core-advanced', label: 'Advanced Moves' },
    { id: 'core-tuning', label: 'Tuning Checklist' },
    { id: 'core-observability', label: 'Observability' },
  ],
  examples: [
    { id: 'ex-failure', label: 'Failure Mode' },
    { id: 'ex-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function CryptographyPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Cryptography',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Cryptography"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Cryptography</h1>
      <p className="crypto-help-intro">
        Cryptography turns untrusted networks into workable systems by hiding data, detecting
        tampering, and binding identities. Real security comes from disciplined key handling, nonce
        hygiene, and protocols that treat failure as normal.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">History That Shaped Practice</h2>
            {history.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Where It Shows Up</h2>
            {applications.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            {keyTakeaways.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-pillars" className="bin98-section">
            <h2 className="bin98-heading">Pillars and Mental Hooks</h2>
            {pillars.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-flow" className="bin98-section">
            <h2 className="bin98-heading">How It Works, Step by Step</h2>
            {howItWorks.map(([title, detail], index) => (
              <p key={title}>
                <strong>
                  Step {index + 1}: {title}:
                </strong>{' '}
                {detail}
              </p>
            ))}
          </section>

          <section id="core-primitives" className="bin98-section">
            <h2 className="bin98-heading">Primitive Anatomy</h2>
            {primitiveAnatomy.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-protocols" className="bin98-section">
            <h2 className="bin98-heading">Protocol Anatomy</h2>
            {protocolAnatomy.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-trust" className="bin98-section">
            <h2 className="bin98-heading">Trust Models</h2>
            {trustModel.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Tradeoff Matrix</h2>
            {tradeoffMatrix.map(([dimension, symmetric, asymmetric]) => (
              <p key={dimension}>
                <strong>{dimension}:</strong> Symmetric: {symmetric} Asymmetric: {asymmetric}
              </p>
            ))}
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity at a Glance</h2>
            {complexityTable.map(([approach, time, space, note]) => (
              <p key={approach}>
                <strong>{approach}:</strong> Time {time}; Space {space}; {note}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Pitfalls to Avoid</h2>
            <ul>
              {pitfalls.map(([title, detail]) => (
                <li key={title}>
                  <strong>{title}:</strong> {detail}
                </li>
              ))}
            </ul>
          </section>

          <section id="core-when" className="bin98-section">
            <h2 className="bin98-heading">When to Reach for Each Tool</h2>
            {whenToUse.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Moves</h2>
            {advanced.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <section id="core-tuning" className="bin98-section">
            <h2 className="bin98-heading">Tuning Checklist</h2>
            {tuningChecklist.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-observability" className="bin98-section">
            <h2 className="bin98-heading">Observability and Signals</h2>
            {observability.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-failure" className="bin98-section">
            <h2 className="bin98-heading">Failure Mode</h2>
            <p>{failureStory}</p>
          </section>

          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            {codeExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map(([term, definition]) => (
            <p key={term}>
              <strong>{term}:</strong> {definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
