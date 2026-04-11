import { Fragment } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type DocSection = {
  id: string
  title: string
  paragraphs: readonly string[]
}

type ExampleSnippet = {
  label: string
  code: string
}

type ExampleSection = {
  id: string
  title: string
  description: string
  snippets: readonly ExampleSnippet[]
  takeaway: string
}

type GlossaryTerm = {
  term: string
  definition: string
}

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Astro is a web framework centered on shipping fast HTML by default and sending as little JavaScript to the browser as possible. It is especially associated with content-heavy sites, multi-page applications, island architecture, and a rendering model that treats static output as the default starting point.',
      'In practice, Astro is used for marketing sites, documentation, blogs, content platforms, e-commerce fronts, and web experiences that need selective interactivity rather than a fully hydrated client application everywhere.',
      'This reference covers Astro components, islands, rendering modes, content collections, integrations, server endpoints, view transitions, use cases, tradeoffs, examples, and glossary terms.',
    ],
  },
  {
    id: 'bp-why-astro',
    title: 'Why Teams Reach For Astro',
    paragraphs: [
      'Astro matters because it challenges the assumption that modern sites should hydrate large amounts of JavaScript by default. Instead, it renders most of the page as HTML and lets teams opt into interactivity only where it is actually needed.',
      'That makes the framework especially attractive for sites where content, performance, and partial interactivity matter more than treating the entire interface as one large client-rendered application.',
    ],
  },
  {
    id: 'bp-what-it-optimizes',
    title: 'What Astro Optimizes For',
    paragraphs: [
      'Astro optimizes for minimal client-side JavaScript, strong static output, fast page delivery, and selective hydration through islands. The framework is designed to keep the browser workload small unless a specific part of the page truly needs client-side behavior.',
      'This optimization target shapes the whole framework. Route defaults, component rendering, client directives, and content tooling all support the idea that most of the page should remain lightweight by default.',
    ],
  },
  {
    id: 'bp-islands-model',
    title: 'Why the Islands Model Matters',
    paragraphs: [
      'Astro is widely known for its islands architecture. A mostly static page can contain small interactive islands that hydrate independently rather than forcing the entire page to become one client application.',
      'That matters because it gives teams a middle ground between static content and full SPA behavior. A page can stay mostly HTML while still supporting search widgets, carts, tabs, comment boxes, or other interactive sections.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Astro Fits Well',
    paragraphs: [
      'Astro is a strong fit for content-rich and performance-sensitive sites, documentation, publishing, landing pages, product marketing, hybrid static-plus-interactive experiences, and web properties where SEO and fast startup matter a great deal.',
      'It is also attractive when a team wants to combine multiple UI libraries or use React, Vue, Svelte, or other frameworks only for isolated interactive sections instead of for the entire page shell.',
    ],
  },
  {
    id: 'bp-where-it-needs-care',
    title: 'Where It Needs Care',
    paragraphs: [
      'Astro is less obviously the right tool when the product is fundamentally a highly interactive client application where most of the screen is stateful and frequently mutating. In those cases, a framework centered on the app runtime may be a more natural fit.',
      'It also requires teams to think clearly about where interactivity belongs. Astro works best when the page can stay mostly server-rendered or prerendered and only some components need client behavior.',
    ],
  },
  {
    id: 'bp-common-misreadings',
    title: 'Common Misreadings',
    paragraphs: [
      'A common mistake is to reduce Astro to a static-site generator. Astro can render on demand, expose endpoints, use middleware, support server islands, and build app-like navigation patterns. The framework is broader than static generation alone.',
      'Another mistake is to compare Astro only with full client frameworks while ignoring its actual design target. Astro is strongest when the application does not need full hydration everywhere.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Astro centers on server-rendered HTML, selective interactivity, and minimal client JavaScript by default.',
      'Its main strengths are content performance, island architecture, flexible framework integrations, and a strong static-first story.',
      'Its main tradeoffs are that not every application shape fits the islands model naturally, and teams still need to reason carefully about where interactive runtime boundaries belong.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Astro asks developers to think of the page as server-rendered HTML first and client JavaScript second. Instead of assuming every component needs to hydrate in the browser, the framework assumes most of the page can remain static unless interactivity is explicitly requested.',
      'This changes design decisions. Teams are encouraged to ask which parts of the page truly need client behavior and which parts should remain simple rendered markup.',
    ],
  },
  {
    id: 'core-components',
    title: 'Astro Components',
    paragraphs: [
      'Astro components are written in `.astro` files and combine a frontmatter script section with template markup. This component format is built for server rendering and composition rather than for default browser-side execution.',
      'A useful way to think about Astro components is as template modules that can render HTML efficiently and compose other components, including framework components, without automatically turning the whole page into a client runtime.',
    ],
  },
  {
    id: 'core-frontmatter',
    title: 'Frontmatter and Template Split',
    paragraphs: [
      'An Astro component typically begins with a frontmatter block between triple dashes. That is where imports, data loading, props handling, and server-side logic often live. The markup below the block renders the actual HTML output.',
      'This makes the component structure easy to scan: server-side preparation happens at the top, while output stays below in a template-oriented form.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Pages and File-Based Routing',
    paragraphs: [
      'Astro uses file-based routing through `src/pages/`. Files become routes based on their paths, and page files are expected to produce full HTML documents. This keeps route structure visible in the file system rather than hidden behind manual registration.',
      "The route model fits Astro's static-first posture well. A content-heavy site can often be understood directly from the page tree and its generated paths.",
    ],
  },
  {
    id: 'core-rendering-default',
    title: 'Static Output by Default',
    paragraphs: [
      'Astro defaults to prerendering routes at build time. This means pages and endpoints are generated ahead of time as static output unless the project or route opts into on-demand rendering.',
      "That default is one of Astro's clearest design statements. The framework starts from the assumption that prebuilt HTML is the best default for many websites and then allows more dynamic behavior where needed.",
    ],
  },
  {
    id: 'core-rendering-modes',
    title: 'Static, Server, and Hybrid Rendering',
    paragraphs: [
      'Astro supports static output as well as on-demand rendering when an adapter is installed. Projects can use output modes such as `static`, `server`, and `hybrid` depending on whether most routes should be prerendered or rendered per request.',
      'This flexibility matters because not every page in a real product has the same needs. A mostly static marketing site might still need a personalized account route or a live API endpoint.',
    ],
  },
  {
    id: 'core-islands',
    title: 'Client Islands',
    paragraphs: [
      'A client island is an interactive UI component that hydrates separately from the rest of the page. Astro can render a mostly static page and then hydrate only the components marked for client-side behavior.',
      "This is one of Astro's defining ideas. Interactivity becomes a local opt-in decision instead of a whole-page default.",
    ],
  },
  {
    id: 'core-client-directives',
    title: 'Client Directives',
    paragraphs: [
      'Astro uses client directives such as `client:load`, `client:idle`, `client:visible`, and `client:media` to control when framework components hydrate in the browser. These directives let teams tune how urgently an island should become interactive.',
      'The practical result is more control over browser work. A component can hydrate immediately, lazily, or only under certain conditions rather than always joining the initial startup path.',
    ],
  },
  {
    id: 'core-server-islands',
    title: 'Server Islands',
    paragraphs: [
      'Astro also supports server islands for dynamic or personalized server-rendered fragments that can be deferred separately from the rest of the page. This extends the islands idea beyond client hydration into server-rendered fragment delivery.',
      'That makes Astro interesting not only for static-plus-client widgets, but also for pages where some dynamic server content should be separated from the main initial render path.',
    ],
  },
  {
    id: 'core-integrations',
    title: 'Framework Integrations',
    paragraphs: [
      'Astro can integrate with React, Vue, Svelte, Preact, Solid, and other UI frameworks. These integrations let teams bring framework components into Astro pages without turning Astro itself into just one more wrapper around a single runtime.',
      "This multi-framework story is a major differentiator. Teams can choose the right framework for a specific interactive island while keeping the overall site aligned with Astro's lightweight page model.",
    ],
  },
] as const

const coreConceptSectionsContinued: readonly DocSection[] = [
  {
    id: 'core-content-collections',
    title: 'Content Collections',
    paragraphs: [
      'Astro includes content collections as a structured way to manage and validate local content. This gives teams typed and organized access to markdown, MDX, and other content-driven sources instead of treating content files as loose blobs.',
      'This matters because many Astro projects are content-heavy. The framework takes that use case seriously and provides tooling that fits publishing workflows rather than treating them as an afterthought.',
    ],
  },
  {
    id: 'core-mdx-content',
    title: 'Markdown, MDX, and Content Workflows',
    paragraphs: [
      'Astro works well with markdown and MDX, which makes it especially effective for blogs, docs, knowledge bases, and editorial sites. Content can remain largely authored as content while still participating in layouts, components, and typed collection workflows.',
      'That means teams can build sophisticated content systems without forcing every page to become a fully interactive client application.',
    ],
  },
  {
    id: 'core-endpoints',
    title: 'Endpoints and Server Functions',
    paragraphs: [
      'Astro supports endpoints so routes do not have to return only HTML. A file in the pages tree can respond with JSON, images, RSS feeds, or other content depending on the route design.',
      'This broadens Astro beyond a page generator. The framework can power content APIs and route-level utility responses within the same project structure.',
    ],
  },
  {
    id: 'core-middleware',
    title: 'Middleware and Request-Time Logic',
    paragraphs: [
      'Astro supports middleware for request-time behavior such as redirects, personalization gates, logging, or auth-related checks. This allows cross-cutting concerns to run before route output is returned.',
      'As with other frameworks, middleware is best used for true request-bound concerns rather than as a place to hide ordinary page logic.',
    ],
  },
  {
    id: 'core-view-transitions',
    title: 'View Transitions and Navigation Enhancements',
    paragraphs: [
      'Astro includes support for view transitions and navigation enhancements that can make multi-page navigation feel smoother and more app-like without turning the whole site into a traditional SPA.',
      'This is important because Astro is not anti-interaction. It simply prefers interaction and enhanced navigation to be deliberate rather than globally mandatory.',
    ],
  },
  {
    id: 'core-integrations-modules',
    title: 'Integrations and Ecosystem Extension',
    paragraphs: [
      'Astro uses integrations to add framework support, adapters, MDX, Tailwind, and other capabilities. The integration system is one of the main ways projects extend the framework in a first-class manner.',
      'This gives Astro a modular ecosystem shape. Teams can keep projects relatively small while only opting into the features and frameworks they actually need.',
    ],
  },
  {
    id: 'core-deployment',
    title: 'Deployment and Adapter Model',
    paragraphs: [
      'Astro uses adapters for deployment targets when server rendering or hybrid behavior is needed. This keeps the framework portable across different environments rather than locking everything to one runtime target.',
      'The practical implication is that build output and runtime behavior are part of framework choice. Teams should know whether a project is purely static or whether it depends on a server-capable adapter.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Cases',
    paragraphs: [
      'Astro is especially strong for documentation, editorial sites, company websites, landing pages, e-commerce fronts with selective widgets, portfolios, and content-driven products that still need some client interactivity.',
      'It is also attractive when performance budgets are strict and the team wants to avoid default full-page hydration.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Astro is excellent when pages can remain mostly server-rendered or prerendered, but it is less naturally aligned with products where the majority of the interface behaves like a continuously interactive client application.',
      'Another tradeoff is architectural clarity: the framework gives strong tools for selective interactivity, but teams still need discipline to avoid turning every page into a pile of mismatched island decisions.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast References',
    paragraphs: [
      'Astro is commonly compared with Next.js and Nuxt for content-first performance versus broader app-runtime integration, with Eleventy or similar site generators for static content workflows versus a more component-and-islands-driven model, and with full SPA frameworks for selective hydration versus application-wide client runtimes.',
      'These comparisons help position Astro clearly: it is strongest when the site does not need full client framework behavior everywhere.',
    ],
  },
] as const
const coreConceptSectionsMerged: readonly DocSection[] = [
  ...coreConceptSections,
  ...coreConceptSectionsContinued,
]

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-component',
    title: 'Basic Astro Component',
    description:
      'An Astro component typically uses frontmatter for server-side preparation and template markup for output. This keeps data setup and HTML rendering in one file without default browser hydration.',
    snippets: [
      {
        label: 'Greeting.astro',
        code: `---
const { name = 'world' } = Astro.props
---

<h1>Hello, {name}!</h1>
<p>This component renders on the server by default.</p>`,
      },
    ],
    takeaway:
      'The default mental model is server-rendered markup, not client runtime. An Astro component can stay simple and ship only HTML unless interactivity is explicitly requested.',
  },
  {
    id: 'examples-island',
    title: 'Interactive Island',
    description:
      'A framework component can be embedded as a client island inside an Astro page. The page stays mostly static while the interactive component hydrates according to a client directive.',
    snippets: [
      {
        label: 'src/pages/index.astro',
        code: `---
import SearchBox from '../components/SearchBox.jsx'
---

<html lang="en">
  <body>
    <h1>Docs home</h1>
    <SearchBox client:visible />
  </body>
</html>`,
      },
    ],
    takeaway:
      "This is Astro's defining pattern: keep the page lightweight and hydrate only the component that actually needs browser interactivity.",
  },
  {
    id: 'examples-content',
    title: 'Content Collection Query',
    description:
      'Content collections let an Astro project load structured content with stronger guarantees than ad hoc file scanning.',
    snippets: [
      {
        label: 'src/pages/blog.astro',
        code: `---
import { getCollection } from 'astro:content'

const posts = await getCollection('blog')
---

<ul>
  {posts.map((post) => (
    <li>
      <a href={\`/blog/\${post.slug}/\`}>{post.data.title}</a>
    </li>
  ))}
</ul>`,
      },
    ],
    takeaway:
      'Astro is unusually strong when content is a first-class part of the product. Collections make that workflow more structured and maintainable.',
  },
  {
    id: 'examples-endpoint',
    title: 'Endpoint Example',
    description:
      'An Astro route can return JSON or other non-HTML responses, which broadens the framework beyond page rendering alone.',
    snippets: [
      {
        label: 'src/pages/api/status.json.ts',
        code: `export async function GET() {
  return new Response(
    JSON.stringify({ ok: true, framework: 'Astro' }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
}`,
      },
    ],
    takeaway:
      'Astro routes are not limited to HTML. The framework can expose lightweight API-style responses within the same project structure.',
  },
  {
    id: 'examples-architecture',
    title: 'Architecture Snapshot',
    description:
      'A typical Astro production setup keeps most routes static or server-rendered HTML and adds interactivity only through explicit islands.',
    snippets: [
      {
        label: 'Common Stack',
        code: `Astro pages for route-level HTML output
Astro components for server-rendered layout and content
Framework integrations only for interactive islands
Content collections for structured local content
Adapters and middleware when dynamic server behavior is required`,
      },
    ],
    takeaway:
      'The cleanest Astro architecture keeps the whole site lightweight and treats client runtime as a narrow opt-in layer rather than the default center of the app.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Astro',
    definition:
      'A web framework focused on fast HTML, minimal client JavaScript, and selective interactivity through islands.',
  },
  {
    term: 'Island architecture',
    definition:
      'A page architecture where most content remains static or server-rendered while small interactive components hydrate independently.',
  },
  {
    term: 'Astro component',
    definition:
      'A component written in a `.astro` file with frontmatter and template markup, rendered on the server by default.',
  },
  {
    term: 'Frontmatter',
    definition:
      'The triple-dash script block at the top of an Astro component where imports, props handling, and server-side logic commonly live.',
  },
  {
    term: 'Client directive',
    definition:
      'An Astro directive such as `client:load` or `client:visible` that controls when an interactive island hydrates in the browser.',
  },
  {
    term: 'Server island',
    definition:
      "A deferred or separately rendered server-side fragment used within Astro's broader islands approach.",
  },
  {
    term: 'Content collection',
    definition:
      "Astro's structured content system for organizing and validating local content sources such as markdown or MDX.",
  },
  {
    term: 'Endpoint',
    definition: 'A route in Astro that returns a non-HTML response such as JSON, RSS, or an image.',
  },
  {
    term: 'Adapter',
    definition:
      'A deployment integration that enables Astro to run with server or hybrid rendering on a specific platform or runtime.',
  },
  {
    term: 'Static output',
    definition:
      "Astro's default mode where routes are prerendered at build time into deployable files.",
  },
  {
    term: 'Hybrid rendering',
    definition:
      'A mode where some Astro routes are prerendered while others are rendered on demand.',
  },
  {
    term: 'Integration',
    definition:
      'An Astro extension that adds capabilities such as framework support, Tailwind, MDX, or deployment features.',
  },
  {
    term: 'View transition',
    definition:
      'An Astro-enhanced navigation effect that makes route changes feel smoother without requiring a full SPA architecture.',
  },
  {
    term: 'src/pages',
    definition: 'The Astro directory whose files become routes based on their file paths.',
  },
  {
    term: 'Hydration',
    definition:
      'The browser process of activating an interactive component. Astro tries to apply hydration only to explicitly chosen islands rather than the whole page.',
  },
] as const

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSectionsMerged.map((section) => ({
    id: section.id,
    label: section.title,
  })),
  examples: examples.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function AstroPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Astro',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Astro"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Astro</h1>
      <p className="astro-help-doc-subtitle">
        Manual-style reference covering overview, islands architecture, rendering modes,
        integrations, content workflows, tradeoffs, and practical examples.
      </p>

      {activeTab === 'big-picture' &&
        bigPictureSections.map((section, index) => (
          <Fragment key={section.id}>
            <section id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
            {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
          </Fragment>
        ))}

      {activeTab === 'core-concepts' &&
        coreConceptSectionsMerged.map((section) => (
          <section key={section.id} id={section.id} className="bin98-section">
            <h2 className="bin98-heading">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

      {activeTab === 'examples' &&
        examples.map((example) => (
          <section key={example.id} id={example.id} className="bin98-section">
            <h2 className="bin98-heading">{example.title}</h2>
            <p>{example.description}</p>
            {example.snippets.map((snippet) => (
              <Fragment key={`${example.id}-${snippet.label}`}>
                <h3 className="bin98-subheading">{snippet.label}</h3>
                <div className="bin98-codebox">
                  <code>{snippet.code}</code>
                </div>
              </Fragment>
            ))}
            <p>
              <strong>Takeaway:</strong> {example.takeaway}
            </p>
          </section>
        ))}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
