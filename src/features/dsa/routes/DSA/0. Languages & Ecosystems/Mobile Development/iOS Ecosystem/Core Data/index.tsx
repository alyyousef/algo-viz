import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

const PAGE_TITLE = 'Core Data'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Core Data is Apple\'s object graph management and persistence framework. On iOS, teams use it to model structured application data, load and save that data efficiently, track changes over time, and coordinate in-memory objects with a persistent store such as SQLite. It is not just a database wrapper, and treating it as one leads to weak designs.',
  'The right mental model is that Core Data manages an object graph with lifecycle, identity, change tracking, validation, fetching, faulting, undo integration, and context-based concurrency rules. Persistence is one part of the system, but the framework is really about managing rich structured data inside an application while syncing that data to durable storage.',
  'This page focuses on Core Data in practical iOS engineering. It covers where Core Data fits in the Apple stack, the model and store architecture, contexts and concurrency, fetches and faults, migrations, background work, Swift integration patterns, examples, and the terms that matter when debugging or designing a production Core Data feature.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Core Data is Apple\'s framework for modeling, managing, and persisting object graphs. Developers define entities, attributes, and relationships in a managed object model, and Core Data handles the runtime machinery for turning those models into live objects, tracking changes, validating data, fetching records, and saving state to one or more persistent stores.',
      'Its importance on iOS is not limited to apps with large databases. It is useful whenever the app has structured local data that benefits from identity, relationship traversal, incremental fetching, and change management. That includes offline-first features, caches with relational structure, user-created content, history views, and complex local state that outgrows ad hoc JSON files or unstructured key-value storage.',
    ],
  },
  {
    id: 'bp-what-it-is-not',
    title: 'What Core Data Is Not',
    paragraphs: [
      'Core Data is not simply SQLite with nicer syntax. SQLite is often the default backing store, but Core Data sits at a higher abstraction level. It manages managed object contexts, object identity, relationships, faults, validation, and unit-of-work style saves. A team that only thinks in SQL tables misses most of the framework\'s actual behavior.',
      'It is also not automatically the right persistence tool for every iOS feature. Small preference-style data may fit UserDefaults. Ephemeral caches may be better in memory. Heavily SQL-centric analytics or cross-platform persistence layers may call for something else. Core Data is strongest when the application actually benefits from object graph management rather than needing only raw record storage.',
    ],
    bullets: [
      'Not just a database API.',
      'Not a reason to force every piece of app state into persistent storage.',
      'Not free from architectural discipline because Apple provides the framework.',
      'Not automatically better than simpler storage for small or flat data sets.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why It Matters on iOS',
    paragraphs: [
      'Core Data matters because many iOS products need local persistence with richer semantics than a flat file or preferences store. It gives Apple-platform teams first-party tooling, schema modeling, lazy loading, relationship handling, change tracking, batch operations, and integration paths into UIKit and SwiftUI workflows.',
      'It also matters because local data is often a product requirement, not merely an implementation detail. Offline access, drafts, cached feeds, editing history, sync staging, and user-generated structured content all depend on local data that remains coherent across launches and background transitions. Core Data can provide that coherence when its context and concurrency rules are respected.',
    ],
    bullets: [
      'First-party persistence framework with Apple tooling support.',
      'Good fit for relational structured local data on iOS.',
      'Supports offline, cached, and user-authored data workflows.',
      'Integrates with fetch-driven UI patterns and background processing.',
    ],
  },
  {
    id: 'bp-core-architecture',
    title: 'Core Architecture',
    paragraphs: [
      'A Core Data stack is built from a managed object model, a persistent store coordinator or NSPersistentContainer-managed equivalent, one or more persistent stores, and one or more managed object contexts. The model defines shape, the store persists data, and the context is the scratchpad that creates, fetches, tracks, and saves managed objects.',
      'That split is important because many production bugs come from confusing the responsibilities of these layers. Schema design belongs in the model. Save boundaries and object lifetimes belong in contexts. Storage mechanics belong in the persistent store setup. Keeping those boundaries clear makes Core Data much easier to debug and evolve.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Core Data Fits Best',
    paragraphs: [
      'Core Data fits best when the app has structured entities with relationships, evolving local state, repeated queries, background imports, or data that should be displayed incrementally without materializing the entire dataset manually. It is especially strong when the app benefits from Apple-native persistence patterns and the team is willing to learn the framework instead of flattening everything into improvised dictionaries.',
      'It is weaker when the domain is tiny, the data is mostly transient, the persistence needs are fundamentally not object-graph shaped, or the team will refuse to respect Core Data\'s context and threading rules. In those cases, the framework can feel heavy because the problem itself does not justify the machinery.',
    ],
    bullets: [
      'Structured local entities and relationships.',
      'Offline-first or sync-heavy app sections.',
      'Repeated queries over changing local data.',
      'Features that benefit from Apple-native persistence and tooling.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Core Data is best understood as an object graph and persistence framework, not a thin database convenience layer. It earns its complexity when the application genuinely has relational structured local data that needs identity, lifecycle, change tracking, and efficient querying.',
      'Teams succeed with Core Data when they model the domain clearly, respect context ownership and concurrency, and keep persistence concerns out of presentation code. Teams struggle when they treat managed objects as ordinary thread-free models or when they ignore save boundaries and migration planning.',
    ],
    bullets: [
      'Think in object graphs and contexts, not just rows and tables.',
      'Context ownership and concurrency discipline are central.',
      'Model quality strongly influences persistence quality.',
      'Core Data is powerful, but only when used intentionally.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-model',
    title: 'Managed Object Model',
    paragraphs: [
      'The managed object model defines the schema of the Core Data world: entities, attributes, relationships, fetched properties, constraints, and configuration. This model is the contract between the app\'s runtime objects and the persistent stores that back them.',
      'Good model design matters more than many teams realize. Naming, optionality, relationship cardinality, delete rules, uniqueness constraints, and normalization decisions all shape future migrations, fetch complexity, and data integrity. A weak model leaks pain into every fetch, save, and sync path later.',
    ],
    bullets: [
      'Entities define object types.',
      'Attributes define scalar or transformable fields.',
      'Relationships define graph connections and cardinality.',
      'Constraints and delete rules protect data integrity.',
    ],
  },
  {
    id: 'core-container-store',
    title: 'Persistent Container and Stores',
    paragraphs: [
      'Most modern iOS apps use NSPersistentContainer to assemble the Core Data stack. It loads the model, configures the persistent store coordinator, attaches stores, and provides convenience contexts such as the viewContext. This reduces boilerplate but does not remove the need to understand the underlying pieces.',
      'The persistent store is where data becomes durable. SQLite is the common default, but the store should still be treated as an implementation detail behind Core Data\'s managed object and context APIs. Debugging performance or migration issues often requires understanding the store, but day-to-day feature code should still respect the Core Data abstraction.',
    ],
    bullets: [
      'NSPersistentContainer is the standard entry point for most app stacks.',
      'The store persists data, but contexts manage object lifecycle and change tracking.',
      'Store configuration affects migration and performance behavior.',
      'Convenience APIs do not eliminate architectural responsibilities.',
    ],
  },
  {
    id: 'core-contexts',
    title: 'Managed Object Contexts',
    paragraphs: [
      'A managed object context is the unit-of-work boundary in Core Data. It tracks inserted, updated, and deleted managed objects, enforces context-local object identity, and stages changes before they are saved. Contexts are where most feature logic actually meets Core Data.',
      'This is one of the most important ideas in the framework. Objects belong to a context. Saves happen from a context. Undo and pending changes are context-based. If a team treats contexts as invisible plumbing instead of explicit ownership boundaries, subtle bugs around stale objects, threading, and unsaved changes become much more likely.',
    ],
    bullets: [
      'Contexts track changes before they are saved.',
      'Managed objects are owned by a specific context.',
      'Context boundaries define save and merge behavior.',
      'Strong Core Data design starts with clear context ownership.',
    ],
  },
  {
    id: 'core-fetching',
    title: 'Fetching, Sorting, and Predicates',
    paragraphs: [
      'Core Data fetch requests describe what objects should be loaded into a context. They can filter with predicates, sort with sort descriptors, batch results, prefetch relationships, and tune fault behavior. Efficient fetch design matters because it directly shapes launch cost, scrolling smoothness, and memory use.',
      'A common mistake is to fetch too much and filter in memory. Another is to fetch too little context about related entities and then trigger a flood of follow-up faults. Good fetch design balances selectivity, relationship access patterns, and the actual UI or business workflow consuming the data.',
    ],
    bullets: [
      'Use predicates to narrow work before objects are materialized.',
      'Sort descriptors should reflect UI or processing requirements explicitly.',
      'Batch sizes and prefetching can reduce memory or fault churn.',
      'Fetch design is a performance decision, not just a syntax detail.',
    ],
  },
  {
    id: 'core-faulting',
    title: 'Faulting and Memory Behavior',
    paragraphs: [
      'Core Data uses faults as lightweight placeholder objects that defer loading full property data until it is actually needed. This is essential for scaling because a large object graph can be represented in memory without eagerly hydrating every attribute and relationship all at once.',
      'Faulting is helpful, but it also changes debugging and performance reasoning. Accessing a property can trigger I/O. Traversing a relationship in a loop can produce repeated faults if the fetch strategy was poor. Teams that understand faulting usually build more memory-efficient and more predictable Core Data screens.',
    ],
    bullets: [
      'Faults reduce eager loading cost.',
      'Property access can trigger data loading.',
      'Relationship traversal patterns affect fault behavior.',
      'Memory debugging often requires understanding when objects are faults vs fully realized.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Concurrency and Background Work',
    paragraphs: [
      'Core Data concurrency is context-based. Managed object contexts are designed for specific queues, and managed objects should not be passed around across threads as if they were ordinary Swift models. Instead, background work should happen in background contexts, and cross-context communication usually happens through object IDs or saves and merges.',
      'This rule is non-negotiable in serious Core Data code. Import jobs, batch updates, indexing work, and large save operations often belong off the main queue, but the main UI context still needs coherent merged results. Teams that respect queue confinement and object identity boundaries avoid an entire category of race conditions and crashes.',
    ],
    bullets: [
      'Contexts are tied to specific queue usage patterns.',
      'Do not treat managed objects as thread-safe value models.',
      'Use object IDs to hand references across context boundaries safely.',
      'Background imports need explicit merge strategy back into UI-facing contexts.',
    ],
  },
  {
    id: 'core-save-merge',
    title: 'Saving, Merging, and Conflict Handling',
    paragraphs: [
      'Saving writes context changes down the stack toward the persistent store. In simple setups, the viewContext may save directly to disk through the container. In more complex stacks, child-parent context relationships or multiple independent contexts may require merge handling and conflict resolution.',
      'This matters in sync-heavy or multi-context apps because the same logical record can change in more than one place. Merge policies, save notifications, and automatic merging rules determine whether the UI sees the latest consistent state or ends up displaying stale or conflicting data.',
    ],
    bullets: [
      'A save is a unit-of-work commit from a context.',
      'Merge policies affect conflict outcomes when data changes concurrently.',
      'Automatic merging can simplify UI refreshes in multi-context apps.',
      'Conflict handling should be deliberate in any sync or background-write workflow.',
    ],
  },
  {
    id: 'core-relationships',
    title: 'Relationships and Delete Rules',
    paragraphs: [
      'Relationships are where Core Data becomes much more than key-value persistence. Entities can reference one another with one-to-one or one-to-many links, inverse relationships, ordering choices, and delete rules such as cascade, nullify, deny, or no action. Those rules define how the object graph stays coherent as objects are created and removed.',
      'Delete rules deserve serious thought. A wrong rule can either leak orphaned data everywhere or wipe related content too aggressively. The correct choice depends on product semantics, not convenience. Schema decisions here often outlive the original implementation team, so they should be made explicitly.',
    ],
  },
  {
    id: 'core-migrations',
    title: 'Schema Evolution and Migration',
    paragraphs: [
      'Real apps change. Entities gain fields, relationships evolve, uniqueness expectations tighten, and data models drift as product requirements expand. Core Data migrations are the mechanism for moving persistent stores from an old model version to a newer one without losing user data.',
      'Lightweight migration can handle many additive or straightforward schema changes automatically, but not every change qualifies. More complex evolutions may require mapping models, custom migration logic, or deliberate multi-step rollout planning. Teams that postpone migration thinking until release time often create avoidable data-loss risk.',
    ],
    bullets: [
      'Version the model deliberately as the schema changes.',
      'Lightweight migration is useful but not universal.',
      'Complex schema changes may require custom migration handling.',
      'Migration strategy is part of persistence architecture, not an afterthought.',
    ],
  },
  {
    id: 'core-ui-integration',
    title: 'UIKit, SwiftUI, and Fetch-Driven UI',
    paragraphs: [
      'Core Data often feeds list-driven interfaces, detail screens, and editing workflows. In UIKit, that may involve fetched results controllers, manual fetches, diffable data source updates, or explicit save notifications. In SwiftUI, it may involve environment-provided contexts and fetch-backed property wrappers.',
      'The common rule is to keep persistence concerns close enough to data-flow boundaries to stay explicit, but not so close to rendering code that the screen layer becomes the persistence layer. UI code should react to meaningful model changes, not become responsible for every store configuration decision.',
    ],
  },
  {
    id: 'core-testing-debugging',
    title: 'Testing, Debugging, and Operational Discipline',
    paragraphs: [
      'Core Data benefits from in-memory stores for tests, isolated stack creation, deterministic fixtures, and validation of migration and conflict behavior. Treating persistence as a first-class subsystem rather than a hidden implementation detail makes tests more meaningful and failures easier to isolate.',
      'Operationally, teams should inspect save failures, monitor fetch cost, profile memory and fault churn, and understand store growth over time. Core Data bugs often look like UI glitches, stale state, or random crashes, but the root cause is frequently a context, fetch, or merge mistake deeper in the stack.',
    ],
    bullets: [
      'Use in-memory stores for fast isolated tests.',
      'Test migrations and merge behavior before they become release problems.',
      'Profile fetches, faults, and save paths in realistic conditions.',
      'Persistence issues are often systems issues, not isolated syntax bugs.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-container',
    title: 'Set Up an NSPersistentContainer',
    description: [
      'Most modern iOS apps start Core Data with an NSPersistentContainer. This centralizes model loading and persistent store setup while providing a main-queue viewContext for UI-facing work.',
      'The important point is not only the syntax. This object defines the foundation of the stack, so store loading, migration options, and context policies belong here rather than being scattered through feature code.',
    ],
    code: `import CoreData

final class PersistenceController {
    static let shared = PersistenceController()

    let container: NSPersistentContainer

    init(inMemory: Bool = false) {
        container = NSPersistentContainer(name: "Model")

        if inMemory {
            container.persistentStoreDescriptions.first?.url = URL(fileURLWithPath: "/dev/null")
        }

        container.loadPersistentStores { _, error in
            if let error {
                fatalError("Failed to load store: \(error)")
            }
        }

        container.viewContext.automaticallyMergesChangesFromParent = true
    }
}`,
    notes: [
      'Keep persistent stack setup centralized.',
      'Use an in-memory store configuration for tests or previews where appropriate.',
      'Main UI contexts often need automatic merge behavior when background contexts save.',
    ],
  },
  {
    id: 'examples-fetch',
    title: 'Fetch Objects with a Predicate and Sort',
    description: [
      'Fetching should reflect actual product intent. A fetch request can narrow the result set, sort it deterministically, and avoid loading the entire store when the UI only needs a subset.',
      'This pattern is common for inboxes, recent items, user-created content, and any list where the screen cares about current visible records rather than every stored object.',
    ],
    code: `import CoreData

func fetchRecentNotes(in context: NSManagedObjectContext) throws -> [Note] {
    let request: NSFetchRequest<Note> = Note.fetchRequest()
    request.predicate = NSPredicate(format: "archived == NO")
    request.sortDescriptors = [NSSortDescriptor(key: "updatedAt", ascending: false)]
    request.fetchBatchSize = 40

    return try context.fetch(request)
}`,
    notes: [
      'Predicates and sort descriptors should match actual UI or business needs.',
      'Batch size can reduce memory pressure on larger result sets.',
      'Typed fetch requests make call sites clearer in Swift.',
    ],
  },
  {
    id: 'examples-background-import',
    title: 'Perform a Background Import',
    description: [
      'Large imports or sync passes should not block the main queue. A background context can create or update managed objects off the UI thread, save them, and then let the main context merge the changes.',
      'The important rule is to keep the work inside the background context rather than leaking its managed objects into UI code.',
    ],
    code: `import CoreData

func importNotes(_ payloads: [NotePayload], container: NSPersistentContainer) {
    container.performBackgroundTask { context in
        context.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy

        for payload in payloads {
            let note = Note(context: context)
            note.id = payload.id
            note.title = payload.title
            note.updatedAt = payload.updatedAt
        }

        if context.hasChanges {
            try? context.save()
        }
    }
}`,
    notes: [
      'Background contexts keep import work off the main queue.',
      'Merge policy should be chosen intentionally, especially in sync workflows.',
      'Only pass stable identifiers or object IDs across context boundaries.',
    ],
  },
  {
    id: 'examples-object-id',
    title: 'Use NSManagedObjectID Across Contexts',
    description: [
      'Managed objects themselves should not be treated as thread-safe values. When one context needs to identify an object for another context, NSManagedObjectID is the safe stable handle to pass around.',
      'This is especially useful in background processing pipelines where the UI selected an object but the actual processing belongs in another queue-bound context.',
    ],
    code: `import CoreData

func reloadNote(
    objectID: NSManagedObjectID,
    container: NSPersistentContainer
) {
    container.performBackgroundTask { context in
        guard let note = try? context.existingObject(with: objectID) as? Note else {
            return
        }

        note.updatedAt = .now
        try? context.save()
    }
}`,
    notes: [
      'Object IDs are the correct cross-context reference mechanism.',
      'Use existingObject when the record must already exist.',
      'This pattern avoids illegal sharing of managed objects across queues.',
    ],
  },
  {
    id: 'examples-swiftui',
    title: 'SwiftUI Integration with a Managed Object Context',
    description: [
      'SwiftUI commonly accesses Core Data through an environment-injected managed object context. The view still should not become the persistence architecture itself, but simple fetch-driven screens can be expressed compactly this way.',
      'This pattern works well when the app already has a well-defined persistence controller and the view is consuming, not inventing, the Core Data stack.',
    ],
    code: `import SwiftUI

struct NotesView: View {
    @Environment(\\.managedObjectContext) private var context
    @FetchRequest(sortDescriptors: [SortDescriptor(\\.updatedAt, order: .reverse)])
    private var notes: FetchedResults<Note>

    var body: some View {
        List(notes) { note in
            Text(note.title ?? "Untitled")
        }
    }
}`,
    notes: [
      'Environment-provided contexts are convenient but still rely on a real stack beneath them.',
      'Fetch-driven views should stay simple and not absorb unrelated store setup logic.',
      'SwiftUI convenience does not remove the need to understand context ownership.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-foundations',
    title: 'Foundational Terms',
    terms: [
      {
        term: 'Core Data',
        definition: 'Apple\'s object graph management and persistence framework used to model, fetch, track, and store structured data in Apple-platform apps.',
      },
      {
        term: 'NSManagedObject',
        definition: 'A runtime object type managed by Core Data that represents an entity instance inside a managed object context.',
      },
      {
        term: 'NSManagedObjectModel',
        definition: 'The schema definition describing entities, attributes, relationships, constraints, and related metadata for the Core Data stack.',
      },
      {
        term: 'NSPersistentStore',
        definition: 'The backing store where Core Data persists durable data, commonly implemented with SQLite in iOS apps.',
      },
      {
        term: 'NSPersistentContainer',
        definition: 'The modern convenience object that assembles the Core Data stack and provides configured contexts.',
      },
      {
        term: 'NSManagedObjectContext',
        definition: 'The unit-of-work object that tracks managed objects, staged changes, fetches, and saves within a specific queue confinement model.',
      },
    ],
  },
  {
    id: 'glossary-fetching',
    title: 'Fetching and Graph Terms',
    terms: [
      {
        term: 'NSFetchRequest',
        definition: 'A description of what managed objects to retrieve, including filtering, sorting, batching, and relationship loading behavior.',
      },
      {
        term: 'Predicate',
        definition: 'A filter expression used by Core Data fetches to limit which objects are returned.',
      },
      {
        term: 'Fault',
        definition: 'A lightweight placeholder managed object whose property data is loaded lazily when needed.',
      },
      {
        term: 'Relationship',
        definition: 'A connection between entities in the Core Data object graph, with cardinality and inverse behavior.',
      },
      {
        term: 'Delete rule',
        definition: 'The policy that determines what happens to related objects when a relationship source object is deleted.',
      },
      {
        term: 'NSManagedObjectID',
        definition: 'A stable identifier used to refer to a managed object safely across contexts and over time.',
      },
    ],
  },
  {
    id: 'glossary-operations',
    title: 'Operational Terms',
    terms: [
      {
        term: 'Merge policy',
        definition: 'The rule used by Core Data to decide how conflicts are resolved when multiple changes compete for the same data.',
      },
      {
        term: 'Lightweight migration',
        definition: 'Core Data\'s automatic migration capability for a subset of model changes that it can infer without custom mapping.',
      },
      {
        term: 'Fetched results controller',
        definition: 'A UIKit-oriented helper that tracks fetch results and notifies the UI about underlying data changes.',
      },
      {
        term: 'performBackgroundTask',
        definition: 'An NSPersistentContainer convenience API that creates a background context and executes a closure on its queue.',
      },
      {
        term: 'viewContext',
        definition: 'The main context commonly used for UI-facing work in a persistent container-based Core Data stack.',
      },
      {
        term: 'In-memory store',
        definition: 'A non-durable Core Data store configuration commonly used for tests, previews, or disposable runtime scenarios.',
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

const coreDataHelpStyles = `
.core-data-help98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.core-data-help98-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.core-data-help98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.core-data-help98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  letter-spacing: 0.1px;
  white-space: nowrap;
}

.core-data-help98-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.core-data-help98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  font: inherit;
  font-size: 11px;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
}

.core-data-help98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.core-data-help98-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  color: #000;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.core-data-help98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.core-data-help98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.core-data-help98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.core-data-help98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}
.core-data-help98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.core-data-help98-toc-list li {
  margin: 0 0 8px;
}

.core-data-help98-toc-list a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

.core-data-help98-content {
  overflow: auto;
  padding: 14px 20px 24px;
}

.core-data-help98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.core-data-help98-section {
  margin: 0 0 20px;
}

.core-data-help98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.core-data-help98-content p,
.core-data-help98-content li,
.core-data-help98-content dd,
.core-data-help98-content dt {
  font-size: 12px;
  line-height: 1.5;
}

.core-data-help98-content p,
.core-data-help98-content dd {
  margin: 0 0 10px;
}

.core-data-help98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.core-data-help98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.core-data-help98-codebox {
  margin: 8px 0 10px;
  padding: 8px;
  overflow-x: auto;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.core-data-help98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.45;
}

.core-data-help98-glossary {
  margin: 0;
}

.core-data-help98-glossary dt {
  margin: 0 0 2px;
  font-weight: 700;
}

@media (max-width: 900px) {
  .core-data-help98-main {
    grid-template-columns: 1fr;
  }

  .core-data-help98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .core-data-help98-content {
    padding: 14px 14px 20px;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="core-data-help98-section">
      <h2 className="core-data-help98-heading">{section.title}</h2>
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
      {!isLast ? <hr className="core-data-help98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="core-data-help98-section">
      <h2 className="core-data-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="core-data-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="core-data-help98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="core-data-help98-section">
      <h2 className="core-data-help98-heading">{section.title}</h2>
      <dl className="core-data-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="core-data-help98-divider" /> : null}
    </section>
  )
}

export default function CoreDataPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `${PAGE_TITLE} (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: true })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: PAGE_TITLE,
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="core-data-help98-page">
      <style>{coreDataHelpStyles}</style>
      <div className="core-data-help98-window" role="presentation">
        <header className="core-data-help98-titlebar">
          <span className="core-data-help98-title">{PAGE_TITLE}</span>
          <div className="core-data-help98-controls">
            <button className="core-data-help98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="core-data-help98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="core-data-help98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`core-data-help98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="core-data-help98-main">
          <aside className="core-data-help98-toc" aria-label="Table of contents">
            <h2 className="core-data-help98-toc-title">Contents</h2>
            <ul className="core-data-help98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="core-data-help98-content">
            <h1 className="core-data-help98-doc-title">{PAGE_TITLE}</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <hr className="core-data-help98-divider" />

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
          </main>
        </div>
      </div>
    </div>
  )
}
