import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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
]

const cssPillars = [
  {
    heading: 'Selectors and specificity',
    bullets: [
      'Target elements by type, class, attribute, or relationship (descendant, child, sibling).',
      'Specificity ranks selectors. Inline styles override classes, classes override elements, and later rules win ties.',
      'Use low specificity and utility classes for predictable overrides. Avoid !important unless you are fighting third-party CSS.',
    ],
  },
  {
    heading: 'Cascade and inheritance',
    bullets: [
      'The cascade resolves conflicts between competing declarations from different sources and layers.',
      'Inherited properties (fonts, color) flow down the DOM; non-inherited properties (margin, border) do not.',
      'Use CSS layers and component boundaries to keep cascades understandable in large systems.',
    ],
  },
  {
    heading: 'Box model and sizing',
    bullets: [
      'Content size plus padding and border determines final box size. Margin adds external spacing.',
      'Box-sizing: border-box makes width include padding and border, simplifying layout math.',
      'Min, max, and clamp let you define flexible ranges that respond to available space.',
    ],
  },
  {
    heading: 'Layout systems',
    bullets: [
      'Normal flow stacks blocks and aligns inline content. Floats and positioning are older layout tools.',
      'Flexbox handles one-dimensional alignment: rows or columns with distribution and alignment controls.',
      'Grid manages two-dimensional layouts with explicit tracks and areas.',
    ],
  },
  {
    heading: 'Typography and color',
    bullets: [
      'Font stacks, line-height, and letter-spacing shape readability; use unitless line-heights for scale.',
      'Color and contrast must support accessibility. Color functions (rgb, hsl, lab) give modern control.',
      'Variable fonts and font-display improve performance while still allowing expressive typography.',
    ],
  },
  {
    heading: 'Motion and interaction',
    bullets: [
      'Transitions smooth state changes; animations define keyframe timelines.',
      'Prefer transform and opacity for better performance; avoid animating layout-affecting properties.',
      'Respect prefers-reduced-motion so interfaces remain comfortable for all users.',
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
]

const pitfalls = [
  'Overusing !important, which breaks predictable overrides and makes components hard to theme.',
  'Nesting selectors too deeply, creating high specificity and maintenance headaches.',
  'Mixing layout systems without intent (floats + grid + absolute positioning) leading to brittle layouts.',
  'Ignoring box-sizing, causing widths to overflow when padding and borders are added.',
  'Relying on fixed heights that break when content or localization changes.',
]

const decisionGuidance = [
  'Use Flexbox for rows, columns, and alignment problems; use Grid for two-dimensional layout control.',
  'Define a spacing and type scale early (rem-based) and stick to it for consistent rhythm.',
  'Prefer class-based selectors over tag selectors for reusable UI components.',
  'Use modern layout features (gap, minmax, clamp) before adding extra wrappers or breakpoints.',
  'Document design tokens in CSS variables so themes and modes are easy to maintain.',
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
]

const takeaways = [
  'CSS is a rule system governed by cascade, specificity, and inheritance. Mastering those mechanics prevents surprises.',
  'Layout decisions are easier when you pick the right system early: normal flow, flexbox, or grid.',
  'Modern CSS reduces the need for heavy frameworks when you leverage custom properties, clamp, and container queries.',
  'Performance and accessibility are built into CSS choices, not added later.',
]

export default function CssPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">CSS</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">A styling language that turns structure into layout, typography, and motion</div>
              <p className="win95-text">
                CSS (Cascading Style Sheets) defines how web documents look and behave. It controls typography, spacing, color,
                layout, responsiveness, and even animation. The core challenge is not memorizing properties; it is mastering
                the cascade, choosing the right layout system, and keeping styles predictable as projects grow.
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
                CSS is a declarative rule engine. You describe what elements should look like, and the browser resolves
                conflicts using the cascade. A good CSS system is consistent, layered, and intentional, so changes are easy
                and side effects are rare.
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
            <legend>Core pillars of CSS</legend>
            <div className="win95-grid win95-grid-3">
              {cssPillars.map((block) => (
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
            <legend>How the cascade decides</legend>
            <div className="win95-grid win95-grid-2">
              {cascadeRules.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The cascade is predictable once you internalize the priority ladder. If you need an override, consider whether
                it is best solved by layering, lowering specificity, or changing source order rather than reaching for !important.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Layout systems</legend>
            <div className="win95-grid win95-grid-2">
              {layoutSystems.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Units and sizing</legend>
            <div className="win95-grid win95-grid-2">
              {unitsAndSizing.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Responsive design patterns</legend>
            <div className="win95-grid win95-grid-2">
              {responsivePatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Accessibility considerations</legend>
            <div className="win95-grid win95-grid-2">
              {accessibilityNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance and rendering</legend>
            <div className="win95-grid win95-grid-2">
              {performanceNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tooling and workflows</legend>
            <div className="win95-grid win95-grid-2">
              {toolingStack.map((item) => (
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
            <legend>When to use what</legend>
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

