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

const PAGE_TITLE = 'Supabase for Mobile'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Supabase for Mobile means using Supabase as the backend platform behind a mobile app, typically for authentication, PostgreSQL-backed data access, storage, realtime subscriptions, edge functions, and associated operational services such as row-level security, policies, and API generation. The mobile app usually talks to Supabase through an SDK over HTTPS or realtime channels rather than through a large custom backend for every simple feature.',
  'The right mental model is not just Firebase alternative. Supabase is a Postgres-centered backend platform with generated APIs, auth, storage, and realtime layered around that database foundation. On mobile, that matters because schema design, row-level security, token handling, offline behavior, and sync strategy become first-class engineering concerns rather than details hidden behind a purely client-side SDK abstraction.',
  'This page focuses on Supabase in practical mobile engineering. It covers where Supabase fits in app architecture, auth and session handling, Postgres and RLS, storage, realtime, edge functions, offline and synchronization tradeoffs, SDK usage patterns, deployment and operations, examples, and the terms that matter when a mobile team is building against Supabase in production.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Supabase is a backend platform built around PostgreSQL, automatically exposed APIs, authentication, storage, realtime capabilities, and edge-function-style server logic. In a mobile context, it often serves as the primary backend for user accounts, app data, uploads, collaborative features, and moderate server-side workflows that do not justify a fully bespoke backend from day one.',
      'Its value for mobile teams comes from compressing infrastructure setup. Instead of separately standing up a database, auth system, REST surface, realtime service, and file storage, a team can begin with one integrated platform. That accelerates delivery, but it also means schema design and security policy design need to be taken seriously from the start.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why It Matters on Mobile',
    paragraphs: [
      'Supabase matters because many mobile products need a practical middle ground between trivial backendless prototypes and a fully custom service platform. Apps often need sign-in, user-scoped relational data, uploads, lightweight server logic, and sometimes collaborative or live-updating behavior. Supabase can provide those capabilities with less setup than building each subsystem separately.',
      'It also matters because mobile apps operate under real constraints: intermittent connectivity, app-store release latency, device storage limits, and user expectations of immediate responsiveness. A backend platform for mobile therefore has to be evaluated by how well it supports safe client access, caching, retries, and offline-aware product behavior, not only by raw feature count.',
    ],
    bullets: [
      'Strong fit for auth-aware relational mobile apps.',
      'Reduces backend bootstrapping time for small and mid-sized teams.',
      'Keeps SQL and database modeling visible instead of hiding them.',
      'Makes security policy design central from the beginning.',
    ],
  },
  {
    id: 'bp-what-it-is-not',
    title: 'What It Is Not',
    paragraphs: [
      'Supabase is not a reason to move every backend rule into the mobile client. Even though the client can access database-backed APIs directly, privileged actions, billing-sensitive workflows, admin operations, and anti-abuse logic still often belong in trusted server-side code or carefully guarded edge functions.',
      'It is also not an automatic offline-sync engine. You can build strong offline-capable apps on top of Supabase, but the platform does not itself solve local queues, conflict resolution, merge policy, or cache invalidation in the way a dedicated offline-first sync system might. Those remain application responsibilities.',
    ],
    bullets: [
      'Not a substitute for backend trust boundaries.',
      'Not an excuse to expose privileged workflows directly to clients.',
      'Not a turnkey offline sync system.',
      'Not inherently simple just because onboarding is fast.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where It Fits Best',
    paragraphs: [
      'Supabase fits best when the app has auth, structured relational data, file uploads, moderate server logic, and possibly collaborative or live-updating features, but the team still wants a fast path to production. It is especially attractive for internal tools, early consumer apps, SaaS companions, and apps whose domain maps naturally to tables, joins, and row-level ownership rules.',
      'It is less ideal when the product needs deep custom backend orchestration, highly specialized compliance boundaries, or an offline model so custom that the sync engine dominates the architecture. In those cases Supabase may still be part of the stack, but it is not necessarily the whole answer.',
    ],
  },
  {
    id: 'bp-mobile-decision-frame',
    title: 'Mobile Decision Frame',
    paragraphs: [
      'The useful architectural questions are: should the client talk directly to database-backed APIs, what should RLS enforce, what data needs local caching, what offline behavior does the product actually promise, and which workflows require trusted server execution rather than direct client mutation. Those are the real design boundaries in a mobile Supabase app.',
      'Teams that answer those questions early usually have a good experience. Teams that treat Supabase as magic backend infrastructure often run into predictable issues around policy gaps, stale local state, sync conflicts, or blurred trust boundaries.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Supabase for mobile is best understood as a Postgres-first backend platform that can power real mobile apps quickly if the team designs schema, security policies, session flow, and client sync behavior deliberately.',
      'It is strongest when the product benefits from relational data, auth-aware access rules, and fast backend delivery. It is weakest when teams assume that generated APIs remove the need for backend architecture.',
    ],
    bullets: [
      'Think Postgres plus policies, not just SDK convenience.',
      'RLS and schema design are central to correctness.',
      'Offline behavior still requires explicit engineering.',
      'Fast setup does not remove long-term architecture choices.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-postgres-model',
    title: 'Postgres as the Center of the System',
    paragraphs: [
      'Supabase starts from PostgreSQL. That means tables, rows, indexes, views, functions, foreign keys, transactions, and SQL all remain visible and important. For mobile teams, this is a major architectural difference from platforms that hide their database model behind documents or key-value abstractions.',
      'This matters because data shape influences nearly everything else: authorization, caching, realtime subscriptions, storage metadata, and edge-function behavior. A team that is comfortable with relational modeling often finds Supabase easier to reason about over time because the backend remains closer to ordinary database engineering.',
    ],
    bullets: [
      'Schema design is a first-class responsibility.',
      'Relational integrity remains available to the app team.',
      'SQL stays part of the engineering vocabulary.',
      'The database is visible, not incidental.',
    ],
  },
  {
    id: 'core-auth-sessions',
    title: 'Authentication, Sessions, and Mobile Identity',
    paragraphs: [
      'Supabase Auth provides user identity with JWT-backed sessions, common login methods, and mobile-friendly SDK support. On mobile, this usually means the app authenticates the user, stores or refreshes session information safely, and then accesses Postgres-backed APIs under that authenticated context.',
      'The important point is that auth is tied directly into authorization. Identity does not stop at sign-in. It flows into database policies and determines what rows or storage objects the user can access. That makes mobile session handling and token refresh behavior operationally important rather than purely cosmetic.',
    ],
  },
  {
    id: 'core-rls',
    title: 'Row Level Security and Policy Design',
    paragraphs: [
      'Row Level Security is one of the central reasons teams choose Supabase. Instead of relying entirely on custom application-server guards, authorization can be enforced directly in the database. Policies determine which authenticated or anonymous roles can read, insert, update, or delete which rows.',
      'This is powerful because direct client access becomes safer when the database itself enforces access rules. It is also risky if policies are written casually. A missing or overly broad policy can expose data just as easily as a missing API authorization check in a traditional backend.',
    ],
    bullets: [
      'Enable RLS on exposed tables intentionally.',
      'Treat policies as part of application architecture.',
      'Test policy behavior with realistic user roles and states.',
      'Do not confuse successful queries with correct authorization.',
    ],
  },
  {
    id: 'core-generated-apis',
    title: 'Generated APIs and Client Access',
    paragraphs: [
      'Supabase exposes database-backed APIs and SDK workflows that let mobile clients query and mutate data without writing a custom CRUD API for every table. That can accelerate development significantly when the app data model is straightforward and the RLS design is strong.',
      'The tradeoff is that the database surface becomes part of the app contract. Teams need discipline around migrations, column naming, views, and public exposure. Just because an API is generated does not mean its public behavior is cost-free to evolve once the mobile app depends on it.',
    ],
  },
  {
    id: 'core-storage',
    title: 'Storage and File Access',
    paragraphs: [
      'Supabase Storage supports uploads, downloads, buckets, object metadata, and related access patterns with permissions linked back to the broader auth and policy model. For mobile apps that need avatars, attachments, media, or user-generated content, this provides a coherent path for storing files without building a separate file service first.',
      'The important design question is ownership. Buckets, paths, and access policies should reflect real product boundaries. If storage layout is improvised, the app ends up with confusing permission behavior and difficult cleanup rules later.',
    ],
  },
  {
    id: 'core-realtime',
    title: 'Realtime, Presence, and Live Features',
    paragraphs: [
      'Supabase Realtime can stream Postgres changes and support other live communication patterns such as broadcast or presence. For mobile teams this is useful in chat, collaboration, dashboards, live status views, and other features where the app benefits from timely updates without constant polling.',
      'The key nuance is that realtime sits on top of a relational backend rather than replacing it. Subscription design, filtering, authorization pressure, and event ordering still matter. A naive live-update strategy can create more load or more client complexity than the product actually needs.',
    ],
    bullets: [
      'Use realtime where the product truly benefits from freshness.',
      'Keep channel scope and filters as narrow as practical.',
      'Treat live updates as part of data architecture, not a UI flourish.',
      'Measure whether subscriptions actually outperform simpler polling for the use case.',
    ],
  },
  {
    id: 'core-edge-functions',
    title: 'Edge Functions and Trusted Server Logic',
    paragraphs: [
      'Edge Functions exist for workflows that should not run directly in the client or directly as raw table operations. This includes webhook handling, payment coordination, moderation, third-party API calls, admin actions, and privileged orchestration that depends on secrets or elevated trust.',
      'In a mobile architecture, this boundary is important. If the product needs business logic that should not be expressible as a direct client mutation, that is a signal the workflow belongs in a trusted function or service rather than solely in the app SDK code.',
    ],
  },
  {
    id: 'core-offline-sync',
    title: 'Offline Caching and Sync Tradeoffs',
    paragraphs: [
      'Supabase can support apps with local persistence and retry logic, but the team must usually build or choose the offline strategy itself. That may include local databases, stale-while-revalidate fetches, mutation queues, conflict markers, and explicit resync paths when connectivity returns.',
      'This is a major design boundary for mobile teams. If the product only needs transient caching, Supabase is often straightforward. If the product promises seamless offline authoring with strong conflict handling, the offline architecture may become as important as the backend platform itself.',
    ],
  },
  {
    id: 'core-sdk-usage',
    title: 'SDK Boundaries and App Architecture',
    paragraphs: [
      'The Supabase SDK should usually live behind feature or repository boundaries rather than being called arbitrarily from every screen. This helps keep network behavior, auth coupling, and error translation explicit. Strong mobile architecture still matters even when the backend platform is convenient.',
      'The practical goal is to stop backend access patterns from bleeding directly into presentation code. A mobile team should still be able to reason about domain models, feature state, and retry behavior without every view needing to understand raw backend details.',
    ],
    bullets: [
      'Keep SDK usage behind coherent feature or data-service boundaries.',
      'Translate backend concerns into app-friendly domain models.',
      'Avoid scattering direct table queries across the UI layer.',
      'Convenience should not become architectural leakage.',
    ],
  },
  {
    id: 'core-ops',
    title: 'Operations, Migrations, and Production Discipline',
    paragraphs: [
      'Supabase projects still need production discipline: schema migrations, environment separation, backup awareness, incident handling, key rotation, and monitoring of query behavior or policy correctness. A managed platform reduces setup burden, but it does not eliminate operations.',
      'This matters more on mobile because client releases can lag behind backend changes. Schema evolution and API-surface evolution should therefore be deliberate. If the backend changes too casually, older mobile clients may break in ways that are slow to recover from.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-auth',
    title: 'Get the Current Authenticated User',
    description: [
      'A common mobile workflow is checking the current authenticated user and then using that identity to scope the rest of the app. In Supabase, that typically means asking the auth layer for the user and then using RLS-backed queries under that session.',
      'The important point is that identity is not only for the UI. It drives data access rules throughout the backend.',
    ],
    code: `const {
  data: { user },
  error,
} = await supabase.auth.getUser()

if (user) {
  console.log(user.id)
}`,
    notes: [
      'Session state should be treated as app state, not just as a one-off auth event.',
      'Authenticated identity often maps directly into row ownership policies.',
      'Refresh and restoration behavior matter on mobile cold starts.',
    ],
  },
  {
    id: 'examples-rls-query',
    title: 'Query a User-Owned Table with RLS',
    description: [
      'A common Supabase pattern is querying a table directly from the client while relying on RLS to make the access safe. This works well when the table design and policies match the product ownership model clearly.',
      'The query is simple, but the security story depends on the policy layer underneath it.',
    ],
    code: `const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single()

console.log(data, error)`,
    notes: [
      'The query shape is straightforward because authorization is enforced at the database layer.',
      'RLS should be verified independently, not assumed from app behavior.',
      'Direct client queries work best when ownership semantics are explicit.',
    ],
  },
  {
    id: 'examples-realtime',
    title: 'Subscribe to Postgres Changes',
    description: [
      'Realtime subscriptions are useful when the app truly benefits from live updates. This example shows the shape of a channel listening for changes on a filtered table.',
      'In production, the team should still think about channel lifetime, filtering, and whether the feature really needs push-style updates.',
    ],
    code:
      `const channel = supabase
  .channel('room-messages')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'messages', filter: ` +
      '`room_id=eq.${roomId}`' +
      ` },
    (payload) => {
      console.log(payload)
    }
  )
  .subscribe()`,
    notes: [
      'Keep subscriptions scoped narrowly so clients do not watch more than necessary.',
      'Realtime should support product value, not just technical novelty.',
      'The app still needs local-state logic for reconciliation and rendering.',
    ],
  },
  {
    id: 'examples-storage',
    title: 'Upload a User Avatar to Supabase Storage',
    description: [
      'Storage uploads are a typical mobile use case. The upload path usually reflects ownership rules, and bucket policy should align with the product access model rather than being decided ad hoc.',
      'This example shows the shape of an authenticated upload.',
    ],
    code:
      `const path = ` +
      '`${user.id}/profile.png`' +
      `

const { error } = await supabase.storage
  .from('avatars')
  .upload(path, file, { upsert: true })

console.log(error)`,
    notes: [
      'Bucket and path design should match real product ownership boundaries.',
      'Storage policy should be reviewed alongside table policy design.',
      'Uploads are simple only when the trust model is simple.',
    ],
  },
  {
    id: 'examples-edge-function',
    title: 'Call an Edge Function for Trusted Work',
    description: [
      'Some workflows should not be represented as direct table mutations from the client. An edge function is a better place for operations that depend on secrets, elevated trust, or cross-system coordination.',
      'This example shows the client side of invoking a trusted function.',
    ],
    code: `const { data, error } = await supabase.functions.invoke('create-checkout', {
  body: { plan: 'pro' },
})

console.log(data, error)`,
    notes: [
      'Use trusted server logic when the workflow exceeds safe direct client access.',
      'Edge functions are boundary tools, not just convenience helpers.',
      'The client should send intent, not unrestricted authority.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-foundations',
    title: 'Foundational Terms',
    terms: [
      {
        term: 'Supabase',
        definition:
          'A backend platform built around PostgreSQL with integrated auth, storage, realtime, edge functions, and generated APIs.',
      },
      {
        term: 'Postgres',
        definition: 'The relational database engine at the center of every Supabase project.',
      },
      {
        term: 'RLS',
        definition:
          'Row Level Security, the Postgres mechanism used to enforce per-row authorization policies.',
      },
      {
        term: 'Supabase Auth',
        definition:
          'The authentication service that manages user identity, sessions, and JWT-backed access for Supabase projects.',
      },
      {
        term: 'Supabase Storage',
        definition:
          'The file storage system integrated with auth and policy-based access patterns in a Supabase project.',
      },
      {
        term: 'Edge Function',
        definition:
          'A Supabase server-side function used for trusted logic, integrations, and operations that should not run directly in the client.',
      },
    ],
  },
  {
    id: 'glossary-data',
    title: 'Data and Access Terms',
    terms: [
      {
        term: 'Migration',
        definition:
          'A versioned schema change that evolves the database structure over time in a controlled way.',
      },
      {
        term: 'Generated API',
        definition:
          'The database-backed API surface Supabase exposes so clients can query or mutate data without custom CRUD endpoints for every table.',
      },
      {
        term: 'Policy',
        definition:
          'A database rule that determines which rows a role can read or modify under RLS.',
      },
      {
        term: 'JWT',
        definition:
          'A token format commonly used by Supabase Auth to carry authenticated identity and claims for access decisions.',
      },
      {
        term: 'Channel',
        definition:
          'A realtime communication context used for subscriptions such as Postgres changes, broadcast, or presence.',
      },
      {
        term: 'Presence',
        definition:
          'A realtime pattern for tracking connected-user state such as who is currently online or active.',
      },
    ],
  },
  {
    id: 'glossary-mobile',
    title: 'Mobile Architecture Terms',
    terms: [
      {
        term: 'Offline queue',
        definition:
          'A local mechanism for storing intended mutations until the device regains connectivity.',
      },
      {
        term: 'Conflict resolution',
        definition:
          'The application logic that decides what happens when local and remote changes disagree after reconnect or concurrent edits.',
      },
      {
        term: 'Trust boundary',
        definition:
          'The line between what the mobile client is allowed to do directly and what must be handled by trusted backend logic.',
      },
      {
        term: 'Repository boundary',
        definition:
          'An application-layer abstraction that prevents raw backend SDK calls from spreading throughout the UI codebase.',
      },
      {
        term: 'Realtime subscription',
        definition:
          'An ongoing client connection that receives updates as relevant backend changes occur.',
      },
      {
        term: 'Schema drift',
        definition:
          'The divergence between the intended backend schema and the actual schema or client assumptions over time.',
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
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
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
      {!isLast ? <hr className="bin98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="bin98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="bin98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      <dl className="bin98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="bin98-divider" /> : null}
    </section>
  )
}

export default function SupabaseForMobilePage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: PAGE_TITLE,
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title={PAGE_TITLE}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
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
