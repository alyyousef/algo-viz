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

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'React and Angular are both mature front-end technologies for building modern web applications, but they begin from different assumptions. React is primarily a UI library centered on components and declarative rendering. Angular is a full application framework with built-in patterns for components, templates, dependency injection, routing, forms, and broader application structure.',
      'That means the real comparison is not only JSX versus templates or Hooks versus services. The more useful question is whether the team wants a smaller rendering-centered core that composes with surrounding libraries, or a more opinionated framework that provides more of the application architecture out of the box.',
      'The original page scope was placeholder content for React vs Angular, with planned notes on overview, key ideas, core syntax, APIs, ecosystem, architecture, use cases, and tradeoffs. This help-style version keeps that scope and expands it into a fuller technical reference.',
    ],
  },
  {
    id: 'bp-react',
    title: 'When React Fits Better',
    paragraphs: [
      'React is often the stronger fit when the team wants flexibility, incremental adoption, and a UI-centric component model that can be composed with surrounding tools as needed. It is especially attractive when the organization already has deep JavaScript or TypeScript frontend expertise and wants to choose routing, data fetching, state management, and other layers independently.',
      'It also fits well when the application architecture benefits from a broad ecosystem and when the team values the ability to scale from small widgets to large applications without committing immediately to a single all-in framework model.',
    ],
  },
  {
    id: 'bp-angular',
    title: 'When Angular Fits Better',
    paragraphs: [
      'Angular is often the stronger fit when the team wants a more integrated framework with official answers for many core application concerns. It is especially attractive in organizations that value explicit structure, dependency injection, strong conventions, CLI-driven workflows, and a more batteries-included model for large applications.',
      "It can also be a better fit when the team wants architectural consistency across many engineers and many codebases. Angular's stronger conventions often reduce the number of framework-level decisions each project must invent for itself.",
    ],
  },
  {
    id: 'bp-same-problem',
    title: 'Same Problem, Different Scope',
    paragraphs: [
      'Both technologies can build complex production front ends. Both support reusable components, stateful UIs, routing patterns, data fetching, forms, and large-scale enterprise applications.',
      'The deeper difference is scope. React focuses first on rendering and component composition, while Angular presents a fuller application platform. That difference shapes how teams think about architecture, onboarding, and long-term maintenance.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'One trap is to compare ecosystem size alone. A bigger ecosystem can be a strength, but it can also mean more architectural choices to make. Another trap is to treat built-in framework features as automatically superior. Strong conventions help some teams and constrain others.',
      'Another mistake is to compare old stereotypes. Modern Angular is not the same as early Angular-era assumptions, and modern React includes contemporary guidance around hooks, concurrency features, and compiler-era tooling that older comparisons often miss.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose React when flexibility, incremental architecture, and a UI-library-first model are the main advantages.',
      'Choose Angular when integrated framework structure, official defaults, and convention-driven application architecture are the main advantages.',
      'If the team wants to decide many app layers independently, React often fits better. If the team wants more built-in structure from the framework itself, Angular often fits better.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both React and Angular use components as a primary UI-building concept. Both can power large production applications, support TypeScript-based development, and integrate with sophisticated build, testing, and deployment workflows.',
      'That shared ground matters because the choice is usually not about whether one can scale and the other cannot. The choice is usually about how much framework structure the team wants and how much architectural freedom it wants to preserve.',
    ],
  },
  {
    id: 'core-scope',
    title: 'Library vs Framework Scope',
    paragraphs: [
      'React is primarily concerned with rendering user interfaces through components. It pairs naturally with additional tools for routing, data fetching, forms, or broader application infrastructure. This modularity is a major reason teams choose it.',
      'Angular is a framework with stronger opinions about how applications are structured. Components, templates, dependency injection, routing, forms, and many application-level concerns sit inside the Angular model itself rather than being assembled as separate independent choices.',
    ],
  },
  {
    id: 'core-components',
    title: 'Component Model',
    paragraphs: [
      'React components are ordinary JavaScript or TypeScript functions in modern usage. JSX combines rendering logic with component code, and Hooks provide access to state and lifecycle-like behavior inside functional components.',
      "Angular components are classes annotated with metadata. Templates, selectors, styles, and imported dependencies are declared through Angular's component model, and the framework compiles and coordinates those pieces within its larger application system.",
    ],
  },
  {
    id: 'core-templates',
    title: 'Templates and Rendering Style',
    paragraphs: [
      'React uses JSX, which means UI structure is authored in JavaScript or TypeScript syntax. For many teams, this creates a strong sense that rendering logic and UI composition live in the same conceptual space.',
      'Angular uses HTML templates with Angular-specific syntax for control flow, bindings, directives, and component composition. This keeps templates visually distinct from component class logic and often feels more framework-structured and declarative in a template-first way.',
    ],
  },
  {
    id: 'core-state',
    title: 'State and Reactivity',
    paragraphs: [
      'React uses state hooks, reducers, context, and related patterns to express UI state and updates. Modern React also includes concurrency-aware primitives such as transitions and deferred values, and the ecosystem offers many ways to layer in server-state or global-state tools.',
      'Angular historically leaned heavily on RxJS-based patterns, and modern Angular also includes signals as a first-class reactive model. This gives Angular applications both classic observable-driven architecture and newer signal-based reactivity, depending on the app design and the teams preferred style.',
    ],
  },
  {
    id: 'core-di',
    title: 'Dependency Injection and Service Structure',
    paragraphs: [
      'Angular treats dependency injection as a core architectural primitive. Services, providers, and injection contexts are built directly into the framework, which can make large applications feel structurally coherent when teams embrace that pattern.',
      'React does not have a built-in dependency injection system in the same sense. Teams typically use props, context, hooks, module boundaries, and custom abstractions to share dependencies and application services. This can feel lighter or less structured depending on the team.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and Application Structure',
    paragraphs: [
      'React itself does not prescribe routing, so teams usually adopt a routing solution through the ecosystem or through a React-based framework. This modularity is powerful, but it also means routing architecture is one of the decisions teams must make intentionally.',
      'Angular Router is a core part of the framework and is commonly treated as the default navigation solution in Angular applications. This creates stronger consistency across Angular codebases and fewer framework-level debates about routing choices.',
    ],
  },
  {
    id: 'core-forms',
    title: 'Forms and Validation',
    paragraphs: [
      'React form strategy is flexible. Teams can build with controlled inputs, uncontrolled inputs, or adopt specialized libraries for validation and form state. This flexibility is valuable, but it also means form architecture varies more across projects.',
      'Angular includes a stronger built-in forms story, including patterns for validation and more framework-native form structures. Teams building large form-heavy enterprise apps often find this integrated approach attractive.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Developer Workflow',
    paragraphs: [
      'React development often feels ecosystem-driven. Teams choose surrounding tools for routing, data fetching, form handling, build setup, and state architecture, or adopt a higher-level React-based framework that provides more defaults.',
      'Angular development often feels more framework-integrated. The CLI, project conventions, generated structure, routing patterns, services, and framework capabilities reinforce a more unified workflow across teams and codebases.',
    ],
  },
  {
    id: 'core-scale',
    title: 'Scale and Team Coordination',
    paragraphs: [
      'React scales very well, but it scales through conventions that the team chooses and enforces. This can be a strength for expert teams that want fine control, and a weakness for teams that need more framework guidance to stay consistent.',
      'Angular often shines in organizations that care deeply about consistency across large teams. Its stronger conventions can reduce architecture drift, especially when many projects or many engineers must align on the same application shape.',
    ],
  },
  {
    id: 'core-learning',
    title: 'Learning Curve and Adoption Pattern',
    paragraphs: [
      'React can feel easier to start because the core rendering model is relatively approachable and incremental. But large-scale React architecture still requires many surrounding decisions, and those decisions carry real complexity as applications grow.',
      'Angular can feel heavier at the beginning because the framework exposes more concepts earlier: components, templates, dependency injection, routing, forms, services, and framework conventions. That initial cost can pay off later when the team benefits from a more consistent built-in model.',
    ],
  },
  {
    id: 'core-enterprise',
    title: 'Enterprise and Product Fit',
    paragraphs: [
      'React is common across startup products, design systems, dashboards, content applications, consumer interfaces, and highly customized frontend stacks. Its flexibility makes it attractive almost everywhere.',
      'Angular is common in large internal applications, enterprise systems, regulated environments, and codebases where predictable structure, long-lived conventions, and strong framework ownership are especially valuable.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward React if the team wants flexibility, a component-library-first model, and freedom to choose surrounding tools or higher-level frameworks.',
      'Lean toward Angular if the team wants stronger integrated structure, official framework solutions for core app concerns, and architectural consistency across larger teams.',
      'If the main challenge is coordinating a large app with shared conventions, Angular often gains ground. If the main advantage is flexibility and broad ecosystem leverage, React often gains ground.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-component',
    title: 'Basic Component Shape',
    description:
      'The component model already shows the philosophical difference: React centers functional components, while Angular centers decorated component classes and templates.',
    snippets: [
      {
        label: 'React',
        code: `export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Count: {count}
    </button>
  )
}`,
      },
      {
        label: 'Angular',
        code: `@Component({
  selector: 'app-counter',
  template: \`
    <button (click)="increment()">
      Count: {{ count }}
    </button>
  \`,
})
export class CounterComponent {
  count = 0

  increment() {
    this.count += 1
  }
}`,
      },
    ],
    takeaway:
      'React keeps rendering logic in component functions. Angular separates class behavior and template structure within the framework component model.',
  },
  {
    id: 'examples-state',
    title: 'Reactivity and State Update',
    description:
      'Modern React expresses local reactivity through hooks. Modern Angular can express it through signals while still supporting other framework-level reactive approaches.',
    snippets: [
      {
        label: 'React',
        code: `function SearchBox() {
  const [query, setQuery] = useState('')

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}`,
      },
      {
        label: 'Angular',
        code: `@Component({
  template: \`
    <input [value]="query()" (input)="query.set($any($event.target).value)" />
  \`,
})
export class SearchBoxComponent {
  query = signal('')
}`,
      },
    ],
    takeaway:
      'Both can express reactive UI updates clearly, but the framework semantics around them are different.',
  },
  {
    id: 'examples-architecture',
    title: 'Architectural Prompt',
    description:
      'A short rule of thumb helps keep the decision focused on framework scope rather than community fashion.',
    snippets: [
      {
        label: 'React Rule',
        code: `If the team wants a UI library,
flexible surrounding architecture,
and broad ecosystem composition:
  choose React`,
      },
      {
        label: 'Angular Rule',
        code: `If the team wants a full framework,
strong conventions,
and more built-in application structure:
  choose Angular`,
      },
    ],
    takeaway:
      'The better choice usually follows how much framework structure the team wants the technology to provide.',
  },
  {
    id: 'examples-team',
    title: 'Team Fit Prompt',
    description: 'The organizational question is often more decisive than the syntax question.',
    snippets: [
      {
        label: 'Ask This First',
        code: `Do we want to assemble our app architecture
from a component library plus chosen tools,
or adopt a framework with official patterns
for many application concerns?`,
      },
      {
        label: 'Ask This Second',
        code: `Do we optimize for flexibility and ecosystem range,
or for stronger built-in consistency
across many engineers and many projects?`,
      },
    ],
    takeaway:
      'This comparison becomes much clearer once the team decides whether freedom or integrated structure is the higher-value default.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'JSX',
    definition:
      'A JavaScript or TypeScript syntax extension commonly used in React to describe UI structure inside component code.',
  },
  {
    term: 'Hook',
    definition:
      'A React function such as useState or useEffect that lets function components access React features.',
  },
  {
    term: 'Signal',
    definition:
      'An Angular reactive primitive that tracks where state is read and updates consumers when it changes.',
  },
  {
    term: 'Dependency Injection',
    definition:
      'A pattern, central in Angular, for supplying services and dependencies to application code through framework-managed injection.',
  },
  {
    term: 'Standalone Component',
    definition:
      'A modern Angular component style that can be imported directly without requiring NgModule-based structure for new code.',
  },
  {
    term: 'NgModule',
    definition:
      'An older Angular organizational mechanism that the Angular team now recommends avoiding for new code in favor of standalone components.',
  },
  {
    term: 'Context',
    definition:
      'A React feature for passing data through the component tree without manual prop drilling.',
  },
  {
    term: 'Template Binding',
    definition: 'Angular syntax that connects component data and logic to HTML templates.',
  },
  {
    term: 'Controlled Input',
    definition: 'A React form pattern where input state is driven directly from component state.',
  },
  {
    term: 'RxJS',
    definition:
      'A reactive programming library historically important in Angular applications for observable-based flows.',
  },
  {
    term: 'Component Tree',
    definition: 'The hierarchy of UI components that make up an application interface.',
  },
  {
    term: 'Convention',
    definition:
      'A recommended structural pattern that teams use to keep architecture predictable across projects.',
  },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: examples.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function Counter(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'React vs Angular',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="React vs Angular"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">React vs Angular</h1>
      <p className="react-angular-help-doc-subtitle">
        Manual-style comparison of framework scope, state model, ecosystem shape, and long-term
        front-end tradeoffs.
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
        coreConceptSections.map((section) => (
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
