import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-when-flutter-fits', label: 'When Flutter Fits Better' },
    { id: 'bp-when-rn-fits', label: 'When React Native Fits Better' },
    { id: 'bp-tradeoffs', label: 'Tradeoffs and Decision Drivers' },
  ],
  'core-concepts': [
    { id: 'core-philosophy', label: 'Framework Philosophy' },
    { id: 'core-rendering', label: 'Rendering and Runtime Model' },
    { id: 'core-language', label: 'Language and Developer Experience' },
    { id: 'core-ui', label: 'UI Composition and Styling' },
    { id: 'core-ecosystem', label: 'Architecture and Ecosystem' },
    { id: 'core-native', label: 'Native Interop and Platform APIs' },
    { id: 'core-performance', label: 'Performance and Tooling' },
    { id: 'core-team', label: 'Team Fit and Delivery Tradeoffs' },
  ],
  examples: [
    { id: 'ex-ui', label: 'UI Composition Example' },
    { id: 'ex-platform', label: 'Platform Capability Example' },
    { id: 'ex-reference', label: 'Decision Reference' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const bigPictureSections = [
  {
    title: 'Overview',
    paragraphs: [
      'Flutter and React Native are both cross-platform mobile frameworks, but they solve the problem through very different architectural bets. Flutter ships a full widget toolkit and rendering pipeline driven by Dart, while React Native uses React with JavaScript or TypeScript and maps the application tree onto native platform components and native capabilities.',
      'That difference matters because the frameworks do not merely vary in syntax. They vary in how much of the UI stack they own, how closely they mirror native controls, how teams structure code, and how product decisions interact with staffing and platform constraints.',
      'Both can ship serious mobile applications. The comparison is usually not about whether one is categorically capable and the other is not. It is about which mental model better matches the product, the team, and the kinds of compromises the organization is willing to carry for several years.',
    ],
  },
  {
    title: 'When Flutter Fits Better',
    paragraphs: [
      'Flutter is often the stronger choice when a team wants a highly controlled, highly consistent interface across iOS and Android. Because Flutter owns the widget toolkit and paints the UI itself, custom visual systems, animation-heavy flows, and branded interfaces are usually easier to keep uniform across devices.',
      'It also fits teams that want one coherent SDK surface for layout, animation, gestures, rendering, and many common UI concerns. The framework feels vertically integrated, which reduces some of the architectural fragmentation that can appear in large JavaScript-based mobile stacks.',
      'Flutter is especially attractive when the product places a high premium on visual polish, consistent behavior, and predictable rendering across platforms, even if that means adopting Dart and leaning further away from conventional web React code reuse.',
    ],
  },
  {
    title: 'When React Native Fits Better',
    paragraphs: [
      'React Native is often the better choice when the organization already has strong React and JavaScript or TypeScript capability. Teams can reuse familiar concepts such as components, props, hooks, state flow, and much of the surrounding tooling culture, which lowers the adoption cost compared with introducing a new language and framework style.',
      'It also fits teams that want to stay closer to native platform widgets and native application behavior. Because React Native is built around native-backed components and native modules, it often feels like a JavaScript layer coordinating native mobile surfaces rather than replacing them entirely.',
      'React Native can be especially compelling in companies with existing web React teams, shared product design processes, and a hiring pipeline already oriented around JavaScript or TypeScript. In those environments, organizational leverage can matter more than theoretical framework elegance.',
    ],
  },
  {
    title: 'Tradeoffs and Decision Drivers',
    paragraphs: [
      'Flutter usually offers stronger control over the visual layer and a more unified SDK. React Native usually offers stronger continuity with the React ecosystem and a more direct relationship with native mobile surfaces. Those strengths pull in different directions, so the decision is usually about priorities rather than raw feature lists.',
      'If the product requires substantial native SDK integration, platform-specific UI conventions, or close collaboration with teams already thinking in React, React Native may reduce adoption friction. If the product needs pixel-level consistency, rich motion, and a framework that owns more of the UI story end to end, Flutter may reduce long-term design drift.',
      'The practical comparison includes overview, key ideas, syntax and APIs, ecosystem, architecture, use cases, tradeoffs, and concrete examples because those are the dimensions that typically determine whether a team is choosing a framework that fits its actual delivery model or just following ecosystem momentum.',
    ],
  },
]

const conceptSections = [
  {
    id: 'core-philosophy',
    title: 'Framework Philosophy',
    paragraphs: [
      'Flutter approaches app development as a self-contained UI platform. The framework assumes that the fastest path to consistent product behavior is to own the rendering model, widget vocabulary, animation system, and layout pipeline. This makes Flutter feel like a complete product environment rather than a thin layer over native controls.',
      'React Native approaches app development from the React side first. The central idea is that a declarative React component model can drive native application interfaces, with JavaScript logic coordinating updates and native modules handling device-specific capabilities. That gives React Native a more hybrid character: part React application architecture, part native mobile integration surface.',
      'This philosophical gap is often more important than benchmark discussions. Flutter asks a team to buy into a dedicated mobile UI system. React Native asks a team to extend an existing React mental model into the mobile world. Teams should choose the model they can reason about, debug, and scale with confidence.',
    ],
  },
  {
    id: 'core-rendering',
    title: 'Rendering and Runtime Model',
    paragraphs: [
      'Flutter renders through its own engine and widget tree. Widgets describe structure and intent, the framework resolves layout and paint, and the engine draws the final result. Because Flutter owns more of the rendering stack, it can deliver consistent behavior across platforms and support custom interfaces without depending on the exact quirks of native widget implementations.',
      'React Native renders by coordinating a React component tree with native platform views and native execution paths. The framework is therefore more directly influenced by the platform UI layer and by how the JavaScript and native parts of the application communicate. That can be an advantage when native fidelity matters, but it also means architectural boundaries remain more visible during development.',
      'A simple way to think about the difference is this: Flutter usually feels like a dedicated graphics-and-widget environment targeting mobile platforms, while React Native usually feels like a React application orchestrating native mobile primitives. Neither model is inherently better, but they create different strengths, different debugging patterns, and different failure modes.',
    ],
  },
  {
    id: 'core-language',
    title: 'Language and Developer Experience',
    paragraphs: [
      'Flutter uses Dart, a strongly typed language with an object-oriented flavor and syntax designed to support productive UI composition. Teams working in Flutter typically spend most of their time inside one coherent language and framework surface, which can make the development experience feel focused once the team is fully onboarded.',
      "React Native uses JavaScript or TypeScript with React. For many organizations, this is a major advantage because the language, tooling patterns, and conceptual model may already be familiar from web frontend work. The ability to hire from the broader JavaScript ecosystem and share engineering habits with web teams is often one of React Native's strongest non-technical advantages.",
      'The tradeoff is straightforward. Flutter asks for a larger shift up front but can repay that shift with a more integrated UI stack. React Native lowers the language barrier for React teams, but the surrounding architecture may involve more package selection, more runtime boundaries, and more framework-to-native coordination.',
    ],
  },
  {
    id: 'core-ui',
    title: 'UI Composition and Styling',
    paragraphs: [
      "Flutter expresses the interface as nested widgets. Layout, typography, animation, and composition are all built inside the same widget-driven model, which makes the framework particularly good at creating custom design systems and highly tailored user flows. The cost is that teams must learn Flutter's own vocabulary for layout and composition rather than relying on HTML, CSS, or native platform metaphors.",
      'React Native expresses the interface through React components backed by native elements such as View, Text, ScrollView, and platform modules. Styling follows a JavaScript object model rather than traditional CSS, and the component structure feels familiar to React developers. This can make everyday UI work productive for teams already comfortable with React, especially if they do not need a radically custom rendering approach.',
      'In practice, Flutter often wins when the design system is ambitious and highly bespoke. React Native often wins when the team wants the ergonomics of React plus a UI layer that remains closer to native idioms. The question is not just how you write the screen, but how often the product needs to depart from standard platform behavior and how much that matters to the brand.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Architecture and Ecosystem',
    paragraphs: [
      'Flutter provides a more vertically integrated ecosystem. The official SDK covers a large portion of the UI surface, and many core concerns feel like they belong to one framework family. That can simplify architectural decisions because fewer foundational choices must be made before the team becomes productive.',
      'React Native lives in a more modular ecosystem. Navigation, state management, data fetching, animation, and native module integration often involve choices from the broader React and React Native package landscape. That flexibility can be valuable, especially in mature JavaScript organizations, but it also means teams can end up with more architectural variance across projects.',
      'This is one of the clearest long-term tradeoffs. Flutter tends to centralize more of the app experience under one framework umbrella. React Native tends to benefit from ecosystem breadth and React familiarity, but it also asks teams to make more decisions and maintain more seams between layers.',
    ],
  },
  {
    id: 'core-native',
    title: 'Native Interop and Platform APIs',
    paragraphs: [
      'Both frameworks eventually rely on native code for platform-specific behavior, hardware access, or integration with vendor SDKs. The practical question is not whether native code disappears, because it does not. The question is how cleanly each framework lets the team cross that boundary and how often that boundary becomes part of normal delivery work.',
      "Flutter uses platform channels and plugin conventions to bridge into iOS and Android code. This works well, but it keeps the native interaction inside Flutter's own architecture and patterns. Teams that want a single dominant framework surface often like that consistency.",
      'React Native exposes native interop in a way that often feels closer to the host platforms and to JavaScript module conventions. For teams already comfortable with native mobile integration patterns or already expecting to mix significant native code into the app, React Native may feel more natural because the hybrid boundary is more explicit from the start.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Tooling',
    paragraphs: [
      'Performance discussions around Flutter and React Native are often oversimplified. For most real products, the meaningful question is not which framework wins a generic benchmark, but which framework makes it easier to avoid the bottlenecks that matter in your app: large lists, animations, startup behavior, image-heavy screens, gesture responsiveness, or complex native integrations.',
      'Flutter performs strongly for custom interfaces because it controls rendering and can optimize within its own pipeline. Its tooling and hot reload experience are major strengths during iterative UI work. Problems usually show up when screens rebuild excessively, when layouts become expensive, or when animation and rendering work are not structured carefully.',
      'React Native performance depends more on component architecture, native module usage, animation pathways, and how efficiently work crosses the JavaScript and native boundary. Fast Refresh, React tooling, and the surrounding JavaScript ecosystem make iteration familiar, but performance-sensitive screens still demand disciplined engineering. In both frameworks, good architecture matters more than generic claims.',
    ],
  },
  {
    id: 'core-team',
    title: 'Team Fit and Delivery Tradeoffs',
    paragraphs: [
      'Flutter tends to fit teams willing to adopt a dedicated mobile framework in exchange for stronger control over UI consistency and a more unified framework experience. This can be a good trade when the product is design-heavy and the team is comfortable committing to Flutter as a first-class skill set rather than as a thin extension of web development.',
      'React Native tends to fit teams that want to leverage existing React capability, share hiring pipelines with web engineering, and keep mobile development conceptually closer to the JavaScript ecosystem. This does not remove mobile complexity, but it can reduce the initial ramp and make team staffing more flexible.',
      'In practice, this section is often decisive. A framework that looks elegant on paper is still the wrong choice if the team cannot maintain it well, cannot hire for it, or cannot navigate the architectural seams it introduces. The best choice is usually the one that aligns product demands with team capability, not the one that wins the most internet arguments.',
    ],
  },
]

const examples = {
  ui: {
    title: 'UI Composition Example',
    intro:
      'A simple counter screen shows how each framework expresses declarative UI. The functionality is the same, but the shape of the code reflects the broader framework philosophy: Flutter composes a widget tree in Dart, while React Native composes native-backed elements with React state.',
    flutterCode: `class CounterPage extends StatefulWidget {
  const CounterPage({super.key});

  @override
  State<CounterPage> createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Counter')),
      body: Center(
        child: Text('Count: $count'),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => setState(() => count += 1),
        child: const Icon(Icons.add),
      ),
    );
  }
}`,
    reactNativeCode: `import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export function CounterScreen() {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Add" onPress={() => setCount(count + 1)} />
    </View>
  );
}`,
    notes: [
      'Flutter keeps layout and interaction inside one widget-centric API surface.',
      'React Native keeps the familiar React state-flow model while rendering through native-backed primitives.',
      'The example is small, but the same difference scales up into navigation, styling, animation, and component architecture.',
    ],
  },
  platform: {
    title: 'Platform Capability Example',
    intro:
      'Device APIs and vendor SDKs eventually require native interop. The examples below show the shape of that escape hatch in each framework. The important lesson is not the exact syntax, but how each framework frames the boundary between app code and platform code.',
    flutterCode: `const channel = MethodChannel('battery');

Future<int?> getBatteryLevel() async {
  return channel.invokeMethod<int>('getBatteryLevel');
}`,
    reactNativeCode: `import { NativeModules } from 'react-native';

const { BatteryModule } = NativeModules;

export async function getBatteryLevel() {
  return BatteryModule.getBatteryLevel();
}`,
    notes: [
      'Flutter wraps native access inside platform channels and plugin conventions.',
      'React Native surfaces native access through native modules that fit naturally into JavaScript imports and React Native architecture.',
      'If a product relies heavily on native SDKs, the team should evaluate how often it expects to cross this boundary in real development work.',
    ],
  },
}

const decisionReference = [
  'Choose Flutter when a consistent, custom, design-heavy interface is central to the product and the team is willing to adopt Dart and a dedicated rendering model.',
  'Choose React Native when React knowledge, JavaScript or TypeScript reuse, and proximity to native platform controls are stronger organizational advantages.',
  'Choose based on the real app shape: custom UI intensity, native SDK requirements, hiring profile, architecture tolerance, and release pressure.',
  'Choose the framework the team can operate confidently for years, not the one that sounds best in abstract comparisons.',
]

const glossary = [
  {
    term: 'Widget tree',
    definition:
      'The hierarchical UI structure Flutter uses to describe, lay out, and render the interface.',
  },
  {
    term: 'Native-backed component',
    definition:
      'A React Native UI element that maps to underlying iOS or Android platform controls or views.',
  },
  {
    term: 'Declarative UI',
    definition:
      'A model where code describes what the interface should look like for the current state instead of manually mutating individual views step by step.',
  },
  {
    term: 'Platform channel',
    definition:
      'A Flutter mechanism for invoking native platform code from Dart and returning results back into the Flutter app.',
  },
  {
    term: 'Native module',
    definition:
      'A React Native integration point that exposes native iOS or Android functionality to JavaScript or TypeScript code.',
  },
  {
    term: 'Hot reload',
    definition:
      'Flutter workflow that applies many code changes quickly while preserving much of the running app state.',
  },
  {
    term: 'Fast Refresh',
    definition:
      'React Native workflow for reflecting JavaScript changes during local development while preserving useful state when possible.',
  },
  {
    term: 'Cross-platform framework',
    definition:
      'A framework intended to let one codebase target multiple operating systems with shared application logic and significant shared UI code.',
  },
]

export default function FlutterVsReactNativePage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Flutter vs React Native',
    defaultTab: 'big-picture',
  })
  return (
    <TopicPageShell
      title="Flutter vs React Native"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Flutter vs React Native</h1>
      <p className="frn98-intro">
        This page compares two major cross-platform mobile frameworks in the dimensions that usually
        matter in real engineering decisions: architecture, rendering, syntax and APIs, ecosystem,
        native integration, performance, staffing, use cases, tradeoffs, and the kinds of teams that
        benefit most from each approach.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPictureSections[0]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-when-flutter-fits" className="bin98-section">
            <h2 className="bin98-heading">When Flutter Fits Better</h2>
            {bigPictureSections[1]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-when-rn-fits" className="bin98-section">
            <h2 className="bin98-heading">When React Native Fits Better</h2>
            {bigPictureSections[2]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Tradeoffs and Decision Drivers</h2>
            {bigPictureSections[3]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          {conceptSections.map((section, index) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {index < conceptSections.length - 1 ? <hr className="bin98-divider" /> : null}
            </section>
          ))}
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-ui" className="bin98-section">
            <h2 className="bin98-heading">{examples.ui.title}</h2>
            <p>{examples.ui.intro}</p>
            <h3 className="bin98-subheading">Flutter</h3>
            <div className="bin98-codebox">
              <code>{examples.ui.flutterCode}</code>
            </div>
            <h3 className="bin98-subheading">React Native</h3>
            <div className="bin98-codebox">
              <code>{examples.ui.reactNativeCode}</code>
            </div>
            <ul>
              {examples.ui.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="ex-platform" className="bin98-section">
            <h2 className="bin98-heading">{examples.platform.title}</h2>
            <p>{examples.platform.intro}</p>
            <h3 className="bin98-subheading">Flutter</h3>
            <div className="bin98-codebox">
              <code>{examples.platform.flutterCode}</code>
            </div>
            <h3 className="bin98-subheading">React Native</h3>
            <div className="bin98-codebox">
              <code>{examples.platform.reactNativeCode}</code>
            </div>
            <ul>
              {examples.platform.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="ex-reference" className="bin98-section">
            <h2 className="bin98-heading">Decision Reference</h2>
            <p>
              Use this summary when the framework comparison needs to become a practical decision
              for a real mobile team.
            </p>
            <ul>
              {decisionReference.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
