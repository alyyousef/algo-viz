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

const PAGE_TITLE = 'UIKit'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'UIKit is Apple\'s imperative user-interface framework for iPhone and iPad applications, centered on view controllers, views, responder chains, event handling, layout systems, navigation containers, animation APIs, and deep integration with the iOS application lifecycle. It has powered most iOS apps for years and remains critical in both legacy and actively maintained codebases.',
  'The most useful mental model is not just "buttons and screens," but "the runtime UI framework that coordinates presentation, input, navigation, layout, rendering, and application interaction on iOS." Teams that work on long-lived Apple apps still need strong UIKit understanding even when newer features use SwiftUI or hybrid adoption patterns.',
  'This page is intentionally comprehensive. It covers UIKit architecture, view and view-controller responsibilities, layout systems, navigation patterns, event delivery, collection and table views, state and lifecycle boundaries, interoperability, testing and debugging considerations, practical workflows, examples, and a glossary of the concepts that appear most often in real UIKit projects.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'UIKit is the foundational framework for imperative interface development on iOS and related Apple platform environments. It provides the objects and lifecycle rules that determine how screens are created, displayed, navigated, laid out, animated, and updated in response to user input and system events.',
      'Its importance is broader than visual widgets. UIKit is also about architecture. It defines how responsibilities are divided between application objects, scenes, windows, view controllers, views, controls, gestures, presentation containers, and layout systems. Most serious iOS work eventually touches those responsibilities whether the app is fully UIKit-based or only partially so.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why UIKit Matters',
    paragraphs: [
      'UIKit matters because a large amount of production iOS software still depends on it directly. Many established apps, internal enterprise tools, SDK integrations, and mixed-framework codebases continue to use UIKit for screens, navigation, lifecycle coordination, and custom platform behavior. Even teams adopting SwiftUI often do so incrementally on top of an existing UIKit application shell.',
      'It also matters because UIKit teaches the operational model of iOS user interfaces. Understanding view hierarchies, layout passes, responder chains, view-controller containment, lifecycle callbacks, and presentation rules gives teams the vocabulary they need to debug and extend real Apple apps safely.',
    ],
    bullets: [
      'Still central to many long-lived iOS codebases.',
      'Defines core iOS UI architecture concepts that remain relevant.',
      'Often forms the shell around incremental SwiftUI adoption.',
      'Essential for many SDK integrations and lower-level UI customizations.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Think of UIKit as a hierarchy-and-lifecycle framework. Views compose into view trees. View controllers coordinate those views and the screen-level behavior around them. Containers such as navigation controllers or tab bar controllers coordinate transitions and application structure. The system delivers lifecycle and input events into that hierarchy at specific times.',
      'This mental model matters because UIKit code becomes messy when responsibilities blur. Views should not become mini-app coordinators, and view controllers should not become unbounded dumping grounds for networking, persistence, and unrelated state. Strong UIKit code comes from respecting the shape of the runtime rather than fighting it.',
    ],
    bullets: [
      'Views render and handle local interaction concerns.',
      'View controllers coordinate screen-level behavior and lifecycle.',
      'Containers organize navigation and composition.',
      'System callbacks define when UI state can safely change.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where UIKit Fits Best',
    paragraphs: [
      'UIKit fits best in established iOS applications, feature-rich native app experiences, apps with deep custom interactions, and codebases that need direct control over controllers, navigation, presentation, or lower-level view behavior. It is also a strong fit when teams need to integrate mature iOS SDKs, complex text/input flows, custom container controllers, or advanced scrolling and layout behaviors.',
      'It remains especially effective for teams maintaining older apps, incrementally modernizing platform architecture, or building features where explicit lifecycle control and platform-native behavior matter more than adopting the newest declarative style.',
    ],
    bullets: [
      'Mature iOS applications and long-lived codebases.',
      'Highly customized navigation or presentation flows.',
      'Feature areas requiring explicit imperative lifecycle control.',
      'Mixed UIKit and SwiftUI applications during phased migration.',
    ],
  },
  {
    id: 'bp-where-it-does-not-fit',
    title: 'Where UIKit Is Not the Best Default',
    paragraphs: [
      'UIKit is not always the best first choice for greenfield Apple UI development if the project clearly benefits from declarative state-driven rendering and the team is fully aligned with modern SwiftUI patterns. UIKit also introduces more boilerplate and more manual lifecycle management than many newer abstractions.',
      'It can also be the wrong place to centralize too much business logic. Because view controllers are convenient and lifecycle-aware, teams often overload them with networking, persistence, and coordination responsibilities that should live elsewhere. The result is not a UIKit limitation so much as a common misuse pattern.',
    ],
    bullets: [
      'Not always ideal for fully greenfield declarative-first UI strategies.',
      'Requires more manual lifecycle and state discipline.',
      'Can encourage oversized view-controller files if architecture is weak.',
      'Should not absorb all non-UI application logic by default.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical Workflow',
    paragraphs: [
      'A common UIKit workflow begins with a screen-level view controller, a view hierarchy, layout constraints, and event wiring for controls or gestures. As the feature matures, navigation rules, data flow, child controllers, list views, asynchronous loading states, and animation behavior are added in ways that must stay consistent with the iOS lifecycle.',
      'Production UIKit workflows also involve testing on multiple size classes, dynamic type settings, orientation changes, accessibility paths, memory warnings, interrupted flows, and integration with app-level or scene-level coordination. The best UIKit teams treat the screen as part of a broader runtime system rather than as an isolated layout exercise.',
    ],
    bullets: [
      'Design the screen hierarchy and controller responsibilities first.',
      'Establish layout and navigation behavior early.',
      'Handle lifecycle and asynchronous state changes deliberately.',
      'Validate on multiple device conditions and accessibility settings.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'UIKit is best understood as the operational UI framework of iOS rather than just a set of visual controls. Its power comes from how it coordinates views, controllers, navigation, input, layout, presentation, and runtime lifecycle across a native application.',
      'If a team works on iOS in the real world, UIKit literacy remains valuable. Even when newer UI layers are adopted, the deeper platform concepts that UIKit exposes often remain the key to debugging, integration, and architectural control.',
    ],
    bullets: [
      'UIKit knowledge remains strategically relevant in iOS work.',
      'Lifecycle and hierarchy understanding matter as much as syntax.',
      'Strong separation of responsibilities is critical in UIKit codebases.',
      'Mixed-framework adoption still depends on UIKit fluency in many apps.',
    ],
  },
]
const coreConceptSections: ContentSection[] = [
  {
    id: 'core-identity',
    title: 'What UIKit Actually Is',
    paragraphs: [
      'UIKit is the object-oriented runtime UI framework for iOS applications. It defines the main classes, callbacks, and composition patterns used to build native interfaces, including views, controls, view controllers, windows, gestures, navigation containers, alerts, transitions, and list-based presentations.',
      'This layered identity matters because UIKit is not just a rendering library. It is a coordination framework. The objects it provides encode assumptions about screen ownership, hierarchy, event propagation, memory behavior, and presentation flow that shape the architecture of the application.',
    ],
  },
  {
    id: 'core-view-controller',
    title: 'Views, View Controllers, and Responsibilities',
    paragraphs: [
      'Views are responsible for rendering content and handling local interaction-related behavior. View controllers coordinate screen-level logic, lifecycle callbacks, transitions, child containment, and communication between UI structure and the broader application state. The distinction is one of the central architectural rules in UIKit.',
      'Many maintainability problems come from breaking this boundary. If views become coordination hubs or view controllers become universal dumping grounds, the codebase becomes difficult to reason about. Good UIKit architecture respects the runtime responsibilities the framework already implies.',
    ],
    bullets: [
      'Views own rendering and local interaction concerns.',
      'View controllers own screen coordination and lifecycle behavior.',
      'Do not merge unrelated app logic into controller files casually.',
      'Clear ownership boundaries make UIKit codebases survivable over time.',
    ],
  },
  {
    id: 'core-lifecycle',
    title: 'Lifecycle and Screen Management',
    paragraphs: [
      'UIKit delivers a sequence of lifecycle callbacks as screens load, appear, lay out subviews, disappear, and respond to memory or environment changes. These callbacks matter because UI state is not safe to initialize or mutate arbitrarily at any time. The right work often depends on where the screen is in its lifecycle.',
      'This is one of the most important practical topics in UIKit. Teams must know which setup belongs in initialization, which belongs in view loading, which belongs in appearance callbacks, and which belongs in later update paths triggered by model changes or environmental transitions.',
    ],
    bullets: [
      'Lifecycle callbacks describe when screens become ready and visible.',
      'UI initialization should happen in the right phase rather than everywhere.',
      'Appearance and layout callbacks serve different purposes.',
      'Lifecycle confusion is a common source of duplicate work and visual bugs.',
    ],
  },
  {
    id: 'core-layout',
    title: 'Layout, Constraints, and Safe Areas',
    paragraphs: [
      'UIKit layout can be done manually, but Auto Layout and constraints are central to most modern UIKit applications. Constraints express relationships between views rather than absolute frames, which helps interfaces adapt to screen size, orientation, text scaling, and container changes more robustly.',
      'Safe areas matter because content should respect device-specific UI regions such as notches, home indicators, bars, and container overlays. Good UIKit layout is not only about making a screen look correct on one simulator. It is about making the relationships resilient across the environments the app actually supports.',
    ],
    bullets: [
      'Auto Layout is the default mental model in modern UIKit.',
      'Safe areas are part of real device correctness, not cosmetic polish.',
      'Constraint clarity matters more than raw quantity of constraints.',
      'Layout bugs often come from hidden assumptions about size or hierarchy.',
    ],
  },
  {
    id: 'core-navigation-presentation',
    title: 'Navigation and Presentation',
    paragraphs: [
      'UIKit distinguishes between different forms of moving through the application: hierarchical navigation, tab-based switching, modal presentation, child containment, and custom transitions. Navigation controllers and tab bar controllers are standard containers, while modals and custom presentations allow more controlled or interruptive flows.',
      'This matters because presentation choices shape architecture. A view controller that should be pushed, embedded, or presented modally carries different expectations around dismissal, state restoration, and ownership. Teams that make these decisions casually often create brittle and inconsistent user flows.',
    ],
    bullets: [
      'Use navigation controllers for hierarchical drill-down flows.',
      'Use tab containers for peer-level application sections.',
      'Use modals intentionally for interruptive or temporary tasks.',
      'Container choice affects lifecycle and ownership semantics.',
    ],
  },
  {
    id: 'core-input-events',
    title: 'Controls, Gestures, and the Responder Chain',
    paragraphs: [
      'UIKit input handling depends on controls, gesture recognizers, touch delivery, first-responder behavior, and the responder chain. The system routes events through the hierarchy in structured ways, which means focus, keyboard handling, action dispatch, and interaction conflicts often depend on more than one visible object.',
      'Understanding this model is especially important in text entry, custom interaction surfaces, nested gesture environments, and screens with accessory behavior such as toolbars or editing modes. Interaction bugs often come from misunderstanding event flow rather than from rendering mistakes.',
    ],
    bullets: [
      'Controls and gestures are part of a larger event-delivery model.',
      'Responder-chain behavior matters for actions and focus.',
      'Gesture conflicts require deliberate coordination.',
      'Keyboard and first-responder handling are core UIKit concerns, not edge cases.',
    ],
  },
  {
    id: 'core-lists',
    title: 'Table Views, Collection Views, and Cell Reuse',
    paragraphs: [
      'Lists are a major part of UIKit applications, and table views and collection views are the standard abstractions for efficiently presenting repeated content. Their design depends on reusable cells, data-source coordination, delegate behavior, selection handling, prefetch-friendly thinking, and layout strategy.',
      'The central idea is reuse. UIKit does not expect every visible row or tile to be a permanently unique object. Teams that understand reuse, diff-driven updates, and state reset rules build smoother and more scalable interfaces than teams that treat list items as isolated standalone screens.',
    ],
    bullets: [
      'Cell reuse is central to UIKit list performance.',
      'Data-source and delegate responsibilities should stay clear.',
      'List state must be reset correctly when cells are reused.',
      'Collection views offer more flexible layouts than table views for complex grids and compositions.',
    ],
  },
  {
    id: 'core-state-architecture',
    title: 'State Management and Screen Architecture',
    paragraphs: [
      'UIKit does not force a single architectural pattern, which is both a strength and a risk. MVC, MVVM, coordinators, unidirectional data flow variants, and other patterns can all be used, but the important thing is that responsibilities remain clear and testable. Without structure, UIKit projects often accumulate oversized controllers and implicit state dependencies.',
      'The right architecture is the one that keeps view updates explicit, navigation ownership understandable, asynchronous work isolated, and screen-level dependencies easy to reason about. UIKit rewards teams that choose a pattern deliberately and apply it consistently instead of mixing multiple partial patterns without clear boundaries.',
    ],
    bullets: [
      'UIKit is flexible about architecture, which means teams must be disciplined.',
      'State ownership should be explicit rather than inferred from callback timing.',
      'Navigation coordination often benefits from dedicated structure outside leaf controllers.',
      'Architecture quality determines whether UIKit stays manageable as the app grows.',
    ],
  },
  {
    id: 'core-animation-transitions',
    title: 'Animation and Transitions',
    paragraphs: [
      'UIKit supports standard view animations, transition coordinators, custom transitions, interactive gestures, and presentation animation hooks. These make the UI feel alive, but they also introduce complexity because animated state must still remain logically consistent with the underlying hierarchy and lifecycle.',
      'The key point is that animation is not separate from architecture. Transition timing, cancellation, view hierarchy updates, and layout invalidation all interact. Smooth UIKit animation comes from coordinating state and presentation carefully rather than sprinkling animation blocks around otherwise unclear logic.',
    ],
    bullets: [
      'Animations should reflect real state transitions rather than hide state confusion.',
      'Transition systems interact with hierarchy and lifecycle behavior.',
      'Interactive flows need careful cancellation and recovery handling.',
      'Animation quality depends on architectural clarity as much as API usage.',
    ],
  },
  {
    id: 'core-interoperability',
    title: 'Interoperability with SwiftUI and Other Layers',
    paragraphs: [
      'Modern Apple apps often mix UIKit with SwiftUI rather than choosing only one framework. UIKit can host SwiftUI content, and SwiftUI can wrap UIKit views or controllers. This interoperability matters because real migration work is usually incremental rather than a clean rewrite.',
      'UIKit also frequently sits underneath hybrid stacks such as React Native, Flutter integrations, SDK-based feature surfaces, or cross-platform shells. Teams that understand UIKit boundaries are better equipped to debug issues at the native edge when abstractions above it start leaking.',
    ],
    bullets: [
      'UIKit and SwiftUI can coexist in incremental adoption paths.',
      'Native interoperability work often depends on controller and view knowledge.',
      'Mixed-stack debugging usually reaches UIKit eventually.',
      'Interop boundaries should be deliberate rather than accidental.',
    ],
  },
  {
    id: 'core-testing-debugging',
    title: 'Testing, Debugging, and Runtime Issues',
    paragraphs: [
      'UIKit behavior depends on runtime lifecycle, device conditions, and user interaction, so testing and debugging must go beyond simple function-level confidence. Layout, navigation, accessibility, keyboard behavior, cell reuse, and view lifecycle issues often need simulator and device validation alongside unit-level architectural tests.',
      'This is why instrumentation matters. Xcode debugging tools, memory graph inspection, visual hierarchy inspection, and UI tests all help reveal UIKit-specific issues that ordinary logging or compile-time correctness cannot surface on their own.',
    ],
    bullets: [
      'Many UIKit bugs are runtime hierarchy or lifecycle issues.',
      'UI testing and simulator validation are part of real confidence, not optional extras.',
      'Memory and hierarchy inspection matter in view-heavy codebases.',
      'Debugging quality improves when architecture boundaries are already clear.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Common Pitfalls',
    paragraphs: [
      'UIKit gives explicit control, but explicit control means more opportunities to create brittle state transitions, oversized view controllers, layout debt, and navigation inconsistencies. Teams can move quickly at first and still create long-term maintenance pain if they treat every screen as a one-off imperative script.',
      'Common UIKit pitfalls include doing work in the wrong lifecycle callbacks, mutating reused cells carelessly, tying business logic too closely to controller state, assuming simulator behavior fully represents hardware, and letting navigation or modal flows evolve without ownership discipline. None of these are unique to UIKit, but UIKit exposes them very directly.',
    ],
    bullets: [
      'Explicit control is powerful but easy to misuse.',
      'View-controller bloat is one of the most common UIKit failure modes.',
      'Lifecycle mistakes often look like random UI bugs until understood structurally.',
      'Architecture and test discipline are what keep UIKit sustainable over time.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-basic-controller',
    title: 'A Basic UIViewController with Programmatic Views',
    description: [
      'This example shows the normal imperative UIKit structure: a view controller owns screen-level setup, creates views, applies constraints, and wires local interaction. It is intentionally simple but reflects the core pattern of many UIKit screens.',
      'The important point is role clarity. The controller coordinates the screen while the views remain focused on presentation and interaction.',
    ],
    code: `import UIKit

final class ProfileViewController: UIViewController {
    private let titleLabel = UILabel()
    private let editButton = UIButton(type: .system)

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground
        title = "Profile"

        titleLabel.text = "Ada Lovelace"
        titleLabel.font = .preferredFont(forTextStyle: .title2)

        editButton.setTitle("Edit", for: .normal)
        editButton.addTarget(self, action: #selector(editTapped), for: .touchUpInside)

        [titleLabel, editButton].forEach {
            $0.translatesAutoresizingMaskIntoConstraints = false
            view.addSubview($0)
        }

        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 24),
            titleLabel.leadingAnchor.constraint(equalTo: view.layoutMarginsGuide.leadingAnchor),
            editButton.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 16),
            editButton.leadingAnchor.constraint(equalTo: view.layoutMarginsGuide.leadingAnchor),
        ])
    }

    @objc private func editTapped() {
        print("Edit tapped")
    }
}`,
    notes: [
      'Programmatic UIKit is often easier to diff and review than UI-only configuration paths.',
      'Keep lifecycle setup explicit and localized rather than spreading screen setup across many callbacks.',
    ],
  },
  {
    id: 'ex-navigation',
    title: 'Push a View Controller with UINavigationController',
    description: [
      'Hierarchical navigation is one of the most common UIKit flow patterns. A navigation controller owns the stack and individual view controllers focus on their own screens rather than manually rebuilding app-wide flow.',
      'This pattern scales well when ownership of push and pop behavior stays clear.',
    ],
    code: `import UIKit

final class HomeViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.rightBarButtonItem = UIBarButtonItem(
            title: "Details",
            style: .plain,
            target: self,
            action: #selector(showDetails)
        )
    }

    @objc private func showDetails() {
        let vc = DetailViewController()
        navigationController?.pushViewController(vc, animated: true)
    }
}`,
    notes: [
      'Navigation controllers should own stack transitions rather than each screen inventing custom global flow rules.',
      'Push-based navigation is a structural choice, not only a visual transition.',
    ],
  },
  {
    id: 'ex-tableview',
    title: 'UITableView with Cell Reuse',
    description: [
      'List views are a core UIKit competency. The important idea is that cells are reused, so configuration must be repeatable and state must not leak from one reuse cycle into another.',
      'This example shows the basic reusable-cell pattern for a table view.',
    ],
    code: `import UIKit

final class ContactsViewController: UITableViewController {
    private let contacts = ["Ada", "Grace", "Linus"]

    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "Cell")
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        contacts.count
    }

    override func tableView(
        _ tableView: UITableView,
        cellForRowAt indexPath: IndexPath
    ) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
        cell.textLabel?.text = contacts[indexPath.row]
        return cell
    }
}`,
    notes: [
      'Reusable views must be configured fully each time rather than relying on stale visual state.',
      'Table and collection views reward disciplined separation between data source, view state, and navigation behavior.',
    ],
  },
  {
    id: 'ex-child-controller',
    title: 'Child View Controller Containment',
    description: [
      'UIKit supports container-style composition where one controller embeds another and manages its lifecycle correctly. This is useful for modular screen architecture and reusable feature surfaces.',
      'Containment is more than adding a subview. The child controller lifecycle must be attached properly.',
    ],
    code: `import UIKit

final class DashboardViewController: UIViewController {
    private let child = SummaryViewController()

    override func viewDidLoad() {
        super.viewDidLoad()

        addChild(child)
        child.view.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(child.view)

        NSLayoutConstraint.activate([
            child.view.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            child.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            child.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            child.view.bottomAnchor.constraint(equalTo: view.bottomAnchor),
        ])

        child.didMove(toParent: self)
    }
}`,
    notes: [
      'Containment should use the proper addChild and didMove lifecycle calls.',
      'Reusable child controllers can reduce duplication when multiple screens share a complex UI module.',
    ],
  },
  {
    id: 'ex-swiftui-interop',
    title: 'Embed SwiftUI Inside UIKit',
    description: [
      'Many modern apps mix SwiftUI and UIKit incrementally. A hosting controller allows SwiftUI content to live inside an existing UIKit shell without forcing a full rewrite of navigation and lifecycle structure.',
      'This is a practical migration boundary rather than a theoretical one.',
    ],
    code: `import SwiftUI
import UIKit

final class HostViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()

        let swiftUIView = Text("Hello from SwiftUI")
        let hosting = UIHostingController(rootView: swiftUIView)

        addChild(hosting)
        hosting.view.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(hosting.view)

        NSLayoutConstraint.activate([
            hosting.view.topAnchor.constraint(equalTo: view.topAnchor),
            hosting.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            hosting.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            hosting.view.bottomAnchor.constraint(equalTo: view.bottomAnchor),
        ])

        hosting.didMove(toParent: self)
    }
}`,
    notes: [
      'Mixed UIKit and SwiftUI boundaries should be intentional and documented.',
      'Interop is often the practical path for modernizing an existing UIKit app incrementally.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-foundations',
    title: 'Foundations',
    terms: [
      {
        term: 'UIView',
        definition: 'The basic rendering and interaction unit in UIKit, responsible for drawing and local event-related behavior within a hierarchy.',
      },
      {
        term: 'UIViewController',
        definition: 'A screen-level coordinator object that manages a view hierarchy, lifecycle callbacks, and presentation behavior.',
      },
      {
        term: 'View hierarchy',
        definition: 'The tree of views nested inside one another to form the visible interface structure.',
      },
      {
        term: 'Responder chain',
        definition: 'The event and action propagation path used by UIKit to deliver interactions and route certain behaviors through the UI hierarchy.',
      },
      {
        term: 'Safe area',
        definition: 'The portion of a view that is considered safe for unobstructed content given device and container UI regions.',
      },
      {
        term: 'Auto Layout',
        definition: 'The constraint-based layout system used to express spatial relationships between UIKit views.',
      },
    ],
  },
  {
    id: 'glossary-navigation',
    title: 'Navigation and Presentation',
    terms: [
      {
        term: 'UINavigationController',
        definition: 'A container controller that manages a stack of view controllers for hierarchical navigation.',
      },
      {
        term: 'UITabBarController',
        definition: 'A container controller that manages peer application sections through a tab-based interface.',
      },
      {
        term: 'Modal presentation',
        definition: 'A presentation style in which one controller appears on top of another rather than being pushed into a navigation stack.',
      },
      {
        term: 'Containment',
        definition: 'The practice of embedding one view controller inside another and managing the child lifecycle correctly.',
      },
      {
        term: 'Transition coordinator',
        definition: 'A UIKit object used to synchronize animation or state updates with screen transitions.',
      },
      {
        term: 'First responder',
        definition: 'The object currently prioritized to receive certain input events such as keyboard interactions.',
      },
    ],
  },
  {
    id: 'glossary-lists-runtime',
    title: 'Lists and Runtime Behavior',
    terms: [
      {
        term: 'UITableView',
        definition: 'A UIKit list component optimized for vertically scrolling row-based content with reusable cells.',
      },
      {
        term: 'UICollectionView',
        definition: 'A more flexible list and grid component that supports reusable cells and customizable layouts.',
      },
      {
        term: 'Cell reuse',
        definition: 'The performance pattern where list cells are recycled rather than permanently unique for each item.',
      },
      {
        term: 'Lifecycle callback',
        definition: 'A framework-delivered method such as viewDidLoad or viewDidAppear that signals a stage in controller behavior.',
      },
      {
        term: 'Gesture recognizer',
        definition: 'A UIKit object that interprets touch sequences as higher-level gestures such as taps, pans, or pinches.',
      },
      {
        term: 'UIHostingController',
        definition: 'A controller used to host SwiftUI content inside a UIKit environment.',
      },
    ],
  },
]
const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  'core-concepts': coreConceptSections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  examples: exampleSections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  glossary: glossarySections.map((section) => ({
    id: section.id,
    label: section.title,
  })),
}

const uikitHelpStyles = `
.uikit-help98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.uikit-help98-window {
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

.uikit-help98-titlebar {
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

.uikit-help98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  letter-spacing: 0.1px;
  white-space: nowrap;
}

.uikit-help98-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.uikit-help98-control {
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

.uikit-help98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.uikit-help98-tab {
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

.uikit-help98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.uikit-help98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.uikit-help98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.uikit-help98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.uikit-help98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.uikit-help98-toc-list li {
  margin: 0 0 8px;
}

.uikit-help98-toc-list a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

.uikit-help98-content {
  overflow: auto;
  padding: 14px 20px 24px;
}

.uikit-help98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.uikit-help98-section {
  margin: 0 0 20px;
}

.uikit-help98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.uikit-help98-content p,
.uikit-help98-content li,
.uikit-help98-content dd,
.uikit-help98-content dt {
  font-size: 12px;
  line-height: 1.5;
}

.uikit-help98-content p,
.uikit-help98-content dd {
  margin: 0 0 10px;
}

.uikit-help98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.uikit-help98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.uikit-help98-codebox {
  margin: 8px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.uikit-help98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.45;
}

.uikit-help98-glossary {
  margin: 0;
}

.uikit-help98-glossary dt {
  margin: 0 0 2px;
  font-weight: 700;
}

@media (max-width: 900px) {
  .uikit-help98-main {
    grid-template-columns: 1fr;
  }

  .uikit-help98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .uikit-help98-content {
    padding: 14px 14px 20px;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="uikit-help98-section">
      <h2 className="uikit-help98-heading">{section.title}</h2>
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
      {!isLast ? <hr className="uikit-help98-divider" /> : null}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="uikit-help98-section">
      <h2 className="uikit-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="uikit-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="uikit-help98-divider" /> : null}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="uikit-help98-section">
      <h2 className="uikit-help98-heading">{section.title}</h2>
      <dl className="uikit-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="uikit-help98-divider" /> : null}
    </section>
  )
}

export default function UIKitPage(): JSX.Element {
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
    <div className="uikit-help98-page">
      <style>{uikitHelpStyles}</style>
      <div className="uikit-help98-window" role="presentation">
        <header className="uikit-help98-titlebar">
          <span className="uikit-help98-title">{PAGE_TITLE}</span>
          <div className="uikit-help98-controls">
            <button className="uikit-help98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="uikit-help98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="uikit-help98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`uikit-help98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="uikit-help98-main">
          <aside className="uikit-help98-toc" aria-label="Table of contents">
            <h2 className="uikit-help98-toc-title">Contents</h2>
            <ul className="uikit-help98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="uikit-help98-content">
            <h1 className="uikit-help98-doc-title">{PAGE_TITLE}</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <hr className="uikit-help98-divider" />

            {activeTab === 'big-picture'
              ? bigPictureSections.map((section, index) => renderContentSection(section, index === bigPictureSections.length - 1))
              : null}

            {activeTab === 'core-concepts'
              ? coreConceptSections.map((section, index) =>
                  renderContentSection(section, index === coreConceptSections.length - 1),
                )
              : null}

            {activeTab === 'examples'
              ? exampleSections.map((section, index) => renderExampleSection(section, index === exampleSections.length - 1))
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
