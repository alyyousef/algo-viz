import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Diffie and Hellman formalize public-key ideas (1976)',
    detail:
      'They introduced the notion of exchanging keys over an open channel by leaning on discrete logarithms, breaking the assumption that secrecy requires a pre-shared key.',
  },
  {
    title: 'Rivest, Shamir, and Adleman publish RSA (1977)',
    detail:
      'RSA showed that asymmetric encryption and signatures are practical, basing security on integer factorization hardness.',
  },
  {
    title: 'Naor and Yung define semantic security (1990)',
    detail:
      'They gave modern confidentiality definitions, crystallizing the need for indistinguishability under chosen-plaintext attack (IND-CPA).',
  },
  {
    title: 'Bellare and Rogaway make authenticated encryption mainstream (2000s)',
    detail:
      'Their work on provable security and composition clarified why confidentiality must pair with integrity to resist active attackers.',
  },
  {
    title: 'Bernstein introduces Curve25519 (2006)',
    detail:
      'A fast, side-channel resistant elliptic-curve design that now underpins X25519 key exchange and Ed25519 signatures.',
  },
]

const mentalModels = [
  {
    title: 'Locks and labels',
    detail:
      'Encryption is a lock, but without clear labels (associated data) you cannot prove what was locked. AEAD tags both ciphertext and context so the receiver knows exactly what was protected.',
  },
  {
    title: 'Fragile counters',
    detail:
      'Nonces act like fragile counters. Reusing one with the same key is like sealing two letters with the same one-time pad; the xor of ciphertexts leaks the xor of plaintexts.',
  },
  {
    title: 'Math as a budget',
    detail:
      'Security reductions translate attacker effort into math hardness. Choosing parameters is budgeting computation so attackers run out of time or energy first.',
  },
  {
    title: 'Composition is plumbing',
    detail:
      'Primitives rarely fail alone; leaks happen at the joints. Protocols are the plumbing that routes keys, identities, and randomness without backflow.',
  },
]

const primitiveMechanics = [
  {
    heading: 'Symmetric encryption',
    bullets: [
      'Modern AEAD modes: AES-GCM, ChaCha20-Poly1305. Both provide confidentiality and integrity in one shot.',
      'Inputs: key, nonce, plaintext, and associated data. Output: ciphertext and tag.',
      'Nonce rules: unique per key. Use counters server side or 96-bit randomness with collision analysis.',
    ],
  },
  {
    heading: 'Hashing and MACs',
    bullets: [
      'Cryptographic hash: preimage and collision resistance. SHA-256, SHA-512, and SHA3-256 dominate practice.',
      'MACs: HMAC(key, message) or Poly1305. They bind integrity to a shared secret.',
      'KDFs: HKDF expands shared secrets into multiple labeled keys. PBKDF2, scrypt, Argon2 harden passwords.',
    ],
  },
  {
    heading: 'Public-key tools',
    bullets: [
      'Key exchange: X25519 and P-256 ECDHE for forward secrecy.',
      'Signatures: Ed25519 for speed and safety defaults; ECDSA and RSA for compatibility.',
      'Certificates bind public keys to identities; revocation and rotation keep bindings fresh.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Asymptotic cost',
    detail:
      'Symmetric operations are O(n) in message length; hashes and stream ciphers scale linearly. Public-key operations are roughly O(k^3) with modulus size k for RSA, and near O(k^2) for elliptic curves.',
  },
  {
    title: 'Real throughput',
    detail:
      'AES-GCM with hardware acceleration often exceeds 10 Gbps per core; ChaCha20-Poly1305 shines on devices without AES-NI, including many mobile CPUs.',
  },
  {
    title: 'Handshake vs. bulk',
    detail:
      'Public-key handshakes are latency-bound; they happen once per session. Bulk data lives in the symmetric realm, so optimizing key reuse, batching, and record sizes matters more than shaving microseconds off ECDH.',
  },
  {
    title: 'Memory footprint',
    detail:
      'AEAD needs minimal working memory; Argon2 and scrypt intentionally require tens to hundreds of megabytes to raise the cost of guessing attacks.',
  },
]

const realWorldUses = [
  {
    context: 'Web traffic',
    detail:
      'TLS 1.3 uses X25519 or P-256 for ECDHE, HKDF for key derivation, and AEAD (AES-GCM or ChaCha20-Poly1305) for records. Forward secrecy and authenticated encryption are defaults, not options.',
  },
  {
    context: 'Messaging apps',
    detail:
      'Signal protocol employs the Double Ratchet: X25519 for initial handshake, HKDF chains for rapid key rotation, and AEAD for message confidentiality and authenticity.',
  },
  {
    context: 'Databases and storage',
    detail:
      'Disk encryption stacks rely on XTS-AES for sector-level confidentiality and integrity, while backup systems layer AEAD envelopes with key IDs for rotation.',
  },
  {
    context: 'Package ecosystems',
    detail:
      'NPM, PyPI, and container registries lean on signature verification (often via TUF or Sigstore) to prevent tampered artifacts from entering supply chains.',
  },
]

const examples = [
  {
    title: 'Authenticated encryption blueprint',
    code: `function seal({ key, nonce, plaintext, aad }):
    // Encrypt and authenticate. In practice, call a vetted AEAD library.
    (ciphertext, tag) = AEAD_Encrypt(key, nonce, plaintext, aad)
    return { nonce, ciphertext, tag, aad }

function open({ key, nonce, ciphertext, tag, aad }):
    plaintext = AEAD_Decrypt(key, nonce, ciphertext, aad, tag)
    if plaintext is INVALID: throw IntegrityError
    return plaintext`,
    explanation:
      'The mental model is sealing a letter and stamping both the envelope and its label. If the stamp verification fails, reject without revealing any plaintext.',
  },
  {
    title: 'Password hashing guardrail',
    code: `function hashPassword(password):
    salt = SecureRandom(16 bytes)
    params = { memory: 64 MB, iterations: 3, parallelism: 2 }
    digest = Argon2id(password, salt, params)
    return { salt, params, digest }

function verifyPassword(password, record):
    digest = Argon2id(password, record.salt, record.params)
    return ConstantTimeEqual(digest, record.digest)`,
    explanation:
      'Argon2id forces attackers to burn memory and time on each guess. Constant-time comparison avoids timing leaks.',
  },
]

const pitfalls = [
  'Nonce reuse with the same AEAD key leaks relationships between messages and can reveal plaintext. Enforce nonce uniqueness in code.',
  'Rolling your own padding, RNG, or protocol usually introduces a break. Prefer boring, audited libraries.',
  'Missing associated data means metadata can be tampered without detection. Always MAC headers and contextual fields.',
  'Certificate validation shortcuts (skipping hostname checks, trusting self-signed roots in production) open trivial man-in-the-middle vectors.',
  'Storing long-lived keys alongside code repositories increases blast radius. Separate duties and use hardware-backed key storage.',
]

const decisionGuidance = [
  'Need confidentiality plus integrity for messages: choose AEAD (AES-GCM on servers with AES-NI, ChaCha20-Poly1305 on constrained or mixed hardware).',
  'Need two parties to agree on a key without prior sharing: use ECDHE (X25519 or P-256) with authentication via certificates or pre-shared identities.',
  'Need tamper evidence for software or documents: sign with Ed25519 when possible; use RSA-2048 or better when compatibility requires it.',
  'Need to store user passwords: use Argon2id or scrypt with salts and tuned parameters; never store raw hashes.',
  'Need to derive multiple keys from one secret: use HKDF with explicit labels to avoid key reuse across contexts.',
]

const advancedInsights = [
  {
    title: 'Post-quantum migration',
    detail:
      'NIST is standardizing lattice-based schemes like CRYSTALS-Kyber and Dilithium. Hybrid handshakes (ECDHE + Kyber) hedge against future quantum attacks while maintaining current security.',
  },
  {
    title: 'Side-channel resilience',
    detail:
      'Constant-time implementations and complete addition formulas (as in Edwards curves) reduce timing and power leakage. Hardware isolation and masking add defense in depth.',
  },
  {
    title: 'Key lifecycle engineering',
    detail:
      'Rotate keys with versioned identifiers. During rotation, decrypt with the old key and encrypt with the new to avoid outages. Log key usage to spot stale or overused material.',
  },
  {
    title: 'Formal verification',
    detail:
      'Tools like Tamarin, ProVerif, and EverCrypt help prove protocol properties and constant-time behavior. Verified components reduce whole classes of implementation bugs.',
  },
]

const takeaways = [
  'Cryptography is about composition. Safe primitives can still fail when glued together without clear identities, nonces, and context.',
  'Authenticated encryption is the default. Confidentiality without integrity invites active attacks.',
  'Key management and randomness hygiene cause most real incidents, not broken math.',
  'Prefer modern, audited primitives and rotate keys with versioning to limit blast radius.',
]

export default function CryptographyPage(): JSX.Element {
  return (
    <TopicLayout
      title="Cryptography"
      subtitle="Building secrecy, integrity, and identity with math and engineering discipline"
      intro="Cryptography is not only ciphers and equations. It is a toolbox for controlling who can learn, modify, or impersonate data. The failures that reach headlines rarely come from AES or elliptic curves; they come from reused nonces, unvalidated certificates, or missing context binding. This page walks through the ideas, history, mechanics, and real-world playbooks that keep systems trustworthy."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          At its core, cryptography gives two guarantees: keeping secrets and detecting tampering. It lets strangers agree on keys
          in public, proves authorship of messages, and ties data to identities so that networks can be open without being reckless.
          Without it, caches, CDNs, API clients, and supply chains would be forced into private networks or blind trust.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalMilestones.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-2">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works: primitives in motion">
        <div className="grid gap-3 md:grid-cols-3">
          {primitiveMechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity analysis and performance intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Rule of thumb: optimize public-key handshakes for latency and correctness, then focus energy on symmetric throughput,
          nonce management, and key lifecycle. Hardware acceleration often dominates algorithmic constants.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {realWorldUses.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionGuidance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights and current frontiers">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-100">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
