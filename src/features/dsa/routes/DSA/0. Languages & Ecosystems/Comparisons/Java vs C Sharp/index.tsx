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
  'Java and C# are two of the most important managed languages in modern software engineering. Both target virtual runtimes, both support strong tooling, both are common in enterprise systems, and both can power large backend platforms, desktop tools, and cloud services. The comparison is less about raw capability and more about ecosystem gravity, language ergonomics, platform defaults, and what kind of engineering culture the team is working within.',
  'Historically, Java became the dominant cross-platform enterprise language in the JVM world, while C# became the flagship language of the .NET ecosystem. Today the comparison is more balanced than older stereotypes suggest. C# is no longer Windows-only in practice, and Java is no longer just the language of legacy enterprise servers. Both are modern, productive, and deeply mature.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Java is the defining language of the JVM ecosystem. Its biggest strengths are ecosystem breadth, long-term enterprise stability, massive library availability, and a runtime platform that supports many large-scale systems. Java is deeply embedded in backend services, data platforms, Android history, financial systems, and enterprise integration.',
      'C# is the flagship language of the .NET ecosystem. Its biggest strengths are language ergonomics, strong tooling integration, a cohesive platform model, and an ecosystem that spans backend services, desktop applications, cloud systems, games, and developer tooling. C# often feels more feature-rich and polished at the language level.',
    ],
  },
  {
    id: 'bp-shared-strengths',
    title: 'What They Share',
    paragraphs: [
      'Both languages are statically typed, garbage collected, object-oriented by tradition, and fully capable of supporting large production systems. Both have mature IDE support, testing ecosystems, package managers, dependency injection patterns, async programming support, and strong enterprise usage.',
      'The overlap is so large that many real decisions come down to surrounding ecosystem, hiring pool, team familiarity, and the kinds of applications the company already builds.',
    ],
    bullets: [
      'Managed runtimes with mature garbage collectors.',
      'Strong support for large backend and enterprise systems.',
      'Broad libraries, tooling, and testing ecosystems.',
      'Long-term viability and large developer communities.',
    ],
  },
  {
    id: 'bp-where-java-fits',
    title: 'When Java Is Usually the Better Fit',
    paragraphs: [
      'Java is often the better fit when an organization already has strong JVM investment, uses mature enterprise Java infrastructure, or needs to operate inside the large ecosystem of JVM libraries, frameworks, and operational knowledge. It is also attractive when interoperability with other JVM languages or tools matters.',
      'It remains a very strong choice for enterprise services, data-intensive systems, financial platforms, large backend estates, and organizations with deep operational experience around the JVM.',
    ],
    bullets: [
      'Strong existing investment in JVM infrastructure.',
      'Large-scale backend and enterprise platforms.',
      'Need for the surrounding JVM ecosystem and libraries.',
      'Organizations with deep Java hiring and operations maturity.',
    ],
  },
  {
    id: 'bp-where-csharp-fits',
    title: 'When C# Is Usually the Better Fit',
    paragraphs: [
      'C# is often the better fit when a team wants a modern language with rich syntax, excellent IDE tooling, and strong alignment with the broader .NET platform. It is especially compelling for teams working in Microsoft-heavy environments or using .NET across backend, desktop, internal tools, and cloud systems.',
      'It is also attractive when developers value language expressiveness and a cohesive platform story that feels integrated from compiler to runtime to tooling.',
    ],
    bullets: [
      'Organizations standardized on .NET and Microsoft infrastructure.',
      'Teams that value rich language features and polished tooling.',
      'Projects spanning backend services, desktop apps, and internal tools.',
      'Systems where .NET libraries and platform integration are a natural fit.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'In many cases, the language decision is really an ecosystem decision. Both languages are technically strong enough for the majority of serious business software. The dominant factor is often which runtime, libraries, frameworks, tooling, and organizational habits already exist around the project.',
    ],
    bullets: [
      'Choose Java when JVM ecosystem leverage is the biggest advantage.',
      'Choose C# when the .NET platform and tooling ecosystem are the biggest advantage.',
      'Choose Java when organizational familiarity with JVM operations dominates.',
      'Choose C# when language ergonomics and .NET integration dominate.',
      'Avoid over-indexing on syntax alone; platform fit usually matters more.',
    ],
  },
]

const coreConceptSectionsBase: ContentSection[] = [
  {
    id: 'core-language-design',
    title: 'Language Design and Philosophy',
    paragraphs: [
      'Java historically prioritized simplicity, portability, and predictable enterprise readability. The language has grown significantly over time, but it still tends to feel more conservative and evolution-driven than radically expressive.',
      'C# has often moved more aggressively in adding language features that improve expressiveness and developer ergonomics. Properties, events, LINQ, pattern matching, records, async and await, nullable reference types, and other features contribute to a language that often feels denser and more feature-complete.',
    ],
  },
  {
    id: 'core-runtime-platform',
    title: 'Runtime and Platform Model',
    paragraphs: [
      'Java runs on the JVM, one of the most battle-tested virtual machine platforms in software. The JVM is a major strategic advantage because it supports mature performance engineering, strong observability tools, and a wide ecosystem beyond Java itself.',
      'C# runs on the .NET runtime. Modern .NET is cross-platform and performant, with a cohesive toolchain and strong runtime capabilities. The practical difference today is less about one being capable and the other not, and more about which surrounding platform ecosystem the team wants to live in.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Developer Experience',
    paragraphs: [
      'Java has excellent tooling, especially in IntelliJ-based workflows, mature build tooling, strong profilers, and deep ecosystem support for enterprise development. Its tooling story is powerful, though sometimes more fragmented because the ecosystem is so large and historically layered.',
      'C# has one of the strongest end-to-end tooling stories in mainstream development. The compiler, IDE experience, debugging, language services, project templates, and platform integration often feel unusually cohesive. This is a major reason many developers describe C# as more pleasant day to day.',
    ],
  },
  {
    id: 'core-syntax-ergonomics',
    title: 'Syntax and Ergonomics',
    paragraphs: [
      'Java code often feels explicit and steady. Modern Java has improved dramatically with features like records, pattern matching, improved switch expressions, and better type inference, but it still tends to preserve a conservative readability style.',
      'C# often feels more expressive and compact. Features like properties, expression-bodied members, LINQ, async and await, records, pattern matching, and nullable annotations let developers write high-level code with less ceremony in many common cases.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Libraries',
    paragraphs: [
      'Java benefits from the huge breadth of the JVM ecosystem. There are libraries, frameworks, and historical precedent for nearly every kind of enterprise or backend problem. The ecosystem is vast, which is both a strength and occasionally a source of fragmentation.',
      'C# benefits from the cohesion of the .NET ecosystem. The platform often feels more unified, especially when teams stay close to the standard .NET path. This can reduce tool sprawl and help teams move with a stronger sense of default conventions.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  ...coreConceptSectionsBase,
  {
    id: 'core-backend-enterprise',
    title: 'Backend and Enterprise Development',
    paragraphs: [
      'Java remains one of the defining languages of enterprise backend development. Frameworks, application servers, integration tooling, and operational knowledge around the JVM are all major reasons it remains dominant in many large organizations.',
      'C# is equally serious for enterprise backend work, especially in organizations using ASP.NET Core, Azure, Microsoft identity infrastructure, and the broader .NET platform. The choice often follows which enterprise platform the organization has standardized around rather than any hard technical limitation.',
    ],
  },
  {
    id: 'core-cloud-platform',
    title: 'Cloud and Platform Fit',
    paragraphs: [
      'Java works extremely well in cloud environments and large service fleets, especially where teams already know how to tune and observe JVM workloads. It is common in Kubernetes platforms, internal service meshes, and large-scale API ecosystems.',
      'C# also works very well in cloud environments, particularly in Microsoft-centric cloud organizations and modern ASP.NET Core deployments. Its platform story is often especially compelling when the rest of the organization already uses Azure, Active Directory, SQL Server, or related infrastructure.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Characteristics',
    paragraphs: [
      'Both Java and C# are capable of high performance for general-purpose business systems. The practical performance differences are rarely decisive at architecture-selection time unless a project has very specific runtime constraints.',
      'In most organizations, the more important question is which runtime the team knows how to profile, tune, and operate effectively. Mature performance usually comes more from engineering habits than from small theoretical differences between these two ecosystems.',
    ],
  },
  {
    id: 'core-learning-curve',
    title: 'Learning Curve and Team Familiarity',
    paragraphs: [
      'Java has a huge hiring and training footprint, which makes it easy to find engineers familiar with the language and general enterprise patterns. Its relative conservatism can be a benefit in large teams because the code style is often predictable.',
      'C# is also broadly learnable, especially for teams already working in Microsoft ecosystems. Many developers find it more ergonomic and expressive, though that same expressiveness can lead to a wider variety of coding styles if teams are not disciplined.',
    ],
  },
  {
    id: 'core-platform-breadth',
    title: 'Platform Breadth',
    paragraphs: [
      'Java is strongest in backend, enterprise, large-scale services, tooling, and the broader JVM world. It has historically mattered enormously in Android and data tooling as well, even where the exact platform balance changes over time.',
      'C# is strong in backend systems too, but also has a notable footprint in desktop development, internal business software, cloud tooling, and game development through the Unity ecosystem. That breadth can matter if one organization wants one language across several categories of application.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Java often wins on ecosystem breadth, enterprise precedent, and JVM leverage. C# often wins on language ergonomics, platform cohesion, and developer experience. Neither advantage is universal; each depends on what the organization already values and operates.',
      'The main mistake is to treat either language as obsolete or second-class. Both are mature, modern, and fully capable. The better choice is usually the one that aligns with team familiarity, infrastructure, surrounding platform, and long-term maintenance needs.',
    ],
    bullets: [
      'Choose Java for JVM leverage and established enterprise depth.',
      'Choose C# for .NET leverage and richer language ergonomics.',
      'Prefer platform fit over stylistic preference.',
      'Treat organizational context as part of the technical decision.',
    ],
  },
  {
    id: 'core-architecture-guidance',
    title: 'Architecture Guidance',
    paragraphs: [
      'If the system will live in a JVM-heavy organization or interoperate with mature Java infrastructure, Java is often the lower-risk choice. If the system sits inside a .NET-first organization with strong Microsoft platform investment, C# is often the lower-risk choice.',
      'If neither ecosystem is mandated, then the practical differentiators become language ergonomics, hiring strategy, library preferences, IDE preference, and how much value the team places on the surrounding platform defaults.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-class-model',
    title: 'Basic Class Shape',
    description: [
      'Both languages are object-oriented and familiar to engineers coming from mainstream enterprise development, but the surface syntax differs in how much convenience is built into the language.',
    ],
    code: `// Java
public class UserService {
    public String formatName(String first, String last) {
        return first + " " + last;
    }
}

// C#
public class UserService
{
    public string FormatName(string first, string last)
    {
        return $"{first} {last}";
    }
}`,
    notes: [
      'The core structure is similar, which is why teams often move between the ecosystems without major conceptual shock.',
      'The differences are more about language ergonomics and surrounding platform conventions than about basic programming model.',
    ],
  },
  {
    id: 'examples-records',
    title: 'Modern Data-Carrying Types',
    description: [
      'Both ecosystems now support more concise data-oriented models, though they arrived through different language evolution paths.',
    ],
    code: `// Java
public record User(String id, String name) {}

// C#
public record User(string Id, string Name);`,
    notes: [
      'Modern Java and modern C# both reduced ceremony around simple immutable data shapes.',
      'C# is often perceived as adding ergonomic features earlier and more aggressively.',
    ],
  },
  {
    id: 'examples-async-style',
    title: 'Asynchronous Style',
    description: [
      'Both platforms support asynchronous and concurrent programming, but the surface style and common library idioms differ.',
    ],
    code: `// Java
CompletableFuture<String> value = service.fetchAsync();

// C#
Task<string> value = service.FetchAsync();`,
    notes: [
      'Both ecosystems are capable, but the async style in C# is often viewed as especially ergonomic.',
      'The more important factor is usually framework and platform conventions rather than the existence of async primitives themselves.',
    ],
  },
  {
    id: 'examples-platform-fit',
    title: 'Platform Fit in Practice',
    description: [
      'The decision often looks less like a syntax comparison and more like a platform choice.',
    ],
    code: `Java choice:
JVM services
existing Spring or enterprise Java platform
shared JVM operations expertise

C# choice:
.NET services
existing ASP.NET Core or Microsoft platform
shared .NET tooling and Azure expertise`,
    notes: [
      'This is usually the real decision frame in industry.',
      'Language syntax matters, but platform leverage usually matters more.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-java',
    title: 'Java Terms',
    terms: [
      {
        term: 'JVM',
        definition:
          'The Java Virtual Machine, the runtime platform that executes Java bytecode and many other JVM languages.',
      },
      {
        term: 'Bytecode',
        definition:
          'The intermediate compiled form executed by the JVM rather than directly by hardware.',
      },
      {
        term: 'Record',
        definition: 'A concise Java construct for immutable data-carrying types.',
      },
      {
        term: 'CompletableFuture',
        definition: 'A Java abstraction for asynchronous computation and composition.',
      },
    ],
  },
  {
    id: 'glossary-csharp',
    title: 'C# Terms',
    terms: [
      {
        term: 'CLR',
        definition:
          'The Common Language Runtime, the managed execution environment at the heart of .NET.',
      },
      {
        term: 'Property',
        definition:
          'A C# language feature that exposes getter and setter semantics more directly than traditional methods.',
      },
      {
        term: 'LINQ',
        definition:
          'Language Integrated Query, a C# feature for querying and transforming data with language support.',
      },
      {
        term: 'Task',
        definition:
          'A .NET abstraction representing asynchronous work, commonly used with async and await.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Platform Terms',
    terms: [
      {
        term: 'Managed Runtime',
        definition:
          'A runtime environment that provides services such as garbage collection, type loading, and execution management.',
      },
      {
        term: 'Garbage Collection',
        definition: 'Automatic memory management that reclaims memory no longer in use.',
      },
      {
        term: 'Dependency Injection',
        definition:
          'A pattern for supplying dependencies to components rather than constructing them directly inside those components.',
      },
      {
        term: 'Enterprise Platform',
        definition:
          'A set of organizationally standardized runtime, framework, tooling, and operational conventions for building software.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-shared-strengths', label: 'Shared Strengths' },
    { id: 'bp-where-java-fits', label: 'When Java Fits' },
    { id: 'bp-where-csharp-fits', label: 'When C# Fits' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-language-design', label: 'Language Design and Philosophy' },
    { id: 'core-runtime-platform', label: 'Runtime and Platform Model' },
    { id: 'core-tooling', label: 'Tooling and Developer Experience' },
    { id: 'core-syntax-ergonomics', label: 'Syntax and Ergonomics' },
    { id: 'core-ecosystem', label: 'Ecosystem and Libraries' },
    { id: 'core-backend-enterprise', label: 'Backend and Enterprise Development' },
    { id: 'core-cloud-platform', label: 'Cloud and Platform Fit' },
    { id: 'core-performance', label: 'Performance Characteristics' },
    { id: 'core-learning-curve', label: 'Learning Curve and Team Familiarity' },
    { id: 'core-platform-breadth', label: 'Platform Breadth' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-architecture-guidance', label: 'Architecture Guidance' },
  ],
  examples: [
    { id: 'examples-class-model', label: 'Basic Class Shape' },
    { id: 'examples-records', label: 'Modern Data Types' },
    { id: 'examples-async-style', label: 'Asynchronous Style' },
    { id: 'examples-platform-fit', label: 'Platform Fit in Practice' },
  ],
  glossary: [
    { id: 'glossary-java', label: 'Java Terms' },
    { id: 'glossary-csharp', label: 'C# Terms' },
    { id: 'glossary-shared', label: 'Shared Platform Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="java-csharp-help-section">
      <h2 className="java-csharp-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="java-csharp-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="java-csharp-help-section">
      <h2 className="java-csharp-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="java-csharp-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="java-csharp-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="java-csharp-help-section">
      <h2 className="java-csharp-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="java-csharp-help-divider" />}
    </section>
  )
}

export default function JavaVsCSharpPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Java vs C#',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Java vs C#"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Java vs C#</h1>
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
