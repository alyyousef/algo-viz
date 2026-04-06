import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'CSS 1 formalizes presentation rules (1996)',
    detail:
      'The first CSS spec separated structure (HTML) from presentation, making it possible to style multiple pages consistently without inline tags.',
  },
  {
    title: 'CSS 2 and positioning arrive (1998)',
    detail:
      'Absolute and relative positioning, media types, and z-index expanded CSS beyond fonts and colors into layout control.',
  },
  {
    title: 'CSS 2.1 and modern browser convergence (2011)',
    detail:
      'CSS 2.1 stabilized the core box model and cleared up interoperability gaps, giving developers a dependable baseline.',
  },
  {
    title: 'Modular CSS era (2012+)',
    detail:
      'Specifications split into modules (Flexbox, Grid, Transforms, Animations) so layout, motion, and typography could evolve independently.',
  },
  {
    title: 'Flexbox and Grid become standard (2013-2017)',
    detail:
      'Modern layout systems make responsive design far less dependent on floats and hacks.',
  },
  {
    title: 'Custom properties and layers (2016+)',
    detail:
      'CSS variables and @layer bring design tokens and explicit cascade ordering to native CSS.',
  },
  {
    title: 'Container queries and new units (2022+)',
    detail:
      'Components respond to their containers, and viewport units like svh/dvh improve mobile sizing.',
  },
]

const mentalModels = [
  {
    title: 'Cascade as a decision tree',
    detail:
      'When multiple rules apply, the browser chooses the winner by importance, origin, specificity, and order. Think of it as a deterministic tie-breaker ladder.',
  },
  {
    title: 'Every box has layers',
    detail:
      'Content sits inside padding, border, and margin. Layout is mostly about deciding how those layers size and flow next to each other.',
  },
  {
    title: 'Selectors are queries',
    detail:
      'A selector is a pattern that matches elements. Efficient CSS targets the smallest necessary subset so styling is clear and maintainable.',
  },
  {
    title: 'Layout is constraint solving',
    detail:
      'You define constraints (sizes, alignment, available space), and the layout engine resolves them into final geometry.',
  },
  {
    title: 'Tokens are shared language',
    detail:
      'Design tokens (spacing, color, type) are the vocabulary that keeps interfaces consistent across components.',
  },
  {
    title: 'Rendering is staged',
    detail:
      'Style, layout, paint, and composite are distinct stages; changes hit different stages with different performance costs.',
  },
]

const cssPillars = [
  {
    heading: 'Selectors and specificity',
    bullets: [
      'Target elements by type, class, attribute, or relationship (descendant, child, sibling).',
      'Specificity ranks selectors. Inline styles override classes, classes override elements, and later rules win ties.',
      'Use low specificity and utility classes for predictable overrides. Avoid !important unless you are fighting third-party CSS.',
      'Prefer class selectors over IDs for reusable components and easier overrides.',
    ],
  },
  {
    heading: 'Cascade and inheritance',
    bullets: [
      'The cascade resolves conflicts between competing declarations from different sources and layers.',
      'Inherited properties (fonts, color) flow down the DOM; non-inherited properties (margin, border) do not.',
      'Use CSS layers and component boundaries to keep cascades understandable in large systems.',
      'Reset or normalize styles to create a consistent baseline across browsers.',
    ],
  },
  {
    heading: 'Box model and sizing',
    bullets: [
      'Content size plus padding and border determines final box size. Margin adds external spacing.',
      'Box-sizing: border-box makes width include padding and border, simplifying layout math.',
      'Min, max, and clamp let you define flexible ranges that respond to available space.',
      'Intrinsic sizing keywords (min-content, max-content, fit-content) help balance layout and text flow.',
    ],
  },
  {
    heading: 'Layout systems',
    bullets: [
      'Normal flow stacks blocks and aligns inline content. Floats and positioning are older layout tools.',
      'Flexbox handles one-dimensional alignment: rows or columns with distribution and alignment controls.',
      'Grid manages two-dimensional layouts with explicit tracks and areas.',
      'Subgrid and container queries improve alignment and component autonomy.',
    ],
  },
  {
    heading: 'Typography and color',
    bullets: [
      'Font stacks, line-height, and letter-spacing shape readability; use unitless line-heights for scale.',
      'Color and contrast must support accessibility. Color functions (rgb, hsl, lab) give modern control.',
      'Variable fonts and font-display improve performance while still allowing expressive typography.',
      'Use clamp for responsive type scales that adjust smoothly between breakpoints.',
    ],
  },
  {
    heading: 'Motion and interaction',
    bullets: [
      'Transitions smooth state changes; animations define keyframe timelines.',
      'Prefer transform and opacity for better performance; avoid animating layout-affecting properties.',
      'Respect prefers-reduced-motion so interfaces remain comfortable for all users.',
      'Use easing curves and durations consistently so motion feels intentional.',
    ],
  },
]

const cascadeRules = [
  {
    title: 'Origin and importance',
    detail:
      'User agent styles (browser defaults) are the base. Author styles override them, and user styles can override author rules. !important jumps a declaration to the top of its origin bucket.',
  },
  {
    title: 'Specificity',
    detail:
      'IDs outrank classes, classes outrank elements. Complex selectors can become hard to override, so prefer simpler class-driven styling.',
  },
  {
    title: 'Source order',
    detail:
      'When importance and specificity tie, the last rule wins. This is why stylesheet order and layer order matter.',
  },
  {
    title: 'Inheritance',
    detail:
      'Inherited properties pass down; non-inherited properties reset unless explicitly set. Use inherit or unset to control flow.',
  },
  {
    title: 'Cascade layers',
    detail:
      '@layer lets you group styles and define explicit precedence between base, components, and utilities.',
  },
]

const layoutSystems = [
  {
    title: 'Normal flow',
    detail:
      'Block elements stack vertically and fill available width. Inline elements flow within lines, wrapping at container edges.',
  },
  {
    title: 'Positioning',
    detail:
      'Relative shifts an element without removing it from flow. Absolute takes it out of flow and positions relative to the nearest positioned ancestor.',
  },
  {
    title: 'Flexbox',
    detail:
      'Best for rows or columns where alignment and spacing matter. Use gap, align-items, and justify-content for consistent distribution.',
  },
  {
    title: 'Grid',
    detail:
      'Define rows and columns simultaneously. Use repeat, minmax, and auto-fit to build responsive tracks.',
  },
  {
    title: 'Multi-column layout',
    detail:
      'Split long text into columns with column-count and column-gap for magazine-like flows.',
  },
]

const unitsAndSizing = [
  {
    title: 'Absolute units',
    detail:
      'px is device-referenced and common for fine control. Physical units (cm, in) are rarely reliable on screens.',
  },
  {
    title: 'Relative units',
    detail:
      'em, rem, and percent scale with font size or container size. Use rem for consistent type scales.',
  },
  {
    title: 'Viewport units',
    detail:
      'vw, vh, vmin, vmax scale with the viewport. New units (svh, lvh, dvh) help handle mobile browser UI.',
  },
  {
    title: 'Sizing functions',
    detail:
      'min(), max(), and clamp() let you define adaptable ranges without media queries.',
  },
  {
    title: 'Character and line units',
    detail:
      'ch and lh approximate character width and line height, useful for readable measure and rhythm.',
  },
]

const responsivePatterns = [
  {
    title: 'Fluid grids',
    detail:
      'Use repeat(auto-fit, minmax()) to adapt columns to screen size. Gap defines consistent spacing across breakpoints.',
  },
  {
    title: 'Container queries',
    detail:
      'Components respond to their container size instead of viewport width, enabling reusable layout modules.',
  },
  {
    title: 'Media queries',
    detail:
      'Target device capabilities like width, pointer, and prefers-color-scheme for responsive behavior.',
  },
  {
    title: 'Responsive typography',
    detail:
      'Use clamp() for headings to scale between min and max sizes, keeping readability on all screens.',
  },
  {
    title: 'Responsive media',
    detail:
      'Use max-width: 100% and aspect-ratio to keep images and videos fluid.',
  },
  {
    title: 'Fluid spacing',
    detail:
      'Define spacing tokens with clamp so layouts breathe across device sizes.',
  },
]

const accessibilityNotes = [
  {
    title: 'Focus states',
    detail:
      'Always provide visible focus for keyboard users. Do not remove outlines unless you replace them with a clear alternative.',
  },
  {
    title: 'Contrast and color',
    detail:
      'Meet contrast ratios for text and UI elements. Avoid using color alone to convey meaning.',
  },
  {
    title: 'Reduced motion',
    detail:
      'Use prefers-reduced-motion to reduce or remove large motion effects for sensitive users.',
  },
  {
    title: 'Hit targets',
    detail:
      'Ensure interactive elements are large enough to tap comfortably on touch devices.',
  },
  {
    title: 'Focus visibility',
    detail:
      'Use :focus-visible to show focus when it is useful without distracting mouse users.',
  },
]

const performanceNotes = [
  {
    title: 'Selector efficiency',
    detail:
      'Browsers match selectors right-to-left. Deep descendant chains can be costly; keep selectors shallow.',
  },
  {
    title: 'Render costs',
    detail:
      'Layout, paint, and composite are the main phases. Stick to transform and opacity for smooth animations.',
  },
  {
    title: 'Critical CSS',
    detail:
      'Inline above-the-fold styles and defer non-critical CSS to reduce render-blocking overhead.',
  },
  {
    title: 'Containment and content-visibility',
    detail:
      'Contain and content-visibility limit layout and paint work for large or offscreen sections.',
  },
  {
    title: 'Font loading',
    detail:
      'Use font-display and preload to reduce layout shifts and improve first render.',
  },
]

const toolingStack = [
  {
    title: 'Preprocessors',
    detail:
      'Sass and Less add variables, nesting, and mixins. Use them to organize style systems, but avoid deep nesting.',
  },
  {
    title: 'PostCSS and autoprefixing',
    detail:
      'PostCSS transforms CSS and adds vendor prefixes so you can author modern syntax without worrying about compatibility.',
  },
  {
    title: 'CSS Modules and utility frameworks',
    detail:
      'Modules scope styles to components. Utility-first frameworks provide small, composable classes for rapid layout and design.',
  },
  {
    title: 'Linting and formatting',
    detail:
      'Stylelint and consistent formatting prevent accidental specificity and syntax mistakes.',
  },
  {
    title: 'Design tokens',
    detail:
      'Token systems and style dictionaries keep spacing, color, and typography consistent across apps.',
  },
]

const examples = [
  {
    title: 'Cascade and specificity in practice',
    code: `/* Base button styling */
.button { background: #e0e0e0; color: #000; }

/* Component variant */
.button.primary { background: #005fcc; color: #fff; }

/* Inline override - highest specificity */
<button class="button primary" style="background: #ffb000;">Buy</button>`,
    explanation:
      'The class combination increases specificity, and inline styles win last. Keeping specificity low avoids having to fight overrides later.',
  },
  {
    title: 'Responsive grid with auto-fit',
    code: `/* Cards scale from 240px to fill the row */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}

.card { padding: 16px; border: 1px solid #888; }`,
    explanation:
      'auto-fit collapses empty tracks while minmax keeps cards readable. This pattern removes the need for many breakpoints.',
  },
  {
    title: 'Container query for a reusable component',
    code: `/* Enable size queries on the card container */
.card { container-type: inline-size; }

@container (min-width: 420px) {
  .card-content { display: grid; grid-template-columns: 120px 1fr; gap: 12px; }
}`,
    explanation:
      'The card adapts based on its own width rather than the viewport, making it flexible inside dashboards and sidebars.',
  },
  {
    title: 'Design tokens with custom properties',
    code: `:root {
  --space-2: 8px;
  --space-4: 16px;
  --radius: 6px;
}

.panel {
  padding: var(--space-4);
  border-radius: var(--radius);
}`,
    explanation:
      'Tokens keep spacing and shape consistent while still allowing easy theme overrides.',
  },
  {
    title: 'Grid areas for layout clarity',
    code: `.layout {
  display: grid;
  grid-template-areas:
    "nav nav"
    "side main";
  grid-template-columns: 240px 1fr;
  gap: 12px;
}

.nav { grid-area: nav; }
.side { grid-area: side; }
.main { grid-area: main; }`,
    explanation:
      'Named areas make complex layouts easier to read and maintain.',
  },
  {
    title: 'Motion with reduced-motion support',
    code: `.card { transition: transform 150ms ease; }
.card:hover { transform: translateY(-2px); }

@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
}`,
    explanation:
      'Motion remains subtle for most users and disables when a reduced-motion preference is set.',
  },
]

const pitfalls = [
  'Overusing !important, which breaks predictable overrides and makes components hard to theme.',
  'Nesting selectors too deeply, creating high specificity and maintenance headaches.',
  'Mixing layout systems without intent (floats + grid + absolute positioning) leading to brittle layouts.',
  'Ignoring box-sizing, causing widths to overflow when padding and borders are added.',
  'Relying on fixed heights that break when content or localization changes.',
  'Sprinkling inline styles that bypass the cascade and make refactors harder.',
  'Shipping huge unused CSS that slows page load and rendering.',
  'Forgetting focus styles on custom interactive elements.',
]

const decisionGuidance = [
  'Use Flexbox for rows, columns, and alignment problems; use Grid for two-dimensional layout control.',
  'Define a spacing and type scale early (rem-based) and stick to it for consistent rhythm.',
  'Prefer class-based selectors over tag selectors for reusable UI components.',
  'Use modern layout features (gap, minmax, clamp) before adding extra wrappers or breakpoints.',
  'Document design tokens in CSS variables so themes and modes are easy to maintain.',
  'Reach for container queries when components must live in multiple layouts.',
  'Use @layer to prevent utility overrides from accidentally clobbering components.',
]

const advancedInsights = [
  {
    title: 'Layered architecture',
    detail:
      'Use @layer to isolate resets, base styles, components, and utilities. This keeps cascade order explicit and reduces specificity battles.',
  },
  {
    title: 'Custom properties as tokens',
    detail:
      'CSS variables cascade and can be overridden per component or theme, making them ideal for design tokens and theming.',
  },
  {
    title: 'Subgrid and layout refinement',
    detail:
      'Subgrid allows children to align to parent grid tracks, improving alignment consistency in complex layouts.',
  },
  {
    title: 'Logical properties',
    detail:
      'Use margin-inline and padding-block to support right-to-left and vertical writing modes without duplicating styles.',
  },
  {
    title: 'Composited animation',
    detail:
      'Animations that stay in the composite stage (transform, opacity) remain smooth under load.',
  },
  {
    title: 'Scoping strategies',
    detail:
      'Scope global styles narrowly and use utility or module patterns to prevent leakage.',
  },
]

const takeaways = [
  'CSS is a rule system governed by cascade, specificity, and inheritance. Mastering those mechanics prevents surprises.',
  'Layout decisions are easier when you pick the right system early: normal flow, flexbox, or grid.',
  'Modern CSS reduces the need for heavy frameworks when you leverage custom properties, clamp, and container queries.',
  'Performance and accessibility are built into CSS choices, not added later.',
  'Design tokens and layers keep large codebases predictable and scalable.',
  'Rendering knowledge helps you diagnose jank and layout bugs quickly.',
]

const renderingPipeline = [
  {
    title: 'Style calculation',
    detail:
      'The browser resolves CSS rules to computed styles for each element.',
  },
  {
    title: 'Layout',
    detail:
      'Element geometry is computed from the box model and layout constraints.',
  },
  {
    title: 'Paint',
    detail:
      'Pixels are drawn for backgrounds, borders, text, and shadows.',
  },
  {
    title: 'Composite',
    detail:
      'Layers are combined on the GPU; transforms and opacity can update here.',
  },
]

const designSystemNotes = [
  {
    title: 'Token scales',
    detail:
      'Define color, spacing, and typography scales once and reuse everywhere.',
  },
  {
    title: 'Component boundaries',
    detail:
      'Scope styles to components to avoid unintended cross-page effects.',
  },
  {
    title: 'States and variants',
    detail:
      'Design consistent hover, focus, active, and disabled states across UI.',
  },
  {
    title: 'Theming',
    detail:
      'Use CSS variables to swap themes without rewriting components.',
  },
]

const debuggingWorkflow = [
  {
    title: 'Use DevTools',
    detail:
      'Inspect computed styles and see which rules win in the cascade.',
  },
  {
    title: 'Outline layout',
    detail:
      'Temporary outlines on containers make spacing and flow issues visible.',
  },
  {
    title: 'Toggle constraints',
    detail:
      'Disable or isolate styles to pinpoint which rule causes a bug.',
  },
  {
    title: 'Test responsive states',
    detail:
      'Resize and emulate devices to validate breakpoints and container queries.',
  },
]

const productionChecklist = [
  {
    title: 'Consistency',
    detail:
      'Use tokens, scales, and shared utilities to keep styling uniform.',
  },
  {
    title: 'Accessibility',
    detail:
      'Verify focus states, contrast, and reduced-motion behavior.',
  },
  {
    title: 'Performance',
    detail:
      'Remove unused CSS and avoid heavy effects on scroll or hover.',
  },
  {
    title: 'Maintainability',
    detail:
      'Limit specificity and document global rules to prevent collisions.',
  },
]

const learningPath = [
  {
    step: 'Foundations',
    detail: 'Selectors, cascade, box model, and typography basics.',
  },
  {
    step: 'Layout mastery',
    detail: 'Flexbox, grid, positioning, and responsive patterns.',
  },
  {
    step: 'Advanced features',
    detail: 'Custom properties, container queries, and modern units.',
  },
  {
    step: 'Production CSS',
    detail: 'Design tokens, tooling, performance, and accessibility.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const glossary = [
  { term: 'Cascade', definition: 'Rule conflict resolution based on origin, importance, specificity, and order.' },
  { term: 'Specificity', definition: 'Selector weighting system that decides which rule wins among matching selectors.' },
  { term: 'Box Model', definition: 'Content, padding, border, and margin layers defining element dimensions.' },
  { term: 'Flexbox', definition: 'One-dimensional layout model for distributing and aligning items in rows or columns.' },
  { term: 'Grid', definition: 'Two-dimensional layout system with explicit row and column tracks.' },
  { term: 'Container Query', definition: 'Conditional styling based on a component container size, not viewport size.' },
  { term: 'Custom Property', definition: 'CSS variable that can cascade and be overridden for theming and tokens.' },
  { term: 'Rendering Pipeline', definition: 'Browser stages: style, layout, paint, and composite.' },
  { term: 'Reflow', definition: 'Layout recalculation triggered by geometry-affecting style or DOM changes.' },
  { term: 'Compositing', definition: 'GPU layer composition stage where transform/opacity animations are efficient.' },
]

const cssHelpStyles = `
.css98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  margin: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.css98-window {
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

.css98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 4px;
  color: #fff;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
}

.css98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.1;
  pointer-events: none;
}

.css98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.css98-control {
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

.css98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.css98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.css98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.css98-main {
  border-top: 1px solid #404040;
  background: #fff;
  display: grid;
  grid-template-columns: 240px 1fr;
  flex: 1;
  min-height: 0;
}

.css98-toc {
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  overflow: auto;
}

.css98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.css98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.css98-toc-list li {
  margin: 0 0 8px;
}

.css98-toc-list a {
  font-size: 12px;
  color: #000;
  text-decoration: none;
}

.css98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.css98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.css98-section {
  margin: 0 0 22px;
}

.css98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.css98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.css98-content p,
.css98-content li,
.css98-content th,
.css98-content td {
  font-size: 12px;
  line-height: 1.5;
}

.css98-content p {
  margin: 0 0 10px;
}

.css98-content ul,
.css98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.css98-content table {
  border-collapse: collapse;
  margin: 0 0 10px;
}

.css98-content th,
.css98-content td {
  padding: 2px 8px 2px 0;
  vertical-align: top;
}

.css98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.css98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.css98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .css98-main {
    grid-template-columns: 1fr;
  }

  .css98-toc {
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
    { id: 'core-pillars', label: 'Core Pillars' },
    { id: 'core-cascade', label: 'Cascade Rules' },
    { id: 'core-layout', label: 'Layout Systems' },
    { id: 'core-sizing', label: 'Units and Sizing' },
    { id: 'core-responsive', label: 'Responsive Patterns' },
    { id: 'core-accessibility', label: 'Accessibility' },
    { id: 'core-performance', label: 'Performance and Rendering' },
    { id: 'core-pipeline', label: 'Rendering Pipeline' },
    { id: 'core-tooling', label: 'Tooling and Workflows' },
    { id: 'core-design-system', label: 'Design System Practices' },
    { id: 'core-debugging', label: 'Debugging Workflow' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-production', label: 'Production Checklist' },
    { id: 'core-when', label: 'When to Use What' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-learning', label: 'Learning Path' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function CssPage(): JSX.Element {
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
    document.title = `CSS (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'CSS',
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
    <div className="css98-help-page">
      <style>{cssHelpStyles}</style>
      <div className="css98-window" role="presentation">
        <header className="css98-titlebar">
          <span className="css98-title-text">CSS</span>
          <div className="css98-title-controls">
            <button className="css98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="css98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="css98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`css98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="css98-main">
          <aside className="css98-toc" aria-label="Table of contents">
            <h2 className="css98-toc-title">Contents</h2>
            <ul className="css98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="css98-content">
            <h1 className="css98-doc-title">CSS</h1>
            <p>
              CSS (Cascading Style Sheets) defines how web documents look and behave. It controls typography, spacing, color,
              layout, responsiveness, and animation. The core challenge is mastering the cascade, choosing the right layout
              system, and keeping styles predictable as projects grow.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="css98-section">
                  <h2 className="css98-heading">Overview</h2>
                  <p>
                    CSS is a declarative rule engine. You describe what elements should look like, and the browser resolves
                    conflicts using the cascade. A good CSS system is layered and intentional, so changes are easy and side
                    effects are rare.
                  </p>
                </section>
                <hr className="css98-divider" />
                <section id="bp-history" className="css98-section">
                  <h2 className="css98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-models" className="css98-section">
                  <h2 className="css98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="css98-section">
                  <h2 className="css98-heading">Key Takeaways</h2>
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
                <section id="core-pillars" className="css98-section">
                  <h2 className="css98-heading">Core Pillars of CSS</h2>
                  {cssPillars.map((block) => (
                    <div key={block.heading}>
                      <h3 className="css98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-cascade" className="css98-section">
                  <h2 className="css98-heading">How the Cascade Decides</h2>
                  {cascadeRules.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    The cascade is predictable once you internalize the priority ladder. Prefer layering and specificity control
                    over `!important` whenever possible.
                  </p>
                </section>
                <section id="core-layout" className="css98-section">
                  <h2 className="css98-heading">Layout Systems</h2>
                  {layoutSystems.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-sizing" className="css98-section">
                  <h2 className="css98-heading">Units and Sizing</h2>
                  {unitsAndSizing.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-responsive" className="css98-section">
                  <h2 className="css98-heading">Responsive Design Patterns</h2>
                  {responsivePatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-accessibility" className="css98-section">
                  <h2 className="css98-heading">Accessibility Considerations</h2>
                  {accessibilityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="css98-section">
                  <h2 className="css98-heading">Performance and Rendering</h2>
                  {performanceNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pipeline" className="css98-section">
                  <h2 className="css98-heading">Rendering Pipeline</h2>
                  {renderingPipeline.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-tooling" className="css98-section">
                  <h2 className="css98-heading">Tooling and Workflows</h2>
                  {toolingStack.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-design-system" className="css98-section">
                  <h2 className="css98-heading">Design System Practices</h2>
                  {designSystemNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-debugging" className="css98-section">
                  <h2 className="css98-heading">Debugging Workflow</h2>
                  {debuggingWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="css98-section">
                  <h2 className="css98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-production" className="css98-section">
                  <h2 className="css98-heading">Production Checklist</h2>
                  {productionChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-when" className="css98-section">
                  <h2 className="css98-heading">When to Use What</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="css98-section">
                  <h2 className="css98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-learning" className="css98-section">
                  <h2 className="css98-heading">Learning Path</h2>
                  {learningPath.map((item) => (
                    <p key={item.step}>
                      <strong>{item.step}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="css98-section">
                <h2 className="css98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="css98-subheading">{example.title}</h3>
                    <div className="css98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="css98-section">
                <h2 className="css98-heading">Glossary</h2>
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
