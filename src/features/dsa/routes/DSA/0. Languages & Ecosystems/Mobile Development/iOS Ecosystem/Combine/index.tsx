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

const PAGE_TITLE = 'Combine'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  "Combine is Apple's reactive programming framework for composing asynchronous events over time. On iOS, it is used to model value streams such as text changes, network responses, timers, notifications, app lifecycle events, and state updates, then transform, combine, throttle, debounce, or observe those streams with explicit operators and cancellation behavior.",
  'The right mental model is that Combine is not about one-off callbacks. It is about pipelines. A publisher emits values and completion events, operators transform or coordinate those emissions, and subscribers consume them while respecting demand, scheduling, and lifetime. This makes Combine especially useful when a feature is defined by how events flow rather than by a single request-response call.',
  'This page focuses on Combine in practical iOS development. It covers where Combine fits in Apple apps, publishers and subscribers, subjects, operators, errors and completion, scheduling, cancellation, UI integration, testing patterns, examples, and the vocabulary that matters when maintaining or debugging Combine-heavy code.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      "Combine is Apple's framework for declaratively handling asynchronous streams of values. It lets developers create pipelines that receive input over time, transform that input through operators, and deliver the result to downstream consumers. This is a better fit than nested callbacks when a feature depends on ongoing event coordination rather than a single future value.",
      'On iOS, that event coordination shows up everywhere: form validation, live search, UI bindings, notifications, repeated polling, timers, network chains, and state propagation between services and screens. Combine provides a common vocabulary for those flows instead of forcing every feature to invent its own callback orchestration style.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Combine Matters',
    paragraphs: [
      'Combine matters because many app behaviors are stream-shaped. Text fields emit characters over time. Reachability changes over time. Network retries happen over time. User intent, lifecycle events, store updates, and timer-based refresh logic all naturally form sequences rather than isolated results. Combine gives teams a way to represent those sequences explicitly.',
      'It also matters because it creates a structured bridge between imperative app code and declarative event reasoning. Instead of scattering observers, delegates, timers, and hand-written state propagation across a feature, a team can describe the flow once as a pipeline and keep transformation logic closer to the data movement itself.',
    ],
    bullets: [
      'Good fit for event-driven or stream-shaped app logic.',
      'Reduces callback nesting and ad hoc observer code.',
      'Provides reusable operators for timing, transformation, and coordination.',
      'Integrates with Apple platform APIs and UI workflows.',
    ],
  },
  {
    id: 'bp-what-it-is-not',
    title: 'What Combine Is Not',
    paragraphs: [
      'Combine is not automatically the right abstraction for every asynchronous task. A one-off network call that returns a single value may be clearer with modern Swift concurrency. Combine also does not remove the need to understand ownership, cancellation, scheduler choice, or failure handling. Reactive syntax can hide bad architecture just as easily as it can reveal a good one.',
      'It is also not a license to turn every feature into a long opaque operator chain. When pipelines become too indirect, debugging and onboarding suffer. The best Combine code keeps data flow explicit and bounded rather than treating operator cleverness as a goal in itself.',
    ],
    bullets: [
      'Not every async task should be modeled as a reactive stream.',
      'Not a substitute for clear state ownership and architecture.',
      'Not automatically easier to debug than straightforward async code.',
      'Not valuable when the pipeline shape is more complex than the problem requires.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Combine Fits Best',
    paragraphs: [
      'Combine fits best in features where multiple events need to be observed, transformed, or synchronized over time. Examples include search-as-you-type, live validation, multi-source state aggregation, retry and backoff flows, notification-driven updates, timer-based refreshes, and view models that publish evolving state to UI layers.',
      'It is less compelling when the feature is mostly imperative and sequential, or when Swift concurrency already expresses the problem more directly. Many strong iOS teams use both: async and await for straightforward tasks, and Combine where stream semantics are genuinely central.',
    ],
    bullets: [
      'Live forms, filters, and search pipelines.',
      'State propagation between services and UI.',
      'Notification, timer, and lifecycle event streams.',
      'Features that need throttling, debouncing, merging, or combining streams.',
    ],
  },
  {
    id: 'bp-tradeoffs',
    title: 'Tradeoffs and Risks',
    paragraphs: [
      'Combine offers powerful composition, but the tradeoff is cognitive overhead. Pipelines can become difficult to inspect when many operators interact. Cancellation can surprise teams that do not hold onto subscriptions correctly. Scheduler bugs can look like race conditions. Error type mismatches can make otherwise simple code awkward.',
      'The practical risk is that a codebase becomes "reactive by habit" instead of by need. When developers use Combine for simple state assignment or trivial single-shot work, they often create unnecessary abstraction. The framework is strongest when used for genuine temporal coordination, not for aesthetic consistency alone.',
    ],
    bullets: [
      'Operator-heavy code can be difficult to debug.',
      'Subscription lifetime bugs are common in early Combine code.',
      'Scheduler mistakes can produce UI or threading issues.',
      'Reactive overuse can make simple features harder than necessary.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Combine is best understood as a framework for composing event streams and asynchronous pipelines over time. It shines when app behavior is defined by coordination between multiple evolving signals rather than by a single awaited result.',
      'Teams get the most value from Combine when they use it deliberately, keep pipelines readable, choose scheduler and ownership boundaries explicitly, and reserve it for problems that are genuinely stream-oriented.',
    ],
    bullets: [
      'Think in pipelines, not callbacks.',
      'Use Combine where the problem is fundamentally event-driven.',
      'Be explicit about lifetime, scheduler choice, and failure behavior.',
      'Readable reactive code beats clever reactive code.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-publisher-subscriber',
    title: 'Publishers and Subscribers',
    paragraphs: [
      'The foundation of Combine is the publisher-subscriber relationship. A publisher describes a stream of values and a possible completion. A subscriber receives those values and reacts to them. This separation matters because a pipeline is not just a callback. It is a contract about what will be emitted, how failure is represented, and when the stream ends.',
      'In practice, many pipelines are not built by writing custom subscribers directly. Developers usually subscribe with sink, assign, or framework-provided adapters, but the underlying model still matters because backpressure, demand, and completion behavior all come from this publisher-subscriber contract.',
    ],
    bullets: [
      'Publishers emit values over time.',
      'Subscribers consume values and completion events.',
      'Completion can be successful finish or failure.',
      'The contract is about more than just a closure callback.',
    ],
  },
  {
    id: 'core-subscriptions-cancellation',
    title: 'Subscriptions, AnyCancellable, and Lifetime',
    paragraphs: [
      'A subscription connects a publisher to a subscriber. In app code, this usually appears as an AnyCancellable returned by sink, assign, or a similar operator. If that cancellable is not retained, the pipeline is cancelled immediately. This is one of the first practical issues teams hit when adopting Combine.',
      'Lifetime management is therefore a central design concern. Pipelines tied to a view model usually live as long as that view model. Pipelines tied to a temporary screen or task should be released when the feature disappears. A reactive pipeline without a clear owner is usually a bug waiting to happen.',
    ],
    bullets: [
      'Retain cancellables for as long as the pipeline should stay alive.',
      'Use cancellation to stop work that is no longer relevant.',
      'Subscription ownership should match feature ownership.',
      'Unexpected deallocation often explains mysteriously silent pipelines.',
    ],
  },
  {
    id: 'core-subjects',
    title: 'Subjects and Imperative Bridging',
    paragraphs: [
      'Subjects are publishers that can also be driven imperatively by sending values manually. PassthroughSubject is useful for transient events, while CurrentValueSubject stores a current value and replays the latest state to new subscribers. Subjects are often used to bridge imperative inputs into a reactive pipeline.',
      'They are powerful, but overusing them can turn Combine into shared mutable event soup. A subject should represent a well-defined event or state source, not become a generic escape hatch for passing arbitrary messages across the app.',
    ],
    bullets: [
      'PassthroughSubject is useful for transient events.',
      'CurrentValueSubject is useful for state with a current snapshot.',
      'Subjects bridge imperative input into reactive flows.',
      'Treat subjects as bounded sources, not global message buses.',
    ],
  },
  {
    id: 'core-operators',
    title: 'Operators and Pipeline Composition',
    paragraphs: [
      'Operators transform or coordinate streams. Map reshapes values, filter removes unwanted values, debounce waits for quiet periods, combineLatest joins current values from multiple upstreams, flatMap starts dependent publishers, and many other operators express timing and transformation rules directly in the pipeline.',
      'This is where Combine becomes genuinely powerful. Instead of writing stateful glue code for every coordination problem, teams can express the logic as operator composition. The engineering challenge is to keep those compositions readable enough that someone else can reason about them six months later.',
    ],
    bullets: [
      'Use operators to encode event-flow rules explicitly.',
      'Small named pipeline helpers are often easier to maintain than giant inline chains.',
      'Choose operators based on semantics, not familiarity alone.',
      'Complex pipelines should still communicate intent clearly.',
    ],
  },
  {
    id: 'core-failure-completion',
    title: 'Failure Types and Completion',
    paragraphs: [
      'Every Combine publisher has an Output type and a Failure type. This makes error behavior explicit, but it also means pipelines must align their failure semantics. Some publishers never fail and use Never. Others emit typed errors that need to be mapped, caught, retried, or erased to integrate with the rest of the chain.',
      'Completion matters because some streams finish while others are intended to stay alive indefinitely. A single-shot network publisher may complete once, while a subject or notification stream may remain active for the lifetime of the feature. Debugging a pipeline often starts with asking whether it failed, finished, or was cancelled.',
    ],
  },
  {
    id: 'core-schedulers',
    title: 'Schedulers and Threading',
    paragraphs: [
      'Schedulers define where work happens. subscribe(on:) affects upstream work setup, while receive(on:) changes the downstream delivery context. On iOS, this matters because UI updates must occur on the main thread, but parsing, heavy transformation, or background coordination should often happen elsewhere.',
      'Scheduler bugs are common because a pipeline can appear logically correct while still delivering work on the wrong queue. Strong Combine code is explicit about when values cross from background processing back to UI-facing code.',
    ],
    bullets: [
      'Use receive(on:) before UI updates that must reach the main thread.',
      'Keep expensive work off the main queue when possible.',
      'Be careful not to hide scheduler assumptions deep inside helper code.',
      'Thread correctness is part of pipeline correctness.',
    ],
  },
  {
    id: 'core-hot-cold',
    title: 'Hot vs Cold Streams and Sharing',
    paragraphs: [
      'A cold publisher typically starts producing work for each subscriber separately, while a hot source can push values regardless of new subscriptions or share work among downstream consumers. This distinction matters when the upstream operation is expensive, stateful, or should not be repeated for every subscriber.',
      'Operators such as share or multicast can change the effective behavior of a pipeline. Without them, multiple subscribers to what looks like the same publisher may each trigger independent network requests or side effects. Teams need to know whether they are subscribing to a reusable stream or recreating work each time.',
    ],
  },
  {
    id: 'core-ui-integration',
    title: 'UIKit, SwiftUI, and Observable State',
    paragraphs: [
      'Combine is often used in view models and state holders that publish values to UI layers. In UIKit, that might mean binding a published property to labels, lists, or button enabled state. In SwiftUI, Combine historically appears through ObservableObject and @Published-backed models that trigger view updates when data changes.',
      'The framework is most useful here when the UI is reacting to meaningful state streams rather than every tiny internal mutation. It should help isolate state flow, not make the screen depend on unreadable chains for basic behavior.',
    ],
  },
  {
    id: 'core-networking',
    title: 'Networking and Dependent Async Work',
    paragraphs: [
      'Combine works well for network layers when the feature needs retries, transformation, cancellation, or chaining between multiple requests. URLSession provides publisher APIs that can feed directly into decode, retry, mapError, and downstream UI or domain pipelines.',
      'That said, not every network call needs Combine. Many teams now reserve it for flows with actual stream semantics or complex composition and use async and await for simpler request-response work. The decision should be about clarity, not fashion.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing and Debugging Pipelines',
    paragraphs: [
      'Combine code becomes easier to test when inputs and schedulers are controlled explicitly. Subjects can stand in for event sources, test helpers can await outputs deterministically, and dependencies can expose publishers behind narrow protocols or feature-specific abstractions.',
      'Debugging often involves confirming the pipeline actually subscribes, seeing which operator stage changes the value, identifying whether completion or cancellation happened early, and checking scheduler hops. The handleEvents operator, logging, and small intermediate helper publishers are often more useful than staring at a giant chain as a whole.',
    ],
    bullets: [
      'Control event sources and scheduler assumptions in tests.',
      'Probe pipelines in small stages when debugging.',
      'Keep pipelines factored enough to inspect meaningfully.',
      'Most Combine bugs are lifetime, scheduler, or completion bugs rather than syntax bugs.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-search',
    title: 'Debounced Search Text Pipeline',
    description: [
      'A classic Combine use case is search-as-you-type. The pipeline receives frequent user input, removes duplicates, waits for the user to pause, and then triggers a search only when the input stabilizes.',
      'This reduces redundant work and keeps the search logic expressed as a flow rather than as timer-heavy imperative code.',
    ],
    code: `import Combine
import Foundation

final class SearchViewModel: ObservableObject {
    @Published var query = ""
    @Published private(set) var results: [String] = []

    private var cancellables = Set<AnyCancellable>()

    init(service: SearchService) {
        $query
            .debounce(for: .milliseconds(300), scheduler: DispatchQueue.main)
            .removeDuplicates()
            .flatMap { query in
                service.searchPublisher(for: query)
            }
            .receive(on: DispatchQueue.main)
            .assign(to: &$results)
    }
}`,
    notes: [
      'Debounce is useful when fast input should not trigger immediate work for every keystroke.',
      'removeDuplicates avoids repeating equivalent searches.',
      'The pipeline stays readable because each operator has a clear role.',
    ],
  },
  {
    id: 'examples-subject',
    title: 'PassthroughSubject for User Actions',
    description: [
      'Subjects are useful when imperative events need to enter a reactive flow. A tap, refresh intent, or explicit command can be represented as a subject and then transformed downstream like any other publisher.',
      'This is helpful when the event source is imperative but the surrounding logic benefits from Combine composition.',
    ],
    code: `import Combine

final class ProfileViewModel {
    let reloadTapped = PassthroughSubject<Void, Never>()

    private var cancellables = Set<AnyCancellable>()

    init(service: ProfileService) {
        reloadTapped
            .flatMap { service.profilePublisher() }
            .sink(receiveCompletion: { _ in }, receiveValue: { profile in
                print(profile)
            })
            .store(in: &cancellables)
    }
}`,
    notes: [
      'Subjects bridge imperative UI events into Combine pipelines.',
      'Store the cancellable so the pipeline remains active.',
      'Use a subject only when there is a real event source to model.',
    ],
  },
  {
    id: 'examples-network',
    title: 'Network Request with Decode and Error Mapping',
    description: [
      'Combine can express a network chain compactly when the feature needs transformation and typed failure handling. URLSession publishes data, decoding maps that data into models, and error mapping shapes the failure surface for the rest of the app.',
      'This works well when the pipeline behavior itself is important, not just the eventual value.',
    ],
    code: `import Combine
import Foundation

struct Article: Decodable {
    let title: String
}

enum ArticleError: Error {
    case transport(Error)
    case decoding(Error)
}

func articlesPublisher(url: URL) -> AnyPublisher<[Article], ArticleError> {
    URLSession.shared.dataTaskPublisher(for: url)
        .map(\.data)
        .decode(type: [Article].self, decoder: JSONDecoder())
        .mapError { error in
            if let decodingError = error as? DecodingError {
                return .decoding(decodingError)
            }
            return .transport(error)
        }
        .eraseToAnyPublisher()
}`,
    notes: [
      'Type erasure can simplify API surfaces when callers should not depend on the full operator chain type.',
      'Map low-level failures into feature-relevant errors where helpful.',
      'Combine is useful here when the request is part of a larger reactive flow.',
    ],
  },
  {
    id: 'examples-current-value',
    title: 'CurrentValueSubject for Shared State Snapshot',
    description: [
      'CurrentValueSubject is useful when downstream subscribers need both a stream of updates and the latest known value immediately upon subscription. This makes it a better fit for certain state-like sources than PassthroughSubject.',
      'The key is to use it for a well-defined state boundary rather than as a substitute for all app architecture.',
    ],
    code: `import Combine

final class SessionStore {
    let isLoggedIn = CurrentValueSubject<Bool, Never>(false)

    func updateLoginState(_ value: Bool) {
        isLoggedIn.send(value)
    }
}`,
    notes: [
      'New subscribers immediately receive the current value.',
      'This is often useful for simple state signals.',
      'Do not let subjects replace clearer domain modeling where a dedicated type is warranted.',
    ],
  },
  {
    id: 'examples-combine-latest',
    title: 'CombineLatest for Multi-Input Validation',
    description: [
      'Some UI state depends on more than one input. CombineLatest allows a pipeline to react whenever either upstream value changes, using the latest value from both streams to compute a result.',
      'This is a common fit for login forms, filters, and any state derived from multiple editable fields.',
    ],
    code: `import Combine

final class LoginViewModel: ObservableObject {
    @Published var email = ""
    @Published var password = ""
    @Published private(set) var canSubmit = false

    private var cancellables = Set<AnyCancellable>()

    init() {
        Publishers.CombineLatest($email, $password)
            .map { email, password in
                email.contains("@") && password.count >= 8
            }
            .removeDuplicates()
            .assign(to: &$canSubmit)
    }
}`,
    notes: [
      'Derived UI state is often cleaner as a pipeline than as manual field-by-field mutation logic.',
      'CombineLatest reacts to changes from either source using the newest values from both.',
      'Small pipelines like this are usually easy to maintain and test.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-foundations',
    title: 'Foundational Terms',
    terms: [
      {
        term: 'Publisher',
        definition:
          'A Combine type that emits values over time and may eventually complete successfully or with failure.',
      },
      {
        term: 'Subscriber',
        definition:
          'A consumer that receives values, completion, and demand interactions from a publisher.',
      },
      {
        term: 'Subscription',
        definition:
          'The connection between a publisher and subscriber that governs delivery and cancellation.',
      },
      {
        term: 'Output',
        definition: 'The value type emitted by a publisher.',
      },
      {
        term: 'Failure',
        definition:
          'The error type a publisher can emit on terminal failure, or Never when failure cannot occur.',
      },
      {
        term: 'AnyCancellable',
        definition:
          'A type-erased cancellable token commonly retained to keep a Combine subscription alive.',
      },
    ],
  },
  {
    id: 'glossary-operators',
    title: 'Pipeline and Operator Terms',
    terms: [
      {
        term: 'Operator',
        definition:
          'A transformation or coordination step that takes an upstream publisher and returns a new publisher.',
      },
      {
        term: 'debounce',
        definition:
          'An operator that waits for a quiet interval before emitting the most recent value.',
      },
      {
        term: 'flatMap',
        definition:
          'An operator that transforms each upstream value into a new publisher and flattens the resulting streams.',
      },
      {
        term: 'combineLatest',
        definition:
          'An operator that emits tuples built from the most recent value of each upstream publisher.',
      },
      {
        term: 'eraseToAnyPublisher',
        definition:
          'Type erasure that hides the concrete publisher chain behind a stable AnyPublisher API surface.',
      },
      {
        term: 'Completion',
        definition:
          'The terminal event indicating either finished or failed for a publisher stream.',
      },
    ],
  },
  {
    id: 'glossary-sources',
    title: 'Source and Scheduling Terms',
    terms: [
      {
        term: 'PassthroughSubject',
        definition:
          'A subject that forwards values to current subscribers without storing a latest value.',
      },
      {
        term: 'CurrentValueSubject',
        definition:
          'A subject that stores the current value and immediately replays it to new subscribers.',
      },
      {
        term: 'Scheduler',
        definition:
          'The execution context used by Combine to control where work is performed or delivered.',
      },
      {
        term: 'receive(on:)',
        definition:
          'An operator that changes the downstream delivery scheduler for emitted values and completion.',
      },
      {
        term: 'subscribe(on:)',
        definition: 'An operator that influences where upstream subscription and work setup occur.',
      },
      {
        term: 'Hot stream',
        definition:
          'A stream whose activity or value production is not recreated independently for every subscriber.',
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
    <section key={section.id} id={section.id} className="combine-help98-section">
      <h2 className="combine-help98-heading">{section.title}</h2>
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
      {!isLast ? <hr className="combine-help98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="combine-help98-section">
      <h2 className="combine-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="combine-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="combine-help98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="combine-help98-section">
      <h2 className="combine-help98-heading">{section.title}</h2>
      <dl className="combine-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="combine-help98-divider" /> : null}
    </section>
  )
}

export default function CombinePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Combine Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Combine Page"
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
