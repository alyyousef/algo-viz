import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const glossary = [
  { term: 'DOM', definition: 'Document Object Model tree produced by parsing HTML.' },
  { term: 'Semantic HTML', definition: 'Markup that uses elements for meaning, not appearance.' },
  { term: 'Landmarks', definition: 'Structural regions like main/nav/header used for navigation and accessibility.' },
  { term: 'Progressive Enhancement', definition: 'Start with robust HTML, then layer CSS and JS features.' },
  { term: 'ARIA', definition: 'Accessibility attributes used when native semantics are insufficient.' },
  { term: 'Hydration', definition: 'Client-side binding of behavior onto server-rendered HTML.' },
  { term: 'CSP', definition: 'Content Security Policy controlling allowed resource sources.' },
  { term: 'Structured Data', definition: 'Machine-readable metadata (often JSON-LD) for search engines.' },
  { term: 'Viewport Meta', definition: 'Head tag controlling mobile layout viewport behavior.' },
  { term: 'Doctype', definition: 'Declaration that triggers standards mode parsing.' },
]

const htmlHelpStyles = `
.html98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  margin: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.html98-window {
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

.html98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 4px;
  color: #fff;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
}

.html98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.1;
  pointer-events: none;
}

.html98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.html98-control {
  width: 18px;
  height: 16px;
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
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
}

.html98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.html98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.html98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.html98-main {
  border-top: 1px solid #404040;
  background: #fff;
  display: grid;
  grid-template-columns: 240px 1fr;
  flex: 1;
  min-height: 0;
}

.html98-toc {
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  overflow: auto;
}

.html98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.html98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.html98-toc-list li {
  margin: 0 0 8px;
}

.html98-toc-list a {
  font-size: 12px;
  color: #000;
  text-decoration: none;
}

.html98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.html98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.html98-section {
  margin: 0 0 22px;
}

.html98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.html98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.html98-content p,
.html98-content li,
.html98-content th,
.html98-content td {
  font-size: 12px;
  line-height: 1.5;
}

.html98-content p {
  margin: 0 0 10px;
}

.html98-content ul,
.html98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.html98-content table {
  border-collapse: collapse;
  margin: 0 0 10px;
}

.html98-content th,
.html98-content td {
  padding: 2px 8px 2px 0;
  vertical-align: top;
}

.html98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.html98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.html98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .html98-main {
    grid-template-columns: 1fr;
  }

  .html98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-building', label: 'Building Blocks' },
    { id: 'core-anatomy', label: 'Document Anatomy' },
    { id: 'core-semantics', label: 'Semantics and Landmarks' },
    { id: 'core-forms', label: 'Forms and Input' },
    { id: 'core-media', label: 'Media and Graphics' },
    { id: 'core-apis', label: 'HTML Platform APIs' },
    { id: 'core-seo', label: 'SEO and Metadata' },
    { id: 'core-parsing', label: 'Parsing and Rendering' },
    { id: 'core-performance', label: 'Performance and Delivery' },
    { id: 'core-security', label: 'Security Considerations' },
    { id: 'core-tooling', label: 'Tooling and Workflow' },
    { id: 'core-debugging', label: 'Debugging Workflow' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-production', label: 'Production Checklist' },
    { id: 'core-when', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-learning', label: 'Learning Path' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function HtmlPage(): JSX.Element {
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
    document.title = `HTML (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'HTML',
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
    <div className="html98-help-page">
      <style>{htmlHelpStyles}</style>
      <div className="html98-window" role="presentation">
        <header className="html98-titlebar">
          <span className="html98-title-text">HTML</span>
          <div className="html98-title-controls">
            <button className="html98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="html98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="html98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`html98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="html98-main">
          <aside className="html98-toc" aria-label="Table of contents">
            <h2 className="html98-toc-title">Contents</h2>
            <ul className="html98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="html98-content">
            <h1 className="html98-doc-title">HTML</h1>
            <p>
              HTML defines the structure and meaning of web content. It is the contract between authors, browsers, and assistive
              technologies. Everything else on the front end builds on this foundation, so mastering HTML means mastering how a page
              is read, parsed, and experienced.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="html98-section">
                  <h2 className="html98-heading">Overview</h2>
                  <p>
                    HTML turns raw text into a structured document tree. That structure powers layout, accessibility, search indexing,
                    and how scripts locate and update content. When the HTML is correct, everything else becomes easier and more reliable.
                  </p>
                </section>
                <hr className="html98-divider" />
                <section id="bp-history" className="html98-section">
                  <h2 className="html98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-models" className="html98-section">
                  <h2 className="html98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="html98-section">
                  <h2 className="html98-heading">Key Takeaways</h2>
                  <ul>
                    {takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-building" className="html98-section">
                  <h2 className="html98-heading">How It Works: Building Blocks</h2>
                  {coreBuildingBlocks.map((block) => (
                    <div key={block.heading}>
                      <h3 className="html98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-anatomy" className="html98-section">
                  <h2 className="html98-heading">Document Anatomy</h2>
                  {documentAnatomy.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-semantics" className="html98-section">
                  <h2 className="html98-heading">Semantics and Landmarks</h2>
                  {semanticsAndLandmarks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-forms" className="html98-section">
                  <h2 className="html98-heading">Forms and Input</h2>
                  {formsAndInput.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-media" className="html98-section">
                  <h2 className="html98-heading">Media and Graphics</h2>
                  {mediaAndGraphics.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-apis" className="html98-section">
                  <h2 className="html98-heading">HTML Platform APIs</h2>
                  {htmlApis.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-seo" className="html98-section">
                  <h2 className="html98-heading">SEO and Metadata</h2>
                  {seoAndMetadata.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-parsing" className="html98-section">
                  <h2 className="html98-heading">Parsing and Rendering Pipeline</h2>
                  {parsingAndRendering.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="html98-section">
                  <h2 className="html98-heading">Performance and Delivery</h2>
                  {performanceAndDelivery.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    HTML is the first byte the browser sees. Keeping it semantic, compact, and well-ordered improves time-to-render and
                    reduces the work required to hydrate rich interfaces.
                  </p>
                </section>
                <section id="core-security" className="html98-section">
                  <h2 className="html98-heading">Security Considerations</h2>
                  {securityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-tooling" className="html98-section">
                  <h2 className="html98-heading">Tooling and Workflow</h2>
                  {toolingWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-debugging" className="html98-section">
                  <h2 className="html98-heading">Debugging Workflow</h2>
                  {debuggingWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="html98-section">
                  <h2 className="html98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-production" className="html98-section">
                  <h2 className="html98-heading">Production Checklist</h2>
                  {productionChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-when" className="html98-section">
                  <h2 className="html98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="html98-section">
                  <h2 className="html98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-learning" className="html98-section">
                  <h2 className="html98-heading">Learning Path</h2>
                  {learningPath.map((item) => (
                    <p key={item.step}>
                      <strong>{item.step}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="html98-section">
                <h2 className="html98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="html98-subheading">{example.title}</h3>
                    <div className="html98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="html98-section">
                <h2 className="html98-heading">Glossary</h2>
                {glossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
