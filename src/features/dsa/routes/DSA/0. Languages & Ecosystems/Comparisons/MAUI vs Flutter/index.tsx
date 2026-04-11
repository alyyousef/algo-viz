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
  'MAUI and Flutter both promise cross-platform application development from a shared codebase, but they approach that goal differently. MAUI extends the .NET application platform into mobile and desktop experiences. Flutter provides its own UI framework and rendering model, aiming for strong visual consistency and a highly unified cross-platform developer experience.',
  'The practical choice is not just about language preference. It is about whether the team wants to stay close to the .NET ecosystem and native platform integration patterns, or whether it wants a framework-centric approach with a highly controlled UI layer and a distinct cross-platform runtime model.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'MAUI, short for .NET Multi-platform App UI, is Microsoftâ€™s cross-platform framework for building applications across mobile and desktop targets using the .NET ecosystem. It is a natural choice for teams already invested in C#, .NET tooling, and Microsoft platform workflows.',
      'Flutter is Googleâ€™s UI toolkit for building cross-platform applications from a single codebase using Dart. It is known for fast iteration, a strong widget-based model, and a rendering approach that gives the framework a high degree of control over the visual layer across platforms.',
    ],
  },
  {
    id: 'bp-shared-goal',
    title: 'What They Are Both Trying to Do',
    paragraphs: [
      'Both frameworks aim to reduce duplicated effort across platforms by sharing application logic and much of the UI code. Both support mobile development and broader cross-platform product ambitions. Both also promise higher delivery efficiency than maintaining completely separate native codebases.',
      'The important difference is how they interpret cross-platform development. MAUI leans into the .NET platform and native ecosystem integration. Flutter leans into owning the UI layer more completely so it can offer strong consistency across targets.',
    ],
    bullets: [
      'Shared code across multiple platforms.',
      'Single-team delivery for mobile and often desktop targets.',
      'Aims to reduce duplication compared to fully separate native apps.',
      'Useful when product scope or staffing makes full native duplication expensive.',
    ],
  },
  {
    id: 'bp-when-maui-fits',
    title: 'When MAUI Is Usually the Better Fit',
    paragraphs: [
      'MAUI is usually the better fit when the team is already deeply invested in .NET, C#, Visual Studio, and Microsoft platform workflows. It is especially attractive for organizations that build multiple kinds of .NET software and want their mobile or desktop apps to stay in the same broad engineering ecosystem.',
      'It is also attractive when native platform integration and enterprise application patterns matter more than maximum framework-level visual control.',
    ],
    bullets: [
      'Teams already standardized on .NET and C#.',
      'Organizations with strong Microsoft tooling and platform investment.',
      'Enterprise apps that benefit from a .NET-centric stack.',
      'Scenarios where platform integration matters more than framework-owned UI consistency.',
    ],
  },
  {
    id: 'bp-when-flutter-fits',
    title: 'When Flutter Is Usually the Better Fit',
    paragraphs: [
      'Flutter is usually the better fit when teams want a highly cohesive cross-platform UI framework with strong developer ergonomics, fast iteration, and a rendering model that produces consistent results across devices. It is especially attractive for product teams building consumer-facing apps with custom UI needs.',
      'It is also attractive when the organization is not already anchored to a specific enterprise stack and wants a framework-centered approach that behaves consistently across mobile platforms.',
    ],
    bullets: [
      'Consumer products with custom or heavily branded UI.',
      'Teams that value hot reload and fast design iteration.',
      'Projects where cross-platform UI consistency is a major goal.',
      'Organizations not specifically tied to the .NET ecosystem.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The fastest way to decide is to ask what the team is actually optimizing for. If the answer is ecosystem alignment with .NET and enterprise tooling, MAUI becomes stronger. If the answer is cross-platform UI consistency and framework-centric productivity, Flutter becomes stronger.',
    ],
    bullets: [
      'Choose MAUI when .NET ecosystem leverage matters most.',
      'Choose Flutter when cross-platform UI consistency matters most.',
      'Choose MAUI when C# and Microsoft workflows are strategic assets.',
      'Choose Flutter when product iteration and custom UI are central concerns.',
      'Treat team context and platform strategy as part of the technical decision.',
    ],
  },
]

const coreConceptSectionsBase: ContentSection[] = [
  {
    id: 'core-ecosystem-center',
    title: 'Ecosystem Center of Gravity',
    paragraphs: [
      'MAUI is centered on the .NET ecosystem. That means the frameworkâ€™s biggest strategic advantage is not merely UI sharing, but continuity with C#, .NET libraries, Microsoft tooling, and enterprise development habits that many organizations already use elsewhere.',
      'Flutter is centered on its own framework model and developer workflow. Its strategic advantage is less about fitting into an existing enterprise platform and more about offering a unified application-development experience with strong control over UI behavior.',
    ],
  },
  {
    id: 'core-ui-model',
    title: 'UI Model and Rendering Approach',
    paragraphs: [
      'MAUI generally stays closer to native platform concepts and platform integration patterns. This can be beneficial when the application should feel closely aligned with the underlying operating system and when platform-specific capabilities need to remain explicit.',
      'Flutter renders through its own widget system and rendering pipeline. This gives it stronger control over the visual layer, which often results in consistent behavior and design across platforms, but it also means the framework is taking on more responsibility instead of leaning on native UI conventions directly.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Developer Experience',
    paragraphs: [
      'MAUI is a natural extension of the Visual Studio and .NET workflow. For teams already fluent in that ecosystem, this can reduce adoption friction and keep mobile or desktop work aligned with the rest of the organizationâ€™s engineering platform.',
      'Flutter is known for an unusually pleasant developer loop, especially through hot reload and the clarity of its widget-driven UI model. This fast feedback cycle is one of its strongest selling points in product-centric development.',
    ],
  },
  {
    id: 'core-language-choice',
    title: 'Language and Team Skills',
    paragraphs: [
      'MAUI uses C#, which is a major advantage in organizations already staffed around .NET. It allows cross-platform application work to stay inside a language ecosystem that may already power backend services, tools, and internal platforms.',
      'Flutter uses Dart, which is less universally adopted outside Flutter itself. That can be a disadvantage if the team wants broad language reuse elsewhere, but not necessarily if the team is happy to treat Flutter as a focused product-development stack.',
    ],
  },
  {
    id: 'core-platform-coverage',
    title: 'Platform Coverage and Product Scope',
    paragraphs: [
      'MAUI is often chosen by teams that want one .NET-centered approach across mobile and desktop targets. Its value increases when the organization wants a shared technology story across several application categories.',
      'Flutter is often chosen by teams that care first about mobile product experience and then potentially extend outward to other platforms through the same framework. Its strongest perception remains around cross-platform mobile UI development.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  ...coreConceptSectionsBase,
  {
    id: 'core-native-integration',
    title: 'Native Integration and Platform Feel',
    paragraphs: [
      'MAUI often appeals to teams that want to remain close to native platform concepts while still benefiting from code sharing. The framework works best when teams are comfortable thinking in terms of platform integration and enterprise application structure rather than purely framework-owned UI abstraction.',
      'Flutter can integrate with native capabilities effectively, but its center of gravity is the framework itself. It often feels strongest when the product team wants the framework to define much of the UI experience rather than adapting deeply to each platformâ€™s native visual identity.',
    ],
  },
  {
    id: 'core-performance-iteration',
    title: 'Performance and Iteration Speed',
    paragraphs: [
      'Flutter is widely associated with fast iteration and a strong design-development loop, largely because of its hot reload workflow and the immediacy of its widget model. For UI-heavy teams, this can materially improve day-to-day productivity.',
      'MAUI can be highly productive as well, especially for .NET teams, but its strongest argument is often stack alignment rather than a dramatic advantage in visual iteration speed. The decision often depends on whether the team values framework UX speed or ecosystem continuity more.',
    ],
  },
  {
    id: 'core-enterprise-vs-product',
    title: 'Enterprise Fit Versus Product Fit',
    paragraphs: [
      'MAUI often resonates more naturally in enterprise organizations already committed to Microsoft technologies. If the app is part of a wider .NET estate, the framework can reduce organizational friction by keeping language, tooling, and platform conventions aligned.',
      'Flutter often resonates more naturally in product teams that prioritize frontend velocity, custom visual design, and a framework experience that feels intentionally optimized for building polished consumer apps.',
    ],
  },
  {
    id: 'core-maturity-tradeoffs',
    title: 'Maturity, Community, and Risk Perception',
    paragraphs: [
      'Flutter is often perceived as having strong community momentum and a very visible modern mobile development identity. That matters because community momentum affects package availability, learning resources, and the confidence of teams choosing a framework for new work.',
      'MAUI benefits from the strength of the broader .NET ecosystem, but teams may evaluate it differently depending on how much they care about dedicated cross-platform UI community breadth versus general .NET platform maturity.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'MAUI often wins when existing .NET leverage is the central advantage. Flutter often wins when the product team wants a highly cohesive cross-platform UI framework with strong iteration ergonomics. Neither is automatically better in the abstract because they optimize for different organizational realities.',
      'The common mistake is to compare them only as two UI frameworks. One is often part of a broader .NET platform strategy, while the other is often part of a framework-first product development strategy.',
    ],
    bullets: [
      'Choose MAUI for .NET alignment and enterprise ecosystem continuity.',
      'Choose Flutter for framework-driven UI consistency and fast iteration.',
      'Prefer team and ecosystem fit over marketing narratives.',
      'Treat delivery model and long-term staffing as part of the decision.',
    ],
  },
  {
    id: 'core-architecture-guidance',
    title: 'Architecture Guidance',
    paragraphs: [
      'If the team already shares business logic, APIs, authentication models, and tooling across a .NET estate, MAUI can reduce the number of conceptual and operational systems the organization must maintain. That is often its strongest architectural argument.',
      'If the team is building a product where the UI layer is central to differentiation and cross-platform consistency matters more than .NET alignment, Flutter is often the stronger architectural choice. The frameworkâ€™s ownership of rendering and UI structure becomes a strategic benefit rather than just an implementation detail.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-language-stack',
    title: 'Typical Stack Contrast',
    description: [
      'The most practical difference between the frameworks often starts with the surrounding language and toolchain decision.',
    ],
    code: `MAUI:
C#
.NET runtime
Visual Studio workflow

Flutter:
Dart
Flutter engine and widget system
Flutter tooling workflow`,
    notes: [
      'This is often the real first decision: stay in .NET or adopt Flutterâ€™s own framework stack.',
      'The rest of the architecture usually follows from that ecosystem choice.',
    ],
  },
  {
    id: 'examples-ui-approach',
    title: 'UI Ownership Contrast',
    description: ['The frameworks differ meaningfully in how much they want to own the UI layer.'],
    code: `MAUI emphasis:
closer platform integration
native ecosystem alignment

Flutter emphasis:
framework-owned widgets
consistent cross-platform rendering`,
    notes: [
      'This distinction shapes both developer experience and final product feel.',
      'It also affects how teams think about design systems and platform adaptation.',
    ],
  },
  {
    id: 'examples-team-fit',
    title: 'Team Fit Example',
    description: [
      'The same product can rationally choose different frameworks depending on team makeup and organizational context.',
    ],
    code: `Choose MAUI when:
the organization is already .NET-heavy
mobile is part of a larger Microsoft-aligned stack

Choose Flutter when:
the team optimizes for product iteration
custom UI consistency is a central goal`,
    notes: [
      'This is why framework choice is often organizational as much as technical.',
      'The best answer depends on the rest of the stack, not just the mobile app itself.',
    ],
  },
  {
    id: 'examples-product-direction',
    title: 'Product Direction Example',
    description: ['Different product goals naturally push teams toward different frameworks.'],
    code: `Internal enterprise app:
MAUI often gains from .NET continuity

Consumer-facing app with custom design:
Flutter often gains from UI consistency and iteration speed`,
    notes: [
      'This is not an absolute rule, but it reflects the common strategic fit of each framework.',
      'Context determines whether ecosystem continuity or framework-owned UI is more valuable.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-maui',
    title: 'MAUI Terms',
    terms: [
      {
        term: 'MAUI',
        definition:
          'Microsoftâ€™s .NET Multi-platform App UI framework for building cross-platform apps.',
      },
      {
        term: '.NET',
        definition:
          'Microsoftâ€™s broader application platform and runtime ecosystem, including C# and related tooling.',
      },
      {
        term: 'Visual Studio Workflow',
        definition:
          'The development experience centered on Microsoftâ€™s IDE, project system, and debugging tools.',
      },
      {
        term: 'Platform Integration',
        definition:
          'The degree to which an app framework aligns with native platform capabilities and conventions.',
      },
    ],
  },
  {
    id: 'glossary-flutter',
    title: 'Flutter Terms',
    terms: [
      {
        term: 'Flutter',
        definition:
          'Googleâ€™s cross-platform UI toolkit for building apps from a shared codebase.',
      },
      {
        term: 'Dart',
        definition: 'The programming language used to build Flutter applications.',
      },
      {
        term: 'Widget',
        definition: 'The basic building block of Flutter UI composition.',
      },
      {
        term: 'Hot Reload',
        definition:
          'A development feature that applies code changes rapidly without restarting the whole app state from scratch.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Cross-Platform Terms',
    terms: [
      {
        term: 'Cross-Platform Framework',
        definition:
          'A framework that aims to let one codebase target multiple operating systems or device categories.',
      },
      {
        term: 'Code Sharing',
        definition:
          'Reusing the same application logic or UI code across multiple target platforms.',
      },
      {
        term: 'Ecosystem Fit',
        definition:
          'How well a framework aligns with the languages, tooling, libraries, and skills already present in an organization.',
      },
      {
        term: 'Rendering Model',
        definition: 'The way a framework draws and manages UI on screen across platforms.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-shared-goal', label: 'Shared Goal' },
    { id: 'bp-when-maui-fits', label: 'When MAUI Fits' },
    { id: 'bp-when-flutter-fits', label: 'When Flutter Fits' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-ecosystem-center', label: 'Ecosystem Center of Gravity' },
    { id: 'core-ui-model', label: 'UI Model and Rendering Approach' },
    { id: 'core-tooling', label: 'Tooling and Developer Experience' },
    { id: 'core-language-choice', label: 'Language and Team Skills' },
    { id: 'core-platform-coverage', label: 'Platform Coverage and Product Scope' },
    { id: 'core-native-integration', label: 'Native Integration and Platform Feel' },
    { id: 'core-performance-iteration', label: 'Performance and Iteration Speed' },
    { id: 'core-enterprise-vs-product', label: 'Enterprise Fit Versus Product Fit' },
    { id: 'core-maturity-tradeoffs', label: 'Maturity and Community' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-architecture-guidance', label: 'Architecture Guidance' },
  ],
  examples: [
    { id: 'examples-language-stack', label: 'Typical Stack Contrast' },
    { id: 'examples-ui-approach', label: 'UI Ownership Contrast' },
    { id: 'examples-team-fit', label: 'Team Fit Example' },
    { id: 'examples-product-direction', label: 'Product Direction Example' },
  ],
  glossary: [
    { id: 'glossary-maui', label: 'MAUI Terms' },
    { id: 'glossary-flutter', label: 'Flutter Terms' },
    { id: 'glossary-shared', label: 'Shared Cross-Platform Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="maui-flutter-help-section">
      <h2 className="maui-flutter-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="maui-flutter-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="maui-flutter-help-section">
      <h2 className="maui-flutter-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="maui-flutter-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="maui-flutter-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="maui-flutter-help-section">
      <h2 className="maui-flutter-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="maui-flutter-help-divider" />}
    </section>
  )
}

export default function MauiVsFlutterPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'MAUI vs Flutter',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="MAUI vs Flutter"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">MAUI vs Flutter</h1>
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
