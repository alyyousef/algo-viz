import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'HTML emerges from SGML (1991)',
    detail:
      'Tim Berners-Lee adapts SGML ideas into a lightweight language for linking documents. Early tags focus on headings, links, and lists.',
  },
  {
    title: 'HTML 2.0 standardizes core tags (1995)',
    detail:
      'IETF publishes HTML 2.0, codifying forms, tables, and basic semantics so browsers can interoperate.',
  },
  {
    title: 'HTML4 brings structure and separation (1997)',
    detail:
      'HTML4 emphasizes structure over presentation as CSS matures, while introducing accessibility and internationalization features.',
  },
  {
    title: 'HTML5 redefines the modern web (2014)',
    detail:
      'Living standards add semantic tags, audio/video, canvas, and APIs that reduce reliance on plugins.',
  },
  {
    title: 'Living standard evolves (2016+)',
    detail:
      'HTML becomes a continuously updated spec with new elements and attributes landing incrementally.',
  },
  {
    title: 'Interop and platform APIs expand (2018+)',
    detail:
      'New media, form, and accessibility features reduce the need for heavy JavaScript fallbacks.',
  },
  {
    title: 'Web components and templates mature (2020+)',
    detail:
      'Native components and template primitives allow reusable markup without frameworks.',
  },
]

const mentalModels = [
  {
    title: 'A document tree, not a page',
    detail:
      'HTML is parsed into a DOM tree. Everything you style or manipulate is a node in that tree, not just pixels on a screen.',
  },
  {
    title: 'Contracts between content and behavior',
    detail:
      'HTML declares structure and meaning. CSS and JavaScript interpret those declarations to render visuals and provide interactivity.',
  },
  {
    title: 'Progressive enhancement baseline',
    detail:
      'Well-structured HTML delivers core content even when CSS or JavaScript fail, making it the fallback foundation.',
  },
  {
    title: 'Semantics drive accessibility',
    detail:
      'Elements convey roles and relationships to assistive technologies without extra ARIA.',
  },
  {
    title: 'Metadata shapes discovery',
    detail:
      'Head tags and structured data are how browsers, bots, and social platforms understand your page.',
  },
  {
    title: 'Default behaviors are features',
    detail:
      'Native inputs, links, and buttons carry built-in keyboard and focus support you should preserve.',
  },
]

const coreBuildingBlocks = [
  {
    heading: 'Elements and tags',
    bullets: [
      'Elements are the semantic units: headings, paragraphs, lists, buttons, and more.',
      'Tags define the start and end of an element; some are void (img, input, br) and never close.',
      'Nesting determines hierarchy; invalid nesting can still render but breaks accessibility and scripts.',
      'Custom elements extend HTML with new tags while keeping a valid DOM tree.',
    ],
  },
  {
    heading: 'Attributes',
    bullets: [
      'Attributes add metadata: ids, classes, data-* values, ARIA roles, and resource URLs.',
      'Boolean attributes (disabled, checked) are true by presence, not by value.',
      'Global attributes apply to most elements, enabling consistent hooks for CSS and JS.',
      'Use aria-* only when native semantics are insufficient.',
    ],
  },
  {
    heading: 'Block and inline flow',
    bullets: [
      'Block elements form vertical layout by default, while inline elements flow within text.',
      'Default display can be overridden with CSS, but semantic meaning should stay intact.',
      'Line breaks and whitespace collapse in HTML; layout comes from structure, not spacing.',
      'Intrinsic size and baseline alignment influence layout in subtle ways.',
    ],
  },
  {
    heading: 'Links and navigation',
    bullets: [
      'Anchors are the backbone of the web; use real links for navigation.',
      'Nav menus and breadcrumbs improve orientation and crawler discovery.',
      'Skip links help keyboard users bypass repetitive content.',
    ],
  },
]

const documentAnatomy = [
  {
    title: 'Doctype and root',
    detail:
      'The doctype triggers standards mode. The html element wraps the full document tree and declares language via lang.',
  },
  {
    title: 'Head metadata',
    detail:
      'Head hosts title, meta tags, links to CSS, and resource hints. It shapes SEO, social previews, and page performance.',
  },
  {
    title: 'Body content',
    detail:
      'Body defines the visible structure: landmarks, text, media, navigation, and interactive controls.',
  },
  {
    title: 'Scripts and styles',
    detail:
      'CSS can live in link tags or style blocks. Scripts run in order unless async/defer changes timing.',
  },
  {
    title: 'Document language',
    detail:
      'lang sets the default language; use hreflang or lang attributes for mixed-language content.',
  },
]

const semanticsAndLandmarks = [
  {
    title: 'Landmark regions',
    detail:
      'header, nav, main, section, article, aside, and footer provide a structural map for users and assistive tech.',
  },
  {
    title: 'Headings hierarchy',
    detail:
      'Heading levels (h1-h6) should outline content logically; skipping levels confuses screen reader navigation.',
  },
  {
    title: 'Lists and relationships',
    detail:
      'Use ul/ol for collections and dl for term-definition pairs instead of ad-hoc div stacks.',
  },
  {
    title: 'Meaning over appearance',
    detail:
      'Pick elements for what they are, not how they look. CSS handles appearance; HTML communicates intent.',
  },
  {
    title: 'Buttons vs links',
    detail:
      'Use buttons for actions and links for navigation; mixing them breaks expectations and accessibility.',
  },
]

const formsAndInput = [
  {
    title: 'Form structure',
    detail:
      'form groups inputs and defines submission. label ties text to inputs for usability and accessibility.',
  },
  {
    title: 'Input types',
    detail:
      'Use email, number, date, and range to get built-in keyboards, validation, and browser hints.',
  },
  {
    title: 'Validation and feedback',
    detail:
      'required, pattern, and min/max let browsers validate before JavaScript runs, improving resilience.',
  },
  {
    title: 'State and grouping',
    detail:
      'fieldset and legend group related fields; disabled and readonly express intent without scripts.',
  },
  {
    title: 'Autocomplete and UX',
    detail:
      'autocomplete tokens help users fill forms faster and more accurately.',
  },
]

const mediaAndGraphics = [
  {
    title: 'Responsive images',
    detail:
      'img with srcset and sizes delivers the right resolution. picture enables art direction per breakpoint.',
  },
  {
    title: 'Video and audio',
    detail:
      'Native media tags support multiple sources, captions, and controls without plugins.',
  },
  {
    title: 'SVG and canvas',
    detail:
      'SVG is resolution-independent and accessible; canvas is bitmap-based and script-driven.',
  },
  {
    title: 'Embeds and iframes',
    detail:
      'iframes isolate external content; use sandbox and allow attributes to limit capabilities.',
  },
  {
    title: 'Figures and captions',
    detail:
      'figure and figcaption provide semantic grouping for images, charts, and media.',
  },
]

const parsingAndRendering = [
  {
    title: 'Tokenize and build the DOM',
    detail:
      'Browsers parse HTML into tokens, build nodes, and repair malformed markup to create a DOM tree.',
  },
  {
    title: 'CSSOM and render tree',
    detail:
      'CSS is parsed into a CSSOM. DOM and CSSOM combine into the render tree that drives layout and paint.',
  },
  {
    title: 'Script execution',
    detail:
      'Blocking scripts pause parsing. async runs ASAP; defer waits for DOM readiness, reducing layout jank.',
  },
  {
    title: 'Accessibility tree',
    detail:
      'Browsers map semantic elements into an accessibility tree used by screen readers and automation tools.',
  },
  {
    title: 'Preload scanner',
    detail:
      'Browsers scan HTML for critical resources early to speed up rendering.',
  },
]

const performanceAndDelivery = [
  {
    title: 'Critical path HTML',
    detail:
      'Keep initial markup small and meaningful. The first HTML response gates time-to-first-render.',
  },
  {
    title: 'Resource hints',
    detail:
      'preconnect, dns-prefetch, and preload reduce latency for fonts, CSS, and key scripts.',
  },
  {
    title: 'Caching and reuse',
    detail:
      'Stable HTML with cacheable assets lets browsers reuse CSS and JS across navigations.',
  },
  {
    title: 'Server rendering choices',
    detail:
      'Static or server-rendered HTML delivers content faster, then hydration adds interactivity.',
  },
  {
    title: 'Streaming and partials',
    detail:
      'Streaming HTML can reveal content faster while async components finish rendering.',
  },
]

const examples = [
  {
    title: 'Minimal semantic document',
    code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>HTML Basics</title>
  </head>
  <body>
    <header><h1>HTML Basics</h1></header>
    <main>
      <p>HTML defines structure and meaning.</p>
      <a href="/learn">Start learning</a>
    </main>
  </body>
</html>`,
    explanation:
      'This document shows the doctype, language, metadata, and a simple semantic layout. It is valid, accessible, and browser-friendly.',
  },
  {
    title: 'Landmarks and content grouping',
    code: `<main>
  <article>
    <header>
      <h1>Semantic layout</h1>
      <p>Use headings to outline content.</p>
    </header>
    <section>
      <h2>Why it matters</h2>
      <p>Assistive tech relies on this structure.</p>
    </section>
  </article>
</main>`,
    explanation:
      'Landmarks and sections make pages navigable by keyboard and screen readers while giving CSS clear targets.',
  },
  {
    title: 'Accessible form controls',
    code: `<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />
  <fieldset>
    <legend>Preferences</legend>
    <label><input type="checkbox" name="news" /> Weekly updates</label>
  </fieldset>
  <button type="submit">Subscribe</button>
</form>`,
    explanation:
      'Labels, fieldsets, and native input types provide validation, semantics, and accessibility without extra scripts.',
  },
  {
    title: 'Responsive image with art direction',
    code: `<picture>
  <source media="(min-width: 800px)" srcset="/hero-wide.jpg" />
  <img src="/hero.jpg" alt="Team collaborating in a studio" />
</picture>`,
    explanation:
      'picture lets you serve different crops for different layouts while keeping a single semantic image.',
  },
  {
    title: 'Metadata for SEO and sharing',
    code: `<head>
  <title>Design Systems 101</title>
  <meta name="description" content="A practical guide to building UI systems." />
  <meta property="og:title" content="Design Systems 101" />
  <meta property="og:image" content="/share.jpg" />
</head>`,
    explanation:
      'Search engines and social platforms use metadata to display previews and summaries.',
  },
  {
    title: 'Dialog and details UI',
    code: `<dialog id="help">
  <h2>Need help?</h2>
  <p>Native dialog provides focus trapping and close behavior.</p>
</dialog>

<details>
  <summary>More info</summary>
  <p>Details/summary creates accessible disclosure without JavaScript.</p>
</details>`,
    explanation:
      'Modern HTML provides interactive primitives that reduce custom scripting.',
  },
]

const pitfalls = [
  'Overusing div and span for everything, which removes semantic clues and hurts accessibility.',
  'Skipping alt text on images or using empty placeholders that hide meaning from assistive tech.',
  'Breaking heading order, creating confusing navigation for screen readers and SEO crawlers.',
  'Relying on HTML for layout spacing (extra br or nbsp) instead of structural tags and CSS.',
  'Using non-unique ids or missing label associations, causing form and script bugs.',
  'Using link or button roles incorrectly and confusing keyboard behavior.',
  'Shipping huge HTML responses with unnecessary wrappers and duplicated markup.',
  'Nesting interactive controls (button inside link) causing invalid HTML and bugs.',
]

const decisionGuidance = [
  'If content should be discoverable and resilient, start with semantic HTML before adding CSS or JS.',
  'When you need user input, prefer native form elements instead of custom div-based controls.',
  'If a media asset conveys meaning, use descriptive alt text and captions to preserve context.',
  'For navigation and page sections, use landmarks so users can jump through the document easily.',
  'When performance matters, ship HTML that renders the primary content without waiting on JavaScript.',
  'Use native elements like details, dialog, and summary before building custom widgets.',
  'Leverage metadata and structured data when SEO or sharing previews matter.',
]

const advancedInsights = [
  {
    title: 'Custom elements and templates',
    detail:
      'HTML templates and web components let you define reusable tags without sacrificing semantics or performance.',
  },
  {
    title: 'Progressive enhancement strategy',
    detail:
      'Start with valid HTML, then layer CSS and JavaScript. It yields faster first render and better reliability.',
  },
  {
    title: 'Document fragments and hydration',
    detail:
      'Server-side rendering streams HTML fragments early; hydration attaches events after the DOM is ready.',
  },
  {
    title: 'Metadata for social sharing',
    detail:
      'Open Graph and Twitter card tags in the head control link previews and improve click-through.',
  },
  {
    title: 'Structured data',
    detail:
      'JSON-LD helps search engines understand entities, reviews, and events for rich results.',
  },
  {
    title: 'Form enhancements',
    detail:
      'Constraint validation APIs and input modes reduce the need for custom validation logic.',
  },
]

const takeaways = [
  'HTML is the semantic foundation. CSS and JavaScript enhance it, but structure begins here.',
  'Well-formed markup improves accessibility, SEO, and reliability across devices.',
  'Native elements provide free functionality: validation, keyboard support, and built-in states.',
  'Performance starts with HTML delivery: smaller, meaningful documents render faster.',
  'Metadata and structured data make your content discoverable and shareable.',
  'Progressive enhancement keeps experiences resilient as browsers vary.',
]

const seoAndMetadata = [
  {
    title: 'Title and description',
    detail:
      'Unique titles and meta descriptions improve search snippets and click-through.',
  },
  {
    title: 'Open Graph and cards',
    detail:
      'Social previews use og:title, og:image, and twitter:card metadata.',
  },
  {
    title: 'Canonical URLs',
    detail:
      'Canonical tags reduce duplicate content issues across URLs.',
  },
  {
    title: 'Structured data',
    detail:
      'JSON-LD helps search engines interpret entities, products, and reviews.',
  },
]

const htmlApis = [
  {
    title: 'Media and graphics',
    detail:
      'video, audio, canvas, and svg cover native media without plugins.',
  },
  {
    title: 'Interactive elements',
    detail:
      'details, summary, dialog, and popover provide built-in UI affordances.',
  },
  {
    title: 'Data and templates',
    detail:
      'template and slot support reusable UI via web components.',
  },
  {
    title: 'Forms and validation',
    detail:
      'Form-associated elements and validity states support accessible input handling.',
  },
]

const securityNotes = [
  {
    title: 'Safe embedding',
    detail:
      'Use sandboxed iframes and strict allow lists for third-party content.',
  },
  {
    title: 'Content security policy',
    detail:
      'CSP in meta or headers limits script, style, and media sources.',
  },
  {
    title: 'Link safety',
    detail:
      'Add rel="noopener noreferrer" to external links opened with target="_blank".',
  },
  {
    title: 'Input trust',
    detail:
      'Validate and sanitize user input server-side even if HTML validation exists.',
  },
]

const toolingWorkflow = [
  {
    title: 'Validators and linters',
    detail:
      'Use the W3C validator or HTML linters to catch invalid markup early.',
  },
  {
    title: 'Static site generators',
    detail:
      'SSG tools produce fast HTML with predictable structure and caching.',
  },
  {
    title: 'Component libraries',
    detail:
      'Reusable components keep structure consistent across pages and teams.',
  },
  {
    title: 'Testing',
    detail:
      'Accessibility tests and snapshots verify structure and semantics.',
  },
]

const debuggingWorkflow = [
  {
    title: 'Inspect the DOM',
    detail:
      'Use DevTools to confirm nesting, attributes, and computed accessibility roles.',
  },
  {
    title: 'Validate semantics',
    detail:
      'Check heading order and landmark structure with accessibility tools.',
  },
  {
    title: 'Audit performance',
    detail:
      'Measure HTML payload size and render-blocking resources in Lighthouse.',
  },
  {
    title: 'Test without CSS/JS',
    detail:
      'Disable CSS or scripts to confirm progressive enhancement holds up.',
  },
]

const productionChecklist = [
  {
    title: 'Semantics',
    detail:
      'Use correct elements, headings, and landmarks for navigability.',
  },
  {
    title: 'Accessibility',
    detail:
      'Ensure labels, alt text, and focus order are complete and meaningful.',
  },
  {
    title: 'Performance',
    detail:
      'Keep HTML lean and leverage resource hints for critical assets.',
  },
  {
    title: 'SEO and sharing',
    detail:
      'Add metadata and structured data for discovery and previews.',
  },
]

const learningPath = [
  {
    step: 'Foundations',
    detail: 'Elements, attributes, nesting rules, and document anatomy.',
  },
  {
    step: 'Semantics',
    detail: 'Landmarks, forms, and accessible content structure.',
  },
  {
    step: 'Modern HTML',
    detail: 'Media, templates, and interactive primitives.',
  },
  {
    step: 'Production HTML',
    detail: 'SEO, performance, security, and progressive enhancement.',
  },
]

export default function HtmlPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">HTML</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">The structured language that makes documents navigable, accessible, and resilient</div>
              <p className="win95-text">
                HTML defines the structure and meaning of web content. It is the contract between authors, browsers, and assistive
                technologies. Everything else on the front end builds on this foundation, so mastering HTML means mastering how a page
                is read, parsed, and experienced. Modern HTML also includes interactive primitives, media support, and metadata that
                shape SEO, accessibility, and performance.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                HTML turns raw text into a structured document tree. That structure powers layout, accessibility, search indexing, and
                how scripts locate and update content. When the HTML is correct, everything else becomes easier and more reliable.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: building blocks</legend>
            <div className="win95-grid win95-grid-3">
              {coreBuildingBlocks.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Document anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {documentAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Semantics and landmarks</legend>
            <div className="win95-grid win95-grid-2">
              {semanticsAndLandmarks.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Forms and input</legend>
            <div className="win95-grid win95-grid-2">
              {formsAndInput.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Media and graphics</legend>
            <div className="win95-grid win95-grid-2">
              {mediaAndGraphics.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>HTML platform APIs</legend>
            <div className="win95-grid win95-grid-2">
              {htmlApis.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>SEO and metadata</legend>
            <div className="win95-grid win95-grid-2">
              {seoAndMetadata.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Parsing and rendering pipeline</legend>
            <div className="win95-grid win95-grid-2">
              {parsingAndRendering.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance and delivery</legend>
            <div className="win95-grid win95-grid-2">
              {performanceAndDelivery.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                HTML is the first byte the browser sees. Keeping it semantic, compact, and well-ordered improves time-to-render and
                reduces the work required to hydrate rich interfaces.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Security considerations</legend>
            <div className="win95-grid win95-grid-2">
              {securityNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tooling and workflow</legend>
            <div className="win95-grid win95-grid-2">
              {toolingWorkflow.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Debugging workflow</legend>
            <div className="win95-grid win95-grid-2">
              {debuggingWorkflow.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Production checklist</legend>
            <div className="win95-grid win95-grid-2">
              {productionChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Learning path</legend>
            <div className="win95-grid win95-grid-2">
              {learningPath.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

