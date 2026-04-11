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
      'Angular is a full front-end framework for building large web applications with TypeScript, components, dependency injection, routing, forms, HTTP tooling, testing support, and a coordinated CLI and build workflow. It aims to give teams an integrated application platform rather than only a rendering library.',
      'In practice, Angular is used for enterprise dashboards, internal tools, complex line-of-business software, consumer-facing apps, admin panels, and products where a strong architectural framework and long-term consistency matter.',
      "This reference covers Angular's mental model, standalone APIs, templates, signals, dependency injection, routing, forms, SSR and hydration, use cases, tradeoffs, examples, and glossary terms.",
    ],
  },
  {
    id: 'bp-why-angular',
    title: 'Why Teams Reach For Angular',
    paragraphs: [
      'Angular matters because it offers a complete framework answer to many recurring application problems. Routing, HTTP, forms, dependency injection, testing patterns, SSR support, and build tooling all have a strong official home instead of being assembled from a large number of third-party defaults.',
      'That makes it especially attractive when a team values explicit structure, long-lived codebases, consistent architectural patterns, and a framework that expects serious application complexity rather than only small widgets.',
    ],
  },
  {
    id: 'bp-what-it-optimizes',
    title: 'What Angular Optimizes For',
    paragraphs: [
      'Angular optimizes for scalable application architecture, strong conventions, and predictable team workflows. It is not primarily trying to be the smallest or least opinionated UI tool. It is trying to help teams build and maintain substantial applications with a clear framework model.',
      'This affects everything from dependency injection and routing to project structure and template syntax. The framework prefers explicit architecture over minimal surface area.',
    ],
  },
  {
    id: 'bp-current-direction',
    title: 'Current Direction',
    paragraphs: [
      'Modern Angular discussion should include standalone APIs, signals, newer template control flow, SSR and hydration improvements, and newer bootstrapping patterns. Older NgModule-heavy guidance still matters in existing codebases, but current Angular is not frozen in its earlier architecture style.',
      "That distinction is important because many engineers still picture Angular through much older tutorials. Today's Angular is more flexible than that older reputation suggests while still remaining a strongly structured framework.",
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Angular Fits Well',
    paragraphs: [
      'Angular is a strong fit for large teams, enterprise apps, internal systems, workflow-heavy interfaces, and products where code organization, testability, and official framework guidance are more important than having the smallest possible runtime abstraction.',
      'It also fits organizations that want one broad framework answer rather than a library-first stack assembled from many separate choices.',
    ],
  },
  {
    id: 'bp-where-it-needs-care',
    title: 'Where It Needs Care',
    paragraphs: [
      'Angular can be more framework than a small project needs. Teams building a tiny widget, a lightly interactive marketing page, or a very narrow embedded interface may find the broader framework model heavier than necessary.',
      'It also asks developers to learn several framework concepts well: templates, DI, signals or RxJS patterns, router configuration, providers, and project structure. That investment can pay off in larger systems, but it is still an investment.',
    ],
  },
  {
    id: 'bp-common-misreadings',
    title: 'Common Misreadings',
    paragraphs: [
      'A common mistake is to assume Angular is only an old NgModule-centric framework and ignore the modern standalone and signals-based direction. Another is to reduce Angular to a reputation for verbosity without acknowledging what that structure buys in large codebases.',
      'A second mistake is to compare Angular only at the component syntax level. Its real value is the integrated application architecture around those components.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Angular centers on components, templates, dependency injection, routing, forms, and a full application framework model.',
      'Its main strengths are strong architecture, official solutions for common app concerns, and consistency for larger teams.',
      'Its main tradeoffs are framework complexity, higher conceptual overhead than lighter libraries, and a development style that is more opinionated than ecosystem-first alternatives.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Angular asks developers to think in terms of an application framework, not just isolated UI components. Components, templates, services, injectors, routes, forms, and framework-managed rendering all participate in one larger architecture model.',
      'This means Angular is usually best understood from the top down. The value is not only how a single component renders, but how the framework organizes whole applications.',
    ],
  },
  {
    id: 'core-components',
    title: 'Components and Templates',
    paragraphs: [
      'Angular components are TypeScript classes paired with template markup. The template declares how the UI should render, while the class exposes data and behavior. This separation gives Angular a clear boundary between rendering structure and component logic.',
      'Many teams find this model easier to scale because templates remain visibly template-like while logic stays in typed class code rather than being interwoven in a single render function.',
    ],
  },
  {
    id: 'core-standalone',
    title: 'Standalone APIs',
    paragraphs: [
      'Modern Angular emphasizes standalone components and standalone bootstrapping. A project can use `bootstrapApplication` and configure providers directly without centering the app around a root NgModule.',
      "This matters because it simplifies some of the historical framework ceremony while keeping Angular's architecture model intact. Existing NgModule-based codebases still matter, but standalone is a major part of the current direction.",
    ],
  },
  {
    id: 'core-templates',
    title: 'Template Syntax and Control Flow',
    paragraphs: [
      'Angular templates use property binding, event binding, interpolation, structural control flow, pipes, and directives. Newer Angular also includes modern control flow syntax such as `@if`, `@for`, and `@switch`, which makes some template logic more direct than older star-prefixed structural syntax alone.',
      "This template system is one of Angular's defining characteristics. It is powerful, explicit, and tightly integrated with the framework compiler and type checking.",
    ],
  },
  {
    id: 'core-di',
    title: 'Dependency Injection',
    paragraphs: [
      "Dependency injection is central to Angular. Services and other injectable resources are provided through Angular's injector system, letting components and other classes obtain dependencies without manually constructing everything themselves.",
      'This is a major architectural strength in larger applications. Shared capabilities such as API clients, auth logic, feature configuration, and stateful services can be managed in a structured and testable way.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing',
    paragraphs: [
      'Angular provides an official router with nested routes, guards, lazy loading, route-level providers, and rendering strategies. This keeps navigation and application structure under one framework roof instead of relying on loosely connected router libraries.',
      'In large applications, that matters a great deal because route hierarchy often becomes one of the main organizational tools for features, permissions, and loading behavior.',
    ],
  },
  {
    id: 'core-signals',
    title: 'Signals and Reactivity',
    paragraphs: [
      'Angular now includes signals as part of its reactive model. Signals provide a framework-native way to represent local reactive values and derived computations, reducing some reliance on manual change orchestration for everyday UI state.',
      "Signals do not erase the rest of Angular's ecosystem, and RxJS still remains important. The practical question is where signals are the clearest fit and where observable streams remain the better abstraction.",
    ],
  },
  {
    id: 'core-rxjs',
    title: 'RxJS and Streams',
    paragraphs: [
      'Angular has a long connection to RxJS, especially for async flows, HTTP handling, router streams, and reactive programming patterns. Many existing Angular applications rely heavily on observables and operators for data flow and side effects.',
      'The modern Angular landscape therefore includes both signals and RxJS. Teams should be deliberate about when a simple signal is enough and when a stream-based abstraction is the right tool.',
    ],
  },
  {
    id: 'core-forms',
    title: 'Forms',
    paragraphs: [
      'Angular has strong official form support through template-driven forms and reactive forms. For simple cases, template-driven approaches can be enough. For complex workflows, validation, and dynamic form models, reactive forms are often preferred.',
      "This is one of Angular's strongest practical areas. Forms are not left as an ecosystem afterthought; they are part of the framework identity.",
    ],
  },
  {
    id: 'core-http',
    title: 'HTTP and Data Access',
    paragraphs: [
      "Angular includes official HTTP tooling that fits into the framework's DI and interceptor model. This gives teams a structured way to handle requests, headers, auth, error behavior, and shared network policy.",
      'The result is that transport-level concerns can be centralized more cleanly than in ad hoc fetch wrappers spread across many components.',
    ],
  },
] as const

const coreConceptSectionsContinued: readonly DocSection[] = [
  {
    id: 'core-providers',
    title: 'Providers and App Configuration',
    paragraphs: [
      'Modern Angular applications often use application-level provider configuration to register router setup, HTTP behavior, animations, and other shared framework services during bootstrap. This gives the app a clear and centralized configuration story.',
      'That matters because Angular is not just about local components. Much of its value comes from the way shared framework behavior can be wired once and then consumed predictably across the application.',
    ],
  },
  {
    id: 'core-change-detection',
    title: 'Change Detection and Rendering',
    paragraphs: [
      "Angular renders templates based on component state and framework-managed change detection. Signals provide a more modern reactive path for many UI updates, but the broader rendering story still includes Angular's template compiler and component update model.",
      'The practical takeaway is that performance depends on understanding both architecture and the framework update model, not only on memorizing a few isolated optimization tricks.',
    ],
  },
  {
    id: 'core-directives-pipes',
    title: 'Directives and Pipes',
    paragraphs: [
      'Angular uses directives to extend template behavior and pipes to transform values for display. This gives teams an official way to package common template-level logic without repeating it throughout markup.',
      'In large codebases, directives and pipes can be an important maintainability tool because they help keep template concerns explicit and reusable.',
    ],
  },
  {
    id: 'core-lazy-loading',
    title: 'Lazy Loading and Feature Boundaries',
    paragraphs: [
      'Angular supports route-level lazy loading and feature separation so applications can defer work until it is actually needed. This helps keep large apps modular and improves startup behavior when routes are split thoughtfully.',
      'This is especially valuable in enterprise-scale systems, where route hierarchy often maps directly to teams, product areas, and ownership boundaries.',
    ],
  },
  {
    id: 'core-ssr',
    title: 'SSR, SSG, and Hydration',
    paragraphs: [
      'Angular supports server-side rendering, static prerendering, and hydration for applications that need better startup behavior, SEO, or route delivery performance. Modern Angular guidance treats SSR and hydration as part of the official platform rather than an afterthought.',
      "This matters because Angular is not only a client-side app framework. Teams can build routes that render on the server and then hydrate on the client while preserving the framework's broader architecture model.",
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Story',
    paragraphs: [
      'Angular has a strong official testing culture with utilities for component testing, dependency injection in tests, and application-level validation. This is part of its appeal in larger organizations where long-term maintainability matters as much as initial implementation speed.',
      'The framework encourages testing as part of the architecture rather than leaving it entirely to third-party convention.',
    ],
  },
  {
    id: 'core-cli-tooling',
    title: 'CLI and Tooling',
    paragraphs: [
      'Angular comes with a strong CLI and official project tooling for generating code, building, testing, and configuring projects. The developer experience is therefore shaped heavily by framework-supported commands and conventions.',
      'That helps teams standardize work across repos. It also means Angular projects often feel more uniform than library-first stacks where every team must choose its own tooling surface.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Use Cases',
    paragraphs: [
      'Angular is often used for enterprise portals, complex workflow systems, internal administrative interfaces, multi-team front-end platforms, and products with significant form, validation, or permission logic.',
      'It is also a fit when the engineering organization wants strong official guidance and a comprehensive framework rather than assembling a stack from many separate libraries.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Angular offers strong structure, but that structure comes with conceptual weight. New developers often need time to understand decorators, providers, DI, template syntax, routing configuration, forms, signals, and observable patterns together.',
      'Another tradeoff is that Angular can feel heavier than more focused view libraries for smaller products. The framework tends to pay off more clearly as application complexity and organizational scale increase.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and Contrast References',
    paragraphs: [
      'Angular is commonly compared with React for full framework integration versus library flexibility, with Vue for strong official architecture versus a lighter progressive framework, and with Next.js or Nuxt for how front-end frameworks differ from full-stack app platforms built around a rendering library.',
      'These comparisons help position Angular correctly: it is a batteries-included application framework with strong architectural opinions, not just another component syntax option.',
    ],
  },
] as const
const coreConceptSectionsMerged: readonly DocSection[] = [
  ...coreConceptSections,
  ...coreConceptSectionsContinued,
]

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-standalone',
    title: 'Standalone Bootstrap Example',
    description:
      'Modern Angular commonly starts with a standalone component and `bootstrapApplication` rather than a root NgModule.',
    snippets: [
      {
        label: 'main.ts',
        code: `import { bootstrapApplication } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'

import { AppComponent } from './app/app.component'
import { routes } from './app/app.routes'

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
})`,
      },
      {
        label: 'app.component.ts',
        code: `import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent {}`,
      },
    ],
    takeaway:
      'Standalone bootstrapping is one of the clearest signs of modern Angular direction. It keeps the app structure explicit while reducing some older ceremony.',
  },
  {
    id: 'examples-signals',
    title: 'Signals Component Example',
    description:
      'Signals provide a framework-native reactive model for local state and derived values inside Angular components.',
    snippets: [
      {
        label: 'counter.component.ts',
        code: `import { Component, computed, signal } from '@angular/core'

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <button (click)="count.update((value) => value + 1)">
      Count: {{ count() }}
    </button>
    <p>{{ parity() }}</p>
  \`,
})
export class CounterComponent {
  count = signal(0)
  parity = computed(() => (this.count() % 2 === 0 ? 'even' : 'odd'))
}`,
      },
    ],
    takeaway:
      'Signals let Angular express local reactivity more directly. They do not replace the rest of the framework, but they do modernize a large part of everyday UI state work.',
  },
  {
    id: 'examples-di',
    title: 'Service and Dependency Injection Example',
    description:
      "Dependency injection is one of Angular's core strengths. Services can be injected into components without manual object wiring in every consumer.",
    snippets: [
      {
        label: 'user.service.ts',
        code: `import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class UserService {
  getCurrentUser() {
    return { id: 1, name: 'Amina' }
  }
}`,
      },
      {
        label: 'profile.component.ts',
        code: `import { Component, inject } from '@angular/core'
import { UserService } from './user.service'

@Component({
  selector: 'app-profile',
  standalone: true,
  template: '<p>User: {{ user.name }}</p>',
})
export class ProfileComponent {
  private userService = inject(UserService)
  user = this.userService.getCurrentUser()
}`,
      },
    ],
    takeaway:
      'Angular DI is not incidental plumbing. It is part of how the framework organizes shared capabilities in a scalable way.',
  },
  {
    id: 'examples-routing',
    title: 'Router Configuration Example',
    description:
      'Angular routing is configured as part of the application platform rather than left to a third-party default.',
    snippets: [
      {
        label: 'app.routes.ts',
        code: `import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./reports.component').then((m) => m.ReportsComponent),
  },
]`,
      },
    ],
    takeaway:
      'The router is a first-class Angular feature, which helps large applications keep navigation and feature boundaries under one official model.',
  },
  {
    id: 'examples-forms',
    title: 'Reactive Form Example',
    description:
      "Reactive forms are one of Angular's strongest built-in capabilities for complex validation and form workflow control.",
    snippets: [
      {
        label: 'newsletter.component.ts',
        code: `import { Component } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <input [formControl]="email" type="email" />
    <p>{{ email.valid ? 'valid' : 'invalid' }}</p>
  \`,
})
export class NewsletterComponent {
  email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  })
}`,
      },
    ],
    takeaway:
      'Angular forms are built into the framework story. That is a major advantage for applications with serious validation and workflow complexity.',
  },
  {
    id: 'examples-architecture',
    title: 'Architecture Snapshot',
    description:
      'A typical Angular application uses the framework as the central architecture layer rather than treating it like only a view library.',
    snippets: [
      {
        label: 'Common Stack',
        code: `Angular components and templates for UI
Standalone bootstrap and providers for app configuration
Router for navigation and lazy loading
Services and DI for shared capabilities
Reactive forms and HTTP client for workflow-heavy applications
Signals and RxJS used where each fits best`,
      },
    ],
    takeaway:
      'Angular works best when the team embraces it as a complete application framework, not when it is treated like a thin rendering layer.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Angular',
    definition:
      'A full front-end framework for building web applications with components, templates, routing, forms, DI, and official tooling.',
  },
  {
    term: 'Standalone component',
    definition:
      'A modern Angular component that can be used without being declared inside an NgModule.',
  },
  {
    term: 'bootstrapApplication',
    definition: 'The Angular API used to start an application with standalone configuration.',
  },
  {
    term: 'Dependency injection',
    definition:
      "Angular's system for providing and consuming shared services or resources through an injector.",
  },
  {
    term: 'Provider',
    definition:
      'An Angular registration that tells the injector how to create or supply a dependency.',
  },
  {
    term: 'Signal',
    definition:
      'A reactive Angular value that can be read, updated, and used for derived computations.',
  },
  {
    term: 'computed',
    definition: 'An Angular signals API for deriving a reactive value from other signals.',
  },
  {
    term: 'RxJS',
    definition:
      'A reactive programming library heavily used in Angular for observable streams, async flows, and many existing application patterns.',
  },
  {
    term: 'Reactive forms',
    definition:
      "Angular's form model centered on explicit form controls, validation, and programmatic form state management.",
  },
  {
    term: 'Template-driven forms',
    definition:
      'Angular forms built primarily through template directives and bindings rather than explicit form model classes.',
  },
  {
    term: 'Directive',
    definition:
      'An Angular feature that extends template behavior or DOM behavior without always requiring a new component.',
  },
  {
    term: 'Pipe',
    definition: 'An Angular template transform used to format or adapt values for display.',
  },
  {
    term: 'Router',
    definition:
      "Angular's official navigation system for routes, lazy loading, guards, and route hierarchy.",
  },
  {
    term: 'Interceptor',
    definition:
      'Angular HTTP middleware used to observe or modify requests and responses centrally.',
  },
  {
    term: 'Hydration',
    definition:
      'The client-side activation step after server-rendered Angular markup is delivered to the browser.',
  },
  {
    term: 'NgModule',
    definition:
      'An older but still relevant Angular organizational construct that grouped declarations, imports, and providers before standalone APIs became central.',
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

export default function AngularPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Angular',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Angular"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Angular</h1>
      <p className="angular-help-doc-subtitle">
        Manual-style reference covering overview, standalone APIs, templates, signals, dependency
        injection, routing, forms, SSR story, tradeoffs, and practical examples.
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
