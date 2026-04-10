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
  'Ionic and Capacitor are related, but they are not the same thing. Ionic is the UI toolkit and developer experience layer for building mobile-friendly interfaces with web technologies. Capacitor is the native runtime and plugin system that packages a web app into native mobile apps and exposes native device features when needed.',
  'That distinction matters because teams often talk about "Ionic" as if it includes everything. In practice, the real stack is usually a web framework such as React, Angular, Vue, or plain web components, then Ionic for mobile UI patterns, then Capacitor for native packaging and native APIs. Understanding the boundaries between those layers is what makes the architecture legible.',
  'This page is intentionally comprehensive. It covers what Ionic and Capacitor each do, how they fit together, the web-first mobile model, native plugin access, project structure, navigation, deployment, platform customization, offline and PWA angles, build and store release realities, performance tradeoffs, and the common mistakes teams make when they assume a web-native stack will behave exactly like either a browser-only app or a fully native app.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Ionic and Capacitor form a web-first mobile stack. Ionic provides the UI system and mobile-style components. Capacitor provides the native app container, plugin bridge, and platform integration that let a web application run as an installable mobile app.',
      'This is not the same model as a shared native rendering framework. Ionic apps are fundamentally web apps at the UI layer, usually running inside a native WebView when packaged for mobile. Capacitor makes that web app feel like part of a native project by exposing native APIs, native projects, and store-deployable builds.',
      'The most important architectural point is that Ionic and Capacitor are complementary layers. Ionic is not the native bridge, and Capacitor is not the UI framework. Teams that understand that separation make better decisions about performance, plugins, and platform behavior.',
    ],
  },
  {
    id: 'bp-why-this-stack-matters',
    title: 'Why This Stack Matters',
    paragraphs: [
      'Many teams want to reuse web engineering skills for mobile products without fully rewriting the application in native Android or iOS UI frameworks. Ionic and Capacitor matter because they offer a relatively direct path from web application architecture into mobile app delivery.',
      'This can be especially attractive when the product already has a strong web team, when time-to-market matters, or when the application is more workflow-heavy than animation-heavy.',
    ],
    bullets: [
      'It lets web teams build mobile apps with familiar technologies.',
      'It preserves a web-first architecture while still reaching app stores.',
      'It supports native capabilities through Capacitor plugins.',
      'It can share significant code with web-facing products or internal tooling.',
    ],
  },
  {
    id: 'bp-ionic-vs-capacitor',
    title: 'Ionic Versus Capacitor',
    paragraphs: [
      'Ionic is the component and experience layer. It provides mobile-oriented UI components, layout patterns, styling, and framework integrations for React, Angular, Vue, and web components. Capacitor is the runtime and native bridge. It creates the native project shells and exposes native device capabilities to the web code.',
      'That difference is foundational. An app can use Capacitor without Ionic, and an app can use Ionic in a web context without packaging it as a native app. The two often travel together, but they solve different problems.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Ionic and Capacitor Fit Best',
    paragraphs: [
      'This stack is strongest when the product is naturally compatible with a web-style UI and when the team values shared web knowledge highly. Business apps, dashboards, workflow-heavy products, field tools, and app-like wrappers around strong web functionality are common fits.',
      'It can also work well when the mobile product is one part of a broader web-centered platform and the organization wants the web application model to stay central.',
    ],
  },
  {
    id: 'bp-what-it-does-not-replace',
    title: 'What It Does Not Replace',
    paragraphs: [
      'Ionic and Capacitor do not magically turn a web UI into a fully native rendering model. They also do not remove the need to understand app-store release processes, native permissions, device lifecycle differences, offline behavior, or plugin maintenance.',
      'The stack also does not eliminate the need for performance awareness. A WebView-based mobile app has real tradeoffs, and teams should choose it because the tradeoff fits, not because they assume mobile and web are now identical.',
    ],
    bullets: [
      'It does not replace native release and permission workflows.',
      'It does not make all mobile UX constraints disappear.',
      'It does not remove performance tradeoffs of web rendering on mobile.',
      'It does not eliminate plugin or native integration maintenance.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'In production, successful Ionic and Capacitor teams usually standardize the stack tightly. They choose one front-end framework, one navigation approach, a curated plugin set, and a repeatable native build process. The healthiest teams treat the stack as a deliberate mobile platform, not a web side project that happened to get packaged.',
      'As of March 31, 2026, the official Ionic and Capacitor docs still frame this as a web-first native deployment model with explicit plugin and platform ownership. Teams should rely on those current docs because older Cordova-era mental models are often misleading when applied directly to modern Capacitor projects.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'When evaluating Ionic and Capacitor, the useful questions are practical. Is the app a good fit for web-style UI? How much platform-specific UX is required? Which native plugins are needed? Does the team already have strong web engineering capability? Will the performance envelope be acceptable for the product type?',
      'Most disappointments come from mismatch. The right fit is a team that wants web-first development with app-store delivery and is willing to manage the native edges honestly.',
    ],
    bullets: [
      'Choose it when web-first architecture is a strength, not a compromise.',
      'Audit plugin and native capability needs early.',
      'Assume mobile release processes still matter.',
      'Measure the real performance needs of the product.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-ionic-is',
    title: 'What Ionic Actually Is',
    paragraphs: [
      'Ionic is a UI toolkit and developer experience layer for building mobile-style interfaces with web technologies. It provides components, styling patterns, and integrations that help web applications feel more like mobile applications.',
      'The framework is intentionally adaptable across different web stacks. It can sit inside React, Angular, Vue, or plain web-component workflows. That flexibility is part of why Ionic is an ecosystem layer rather than a single-language or single-framework environment.',
    ],
  },
  {
    id: 'core-what-capacitor-is',
    title: 'What Capacitor Actually Is',
    paragraphs: [
      'Capacitor is a native runtime and plugin bridge for web apps. It packages a web application into native Android and iOS projects and provides a plugin system for accessing native capabilities such as camera, filesystem, device information, and more.',
      'This means Capacitor is the piece that turns a web app into something that can meaningfully participate in the native app lifecycle, device APIs, and store release process.',
    ],
  },
  {
    id: 'core-webview-model',
    title: 'The WebView-Based Mobile Model',
    paragraphs: [
      'At the UI layer, Ionic plus Capacitor typically means the app is rendered as web content inside a native app container. That is a WebView-based model. The native shell provides packaging, plugin access, and store distribution, while the app UI remains fundamentally web-rendered.',
      'This is the central tradeoff of the stack. It preserves web development ergonomics, but it also means teams need to reason honestly about WebView behavior, layout performance, and device-specific constraints.',
    ],
  },
  {
    id: 'core-framework-choice',
    title: 'React, Angular, Vue, or Web Components',
    paragraphs: [
      'Ionic does not force one front-end framework. Teams can use Ionic with React, Angular, Vue, or a more direct web-component approach. That flexibility is attractive, but it also means the surrounding application architecture still needs to be chosen deliberately.',
      'The healthiest projects usually standardize on one framework and keep the rest of the stack consistent. Too much flexibility inside one codebase usually creates confusion rather than freedom.',
    ],
  },
  {
    id: 'core-navigation',
    title: 'Navigation and Mobile App Structure',
    paragraphs: [
      'Navigation in an Ionic app is typically handled through the chosen web framework plus Ionic-specific navigation primitives or conventions. This matters because mobile navigation has expectations around tabs, stacks, back behavior, and transitions that are not identical to ordinary browser navigation.',
      'The engineering lesson is that mobile navigation should be treated as a product structure concern, not just a route table concern.',
    ],
  },
  {
    id: 'core-plugins',
    title: 'Capacitor Plugins and Native Device Access',
    paragraphs: [
      'Capacitor plugins are one of the most important parts of the ecosystem because they define how the web layer reaches native capabilities. Official plugins cover common device features, and custom plugins are possible when the app needs behavior outside the existing plugin surface.',
      'This is where the stack stops being "just web." Once native device APIs matter, plugin quality, maintenance, and platform-specific behavior become part of the real app architecture.',
    ],
  },
  {
    id: 'core-native-projects',
    title: 'Native Android and iOS Project Ownership',
    paragraphs: [
      'Capacitor creates and maintains native Android and iOS project structures alongside the web app. Teams do not escape native projects entirely. They just work with them from a web-first center of gravity.',
      'This is strategically important because store submission, signing, permissions, icons, splash screens, and certain native integrations still live in that native project surface.',
    ],
  },
  {
    id: 'core-pwa-offline',
    title: 'PWA, Offline, and Multi-Channel Delivery',
    paragraphs: [
      'One of the attractive aspects of the Ionic ecosystem is that web-first code can often serve more than one delivery model. The same general application may support browser delivery, PWA behavior, and native packaging through Capacitor, depending on product goals.',
      'That flexibility is valuable, but it also requires clear thinking about offline behavior, device storage, platform permissions, and what each distribution mode is supposed to guarantee.',
    ],
  },
  {
    id: 'core-build-release',
    title: 'Build, Sync, and Store Release Workflow',
    paragraphs: [
      'Ionic and Capacitor projects usually have two major workflows: building the web application and syncing or packaging it into native projects for mobile builds. This is why the stack feels like a layered pipeline rather than one magic compiler step.',
      'Teams need to understand both halves. A successful web build is not the same thing as a successful mobile release. Native build configuration and store deployment still remain real operational concerns.',
    ],
  },
  {
    id: 'core-platform-customization',
    title: 'Platform-Specific Customization',
    paragraphs: [
      'Even in a mostly shared web codebase, Android and iOS may need different behavior for permissions, keyboard handling, safe areas, gestures, notifications, or native plugin configuration. Capacitor makes that possible, but the team still has to own it.',
      'Cross-platform web-to-mobile development works best when platform-specific behavior is recognized early instead of being treated as an annoying exception at the end.',
    ],
  },
  {
    id: 'core-testing-debugging',
    title: 'Testing, Debugging, and Developer Experience',
    paragraphs: [
      'Testing and debugging span web tooling and native app behavior. Browser-based debugging, device testing, emulator or simulator runs, plugin verification, and release testing all matter. The stack is productive when teams are comfortable at both the web layer and the packaged-app layer.',
      'This is why developer experience should be evaluated honestly. A team that is strong in web debugging but weak in native release operations may still need to raise its operational bar.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Product Fit',
    paragraphs: [
      'Ionic and Capacitor can perform well for many application types, but performance depends heavily on product shape. Form-heavy business apps and workflow applications often fit well. Highly animation-intensive or graphics-intensive experiences may stress the WebView model more.',
      'The right mindset is not ideological. Measure whether the product experience meets the standard users expect. The stack is good when it is good enough for the actual interaction model of the product.',
    ],
  },
  {
    id: 'core-common-mistakes',
    title: 'Common Ionic and Capacitor Mistakes',
    paragraphs: [
      'Common mistakes include confusing Ionic with Capacitor, assuming the native project layer can be ignored forever, importing too many plugins without clear ownership, and assuming browser success automatically means mobile app success.',
      'Another recurring mistake is choosing the stack for every mobile problem instead of only for products whose UX and team structure genuinely fit a web-first mobile model.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-stack-split',
    title: 'Separating the Layers Clearly',
    description: [
      'The most important conceptual example is simply understanding which layer does what in the stack.',
    ],
    code: `web framework (React / Angular / Vue)
  -> Ionic UI components and patterns
  -> Capacitor native runtime and plugins
  -> Android / iOS native projects`,
    notes: [
      'This mental model prevents a large amount of confusion later.',
      'The layers work together, but they are not interchangeable.',
    ],
  },
  {
    id: 'examples-capacitor-config',
    title: 'Basic Capacitor Configuration',
    description: [
      'Capacitor configuration sits near the boundary between web app behavior and native packaging.',
    ],
    code: `const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'ExampleApp',
  webDir: 'dist',
}`,
    notes: [
      'This illustrates that a built web directory becomes part of the native app packaging flow.',
      'Capacitor configuration is operationally important, not just setup boilerplate.',
    ],
  },
  {
    id: 'examples-plugin',
    title: 'Using a Native Plugin',
    description: [
      'Capacitor plugins are where native device capabilities become available to the web code.',
    ],
    code: `import { Camera, CameraResultType } from '@capacitor/camera'

const image = await Camera.getPhoto({
  resultType: CameraResultType.Uri,
})`,
    notes: [
      'This is where the stack stops being only a browser application.',
      'Plugin choice and platform behavior should be treated as architecture, not decoration.',
    ],
  },
  {
    id: 'examples-sync',
    title: 'Syncing Web Changes into Native Projects',
    description: [
      'The build pipeline is layered, so teams need to understand how web output becomes a mobile app update.',
    ],
    code: `npm run build
npx cap sync
npx cap open android`,
    notes: [
      'A successful web build is only one stage in the overall mobile workflow.',
      'Native project updates are part of normal development and release operations.',
    ],
  },
  {
    id: 'examples-ionic-component',
    title: 'Ionic UI Component Usage',
    description: [
      'Ionic contributes mobile-oriented UI primitives and conventions at the web layer.',
    ],
    code: `<IonPage>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Dashboard</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent fullscreen>
    <IonButton expand="block">Refresh</IonButton>
  </IonContent>
</IonPage>`,
    notes: [
      'This is UI toolkit behavior, not native bridge behavior.',
      'Ionic helps web code feel mobile-structured, but it remains web-rendered UI.',
    ],
  },
  {
    id: 'examples-pwa-native',
    title: 'One App Model, Multiple Delivery Paths',
    description: [
      'A web-first stack can often support both browser and native-app delivery patterns with the same core application.',
    ],
    code: `shared web app
  -> browser delivery
  -> PWA delivery
  -> native packaging through Capacitor`,
    notes: [
      "This multi-channel story is one of the stack's strongest strategic advantages.",
      'It only works well when the product and platform assumptions are explicit.',
    ],
  },
  {
    id: 'examples-native-customization',
    title: 'Native Project Surface Still Exists',
    description: [
      'Even a web-first app still owns native project details when packaging for mobile stores.',
    ],
    code: `android/
ios/

native concerns:
  permissions
  signing
  store metadata
  plugin setup`,
    notes: [
      'Capacitor reduces native friction, but it does not eliminate native project ownership.',
      'Release discipline still matters on each platform.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Ionic and Capacitor Terms',
    terms: [
      {
        term: 'Ionic',
        definition:
          'A UI toolkit and mobile-focused developer experience layer for building app interfaces with web technologies.',
      },
      {
        term: 'Capacitor',
        definition:
          'A native runtime and plugin bridge that packages web apps into native mobile projects and exposes native APIs.',
      },
      {
        term: 'WebView',
        definition:
          'The embedded browser runtime used to render web content inside a native mobile application.',
      },
      {
        term: 'Plugin',
        definition:
          'A package that exposes native device capabilities to the web layer through Capacitor.',
      },
      {
        term: 'webDir',
        definition:
          'The built web-app directory that Capacitor packages into the native application.',
      },
      {
        term: 'Native project',
        definition:
          'The Android or iOS project generated or maintained alongside the web app for native builds and releases.',
      },
      {
        term: 'Sync',
        definition:
          'The process of updating native project assets and configuration from the current web build and Capacitor setup.',
      },
      {
        term: 'Hybrid app',
        definition:
          'An app model that combines a native shell with web-rendered application content.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture and Delivery Terms',
    terms: [
      {
        term: 'Web-first architecture',
        definition:
          'A development approach where the primary app model is a web application that can also be deployed into native containers.',
      },
      {
        term: 'PWA',
        definition:
          'Progressive Web App, a browser-deliverable app experience that may share code with an Ionic application.',
      },
      {
        term: 'Platform customization',
        definition:
          'The process of handling Android-specific or iOS-specific behavior even in a mostly shared codebase.',
      },
      {
        term: 'Store release',
        definition: 'A native mobile app release submitted to Google Play or the Apple App Store.',
      },
      {
        term: 'Navigation structure',
        definition:
          'The app-level route and screen organization model used to define mobile movement through the product.',
      },
      {
        term: 'Offline behavior',
        definition:
          'The way the application handles network absence, cached data, and local usability expectations.',
      },
      {
        term: 'Plugin ownership',
        definition:
          'The responsibility for understanding, updating, and debugging native-plugin dependencies in the app.',
      },
      {
        term: 'Product fit',
        definition:
          'Whether the interaction model and performance needs of the app align with a web-first mobile stack.',
      },
    ],
  },
  {
    id: 'glossary-workflow',
    title: 'Workflow and Tooling Terms',
    terms: [
      {
        term: 'Ionic CLI',
        definition:
          'The command-line tooling used for Ionic project setup and development workflows.',
      },
      {
        term: 'Capacitor CLI',
        definition:
          'The command-line tooling used for Capacitor configuration, sync, platform management, and native project operations.',
      },
      {
        term: 'Native bridge',
        definition:
          'The communication layer that lets the web app call native device capabilities.',
      },
      {
        term: 'Framework integration',
        definition:
          'The use of Ionic within a specific web framework such as React, Angular, or Vue.',
      },
      {
        term: 'Build pipeline',
        definition:
          'The sequence of producing the web app, syncing it into native projects, and generating mobile deliverables.',
      },
      {
        term: 'Emulator or simulator',
        definition:
          'A virtual mobile environment used to test packaged Ionic and Capacitor apps during development.',
      },
      {
        term: 'Permission flow',
        definition:
          'The app behavior and native configuration required to access protected device capabilities.',
      },
      {
        term: 'Release discipline',
        definition:
          'The repeatable operational process used to move from web changes to tested native app-store releases.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-this-stack-matters', label: 'Why This Stack Matters' },
    { id: 'bp-ionic-vs-capacitor', label: 'Ionic Versus Capacitor' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-what-it-does-not-replace', label: 'What It Does Not Replace' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-what-ionic-is', label: 'What Ionic Is' },
    { id: 'core-what-capacitor-is', label: 'What Capacitor Is' },
    { id: 'core-webview-model', label: 'WebView Model' },
    { id: 'core-framework-choice', label: 'Framework Choice' },
    { id: 'core-navigation', label: 'Navigation' },
    { id: 'core-plugins', label: 'Plugins' },
    { id: 'core-native-projects', label: 'Native Project Ownership' },
    { id: 'core-pwa-offline', label: 'PWA and Offline' },
    { id: 'core-build-release', label: 'Build and Release Workflow' },
    { id: 'core-platform-customization', label: 'Platform Customization' },
    { id: 'core-testing-debugging', label: 'Testing and Debugging' },
    { id: 'core-performance', label: 'Performance and Fit' },
    { id: 'core-common-mistakes', label: 'Common Mistakes' },
  ],
  examples: [
    { id: 'examples-stack-split', label: 'Layer Split' },
    { id: 'examples-capacitor-config', label: 'Capacitor Config' },
    { id: 'examples-plugin', label: 'Plugin Usage' },
    { id: 'examples-sync', label: 'Build and Sync' },
    { id: 'examples-ionic-component', label: 'Ionic Components' },
    { id: 'examples-pwa-native', label: 'Multiple Delivery Paths' },
    { id: 'examples-native-customization', label: 'Native Project Surface' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Terms' },
    { id: 'glossary-architecture', label: 'Architecture Terms' },
    { id: 'glossary-workflow', label: 'Workflow Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ionic-capacitor-help-section">
      <h2 className="ionic-capacitor-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="ionic-capacitor-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ionic-capacitor-help-section">
      <h2 className="ionic-capacitor-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="ionic-capacitor-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="ionic-capacitor-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ionic-capacitor-help-section">
      <h2 className="ionic-capacitor-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="ionic-capacitor-help-divider" />}
    </section>
  )
}

export default function IonicAndCapacitorPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Ionic and Capacitor',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Ionic and Capacitor"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Ionic and Capacitor</h1>
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
