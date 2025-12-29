import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

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
    note: 'Clarified what "secure" means for developers.',
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
              <div className="win95-stack">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="win95-panel">
                    <div className="win95-heading">{pillar.title}</div>
                    <p className="win95-text">{pillar.detail}</p>
                  </div>
                ))}
              </div>
              <div className="win95-stack">
                {mentalModels.map((model) => (
                  <div key={model.title} className="win95-panel">
                    <div className="win95-heading">{model.title}</div>
                    <p className="win95-text">{model.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works, step by step</legend>
            <div className="win95-grid win95-grid-3">
              {howItWorks.map((step, idx) => (
                <div key={step.title} className="win95-panel">
                  <p className="win95-text">Step {idx + 1}</p>
                  <div className="win95-heading">{step.title}</div>
                  <p className="win95-text">{step.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity at a glance</legend>
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
            <div className="win95-stack">
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
            <div className="win95-stack">
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
