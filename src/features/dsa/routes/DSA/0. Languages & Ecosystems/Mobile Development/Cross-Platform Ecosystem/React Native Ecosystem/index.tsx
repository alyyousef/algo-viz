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
  'React Native is not just a library for writing mobile UI with React. In practice it is an ecosystem that includes the React Native runtime itself, Metro bundling, JavaScript engines such as Hermes, native platform integration for iOS and Android, navigation libraries, state tools, build workflows, Expo-based tooling, testing options, and release pipelines.',
  'That ecosystem framing matters because real React Native work is rarely about only `View`, `Text`, and hooks. Teams make strategic choices about Expo versus a more direct native workflow, how much native code they are willing to own, what navigation stack to use, how updates are delivered, what debugging path they rely on, and how much platform divergence they can tolerate.',
  'This page is intentionally comprehensive. It covers what the React Native ecosystem actually consists of, how React Native relates to native platforms, the role of Metro and Hermes, Expo workflows, the current architecture direction, native modules, navigation, state management, build and release concerns, testing, performance, and the common mistakes teams make when they talk about React Native as if it were one small package instead of a full cross-platform delivery stack.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'The React Native ecosystem is the set of tools, runtimes, libraries, native integrations, and workflows used to build mobile applications with React and JavaScript or TypeScript while still shipping native Android and iOS apps. The core framework is only one piece of that system.',
      'A production React Native app usually depends on multiple layers: React, React Native, Metro, a JavaScript engine such as Hermes, native platform projects, navigation libraries, state tools, some kind of build pipeline, and often Expo or Expo-adjacent tooling. That is why ecosystem thinking matters more than framework branding alone.',
      "The real engineering question is not merely whether React Native can render UI. It is whether the whole surrounding stack fits the team's product, native integration needs, release discipline, and performance constraints.",
    ],
  },
  {
    id: 'bp-why-ecosystem-matters',
    title: 'Why the Ecosystem Framing Matters',
    paragraphs: [
      'Many discussions about React Native are too shallow because they treat it as one library versus another library. In practice, shipping React Native means choosing how JavaScript interacts with native code, how navigation is handled, what build and deployment workflow is used, and how much platform-specific code the team is willing to own.',
      'The ecosystem framing is what makes React Native realistic. A team can start simple, but over time it will still have to make choices about bundling, testing, native integrations, updates, debugging, release tooling, and platform divergence.',
    ],
    bullets: [
      'Framework choice does not eliminate workflow choice.',
      'Navigation, state, updates, and native modules are part of the real stack.',
      'Expo and non-Expo workflows create different tradeoffs.',
      'Native ownership still exists even in a cross-platform codebase.',
    ],
  },
  {
    id: 'bp-how-it-fits',
    title: 'Where React Native Fits',
    paragraphs: [
      'React Native is strongest when a team wants substantial code sharing across iOS and Android while still keeping access to native capabilities. It is a particularly natural fit for teams that already think in React concepts and are comfortable with JavaScript or TypeScript application architecture.',
      'It can be used for full mobile products or incrementally embedded into existing native apps. That flexibility is one reason the ecosystem is broader than many people expect.',
    ],
  },
  {
    id: 'bp-expo-and-bare',
    title: 'Expo Workflow Versus Direct Native Ownership',
    paragraphs: [
      'A major ecosystem decision is whether to lean into Expo tooling and its managed or prebuild-oriented workflows, or to work more directly with the native iOS and Android projects. Expo can reduce setup friction and standardize common tasks, while direct native ownership can provide more explicit control.',
      'This is not a simple beginner-versus-advanced split. It is an operational choice about how much native surface area the team wants to manage itself and how much it wants the ecosystem tooling to coordinate.',
    ],
  },
  {
    id: 'bp-what-it-does-not-replace',
    title: 'What React Native Does Not Replace',
    paragraphs: [
      'React Native does not remove the need to understand mobile product design, app state, release operations, performance profiling, or native platform constraints. It also does not magically unify all behavior between Android and iOS. Cross-platform does not mean identical-platform.',
      'The ecosystem can accelerate delivery, but it does not eliminate engineering tradeoffs. Native modules, permissions, background behavior, store rules, device differences, and performance-sensitive surfaces still matter.',
    ],
    bullets: [
      'It does not replace native platform knowledge.',
      'It does not make all mobile behavior identical.',
      'It does not remove the need for release and testing discipline.',
      'It does not replace product architecture with tooling.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'In production, React Native teams usually stabilize around a curated ecosystem. They choose a navigation solution, a release workflow, a state strategy, a debugging path, and a native integration policy. The best teams reduce randomness rather than adding every popular package they find.',
      'As of March 31, 2026, official React Native and Expo documentation also reflect a platform that is still evolving in architecture and tooling. That makes primary-source documentation especially important, because older blog posts often describe stack assumptions that are no longer current.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      "When evaluating the React Native ecosystem for a product, the useful questions are practical. How much code sharing is desired? How much native code will the app need? Does Expo fit the team's release model? Which navigation and state tools are acceptable? How will builds, OTA updates if any, store releases, and monitoring be handled?",
      'Most React Native failures come from fuzzy ownership rather than from the framework itself. Teams get into trouble when they adopt React Native without choosing the surrounding ecosystem intentionally.',
    ],
    bullets: [
      'Choose the workflow model deliberately.',
      'Keep the ecosystem small and intentional.',
      'Plan for native boundaries early.',
      'Treat release, debugging, and performance as first-class concerns.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-rn-is',
    title: 'What React Native Actually Is',
    paragraphs: [
      'React Native is a framework for building native mobile apps using React. Developers describe UI with React components and JavaScript or TypeScript, while the runtime coordinates rendering and interaction with native platform capabilities.',
      'The key point is that React Native is not a web view approach. It is a native app approach with a JavaScript-driven application layer and explicit pathways into native code.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Architecture Direction and Native Integration',
    paragraphs: [
      'A major part of the modern React Native ecosystem is its architecture direction around stronger native integration and improved rendering and module pathways. Teams need to understand this because ecosystem packages, migration guidance, and performance characteristics are tied to the architecture underneath.',
      'The practical lesson is that React Native architecture is not academic. It affects how JavaScript and native layers communicate, how third-party libraries evolve, and how future upgrades feel.',
    ],
  },
  {
    id: 'core-hermes',
    title: 'Hermes and the JavaScript Runtime',
    paragraphs: [
      'Hermes is the JavaScript engine commonly associated with modern React Native workflows. The engine matters because application startup, runtime behavior, and debugging or profiling workflows are partly shaped by the JavaScript runtime choice.',
      'For most teams, Hermes is not something they think about every hour, but it is absolutely part of the ecosystem stack. Performance conversations in React Native often quietly depend on what the runtime is doing underneath.',
    ],
  },
  {
    id: 'core-metro',
    title: 'Metro and the Bundling Layer',
    paragraphs: [
      'Metro is the JavaScript bundler used by React Native. It transforms and serves the application bundle during development and contributes to how code is packaged for mobile distribution.',
      'This is important because React Native development behavior, fast refresh, module resolution, and parts of the developer experience are all shaped by Metro. Bundler behavior is part of the framework experience, not an unrelated implementation detail.',
    ],
  },
  {
    id: 'core-expo',
    title: 'Expo as an Ecosystem Layer',
    paragraphs: [
      'Expo adds a major ecosystem layer on top of React Native by providing tooling, services, libraries, and workflows that can simplify development, builds, updates, and project setup. It is best understood as an opinionated productivity layer rather than as a completely separate platform.',
      "Teams should evaluate Expo based on workflow fit. The question is not whether Expo is real React Native. The question is whether its workflow model and abstractions match the app's native ownership needs and release process.",
    ],
  },
  {
    id: 'core-workflows',
    title: 'Managed, Prebuild, and Native Workflows',
    paragraphs: [
      'React Native teams can work across a spectrum of workflow ownership. At one end, tooling can manage much of the native project setup. At the other end, teams work directly with Android and iOS native projects. Many real teams land in the middle, using higher-level tooling while still accepting some native ownership.',
      'This is one of the most important ecosystem choices because it changes onboarding, release automation, debugging, package selection, and the shape of native escape hatches.',
    ],
  },
  {
    id: 'core-navigation',
    title: 'Navigation as a First-Class Ecosystem Choice',
    paragraphs: [
      'Navigation is not built into React Native in the same way routing is built into some web stacks. Most teams use ecosystem libraries such as React Navigation. That makes navigation architecture a deliberate dependency decision rather than an automatic default.',
      'This matters because screen structure, deep linking, params, tab patterns, stack behavior, and platform feel are all strongly influenced by the navigation solution the team adopts.',
    ],
  },
  {
    id: 'core-state',
    title: 'State Management and Data Flow',
    paragraphs: [
      'React Native itself does not enforce a single state management model. Teams often use React state, context, server-state libraries, or broader state systems depending on app complexity. This flexibility is powerful, but it also means the surrounding architecture must be chosen deliberately.',
      'The healthiest React Native codebases usually keep state strategy boring and explicit. Too many global abstractions can make cross-platform debugging significantly harder than it needs to be.',
    ],
  },
  {
    id: 'core-styling-layout',
    title: 'Styling, Layout, and Platform Feel',
    paragraphs: [
      'React Native uses a styling and layout model that is related to web concepts but not identical to browser CSS. The ecosystem also includes component libraries and design-system layers that help teams standardize UI.',
      'Platform feel still matters. Even with high shared code, Android and iOS interactions are not identical, and ecosystem decisions about components or navigation should respect that reality.',
    ],
  },
  {
    id: 'core-native-modules',
    title: 'Native Modules and Platform Escape Hatches',
    paragraphs: [
      'Any serious React Native ecosystem discussion must include native modules and native UI components. Real apps eventually need platform-specific capabilities, third-party SDK integration, or custom native behavior that is not fully solved in pure JavaScript.',
      'The key engineering lesson is that native escape hatches are a feature, not a failure. The question is how often the team needs them and whether the chosen workflow makes them maintainable.',
    ],
  },
  {
    id: 'core-build-release',
    title: 'Builds, Releases, and Update Workflows',
    paragraphs: [
      'React Native ecosystem choices affect how apps are built and delivered. Teams need a plan for native builds, store releases, environment configuration, and in some cases over-the-air update workflows. These operational choices matter as much as UI code choices.',
      'A cross-platform stack still results in native app binaries that must satisfy Android and iOS platform requirements. That means release operations remain very real even when much of the app logic is shared.',
    ],
  },
  {
    id: 'core-testing-debugging',
    title: 'Testing, Debugging, and Developer Experience',
    paragraphs: [
      'Testing and debugging in React Native span JavaScript and native boundaries. The ecosystem includes options for component testing, end-to-end testing, logs, dev menus, fast refresh, and profiling workflows. Teams should treat this as part of architecture, not as optional tooling decoration.',
      'The same is true for developer experience. Metro behavior, emulator or simulator setup, native build health, and editor tooling all shape how productive the team actually is.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Cross-Platform Tradeoffs',
    paragraphs: [
      'React Native can perform well, but performance work is real engineering work. Large re-render trees, expensive lists, unnecessary bridges to native layers, animation choices, startup cost, and state churn can all hurt the product.',
      'The right mindset is pragmatic: measure where the app is slow, understand whether the issue is JavaScript-side, rendering-side, or native integration-side, and optimize the actual bottleneck rather than repeating broad framework myths.',
    ],
  },
  {
    id: 'core-common-mistakes',
    title: 'Common React Native Ecosystem Mistakes',
    paragraphs: [
      'Common mistakes include treating Expo and React Native as mutually hostile camps, assuming cross-platform means no platform knowledge is needed, piling on too many libraries without ecosystem discipline, and leaving native integration strategy undecided until a late-stage blocker appears.',
      'Another recurring mistake is blaming React Native for problems that are actually architecture or release-process problems. Many cross-platform failures come from weak state management, weak ownership, or weak deployment discipline rather than from rendering technology alone.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-basic-screen',
    title: 'A Basic React Native Screen',
    description: [
      'At the framework level, React Native still starts with React components that render native UI primitives.',
    ],
    code: `export function WelcomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Welcome</Text>
      <Text>Shared React code, native mobile runtime.</Text>
    </View>
  )
}`,
    notes: [
      'The example is simple on purpose: the framework layer is only the beginning of the ecosystem.',
      'Real apps then layer navigation, state, native integration, and release workflow on top.',
    ],
  },
  {
    id: 'examples-platform-select',
    title: 'Platform-Specific Branching',
    description: [
      'Shared code does not eliminate platform-specific behavior. The ecosystem expects some differences to remain explicit.',
    ],
    code: `const label = Platform.select({
  ios: 'Open in Settings',
  android: 'Open Android Settings',
  default: 'Open Settings',
})`,
    notes: [
      'Platform branching is normal when interaction or wording should differ.',
      'The goal is intentional divergence, not accidental inconsistency.',
    ],
  },
  {
    id: 'examples-navigation',
    title: 'Navigation with an Ecosystem Library',
    description: [
      'Navigation usually comes from ecosystem libraries rather than from React Native core itself.',
    ],
    code: `const Stack = createNativeStackNavigator()

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}`,
    notes: [
      'This is why ecosystem choice matters: routing is a library decision, not an automatic built-in.',
      'Screen architecture is strongly shaped by the chosen navigation stack.',
    ],
  },
  {
    id: 'examples-expo-config',
    title: 'Expo Configuration as Workflow Surface',
    description: [
      'Expo-related configuration is part of the ecosystem layer, not part of React Native core.',
    ],
    code: `export default {
  expo: {
    name: 'SampleApp',
    slug: 'sample-app',
    ios: { bundleIdentifier: 'com.example.sample' },
    android: { package: 'com.example.sample' },
  },
}`,
    notes: [
      'This illustrates how workflow tooling can centralize mobile project configuration.',
      'Choosing Expo changes not only setup but also operational ergonomics.',
    ],
  },
  {
    id: 'examples-native-module',
    title: 'Native Module Boundary',
    description: [
      'The ecosystem remains viable because native capabilities can be exposed when pure JavaScript is not enough.',
    ],
    code: `import { NativeModules } from 'react-native'

const { DeviceInfoModule } = NativeModules

export async function loadDeviceName() {
  return DeviceInfoModule.getDeviceName()
}`,
    notes: [
      'Native integration is part of the normal React Native story, not a sign that the framework failed.',
      'The key question is how often and how deeply the app needs this escape hatch.',
    ],
  },
  {
    id: 'examples-updates',
    title: 'Over-the-Air Update Thinking',
    description: [
      'Some ecosystem workflows include OTA-style update capabilities for JavaScript and assets, but those still sit inside store-shipped native apps.',
    ],
    code: `release model
-------------
native binary -> App Store / Play Store
JS bundle + assets -> ecosystem update pipeline when supported`,
    notes: [
      'OTA capability changes release operations, but it does not remove native store releases.',
      'Teams need a clear policy for which changes require a new binary.',
    ],
  },
  {
    id: 'examples-metro',
    title: 'Metro in Local Development',
    description: [
      'Metro is part of everyday workflow even when developers mostly interact with it indirectly.',
    ],
    code: `npx react-native start
npx react-native run-android
npx react-native run-ios`,
    notes: [
      'Bundling and developer experience are ecosystem concerns, not just framework concerns.',
      'Tooling health affects perceived framework productivity directly.',
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
          'A framework for building native mobile applications with React and JavaScript or TypeScript.',
      },
      {
        term: 'Metro',
        definition:
          'The JavaScript bundler commonly used by React Native for development and packaging workflows.',
      },
      {
        term: 'Hermes',
        definition:
          'A JavaScript engine commonly associated with modern React Native performance and runtime behavior.',
      },
      {
        term: 'Native module',
        definition:
          'A bridge or integration point that exposes platform-specific native functionality to JavaScript code.',
      },
      {
        term: 'Native component',
        definition:
          'A platform UI component exposed to React Native when JavaScript-only abstractions are not enough.',
      },
      {
        term: 'Fast Refresh',
        definition:
          'A development workflow feature that updates running code quickly during iteration.',
      },
      {
        term: 'Cross-platform',
        definition:
          'A development approach that shares substantial application code across multiple platforms.',
      },
      {
        term: 'Platform divergence',
        definition:
          'Intentional or unavoidable differences between Android and iOS behavior within one codebase.',
      },
    ],
  },
  {
    id: 'glossary-workflow',
    title: 'Workflow and Tooling Terms',
    terms: [
      {
        term: 'Expo',
        definition:
          'A tooling and services layer around React Native that can simplify setup, builds, updates, and workflow management.',
      },
      {
        term: 'Managed workflow',
        definition:
          'A higher-level workflow in which tooling handles more of the native project setup and coordination.',
      },
      {
        term: 'Prebuild',
        definition:
          'A workflow step or model that generates or syncs native project files from higher-level configuration.',
      },
      {
        term: 'EAS',
        definition:
          'Expo Application Services, used for builds, submissions, and related release operations in Expo-centric workflows.',
      },
      {
        term: 'OTA update',
        definition:
          'A delivery path for JavaScript and asset changes that can update behavior without always shipping a new native binary when the workflow supports it.',
      },
      {
        term: 'Simulator or emulator',
        definition:
          'A local virtual device used to run and test React Native apps during development.',
      },
      {
        term: 'Bundle',
        definition: 'The JavaScript output packaged and served for a React Native application.',
      },
      {
        term: 'Dev menu',
        definition:
          'A developer-facing in-app surface for debugging and tooling actions during development.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture and Product Terms',
    terms: [
      {
        term: 'Navigation stack',
        definition:
          'The library or structure used to move between screens and manage route behavior in a React Native app.',
      },
      {
        term: 'State management',
        definition:
          'The strategy used to represent and update local, global, and server-derived data in the app.',
      },
      {
        term: 'Bridge boundary',
        definition:
          'The conceptual boundary where JavaScript logic interacts with native platform capabilities.',
      },
      {
        term: 'Store release',
        definition:
          'A native binary release submitted to the Apple App Store or Google Play distribution pipeline.',
      },
      {
        term: 'Shared code',
        definition:
          'Application code reused across Android and iOS instead of being implemented separately.',
      },
      {
        term: 'Performance profiling',
        definition:
          'The measurement and analysis of runtime behavior such as startup time, rendering cost, and responsiveness.',
      },
      {
        term: 'Native ownership',
        definition:
          'The degree to which a team directly manages Android and iOS native projects and code.',
      },
      {
        term: 'Ecosystem discipline',
        definition:
          'The practice of choosing and maintaining a small, coherent set of libraries and workflows instead of accumulating random dependencies.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-ecosystem-matters', label: 'Why the Ecosystem Matters' },
    { id: 'bp-how-it-fits', label: 'Where React Native Fits' },
    { id: 'bp-expo-and-bare', label: 'Expo Versus Direct Native Ownership' },
    { id: 'bp-what-it-does-not-replace', label: 'What It Does Not Replace' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-what-rn-is', label: 'What React Native Is' },
    { id: 'core-architecture', label: 'Architecture Direction' },
    { id: 'core-hermes', label: 'Hermes' },
    { id: 'core-metro', label: 'Metro' },
    { id: 'core-expo', label: 'Expo' },
    { id: 'core-workflows', label: 'Workflow Models' },
    { id: 'core-navigation', label: 'Navigation' },
    { id: 'core-state', label: 'State Management' },
    { id: 'core-styling-layout', label: 'Styling and Layout' },
    { id: 'core-native-modules', label: 'Native Modules' },
    { id: 'core-build-release', label: 'Builds and Releases' },
    { id: 'core-testing-debugging', label: 'Testing and Debugging' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-common-mistakes', label: 'Common Mistakes' },
  ],
  examples: [
    { id: 'examples-basic-screen', label: 'Basic Screen' },
    { id: 'examples-platform-select', label: 'Platform Branching' },
    { id: 'examples-navigation', label: 'Navigation' },
    { id: 'examples-expo-config', label: 'Expo Config' },
    { id: 'examples-native-module', label: 'Native Module Boundary' },
    { id: 'examples-updates', label: 'Update Model' },
    { id: 'examples-metro', label: 'Metro Workflow' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core React Native Terms' },
    { id: 'glossary-workflow', label: 'Workflow and Tooling Terms' },
    { id: 'glossary-architecture', label: 'Architecture and Product Terms' },
  ],
}

const pageStyles = `
.react-native-ecosystem-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.react-native-ecosystem-help-window {
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

.react-native-ecosystem-help-titlebar {
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

.react-native-ecosystem-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.react-native-ecosystem-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.react-native-ecosystem-help-control {
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

.react-native-ecosystem-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.react-native-ecosystem-help-tab {
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

.react-native-ecosystem-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.react-native-ecosystem-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.react-native-ecosystem-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.react-native-ecosystem-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.react-native-ecosystem-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.react-native-ecosystem-help-toc-item {
  margin: 0 0 8px;
}

.react-native-ecosystem-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.react-native-ecosystem-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.react-native-ecosystem-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.react-native-ecosystem-help-section {
  margin: 0 0 20px;
}

.react-native-ecosystem-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.react-native-ecosystem-help-content p,
.react-native-ecosystem-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.react-native-ecosystem-help-content p {
  margin: 0 0 10px;
}

.react-native-ecosystem-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.react-native-ecosystem-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.react-native-ecosystem-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.react-native-ecosystem-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .react-native-ecosystem-help-main {
    grid-template-columns: 1fr;
  }

  .react-native-ecosystem-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .react-native-ecosystem-help-window {
    min-height: auto;
  }

  .react-native-ecosystem-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .react-native-ecosystem-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .react-native-ecosystem-help-controls {
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
    <section key={section.id} id={section.id} className="react-native-ecosystem-help-section">
      <h2 className="react-native-ecosystem-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="react-native-ecosystem-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="react-native-ecosystem-help-section">
      <h2 className="react-native-ecosystem-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="react-native-ecosystem-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="react-native-ecosystem-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="react-native-ecosystem-help-section">
      <h2 className="react-native-ecosystem-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="react-native-ecosystem-help-divider" />}
    </section>
  )
}

export default function ReactNativeEcosystemPage(): JSX.Element {
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
    document.title = `React Native Ecosystem (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'React Native Ecosystem',
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
    <div className="react-native-ecosystem-help-page">
      <style>{pageStyles}</style>
      <div className="react-native-ecosystem-help-window" role="presentation">
        <header className="react-native-ecosystem-help-titlebar">
          <span className="react-native-ecosystem-help-titletext">React Native Ecosystem</span>
          <div className="react-native-ecosystem-help-controls">
            <button
              className="react-native-ecosystem-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="react-native-ecosystem-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="react-native-ecosystem-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`react-native-ecosystem-help-tab ${activeTab === tab.id ? 'react-native-ecosystem-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="react-native-ecosystem-help-main">
          <aside className="react-native-ecosystem-help-toc" aria-label="Table of contents">
            <h2 className="react-native-ecosystem-help-toc-title">Contents</h2>
            <ul className="react-native-ecosystem-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="react-native-ecosystem-help-toc-item">
                  <a href={`#${section.id}`} className="react-native-ecosystem-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="react-native-ecosystem-help-content">
            <h1 className="react-native-ecosystem-help-doc-title">React Native Ecosystem</h1>
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
