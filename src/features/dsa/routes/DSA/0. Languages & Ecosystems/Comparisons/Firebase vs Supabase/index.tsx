import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type DocSection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

type ExampleItem = {
  id: string
  title: string
  summary: string
  firebaseCode: string
  supabaseCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'Firebase vs Supabase'
const pageSubtitle =
  'Comparing Google Firebase as an integrated app platform with Supabase as a Postgres-first backend platform.'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const bigPictureSections: DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Firebase and Supabase are often grouped together because both help teams ship web and mobile backends quickly, but they do not begin from the same architectural center. Firebase is a broad Google app-development platform with client SDKs and managed services for authentication, databases, storage, hosting, functions, messaging, analytics, crash reporting, and related product tooling. Supabase is a backend platform built around PostgreSQL, with integrated authentication, row-level security, storage, realtime features, edge functions, and auto-generated APIs.',
      'A useful shorthand is this: Firebase is usually strongest when a team wants an integrated application platform with tight client SDK workflows and a broad set of adjacent app services, while Supabase is usually strongest when a team wants a relational database at the center of the system and wants auth, storage, realtime, and APIs to be built around that Postgres core.',
      'That means the real question is not Which backend service is more modern. The real question is what kind of system you want to reason about. If your team wants document-first or JSON-tree-first managed backend services with a very mature client-driven mobile and web workflow and a larger surrounding product suite, Firebase is often the natural fit. If your team wants SQL, explicit schema design, Postgres extensions, RLS, and an architecture that feels closer to a normal database-backed application stack, Supabase is often the better fit.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'Firebase historically grew around developer productivity for mobile and web apps through managed backend services that clients can talk to directly. In classic Firebase architecture, the center of gravity is often Cloud Firestore, Realtime Database, Authentication, Cloud Storage, Cloud Functions, and client SDKs that make those services feel native inside the app. Security Rules and App Check reinforce that model by protecting direct client access.',
      'Supabase grew around the idea that PostgreSQL should remain the source of truth, not be hidden behind a proprietary data abstraction. The platform gives every project a Postgres database and layers Auth, Storage, Realtime, Edge Functions, and auto-generated APIs on top of it. Authorization is deeply tied to Postgres Row Level Security, and the platform is intentionally closer to inspectable database primitives than to a fully proprietary backend abstraction.',
      'There is an important modern nuance: Firebase now also offers Data Connect, which gives Firebase a relational option backed by Cloud SQL for PostgreSQL with GraphQL-based schema and operation management. That narrows one historical gap. But in practice, most teams comparing Firebase and Supabase are still usually comparing classic Firebase backend patterns such as Firestore or Realtime Database against Supabase Postgres-centric architecture.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'Firebase is strongest for products that want fast client integration, direct SDK access from web or mobile apps, managed non-relational data services, polished sign-in flows, offline-friendly app behavior, and a broader surrounding suite of Google-managed app products. It is particularly attractive for teams shipping consumer apps, prototypes, mobile-heavy products, and products that benefit from combining data services with analytics, messaging, remote config, crash reporting, hosting, and other app-lifecycle tooling in one ecosystem.',
      'Supabase is strongest for products that want PostgreSQL as the operational database, SQL as the shared engineering language, ordinary relational modeling, explicit schema migrations, and strong database-native authorization via RLS. It is especially attractive for SaaS backends, dashboards, internal tools, content and commerce systems, apps that need joins and relational integrity, and teams that care about portability, inspectability, and closer alignment with mainstream SQL workflows.',
      'If the core question is Which platform better supports direct client-driven app development with a broad app-service suite, Firebase often wins. If the core question is Which platform better supports a relational backend that still feels like a real Postgres system instead of a proprietary managed data model, Supabase often wins.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose Firebase when direct client SDK workflows, offline-friendly app patterns, and the broader Google app platform are major sources of leverage.',
      'Choose Supabase when PostgreSQL, SQL joins, migrations, extensions, and Row Level Security are central to how your team wants to build.',
      'Choose Firebase when your architecture is comfortable with Firestore documents, Realtime Database JSON trees, Security Rules, and event-driven serverless glue.',
      'Choose Supabase when your architecture should look and feel like a relational application backend with auth, storage, and realtime layered around Postgres.',
      'If long-term portability and self-hosting are strategic requirements, Supabase is much closer to that model than Firebase.',
      'If the debate is really client-first app platform versus Postgres-first backend platform, that is the true decision boundary.',
    ],
  },
]

const mentalModels = [
  {
    title: 'Firebase is a platform family, not just a database',
    detail:
      'The data layer is only part of the story. Auth, storage, functions, analytics, messaging, hosting, and app quality tools are part of the Firebase value proposition.',
  },
  {
    title: 'Supabase starts from Postgres',
    detail:
      'Auth, APIs, storage metadata, and authorization are designed around a real relational database rather than around a separate proprietary data model.',
  },
  {
    title: 'Classic Firebase is usually client-to-service architecture',
    detail:
      'The client often talks directly to Firestore, Realtime Database, Auth, or Storage, with Security Rules and App Check protecting that access pattern.',
  },
  {
    title: 'Supabase is often database-first even when clients connect directly',
    detail:
      'Clients can use auto-generated APIs from the browser, but the system still revolves around tables, SQL, policies, roles, and JWT-backed RLS.',
  },
  {
    title: 'Data model drives almost everything',
    detail:
      'If your team wants documents or synchronized JSON state, Firebase feels natural. If your team wants joins, constraints, and relational querying, Supabase feels natural.',
  },
  {
    title: 'Authorization is expressed in different languages',
    detail:
      'Firebase uses Security Rules outside app code. Supabase commonly uses Postgres privileges and RLS policies inside the database.',
  },
  {
    title: 'Realtime does not mean the same thing on both platforms',
    detail:
      'Firebase treats realtime data sync as a core historical product identity. Supabase offers realtime through Postgres Changes, Broadcast, and Presence on top of a Postgres platform.',
  },
  {
    title: 'Modern Firebase has a relational escape hatch',
    detail:
      'Data Connect matters because it gives Firebase a managed PostgreSQL path, but it does not erase the fact that many Firebase projects still use Firestore or Realtime Database as the main app database.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-platform-shape',
    title: 'Overall Platform Shape',
    paragraphs: [
      'Firebase is a broad managed application platform. The platform identity includes Cloud Firestore, Realtime Database, Authentication, Cloud Storage, Cloud Functions, Hosting, App Check, and a larger app lifecycle and growth surface such as analytics, messaging, crash reporting, remote config, app distribution, and other Google-backed tooling. That breadth matters because it means choosing Firebase is often choosing an ecosystem, not just one backend product.',
      'Supabase is narrower in the best possible sense. It gives each project a dedicated Postgres database, auto-generated APIs, Auth, Edge Functions, Realtime, and Storage, with product features layered around the database rather than spread across a large app platform portfolio. The surrounding services are still substantial, but they feel like backend infrastructure features orbiting Postgres rather than separate product families.',
      'The practical difference is that Firebase often behaves like an integrated app platform where backend services and app experience tooling coexist, while Supabase behaves like a developer backend platform where the database model remains central and visible.',
    ],
  },
  {
    id: 'core-data-model',
    title: 'Data Model and Query Shape',
    paragraphs: [
      'Classic Firebase gives you two main managed non-relational data models. Cloud Firestore uses collections and documents in a schemaless document database with realtime listeners and offline persistence. Realtime Database stores JSON in a synchronized tree model optimized for fast client sync. Both are productive, but they pressure application design toward denormalized records, hierarchical access paths, and query models that are more constrained than relational SQL.',
      'Supabase gives you PostgreSQL. That means tables, rows, joins, foreign keys, indexes, transactions, views, functions, and the broader ecosystem of Postgres features and extensions. The database model is explicit rather than schemaless by default. You evolve it with migrations and SQL rather than by gradually shaping documents in application code.',
      'This is one of the clearest decision boundaries. If your team wants the database to behave like a normal relational system of record, Supabase starts from the right model. If your team prefers a client-driven document or JSON synchronization workflow, Firebase often feels faster and more natural.',
    ],
  },
  {
    id: 'core-relational-nuance',
    title: 'Firebase Data Connect and the Relational Nuance',
    paragraphs: [
      'Any serious Firebase versus Supabase comparison now needs to account for Firebase Data Connect. Data Connect is a relational database service for web and mobile apps backed by Cloud SQL for PostgreSQL. It lets teams define schema plus queries and mutations, and then generates secure endpoints and type-safe SDKs. In other words, Firebase is no longer exclusively a document-database story.',
      'However, Data Connect still represents a different developer experience from Supabase. Data Connect puts managed schema, query, and mutation definitions behind a GraphQL-based workflow with Firebase integration. Supabase exposes a more ordinary Postgres-centered world where SQL, migrations, PostgREST, RLS, and the database itself stay closer to the surface.',
      'So the comparison is no longer Firebase equals NoSQL and Supabase equals SQL. The more accurate statement is that Supabase is Postgres-first by default, while Firebase historically centered document and JSON backends but now also offers a relational path for teams that want to stay inside the Firebase ecosystem.',
    ],
  },
  {
    id: 'core-auth',
    title: 'Authentication and User Management',
    paragraphs: [
      'Firebase Authentication is a mature identity layer with strong client SDK ergonomics and broad provider support. It is often one of the easiest ways to add sign-in flows to mobile and web apps, especially if the rest of the app already lives in Firebase. It integrates cleanly with Firestore, Realtime Database, Storage Rules, and other Firebase services, which keeps the full stack feeling cohesive from the client side.',
      'Supabase Auth supports email and password, magic links, OTP, social login, phone auth through providers, and single sign-on, but it is architecturally different from Firebase Auth. Supabase Auth uses JWTs and stores auth information in the project Postgres database under a dedicated schema. That means Auth is not just an external identity layer; it is deeply integrated with database authorization workflows and can be connected to application tables through foreign keys, triggers, and policies.',
      'Firebase usually wins on polished identity-in-an-app-platform ergonomics. Supabase often wins when identity should directly feed a Postgres-native authorization model and when the team wants auth data and app data to live within one inspectable relational environment.',
    ],
  },
  {
    id: 'core-security',
    title: 'Authorization, Security Rules, and RLS',
    paragraphs: [
      'Firebase Security Rules are one of the defining ideas of Firebase architecture. Rules live outside the client code and determine which users can read or write which documents, paths, or files. Firestore, Realtime Database, and Storage each have their own rule behavior and language details. This model is powerful because it protects direct client access without forcing you to put a traditional application server in front of everything.',
      'Firebase also offers App Check as an additional protection layer. App Check helps protect backend resources from abuse by attesting that requests come from authentic apps or attested devices. That is a meaningful distinction from user authentication. Authentication answers Who is the user. App Check helps answer Is this request really coming from your app or device environment.',
      'Supabase secures data differently. The platform expects you to lean on Postgres Row Level Security and SQL policies. The data APIs are designed to work with RLS, and the docs explicitly recommend enabling RLS on exposed tables, views, and functions. This model feels more database-native than Firebase Rules. It also means authorization logic is often written in SQL terms, which can be extremely expressive for relational access control.',
      'If your team is comfortable with declarative path- and document-based rules attached to direct client access, Firebase feels natural. If your team wants authorization to be enforced directly by Postgres with policies the database itself understands, Supabase feels stronger and more transparent.',
    ],
  },
  {
    id: 'core-realtime',
    title: 'Realtime and Collaboration Patterns',
    paragraphs: [
      'Realtime behavior is part of Firebase historical identity. Realtime Database is explicitly designed to store and sync data in realtime, including offline behavior. Firestore also supports snapshot listeners that immediately deliver local cache state and then continue streaming updates as documents change. For many product teams, this makes Firebase feel like the default choice for collaborative or live-updating app experiences.',
      'Supabase Realtime offers a different toolkit: Postgres Changes, Broadcast, and Presence. That is powerful because it covers several realtime patterns rather than only database subscriptions. But the engineering tradeoffs are different. Supabase documents note that Postgres Changes are processed on a single thread to maintain change order, and very large numbers of subscribers can create database authorization pressure. In other words, Supabase realtime is strong, but it is still being reasoned about as a system layered on a relational database and authorization model.',
      'The practical distinction is that Firebase often feels like realtime sync was built into the soul of the platform, while Supabase offers very capable realtime features that still inherit some of the realities of Postgres, replication, and policy checks. That does not make one universally better. It changes the kinds of workloads that feel effortless.',
    ],
  },
  {
    id: 'core-offline',
    title: 'Offline and Client-First Behavior',
    paragraphs: [
      'Firestore supports offline persistence, caching data the app is actively using so reads, writes, listeners, and queries can continue while the device is offline. When the device reconnects, local changes are synchronized back, with last-write-wins semantics for multiple changes to the same document. Realtime Database also emphasizes offline caching and automatic synchronization when connectivity returns.',
      'Supabase is not primarily sold as an offline-first sync platform in the same way. You can absolutely build offline-capable apps on top of Supabase by adding local caching, queueing writes, or using community libraries and your own sync strategy, but offline sync is not the native product identity. The platform begins from Postgres and server-backed APIs, not from a client cache model that has been central since the platform earliest products.',
      'This difference matters disproportionately for mobile-heavy products and apps with intermittent connectivity. If offline-first UX is a first-order architectural constraint rather than a nice-to-have, Firebase often has the more mature default story.',
    ],
  },
  {
    id: 'core-storage',
    title: 'Storage and File Workflows',
    paragraphs: [
      'Firebase Cloud Storage is tightly integrated into the Firebase security model. It works with Firebase Authentication and Storage Rules, and it fits the same direct-client-access pattern seen elsewhere in the platform. The upside is cohesive client integration. The downside is that the file authorization model is yet another Firebase-specific rule system your team needs to learn well.',
      'Supabase Storage is deeply tied back to Postgres. Storage metadata lives in a dedicated storage schema, access control is driven with RLS policies, and the product supports S3-compatible access, RESTful APIs, TUS resumable uploads, CDN delivery, and image transformations. This makes storage feel less like a standalone blob service with a separate rules language and more like a storage system whose metadata and permissions are connected to the same relational authorization model as the rest of the backend.',
      'Firebase is often simpler when the app already lives entirely in Firebase and wants direct SDK flows. Supabase is often more coherent when your app already thinks in tables, policies, and database-backed authorization for everything else.',
    ],
  },
  {
    id: 'core-compute',
    title: 'Server-Side Compute and Backend Logic',
    paragraphs: [
      'Firebase Cloud Functions gives teams a familiar event-driven serverless extension model, and second generation functions are now powered by Cloud Run and Eventarc. That matters because modern Cloud Functions gives more control over performance and scalability than the older first-generation model. Firebase also offers many trigger surfaces, which makes it attractive for glue code that reacts to changes in auth, storage, Firestore, or other platform events.',
      'Supabase Edge Functions are globally distributed TypeScript functions running on a Deno-compatible runtime. They are well suited for low-latency HTTP endpoints, webhooks, lightweight server-side orchestration, and integrating with the rest of the Supabase platform. The execution model feels closer to edge and serverless HTTP endpoints than to a long list of provider-managed event triggers across a broad app platform.',
      'So the difference is not merely Google functions versus Deno functions. Firebase functions feel like event-driven glue inside a larger managed app ecosystem. Supabase Edge Functions feel like server-side endpoints living next to Postgres, Auth, Storage, and Realtime, with global distribution and a simpler platform surface.',
    ],
  },
  {
    id: 'core-local-dev',
    title: 'Local Development, Testing, and Tooling',
    paragraphs: [
      'Firebase has a strong Local Emulator Suite story. The Emulator Suite can emulate Firestore, Realtime Database, Auth, Storage, Functions, Hosting, and related services for testing and integration work without touching production data. It is explicitly meant for local development and CI-style workflows, not for self-hosting Firebase in production.',
      'Supabase local development is more platform-like. The Supabase CLI can bring up a local stack with Postgres, Studio, Auth, Storage, and other services using containerized tooling. Local development is closely tied to migrations, SQL workflows, and environment management. That makes it feel like a normal infrastructure-backed development environment rather than a simulation of a proprietary hosted service.',
      'Both platforms support productive local iteration. Firebase local tooling is excellent when you want high-fidelity emulation of managed services. Supabase local tooling is excellent when you want your local environment to behave like a controllable backend stack built around migrations and a real database.',
    ],
  },
  {
    id: 'core-apis',
    title: 'APIs, SDKs, and How Clients Talk to the Backend',
    paragraphs: [
      'Firebase is optimized around official SDK usage. The SDKs are a major part of the platform design, especially for mobile. Clients often talk directly to Firebase services using product-specific APIs for auth, documents, storage, and listeners. That makes the developer experience cohesive, but it also means the application surface often maps to Firebase service boundaries rather than to one ordinary API layer.',
      'Supabase auto-generates a REST API directly from your database schema through PostgREST, and that API can be used from the browser or alongside your own custom server. The platform also generates documentation from the schema, and teams commonly generate types from the database as part of their workflow. This gives Supabase an unusually direct path from schema to usable API without writing a conventional CRUD server.',
      'The tradeoff is subtle but important. Firebase SDKs feel like product-native clients for managed services. Supabase APIs feel like the database itself is being responsibly projected outward through generated interfaces. The former is more service-specific. The latter is more backend-architecture-specific.',
    ],
  },
  {
    id: 'core-pricing',
    title: 'Pricing Philosophy and Cost Shape',
    paragraphs: [
      'Firebase pricing is service-specific and usage-driven. Firestore billing is a good example: reads, writes, deletes, storage, and outbound transfer all matter. Cloud Functions, Storage, and other services each have their own cost surface. This can be excellent for starting small, but production costs can become harder to reason about when many service-specific usage patterns compound, especially for read-heavy or listener-heavy workloads.',
      'Supabase pricing is easier to reason about if you think in infrastructure terms. Paid plans combine subscription cost with usage-based dimensions such as compute, monthly active users for Auth, storage, and related overages. Each project comes with a dedicated database-backed environment rather than feeling like an unbounded mix of independently billed platform services.',
      'Neither pricing model is universally cheaper. Firebase often feels inexpensive early and variable later, especially when read amplification or fan-out patterns grow. Supabase often feels more like paying for a database-centric backend environment with clearer infrastructure boundaries. The right question is which cost model better matches your workload and what kinds of surprises you are more likely to have.',
    ],
  },
  {
    id: 'core-portability',
    title: 'Open Source, Portability, and Self-Hosting',
    paragraphs: [
      'Firebase is a managed Google platform. You can emulate parts of it locally, but the Emulator Suite is explicitly not a production self-hosted substitute. In practical terms, that means adopting Firebase usually means accepting a tighter platform dependency and a narrower path if you later decide to move away from it.',
      'Supabase is intentionally open and self-hostable. The docs explicitly position self-hosting as a fit when you need full control over data, isolated environments, or specific compliance requirements. That comes with operational responsibility, but it also means the architecture is more inspectable and the exit options are better because PostgreSQL remains central.',
      'If vendor portability, open architecture, or the possibility of self-hosting matters strategically, Supabase has the stronger story. If your team is comfortable relying on a managed Google platform and prioritizes platform convenience over backend portability, Firebase remains very attractive.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Breadth and Adjacent Product Surface',
    paragraphs: [
      'Firebase has a much broader adjacent product surface. That matters more than teams sometimes admit. Analytics, messaging, crash reporting, remote config, hosting, app distribution, and other app-quality and growth tools can materially reduce integration work when they align with product needs. Firebase is often appealing because it solves several neighboring app concerns at once, not only because of Firestore or Auth.',
      'Supabase is more backend-focused. Its strengths are database, auth, storage, realtime, edge functions, migrations, and generated APIs. That narrower focus is often beneficial because it keeps the platform opinionated around backend development rather than around all stages of the app lifecycle. But it also means teams will often pair Supabase with other tools for analytics, messaging, experimentation, crash reporting, or engagement workflows.',
      'So if the goal is one broad app platform, Firebase usually has the wider reach. If the goal is a clear backend platform that integrates well with the rest of your toolchain instead of trying to own every app concern, Supabase often feels cleaner.',
    ],
  },
  {
    id: 'core-ops',
    title: 'Performance, Scaling, and Day-2 Operations',
    paragraphs: [
      'Firebase reduces a lot of infrastructure work, but it does not remove the need for system design. Firestore and Realtime Database still require careful thinking about document shape, listener patterns, query design, indexes, write hotspots, and cost. Teams sometimes mistake managed services for architecture-free systems, then discover that scale and cost depend heavily on the quality of the data model and subscription behavior.',
      'Supabase also reduces a lot of operational work, but the remaining work looks more familiar to backend engineers. You still think about indexes, SQL performance, query plans, RLS behavior, replication-related realities for realtime features, storage policies, connection patterns, and migration discipline. Because the system is Postgres-first, the operational work is often easier to reason about if your team already understands relational systems.',
      'The practical tradeoff is this: Firebase can hide more infrastructure details up front, but sometimes makes later behavior feel more platform-specific and less transparent. Supabase exposes more ordinary backend realities from the start, but rewards teams that are comfortable with database engineering and SQL operations.',
    ],
  },
  {
    id: 'core-migration',
    title: 'Migration Paths and Team Fit',
    paragraphs: [
      'Moving away from Firebase data services can be a real architectural migration, not just a hosting migration. A Firestore document model or Realtime Database JSON tree often implies client code, security rules, query assumptions, and event flows that are specific to Firebase. The migration is especially large if the app depends heavily on direct client access patterns and rules-driven authorization.',
      'Supabase offers explicit migration guides for Firebase data and related services, which reflects the fact that many teams eventually want to move from document-oriented app backends toward Postgres-backed systems. That migration can still be significant because document collections may need to be flattened or re-modeled into relational tables, but the path is at least aligned with standard database concepts once you arrive.',
      'Team culture matters here. Mobile-centric product teams that value client SDK velocity and managed-service convenience often thrive in Firebase. Full-stack and backend-heavy teams that want SQL as a shared language usually find Supabase easier to align with over the long term.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'Firebase becomes the wrong choice when a team really wanted SQL, complex relational queries, self-hosting options, or backend transparency but chose Firebase for initial speed. The failure mode is not that Firebase stops working. The failure mode is that the app keeps growing around a document model and service-specific patterns that no longer match the product complexity.',
      'Supabase becomes the wrong choice when a team really wanted a broader managed app platform with deep mobile SDK ergonomics, offline-first defaults, and a surrounding suite of app products, but instead chose a backend platform centered on Postgres. The failure mode is not that Supabase is weak. The failure mode is that the team spends time rebuilding platform conveniences that Firebase would have given them earlier.',
      'A more subtle Firebase failure mode is cost and access-pattern drift. A more subtle Supabase failure mode is underestimating how much schema, SQL, and policy discipline the team must actually own. Both are excellent platforms. Each becomes painful when adopted for the wrong reasons.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose Firebase when direct client SDK development, offline-friendly behavior, and a larger app platform are the main sources of leverage.',
      'Choose Supabase when relational modeling, SQL, Postgres extensions, and database-native authorization are the main sources of leverage.',
      'Prefer Firebase when your team is comfortable with Firestore documents or Realtime Database data flows plus Security Rules and event-driven functions.',
      'Prefer Supabase when your team wants one relational source of truth with APIs, auth, storage, and realtime features attached to it.',
      'Prefer Firebase when app-platform breadth matters more than backend portability.',
      'Prefer Supabase when openness, self-hosting potential, and transparent database primitives matter more than integrated platform breadth.',
      'If your product will likely need many joins, reporting-style queries, or strict relational integrity, Supabase is usually the safer default.',
      'If your product is mobile-first, sync-heavy, and benefits from Firebase broader client-side ecosystem, Firebase is often the more natural fit.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-profile',
    title: 'Read the Current User Profile',
    summary: 'The same task feels document-oriented in Firebase and relational in Supabase.',
    firebaseCode: `import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const auth = getAuth()
const user = auth.currentUser

if (user) {
  const profileRef = doc(db, 'profiles', user.uid)
  const snapshot = await getDoc(profileRef)
  console.log(snapshot.data())
}`,
    supabaseCode: `const {
  data: { user },
} = await supabase.auth.getUser()

if (user) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  console.log(data, error)
}`,
    explanation:
      'Firebase reads a document by path, often keyed directly by the auth user ID. Supabase reads from a relational table and commonly relies on RLS so the query can safely run from the client.',
  },
  {
    id: 'ex-realtime-chat',
    title: 'Subscribe to Realtime Messages',
    summary:
      'Both platforms support live updates, but they arrive from different architectural assumptions.',
    firebaseCode: `import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

const messagesQuery = query(
  collection(db, 'rooms', roomId, 'messages'),
  orderBy('createdAt', 'asc')
)

const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
  const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  console.log(messages)
})`,
    supabaseCode: `const channel = supabase
  .channel('room-messages')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'messages', filter: \`room_id=eq.\${roomId}\` },
    (payload) => {
      console.log(payload)
    }
  )
  .subscribe()`,
    explanation:
      'Firestore listeners are a native part of the document database experience. Supabase subscribes to database changes through Realtime on top of Postgres, which is powerful but conceptually different from a document database built around live listeners.',
  },
  {
    id: 'ex-policy',
    title: 'Authorize Access to a User-Owned Record',
    summary:
      'Firebase uses service-specific rules syntax. Supabase uses SQL policies enforced by Postgres.',
    firebaseCode: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /profiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`,
    supabaseCode: `alter table profiles enable row level security;

create policy "Users manage their own profile"
on profiles
for all
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);`,
    explanation:
      'Firebase Rules live in a platform-specific rules language. Supabase authorization often lives directly in SQL with RLS, which can feel more natural for teams already reasoning about database tables and roles.',
  },
  {
    id: 'ex-upload',
    title: 'Upload a User Avatar',
    summary:
      'Both platforms support client-side uploads, but the surrounding permission model differs.',
    firebaseCode: `import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const avatarRef = ref(storage, \`avatars/\${user.uid}/profile.png\`)
await uploadBytes(avatarRef, file)
const url = await getDownloadURL(avatarRef)`,
    supabaseCode: `const path = \`\${user.id}/profile.png\`

const { error } = await supabase.storage
  .from('avatars')
  .upload(path, file, { upsert: true })

const { data } = supabase.storage.from('avatars').getPublicUrl(path)`,
    explanation:
      'Firebase Storage permissions are typically controlled with Storage Rules. Supabase Storage permissions are typically controlled by RLS policies over storage metadata and related access roles.',
  },
  {
    id: 'ex-server-logic',
    title: 'Expose a Small Server Endpoint',
    summary:
      'Firebase Cloud Functions and Supabase Edge Functions both solve this, but with different platform identity.',
    firebaseCode: `const { onRequest } = require('firebase-functions/v2/https')

exports.health = onRequest((req, res) => {
  res.json({ ok: true, platform: 'firebase' })
})`,
    supabaseCode: `Deno.serve(() => {
  return Response.json({ ok: true, platform: 'supabase' })
})`,
    explanation:
      'Firebase uses Cloud Functions as part of a broader Google-managed event and serverless system. Supabase Edge Functions are Deno-based server-side functions distributed globally and designed to sit close to the rest of the Supabase backend platform.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'Cloud Firestore',
    definition:
      'Firebase document database built around collections, documents, listeners, and offline persistence.',
  },
  {
    term: 'Realtime Database',
    definition:
      'Firebase JSON-tree database optimized for synchronized realtime application state.',
  },
  {
    term: 'Firebase Security Rules',
    definition:
      'Declarative rules that control access to Firestore, Realtime Database, and Cloud Storage resources.',
  },
  {
    term: 'App Check',
    definition:
      'Firebase feature that helps protect backend resources from unauthorized clients through app or device attestation.',
  },
  {
    term: 'Data Connect',
    definition:
      'Firebase relational database service backed by Cloud SQL for PostgreSQL with schema, query, and mutation management.',
  },
  {
    term: 'Postgres',
    definition: 'Relational database system at the center of every Supabase project.',
  },
  {
    term: 'Row Level Security (RLS)',
    definition:
      'Postgres feature used by Supabase to enforce per-row authorization policies directly in the database.',
  },
  {
    term: 'PostgREST',
    definition: 'The thin API layer Supabase uses to auto-generate REST APIs from database schema.',
  },
  {
    term: 'Edge Function',
    definition:
      'Supabase globally distributed server-side TypeScript function running on a Deno-compatible runtime.',
  },
  {
    term: 'Presence',
    definition:
      'Supabase Realtime feature for tracking connected user state such as who is online or active.',
  },
  {
    term: 'Broadcast',
    definition: 'Supabase Realtime feature for sending low-latency messages to subscribed clients.',
  },
  {
    term: 'Schemaless',
    definition:
      'A data model where records do not require one rigid relational schema definition ahead of time.',
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-philosophy', label: 'Philosophy Difference' },
    { id: 'bp-where', label: 'Where Each Fits' },
    { id: 'bp-quick-picks', label: 'Quick Decision Guide' },
  ],
  'core-concepts': [
    { id: 'core-mental', label: 'Mental Models' },
    { id: 'core-platform-shape', label: 'Platform Shape' },
    { id: 'core-data-model', label: 'Data Model' },
    { id: 'core-relational-nuance', label: 'Data Connect Nuance' },
    { id: 'core-auth', label: 'Authentication' },
    { id: 'core-security', label: 'Authorization and Security' },
    { id: 'core-realtime', label: 'Realtime' },
    { id: 'core-offline', label: 'Offline Behavior' },
    { id: 'core-storage', label: 'Storage' },
    { id: 'core-compute', label: 'Server-Side Compute' },
    { id: 'core-local-dev', label: 'Local Development' },
    { id: 'core-apis', label: 'APIs and SDKs' },
    { id: 'core-pricing', label: 'Pricing Philosophy' },
    { id: 'core-portability', label: 'Portability and Self-Hosting' },
    { id: 'core-ecosystem', label: 'Ecosystem Breadth' },
    { id: 'core-ops', label: 'Operations and Scaling' },
    { id: 'core-migration', label: 'Migration and Team Fit' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Decision Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function FirebaseVsSupabasePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Firebase Vs Supabase Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Firebase Vs Supabase Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="bin98-subheading">{pageSubtitle}</p>
      <p>
        This page compares Firebase and Supabase as real architectural choices rather than as trendy
        backend brands. The goal is to make the decision boundaries explicit: data model, auth,
        authorization, realtime behavior, offline support, storage, functions, local development,
        pricing philosophy, portability, and the larger product ecosystem around each platform.
      </p>

      {activeTab === 'big-picture' && (
        <>
          {bigPictureSections.map((section, index) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p key={`${section.id}-p-${paragraphIndex}`}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={`${section.id}-b-${bulletIndex}`}>{bullet}</li>
                  ))}
                </ul>
              )}
              {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
            </section>
          ))}
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mental" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          {coreSections.map((section) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p key={`${section.id}-p-${paragraphIndex}`}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={`${section.id}-b-${bulletIndex}`}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </>
      )}

      {activeTab === 'examples' && (
        <>
          {examples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>{example.summary}</p>
              <h3 className="bin98-subheading">Firebase</h3>
              <div className="bin98-codebox">
                <code>{example.firebaseCode.trim()}</code>
              </div>
              <h3 className="bin98-subheading">Supabase</h3>
              <div className="bin98-codebox">
                <code>{example.supabaseCode.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </section>
          ))}
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
