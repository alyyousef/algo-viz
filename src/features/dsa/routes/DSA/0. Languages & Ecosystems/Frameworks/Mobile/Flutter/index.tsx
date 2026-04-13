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

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Flutter is Googles UI toolkit for building apps from a single codebase across multiple platforms. The key architectural distinction is that Flutter does not rely on OEM widgets for most of its interface rendering. Instead, it renders its own UI through the Flutter engine, which is why it feels different from frameworks that map components onto native platform widgets.',
  'The framework is built around Dart, a layered architecture, and a widget-first composition model. In Flutter, almost everything is a widget, including layout structures, padding, alignment, text, gestures, and large sections of application shell structure. That gives Flutter a highly consistent UI model, but it also means teams need to learn the Flutter way rather than assuming it behaves like React Native, UIKit, or Jetpack Compose.',
  'Flutter matters because it offers strong code sharing, fast iteration, a coherent rendering pipeline, and the ability to target mobile, web, and desktop from one ecosystem. It also matters because it makes a strong tradeoff: rather than deferring most rendering to host-platform UI controls, it chooses a unified rendering model that gives Flutter tighter control over behavior and visual output.',
  'As of April 3, 2026, Flutter remains an actively developed first-party framework from Google. The current docs also matter on rendering details: the Impeller rendering engine documentation states that since Flutter 3.29, Impeller is the default on iOS with no ability to switch to Skia, and that it is enabled by default on Android API 29 and above. Current engineering decisions should therefore assume a modern Flutter runtime rather than outdated assumptions about older rendering defaults.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Flutter is a UI toolkit, not only a widget library. Its architectural overview explains that the Flutter engine provides low-level implementation for graphics, text layout, file and network I O, a Dart runtime, and related foundation pieces, while the framework layers build the widget and rendering system on top of that.',
      'This matters because Flutter applications are not just a thin declarative wrapper around native components. The framework owns much more of the rendering story than many other cross-platform systems, which is a major reason why Flutter apps can achieve consistent visual behavior across platforms.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Flutter Matters',
    paragraphs: [
      'Flutter matters because it gives teams one coherent UI toolkit across multiple target platforms. The benefit is not simply that the same code compiles more than once. The benefit is that the same widget, layout, animation, and rendering model behaves predictably inside one ecosystem.',
      'That can be strategically valuable for teams that care about a highly controlled UI layer, significant code reuse, and a consistent engineering model across mobile and beyond. It is particularly attractive when a product needs shared brand expression and does not want to chase every host platform UI abstraction separately.',
    ],
    bullets: [
      'Single UI toolkit across multiple targets.',
      'Consistent rendering model across platforms.',
      'Fast iteration and strong tooling.',
      'Widget-first composition that scales well when learned properly.',
    ],
  },
  {
    id: 'bp-widget-first',
    title: 'The Widget-First Mental Model',
    paragraphs: [
      'Flutter documentation repeatedly emphasizes that almost everything is a widget. This is not marketing language; it is the real architectural center of the framework. Layout structures such as Row and Column are widgets. Visible content is widgets. Padding, alignment, theming, and stateful shells are also widgets.',
      'That gives Flutter an unusually unified composition model. Instead of switching constantly between different UI definition languages and controller layers, developers stay inside a widget tree that describes both what is visible and how it should be arranged.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Flutter Fits Best',
    paragraphs: [
      'Flutter is strongest for teams that want strong cross-platform code sharing and a consistent rendering stack they can control closely. It is especially suitable for products with branded, custom, or highly designed interfaces where visual consistency matters more than matching every host-platform widget implementation exactly.',
      'It is less ideal for teams that primarily want to stay close to host-platform UI ecosystems, or for organizations that do not want to adopt Dart and the Flutter-specific widget/rendering model. Framework fit depends heavily on whether those tradeoffs are advantages or burdens for the team.',
    ],
  },
  {
    id: 'bp-rendering-reality',
    title: 'Rendering Reality',
    paragraphs: [
      'Rendering is one of the most important distinctions in Flutter. Rather than mapping most widgets directly to OEM native widgets, Flutter paints through its own engine. Current Flutter performance guidance also highlights Impeller as the modern rendering runtime, with current default availability on iOS and many Android targets.',
      'This is why Flutter often achieves high consistency and fine-grained control, but it is also why teams need to understand Flutter as its own runtime environment rather than just a language layer above host-platform controls.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-widgets',
    title: 'Widgets, Elements, and Build',
    paragraphs: [
      'Flutter UI is composed from widgets, but the runtime also involves elements and render objects underneath. The important day-to-day developer concept is that widgets are immutable configuration objects describing part of the UI, while the framework manages the live tree and rendering work beneath them.',
      'This is why Flutter code often feels highly compositional. You do not usually manipulate live widgets directly after creation. Instead, you rebuild with new configuration, and the framework reconciles what changed.',
    ],
  },
  {
    id: 'core-stateless-stateful',
    title: 'StatelessWidget and StatefulWidget',
    paragraphs: [
      'StatelessWidget and StatefulWidget are foundational concepts. StatelessWidget is appropriate when the output depends only on constructor inputs and inherited context. StatefulWidget is used when state owned by the widget changes over time and should trigger rebuilds.',
      'The important rule is not to memorize the class names only, but to understand ownership. If a piece of state is truly local to the widget, StatefulWidget can own it directly. If the state belongs to screen orchestration or domain logic, it should often live higher in the tree or in a separate state-management layer.',
    ],
  },
  {
    id: 'core-layout',
    title: 'Layout Model',
    paragraphs: [
      'Flutter layout is constraint-driven. Parents send constraints down, children pick sizes within those constraints, and parents position children. This differs from some other UI systems and is critical for understanding why certain layout combinations behave the way they do.',
      'Widgets such as Row, Column, Stack, Expanded, Flexible, Align, Padding, SizedBox, and LayoutBuilder are not random utilities. They are the everyday vocabulary for expressing constraint-aware UI composition.',
    ],
  },
  {
    id: 'core-state-management',
    title: 'State Management',
    paragraphs: [
      'Flutter itself provides local state primitives, but real applications often adopt broader state-management patterns such as inherited widgets, provider-style dependency flow, notifier-based models, or other architecture libraries. The important question is not which library is fashionable. It is where state lives, how it updates, and how predictable the UI becomes as the app grows.',
      'Healthy Flutter architecture usually separates ephemeral widget-local state from shared application state and business logic. Teams get into trouble when everything is lifted into a global model unnecessarily or when too much business behavior is trapped in widget classes.',
    ],
    bullets: [
      'Keep ephemeral UI state close to the widget when it is truly local.',
      'Elevate shared app state into clearer state-holder layers.',
      'Prefer predictable one-way data movement over hidden mutable coupling.',
      'Choose a state-management approach that matches team skill and app complexity.',
    ],
  },
  {
    id: 'core-navigation',
    title: 'Navigation and Routing',
    paragraphs: [
      'Flutter supports multiple navigation approaches, including imperative Navigator APIs and more structured routing models. Navigation is not only about moving between screens. It also includes restoration, deep linking, nested navigation flows, tabs, modal surfaces, and back-stack behavior.',
      'The practical lesson is that routing should be treated as application architecture. Small apps can survive with simple navigation calls. Large apps need explicit route structure and predictable screen-boundary rules.',
    ],
  },
  {
    id: 'core-rendering-engine',
    title: 'Rendering Engine, Skia, and Impeller',
    paragraphs: [
      'Flutter rendering has historically been associated with Skia, but current Flutter documentation emphasizes Impeller as the modern rendering engine path. The Impeller docs state that since Flutter 3.29, Impeller is the default on iOS and cannot be switched back to Skia there, and that it is enabled by default on Android API 29 and above.',
      'This matters because many older discussions about Flutter performance and rendering behavior assume older defaults. Modern Flutter teams should reason from current engine behavior, especially when profiling startup, animation smoothness, graphics correctness, and platform-specific rendering bugs.',
    ],
  },
  {
    id: 'core-platform-channels',
    title: 'Platform Channels and Native Interop',
    paragraphs: [
      'Flutter provides platform channels for communication between Dart code and host-platform code. This is how Flutter apps reach capabilities that live in Android or iOS code when the framework or plugin ecosystem does not already expose them directly.',
      'This is an important reminder that Flutter is not isolated from native development. Even though most UI may be shared, real applications still cross into Kotlin, Java, Swift, Objective-C, or native SDKs when required.',
    ],
  },
  {
    id: 'core-plugins-packages',
    title: 'Packages, Plugins, and Ecosystem',
    paragraphs: [
      'Flutter uses pub packages for code reuse and plugins for host-platform capability access. The ecosystem is one of the frameworks practical strengths because many common device, networking, animation, and state tasks are already packaged in familiar ways.',
      'That said, plugin dependency quality matters. Teams should evaluate maintenance health, platform coverage, release cadence, and compatibility with current Flutter versions instead of assuming every popular package is production-safe forever.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling, Hot Reload, and DevTools',
    paragraphs: [
      'Flutter is well known for its development ergonomics, especially fast iteration through hot reload and strong debugging and profiling support through Flutter DevTools. This shortens feedback loops and makes UI iteration one of the frameworks most tangible advantages.',
      'However, teams should still separate fast iteration from production readiness. Hot reload helps development speed, but correctness, release performance, accessibility, and platform behavior still require broader validation.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Thinking',
    paragraphs: [
      'Flutter performance work usually focuses on rebuild frequency, unnecessary widget churn, expensive layouts, large image handling, animation smoothness, isolate usage where appropriate, and rendering pipeline behavior. The framework is capable of high performance, but that does not happen automatically.',
      'The best rule is to profile real bottlenecks. Avoid arguing from framework reputation alone. A well-architected Flutter app can perform extremely well; a poorly structured one can still suffer from jank, layout cost, and avoidable rebuilds.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-stateless',
    title: 'Basic Stateless Widget',
    description: [
      'A simple Flutter screen often begins as a StatelessWidget that composes other widgets declaratively.',
    ],
    code: `class WelcomeCard extends StatelessWidget {
  const WelcomeCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Text('Flutter', style: TextStyle(fontSize: 24)),
          SizedBox(height: 8),
          Text('A widget-first UI toolkit.'),
        ],
      ),
    );
  }
}`,
    notes: [
      'Widgets describe UI composition rather than issuing imperative draw commands.',
      'Even simple spacing and structure are expressed through widgets.',
    ],
  },
  {
    id: 'examples-stateful',
    title: 'Stateful Widget',
    description: [
      'Local mutable state lives naturally in a StatefulWidget when the state is truly UI-local and short-lived.',
    ],
    code: `class CounterCard extends StatefulWidget {
  const CounterCard({super.key});

  @override
  State<CounterCard> createState() => _CounterCardState();
}

class _CounterCardState extends State<CounterCard> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $count'),
        ElevatedButton(
          onPressed: () => setState(() => count++),
          child: const Text('Increment'),
        ),
      ],
    );
  }
}`,
    notes: [
      'This is appropriate when the state belongs only to this widget.',
      'Shared application state usually belongs elsewhere.',
    ],
  },
  {
    id: 'examples-layout',
    title: 'Constraint-Aware Layout',
    description: [
      'Flutter layout is built from widgets such as Row, Column, Expanded, and Padding that operate within parent-provided constraints.',
    ],
    code: `Row(
  children: [
    Expanded(
      child: Container(color: Colors.blue, height: 48),
    ),
    const SizedBox(width: 12),
    Expanded(
      child: Container(color: Colors.green, height: 48),
    ),
  ],
)`,
    notes: [
      'Expanded communicates how available width should be shared.',
      'Layout is expressed structurally through widgets rather than separate XML rules.',
    ],
  },
  {
    id: 'examples-platform-channel',
    title: 'Platform Channel Boundary',
    description: [
      'When Dart code needs a host-platform capability, Flutter uses platform channels or plugins as the boundary.',
    ],
    code: `const channel = MethodChannel('device/info');

Future<String?> getDeviceName() async {
  return channel.invokeMethod<String>('getDeviceName');
}`,
    notes: [
      'This is how Flutter reaches into Android or iOS code when necessary.',
      'Cross-platform UI does not eliminate native integration responsibilities.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Flutter Terms',
    terms: [
      {
        term: 'Flutter',
        definition:
          'Googles UI toolkit for building apps across multiple platforms from one codebase.',
      },
      {
        term: 'Widget',
        definition:
          'The primary building block of Flutter UI, used for structure, layout, styling, and content.',
      },
      {
        term: 'StatelessWidget',
        definition:
          'A widget whose output depends only on configuration and context, not internally mutable state.',
      },
      {
        term: 'StatefulWidget',
        definition:
          'A widget that owns mutable state which can change over time and trigger rebuilds.',
      },
      {
        term: 'Build method',
        definition: 'The method that returns the current widget subtree for a widget.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture Terms',
    terms: [
      {
        term: 'Element',
        definition:
          'A runtime object that manages a widgets place in the tree and connects widgets to rendering.',
      },
      {
        term: 'Render object',
        definition: 'A lower-level object responsible for layout and painting behavior.',
      },
      {
        term: 'Platform channel',
        definition: 'A communication mechanism between Dart code and host-platform native code.',
      },
      {
        term: 'Plugin',
        definition:
          'A package that provides Flutter APIs plus host-platform implementations where needed.',
      },
      {
        term: 'Impeller',
        definition:
          'The modern rendering engine path documented as the default on iOS and on many current Android targets.',
      },
    ],
  },
  {
    id: 'glossary-workflow',
    title: 'Workflow Terms',
    terms: [
      {
        term: 'Hot reload',
        definition:
          'A Flutter development workflow feature that injects code changes into a running app quickly.',
      },
      {
        term: 'Flutter DevTools',
        definition: 'The profiling and debugging tool suite for inspecting Flutter applications.',
      },
      {
        term: 'pub package',
        definition: 'A reusable package distributed through Flutters package ecosystem.',
      },
      {
        term: 'Constraint',
        definition: 'The size limits passed from parent to child during Flutter layout.',
      },
      {
        term: 'Rebuild',
        definition:
          'The process of creating a new widget subtree in response to state or input changes.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-it-matters', label: 'Why Flutter Matters' },
    { id: 'bp-widget-first', label: 'Widget-First Model' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-rendering-reality', label: 'Rendering Reality' },
  ],
  'core-concepts': [
    { id: 'core-widgets', label: 'Widgets and Build' },
    { id: 'core-stateless-stateful', label: 'Stateless vs Stateful' },
    { id: 'core-layout', label: 'Layout Model' },
    { id: 'core-state-management', label: 'State Management' },
    { id: 'core-navigation', label: 'Navigation' },
    { id: 'core-rendering-engine', label: 'Rendering Engine' },
    { id: 'core-platform-channels', label: 'Platform Channels' },
    { id: 'core-plugins-packages', label: 'Packages and Plugins' },
    { id: 'core-tooling', label: 'Tooling and DevTools' },
    { id: 'core-performance', label: 'Performance' },
  ],
  examples: [
    { id: 'examples-stateless', label: 'Stateless Widget' },
    { id: 'examples-stateful', label: 'Stateful Widget' },
    { id: 'examples-layout', label: 'Layout' },
    { id: 'examples-platform-channel', label: 'Platform Channel' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Terms' },
    { id: 'glossary-architecture', label: 'Architecture Terms' },
    { id: 'glossary-workflow', label: 'Workflow Terms' },
  ],
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
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="bin98-divider" />}
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
      {isLast ? null : <hr className="bin98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="bin98-divider" />}
    </section>
  )
}

export default function FlutterPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Flutter',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Flutter"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Flutter</h1>
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
    </TopicPageShell>
  )
}
