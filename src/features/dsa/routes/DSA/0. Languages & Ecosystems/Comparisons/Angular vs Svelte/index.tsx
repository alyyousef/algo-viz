import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type DocSection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

type ExampleItem = {
  id: string
  title: string
  summary: string
  angularCode: string
  svelteCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'Angular vs Svelte'
const pageSubtitle =
  'Comparing a batteries-included application framework with a compiler-first UI framework.'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const bigPictureSections: DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Angular and Svelte solve similar frontend problems from very different starting assumptions. Angular is a full application framework with official answers for routing, dependency injection, forms, HTTP, testing support, and large-team structure. Svelte is a compiler-first UI framework that emphasizes small components, direct syntax, and minimal runtime overhead.',
      'A useful shorthand is this: Angular optimizes for structured application development at scale, while Svelte optimizes for authoring simplicity and lean runtime behavior. Neither goal is universally better. The right choice depends on team shape, application complexity, and how much framework opinion you want up front.',
      'The comparison is especially relevant because modern Angular has become more ergonomic through standalone components, signals, and improved control flow, while modern Svelte has become more explicit and scalable with Svelte 5 runes and the broader SvelteKit application model.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'Angular wants to give teams a coherent system. It assumes many applications benefit from convention, dependency injection, official packages, and explicit architecture. The framework carries more surface area because it is trying to answer more questions directly.',
      'Svelte wants component authoring to feel close to HTML, CSS, and JavaScript while letting the compiler do the hard optimization work. The framework aims to reduce conceptual and runtime weight instead of expanding into a full platform by itself.',
      'That difference shows up everywhere: Angular tends to feel more framework-shaped and enterprise-ready by default, while Svelte tends to feel lighter, faster to read, and less ceremonious for small to medium user interfaces.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'Angular is strongest for large internal tools, long-lived enterprise applications, teams that want strong structure, and systems where consistency across many contributors matters more than minimal ceremony in any one file.',
      'Svelte is strongest for teams that want concise components, very readable templates, fast iteration, lightweight shipped code, and a UI model that stays close to standard web languages. It is especially attractive for smaller teams and products that value low authoring friction.',
      'If the core question is which one gives me a more complete official application framework, Angular usually wins. If the core question is which one lets me write less code and ship a smaller runtime model, Svelte usually wins.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose Angular when team consistency, explicit architecture, DI, and official framework coverage matter most.',
      'Choose Svelte when simplicity, concise components, compiler-driven optimization, and low runtime overhead matter most.',
      'Choose Angular when the app behaves like a large product platform maintained by many people over time.',
      'Choose Svelte when a small team wants fast iteration and components that read close to native web code.',
      'If routing, SSR, and full-stack conventions matter in Svelte, think in terms of Svelte plus SvelteKit rather than Svelte alone.',
    ],
  },
]

const mentalModels = [
  {
    title: 'Angular is a framework system',
    detail:
      'Angular applications are built around components, dependency injection, template syntax, services, routing, forms, signals, and official platform packages that are meant to work together as one model.',
  },
  {
    title: 'Svelte is a compiler-centered authoring model',
    detail:
      'Svelte components are compiled so the framework can do more work ahead of time and ship less generic runtime machinery to the browser.',
  },
  {
    title: 'Angular favors explicit structure',
    detail:
      'Large codebases often benefit from Angular because the framework nudges teams toward repeatable patterns and strongly separated concerns.',
  },
  {
    title: 'Svelte favors directness',
    detail:
      'A Svelte component often reads closer to plain web code, which makes simple and medium-complexity UI work feel unusually compact.',
  },
  {
    title: 'Modern Angular is less ceremony-heavy than older Angular',
    detail:
      'Standalone components, signals, and built-in control flow have reduced some of the older friction points without changing Angulars structured identity.',
  },
  {
    title: 'Modern Svelte is more explicit about reactivity than older Svelte',
    detail:
      'Svelte 5 runes make reactive state and derived values more deliberate, which helps scale larger applications without losing Sveltes compact feel.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-architecture',
    title: 'Overall Architecture Model',
    paragraphs: [
      'Angular is a full application framework. Core architectural concepts include components, dependency injection, services, signals, routing, forms, and template-driven composition. This gives teams an official language for how applications should be structured.',
      'Svelte by itself is primarily a component framework with a compiler-driven model. For broader application concerns such as routing, data loading, form actions, and SSR, the practical comparison is usually Angular versus SvelteKit rather than Angular versus raw Svelte alone.',
      'That distinction matters. Angular brings more application decisions into the framework core, while Svelte keeps the component layer lean and lets SvelteKit supply the stronger application shell when needed.',
    ],
  },
  {
    id: 'core-reactivity',
    title: 'Reactivity Model',
    paragraphs: [
      'Angular now uses signals as a core reactive primitive alongside the broader framework model. Signals, computed values, and effects give Angular a more direct state story than older change-detection mental models alone.',
      'Svelte 5 uses runes such as $state, $derived, and $effect to express reactive state directly in component code. Because Svelte is compiler-driven, reactive declarations often feel more embedded in ordinary JavaScript authoring rather than wrapped in a large runtime abstraction.',
      'In practice, Svelte usually feels simpler for local component state, while Angular often feels more deliberate and scalable when state must interact with framework services, DI boundaries, and larger application structure.',
    ],
  },
  {
    id: 'core-templates',
    title: 'Template and Control Flow Experience',
    paragraphs: [
      'Angular templates are HTML-like but use Angular-specific bindings, event syntax, and built-in control flow such as @if, @for, and @switch. The language is expressive, but it is still clearly a framework template language.',
      'Svelte component files mix markup, script, and style in a compact single-file format. Template syntax tends to feel lighter because Svelte tries to stay visually close to normal HTML while adding just enough structure for reactive UI authoring.',
      'Teams that prefer explicit framework syntax often like Angular because it makes template intent very clear. Teams that want the template to feel closer to native web authoring usually prefer Svelte.',
    ],
  },
  {
    id: 'core-state',
    title: 'State Management Across the App',
    paragraphs: [
      'Angular can manage state with signals, services, RxJS-based patterns, and ecosystem state libraries when needed. The frameworks DI model makes shared application state and shared infrastructure concerns straightforward to organize explicitly.',
      'Svelte handles local state elegantly inside components and can share state through runes, context, and stores. The official docs now frame stores as useful when extracting shared reactive values, especially asynchronous or cross-component state.',
      'The difference is not that one can do app state and the other cannot. The difference is that Angular gives large-state organization more framework scaffolding, while Svelte keeps the primitive model smaller and asks the team to stay disciplined as complexity grows.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing, Data Loading, and Full-Stack Model',
    paragraphs: [
      'Angular includes official routing as part of the core framework story. Lazy loading, guards, nested routes, and application-level navigation patterns are part of the native Angular mental model.',
      'Svelte alone does not define application routing. SvelteKit is the official answer for file-based routing, server and client data loading, form actions, and the broader application model around Svelte components.',
      'This is one of the biggest practical differences. Angular is one framework with an integrated app story. Svelte reaches its strongest application form through the Svelte plus SvelteKit combination.',
    ],
  },
  {
    id: 'core-ssr',
    title: 'SSR, Hydration, and Rendering Flexibility',
    paragraphs: [
      'Angular supports SSR and hydration as part of the official platform model, which is useful when an Angular application needs better initial rendering and SEO without abandoning the framework structure.',
      'SvelteKit has a very strong SSR story because server rendering, load functions, form actions, and route-level rendering decisions are built into the application framework. For many teams, this makes SvelteKit feel especially natural for content-heavy or performance-sensitive web apps.',
      'If SSR and route-level data behavior are central concerns, SvelteKit often feels more direct. If SSR is important but the team also wants a highly structured framework system, Angular remains a strong option.',
    ],
  },
  {
    id: 'core-forms',
    title: 'Forms and User Input Workflows',
    paragraphs: [
      'Angular has one of the most mature official forms stories in frontend frameworks. Template-driven forms and reactive forms give teams explicit tools for validation, control state, and structured form models.',
      'Svelte forms are lighter by default. For simple forms this is often an advantage because less framework machinery is needed. For larger workflows, SvelteKit form actions provide a powerful official path for request handling and progressive enhancement.',
      'Angular usually wins when the comparison centers on very large, validation-heavy enterprise forms. Svelte often wins when the goal is to keep ordinary forms easy and readable without a large abstraction layer.',
    ],
  },
  {
    id: 'core-typescript',
    title: 'TypeScript and Tooling Experience',
    paragraphs: [
      'Angular is deeply TypeScript-oriented and has long treated TypeScript as part of its normal development model. The framework often feels best when teams are comfortable with decorators, strong typing, and explicit application structure.',
      'Svelte also supports TypeScript well, but the experience feels lighter because the component model is smaller and the authoring style is closer to direct script-plus-markup work. SvelteKit and the Svelte language tools provide the broader developer experience around that.',
      'In practice, Angular tends to feel more explicitly TypeScript-first, while Svelte tends to feel more language-flexible and compact even when TypeScript is enabled.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing and Large-Team Maintainability',
    paragraphs: [
      'Angulars structure can help testing and team maintainability because services, DI boundaries, and routed features often separate concerns in a predictable way. The framework gives teams a clearer map for where logic belongs.',
      'Svelte components are easy to read and often easy to test because there is less scaffolding around the UI. But once a Svelte application grows large, maintainability depends more heavily on team discipline because the framework imposes fewer architectural boundaries by default.',
      'This is a core tradeoff. Angular spends more up front to make large-team work predictable. Svelte spends less up front and asks the team to decide how much structure to add as the product grows.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Runtime Cost',
    paragraphs: [
      'Svelte is famous for its compiler-driven performance profile because it can compile components into targeted DOM updates and keep the shipped runtime model very lean. This often leads to small bundles and excellent perceived performance for many applications.',
      'Angular has improved substantially, and modern Angular can perform very well, especially in well-architected applications. But it still carries a broader framework runtime and more application machinery than Svelte because it is doing more as a framework.',
      'If the comparison is strictly about minimal runtime overhead and concise emitted code, Svelte usually has the edge. If the comparison is about performance inside a large, structured application with rich framework features, Angular can still be a very strong performer when used well.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem, Hiring, and Longevity Considerations',
    paragraphs: [
      'Angular benefits from a long enterprise history, strong official stewardship, and a large pool of developers familiar with its patterns. That matters when teams care about hiring, onboarding, and standardized practices across many applications.',
      'Svelte has a smaller ecosystem footprint but a very strong developer-experience reputation. It is often loved by teams that prioritize clarity, speed of iteration, and modern web ergonomics over broad enterprise convention.',
      'The practical tradeoff is that Angular often feels lower risk organizationally, while Svelte often feels higher leverage ergonomically. Which matters more depends on whether the bigger constraint is org scale or developer friction.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'Angular can feel heavy for smaller products. Teams sometimes over-architect simple applications because the framework makes large-system structure available immediately. The result can be more ceremony than the product truly needs.',
      'Svelte can feel almost too easy in the early stages, which creates a different risk: a product may scale in features faster than its architecture scales in discipline. Without clear conventions, a once-simple Svelte codebase can become uneven over time.',
      'So the real comparison is not heavy versus light in the abstract. It is structured upfront cost versus lightweight upfront cost, and which trade is safer for the specific team and product.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose Angular when you want a comprehensive official framework model for large apps.',
      'Choose Svelte when component simplicity and low runtime overhead are primary goals.',
      'Prefer Angular when enterprise forms, DI, and organization-wide consistency are central requirements.',
      'Prefer Svelte when a small team wants fast iteration and components that read close to native web code.',
      'Think in terms of Svelte plus SvelteKit when routing, SSR, and server-client workflows matter.',
      'If the app is already becoming platform-like, Angular usually scales organizationally more predictably.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-counter',
    title: 'Reactive Counter',
    summary:
      'Both frameworks can express a simple counter cleanly, but the mental model looks different.',
    angularCode: `import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \
    '<button (click)="count.update(v => v + 1)">Clicked {{ count() }} times</button>\n' +
    '<p *ngIf="isEven()">Count is even</p>'
})
export class CounterComponent {
  count = signal(0);
  isEven = computed(() => this.count() % 2 === 0);
}`,
    svelteCode: `<script lang="ts">
  let count = $state(0);
  let isEven = $derived(count % 2 === 0);
</script>

<button on:click={() => count += 1}>
  Clicked {count} times
</button>

{#if isEven}
  <p>Count is even</p>
{/if}`,
    explanation:
      'Angular expresses reactivity inside its component framework model, while Svelte keeps the code very close to direct component scripting. Both are clear, but Svelte is usually terser.',
  },
  {
    id: 'ex-fetch',
    title: 'Data Loading Shape',
    summary:
      'The Angular pattern usually lives inside component or service structure. The SvelteKit pattern usually lives at the route level.',
    angularCode: `import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  template: '<li *ngFor="let user of users">{{ user.name }}</li>'
})
export class UsersComponent {
  private http = inject(HttpClient);
  users: Array<{ name: string }> = [];

  ngOnInit() {
    this.http.get<Array<{ name: string }>>('/api/users')
      .subscribe(data => this.users = data);
  }
}`,
    svelteCode: `// +page.ts
export async function load({ fetch }) {
  const res = await fetch('/api/users');
  return { users: await res.json() };
}

<!-- +page.svelte -->
<script lang="ts">
  let { data } = $props();
</script>

{#each data.users as user}
  <li>{user.name}</li>
{/each}`,
    explanation:
      'Angular keeps the request inside the application framework and component lifecycle. SvelteKit makes route-level loading a first-class part of the framework, which often feels more direct for page data.',
  },
  {
    id: 'ex-form',
    title: 'Form Workflow',
    summary:
      'Angular has a larger official form system. SvelteKit keeps the server interaction path especially direct.',
    angularCode: `form = new FormGroup({
  email: new FormControl('', { nonNullable: true }),
  password: new FormControl('', { nonNullable: true })
});

submit() {
  if (this.form.valid) {
    this.auth.login(this.form.getRawValue());
  }
}`,
    svelteCode: `<!-- +page.svelte -->
<form method="POST">
  <input name="email" type="email" />
  <input name="password" type="password" />
  <button>Sign in</button>
</form>

// +page.server.ts
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    // validate and authenticate
  }
};`,
    explanation:
      'Angular is stronger when the form itself is the big abstraction. SvelteKit is very compelling when the form is part of a broader web request workflow and progressive enhancement story.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'Standalone component',
    definition:
      'A modern Angular component model that reduces reliance on NgModule-based setup for many use cases.',
  },
  {
    term: 'Signal',
    definition:
      'An Angular reactive primitive representing a tracked value that can be read, computed from, and reacted to.',
  },
  {
    term: 'Dependency injection',
    definition:
      'Angulars built-in system for providing and consuming shared services and application dependencies.',
  },
  {
    term: 'Rune',
    definition:
      'A Svelte 5 reactive primitive such as $state, $derived, or $effect used to express state and reactivity explicitly.',
  },
  {
    term: 'SvelteKit',
    definition:
      'The official application framework around Svelte that provides routing, data loading, form actions, SSR, and deployment patterns.',
  },
  {
    term: 'Hydration',
    definition: 'The client-side process of attaching framework behavior to server-rendered HTML.',
  },
  {
    term: 'Reactive form',
    definition: 'Angulars explicit form model built around programmatic form state and validation.',
  },
  {
    term: 'Compiler-first framework',
    definition:
      'A framework that performs substantial optimization at build time so less generic runtime logic is shipped to the browser.',
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-philosophy', label: 'Philosophy Difference' },
    { id: 'bp-where', label: 'Where Each Fits' },
    { id: 'bp-quick-picks', label: 'Quick Decision Guide' },
  ],
  'core-concepts': [
    { id: 'core-mental', label: 'Mental Models' },
    { id: 'core-architecture', label: 'Architecture Model' },
    { id: 'core-reactivity', label: 'Reactivity' },
    { id: 'core-templates', label: 'Templates' },
    { id: 'core-state', label: 'App State' },
    { id: 'core-routing', label: 'Routing and Data' },
    { id: 'core-ssr', label: 'SSR and Hydration' },
    { id: 'core-forms', label: 'Forms' },
    { id: 'core-typescript', label: 'TypeScript and Tooling' },
    { id: 'core-testing', label: 'Testing and Scale' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-ecosystem', label: 'Ecosystem and Hiring' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Decision Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function AngularVsSveltePage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Angular Vs Svelte Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Angular Vs Svelte Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="angular-svelte-help-doc-subtitle">{pageSubtitle}</p>
      <p>
        This page compares Angular and Svelte as real engineering choices rather than as
        slogan-level framework brands. The goal is to make the tradeoffs explicit: architecture
        model, reactivity, template ergonomics, routing and SSR, forms, performance, large-team
        maintainability, and where each framework is the safer long-term fit.
      </p>

      {activeTab === 'big-picture' && (
        <>
          {bigPictureSections.map((section, index) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
            </section>
          ))}
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mental" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          {coreSections.map((section) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </>
      )}

      {activeTab === 'examples' && (
        <>
          {examples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>{example.summary}</p>
              <h3 className="bin98-subheading">Angular</h3>
              <div className="bin98-codebox">
                <code>{example.angularCode.trim()}</code>
              </div>
              <h3 className="bin98-subheading">Svelte</h3>
              <div className="bin98-codebox">
                <code>{example.svelteCode.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </section>
          ))}
        </>
      )}

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
