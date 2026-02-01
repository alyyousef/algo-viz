import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'Secrecy + integrity',
    detail: 'Encryption hides data; integrity detects tampering and forgery.',
    note: 'Always pair confidentiality with authentication (AEAD or MAC).',
  },
  {
    title: 'Keys are the asset',
    detail: 'Strong primitives fail if keys are leaked, reused, or never rotated.',
    note: 'Key lifecycle dominates real-world security incidents.',
  },
  {
    title: 'Protocols glue primitives',
    detail: 'Safe primitives can still be misused without nonces, context binding, and identity.',
    note: 'Most failures are protocol and integration mistakes.',
  },
  {
    title: 'Performance is layered',
    detail: 'Public-key operations are rare and latency-bound; symmetric crypto is frequent and throughput-bound.',
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
    detail: 'Asymmetric encryption and signatures based on factoring.',
    note: 'Made digital signatures mainstream.',
  },
  {
    title: '1990s: Security definitions',
    detail: 'IND-CPA, IND-CCA, and provable security formalize what "secure" means.',
    note: 'Shifted crypto from intuition to proof-driven design.',
  },
  {
    title: '2006: Curve25519',
    detail: 'Safe, fast elliptic-curve operations with strong side-channel resistance.',
    note: 'Adopted in TLS 1.3, Signal, and SSH.',
  },
  {
    title: '2018: TLS 1.3',
    detail: 'Removed legacy ciphers; mandatory forward secrecy.',
    note: 'Simplified handshakes and reduced downgrade risk.',
  },
  {
    title: '2022+: Post-quantum finalists',
    detail: 'Kyber (KEM) and Dilithium (signatures) selected for standardization.',
    note: 'Hybrid deployments begin to hedge future risk.',
  },
]

const pillars = [
  {
    title: 'AEAD first',
    detail: 'Authenticated encryption (AES-GCM, ChaCha20-Poly1305) provides confidentiality + integrity.',
  },
  {
    title: 'Nonce discipline',
    detail: 'Nonces must never repeat under a key; track or use counters.',
  },
  {
    title: 'Identity binding',
    detail: 'Bind messages to identities and metadata using signatures or AAD.',
  },
  {
    title: 'Key lifecycle',
    detail: 'Generate with entropy, store securely, rotate regularly, and revoke on compromise.',
  },
]

const mentalModels = [
  {
    title: 'Sealed envelope with receipt',
    detail: 'AEAD seals the letter and signs the label; reject if seal or label is wrong.',
  },
  {
    title: 'One-time pad warning',
    detail: 'Nonce reuse with a stream cipher is like reusing a one-time pad.',
  },
  {
    title: 'Tamper-evident bag',
    detail: 'Integrity checks show if something changed even if you cannot read it.',
  },
  {
    title: 'Budgeted hardness',
    detail: 'Parameter sizes translate to attacker cost; pick based on asset value.',
  },
]

const howItWorks = [
  {
    title: 'Choose modern primitives',
    detail: 'AES-GCM or ChaCha20-Poly1305 for AEAD; X25519/P-256 for key exchange; Ed25519 for signatures.',
  },
  {
    title: 'Bind identities and context',
    detail: 'Use certificates or PSK identities; include headers as AAD to prevent replay or misrouting.',
  },
  {
    title: 'Manage nonces and keys',
    detail: 'Use counters or unique random nonces; derive subkeys with HKDF.',
  },
  {
    title: 'Protect passwords and secrets',
    detail: 'Use Argon2id or scrypt with salts; never store secrets in repos or logs.',
  },
  {
    title: 'Rotate and revoke',
    detail: 'Version keys; support dual read/write during rotation; verify revocation paths.',
  },
  {
    title: 'Test for side channels',
    detail: 'Use constant-time comparisons and audit for timing or error leaks.',
  },
  {
    title: 'Monitor security posture',
    detail: 'Track key usage, failure rates, and signature verification errors.',
  },
]

const primitiveAnatomy = [
  {
    title: 'Symmetric ciphers',
    detail: 'AES and ChaCha20 provide fast confidentiality for bulk data.',
  },
  {
    title: 'AEAD modes',
    detail: 'GCM and Poly1305 authenticate ciphertext plus metadata (AAD).',
  },
  {
    title: 'Hash functions',
    detail: 'SHA-256/SHA-3 produce fixed-size digests; used for integrity and KDFs.',
  },
  {
    title: 'Key derivation',
    detail: 'HKDF extracts and expands secrets into multiple subkeys safely.',
  },
  {
    title: 'Public-key crypto',
    detail: 'ECC and RSA enable key exchange and signatures.',
  },
  {
    title: 'Password hashing',
    detail: 'Argon2id and scrypt are memory-hard by design.',
  },
]

const protocolAnatomy = [
  {
    title: 'Handshake',
    detail: 'Agree on keys, cipher suites, and identities.',
  },
  {
    title: 'Key schedule',
    detail: 'Derive traffic keys from shared secrets with HKDF.',
  },
  {
    title: 'Transcript binding',
    detail: 'Sign or MAC the handshake to prevent downgrade attacks.',
  },
  {
    title: 'Forward secrecy',
    detail: 'Ephemeral keys ensure past traffic stays safe after key compromise.',
  },
  {
    title: 'Session resumption',
    detail: 'PSK tickets reduce latency; must be bound to context to avoid replay.',
  },
  {
    title: 'Rekeying',
    detail: 'Rotate traffic keys after a byte or time limit.',
  },
]

const trustModel = [
  {
    title: 'PKI and certificates',
    detail: 'CAs bind public keys to identities for TLS and code signing.',
  },
  {
    title: 'Web of trust',
    detail: 'PGP-style signatures allow decentralized trust paths.',
  },
  {
    title: 'Pre-shared keys',
    detail: 'Simpler but requires secure distribution and rotation.',
  },
  {
    title: 'Transparency logs',
    detail: 'Public logs make certificate issuance auditable.',
  },
  {
    title: 'Hardware trust',
    detail: 'TPMs/HSMs protect private keys and attest software state.',
  },
  {
    title: 'Least privilege',
    detail: 'Limit where and when keys can be used.',
  },
]

const tradeoffMatrix = [
  {
    dimension: 'Speed',
    symmetric: 'Very fast (AES/ChaCha).',
    asymmetric: 'Slower; used sparingly (handshakes/signatures).',
  },
  {
    dimension: 'Key distribution',
    symmetric: 'Harder; requires secure pre-sharing.',
    asymmetric: 'Easier; public keys can be shared openly.',
  },
  {
    dimension: 'Forward secrecy',
    symmetric: 'Requires extra protocol design.',
    asymmetric: 'ECDHE makes it natural.',
  },
  {
    dimension: 'Operational complexity',
    symmetric: 'Simpler primitives; harder key distribution.',
    asymmetric: 'Certificate management and validation overhead.',
  },
  {
    dimension: 'Typical usage',
    symmetric: 'Bulk data encryption.',
    asymmetric: 'Key exchange and signatures.',
  },
  {
    dimension: 'Failure mode',
    symmetric: 'Nonce/key reuse catastrophic.',
    asymmetric: 'Signature misuse or CA compromise.',
  },
]

const complexityTable = [
  {
    approach: 'AES-GCM encrypt',
    time: 'O(n)',
    space: 'O(1)',
    note: 'n = bytes; AES-NI makes it near memory-speed.',
  },
  {
    approach: 'ChaCha20-Poly1305',
    time: 'O(n)',
    space: 'O(1)',
    note: 'Fast on CPUs without AES acceleration.',
  },
  {
    approach: 'ECDH (X25519/P-256)',
    time: 'O(k^2)',
    space: 'O(1)',
    note: 'k = key size; latency-bound per session.',
  },
  {
    approach: 'Ed25519 signature verify',
    time: 'O(k^2)',
    space: 'O(1)',
    note: 'Fast verification; ideal for code signing.',
  },
  {
    approach: 'Argon2id',
    time: 'O(t * m)',
    space: 'O(m)',
    note: 't = iterations, m = memory cost.',
  },
  {
    approach: 'HKDF derive',
    time: 'O(n)',
    space: 'O(1)',
    note: 'Linear in output size.',
  },
]

const applications = [
  {
    title: 'TLS 1.3',
    detail: 'ECDHE + HKDF for keys; AEAD for records; forward secrecy by default.',
    note: 'Short handshakes and no legacy RSA key transport.',
  },
  {
    title: 'Messaging protocols',
    detail: 'Signal uses X25519 handshakes and a double ratchet for per-message keys.',
    note: 'Rapid key churn limits compromise damage.',
  },
  {
    title: 'Software supply chain',
    detail: 'Sign releases; verify signatures and transparency logs on install.',
    note: 'Stops tampered artifacts from entering builds.',
  },
  {
    title: 'Storage at rest',
    detail: 'XTS-AES for disks; envelope encryption with KMS for backups.',
    note: 'Keys rotate without rewriting data.',
  },
]

const failureStory =
  'A payment service reused AES-GCM nonces after a deployment bug. Attackers XORed ciphertexts to recover card data. A monotonic per-key nonce counter and strict nonce validation eliminated reuse and forced immediate key rotation.'

const pitfalls = [
  {
    title: 'Nonce reuse',
    detail: 'Repeating a nonce with a stream/AEAD key leaks plaintext relations.',
  },
  {
    title: 'DIY crypto',
    detail: 'Custom padding, RNGs, or protocols often break under scrutiny.',
  },
  {
    title: 'Skipping identity checks',
    detail: 'Ignoring certificate/hostname validation enables trivial MITM attacks.',
  },
  {
    title: 'Missing context binding',
    detail: 'Failing to MAC headers or metadata allows replay or misrouting.',
  },
  {
    title: 'Stale or exposed keys',
    detail: 'Long-lived keys in repos or logs expand blast radius.',
  },
  {
    title: 'Weak randomness',
    detail: 'Bad RNGs ruin key security; use OS-provided CSPRNGs.',
  },
]

const whenToUse = [
  {
    title: 'Need secrecy + integrity',
    detail: 'Use AEAD; AES-GCM where AES-NI exists, ChaCha20-Poly1305 where it does not.',
  },
  {
    title: 'Need fresh shared keys',
    detail: 'Use ECDHE (X25519/P-256) with authentication; avoid static RSA key transport.',
  },
  {
    title: 'Need tamper evidence',
    detail: 'Sign with Ed25519 when possible; use RSA/ECDSA for compatibility.',
  },
  {
    title: 'Need password storage',
    detail: 'Use Argon2id or scrypt with tuned memory/time costs.',
  },
  {
    title: 'Need data at rest',
    detail: 'Use envelope encryption with versioned keys and KMS/HSM support.',
  },
  {
    title: 'Need quantum hedge',
    detail: 'Adopt hybrid handshakes or PQC algorithms where available.',
  },
]

const advanced = [
  {
    title: 'Hybrid post-quantum handshakes',
    detail: 'Combine ECDHE with Kyber KEM to hedge future quantum risk.',
    note: 'Maintains current security while preparing for PQC.',
  },
  {
    title: 'Replay and duplicate defense',
    detail: 'Track seen nonces or sequence numbers; reject duplicates before decryption.',
    note: 'Prevents replay and some oracle gadgets.',
  },
  {
    title: 'Side-channel hygiene',
    detail: 'Avoid branching on secrets; use constant-time primitives.',
    note: 'Critical on shared or untrusted hardware.',
  },
  {
    title: 'Key isolation',
    detail: 'Store private keys in HSM/KMS and restrict usage by policy.',
    note: 'Reduces blast radius of application bugs.',
  },
  {
    title: 'Deterministic signatures',
    detail: 'Ed25519 avoids RNG failures that break ECDSA.',
    note: 'Prevents catastrophic key leakage from bad randomness.',
  },
  {
    title: 'Threshold crypto',
    detail: 'Split signing or decryption across multiple parties.',
    note: 'No single node holds the full secret.',
  },
]

const tuningChecklist = [
  {
    title: 'Nonce management',
    detail: 'Track counters per key and enforce unique nonces.',
  },
  {
    title: 'Key rotation cadence',
    detail: 'Rotate on schedule and after incident indicators.',
  },
  {
    title: 'Cipher suite policy',
    detail: 'Disable legacy ciphers and enforce modern AEAD suites.',
  },
  {
    title: 'Password hashing cost',
    detail: 'Set Argon2id/scrypt memory and time to match threat model.',
  },
  {
    title: 'Certificate validation',
    detail: 'Enforce hostname checks and revocation/CT policies.',
  },
  {
    title: 'Audit logging',
    detail: 'Log key usage, signature failures, and policy violations.',
  },
]

const observability = [
  {
    title: 'Key usage patterns',
    detail: 'Monitor key age, use counts, and rotations.',
  },
  {
    title: 'Handshake failures',
    detail: 'Track TLS errors, certificate issues, and downgrade attempts.',
  },
  {
    title: 'Integrity failures',
    detail: 'Alert on AEAD tag or signature verification failures.',
  },
  {
    title: 'Nonce violations',
    detail: 'Detect nonce reuse and counter regressions.',
  },
  {
    title: 'Password hash load',
    detail: 'Track hashing latency to avoid login bottlenecks.',
  },
  {
    title: 'HSM/KMS health',
    detail: 'Monitor latency and error rates for key services.',
  },
]

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
    explanation: 'Memory-hard hashing slows offline guessing; constant-time compare avoids timing leaks.',
  },
]

const keyTakeaways = [
  {
    title: 'Pair secrecy with integrity',
    detail: 'Confidentiality alone is not enough; always use AEAD or a MAC.',
  },
  {
    title: 'Keys and nonces are fragile',
    detail: 'Prevent reuse, rotate regularly, and isolate storage.',
  },
  {
    title: 'Identity checks are part of crypto',
    detail: 'Certificate validation, AAD, and signatures bind data to the right parties.',
  },
  {
    title: 'Plan for change',
    detail: 'Design for rotation, revocation, and post-quantum upgrades now.',
  },
]

export default function CryptographyPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Cryptography</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Secrecy, integrity, and identity in practice</div>
              <p className="win95-text">
                Cryptography turns untrusted networks into workable systems by hiding data, detecting tampering, and binding identities.
                Real security comes from disciplined key handling, nonce hygiene, and protocols that treat failure as normal.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Big picture</legend>
            <div className="win95-grid win95-grid-2">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>History that shaped practice</legend>
            <div className="win95-grid win95-grid-2">
              {history.map((event) => (
                <div key={event.title} className="win95-panel">
                  <div className="win95-heading">{event.title}</div>
                  <p className="win95-text">{event.detail}</p>
                  <p className="win95-text">{event.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pillars and mental hooks</legend>
            <div className="win95-row">
              <div className="win95-panel">
                <div className="win95-subheading">Pillars</div>
                <div className="win95-stack">
                  {pillars.map((pillar) => (
                    <div key={pillar.title} className="win95-panel">
                      <div className="win95-heading">{pillar.title}</div>
                      <p className="win95-text">{pillar.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="win95-panel">
                <div className="win95-subheading">Mental models</div>
                <div className="win95-stack">
                  {mentalModels.map((model) => (
                    <div key={model.title} className="win95-panel">
                      <div className="win95-heading">{model.title}</div>
                      <p className="win95-text">{model.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works, step by step</legend>
            <div className="win95-grid win95-grid-3">
              {howItWorks.map((step, index) => (
                <div key={step.title} className="win95-panel">
                  <div className="win95-heading">
                    Step {index + 1}: {step.title}
                  </div>
                  <p className="win95-text">{step.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Primitive anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {primitiveAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Protocol anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {protocolAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Trust models</legend>
            <div className="win95-grid win95-grid-2">
              {trustModel.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tradeoff matrix</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Symmetric</th>
                    <th>Asymmetric</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeoffMatrix.map((row) => (
                    <tr key={row.dimension}>
                      <td>{row.dimension}</td>
                      <td>{row.symmetric}</td>
                      <td>{row.asymmetric}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity at a glance</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Approach</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {complexityTable.map((row) => (
                    <tr key={row.approach}>
                      <td>{row.approach}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Where it shows up</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((app) => (
                <div key={app.title} className="win95-panel">
                  <div className="win95-heading">{app.title}</div>
                  <p className="win95-text">{app.detail}</p>
                  <p className="win95-text">{app.note}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <div className="win95-heading">Failure mode</div>
              <p className="win95-text">{failureStory}</p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pitfalls to avoid</legend>
            <div className="win95-grid win95-grid-2">
              {pitfalls.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to reach for each tool</legend>
            <div className="win95-grid win95-grid-2">
              {whenToUse.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced moves</legend>
            <div className="win95-grid win95-grid-2">
              {advanced.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tuning checklist</legend>
            <div className="win95-grid win95-grid-2">
              {tuningChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Observability and signals</legend>
            <div className="win95-grid win95-grid-2">
              {observability.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Code examples</legend>
            <div className="win95-stack">
              {codeExamples.map((example) => (
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
            <legend>Key takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
