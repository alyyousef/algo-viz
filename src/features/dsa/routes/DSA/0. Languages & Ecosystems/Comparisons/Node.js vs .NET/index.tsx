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
  'Node.js and .NET are both serious platforms for building backend systems, APIs, services, tooling, and distributed applications. The useful comparison is not scripting language versus enterprise stack, because that framing is outdated. Modern Node.js is a mature runtime with a huge ecosystem and excellent fit for JavaScript and TypeScript-heavy teams. Modern .NET is a high-performance managed platform with strong tooling, broad language support, and a very deep story for backend engineering. The real decision usually comes down to team skill, performance profile, ecosystem gravity, architecture style, and organizational fit.',
  'Node.js usually appeals to teams that want one language across frontend and backend, fast iteration, and access to the enormous npm ecosystem. .NET usually appeals to teams that want a strongly tooled platform, mature frameworks, high throughput for many server workloads, and a cohesive engineering environment around C#, ASP.NET Core, and the wider Microsoft ecosystem. Both can power excellent production systems, but they optimize different habits and strengths.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Node.js is a JavaScript runtime built around an event-driven, non-blocking I/O model. It became especially popular for web backends because it allows teams to use JavaScript or TypeScript on the server and because the npm ecosystem made package reuse extremely convenient.',
      '.NET is a managed runtime and development platform centered today largely around C# and ASP.NET Core for backend work. It offers strong performance, mature tooling, powerful language features, and a cohesive platform model for APIs, web apps, background services, desktop apps, cloud systems, and more.',
    ],
  },
  {
    id: 'bp-core-difference',
    title: 'The Core Difference',
    paragraphs: [
      'The core difference is not simply speed or syntax. It is the development model and ecosystem center of gravity. Node.js is closely tied to the JavaScript and TypeScript ecosystem and often thrives when the organization values rapid web-focused iteration and shared language across the stack.',
      '.NET is more platform-shaped. It offers a strongly integrated environment with rich language features, excellent frameworks, and a deep backend engineering story. Teams often choose it when they want a cohesive, strongly structured runtime and toolchain for long-lived systems.',
    ],
    bullets: [
      'Node.js emphasizes JavaScript or TypeScript continuity and ecosystem reach.',
      '.NET emphasizes a cohesive managed platform with strong tooling and backend depth.',
      'Node.js often wins on full-stack language unification.',
      '.NET often wins on integrated platform discipline and mature backend ergonomics.',
    ],
  },
  {
    id: 'bp-when-node-fits',
    title: 'When Node.js Is Usually the Better Fit',
    paragraphs: [
      'Node.js is usually the better fit when the organization is already heavily invested in JavaScript or TypeScript, wants strong code sharing across frontend and backend, or needs fast development velocity for web-focused products. It is also attractive for teams building APIs, BFF layers, real-time services, lightweight microservices, and tooling where npm ecosystem leverage matters a lot.',
      'It remains especially compelling when frontend and backend developers collaborate closely and the business benefits from minimizing language switching across the stack.',
    ],
    bullets: [
      'Teams already centered on JavaScript or TypeScript.',
      'Products that benefit from shared models and tooling across frontend and backend.',
      'Web-centric services, BFF layers, and rapid product iteration.',
      'Organizations that value npm ecosystem access and developer flexibility.',
    ],
  },
  {
    id: 'bp-when-dotnet-fits',
    title: 'When .NET Is Usually the Better Fit',
    paragraphs: [
      '.NET is usually the better fit when the organization wants a highly capable managed backend platform, strong framework conventions, powerful language features, and consistent tooling across larger engineering teams. It is especially strong for APIs, enterprise systems, internal platforms, cloud services, and long-lived business applications.',
      'It is also attractive when the organization already uses Microsoft infrastructure, Azure, Windows-heavy enterprise tooling, or C# expertise at scale, though modern .NET is not limited to those environments.',
    ],
    bullets: [
      'Teams with strong C# or .NET experience.',
      'Organizations building large, long-lived backend systems.',
      'Projects that benefit from ASP.NET Core and deep platform tooling.',
      'Environments where performance, maintainability, and platform consistency matter heavily.',
    ],
  },
  {
    id: 'bp-hidden-tradeoff',
    title: 'The Hidden Tradeoff',
    paragraphs: [
      'The hidden tradeoff is often organizational rather than technical. Node.js can make a company feel faster because language reuse lowers friction and the ecosystem is extremely fluid. But that same fluidity can lead to inconsistency if architecture and dependency discipline are weak.',
      '.NET can make a company feel more structured because the platform offers clearer patterns, stronger defaults, and a more cohesive toolchain. But that structure can feel heavier if the product mainly needs fast-moving web iterations rather than platform discipline.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The best choice usually starts with ecosystem alignment and team shape. If the main advantage is shared JavaScript or TypeScript across product teams, Node.js often creates leverage. If the main advantage is a deeply capable managed platform for robust backend systems, .NET often creates leverage.',
    ],
    bullets: [
      'Choose Node.js for JavaScript or TypeScript continuity and web-focused speed.',
      'Choose .NET for platform depth, strong tooling, and mature backend structure.',
      'Optimize for team fluency and long-term maintenance, not just benchmark headlines.',
      'Let real product and org needs drive the choice.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-language-model',
    title: 'Language and Developer Model',
    paragraphs: [
      'Node.js usually means JavaScript or TypeScript on the server. That is powerful because many organizations already use those languages on the frontend. Shared types, shared validation logic, shared utility libraries, and shared hiring pools can all reduce friction.',
      '.NET usually means C# for backend development. C# offers a rich language with strong typing, mature tooling, powerful abstraction features, and a development experience that many backend engineers find excellent for large codebases. The tradeoff is that the stack is less naturally unified with browser code unless the organization also invests in other cross-stack strategies.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Runtime Profile',
    paragraphs: [
      '.NET has a strong reputation for high performance in backend workloads, especially with ASP.NET Core. For many API and service scenarios, it provides excellent throughput, efficient memory behavior, and mature runtime optimization.',
      'Node.js can also perform very well, especially for I/O-bound services, event-driven systems, and web APIs. The performance question should be framed carefully: most product systems are bottlenecked more by databases, network calls, and architecture than by raw runtime throughput. Still, when the platform itself is a major concern, .NET often has the stronger backend performance story.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Concurrency and Execution Model',
    paragraphs: [
      'Node.js is strongly associated with an event loop and asynchronous non-blocking I/O. This model works very well for many networked services, but teams must understand async behavior clearly to avoid hidden bottlenecks or CPU-bound blocking.',
      '.NET offers asynchronous programming too, but within a runtime model that many backend teams experience as more traditionally platform-like. It handles concurrent server workloads very well and provides multiple patterns for background processing, task orchestration, and multi-threaded execution when needed.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Developer Experience',
    paragraphs: [
      '.NET has very strong tooling, especially around IDE support, diagnostics, project templates, debugging, and integrated development workflows. Many teams value how coherent the platform feels from code editing through testing, profiling, and deployment.',
      'Node.js tooling is broad and flexible rather than centrally cohesive. This is a strength and a weakness. Teams can assemble highly productive workflows around TypeScript, Vite, pnpm, testing tools, linters, and build pipelines, but there is more variation and more responsibility on the team to standardize the stack well.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Gravity',
    paragraphs: [
      'Node.js benefits from the enormous npm ecosystem. That can dramatically accelerate development, especially in web-heavy environments. However, the ecosystem is also very open and fast-moving, which means package quality, maintenance posture, and dependency sprawl require active judgment.',
      '.NET has a strong ecosystem too, but it usually feels more curated and platform-centered. Teams often rely more on the official platform and a smaller set of core frameworks rather than composing dozens of small packages for every capability.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Architecture Style',
    paragraphs: [
      'Node.js fits very naturally with lightweight APIs, event-driven services, BFFs, server-side rendering layers, and product teams that move quickly. The architectural range is broad, but the ecosystem often rewards flexible composition over one dominant platform pattern.',
      '.NET fits naturally with strongly structured APIs, enterprise services, internal platforms, background workers, and systems where clear layering, maintainability, and framework-backed conventions matter. This does not mean .NET is only for enterprise systems. It means the platform is especially comfortable in those settings.',
    ],
  },
  {
    id: 'core-cloud-enterprise',
    title: 'Cloud and Enterprise Fit',
    paragraphs: [
      'Node.js is widely used in startups, product companies, frontend-heavy organizations, and cloud-native services. It works very well in containerized and serverless environments and often integrates naturally into modern web delivery stacks.',
      '.NET is equally capable in modern cloud environments and has become much more cross-platform and cloud-friendly than older stereotypes suggest. It remains especially strong in enterprise organizations, internal systems, and Azure-heavy environments, but it is no longer reasonable to think of modern .NET as only a Windows-centric stack.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit',
    paragraphs: [
      'Node.js fits teams that want stack unification, fast web iteration, and high flexibility. It is especially appealing when frontend and backend teams overlap heavily or when product speed is a strategic advantage.',
      '.NET fits teams that want strong structure, a powerful typed language for backend work, and a cohesive engineering platform. It is especially appealing when backend systems are substantial, long-lived, and maintained by multiple teams over time.',
    ],
  },
  {
    id: 'core-cost',
    title: 'Operational and Organizational Cost',
    paragraphs: [
      'Node.js can reduce training and collaboration cost when the whole product organization already knows JavaScript or TypeScript. That is a real advantage, not a cosmetic one. But the ecosystem’s openness can create consistency costs if the organization does not standardize architecture and tooling carefully.',
      '.NET can increase language diversity in a product org that is otherwise web-centric, but it often reduces ambiguity at the platform level because the stack offers stronger defaults. That can produce lower maintenance cost over time in larger backend-heavy organizations.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Node.js usually wins on stack continuity, ecosystem breadth, and web-product iteration speed. .NET usually wins on platform cohesion, backend engineering depth, and a very strong managed-runtime story. Both are production-grade choices, and both can be excellent when aligned to the organization.',
      'The wrong move is reducing the decision to hype or old stereotypes. Modern Node.js is not just for toy servers, and modern .NET is not just for legacy enterprise systems. The useful comparison is which platform helps your team build and operate the system more effectively over time.',
    ],
    bullets: [
      'Choose Node.js for JavaScript or TypeScript alignment and rapid web-oriented development.',
      'Choose .NET for cohesive backend platform strength and strong C# ergonomics.',
      'Evaluate ecosystem fit, not just runtime benchmarks.',
      'Prefer the platform your organization can standardize and scale well.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-node-shape',
    title: 'Node.js Service Shape',
    description: [
      'A Node.js backend often feels lightweight and composable, especially in TypeScript-heavy product teams.',
    ],
    code: `app.get('/users/:id', async (req, res) => {
  const user = await userService.getById(req.params.id)
  res.json(user)
})`,
    notes: [
      'This style is common in web-focused APIs and BFF layers.',
      'The surrounding architecture depends heavily on framework choice and team conventions.',
    ],
  },
  {
    id: 'examples-dotnet-shape',
    title: '.NET Service Shape',
    description: [
      'A .NET backend often uses ASP.NET Core patterns with strongly typed handlers and framework-backed structure.',
    ],
    code: `app.MapGet("/users/{id}", async (string id, IUserService users) =>
{
    var user = await users.GetById(id);
    return Results.Ok(user);
});`,
    notes: [
      'This style feels very natural in modern ASP.NET Core.',
      'The platform often encourages clearer structure and type-driven design across the service.',
    ],
  },
  {
    id: 'examples-team-frame',
    title: 'Team Alignment Example',
    description: [
      'The platform choice often reflects organization shape as much as raw technical preference.',
    ],
    code: `Frontend-heavy product org
  -> Node.js often creates stack continuity

Backend platform org
  -> .NET often creates stronger platform cohesion`,
    notes: [
      'Neither direction is automatic, but this pattern appears often in practice.',
      'Team fluency and hiring shape are legitimate architecture inputs.',
    ],
  },
  {
    id: 'examples-decision-frame',
    title: 'Decision Frame Example',
    description: ['A good decision starts by identifying the actual source of leverage.'],
    code: `Question 1:
Do we need one language across frontend and backend?

Question 2:
Do we want a deeply cohesive managed backend platform?

Question 3:
Is product speed or backend platform rigor the stronger pressure?`,
    notes: [
      'If the first question dominates, Node.js often has the advantage.',
      'If the second and third questions dominate, .NET often has the advantage.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-node',
    title: 'Node.js Terms',
    terms: [
      {
        term: 'Node.js',
        definition:
          'A JavaScript runtime commonly used for servers, APIs, tooling, and backend applications.',
      },
      {
        term: 'Event Loop',
        definition:
          'The execution model that coordinates asynchronous operations and callbacks in Node.js.',
      },
      {
        term: 'npm Ecosystem',
        definition:
          'The large package ecosystem surrounding JavaScript and TypeScript development.',
      },
      {
        term: 'BFF',
        definition:
          'Backend for Frontend, a service layer tailored to the needs of a specific frontend client.',
      },
    ],
  },
  {
    id: 'glossary-dotnet',
    title: '.NET Terms',
    terms: [
      {
        term: '.NET',
        definition:
          'A managed runtime and development platform commonly used with C# for backend, web, cloud, desktop, and enterprise applications.',
      },
      {
        term: 'ASP.NET Core',
        definition:
          'The modern .NET web framework for building APIs, web apps, and backend services.',
      },
      {
        term: 'Managed Runtime',
        definition:
          'A runtime environment that provides services such as memory management, type safety, and execution infrastructure.',
      },
      {
        term: 'C#',
        definition: 'The primary language used for many modern .NET backend applications.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Backend Terms',
    terms: [
      {
        term: 'Throughput',
        definition:
          'The amount of work or number of requests a system can process in a given period.',
      },
      {
        term: 'I/O-Bound Workload',
        definition:
          'A workload dominated by waiting on network, disk, or database operations rather than by raw CPU computation.',
      },
      {
        term: 'Platform Cohesion',
        definition:
          'The degree to which tooling, frameworks, language features, and runtime behavior feel integrated into one consistent development platform.',
      },
      {
        term: 'Stack Unification',
        definition:
          'Using the same language or ecosystem across multiple layers of an application stack.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-core-difference', label: 'The Core Difference' },
    { id: 'bp-when-node-fits', label: 'When Node.js Is Usually the Better Fit' },
    { id: 'bp-when-dotnet-fits', label: 'When .NET Is Usually the Better Fit' },
    { id: 'bp-hidden-tradeoff', label: 'The Hidden Tradeoff' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-language-model', label: 'Language and Developer Model' },
    { id: 'core-performance', label: 'Performance and Runtime Profile' },
    { id: 'core-concurrency', label: 'Concurrency and Execution Model' },
    { id: 'core-tooling', label: 'Tooling and Developer Experience' },
    { id: 'core-ecosystem', label: 'Ecosystem Gravity' },
    { id: 'core-architecture', label: 'Architecture Style' },
    { id: 'core-cloud-enterprise', label: 'Cloud and Enterprise Fit' },
    { id: 'core-team-fit', label: 'Team Fit' },
    { id: 'core-cost', label: 'Operational and Organizational Cost' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
  ],
  examples: [
    { id: 'examples-node-shape', label: 'Node.js Service Shape' },
    { id: 'examples-dotnet-shape', label: '.NET Service Shape' },
    { id: 'examples-team-frame', label: 'Team Alignment Example' },
    { id: 'examples-decision-frame', label: 'Decision Frame Example' },
  ],
  glossary: [
    { id: 'glossary-node', label: 'Node.js Terms' },
    { id: 'glossary-dotnet', label: '.NET Terms' },
    { id: 'glossary-shared', label: 'Shared Backend Terms' },
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

export default function NodeJsVsDotNetPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Node.js vs .NET',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Node.js vs .NET"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Node.js vs .NET</h1>
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
