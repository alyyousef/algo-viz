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
  'Flutter is more than a UI toolkit. In practice the Flutter ecosystem includes the Flutter framework, the Dart language and toolchain, the rendering engine, packages and plugins from pub.dev, DevTools, platform integration pathways, state-management approaches, testing layers, build and release tooling, and a large amount of ecosystem convention around how Flutter apps are structured.',
  'That ecosystem framing matters because a real Flutter app is not only a tree of widgets. Teams make choices about package quality, plugin boundaries, state architecture, rendering behavior, platform channels, native integrations, and release operations. The success of a Flutter project depends on those choices as much as on Dart syntax or widget APIs.',
  'This page is intentionally comprehensive. It covers the framework and engine split, Dart, rendering, widgets, pub.dev packages, plugins, platform channels, state management, DevTools, navigation, native integration, testing, performance, release workflow, and the common mistakes teams make when they talk about Flutter as if it were just a widget catalog instead of a full cross-platform application stack.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Flutter is a cross-platform application stack centered on Dart, a widget-based framework, and a rendering engine that draws the UI rather than delegating UI rendering entirely to native platform widgets. That makes Flutter feel different from both web-first mobile stacks and native-wrapper frameworks.',
      'The ecosystem around Flutter includes packages from pub.dev, plugins for native device features, DevTools for profiling and inspection, build and release tooling, state-management conventions, and platform integration patterns. A real Flutter app depends on these surrounding layers as much as on the core widget library.',
      'The practical result is that Flutter is best understood as an opinionated application platform. It controls a large portion of rendering and application structure, which is why it can offer strong consistency across platforms but also why ecosystem choices still matter heavily.',
    ],
  },
  {
    id: 'bp-why-ecosystem-matters',
    title: 'Why the Ecosystem Framing Matters',
    paragraphs: [
      'Teams often reduce Flutter to "widgets with Dart," but production work is broader than that. Navigation, package quality, plugin stability, state architecture, testing, performance profiling, and release discipline all determine whether a Flutter product stays maintainable.',
      'The ecosystem framing matters because Flutter gives teams a lot of power, but that power becomes difficult to manage when every architectural decision is left implicit or handled by a random set of packages.',
    ],
    bullets: [
      'The framework alone is not the whole app stack.',
      'Package and plugin choices strongly shape app quality.',
      'Tooling and profiling are part of normal Flutter engineering.',
      'State, rendering, and release strategy still need explicit ownership.',
    ],
  },
  {
    id: 'bp-rendering-model',
    title: 'The Rendering Model Is a Strategic Difference',
    paragraphs: [
      'Flutter draws its own UI through its rendering pipeline rather than depending on the mobile OS to render most widgets in the same way a more native-wrapper model would. This is one reason Flutter can deliver strong visual consistency across platforms.',
      'It is also why Flutter should not be evaluated as if it were simply a layer of native widget wrappers. Its rendering model affects performance discussions, design flexibility, and platform consistency tradeoffs in fundamental ways.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Flutter Fits Best',
    paragraphs: [
      'Flutter is strongest when the team wants one cross-platform UI framework with strong visual consistency, a unified rendering model, and a full application stack centered on Dart. It is especially compelling for teams that value shared UI as well as shared business logic.',
      'It can fit products that need polished custom UI, strong cross-platform consistency, and a framework that gives the team substantial control over rendering and composition.',
    ],
  },
  {
    id: 'bp-cross-platform-scope',
    title: 'Cross-Platform Scope',
    paragraphs: [
      'Although this page sits inside a mobile ecosystem section, Flutter itself spans more than Android and iOS. The official architecture and package model also address web, desktop, and embedded-style targets, which is why package and plugin design often talk about multiple platform implementations instead of only phone apps.',
      'That broader scope matters even for mobile-focused teams because it shapes the package ecosystem, plugin architecture, tooling expectations, and strategic value proposition of Flutter as a reusable application platform.',
    ],
  },
  {
    id: 'bp-what-it-does-not-replace',
    title: 'What Flutter Does Not Replace',
    paragraphs: [
      'Flutter does not eliminate platform-specific release obligations, plugin maintenance, performance work, or native integration responsibilities. It also does not make state management trivial. A widget-heavy codebase with unclear architecture is still hard to maintain.',
      'It is also not a reason to ignore package discipline. A Flutter project can accumulate weak dependencies just as quickly as any other modern framework stack if the team does not curate it carefully.',
    ],
    bullets: [
      'It does not replace architecture decisions.',
      'It does not remove native build and release realities.',
      'It does not remove the need for profiling and performance awareness.',
      'It does not make third-party package quality irrelevant.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'In production, strong Flutter teams usually settle on a curated package set, a deliberate state-management approach, a clear navigation model, and a performance-testing habit. They also keep plugin boundaries explicit and do not assume every need should be solved by whichever package is most popular this month.',
      'As of March 31, 2026, Flutter remains a strongly documented, actively tooled ecosystem centered on official framework docs, pub.dev packages, and DevTools. That makes official documentation especially important, because old blog-post advice often lags behind the current framework architecture and tooling story.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      "When evaluating Flutter, the useful questions are practical. Does the team want shared UI as well as shared logic? Is Dart an acceptable primary language? Does the product benefit from Flutter's rendering and design flexibility? Which plugins are required? Is the team prepared to own package curation and performance profiling seriously?",
      'Most Flutter disappointments come from vague architecture or weak ecosystem discipline rather than from the framework being inherently unsuitable. The best fit is a team that wants a unified cross-platform app stack and is willing to own that stack deliberately.',
    ],
    bullets: [
      'Choose it when shared UI is strategically valuable.',
      'Assume package and plugin curation are real engineering work.',
      'Use profiling and DevTools as normal workflow, not as a last resort.',
      'Pick a state and navigation model intentionally before the app grows.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-flutter-is',
    title: 'What Flutter Actually Is',
    paragraphs: [
      'Flutter is a UI framework and application stack built around Dart. Developers build UI by composing widgets, and the framework handles layout, painting, input, animation, and other app-level concerns through its own layered architecture.',
      'The important point is that Flutter is not only a widget library. It includes its own way of thinking about rendering, composition, tools, and application structure.',
    ],
  },
  {
    id: 'core-framework-engine',
    title: 'Framework Versus Engine',
    paragraphs: [
      'Flutter is often described as a framework sitting on top of an engine. The framework includes Dart-side widgets, rendering abstractions, and app APIs. The engine handles lower-level rendering and platform integration behavior.',
      'Understanding that split is useful because it explains why Flutter can provide so much UI consistency while still reaching multiple platforms. It also helps explain why some issues are framework-level concerns while others are engine-level or platform-integration concerns.',
    ],
  },
  {
    id: 'core-dart',
    title: 'Dart as the Primary Language',
    paragraphs: [
      'Dart is not a side detail in the Flutter ecosystem. It is the language the framework is built around, and its toolchain, async model, type system, and developer experience shape the whole application stack.',
      'Teams evaluating Flutter need to ask honestly whether they want Dart as a first-class language in their organization. Framework fit is partly language fit.',
    ],
  },
  {
    id: 'core-widgets',
    title: 'Widgets, Composition, and UI Structure',
    paragraphs: [
      'Flutter UI is built by composing widgets. This creates a highly expressive composition model, but it also means UI structure and rebuild behavior are central to maintainability. Widget trees are powerful when kept disciplined and become noisy when teams lose structural clarity.',
      "The composition model is one of Flutter's biggest strengths because it makes customization and reusable UI primitives straightforward. It also demands engineering discipline in how screens are broken down.",
    ],
  },
  {
    id: 'core-rendering',
    title: 'Rendering and Visual Consistency',
    paragraphs: [
      "Flutter's rendering approach is a defining part of its identity. Because the framework controls rendering more directly, teams can achieve strong visual consistency and highly customized interfaces across platforms.",
      "That consistency is valuable, but it also means teams should reason about the app through Flutter's rendering model rather than through assumptions imported from native-widget or web-browser stacks.",
    ],
  },
  {
    id: 'core-material-cupertino',
    title: 'Material, Cupertino, and Design Language',
    paragraphs: [
      'The Flutter ecosystem includes higher-level widget libraries such as Material and Cupertino. These are not minor decoration layers. They are major parts of how Flutter helps teams express platform-aware or design-system-aware UI while still using the same core composition model.',
      'This matters because Flutter can aim for either strong cross-platform consistency or more platform-specific visual language depending on how the team composes its UI. The framework makes that choice explicit instead of forcing one answer.',
    ],
  },
  {
    id: 'core-packages-plugins',
    title: 'Packages and Plugins',
    paragraphs: [
      'The Flutter ecosystem depends heavily on packages from pub.dev. Some packages are pure Dart libraries. Others are plugins that bridge into native Android or iOS functionality. This is one of the most important ecosystem boundaries in real projects.',
      'Good Flutter teams distinguish carefully between pure framework dependencies and plugin dependencies. Plugins carry native implications, platform quirks, and maintenance risks that ordinary Dart-only utilities may not.',
    ],
  },
  {
    id: 'core-package-quality',
    title: 'Package Quality and Federated Plugin Design',
    paragraphs: [
      'Not every package in pub.dev carries the same maintenance quality, platform coverage, or operational maturity. That is why Flutter ecosystem work is partly dependency governance. Teams should look at publisher reputation, platform support, maintenance history, and how central a dependency will become before adopting it widely.',
      'Official Flutter guidance also distinguishes between ordinary packages, plugin packages, and more structured approaches such as federated plugins. This is useful because cross-platform support often needs different implementations per platform while preserving one app-facing API.',
    ],
  },
  {
    id: 'core-platform-channels',
    title: 'Platform Channels and Native Integration',
    paragraphs: [
      'When app functionality requires direct platform behavior beyond existing plugins, Flutter provides platform integration paths such as platform channels. These let Dart code communicate with native Android and iOS code.',
      'This matters because Flutter is cross-platform, not platform-free. Native escape hatches are part of the design, and serious products eventually need to understand them.',
    ],
  },
  {
    id: 'core-add-to-app',
    title: 'Add-to-App and Incremental Adoption',
    paragraphs: [
      'Flutter is not limited to greenfield apps. The ecosystem also supports adding Flutter into an existing native application, which is why official documentation includes add-to-app guidance and hybrid navigation scenarios.',
      'This is strategically useful for teams that want to introduce Flutter gradually, isolate it to specific product surfaces, or share selected UI flows without rewriting the entire mobile app at once.',
    ],
  },
  {
    id: 'core-state-management',
    title: 'State Management as an Ecosystem Choice',
    paragraphs: [
      'Flutter does not enforce one state-management solution. Teams use a range of approaches, from simple built-in patterns to more formal package-based solutions. That flexibility is useful, but it also means the team must choose its architectural direction deliberately.',
      'The important rule is to keep state ownership understandable. Flutter apps become difficult to evolve when state flows are implicit or spread across too many unrelated abstractions.',
    ],
  },
  {
    id: 'core-navigation',
    title: 'Navigation and App Flow',
    paragraphs: [
      'Flutter provides navigation capabilities, but teams still need a coherent routing and screen-structure strategy. Deep linking, nested flows, authentication gates, tabs, and app lifecycle transitions all need explicit design.',
      'Navigation should be treated as part of product architecture, not merely as a convenience wrapper around screen transitions.',
    ],
  },
  {
    id: 'core-devtools',
    title: 'DevTools, Profiling, and Inspection',
    paragraphs: [
      'Flutter DevTools are an important part of the ecosystem because performance, memory behavior, widget rebuilds, and runtime inspection are not optional concerns in real apps. Tooling quality is one of the reasons Flutter development can be productive when teams use it properly.',
      'A serious Flutter team treats DevTools as normal engineering instrumentation rather than something reserved only for emergencies.',
    ],
  },
  {
    id: 'core-toolchain',
    title: 'Toolchain, Hot Reload, and Developer Workflow',
    paragraphs: [
      'The Flutter SDK, Dart toolchain, editor integrations, and features such as hot reload are part of the practical ecosystem story. Fast iteration is not just a convenience feature; it influences how quickly teams test UI changes, debug interaction flows, and refine component structure.',
      'That said, fast iteration should not be confused with weak engineering discipline. Hot reload accelerates feedback, but good teams still combine it with tests, profiling, and clear architectural boundaries.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Layers',
    paragraphs: [
      'Flutter supports multiple testing layers, including unit-style tests, widget tests, and broader integration-style app testing. This layered testing story matters because Flutter often owns a large portion of the app stack, and different confidence levels require different testing surfaces.',
      'The healthiest teams choose a testing mix that matches risk rather than relying on one kind of test to do everything.',
    ],
  },
  {
    id: 'core-build-release',
    title: 'Build, Packaging, and Store Releases',
    paragraphs: [
      'Flutter apps still compile into platform-specific deliverables and still have to satisfy Android and iOS release realities. Signing, build configuration, store metadata, native permissions, and release pipelines remain part of the work.',
      'This is an important reminder that a shared UI stack does not remove mobile operations. It changes the application development model, not the existence of platform distribution systems.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Product Fit',
    paragraphs: [
      'Flutter can support highly polished and performant interfaces, but performance depends on real engineering choices: widget structure, rebuild frequency, list behavior, image handling, animation strategy, and plugin usage.',
      'The right mindset is empirical. Use DevTools, identify real bottlenecks, and optimize the actual issue instead of arguing from framework mythology.',
    ],
  },
  {
    id: 'core-common-mistakes',
    title: 'Common Flutter Ecosystem Mistakes',
    paragraphs: [
      'Common mistakes include adding too many packages too early, confusing plugin availability with plugin quality, leaving state management undefined until the app becomes large, and assuming Flutter removes all native-platform knowledge requirements.',
      'Another recurring mistake is treating performance as automatic. Flutter is capable, but it still rewards disciplined architecture and measurement.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-widget-tree',
    title: 'Basic Widget Composition',
    description: [
      'Flutter application structure starts with widgets, so composition style is one of the most important practical ideas in the ecosystem.',
    ],
    code: `class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Welcome')),
      body: const Center(
        child: Text('Flutter renders this UI through its widget tree.'),
      ),
    );
  }
}`,
    notes: [
      'This is a framework-level example, but real ecosystem choices appear quickly around state, navigation, and packages.',
      "Widget composition is one of Flutter's biggest strengths when kept structured.",
    ],
  },
  {
    id: 'examples-pubspec',
    title: 'Package Dependencies Through pubspec',
    description: [
      'Flutter ecosystem growth happens largely through pub.dev packages declared in `pubspec.yaml`.',
    ],
    code: `dependencies:
  flutter:
    sdk: flutter
  dio: ^5.7.0
  shared_preferences: ^2.3.2`,
    notes: [
      'Packages are a major part of real Flutter engineering, not an optional side topic.',
      'Dependency discipline matters because package quality varies widely.',
    ],
  },
  {
    id: 'examples-plugin',
    title: 'Plugin Usage for Native Device Access',
    description: [
      'Plugins are where pure Dart application code begins to depend on native mobile capabilities.',
    ],
    code: `final prefs = await SharedPreferences.getInstance();
await prefs.setString('token', 'abc123');`,
    notes: [
      'This kind of plugin call is simple on the surface but still carries platform implications.',
      'Plugins should be treated as architecture choices, not just convenience imports.',
    ],
  },
  {
    id: 'examples-platform-channel',
    title: 'Platform Channel Boundary',
    description: [
      'When packages are not enough, Flutter can communicate directly with native code through platform channels.',
    ],
    code: `static const platform = MethodChannel('com.example.device');

final String version =
    await platform.invokeMethod<String>('getPlatformVersion') ?? 'unknown';`,
    notes: [
      'This is the explicit native escape hatch in the Flutter ecosystem.',
      'Use it when the product needs native behavior that existing plugins do not cover cleanly.',
    ],
  },
  {
    id: 'examples-navigation',
    title: 'Navigation as App Structure',
    description: [
      'Screen movement in Flutter is an architectural choice, not just a one-line utility call.',
    ],
    code: `Navigator.of(context).push(
  MaterialPageRoute(builder: (_) => const DetailsScreen()),
);`,
    notes: [
      'Small apps can start simply, but larger apps should still define navigation strategy deliberately.',
      'Routing architecture becomes more important as flows become nested or stateful.',
    ],
  },
  {
    id: 'examples-add-to-app',
    title: 'Add-to-App as an Ecosystem Boundary',
    description: [
      'Flutter can also be embedded into an existing native codebase instead of owning the whole application from day one.',
    ],
    code: `existing Android or iOS app
  -> host native screen flow
  -> launch a Flutter-powered feature
  -> exchange data across the integration boundary`,
    notes: [
      'This model is useful for incremental adoption and for isolating Flutter to specific product surfaces.',
      'It reinforces that Flutter is cross-platform, not an all-or-nothing mandate.',
    ],
  },
  {
    id: 'examples-devtools',
    title: 'DevTools-Oriented Performance Thinking',
    description: ['Flutter performance work should be grounded in tooling rather than guesses.'],
    code: `workflow:
  1. reproduce the issue
  2. inspect widget rebuilds
  3. check memory and frame timing
  4. optimize the actual bottleneck`,
    notes: [
      'This is intentionally process-oriented because that is how Flutter performance work is usually done well.',
      'DevTools are part of the ecosystem story, not just an optional extra.',
    ],
  },
  {
    id: 'examples-release',
    title: 'Release Pipeline Reality',
    description: [
      'Even with a shared Flutter codebase, mobile release outputs are still native-platform deliverables.',
    ],
    code: `flutter build apk
flutter build appbundle
flutter build ios`,
    notes: [
      'A shared UI stack still ends in platform-specific build and release workflows.',
      'This is why Flutter should be evaluated as a cross-platform app stack, not as a platform-free abstraction.',
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
          'A cross-platform application framework and rendering stack built around Dart and widget composition.',
      },
      {
        term: 'Dart',
        definition:
          'The primary language used for Flutter application development and framework authoring.',
      },
      {
        term: 'Widget',
        definition:
          'The basic compositional unit of Flutter UI, used to describe structure, styling, and behavior.',
      },
      {
        term: 'Framework',
        definition:
          'The Dart-side layer of Flutter that provides widgets, rendering abstractions, and app APIs.',
      },
      {
        term: 'Engine',
        definition:
          'The lower-level Flutter layer responsible for rendering and platform integration behavior.',
      },
      {
        term: 'pub.dev',
        definition: 'The central package repository used by the Flutter and Dart ecosystem.',
      },
      {
        term: 'Plugin',
        definition: 'A package that exposes native platform functionality to Flutter applications.',
      },
      {
        term: 'Hot reload',
        definition:
          'A development workflow feature that updates running code quickly during iteration.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture and Integration Terms',
    terms: [
      {
        term: 'Platform channel',
        definition: 'A communication mechanism between Dart code and native platform code.',
      },
      {
        term: 'State management',
        definition:
          'The strategy used to control local, shared, and asynchronous app state across the UI.',
      },
      {
        term: 'Navigation stack',
        definition:
          'The route and screen flow structure that governs movement through the application.',
      },
      {
        term: 'Shared UI',
        definition: 'A single cross-platform UI layer reused across multiple supported platforms.',
      },
      {
        term: 'Package discipline',
        definition:
          'The practice of curating dependencies carefully rather than importing arbitrary packages freely.',
      },
      {
        term: 'Rendering pipeline',
        definition: 'The path by which Flutter lays out, paints, and displays visual output.',
      },
      {
        term: 'Native integration',
        definition:
          'The use of plugins or platform channels to interact with Android or iOS platform capabilities.',
      },
      {
        term: 'Product fit',
        definition:
          "Whether a product's UX, team structure, and performance needs align well with the Flutter stack.",
      },
    ],
  },
  {
    id: 'glossary-tools',
    title: 'Tooling and Workflow Terms',
    terms: [
      {
        term: 'DevTools',
        definition:
          'The official Flutter tooling used for runtime inspection, profiling, debugging, and performance analysis.',
      },
      {
        term: 'Widget test',
        definition: 'A test that exercises Flutter UI components at the widget layer.',
      },
      {
        term: 'Integration test',
        definition: 'A broader test that exercises real application flows and interactions.',
      },
      {
        term: 'pubspec.yaml',
        definition:
          'The configuration file where Flutter and Dart project dependencies and metadata are declared.',
      },
      {
        term: 'Build artifact',
        definition:
          'A platform-specific output produced from a Flutter build process, such as an APK or app bundle.',
      },
      {
        term: 'Frame timing',
        definition:
          'A performance measure related to how consistently the app renders smooth frames.',
      },
      {
        term: 'Emulator or simulator',
        definition:
          'A virtual device environment used to run and test Flutter apps during development.',
      },
      {
        term: 'Release discipline',
        definition:
          'The repeatable operational process used to move Flutter code into tested, signed store releases.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-ecosystem-matters', label: 'Why Ecosystem Matters' },
    { id: 'bp-rendering-model', label: 'Rendering Model' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-cross-platform-scope', label: 'Cross-Platform Scope' },
    { id: 'bp-what-it-does-not-replace', label: 'What It Does Not Replace' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-what-flutter-is', label: 'What Flutter Is' },
    { id: 'core-framework-engine', label: 'Framework and Engine' },
    { id: 'core-dart', label: 'Dart' },
    { id: 'core-widgets', label: 'Widgets and Composition' },
    { id: 'core-rendering', label: 'Rendering' },
    { id: 'core-material-cupertino', label: 'Material and Cupertino' },
    { id: 'core-packages-plugins', label: 'Packages and Plugins' },
    { id: 'core-package-quality', label: 'Package Quality' },
    { id: 'core-platform-channels', label: 'Platform Channels' },
    { id: 'core-add-to-app', label: 'Add-to-App' },
    { id: 'core-state-management', label: 'State Management' },
    { id: 'core-navigation', label: 'Navigation' },
    { id: 'core-devtools', label: 'DevTools' },
    { id: 'core-toolchain', label: 'Toolchain and Hot Reload' },
    { id: 'core-testing', label: 'Testing' },
    { id: 'core-build-release', label: 'Build and Release' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-common-mistakes', label: 'Common Mistakes' },
  ],
  examples: [
    { id: 'examples-widget-tree', label: 'Widget Composition' },
    { id: 'examples-pubspec', label: 'pubspec Dependencies' },
    { id: 'examples-plugin', label: 'Plugin Usage' },
    { id: 'examples-platform-channel', label: 'Platform Channel' },
    { id: 'examples-navigation', label: 'Navigation' },
    { id: 'examples-add-to-app', label: 'Add-to-App Boundary' },
    { id: 'examples-devtools', label: 'DevTools Workflow' },
    { id: 'examples-release', label: 'Release Pipeline' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Terms' },
    { id: 'glossary-architecture', label: 'Architecture Terms' },
    { id: 'glossary-tools', label: 'Tooling Terms' },
  ],
}

const pageStyles = `
.flutter-ecosystem-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.flutter-ecosystem-help-window {
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

.flutter-ecosystem-help-titlebar {
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

.flutter-ecosystem-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.flutter-ecosystem-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.flutter-ecosystem-help-control {
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

.flutter-ecosystem-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.flutter-ecosystem-help-tab {
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

.flutter-ecosystem-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.flutter-ecosystem-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.flutter-ecosystem-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.flutter-ecosystem-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.flutter-ecosystem-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.flutter-ecosystem-help-toc-item {
  margin: 0 0 8px;
}

.flutter-ecosystem-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.flutter-ecosystem-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.flutter-ecosystem-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.flutter-ecosystem-help-section {
  margin: 0 0 20px;
}

.flutter-ecosystem-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.flutter-ecosystem-help-content p,
.flutter-ecosystem-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.flutter-ecosystem-help-content p {
  margin: 0 0 10px;
}

.flutter-ecosystem-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.flutter-ecosystem-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.flutter-ecosystem-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.flutter-ecosystem-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .flutter-ecosystem-help-main {
    grid-template-columns: 1fr;
  }

  .flutter-ecosystem-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .flutter-ecosystem-help-window {
    min-height: auto;
  }

  .flutter-ecosystem-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .flutter-ecosystem-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .flutter-ecosystem-help-controls {
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
    <section key={section.id} id={section.id} className="flutter-ecosystem-help-section">
      <h2 className="flutter-ecosystem-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="flutter-ecosystem-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="flutter-ecosystem-help-section">
      <h2 className="flutter-ecosystem-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="flutter-ecosystem-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="flutter-ecosystem-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="flutter-ecosystem-help-section">
      <h2 className="flutter-ecosystem-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="flutter-ecosystem-help-divider" />}
    </section>
  )
}

export default function FlutterEcosystemPage(): JSX.Element {
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
    document.title = `Flutter Ecosystem (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Flutter Ecosystem',
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
    <div className="flutter-ecosystem-help-page">
      <style>{pageStyles}</style>
      <div className="flutter-ecosystem-help-window" role="presentation">
        <header className="flutter-ecosystem-help-titlebar">
          <span className="flutter-ecosystem-help-titletext">Flutter Ecosystem</span>
          <div className="flutter-ecosystem-help-controls">
            <button
              className="flutter-ecosystem-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="flutter-ecosystem-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="flutter-ecosystem-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`flutter-ecosystem-help-tab ${activeTab === tab.id ? 'flutter-ecosystem-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flutter-ecosystem-help-main">
          <aside className="flutter-ecosystem-help-toc" aria-label="Table of contents">
            <h2 className="flutter-ecosystem-help-toc-title">Contents</h2>
            <ul className="flutter-ecosystem-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="flutter-ecosystem-help-toc-item">
                  <a href={`#${section.id}`} className="flutter-ecosystem-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="flutter-ecosystem-help-content">
            <h1 className="flutter-ecosystem-help-doc-title">Flutter Ecosystem</h1>
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
