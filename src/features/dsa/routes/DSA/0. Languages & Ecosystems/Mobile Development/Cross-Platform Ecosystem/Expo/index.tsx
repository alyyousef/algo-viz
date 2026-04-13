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
  'Expo is not just a quick-start tool. In practice the Expo ecosystem includes the Expo SDK, CLI workflow, Metro integration, development builds, Expo Go, config files, config plugins, Expo Router, EAS services, update delivery, module APIs, and the surrounding conventions that make React Native app development more standardized and operationally predictable.',
  'That ecosystem framing matters because real Expo work is not only about getting a demo app running. Teams still make decisions about native ownership, package compatibility, routing, build pipelines, update strategy, permissions, environment configuration, and store release operations. Expo changes how those decisions are coordinated, not whether they exist.',
  'This page is intentionally comprehensive. It covers what Expo actually is, how it relates to React Native, managed and prebuild-style workflows, Expo Go versus development builds, the SDK and modules system, app configuration, config plugins, EAS Build, EAS Submit, EAS Update, Router, testing and debugging realities, performance tradeoffs, and the common mistakes teams make when they treat Expo as either magic or as something that only matters for beginners.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Expo is a tooling and workflow layer built around React Native. It provides a coordinated development environment, libraries, configuration model, native project generation and sync workflows, cloud services for builds and submissions, and an update delivery story that together make React Native development more standardized.',
      'The practical point is that Expo is an ecosystem, not a single package. A production Expo app usually depends on Expo CLI, the Expo SDK, Metro, app configuration, native module compatibility, development builds, and often EAS services for build and delivery operations.',
      'Expo is best understood as a productivity and operations layer over React Native. It helps teams move faster and with more consistency, but it does not remove the need to understand native mobile releases, dependency quality, or architecture decisions.',
    ],
  },
  {
    id: 'bp-why-expo-matters',
    title: 'Why Expo Matters',
    paragraphs: [
      'Expo matters because React Native projects otherwise leave many workflow decisions scattered across native tooling, community libraries, and local setup choices. Expo pulls many of those concerns into a more coherent model: one CLI, one app config surface, one development loop, one family of native modules, and optional cloud services for builds and delivery.',
      'That coherence is often the real value. Teams are not only saving setup time. They are also reducing workflow ambiguity, which makes onboarding, release automation, and routine engineering work more predictable.',
    ],
    bullets: [
      'It standardizes the development loop around React Native.',
      'It provides a large curated SDK of commonly needed native features.',
      'It reduces configuration sprawl by centralizing app metadata and native sync behavior.',
      'It offers optional hosted services for builds, submissions, and updates.',
    ],
  },
  {
    id: 'bp-how-expo-fits',
    title: 'How Expo Fits in the Stack',
    paragraphs: [
      'Expo does not replace React Native. It sits on top of React Native and shapes how teams work with it. The UI layer is still React Native. Native apps are still native Android and iOS apps. Expo changes the workflow, the module ecosystem, the project configuration model, and the operational tooling around those apps.',
      'This matters because Expo should not be framed as "not real React Native." It is a React Native ecosystem choice about standardization, native ownership boundaries, and deployment ergonomics.',
    ],
  },
  {
    id: 'bp-workflow-spectrum',
    title: 'Expo Exists on a Workflow Spectrum',
    paragraphs: [
      'Expo is not a single locked workflow. Teams can use Expo Go for quick iteration, development builds for app-specific native code, and prebuild-generated native projects when deeper native ownership is needed. That flexibility is one reason Expo now fits a wider range of projects than older summaries often suggest.',
      'The important lesson is that Expo should be evaluated as a workflow spectrum rather than as a binary beginner mode. The real question is how much native surface the team wants to own directly and how much it wants Expo to coordinate.',
    ],
  },
  {
    id: 'bp-what-it-does-not-replace',
    title: 'What Expo Does Not Replace',
    paragraphs: [
      'Expo does not remove the need for sound app architecture, state management, store compliance, testing discipline, native permission awareness, or performance profiling. It also does not guarantee that every third-party React Native library will fit cleanly into the chosen Expo workflow without evaluation.',
      'A team can still build a messy application with Expo if it treats configuration, dependencies, and release operations casually. Expo improves workflow coherence. It does not remove engineering responsibility.',
    ],
    bullets: [
      'It does not replace React Native fundamentals.',
      'It does not eliminate native-platform rules or store-release requirements.',
      'It does not make every dependency automatically compatible or wise to adopt.',
      'It does not remove the need for architecture and testing choices.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'In production, strong Expo teams usually settle on a narrow set of conventions: one app configuration pattern, one navigation strategy, a curated dependency set, clear environment handling, and an explicit decision about when native code or config plugins are acceptable. They also define which changes can go out through EAS Update and which require a new store binary.',
      'As of March 31, 2026, official Expo docs still present Expo as a broad toolchain for developing, building, updating, and shipping React Native apps. That makes primary-source documentation especially important, because older blog posts often describe Expo as far more limited than the current platform actually is.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'When evaluating Expo, the practical questions are straightforward. Does the team want a more standardized React Native workflow? Will the app benefit from Expo SDK packages and EAS services? Is there custom native code that requires development builds or prebuild? How will routing, updates, and environment configuration be handled? What is the policy for OTA-compatible versus binary-required changes?',
      'Most Expo problems come from workflow confusion, not from Expo itself. Teams get into trouble when they start in Expo without deciding how much native ownership they really need or how update and release boundaries will be governed.',
    ],
    bullets: [
      'Choose Expo when coordinated workflow is a strength, not an afterthought.',
      'Decide early whether Expo Go is enough or whether development builds are required.',
      'Treat config plugins and native changes as controlled architecture choices.',
      'Define update policy before release operations become messy.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-expo-is',
    title: 'What Expo Actually Is',
    paragraphs: [
      'Expo is a platform and toolchain for React Native development. It includes local development tooling, a curated SDK of modules, app configuration, development and build workflows, and optional cloud services for building, updating, and submitting apps.',
      'The important point is that Expo is broader than a starter template. It is a coordinated way of building and operating React Native apps.',
    ],
  },
  {
    id: 'core-react-native-relationship',
    title: 'Expo and React Native',
    paragraphs: [
      'Expo is built on top of React Native, not in competition with it. Expo apps are React Native apps. The difference is that Expo provides additional tooling, libraries, and workflow abstractions that can make development and operations more consistent.',
      'This distinction matters because teams sometimes discuss Expo as though it were a separate runtime. In practice, the right mental model is React Native plus Expo workflow layers.',
    ],
  },
  {
    id: 'core-sdk',
    title: 'The Expo SDK',
    paragraphs: [
      "The Expo SDK is a curated set of packages for common mobile capabilities such as camera access, notifications, device information, location, filesystem, constants, and more. This is one of Expo's most practical advantages because it gives teams a known family of packages designed to work within the Expo ecosystem.",
      'The SDK matters operationally as much as technically. Curated native modules reduce the need to evaluate random third-party packages for every common feature, which lowers integration uncertainty.',
    ],
  },
  {
    id: 'core-expo-go',
    title: 'Expo Go Versus Development Builds',
    paragraphs: [
      'Expo Go is a fast way to run and preview an Expo project on a device without generating a custom native app for every iteration. It is useful when the app only needs the capabilities supported by the shared Expo Go runtime.',
      'Development builds exist for the cases where Expo Go is not enough. Once the app needs custom native modules, app-specific native changes, or a more exact runtime surface, a development build becomes the more realistic workflow. This distinction is one of the most important operational concepts in Expo.',
    ],
  },
  {
    id: 'core-prebuild',
    title: 'Prebuild and Native Project Generation',
    paragraphs: [
      'Expo supports generating and syncing native Android and iOS projects from the higher-level Expo app configuration. This is commonly described through prebuild-oriented workflows. The goal is to keep native project state aligned with app configuration and plugin-driven native changes.',
      'This matters because Expo is not locked to a world where native projects do not exist. Instead, it offers a model where native projects can be generated and coordinated from a higher-level configuration surface.',
    ],
  },
  {
    id: 'core-config',
    title: 'App Configuration',
    paragraphs: [
      'Expo projects use app configuration files such as `app.json` or `app.config.ts` to define metadata, identifiers, plugins, runtime settings, icons, splash behavior, updates configuration, and platform-specific settings. This gives teams one central place to reason about app identity and configuration.',
      'That centralization is valuable because native settings and release metadata can otherwise become scattered across many files and ad hoc scripts.',
    ],
  },
  {
    id: 'core-config-plugins',
    title: 'Config Plugins',
    paragraphs: [
      'Config plugins are one of the most strategically important Expo concepts because they let packages or teams programmatically modify native project configuration during the prebuild process. This is how Expo workflows can remain high-level while still supporting native configuration needs.',
      'The engineering lesson is that config plugins are powerful, but they should be treated with discipline. A config plugin changes native project state. That means it belongs in architecture and release discussions, not only in setup notes.',
    ],
  },
  {
    id: 'core-router',
    title: 'Expo Router and Navigation',
    paragraphs: [
      'Expo Router is the file-based routing model in the Expo ecosystem. It gives teams a more opinionated navigation structure than hand-assembling every route from lower-level navigation primitives. This can improve consistency, especially in projects that benefit from a file-system-centered app structure.',
      'Routing is still architecture, not decoration. Expo Router can make route organization clearer, but the team still needs to define layouts, screen boundaries, deep linking behavior, authentication flow, and information architecture deliberately.',
    ],
  },
  {
    id: 'core-eas-build',
    title: 'EAS Build',
    paragraphs: [
      "EAS Build is Expo's build service for producing Android and iOS artifacts. It matters because native builds are often the most operationally fragile part of mobile development, and EAS Build helps standardize that process in a cloud-based, repeatable workflow.",
      'This is not only about convenience. A consistent build service can reduce machine-specific drift, simplify CI and release operations, and make build profiles explicit.',
    ],
  },
  {
    id: 'core-eas-submit',
    title: 'EAS Submit',
    paragraphs: [
      'EAS Submit handles submission workflows for shipping built artifacts toward app stores. In the Expo ecosystem, this sits naturally beside builds and updates, giving teams a more end-to-end operational path.',
      'Submission automation matters because release reliability is rarely about one dramatic failure. It is usually about reducing repetitive manual steps that cause drift and mistakes over time.',
    ],
  },
  {
    id: 'core-eas-update',
    title: 'EAS Update and Over-the-Air Delivery',
    paragraphs: [
      "EAS Update is Expo's update delivery system for shipping compatible JavaScript and asset changes to installed apps without requiring a fresh binary for every change. This is operationally powerful, but it comes with governance requirements.",
      'Teams still need a clear policy for what kinds of changes are safe and valid to deliver through updates. Anything requiring new native code or incompatible runtime changes still belongs in a new binary release. Expo makes updates easier; it does not make version boundaries disappear.',
    ],
  },
  {
    id: 'core-modules',
    title: 'Expo Modules and Native Extensions',
    paragraphs: [
      'Expo modules are the mechanism by which Expo-provided or custom native capabilities can be surfaced into the JavaScript application. This is important because Expo is not limited to a fixed set of built-in features. The ecosystem also includes patterns for building or integrating native modules when necessary.',
      'The real engineering question is not whether native code is possible. It is how much native code the team wants to own and how that ownership fits into its workflow model.',
    ],
  },
  {
    id: 'core-env-release',
    title: 'Environment Configuration and Release Channels',
    paragraphs: [
      'Real Expo apps need environment-specific behavior for development, preview, staging, and production. The Expo ecosystem provides mechanisms for build profiles, runtime configuration, and update targeting, but the team still needs a coherent environment strategy.',
      'This matters because release mistakes are often environment mistakes in disguise. A clean Expo setup should make it obvious which configuration, backend, and update path each build is using.',
    ],
  },
  {
    id: 'core-testing-debugging',
    title: 'Testing, Debugging, and Developer Experience',
    paragraphs: [
      'Expo improves developer experience through a coordinated local loop, but testing and debugging are still multi-layer concerns. Teams need to validate JavaScript behavior, navigation flows, update behavior, native module integration, and release builds.',
      'Developer experience should be evaluated honestly. Expo removes some setup friction, but production-grade confidence still requires structured testing and controlled release practices.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Workflow Tradeoffs',
    paragraphs: [
      'Expo itself does not exempt an app from React Native performance realities. Render cost, list behavior, image handling, navigation structure, and state churn still matter. Expo changes workflow ergonomics more than runtime physics.',
      'The correct mindset is pragmatic: use Expo for workflow leverage, then profile and optimize the actual app behavior where necessary.',
    ],
  },
  {
    id: 'core-common-mistakes',
    title: 'Common Expo Mistakes',
    paragraphs: [
      'Common mistakes include assuming Expo Go proves the whole production architecture is sound, treating EAS Update as a replacement for release discipline, adding incompatible libraries without evaluating workflow fit, and leaving config plugin behavior poorly understood.',
      "Another recurring mistake is talking about Expo as either magic or as useless for serious apps. In reality, Expo is a set of workflow choices. It is powerful when those choices match the team's needs and weak when adopted without clarity.",
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-app-config',
    title: 'App Configuration as a Central Surface',
    description: [
      'Expo encourages a centralized app configuration model instead of scattering identity and metadata decisions across many unrelated files.',
    ],
    code: `export default {
  expo: {
    name: 'FieldOps',
    slug: 'field-ops',
    ios: { bundleIdentifier: 'com.example.fieldops' },
    android: { package: 'com.example.fieldops' },
  },
}`,
    notes: [
      'This configuration surface is part of the ecosystem value, not only setup boilerplate.',
      'It becomes especially important as builds, updates, and store releases mature.',
    ],
  },
  {
    id: 'examples-expo-go-vs-dev-build',
    title: 'Expo Go Versus Development Build Thinking',
    description: [
      'The workflow choice depends on whether the shared Expo runtime is enough or whether the app needs custom native behavior.',
    ],
    code: `if app uses only supported Expo runtime features:
  Expo Go can be enough for iteration

if app needs custom native modules or app-specific native changes:
  use a development build`,
    notes: [
      'This is a workflow boundary, not merely a convenience preference.',
      'Teams should decide this early instead of discovering it late through broken assumptions.',
    ],
  },
  {
    id: 'examples-router',
    title: 'Expo Router as File-Based Navigation',
    description: [
      'Expo Router turns file structure into a routing surface, which can simplify navigation organization.',
    ],
    code: `app/
  _layout.tsx
  index.tsx
  settings.tsx
  profile/
    [id].tsx`,
    notes: [
      'File-based routing can improve legibility when the app structure is kept disciplined.',
      'The team still needs to design layouts, auth boundaries, and deep linking intentionally.',
    ],
  },
  {
    id: 'examples-build-profile',
    title: 'Build Profiles as Operational Policy',
    description: [
      'Expo workflows become more maintainable when build intent is made explicit through profiles.',
    ],
    code: `{
  "build": {
    "preview": { "distribution": "internal" },
    "production": {}
  }
}`,
    notes: [
      'Build profiles help separate preview, staging, and production behavior.',
      'This is an operations boundary, not just CI decoration.',
    ],
  },
  {
    id: 'examples-update-model',
    title: 'Binary Release Versus OTA Update',
    description: [
      'Expo makes it easier to separate update-compatible changes from binary-required changes, but the team still has to govern that boundary.',
    ],
    code: `native code or runtime incompatibility
  -> new binary release

JavaScript and compatible assets
  -> EAS Update when policy allows`,
    notes: [
      'This distinction is essential to safe mobile operations.',
      'Without a clear policy, OTA updates become a source of confusion rather than leverage.',
    ],
  },
  {
    id: 'examples-config-plugin',
    title: 'Config Plugin as Native Configuration Automation',
    description: [
      'Config plugins let Expo workflows express native configuration changes at a higher level.',
    ],
    code: `plugins: [
  [
    'expo-build-properties',
    {
      android: { compileSdkVersion: 35 }
    }
  ]
]`,
    notes: [
      'A config plugin is not a decorative dependency. It changes native project state.',
      'That is why it belongs in architecture and release review.',
    ],
  },
  {
    id: 'examples-eas-cli',
    title: 'EAS as the Release Surface',
    description: [
      'Expo operational workflows often converge around EAS commands for build, submit, and update steps.',
    ],
    code: `eas build --platform android
eas submit --platform android
eas update --branch production`,
    notes: [
      'These commands illustrate that Expo is as much an operations layer as a development layer.',
      'Builds, submissions, and updates should be treated as part of the app architecture.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Expo Terms',
    terms: [
      {
        term: 'Expo',
        definition:
          'A React Native toolchain and ecosystem that provides coordinated local tooling, SDK packages, configuration, and delivery workflows.',
      },
      {
        term: 'Expo SDK',
        definition:
          'The curated family of Expo packages that expose common mobile capabilities and APIs.',
      },
      {
        term: 'Expo Go',
        definition:
          'A shared client app used to preview and develop certain Expo apps without creating a custom native build each time.',
      },
      {
        term: 'Development build',
        definition:
          'A custom native development app for an Expo project when Expo Go is not sufficient.',
      },
      {
        term: 'Prebuild',
        definition:
          'The generation or synchronization of native Android and iOS projects from higher-level Expo configuration.',
      },
      {
        term: 'Config plugin',
        definition:
          'A programmable way to modify native project configuration during Expo prebuild workflows.',
      },
      {
        term: 'Expo Router',
        definition:
          'Expo’s file-based routing system for organizing navigation and screen structure.',
      },
      {
        term: 'Expo module',
        definition:
          'A native or cross-platform module surfaced through Expo-compatible APIs and workflows.',
      },
    ],
  },
  {
    id: 'glossary-workflow',
    title: 'Workflow and Delivery Terms',
    terms: [
      {
        term: 'EAS Build',
        definition:
          'Expo’s build service for creating Android and iOS artifacts in a standardized workflow.',
      },
      {
        term: 'EAS Submit',
        definition:
          'Expo’s submission service for automating store-submission steps after builds are produced.',
      },
      {
        term: 'EAS Update',
        definition: 'Expo’s update-delivery system for compatible JavaScript and asset changes.',
      },
      {
        term: 'Build profile',
        definition:
          'A named build configuration that defines how a particular Expo build should be produced.',
      },
      {
        term: 'Branch',
        definition:
          'An update-targeting concept used to direct compatible EAS updates to the right installed builds.',
      },
      {
        term: 'Runtime version',
        definition:
          'A compatibility identifier used to determine which updates are valid for which native binaries.',
      },
      {
        term: 'App config',
        definition:
          'The central Expo configuration surface in files such as `app.json` or `app.config.ts`.',
      },
      {
        term: 'Development loop',
        definition:
          'The repeated cycle of coding, running, debugging, and validating an Expo app locally.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture and Product Terms',
    terms: [
      {
        term: 'Native ownership',
        definition:
          'The degree to which a team directly manages native Android or iOS project details and code.',
      },
      {
        term: 'Workflow fit',
        definition:
          'Whether Expo’s abstractions and services match the product’s operational and technical needs.',
      },
      {
        term: 'OTA update',
        definition:
          'An over-the-air delivery of compatible JavaScript or asset changes to installed apps.',
      },
      {
        term: 'Binary release',
        definition: 'A native app package distributed through the App Store or Google Play.',
      },
      {
        term: 'Dependency discipline',
        definition:
          'The practice of selecting libraries carefully instead of accumulating incompatible or weak dependencies.',
      },
      {
        term: 'Release governance',
        definition:
          'The rules and process that determine how builds, submissions, and updates are approved and shipped.',
      },
      {
        term: 'Environment strategy',
        definition:
          'The plan for separating development, preview, staging, and production behavior.',
      },
      {
        term: 'Curated SDK',
        definition:
          'A family of supported packages maintained as part of a coordinated platform rather than as unrelated utilities.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-expo-matters', label: 'Why Expo Matters' },
    { id: 'bp-how-expo-fits', label: 'How Expo Fits' },
    { id: 'bp-workflow-spectrum', label: 'Workflow Spectrum' },
    { id: 'bp-what-it-does-not-replace', label: 'What It Does Not Replace' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-what-expo-is', label: 'What Expo Is' },
    { id: 'core-react-native-relationship', label: 'Expo and React Native' },
    { id: 'core-sdk', label: 'Expo SDK' },
    { id: 'core-expo-go', label: 'Expo Go and Development Builds' },
    { id: 'core-prebuild', label: 'Prebuild' },
    { id: 'core-config', label: 'App Configuration' },
    { id: 'core-config-plugins', label: 'Config Plugins' },
    { id: 'core-router', label: 'Expo Router' },
    { id: 'core-eas-build', label: 'EAS Build' },
    { id: 'core-eas-submit', label: 'EAS Submit' },
    { id: 'core-eas-update', label: 'EAS Update' },
    { id: 'core-modules', label: 'Modules and Native Extensions' },
    { id: 'core-env-release', label: 'Environments and Release Channels' },
    { id: 'core-testing-debugging', label: 'Testing and Debugging' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-common-mistakes', label: 'Common Mistakes' },
  ],
  examples: [
    { id: 'examples-app-config', label: 'App Config' },
    { id: 'examples-expo-go-vs-dev-build', label: 'Expo Go Versus Dev Build' },
    { id: 'examples-router', label: 'Expo Router' },
    { id: 'examples-build-profile', label: 'Build Profiles' },
    { id: 'examples-update-model', label: 'Update Model' },
    { id: 'examples-config-plugin', label: 'Config Plugin' },
    { id: 'examples-eas-cli', label: 'EAS Commands' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Terms' },
    { id: 'glossary-workflow', label: 'Workflow Terms' },
    { id: 'glossary-architecture', label: 'Architecture Terms' },
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

export default function ExpoPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Expo',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Expo"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Expo</h1>
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
