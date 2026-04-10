import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const PAGE_TITLE = 'Firebase for Mobile'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Firebase for Mobile means using Google Firebase as the backend and app-services platform behind a mobile application. In practice that often includes Firebase Authentication, Cloud Firestore or Realtime Database, Cloud Storage, Cloud Functions, Cloud Messaging, Remote Config, App Check, Analytics, Crashlytics, and related client SDK workflows that let the app talk directly to managed services.',
  'The useful mental model is that Firebase is not just a database. It is a broad application platform optimized for mobile and web teams that want managed backend capabilities plus growth, messaging, configuration, analytics, and app-quality tooling in one ecosystem. That breadth is a major part of why teams choose it.',
  'This page focuses on Firebase specifically in mobile engineering. It covers how Firebase fits into mobile architecture, data models, authentication, security rules, offline behavior, storage, serverless extensions, notifications, analytics and crash tooling, operational tradeoffs, examples, and the vocabulary that matters when shipping a real app with Firebase in production.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Firebase is a managed app-development platform from Google that provides backend and app-lifecycle services through SDK-friendly products. Mobile teams often adopt it because it can cover several adjacent needs at once: auth, data, storage, messaging, analytics, crash reporting, remote config, app distribution, and lightweight serverless logic.',
      'In a mobile architecture, Firebase often enables a direct client-to-service model. Instead of routing every request through a large custom backend, the app can talk directly to Firestore, Realtime Database, Auth, Storage, or Messaging-related services while Security Rules and related controls protect access. This can significantly accelerate product delivery, but it changes how teams should think about authorization, data shape, and cost.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why It Matters on Mobile',
    paragraphs: [
      'Firebase matters on mobile because mobile teams often need more than a CRUD backend. They need sign-in, push delivery, feature flags, app-quality telemetry, live updates, and sometimes offline-friendly behavior without building five separate systems. Firebase solves a wide slice of that platform surface with one integrated ecosystem and strong official client SDK support.',
      'It also matters because mobile release cycles are slower than web deployment cycles. If a mobile app needs runtime configuration changes, crash triage, delivery metrics, or notification targeting after it ships, platform services can create substantial leverage. Firebase is attractive not only because it stores data, but because it helps operate an app after launch.',
    ],
    bullets: [
      'Strong fit for mobile-first product teams.',
      'Combines backend services with app operations tooling.',
      'Works well when direct client SDK integration is desirable.',
      'Useful for fast iteration without building a full bespoke backend first.',
    ],
  },
  {
    id: 'bp-what-it-is-not',
    title: 'What It Is Not',
    paragraphs: [
      'Firebase is not architecture-free. Firestore data shape, query design, listener usage, Security Rules, App Check, indexing, and cost behavior all require deliberate engineering. Teams that treat Firebase as magic infrastructure often discover later that data-model mistakes and read-amplification patterns are expensive to unwind.',
      'It is also not automatically the correct choice for every app. Products that need heavy relational querying, deep transactional workflows, or full backend portability may find Firebase less natural than platforms built around SQL or custom service architectures. Firebase is strongest when its ecosystem shape matches the product shape.',
    ],
    bullets: [
      'Not just a database shortcut.',
      'Not a replacement for schema and access-pattern design.',
      'Not always ideal for strongly relational systems of record.',
      'Not free from vendor-specific architectural tradeoffs.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where It Fits Best',
    paragraphs: [
      'Firebase fits best for mobile-heavy products that benefit from rapid client integration, direct SDK access, offline-friendly sync behavior, managed auth, push messaging, analytics, remote config, and adjacent growth or app-quality tooling. Consumer apps, early-stage products, and cross-platform mobile apps often benefit the most from that integrated surface area.',
      'It is especially compelling when the team wants one app platform instead of a stitched set of separate vendors. The more of the Firebase ecosystem a team actually uses coherently, the stronger the value proposition becomes.',
    ],
  },
  {
    id: 'bp-decision-frame',
    title: 'Decision Frame',
    paragraphs: [
      'The right question is not whether Firebase has enough features. It usually does. The more useful question is whether the product should be modeled around Firebase-style client-driven services, document or JSON-tree data patterns, rules-based authorization, and ecosystem breadth. If that matches the app, Firebase can be a force multiplier. If not, the platform can feel constraining over time.',
      'The decision therefore depends on data shape, offline requirements, realtime behavior, security posture, vendor tolerance, and whether the team values app-platform breadth more than backend transparency or portability.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Firebase for mobile is best understood as a broad managed app platform with strong client SDK workflows and several surrounding products that matter after the first release.',
      'It works best when a mobile team wants integrated services, direct client access patterns, and app-lifecycle tooling in one ecosystem, and when the data and security model are designed intentionally rather than improvised.',
    ],
    bullets: [
      'Think platform, not just database.',
      'Client access patterns and rules are central to the design.',
      'Offline and realtime capabilities are major differentiators.',
      'The ecosystem breadth is part of the architectural choice.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-platform-shape',
    title: 'Platform Shape and Service Family',
    paragraphs: [
      'Firebase is a family of services rather than one backend product. For mobile teams, the usual core set includes Authentication, Cloud Firestore or Realtime Database, Cloud Storage, Cloud Functions, Cloud Messaging, App Check, Remote Config, Analytics, and Crashlytics. The value comes partly from integration between these services rather than from any one service in isolation.',
      'This means architectural decisions should consider the platform as a whole. A team that only needs one data API may not gain much from the entire ecosystem. A team that needs auth, storage, push, runtime config, crash reporting, and analytics may save substantial integration effort by standardizing on Firebase.',
    ],
  },
  {
    id: 'core-data-models',
    title: 'Cloud Firestore and Realtime Database',
    paragraphs: [
      'Firebase offers two classic data services for app-state workloads. Cloud Firestore is a document database organized around collections and documents, with queryable indexes, listeners, and offline persistence. Realtime Database is a synchronized JSON tree designed around low-latency state propagation and hierarchical data paths. Both are mobile-friendly, but they encourage different data shapes and access patterns.',
      'The practical rule is to choose the model that matches the product. Firestore is usually the default for newer apps that want document queries and a stronger developer experience around documents and collections. Realtime Database can still make sense for specific low-latency synchronized-state use cases. Neither behaves like a relational database, so denormalization and query planning matter early.',
    ],
    bullets: [
      'Firestore favors document collections and indexed queries.',
      'Realtime Database favors synchronized JSON-tree state.',
      'Both reward careful denormalized modeling.',
      'Query and listener shape affects both performance and cost.',
    ],
  },
  {
    id: 'core-auth',
    title: 'Authentication and Session Flow',
    paragraphs: [
      'Firebase Authentication is one of the platform strongest entry points. It supports email and password, social providers, phone flows, anonymous auth, custom tokens, and other common identity scenarios with strong client SDK support. On mobile, that often means sign-in can be added quickly with a coherent user object and token lifecycle across the platform.',
      'The bigger architectural point is that Firebase Auth is not just an isolated login service. It feeds Security Rules, Storage Rules, custom backend verification, Messaging targeting logic, and broader app identity assumptions. That makes identity design foundational rather than optional.',
    ],
  },
  {
    id: 'core-security',
    title: 'Security Rules and App Check',
    paragraphs: [
      'Firebase Security Rules are how direct client access stays safe. Rules define who can read or write documents, paths, or stored files based on auth state, request data, and resource state. They are central to Firebase architecture because many apps access services directly from the client instead of going through a traditional application server for every request.',
      'App Check adds another protection layer by helping attest that requests come from authentic app or device environments rather than arbitrary scripts or abuse traffic. This matters because authentication answers who the user is, while App Check helps answer whether the request is really coming from your app context.',
    ],
    bullets: [
      'Security Rules are part of core architecture, not cleanup work.',
      'Rules should be designed alongside the data model.',
      'App Check helps reduce abuse against exposed client-access services.',
      'A secure Firebase app depends on more than simply signing users in.',
    ],
  },
  {
    id: 'core-offline-realtime',
    title: 'Offline Behavior and Realtime Listeners',
    paragraphs: [
      'One of Firebase strongest mobile advantages is its client-friendly offline and realtime story. Firestore listeners can provide cached local state and continue syncing when connectivity changes. Realtime Database was historically built around synchronized app state and reconnect behavior. This makes Firebase particularly attractive for collaborative apps, feeds, chats, and other live features.',
      'That said, offline support does not remove the need to reason about conflict behavior, listener scope, local state assumptions, and battery/network cost. Teams still need to understand what is cached, when writes are replayed, and how much data listeners will pull over time.',
    ],
  },
  {
    id: 'core-storage',
    title: 'Cloud Storage for User Files',
    paragraphs: [
      'Firebase Cloud Storage is typically used for user uploads such as avatars, attachments, videos, or media associated with application records. Its biggest advantage is its coherence with Firebase Authentication and Storage Rules, which makes direct client uploads relatively straightforward in a mobile workflow.',
      'The engineering discipline still matters. File paths, naming strategy, metadata, permissions, and lifecycle handling should be tied back to product semantics. Otherwise storage turns into an unbounded bucket of poorly governed blobs.',
    ],
  },
  {
    id: 'core-functions',
    title: 'Cloud Functions and Backend Extensions',
    paragraphs: [
      'Firebase Cloud Functions let teams run server-side code for HTTP endpoints, background triggers, auth events, database changes, and other extension points. On mobile products, functions are often used for privileged logic, webhooks, notification orchestration, moderation, payment coordination, or cross-service glue that should not live in the client.',
      'The important boundary is trust. If an operation should not be executable purely from a mobile client, that is often a sign it belongs in Cloud Functions or another trusted backend surface. Firebase is powerful when teams use client SDKs for what the client should do and serverless code for what the client must not do.',
    ],
  },
  {
    id: 'core-messaging-config',
    title: 'Messaging, Remote Config, and App Operations',
    paragraphs: [
      'Firebase Cloud Messaging gives mobile teams a direct path for push notifications, topic subscriptions, token-targeted delivery, and background messaging scenarios. Remote Config adds the ability to change feature flags, experiments, and product defaults without forcing a new app-store release immediately.',
      'These services matter because they turn Firebase into more than a backend. They support live app operations after the binary ships. Product rollout, onboarding experiments, content toggles, and communications flows often depend on this operational layer.',
    ],
  },
  {
    id: 'core-analytics-quality',
    title: 'Analytics and Crash Reporting',
    paragraphs: [
      'Firebase Analytics and Crashlytics make the platform especially attractive to mobile teams because they connect app behavior, release quality, and user-impact signals inside the same ecosystem. Analytics helps teams understand usage and funnel behavior. Crashlytics helps them understand runtime failures, impact, and release health.',
      'This matters operationally because mobile apps cannot be patched instantly in the same way as many web services. Observability and release-quality tooling therefore have unusually high value. Firebase brings those concerns into the same platform as auth and data services, which simplifies adoption for many teams.',
    ],
  },
  {
    id: 'core-cost-scale',
    title: 'Cost, Scale, and Access Patterns',
    paragraphs: [
      'Firebase pricing often follows service-specific usage patterns such as reads, writes, deletes, storage, bandwidth, messaging volume, or function execution. This can feel inexpensive at first and then become more complex as the app grows. Listener-heavy designs, poor document shape, or unnecessary reads can materially change costs.',
      'The practical lesson is that Firebase architecture must consider cost as part of system design. Document shape, index design, subscription scope, and read amplification are not micro-optimizations. They are part of the production behavior of the system.',
    ],
    bullets: [
      'Cost follows access patterns, not only user count.',
      'Realtime listeners and repeated reads need careful design.',
      'Indexes and denormalization decisions affect both performance and billing.',
      'Managed services still require workload-aware architecture.',
    ],
  },
  {
    id: 'core-vendor-tradeoffs',
    title: 'Vendor Lock-In and Platform Tradeoffs',
    paragraphs: [
      'Firebase offers a large amount of leverage, but it also encourages architecture that maps closely to Firebase services and rules. Firestore document design, Rules syntax, Cloud Functions triggers, and the surrounding SDK workflows can make the system feel highly platform-native. That is productive, but it does create migration cost if the team later wants to leave the platform.',
      'This does not make Firebase a poor choice. It means the team should choose it for the right reasons: platform convenience, mobile fit, and integrated tooling, not because it appears to remove the need for architecture entirely.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-firestore',
    title: 'Read a User Profile from Firestore',
    description: [
      'A common mobile pattern is reading a user-owned document from Firestore after authentication. The app can talk directly to Firestore through the SDK while Security Rules protect the underlying document path.',
      'The important point is that path design, auth identity, and rules are all part of the same feature, not separate concerns.',
    ],
    code: `import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const auth = getAuth()
const user = auth.currentUser

if (user) {
  const ref = doc(db, 'profiles', user.uid)
  const snapshot = await getDoc(ref)
  console.log(snapshot.data())
}`,
    notes: [
      'User identity often maps directly into document ownership.',
      'Security Rules should validate that relationship explicitly.',
      'Document path design is part of the app model, not a minor implementation detail.',
    ],
  },
  {
    id: 'examples-listener',
    title: 'Subscribe to Realtime Query Updates',
    description: [
      'Firestore snapshot listeners are one of Firebase most recognizable mobile workflows. The client subscribes to a query and receives updates as the underlying documents change, which is useful for feeds, chat, collaborative lists, or status views.',
      'This is powerful, but the scope of the query should still be bounded so the app is not listening to more data than it actually needs.',
    ],
    code: `import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

const messagesQuery = query(
  collection(db, 'rooms', roomId, 'messages'),
  orderBy('createdAt', 'asc')
)

const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
  const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  console.log(messages)
})`,
    notes: [
      'Listeners should match real product needs, not stay open everywhere by default.',
      'Query scope affects user experience, network behavior, and cost.',
      'The unsubscribe lifecycle should match the screen or feature lifecycle.',
    ],
  },
  {
    id: 'examples-storage',
    title: 'Upload a User Avatar to Cloud Storage',
    description: [
      'Direct client uploads are a common Firebase pattern when file permissions align cleanly with authenticated user ownership. This keeps the mobile app fast and avoids unnecessary proxying for simple file workflows.',
      'The storage path convention should still be deliberate so it remains governable over time.',
    ],
    code:
      `import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const avatarRef = ref(storage, ` +
      '`avatars/${user.uid}/profile.png`' +
      `)
await uploadBytes(avatarRef, file)
const url = await getDownloadURL(avatarRef)
console.log(url)`,
    notes: [
      'Storage Rules should match the ownership semantics of the upload path.',
      'File naming and overwrite policy should be intentional.',
      'Uploads belong directly in the client only when the trust boundary allows it.',
    ],
  },
  {
    id: 'examples-function',
    title: 'Call a Cloud Function for Privileged Work',
    description: [
      'Some operations should not run directly from the mobile client, even if the client is authenticated. In those cases a Cloud Function can hold privileged logic or cross-system orchestration behind a trusted server boundary.',
      'This is often the right place for payment coordination, moderation, or other sensitive operations.',
    ],
    code: `import { getFunctions, httpsCallable } from 'firebase/functions'

const functions = getFunctions()
const createCheckout = httpsCallable(functions, 'createCheckoutSession')

const result = await createCheckout({ plan: 'pro' })
console.log(result.data)`,
    notes: [
      'Privileged operations usually belong behind trusted server logic.',
      'Cloud Functions are a boundary tool, not only a convenience tool.',
      'The client should pass intent, not unrestricted authority.',
    ],
  },
  {
    id: 'examples-rules',
    title: 'Protect a User-Owned Document with Security Rules',
    description: [
      'Direct client access is safe only if the authorization layer is explicit. This example shows the basic pattern for user-owned records in Firestore Rules.',
      'Rules should be treated as part of the feature design, not added after the app already ships.',
    ],
    code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /profiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`,
    notes: [
      'Rules are the gatekeeper for direct client database access.',
      'The authorization model should align with document identity and path design.',
      'Strong Firebase apps treat rules as first-class architecture.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-platform',
    title: 'Platform Terms',
    terms: [
      {
        term: 'Firebase',
        definition:
          'Google app-development platform combining backend services, app operations tooling, and client SDK workflows for mobile and web teams.',
      },
      {
        term: 'Cloud Firestore',
        definition:
          'Firebase document database organized around collections and documents with realtime listeners and offline persistence.',
      },
      {
        term: 'Realtime Database',
        definition:
          'Firebase JSON-tree database optimized for synchronized low-latency application state.',
      },
      {
        term: 'Firebase Authentication',
        definition:
          'Managed identity service for user sign-in, provider integration, tokens, and session-aware access across Firebase products.',
      },
      {
        term: 'Cloud Storage for Firebase',
        definition:
          'Managed object storage integrated with Firebase auth and rules-based access control.',
      },
      {
        term: 'Cloud Functions for Firebase',
        definition:
          'Serverless execution environment for HTTP endpoints, triggers, and privileged backend extensions.',
      },
    ],
  },
  {
    id: 'glossary-security',
    title: 'Security and Delivery Terms',
    terms: [
      {
        term: 'Security Rules',
        definition:
          'Declarative authorization rules that control access to Firestore, Realtime Database, and Storage resources.',
      },
      {
        term: 'App Check',
        definition:
          'Firebase protection layer that helps verify requests are coming from real app or device environments.',
      },
      {
        term: 'Document listener',
        definition:
          'A realtime subscription that updates the client when a Firestore document or query result changes.',
      },
      {
        term: 'Denormalization',
        definition:
          'The practice of duplicating or reshaping data to fit document or path-based access patterns more efficiently.',
      },
      {
        term: 'Remote Config',
        definition:
          'Firebase service for remotely changing app configuration, flags, and experiments without forcing a new app release.',
      },
      {
        term: 'FCM',
        definition:
          'Firebase Cloud Messaging, the push and messaging service used for mobile notifications and related delivery workflows.',
      },
    ],
  },
  {
    id: 'glossary-ops',
    title: 'Operations Terms',
    terms: [
      {
        term: 'Crashlytics',
        definition:
          'Firebase crash-reporting service used to track runtime failures, impact, and release health.',
      },
      {
        term: 'Firebase Analytics',
        definition:
          'Usage and event analytics service integrated into the broader Firebase mobile-app ecosystem.',
      },
      {
        term: 'Cold start',
        definition:
          'The startup delay for serverless logic such as Cloud Functions before code is ready to handle a request.',
      },
      {
        term: 'Listener scope',
        definition:
          'The specific query or document range a realtime subscription observes, which affects data movement and cost.',
      },
      {
        term: 'Read amplification',
        definition:
          'A workload pattern where the app performs more reads than the product actually needs because of poor query or listener design.',
      },
      {
        term: 'Vendor lock-in',
        definition:
          'The architectural cost of depending heavily on Firebase-specific services, rules, and data models.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: glossarySections.map((section) => ({ id: section.id, label: section.title })),
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="firebase-mobile-help98-section">
      <h2 className="firebase-mobile-help98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {!isLast ? <hr className="firebase-mobile-help98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="firebase-mobile-help98-section">
      <h2 className="firebase-mobile-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="firebase-mobile-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="firebase-mobile-help98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="firebase-mobile-help98-section">
      <h2 className="firebase-mobile-help98-heading">{section.title}</h2>
      <dl className="firebase-mobile-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="firebase-mobile-help98-divider" /> : null}
    </section>
  )
}

export default function FirebaseForMobilePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Firebase For Mobile Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Firebase For Mobile Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">{PAGE_TITLE}</h1>
      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <hr className="bin98-divider" />

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderContentSection(section, index === bigPictureSections.length - 1),
          )
        : null}

      {activeTab === 'core-concepts'
        ? coreConceptSections.map((section, index) =>
            renderContentSection(section, index === coreConceptSections.length - 1),
          )
        : null}

      {activeTab === 'examples'
        ? exampleSections.map((section, index) =>
            renderExampleSection(section, index === exampleSections.length - 1),
          )
        : null}

      {activeTab === 'glossary'
        ? glossarySections.map((section, index) =>
            renderGlossarySection(section, index === glossarySections.length - 1),
          )
        : null}
    </TopicPageShell>
  )
}
