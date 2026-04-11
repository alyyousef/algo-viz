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
  'React Native is Metas cross-platform framework for building mobile applications with JavaScript or TypeScript, React, and native platform rendering. The key point is that it is not a webview shell. React Native maps React components onto native platform views and platform APIs, which is why it sits in a different category from browser-wrapped mobile stacks.',
  'Its value proposition has always been familiar React development for mobile products, strong code sharing between iOS and Android, and the option to reach native capabilities when the default framework surface is not enough. For teams already invested in React, JavaScript, or TypeScript, that makes it one of the most natural ways to enter native-targeting mobile development without switching ecosystems completely.',
  'The architecture story is now central rather than optional. As of April 3, 2026, React Native is firmly in the New Architecture era. The React Native 0.82 release on October 8, 2025 made the framework New Architecture only, and the React Native 0.84 release on February 11, 2026 made Hermes V1 the default JavaScript engine. Those dates matter because older mental models built around the legacy bridge are no longer enough for understanding current React Native direction.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'React Native lets developers use React to build mobile interfaces that render through native platform components. Instead of shipping a browser inside the application and rendering HTML, React Native provides core components such as View, Text, Image, ScrollView, and TextInput that correspond to native mobile concepts.',
      'That distinction is why React Native often sits between fully native development and web-first hybrid approaches. It shares a lot with React on the component and state side, but it is still fundamentally mobile application development with platform-specific runtime behavior, packaging, permissions, store release obligations, and native integration boundaries.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why React Native Matters',
    paragraphs: [
      'React Native matters because it gives React teams a direct path into mobile development using familiar component thinking, hooks, declarative UI, and JavaScript or TypeScript tooling. That lowers the conceptual and hiring barrier for organizations already comfortable with React on the web.',
      'It also matters because it does not pretend the native platforms do not exist. React Native works precisely because it can render native UI and call native capabilities. The engineering tradeoff is not whether native exists. The tradeoff is how much of the app can be shared while keeping the user experience and platform integration strong enough.',
    ],
    bullets: [
      'Strong overlap with the React mental model.',
      'Large code-sharing potential across iOS and Android.',
      'Native rendering instead of browser-wrapper rendering.',
      'Practical access to native code when required.',
    ],
  },
  {
    id: 'bp-new-architecture',
    title: 'The New Architecture Era',
    paragraphs: [
      'React Native has moved decisively into the New Architecture era. The official React Native blog states that version 0.82, released on October 8, 2025, is the first React Native that runs entirely on the New Architecture. Earlier versions allowed partial transition periods, but current framework direction assumes Fabric, TurboModules, and the newer internals rather than the old bridge-first mental model.',
      'This is an important shift because many older tutorials and blog posts still explain React Native as if the legacy bridge were the primary architecture. That is now incomplete. Modern React Native performance, concurrency compatibility, native integration strategy, and library ecosystem expectations are increasingly tied to the New Architecture.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where React Native Fits Best',
    paragraphs: [
      'React Native is strongest for teams that already think in React and want a single product team to deliver iOS and Android apps with substantial shared code. It is also strong when the product relies heavily on standard application screens, lists, forms, data fetching, authenticated flows, and common mobile patterns that do not demand fully bespoke platform-specific UI behavior everywhere.',
      'It is less ideal when the product is dominated by deeply specialized platform UI, heavy native graphics pipelines, unusually low-level OS integration, or a team that does not actually want to operate in the JavaScript and React ecosystem. Framework fit matters as much as capability lists.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'Production React Native apps are never only JavaScript. They also involve Xcode, Android Gradle builds, provisioning, permissions, build variants, release signing, native dependency integration, and device-specific testing. Metro, bundling, Hermes, and the JavaScript layer are only part of the real system.',
      'Good React Native teams therefore avoid two opposite mistakes. One mistake is pretending the app is basically a website. The other is pretending all shared code is suspect and should be abandoned quickly. The practical middle ground is disciplined sharing with clear native escape hatches when the product truly needs them.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-component-model',
    title: 'Component Model and Core Components',
    paragraphs: [
      'React Native uses the React component model, but its host components are mobile-specific. The official documentation highlights core components such as View, Text, Image, ScrollView, and TextInput. These are the building blocks developers use most often to construct mobile screens.',
      'The practical lesson is that React Native is not DOM development with different CSS. You are still using React components and props, but the rendered targets are native mobile components with mobile layout rules, accessibility concerns, gestures, and platform behaviors.',
    ],
  },
  {
    id: 'core-styling-layout',
    title: 'Styling and Layout',
    paragraphs: [
      'Layout in React Native is primarily Flexbox-based, and styling is expressed through JavaScript objects and StyleSheet helpers rather than browser CSS files. This keeps styling close to the component tree, but it also means teams need to be deliberate about style organization, theme tokens, spacing systems, and reusable primitives.',
      'Developers coming from the web often need to reorient here. There is overlap with CSS mental models, but not full equivalence. React Native layout and text behavior should be learned as its own platform layer rather than treated as browser CSS with a few renamed properties.',
    ],
  },
  {
    id: 'core-state-data-flow',
    title: 'State, Data Flow, and React Semantics',
    paragraphs: [
      'React Native inherits Reacts state and rendering model. Hooks, state ownership, props, effects, and composition remain central. That is one of the frameworks biggest strengths because mobile teams can reuse not only libraries and code patterns, but also a well-developed mental model for component composition and state transitions.',
      'That said, mobile state still needs mobile discipline. Navigation state, screen focus, background and foreground lifecycle, network variability, local persistence, and offline tolerance all place demands on app state architecture that are easy to underestimate if a team thinks only in browser-page terms.',
    ],
  },
  {
    id: 'core-navigation',
    title: 'Navigation as an App Concern',
    paragraphs: [
      'Navigation is not built into React Native core in the same way as primitive components. In practice, teams commonly use ecosystem libraries for screen stacks, tabs, drawers, deep links, and restoration. This matters because routing in a mobile app is more than switching views. It includes back behavior, nested flows, linking, modal presentation, tab persistence, and OS-level expectations.',
      'A React Native codebase is usually healthier when navigation is treated as an explicit architectural concern rather than scattered through event handlers and ad hoc conditional rendering. Good routing structure often determines whether a large app remains understandable after several product cycles.',
    ],
  },
  {
    id: 'core-metro-hermes',
    title: 'Metro and Hermes',
    paragraphs: [
      'Metro is the JavaScript bundler commonly associated with React Native development. It handles bundling, transforms, development iteration, and asset integration. Hermes is the JavaScript engine optimized for React Native. The official React Native documentation states that Hermes is used by default and that it can improve startup time, memory usage, and app size for many applications.',
      'This is not just tooling trivia. Bundling and runtime characteristics influence startup speed, debugging behavior, build pipelines, and library compatibility. As of the React Native 0.84 release on February 11, 2026, Hermes V1 became the default engine, which means current React Native performance expectations are increasingly framed around Hermes rather than older engine assumptions.',
    ],
  },
  {
    id: 'core-fabric-turbomodules',
    title: 'Fabric, TurboModules, and the New Architecture',
    paragraphs: [
      'The New Architecture introduces Fabric for rendering and TurboModules for native module interaction. The React Native architecture docs explain these as part of the shift away from the older bridge-centered design. For app developers, the key takeaway is not every internal detail, but that current React Native is moving toward a more direct, modern, and concurrency-friendly integration model.',
      'This matters because library compatibility, performance work, upgrade strategy, and native customization now increasingly assume the New Architecture. Teams maintaining old assumptions about the bridge as the permanent core of React Native will make worse decisions about upgrades and architectural boundaries.',
    ],
  },
  {
    id: 'core-native-interop',
    title: 'Native Modules and Native Components',
    paragraphs: [
      'React Native includes explicit native escape hatches. When JavaScript cannot access a required capability or when performance-sensitive logic needs native implementation, developers can write native modules and native components. The legacy native-module documentation makes clear that native integration is essential for capabilities such as platform APIs, existing Objective-C, Swift, Java, Kotlin, or C++ code reuse, and specialized functionality.',
      'In the modern direction of the framework, those ideas increasingly map onto TurboModules and Fabric-native components. The architectural principle stays the same: shared JavaScript for broad product logic, native code when real platform boundaries require it.',
    ],
  },
  {
    id: 'core-platform-specific',
    title: 'Platform-Specific Code',
    paragraphs: [
      'React Native supports platform-specific files, platform checks, and per-platform customizations. This is not a design failure. It is an acknowledgement that iOS and Android remain different operating systems with different APIs, different UI expectations, and different platform conventions.',
      'Healthy React Native teams use these escape hatches intentionally. They share what should be shared, but they do not force complete sameness where the product clearly benefits from native divergence.',
    ],
  },
  {
    id: 'core-testing-debugging',
    title: 'Testing and Debugging',
    paragraphs: [
      'Testing React Native requires more than rendering components in isolation. Unit tests, component tests, emulator and simulator runs, device validation, release-build checks, and native-side diagnostics all matter. Debugging also spans JavaScript, native builds, Metro, runtime engines, and platform-specific issues.',
      'The main operational lesson is that React Native development is full-stack mobile development in a smaller language surface, not a way to avoid mobile engineering entirely.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Thinking',
    paragraphs: [
      'Real React Native performance work centers on rendering frequency, list virtualization, image handling, state churn, memoization discipline, expensive bridge or module boundaries where relevant, animation strategy, startup work, and native-side inefficiencies. The New Architecture changes some internals, but it does not eliminate the need for profiling and measurement.',
      'The most productive teams profile real bottlenecks instead of arguing from slogans like React Native is slow or React Native is basically native. Performance depends heavily on app shape, architectural quality, and how much native customization the product actually requires.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-core-components',
    title: 'Core Components and Styling',
    description: [
      'This is the everyday React Native shape: compose core components, apply StyleSheet-defined styles, and keep the interface in ordinary React components.',
    ],
    code: `import { View, Text, StyleSheet } from 'react-native'

export function WelcomeCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>React Native</Text>
      <Text style={styles.body}>Native rendering with React components.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 12, backgroundColor: '#ffffff' },
  title: { fontSize: 20, fontWeight: '700' },
  body: { marginTop: 8, fontSize: 14 },
})`,
    notes: [
      'Core layout and text work through React Native components, not DOM tags.',
      'Styles live in JavaScript objects rather than browser CSS stylesheets.',
    ],
  },
  {
    id: 'examples-state',
    title: 'State with Hooks',
    description: [
      'React semantics remain central. State is local, effects are explicit, and the UI is derived from current state.',
    ],
    code: `import { useState } from 'react'
import { Button, Text, View } from 'react-native'

export function CounterScreen() {
  const [count, setCount] = useState(0)

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount((value) => value + 1)} />
    </View>
  )
}`,
    notes: [
      'This is ordinary React state flow applied to native mobile UI.',
      'The important discipline is still state ownership and predictable updates.',
    ],
  },
  {
    id: 'examples-platform',
    title: 'Platform-Specific Branching',
    description: [
      'Platform-specific behavior is normal in React Native when the user experience or API surface genuinely differs by OS.',
    ],
    code: `import { Platform, Text } from 'react-native'

export function PlatformLabel() {
  return (
    <Text>
      {Platform.OS === 'ios' ? 'Running on iOS' : 'Running on Android'}
    </Text>
  )
}`,
    notes: [
      'Cross-platform does not mean identical code everywhere.',
      'Use platform branching deliberately rather than letting it spread chaotically.',
    ],
  },
  {
    id: 'examples-native-module',
    title: 'Native Module Boundary',
    description: [
      'When the JavaScript layer does not provide the capability you need, native boundaries become part of the real app architecture.',
    ],
    code: `import { NativeModules } from 'react-native'

const { DeviceInfoModule } = NativeModules

export async function readDeviceName() {
  return DeviceInfoModule.getDeviceName()
}`,
    notes: [
      'Modern apps increasingly think in TurboModule terms, but the architectural boundary remains the same.',
      'This is how React Native keeps access to the native platform open instead of pretending the JS layer can do everything.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core React Native Terms',
    terms: [
      {
        term: 'React Native',
        definition:
          'A framework for building native mobile apps with React and JavaScript or TypeScript.',
      },
      {
        term: 'Core Components',
        definition:
          'Built-in React Native components such as View, Text, Image, ScrollView, and TextInput.',
      },
      {
        term: 'Metro',
        definition:
          'The JavaScript bundler commonly used by React Native during development and build workflows.',
      },
      {
        term: 'Hermes',
        definition:
          'The JavaScript engine optimized for React Native and used by default in current releases.',
      },
      {
        term: 'Fabric',
        definition: 'The rendering system associated with the React Native New Architecture.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture Terms',
    terms: [
      {
        term: 'TurboModule',
        definition:
          'The New Architecture native-module system that succeeds older native-module patterns.',
      },
      {
        term: 'New Architecture',
        definition:
          'The current React Native architectural direction built around newer rendering and module systems instead of the old bridge-first model.',
      },
      {
        term: 'Native Component',
        definition: 'A platform-native UI component exposed to React Native applications.',
      },
      {
        term: 'Bridge',
        definition:
          'The older React Native communication model that dominated legacy architectural explanations.',
      },
      {
        term: 'Platform-specific code',
        definition:
          'Code intentionally written for iOS or Android when product or API differences require it.',
      },
    ],
  },
  {
    id: 'glossary-operations',
    title: 'Workflow and Operations Terms',
    terms: [
      {
        term: 'Bundle',
        definition: 'The packaged JavaScript output that the React Native runtime loads.',
      },
      {
        term: 'Simulator or emulator',
        definition: 'A virtual device environment for running and testing a mobile application.',
      },
      {
        term: 'Signing',
        definition:
          'The platform-specific process required for release builds and store submission.',
      },
      {
        term: 'List virtualization',
        definition:
          'A rendering strategy that only mounts visible list items to improve performance.',
      },
      {
        term: 'Interop',
        definition:
          'The boundary where React Native code interacts with platform-native code or views.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-it-matters', label: 'Why It Matters' },
    { id: 'bp-new-architecture', label: 'New Architecture' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-production-reality', label: 'Production Reality' },
  ],
  'core-concepts': [
    { id: 'core-component-model', label: 'Component Model' },
    { id: 'core-styling-layout', label: 'Styling and Layout' },
    { id: 'core-state-data-flow', label: 'State and Data Flow' },
    { id: 'core-navigation', label: 'Navigation' },
    { id: 'core-metro-hermes', label: 'Metro and Hermes' },
    { id: 'core-fabric-turbomodules', label: 'Fabric and TurboModules' },
    { id: 'core-native-interop', label: 'Native Interop' },
    { id: 'core-platform-specific', label: 'Platform-Specific Code' },
    { id: 'core-testing-debugging', label: 'Testing and Debugging' },
    { id: 'core-performance', label: 'Performance' },
  ],
  examples: [
    { id: 'examples-core-components', label: 'Core Components' },
    { id: 'examples-state', label: 'Hooks and State' },
    { id: 'examples-platform', label: 'Platform Branching' },
    { id: 'examples-native-module', label: 'Native Module' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Terms' },
    { id: 'glossary-architecture', label: 'Architecture Terms' },
    { id: 'glossary-operations', label: 'Workflow Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="react-native-help-section">
      <h2 className="react-native-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="react-native-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="react-native-help-section">
      <h2 className="react-native-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="react-native-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="react-native-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="react-native-help-section">
      <h2 className="react-native-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="react-native-help-divider" />}
    </section>
  )
}

export default function ReactNativePage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'React Native',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="React Native"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">React Native</h1>
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
