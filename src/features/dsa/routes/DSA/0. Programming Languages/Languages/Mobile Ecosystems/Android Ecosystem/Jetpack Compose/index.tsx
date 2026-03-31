import { useEffect, useState } from 'react'
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

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  "Jetpack Compose is Android's modern declarative UI toolkit. The important shift is not merely that it replaces XML layouts with Kotlin code. The deeper shift is that UI is now described as a function of state, recomposition updates only the parts that need to change, and the surrounding architecture is usually cleaner when state ownership is explicit.",
  'Compose fits naturally with Kotlin, coroutines, Flow, ViewModel, and current Jetpack guidance. A screen is typically modeled as state plus events, the ViewModel owns business-facing state, and composables render that state while emitting user actions upward. This is why Compose often feels like an architectural upgrade as much as a UI toolkit.',
  'This page is intentionally comprehensive. It covers the declarative mental model, recomposition, state, remember and rememberSaveable, state hoisting, side effects, layout and modifiers, Material theming, lazy lists, navigation, ViewModel integration, interoperability with View-based Android UI, testing, performance, and the common misconceptions teams carry over from old imperative UI habits.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Jetpack Compose is the recommended modern toolkit for building native Android UI. Instead of inflating XML, finding views, and mutating widgets over time, Compose lets developers describe the UI tree directly in Kotlin by calling composable functions.',
      'The practical benefit is not just less boilerplate. Compose changes the engineering model. UI becomes easier to reason about when the screen is derived from current state instead of being incrementally patched by many event handlers in many different lifecycle moments.',
      'Compose is still native Android UI. It is not a web view strategy and not a cross-platform abstraction by itself. It works with the Android platform, Jetpack libraries, Material components, accessibility, previews, testing, and existing Android architecture patterns.',
    ],
  },
  {
    id: 'bp-why-compose-exists',
    title: 'Why Compose Exists',
    paragraphs: [
      'Traditional Android UI development with XML and Views worked, but it accumulated friction: duplicated view state and domain state, imperative update code, awkward synchronization between lifecycle and UI updates, large adapter and binding layers, and a lot of incidental complexity for relatively simple screens.',
      'Compose exists to make UI more directly express intent. A composable can say what the interface should look like for a given state right now. When state changes, Compose recomposes the affected parts instead of forcing the developer to manually coordinate every visual update.',
    ],
    bullets: [
      'Declarative UI makes state-driven rendering clearer.',
      'Kotlin-based UI removes a large amount of XML and glue code.',
      'Compose aligns better with ViewModel, Flow, and modern app architecture.',
      'The toolkit is designed for previews, testing, and reusable UI functions.',
    ],
  },
  {
    id: 'bp-when-compose-fits',
    title: 'When Compose Is the Right Fit',
    paragraphs: [
      'Compose is the default fit for most new Android UI work. It is especially strong when the application already uses Kotlin-first architecture, unidirectional data flow, ViewModel state, and modern Jetpack libraries.',
      'It is also a strong fit for teams that want reusable design-system components, explicit state handling, and a more direct path from app logic to UI output. Complex screens with many states often become easier to understand when rendered declaratively.',
    ],
    bullets: [
      'New Android applications.',
      'Apps using Kotlin, coroutines, and Flow.',
      'Teams building design systems or reusable screen components.',
      'Codebases moving toward state-driven UI and better testability.',
    ],
  },
  {
    id: 'bp-when-compose-is-not-the-whole-story',
    title: 'When Compose Is Not the Whole Story',
    paragraphs: [
      'Compose does not eliminate the Android lifecycle, business logic, navigation design, or data consistency concerns. It changes the UI layer, but it does not replace architecture. A badly structured app in Compose is still badly structured.',
      'It is also common for real Android apps to mix Compose and View-based UI for a while. That is normal. Migration can be incremental, and interoperability is part of the intended model rather than a sign of failure.',
    ],
    bullets: [
      'Compose does not replace ViewModel or domain modeling.',
      'Compose does not make state management automatic.',
      'Compose does not remove performance considerations.',
      'Incremental migration with existing Views is a valid production strategy.',
    ],
  },
  {
    id: 'bp-building-blocks',
    title: 'The Main Building Blocks',
    paragraphs: [
      'At a high level, Compose development revolves around composable functions, immutable or mostly immutable UI models, observable state, recomposition, layout primitives, modifiers, theming, side-effect APIs, and state hoisting. These pieces fit together into a predictable UI pipeline.',
      'A common architecture is straightforward: repositories and use cases produce data, a ViewModel exposes screen state, composables collect and render that state, and user events flow upward for handling. Compose is strongest when each layer has clear ownership.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'Compose is mature enough for real applications, but teams still need discipline. Recomposition does not excuse poor state modeling. Large mutable objects passed everywhere can still cause trouble. Performance still depends on measuring actual hot paths, not guessing.',
      'In production, the best Compose codebases are usually boring in a good way. State is explicit, composables are reasonably small, side effects are isolated, ViewModel boundaries are clear, and previews or tests reinforce component-level correctness.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'For new Android UI, Compose is usually the best default. The more useful engineering question is not whether to use Compose in the abstract, but how to organize state, how much View interop is needed, and whether the team understands the declarative mental model well enough to avoid simply recreating imperative habits in Kotlin.',
      'If a team is migrating an older app, the disciplined approach is usually to introduce Compose screen by screen or feature by feature, preserve stable data and navigation boundaries, and let the UI layer modernize without rewriting unrelated system parts all at once.',
    ],
    bullets: [
      'Prefer Compose for new native Android UI.',
      'Use explicit state ownership and event flow.',
      'Adopt interop where migration needs it.',
      'Measure performance instead of relying on intuition.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-compose-is',
    title: 'What Jetpack Compose Actually Is',
    paragraphs: [
      'Compose is a Kotlin-based declarative UI toolkit for Android. A composable function emits UI. Developers call composables to describe structure, appearance, and behavior in terms of the current state rather than manipulating widget instances directly.',
      'Compose includes runtime support, compiler support, UI primitives, layout APIs, animation tools, Material components, previews, testing support, and interoperability hooks for using Compose with existing Android Views.',
    ],
  },
  {
    id: 'core-declarative-model',
    title: 'The Declarative Model',
    paragraphs: [
      'The most important Compose idea is that UI is a function of state. If the state says a screen is loading, the loading UI is rendered. If the state says there is content, the content UI is rendered. If the state says there is an error, the error UI is rendered. The code describes the valid output for each state rather than manually toggling many view properties over time.',
      'This reduces many synchronization problems that were common in imperative UI. Instead of asking which views need to be updated after a specific event, developers ask what the screen should look like for the current state and let Compose update it.',
    ],
  },
  {
    id: 'core-mental-model',
    title: 'The Compose Mental Model and Recomposition',
    paragraphs: [
      'Compose may re-run composable functions when observed state changes. This process is called recomposition. Recomposition is not the same as rebuilding the entire screen from scratch in a naive sense. The runtime tracks what reads state and can skip work when possible.',
      'The practical rule is that composables should be written as cheap, side-effect-free descriptions of UI. They should not assume a one-time execution model. Any logic that must survive recomposition or run only in controlled moments should use the appropriate state or side-effect APIs.',
    ],
  },
  {
    id: 'core-state',
    title: 'State in Compose',
    paragraphs: [
      'State drives Compose UI. When state changes, any composables reading that state can be recomposed. Local UI state can live inside a composable when it truly belongs there, but screen state usually belongs in a ViewModel or another owner above the UI layer.',
      'Compose commonly uses `mutableStateOf`, `remember`, `rememberSaveable`, and collected streams such as `StateFlow` converted into UI-observable state. The real goal is not to memorize API names. The goal is to keep a single clear source of truth.',
    ],
  },
  {
    id: 'core-remember',
    title: 'remember and rememberSaveable',
    paragraphs: [
      'The `remember` API stores an object across recompositions within the same composition location. It is useful for local UI concerns that should not be recreated every time the composable runs.',
      'The `rememberSaveable` API goes further by persisting supported values across configuration change and process recreation scenarios through saved state mechanisms. It is appropriate for user-entered or transient UI values that should survive rotation or similar recreation events.',
      'A common mistake is using `remember` for business state that belongs somewhere else. If losing that state would break the screen model, it probably belongs in a ViewModel or repository rather than in a leaf composable.',
    ],
  },
  {
    id: 'core-state-hoisting',
    title: 'State Hoisting',
    paragraphs: [
      'State hoisting means moving state to the lowest common owner that needs to control it and passing the current value plus event callbacks down into child composables. This improves reuse, testability, and predictability.',
      'In practice, hoisted composables tend to accept parameters such as `value`, `onValueChange`, `checked`, `onCheckedChange`, or a full UI model plus event lambdas. This pattern keeps visual components stateless or mostly stateless while preserving explicit ownership.',
    ],
  },
  {
    id: 'core-side-effects',
    title: 'Side Effects and Lifecycle-Aware Work',
    paragraphs: [
      'Because composables can re-run frequently, side effects must be explicit. Compose provides effect APIs such as `LaunchedEffect`, `DisposableEffect`, `SideEffect`, `produceState`, and `rememberCoroutineScope` for work that interacts with the outside world.',
      'The practical rule is simple: rendering code should describe UI, not start uncontrolled jobs or mutate external systems accidentally. If code depends on entering composition, leaving composition, or responding to changing keys over time, an effect API is usually the right place.',
    ],
  },
  {
    id: 'core-layout-modifiers',
    title: 'Layouts and Modifiers',
    paragraphs: [
      'Compose layouts are built from primitives such as `Row`, `Column`, `Box`, and more specialized containers like lazy lists. Visual and behavioral decoration is usually added through modifiers. Modifiers can control size, padding, click handling, drawing, scrolling, focus behavior, semantics, and much more.',
      'Modifiers matter because they keep configuration composable and order-sensitive. A padding modifier before a clickable modifier can behave differently from the reverse ordering. This is one of the reasons Compose code rewards careful reading rather than purely visual guesswork.',
    ],
  },
  {
    id: 'core-lists',
    title: 'Lazy Lists and Large UI Collections',
    paragraphs: [
      'Compose provides lazy containers such as `LazyColumn` and `LazyRow` for efficiently rendering potentially large item sets. These containers render visible content as needed rather than eagerly materializing the full list.',
      'List performance still depends on stable item identity, sensible state placement, and avoiding unnecessary expensive work inside each row. Declarative UI does not remove collection rendering discipline.',
    ],
  },
  {
    id: 'core-material-theming',
    title: 'Material, Theming, and Design Systems',
    paragraphs: [
      'Compose ships with Material support and is well suited to internal design systems. Themes can define color, typography, and shape systems that are consumed consistently across the app.',
      'The advantage is not merely visual consistency. When design primitives are expressed as composables and theme values, teams can build reusable UI with fewer XML style layers and less duplicated widget configuration.',
    ],
  },
  {
    id: 'core-viewmodel-integration',
    title: 'ViewModel Integration',
    paragraphs: [
      'Compose works very naturally with ViewModel-driven architecture. The ViewModel exposes screen state and event handlers or intent-processing functions. The UI collects state, renders it, and emits user actions upward.',
      'This keeps Compose focused on presentation while preserving lifecycle-aware ownership of business-facing data. It is usually cleaner than letting composables become miniature controllers with hidden mutable state.',
    ],
  },
  {
    id: 'core-flow-lifecycle',
    title: 'Flow, Lifecycle, and State Collection',
    paragraphs: [
      'Compose often consumes `StateFlow` or other flows from a ViewModel. In Android apps, lifecycle-aware collection matters so the UI observes data at appropriate times and avoids wasteful background collection while off-screen.',
      'This is why many Compose architectures pair ViewModel state exposure with lifecycle-aware collection helpers. The exact APIs can evolve, but the architectural principle is stable: the screen should observe one coherent stream of UI state in a lifecycle-conscious way.',
    ],
  },
  {
    id: 'core-navigation',
    title: 'Navigation and Screen Boundaries',
    paragraphs: [
      'Compose navigation is usually strongest when routes and screen boundaries stay simple. Navigation should move between destinations, while each destination owns its own state acquisition and rendering. Passing huge mutable objects through navigation is usually a design smell.',
      'A disciplined screen boundary makes previews, testing, and gradual refactoring easier because each destination can be reasoned about as a state contract rather than a pile of hidden dependencies.',
    ],
  },
  {
    id: 'core-interop',
    title: 'Interoperability with View-Based Android UI',
    paragraphs: [
      'Compose supports migration rather than demanding a full rewrite. Android apps can embed Compose in existing screens and can also host traditional Views inside Compose where needed.',
      'This is strategically important because production Android apps often contain long-lived screens, custom views, or third-party widgets that are not worth replacing immediately. Good interop lets teams modernize where it matters most first.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing and Previews',
    paragraphs: [
      'Compose supports UI testing through semantics-driven queries and supports previews for fast visual iteration in development. Those capabilities matter because declarative components are easier to isolate and inspect when state is explicit.',
      'Previews are not a substitute for runtime testing, but they are useful for building and reviewing components against multiple states. Tests then verify behavior, interactions, and important UI contracts.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance, Stability, and Recomposition Discipline',
    paragraphs: [
      'Compose performance is usually about state shape, stability, allocation patterns, and avoiding unnecessary expensive work during recomposition. Large mutable objects or unstable inputs can cause more recomposition than intended.',
      'The right approach is to profile real behavior, keep models reasonably stable or immutable where practical, and avoid folklore. Compose has performance tools and compiler-related guidance because performance work should be evidence-driven.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Architecture Patterns That Fit Compose',
    paragraphs: [
      'Compose fits well with unidirectional data flow. Data moves down as state, events move up as callbacks or intents, and the ViewModel or other owner performs mutations or business actions in one place. This makes UI behavior easier to trace.',
      'A common pattern is a screen-level state data class, a sealed event model when useful, and small reusable stateless composables below the screen level. The exact pattern can vary, but explicit ownership and predictable flow are the main goals.',
    ],
  },
  {
    id: 'core-common-mistakes',
    title: 'Common Compose Mistakes',
    paragraphs: [
      'A frequent mistake is carrying imperative habits into Compose: storing too much state in many child composables, mutating global objects directly from the UI, or launching side effects from ordinary render code. Another is assuming recomposition is inherently bad instead of asking whether the actual work being recomposed is expensive.',
      'Teams also sometimes overcomplicate Compose with unnecessary abstractions. The best Compose code is usually straightforward: clear state, clear ownership, simple composables, and measured optimization only where real evidence justifies it.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-basic-composable',
    title: 'A Basic Stateless Composable',
    description: [
      'Compose components are easiest to reuse when they render from parameters and avoid owning business state. This example takes input and simply renders it.',
    ],
    code: `@Composable
fun UserHeader(
  name: String,
  isOnline: Boolean,
) {
  Column(modifier = Modifier.padding(16.dp)) {
    Text(text = name, style = MaterialTheme.typography.titleLarge)
    Text(text = if (isOnline) "Online" else "Offline")
  }
}`,
    notes: [
      'The composable is easy to preview because its inputs are explicit.',
      'It does not hide screen-level state ownership inside the component.',
    ],
  },
  {
    id: 'examples-state-hoisting',
    title: 'State Hoisting for Reusable Input',
    description: [
      'State hoisting keeps ownership clear. The parent owns the value, while the child renders it and reports events upward.',
    ],
    code: `@Composable
fun SearchField(
  query: String,
  onQueryChange: (String) -> Unit,
) {
  TextField(
    value = query,
    onValueChange = onQueryChange,
    label = { Text("Search") },
  )
}`,
    notes: [
      'This component is more reusable than one that privately stores the query.',
      'The caller decides whether the state lives in a parent composable, ViewModel, or saved state.',
    ],
  },
  {
    id: 'examples-remember-saveable',
    title: 'Local UI State with rememberSaveable',
    description: [
      'Some state is purely local UI state and should survive configuration changes. That is a good fit for `rememberSaveable`.',
    ],
    code: `@Composable
fun ExpandableNote(note: String) {
  var expanded by rememberSaveable { mutableStateOf(false) }

  Column {
    Button(onClick = { expanded = !expanded }) {
      Text(if (expanded) "Hide" else "Show")
    }
    if (expanded) {
      Text(text = note)
    }
  }
}`,
    notes: [
      'This state belongs to the UI interaction itself, not to the data layer.',
      'Using `rememberSaveable` helps the value survive recreation scenarios such as rotation.',
    ],
  },
  {
    id: 'examples-viewmodel',
    title: 'ViewModel State Collected by the Screen',
    description: [
      'A common Compose screen pattern is to collect ViewModel state and pass it into stateless or mostly stateless UI components.',
    ],
    code: `@Composable
fun FeedScreen(
  viewModel: FeedViewModel = viewModel(),
) {
  val uiState by viewModel.uiState.collectAsStateWithLifecycle()

  when {
    uiState.isLoading -> LoadingPane()
    uiState.errorMessage != null -> ErrorPane(uiState.errorMessage)
    else -> FeedList(items = uiState.items)
  }
}`,
    notes: [
      'The screen reads one coherent UI state model rather than many unrelated fragments.',
      'Lifecycle-aware collection helps align observation with screen visibility.',
    ],
  },
  {
    id: 'examples-side-effect',
    title: 'Controlled Side Effect with LaunchedEffect',
    description: [
      'Effects are the correct place for work that must occur in response to entering composition or to key changes over time.',
    ],
    code: `@Composable
fun UserDetailsScreen(
  userId: Long,
  viewModel: UserDetailsViewModel = viewModel(),
) {
  LaunchedEffect(userId) {
    viewModel.loadUser(userId)
  }

  val uiState by viewModel.uiState.collectAsStateWithLifecycle()
  UserDetailsContent(uiState = uiState)
}`,
    notes: [
      'The load action is tied to a meaningful key rather than firing from ordinary render code.',
      'This keeps side effects explicit and easier to reason about.',
    ],
  },
  {
    id: 'examples-lazy-list',
    title: 'LazyColumn for Large Collections',
    description: [
      'Lazy containers are important for rendering potentially large datasets efficiently while preserving a declarative screen structure.',
    ],
    code: `@Composable
fun MessageList(messages: List<MessageUiModel>) {
  LazyColumn {
    items(
      items = messages,
      key = { message -> message.id },
    ) { message ->
      Text(
        text = message.body,
        modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
      )
    }
  }
}`,
    notes: [
      'Stable item keys help Compose track item identity correctly.',
      'List rows should stay reasonably lightweight and avoid heavy repeated work.',
    ],
  },
  {
    id: 'examples-interop',
    title: 'Incremental Migration with ComposeView',
    description: [
      'Compose can be introduced inside an existing View-based screen instead of forcing a full rewrite immediately.',
    ],
    code: `class ProfileFragment : Fragment(R.layout.profile_fragment) {
  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    val composeView = view.findViewById<ComposeView>(R.id.profile_compose)
    composeView.setContent {
      MaterialTheme {
        ProfilePane(userName = "Amina")
      }
    }
  }
}`,
    notes: [
      'Interop lets teams modernize feature by feature.',
      'This approach is useful when the surrounding screen or navigation stack still uses Views.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Compose Terms',
    terms: [
      {
        term: 'Composable',
        definition:
          'A function that describes part of the UI and can participate in composition and recomposition.',
      },
      {
        term: 'Composition',
        definition:
          'The process by which Compose builds and tracks the UI tree produced by composable functions.',
      },
      {
        term: 'Recomposition',
        definition:
          'The process of re-running composables that depend on changed state so the UI can update.',
      },
      {
        term: 'Modifier',
        definition:
          'A chainable object used to decorate, configure, or add behavior to Compose UI elements.',
      },
      {
        term: 'remember',
        definition:
          'An API that stores an object across recompositions at the same place in the composition.',
      },
      {
        term: 'rememberSaveable',
        definition:
          'A state helper that preserves supported values across recreation using saved state support.',
      },
      {
        term: 'State hoisting',
        definition:
          'Moving state ownership upward and passing value plus events down to child composables.',
      },
      {
        term: 'LazyColumn',
        definition: 'A Compose container that lazily renders vertical list content as needed.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture and State Terms',
    terms: [
      {
        term: 'Source of truth',
        definition:
          'The canonical owner of some state that the rest of the UI should treat as authoritative.',
      },
      {
        term: 'Unidirectional data flow',
        definition:
          'A pattern where state flows downward into the UI and events flow upward for handling.',
      },
      {
        term: 'ViewModel',
        definition:
          'A lifecycle-aware component that exposes screen state and survives configuration changes.',
      },
      {
        term: 'StateFlow',
        definition:
          'A hot Kotlin Flow type commonly used to expose observable UI state from a ViewModel.',
      },
      {
        term: 'LaunchedEffect',
        definition:
          'A Compose side-effect API used to launch coroutine work tied to composition and keys.',
      },
      {
        term: 'DisposableEffect',
        definition:
          'A side-effect API used when setup and cleanup must be tied to composition lifecycle.',
      },
      {
        term: 'Derived state',
        definition:
          'State computed from other state so expensive or repeated calculations can be modeled clearly.',
      },
      {
        term: 'Stable type',
        definition:
          'A type whose behavior and state characteristics allow Compose to optimize recomposition more effectively.',
      },
    ],
  },
  {
    id: 'glossary-migration',
    title: 'Migration, Tooling, and UI Terms',
    terms: [
      {
        term: 'ComposeView',
        definition:
          'A View wrapper used to host Compose content inside a traditional View-based Android hierarchy.',
      },
      {
        term: 'AndroidView',
        definition:
          'A Compose interop API for displaying a traditional Android View inside Compose UI.',
      },
      {
        term: 'Preview',
        definition:
          'A design-time rendering of a composable in Android Studio used for fast iteration.',
      },
      {
        term: 'Semantics',
        definition:
          'Accessibility and testing metadata Compose exposes for tools and screen readers.',
      },
      {
        term: 'MaterialTheme',
        definition:
          'The theme entry point that provides Material design values such as colors and typography.',
      },
      {
        term: 'Snapshot state',
        definition:
          'Compose runtime state that participates in change tracking so dependent UI can update.',
      },
      {
        term: 'Interop',
        definition:
          'Using Compose together with the older Android View system during migration or integration.',
      },
      {
        term: 'Recomposition skipping',
        definition:
          'An optimization where Compose avoids re-running parts of the UI that do not need updates.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-compose-exists', label: 'Why Compose Exists' },
    { id: 'bp-when-compose-fits', label: 'When Compose Fits' },
    { id: 'bp-when-compose-is-not-the-whole-story', label: 'What Compose Does Not Replace' },
    { id: 'bp-building-blocks', label: 'Main Building Blocks' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-what-compose-is', label: 'What Compose Is' },
    { id: 'core-declarative-model', label: 'Declarative Model' },
    { id: 'core-mental-model', label: 'Mental Model and Recomposition' },
    { id: 'core-state', label: 'State' },
    { id: 'core-remember', label: 'remember and rememberSaveable' },
    { id: 'core-state-hoisting', label: 'State Hoisting' },
    { id: 'core-side-effects', label: 'Side Effects' },
    { id: 'core-layout-modifiers', label: 'Layouts and Modifiers' },
    { id: 'core-lists', label: 'Lazy Lists' },
    { id: 'core-material-theming', label: 'Material and Theming' },
    { id: 'core-viewmodel-integration', label: 'ViewModel Integration' },
    { id: 'core-flow-lifecycle', label: 'Flow and Lifecycle' },
    { id: 'core-navigation', label: 'Navigation' },
    { id: 'core-interop', label: 'View Interop' },
    { id: 'core-testing', label: 'Testing and Previews' },
    { id: 'core-performance', label: 'Performance and Stability' },
    { id: 'core-architecture', label: 'Architecture Patterns' },
    { id: 'core-common-mistakes', label: 'Common Mistakes' },
  ],
  examples: [
    { id: 'examples-basic-composable', label: 'Basic Stateless Composable' },
    { id: 'examples-state-hoisting', label: 'State Hoisting' },
    { id: 'examples-remember-saveable', label: 'rememberSaveable' },
    { id: 'examples-viewmodel', label: 'ViewModel Collection' },
    { id: 'examples-side-effect', label: 'LaunchedEffect' },
    { id: 'examples-lazy-list', label: 'LazyColumn' },
    { id: 'examples-interop', label: 'ComposeView Interop' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Compose Terms' },
    { id: 'glossary-architecture', label: 'Architecture and State Terms' },
    { id: 'glossary-migration', label: 'Migration and Tooling Terms' },
  ],
}

const pageStyles = `
.compose-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.compose-help-window {
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

.compose-help-titlebar {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.compose-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.compose-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.compose-help-control {
  width: 18px;
  height: 16px;
  padding: 0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 11px;
  line-height: 1;
}

.compose-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.compose-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 12px;
  cursor: pointer;
}

.compose-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.compose-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.compose-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.compose-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.compose-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.compose-help-toc-item {
  margin: 0 0 8px;
}

.compose-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.compose-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.compose-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.compose-help-section {
  margin: 0 0 20px;
}

.compose-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.compose-help-content p,
.compose-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.compose-help-content p {
  margin: 0 0 10px;
}

.compose-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.compose-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.compose-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.compose-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .compose-help-main {
    grid-template-columns: 1fr;
  }

  .compose-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .compose-help-window {
    min-height: auto;
  }

  .compose-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .compose-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .compose-help-controls {
    grid-column: 2;
    grid-row: 1;
    align-self: start;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="compose-help-section">
      <h2 className="compose-help-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="compose-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="compose-help-section">
      <h2 className="compose-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="compose-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="compose-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="compose-help-section">
      <h2 className="compose-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="compose-help-divider" />}
    </section>
  )
}

export default function JetpackComposePage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Jetpack Compose (Android) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Jetpack Compose (Android)',
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
    <div className="compose-help-page">
      <style>{pageStyles}</style>
      <div className="compose-help-window" role="presentation">
        <header className="compose-help-titlebar">
          <span className="compose-help-titletext">Jetpack Compose (Android)</span>
          <div className="compose-help-controls">
            <button
              className="compose-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="compose-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="compose-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`compose-help-tab ${activeTab === tab.id ? 'compose-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="compose-help-main">
          <aside className="compose-help-toc" aria-label="Table of contents">
            <h2 className="compose-help-toc-title">Contents</h2>
            <ul className="compose-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="compose-help-toc-item">
                  <a href={`#${section.id}`} className="compose-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="compose-help-content">
            <h1 className="compose-help-doc-title">Jetpack Compose (Android)</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

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
