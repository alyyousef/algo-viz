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
  vueCode: string
  svelteCode: string
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
  'Vue.js and Svelte are often grouped together because both target modern component-based frontend development, both can build serious production interfaces, and both are widely perceived as more approachable than some heavier framework stacks. That surface similarity hides a real architectural difference. Vue is a progressive runtime framework with a rich official ecosystem and explicit reactive primitives. Svelte is a compiler-first framework that tries to eliminate framework ceremony and generic runtime work wherever possible.',
  'The comparison is not just about syntax preference. It is about what kind of abstraction the team wants to live with every day. Vue gives developers a very teachable framework vocabulary: components, refs, computed values, watchers, single-file components, router, state library, and a larger ecosystem that scales from small widgets to full applications. Svelte tries to make component authoring feel closer to ordinary HTML, CSS, and JavaScript while letting the compiler specialize updates ahead of time.',
  'This page is intentionally comprehensive. It covers mental models, reactivity, templates, styling, state sharing, routing, application-framework story, SSR, forms, TypeScript, performance, ecosystem depth, maintainability, team fit, migration considerations, examples, and the most common misconceptions teams bring into a Vue versus Svelte discussion.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Vue is a progressive JavaScript framework centered on declarative rendering and component composition. Teams can start with a single component on an existing page, scale into a single-page application, and then add official ecosystem tools such as Vue Router and Pinia as complexity grows. That progressive story is one of Vues defining strengths because it gives teams an adoption path instead of forcing a single all-or-nothing architecture upfront.',
      'Svelte is a component framework with a compiler-first model. Instead of centering the architecture around a large general runtime that interprets component work in the browser, Svelte shifts more intelligence into the build step. The result is that many components feel unusually small, direct, and close to the platform. For application-level concerns such as routing, SSR, form actions, and data loading, Svelte becomes most complete when paired with SvelteKit.',
      'Both frameworks can produce fast, maintainable user interfaces. The practical question is not whether either one is capable. It is whether the team values Vues explicit framework surface and larger ecosystem or Sveltes tighter component model and lower runtime ceremony.',
    ],
  },
  {
    id: 'bp-core-difference',
    title: 'The Core Difference',
    paragraphs: [
      'Vue is primarily a runtime framework with compiler assistance. It uses a template compiler and a rendering pipeline, but the runtime remains a central part of how components update and how the framework exposes its programming model. This makes Vues primitives explicit and stable: refs are refs, computed values are computed values, watchers are watchers, and the framework model is visible in source code.',
      'Svelte is more aggressive about compile-time transformation. The compiler can inspect component structure ahead of time and emit specialized update logic rather than relying on as much generic runtime machinery. That affects both performance characteristics and code feel. Svelte code often looks simpler because more framework work is hidden in compilation rather than expressed through a visible runtime abstraction.',
    ],
    bullets: [
      'Vue emphasizes a progressive framework runtime plus ecosystem.',
      'Svelte emphasizes compile-time specialization and low ceremony.',
      'Vue makes reactive primitives explicit and teachable.',
      'Svelte tries to make component code feel as direct as possible.',
    ],
  },
  {
    id: 'bp-what-they-share',
    title: 'What They Share',
    paragraphs: [
      'Both frameworks build UIs from components, support modern JavaScript and TypeScript workflows, allow local component state and derived state, and can power small widgets as well as larger applications. Both also support transitions, scoped styling patterns, reusable logic extraction, build tooling integration, and strong frontend developer ergonomics compared with older generations of framework design.',
      'This matters because many debates exaggerate the distance between them. The comparison is not one capable framework versus one toy framework. It is a choice between two good modern frontend approaches that optimize for different tradeoffs.',
    ],
    bullets: [
      'Both support component-based UI development.',
      'Both support TypeScript and modern tooling.',
      'Both can participate in SSR and larger application architectures.',
      'Both have good ergonomics for local state, templating, and composition.',
    ],
  },
  {
    id: 'bp-when-vue-fits',
    title: 'When Vue Is Usually the Better Fit',
    paragraphs: [
      'Vue is usually the better fit when the team wants a larger ecosystem, a very explicit programming model, and a framework that scales from progressive adoption to full applications without a major conceptual jump. It is particularly attractive for teams that want strong official answers for routing and state management but do not want the overall feel of a heavier batteries-included platform.',
      'Vue is also a safer choice when organizational concerns matter strongly. Hiring surface area, documentation depth, tutorials, long-term ecosystem stability, and the ability to onboard engineers through well-known abstractions all tend to favor Vue over Svelte.',
    ],
    bullets: [
      'Teams that want a mature ecosystem and broad community support.',
      'Projects that value explicit reactive primitives and framework vocabulary.',
      'Organizations that care about onboarding, hiring, and lower ecosystem risk.',
      'Codebases that benefit from layered adoption rather than one big architecture decision.',
    ],
  },
  {
    id: 'bp-when-svelte-fits',
    title: 'When Svelte Is Usually the Better Fit',
    paragraphs: [
      'Svelte is usually the better fit when the team wants component code to stay as small and direct as possible, values low runtime overhead, and prefers a framework that leans heavily on compile-time intelligence. It is especially attractive for teams that feel friction from framework ceremony and want more of the code they read to look like plain web code with targeted reactive extensions.',
      'Svelte also shines when a small or medium team can keep architectural discipline without needing a very large visible framework surface. In those contexts, the framework can feel unusually productive because the gap between idea and component implementation is so small.',
    ],
    bullets: [
      'Teams optimizing for minimal component ceremony.',
      'Projects where small bundles and lean runtime behavior matter strongly.',
      'Products maintained by teams comfortable making architecture decisions with less framework scaffolding.',
      'Developers who prefer compile-first directness over larger runtime abstractions.',
    ],
  },
  {
    id: 'bp-application-story',
    title: 'Application Story and Ecosystem Shape',
    paragraphs: [
      'A key practical point is that raw component comparison is only part of the story. Vue often grows into a full application through companion tools such as Vue Router, Pinia, and often Nuxt for SSR and application conventions. Svelte often grows into a full application through SvelteKit, which provides routing, layouts, data loading, and form actions as part of the official application model.',
      'That means many real-world decisions are not truly Vue versus Svelte in isolation. They are Vue plus ecosystem versus Svelte plus SvelteKit. The underlying component model still matters, but the app shell matters too.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'Vue and Svelte can both ship excellent user experiences. In production, architecture, code-splitting, state boundaries, data-fetching discipline, caching strategy, and UI design usually matter more than slogan-level benchmark arguments. Svelte often has an advantage in bundle shape and specialized updates, but a disciplined Vue application can still be fast and pleasant at scale.',
      'The right way to interpret this is soberly. Svelte may reduce some categories of overhead. Vue may reduce some categories of organizational risk. Production quality depends on how the framework is used, not just on what the framework advertises.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The cleanest decision rule is to ask what kind of complexity the team expects. If the challenge is organizational scale, ecosystem depth, explicit patterns, and broad onboarding, Vue is often the safer choice. If the challenge is keeping the component layer lean and the codebase low-friction, Svelte is often the more compelling choice.',
      'Another strong question is whether the team wants the framework to answer more questions for them or to disappear more aggressively from component code. Vue answers more questions explicitly. Svelte tries harder to get out of the way.',
    ],
    bullets: [
      'Prefer Vue when ecosystem maturity and explicit patterns matter most.',
      'Prefer Svelte when directness and compiler-driven simplicity matter most.',
      'Think about Nuxt and SvelteKit when routing, SSR, and application workflow are central.',
      'Do not decide from benchmark hype alone; decide from team shape and product constraints.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-is-vue',
    title: 'What Vue Actually Is',
    paragraphs: [
      'Official Vue documentation describes Vue as a framework that can scale from enhancing static HTML to powering a full single-page application. That phrase matters because progressive adoption is not marketing decoration; it is part of the framework design. Vue can be a light layer on an existing page, but it also has a mature path into routed applications, shared state, and SSR-oriented ecosystems.',
      'Modern Vue development is strongly associated with single-file components and the Composition API. The framework still supports the Options API, which remains important historically and is still used in some codebases, but most new architecture discussion in the ecosystem assumes Composition API patterns and script setup ergonomics.',
    ],
  },
  {
    id: 'core-what-is-svelte',
    title: 'What Svelte Actually Is',
    paragraphs: [
      'Official SvelteKit documentation describes SvelteKit as the framework for building apps with Svelte, while Svelte itself is the component framework. That distinction is crucial. Svelte alone is the component model. SvelteKit is the official answer for a broader application story including routing, server rendering, and data workflows.',
      'Modern Svelte also needs to be discussed in its current runes-based context rather than only through older store-first tutorials. Contemporary Svelte emphasizes explicit runes such as `$state`, `$derived`, and `$effect` for local reactivity, with stores still useful in some scenarios but no longer the center of every state discussion.',
    ],
  },
  {
    id: 'core-reactivity',
    title: 'Reactivity Model',
    paragraphs: [
      'Vue exposes reactivity through explicit primitives. `ref` creates tracked values, `reactive` wraps object-like state, `computed` models derived values, and watchers allow effects tied to reactive change. This explicitness is one of Vues strengths. It scales well because reactive intent is obvious in the code and the mental model is teachable to mixed-experience teams.',
      'Vue documentation also discusses the distinction between runtime reactivity and compile-time reactivity. Vue largely stays on the runtime side of that spectrum, which keeps the programming model explicit and avoids some of the semantic shifts that compile-time-only magic can create. The tradeoff is that more reactive machinery stays visible in source code.',
      'Svelte approaches reactivity more through compilation. Runes give Svelte a modern explicit vocabulary, but the overall feeling is still lighter because state changes and derivations stay very close to ordinary code. This often makes local component logic feel smaller and easier to scan. The cost is that teams must understand the Svelte-specific compile-time model rather than only a generic runtime abstraction.',
    ],
  },
  {
    id: 'core-rendering',
    title: 'Rendering Model and DOM Updates',
    paragraphs: [
      'Vue uses a rendering pipeline with compiler-informed virtual DOM behavior. The compiler can annotate templates so the runtime knows more about what changed and where it can skip work. This gives Vue much better practical performance than simplistic virtual-DOM stereotypes suggest, while preserving a flexible rendering model.',
      'Svelte compiles templates into more direct update code. Instead of carrying as much generic runtime machinery to interpret component changes at run time, the framework emits code specialized for the component. That often reduces runtime overhead and makes the framework attractive for teams that care strongly about shipped JavaScript volume and update efficiency.',
      'The correct engineering takeaway is not that one model is universally superior. Vue trades some runtime genericity for flexibility and explicit primitives. Svelte trades toward compile-time specialization and lower ceremony.',
    ],
  },
  {
    id: 'core-templates',
    title: 'Templates and Syntax Shape',
    paragraphs: [
      'Vue templates are declarative and directive-driven. `v-if`, `v-for`, `v-model`, dynamic bindings, event handlers, slots, and component directives form a clear template language that stays close to HTML while remaining recognizably framework-specific. For many teams this is a feature rather than a flaw because template intent becomes explicit and consistent.',
      'Svelte templates tend to look closer to plain markup with focused control-flow and binding syntax. Blocks such as `{#if}` and `{#each}` are compact, bindings are short, and event handlers sit directly in the markup. This often makes Svelte components feel less like a template DSL and more like ordinary web code with reactive extensions.',
      'The difference is largely ergonomic. Vue favors explicit framework grammar. Svelte favors minimal visual noise.',
    ],
  },
  {
    id: 'core-file-structure',
    title: 'Component File Structure and Styling',
    paragraphs: [
      'Vue single-file components keep template, script, and style in one file. This model is mature and very productive because it preserves conceptual locality without forcing every concern to live in separate files. Vue also supports scoped styles, CSS modules, and more general build-tool styling patterns.',
      'Svelte components also co-locate markup, script, and style, but the overall file often feels even smaller because the component syntax is terse. Styling is component-scoped by default, which gives teams a strong out-of-the-box story for local CSS isolation without much extra ceremony.',
      'Both frameworks are strong here. Vue usually feels slightly more framework-structured. Svelte usually feels slightly more lightweight.',
    ],
  },
  {
    id: 'core-code-reuse',
    title: 'Logic Reuse and Composition',
    paragraphs: [
      'Vue encourages reusable logic through composables. A composable is usually just a function that uses reactive primitives and returns state plus behavior. This pattern is simple, powerful, and one of the reasons Vue scales well architecturally. Teams can extract logic into normal modules without losing the benefits of the reactive system.',
      'Svelte can also extract reusable logic into ordinary modules and, in modern code, into rune-aware `.svelte.ts` or `.svelte.js` helpers when needed. Svelte does not push one single branded reuse abstraction in exactly the same way Vue does, which can feel freeing or slightly under-scaffolded depending on the team.',
      'Vue tends to feel more standardized around reusable logic patterns. Svelte tends to feel more minimal and flexible.',
    ],
  },
  {
    id: 'core-shared-state',
    title: 'Shared State and Stores',
    paragraphs: [
      'Vue has an especially clear story for shared state. Small-scale sharing can happen through props, emits, provide or inject, and composables. Larger app-level shared state often uses Pinia, which is the official state management library and fits naturally into the ecosystem. This makes the escalation path from local state to app state very understandable.',
      'Svelte historically leaned heavily on stores for shared state, but the official documentation now frames stores more narrowly in the runes era. Stores remain useful for asynchronous streams, manual control, and cases where the store contract itself is the right abstraction, but many situations that once defaulted to stores can now be handled more directly with runes and module-level logic.',
      'This is an important version-sensitive distinction. Older Svelte advice often overstates the centrality of stores. Modern Svelte encourages a smaller and more direct reactive layer first.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and Navigation',
    paragraphs: [
      'Vue Router is a mature official companion to Vue and covers nested routing, route params, guards, history modes, and common application navigation patterns. For many teams, that makes Vues app-level routing feel almost native even though it is technically a separate package.',
      'Svelte itself does not define a raw routing layer in the same way because SvelteKit is the official path for that concern. SvelteKit gives the ecosystem a very strong routing and layout story, but it also means that the practical comparison shifts from component framework alone to framework plus application shell.',
      'The practical implication is straightforward: Vue assembles a full app through strong official companion tools. Svelte reaches its strongest application form through SvelteKit.',
    ],
  },
  {
    id: 'core-data-loading',
    title: 'Data Loading and Request Workflow',
    paragraphs: [
      'In plain Vue, data loading often happens inside component lifecycle or composable logic, then becomes more framework-shaped when teams adopt a surrounding application framework such as Nuxt. That means Vues raw component model is intentionally flexible, but also somewhat less opinionated about route-level data flow than SvelteKit.',
      'SvelteKit gives data loading a first-class route-level shape through `load` functions. That can make page data flow feel especially direct because data fetching, route resolution, and rendered props are part of one framework story rather than conventions assembled by the team.',
      'Neither approach is inherently better. Vue gives more composition freedom in the base framework. SvelteKit gives a stronger integrated app workflow sooner.',
    ],
  },
  {
    id: 'core-forms',
    title: 'Forms, Mutations, and User Input',
    paragraphs: [
      'Vue is excellent for local form state. `v-model` is one of the most successful pieces of framework ergonomics in frontend development because it makes common binding flows concise without hiding what is happening. Form-heavy interfaces often feel very natural in Vue components.',
      'Svelte is equally compelling for local forms because `bind:value` and direct component state are lightweight. Where Svelte becomes especially distinctive is at the application level through SvelteKit form actions, which make request-response form workflows feel integrated rather than bolted on.',
      'For local client-side forms, both frameworks are strong. For server-aware form workflows, the comparison often becomes Vue ecosystem conventions versus SvelteKit’s more built-in path.',
    ],
  },
  {
    id: 'core-ssr',
    title: 'SSR, Hydration, and Rendering Strategy',
    paragraphs: [
      'Vue supports SSR, hydration, and larger rendering strategies, but the most ergonomic full-framework path is often Nuxt because it wraps routing, data fetching, layouts, and SSR conventions into a cohesive application model. That means Vue has a good SSR story, though part of its strength arrives through the ecosystem layer.',
      'SvelteKit makes SSR feel closer to the default application model. Routing, layout hierarchy, server and client data concerns, and form actions all exist within the same official framework. This is one reason many teams find SvelteKit unusually coherent for modern web apps.',
      'A useful framing is that Vue often reaches full SSR strength through composition of strong official tools, whereas Svelte reaches it through a tighter official pairing with SvelteKit.',
    ],
  },
  {
    id: 'core-typescript',
    title: 'TypeScript and Tooling Experience',
    paragraphs: [
      'Vue has a mature TypeScript story, especially in modern `script setup` workflows. The ecosystem around editor integration, component typing, template inference, and companion libraries is broad. This matters for teams building larger applications where TypeScript is a strategic requirement rather than an optional convenience.',
      'Svelte also supports TypeScript well, but the framework surface is smaller and the style is more compact. That can make TypeScript feel lighter in daily authoring, though the broader ecosystem and long-tail examples are smaller than Vues.',
      'In simple terms, Vue often feels safer when tooling maturity and ecosystem depth are the top priority. Svelte often feels nicer when the team wants a smaller mental surface.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Bundle Behavior',
    paragraphs: [
      'Svelte has a strong reputation for small bundles and specialized updates because its compiler can emit targeted code rather than relying on as much general runtime behavior. That advantage is real and is one of the frameworks defining selling points.',
      'Vue performs very well in practice and benefits from compilation plus runtime optimizations. It would be incorrect to describe Vue as slow or dated simply because its architecture is less aggressively compile-first. For many applications, Vue performance is comfortably more than sufficient.',
      'The correct tradeoff statement is this: Svelte often has the cleaner story when minimizing generic runtime work is a primary goal. Vue often has the cleaner story when ecosystem depth and explicit framework ergonomics matter more than squeezing out every category of abstraction overhead.',
    ],
  },
  {
    id: 'core-motion',
    title: 'Transitions, Animations, and UI Polish',
    paragraphs: [
      'Vue includes strong transition primitives such as `Transition` and `TransitionGroup`, and the ecosystem has many patterns for animation and polished interactions. Motion is not an afterthought in Vue; it is a built-in concern with clear framework hooks.',
      'Svelte is especially admired for animation ergonomics because transitions, motion utilities, and state-driven visual effects are concise and expressive. For teams building interaction-heavy interfaces, Svelte often feels unusually pleasant here.',
      'This is one of the more subjective categories, but many developers do find Svelte a little more elegant for animation-heavy component work.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem, Devtools, Community, and Hiring',
    paragraphs: [
      'Vue has the larger ecosystem footprint, broader tutorial base, wider package surface, and a more established hiring market. Vue Devtools are mature, official libraries are well known, and many engineering questions already have battle-tested community answers.',
      'Svelte has a smaller ecosystem, but a strong reputation for developer satisfaction and conceptual clarity. It often wins hearts quickly inside teams because the local authoring experience is so direct.',
      'Organizationally, Vue is usually the lower-risk choice. Ergonomically, Svelte is often the higher-leverage choice. Which matters more depends on whether the constraint is team scale or daily framework friction.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit and Maintainability',
    paragraphs: [
      'Vue often fits larger teams better because the framework vocabulary is explicit, the ecosystem is standardized, and there are more obvious escalation paths from local component patterns to app architecture. That does not mean Vue is heavy by default. It means Vue offers enough visible structure that teams can converge on shared patterns more easily.',
      'Svelte can be extremely maintainable, but it asks the team to exercise more discipline because the framework imposes less visible ceremony. That is wonderful in a disciplined small team and sometimes riskier in a large organization where uneven practices emerge naturally.',
      'So the maintainability tradeoff is not simple. Vue offers more standardized guardrails. Svelte offers less friction and assumes the team knows how much structure to add.',
    ],
  },
  {
    id: 'core-migration',
    title: 'Migration and Interoperability',
    paragraphs: [
      'Vue is often easier to adopt incrementally in an existing frontend because the progressive story is built into the framework identity. Teams can embed Vue into parts of a page or grow into a larger application over time.',
      'Svelte can also be adopted incrementally, but the ecosystem conversation is more often centered around building with Svelte or SvelteKit as a coherent application path rather than gradually sprinkling it into an older architecture.',
      'This makes Vue especially attractive for teams modernizing a frontend in stages, while Svelte is especially attractive for teams willing to commit to a fresh or more deliberately modern application path.',
    ],
  },
  {
    id: 'core-misconceptions',
    title: 'Common Misconceptions',
    paragraphs: [
      'One misconception is that Svelte automatically wins every performance discussion. It often has a compelling baseline performance story, but real applications are dominated by data flow, rendering discipline, network behavior, and architecture choices. Another misconception is that Vue is just a middle-ground framework without a strong identity. In practice, progressive adoption plus explicit reactivity plus a strong official ecosystem is a very strong identity.',
      'Another recurring mistake is comparing raw Vue to SvelteKit or raw Svelte to Nuxt without acknowledging the mismatch. Component-level and application-level comparisons should be kept conceptually separate. Teams make better decisions when they compare equivalent layers.',
      'Finally, many people still reason about Svelte through pre-runes tutorials. Modern Svelte is more explicit about local reactivity than older shorthand narratives sometimes suggest, and stores are no longer the universal answer for every state question.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-counter',
    title: 'Reactive Counter',
    description: [
      'A simple counter exposes the basic difference in feel. Vue makes reactivity explicit through `ref` and `computed`. Svelte keeps state and derivation closer to direct variable-like code.',
    ],
    vueCode: `<script setup lang="ts">
import { computed, ref } from 'vue'

const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)
</script>

<template>
  <button @click="count += 1">
    Clicked {{ count }} times
  </button>

  <p v-if="isEven">Count is even</p>
</template>`,
    svelteCode: `<script lang="ts">
  let count = $state(0);
  let isEven = $derived(count % 2 === 0);
</script>

<button onclick={() => count += 1}>
  Clicked {count} times
</button>

{#if isEven}
  <p>Count is even</p>
{/if}`,
    notes: [
      'Vue is slightly more explicit about what is reactive and what is derived.',
      'Svelte is slightly terser and feels closer to direct component scripting.',
    ],
  },
  {
    id: 'examples-filtering',
    title: 'Filtered List and Derived State',
    description: [
      'Derived state is a good comparison point because both frameworks support it cleanly, but the code shape reflects their philosophy clearly.',
    ],
    vueCode: `<script setup lang="ts">
import { computed, ref } from 'vue'

const query = ref('')
const items = ref(['Vue', 'Svelte', 'React', 'Solid'])

const filtered = computed(() =>
  items.value.filter((item) =>
    item.toLowerCase().includes(query.value.toLowerCase()),
  ),
)
</script>

<template>
  <input v-model="query" placeholder="Filter frameworks" />

  <ul>
    <li v-for="item in filtered" :key="item">{{ item }}</li>
  </ul>
</template>`,
    svelteCode: `<script lang="ts">
  let query = $state('');
  let items = ['Vue', 'Svelte', 'React', 'Solid'];

  let filtered = $derived(
    items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase()),
    ),
  );
</script>

<input bind:value={query} placeholder="Filter frameworks" />

<ul>
  {#each filtered as item}
    <li>{item}</li>
  {/each}
</ul>`,
    notes: [
      'Vue leans on a visible `computed` primitive.',
      'Svelte keeps the derivation close to ordinary expression syntax.',
    ],
  },
  {
    id: 'examples-forms',
    title: 'Form Binding',
    description: [
      'Both frameworks are very good at ordinary form work. Vue exposes one of the most famous ergonomics in frontend development with `v-model`, while Svelte keeps bindings equally compact with `bind:value`.',
    ],
    vueCode: `<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(true)
</script>

<template>
  <input v-model="email" type="email" placeholder="Email" />
  <input v-model="subscribed" type="checkbox" />
  <p>{{ email }} / subscribed: {{ subscribed }}</p>
</template>`,
    svelteCode: `<script lang="ts">
  let email = $state('');
  let subscribed = $state(true);
</script>

<input bind:value={email} type="email" placeholder="Email" />
<input bind:checked={subscribed} type="checkbox" />
<p>{email} / subscribed: {subscribed ? 'yes' : 'no'}</p>`,
    notes: [
      'Vue makes two-way binding a named directive with strong convention value.',
      'Svelte keeps the same behavior very short and direct.',
    ],
  },
  {
    id: 'examples-reuse',
    title: 'Reusable Logic Extraction',
    description: [
      'This example compares Vues composable pattern with Sveltes smaller helper-module style. Both can be clean. Vue is more standardized around the pattern name and shape.',
    ],
    vueCode: `// useCounter.ts
import { computed, ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const isLarge = computed(() => count.value >= 10)

  function increment() {
    count.value += 1
  }

  return { count, isLarge, increment }
}`,
    svelteCode: `// counter.svelte.ts
export function createCounter() {
  let count = $state(0);
  let isLarge = $derived(count >= 10);

  function increment() {
    count += 1;
  }

  return {
    get count() { return count; },
    get isLarge() { return isLarge; },
    increment,
  };
}`,
    notes: [
      'Vue has a highly recognizable composable convention across the ecosystem.',
      'Svelte can be equally compact, but the reuse pattern is less branded and slightly more team-defined.',
    ],
  },
  {
    id: 'examples-shared-state',
    title: 'Shared State Shape',
    description: [
      'At application scale, Vue usually pushes teams toward an official store library, while Svelte increasingly asks whether a store is really needed at all.',
    ],
    vueCode: `// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: 'Ali',
    authenticated: false,
  }),
  actions: {
    signIn(name: string) {
      this.name = name
      this.authenticated = true
    },
  },
})`,
    svelteCode: `// user.ts
export function createUserState() {
  let name = $state('Ali');
  let authenticated = $state(false);

  function signIn(nextName: string) {
    name = nextName;
    authenticated = true;
  }

  return {
    get name() { return name; },
    get authenticated() { return authenticated; },
    signIn,
  };
}`,
    notes: [
      'Vue gives a stronger official escalation path for shared app state.',
      'Modern Svelte often solves shared state with simple module patterns before reaching for classic stores.',
    ],
  },
  {
    id: 'examples-data-loading',
    title: 'Page Data Loading',
    description: [
      'This is where the application-framework distinction becomes visible. Raw Vue commonly fetches inside a component or composable. SvelteKit makes route-level loading first-class.',
    ],
    vueCode: `<script setup lang="ts">
import { onMounted, ref } from 'vue'

const users = ref<Array<{ id: number; name: string }>>([])
const loading = ref(true)

onMounted(async () => {
  users.value = await fetch('/api/users').then((res) => res.json())
  loading.value = false
})
</script>

<template>
  <p v-if="loading">Loading...</p>
  <li v-for="user in users" :key="user.id">{{ user.name }}</li>
</template>`,
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
    notes: [
      'Vue core is flexible but less opinionated at the route-data level.',
      'SvelteKit builds route loading directly into the app model.',
    ],
  },
  {
    id: 'examples-form-actions',
    title: 'Mutation Workflow',
    description: [
      'A mutation example highlights how much the page-level application framework matters. Vue commonly uses component handlers or ecosystem conventions. SvelteKit treats server-connected form actions as a first-class workflow.',
    ],
    vueCode: `<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const status = ref('')

async function submit() {
  await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value }),
  })

  status.value = 'Saved'
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="email" type="email" />
    <button>Subscribe</button>
  </form>
  <p>{{ status }}</p>
</template>`,
    svelteCode: `<!-- +page.svelte -->
<form method="POST">
  <input name="email" type="email" />
  <button>Subscribe</button>
</form>

// +page.server.ts
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    // validate and persist
    return { success: true };
  }
};`,
    notes: [
      'Vue is excellent for client-managed mutation flows.',
      'SvelteKit is unusually strong when the form is part of a server round-trip workflow.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-vue',
    title: 'Vue Terms',
    terms: [
      {
        term: 'Composition API',
        definition:
          'The modern Vue programming model built around explicit primitives such as `ref`, `reactive`, `computed`, and watchers.',
      },
      {
        term: 'Single-file component',
        definition: 'A Vue component file that co-locates template, script, and style in one file.',
      },
      {
        term: 'Composable',
        definition:
          'A reusable function that packages Vue reactive logic into a normal module-level abstraction.',
      },
      {
        term: 'Vue Router',
        definition: 'The official routing library for Vue applications.',
      },
      {
        term: 'Pinia',
        definition:
          'The official state management library for larger shared-state use cases in Vue.',
      },
      {
        term: 'v-model',
        definition:
          'A Vue directive that standardizes common two-way binding patterns for inputs and components.',
      },
      {
        term: 'Watcher',
        definition: 'A Vue mechanism for running side effects in response to reactive changes.',
      },
      {
        term: 'script setup',
        definition:
          'A concise single-file component syntax that streamlines Composition API authoring in Vue.',
      },
    ],
  },
  {
    id: 'glossary-svelte',
    title: 'Svelte Terms',
    terms: [
      {
        term: 'Rune',
        definition:
          'A modern Svelte reactive primitive such as `$state`, `$derived`, or `$effect`.',
      },
      {
        term: 'SvelteKit',
        definition:
          'The official application framework around Svelte that provides routing, data loading, SSR, and form actions.',
      },
      {
        term: 'Store',
        definition:
          'A subscribable state contract in Svelte that remains useful for some shared or asynchronous state scenarios.',
      },
      {
        term: 'bind:value',
        definition: 'Svelte syntax for binding an input value directly to component state.',
      },
      {
        term: 'Load function',
        definition: 'A SvelteKit route-level function that fetches data for a page or layout.',
      },
      {
        term: 'Form action',
        definition: 'A SvelteKit server-side mutation pattern connected directly to HTML forms.',
      },
      {
        term: 'Compiler-first framework',
        definition:
          'A framework that moves more UI work into build-time compilation so the browser runs less generic runtime code.',
      },
      {
        term: 'Scoped style',
        definition: 'Component-level CSS isolation automatically handled by Svelte.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Frontend Terms',
    terms: [
      {
        term: 'Hydration',
        definition: 'The process of attaching interactive client behavior to server-rendered HTML.',
      },
      {
        term: 'Derived state',
        definition: 'State calculated from other state rather than stored independently.',
      },
      {
        term: 'Component',
        definition: 'A reusable UI unit that combines rendering, state, and behavior.',
      },
      {
        term: 'SSR',
        definition:
          'Server-side rendering, where HTML is produced on the server before the client takes over.',
      },
      {
        term: 'Progressive adoption',
        definition:
          'A framework strategy that allows a team to start small and scale usage over time instead of committing all at once.',
      },
      {
        term: 'Runtime reactivity',
        definition:
          'A reactive model where dependency tracking and updates happen primarily through runtime primitives.',
      },
      {
        term: 'Compile-time reactivity',
        definition:
          'A reactive model where the compiler can transform component code ahead of execution to specialize updates.',
      },
      {
        term: 'Framework ceremony',
        definition:
          'The amount of explicit framework syntax, structure, and mental overhead a developer must work through to express a feature.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-core-difference', label: 'The Core Difference' },
    { id: 'bp-what-they-share', label: 'What They Share' },
    { id: 'bp-when-vue-fits', label: 'When Vue Fits' },
    { id: 'bp-when-svelte-fits', label: 'When Svelte Fits' },
    { id: 'bp-application-story', label: 'Application Story' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-what-is-vue', label: 'What Vue Actually Is' },
    { id: 'core-what-is-svelte', label: 'What Svelte Actually Is' },
    { id: 'core-reactivity', label: 'Reactivity Model' },
    { id: 'core-rendering', label: 'Rendering Model' },
    { id: 'core-templates', label: 'Templates and Syntax' },
    { id: 'core-file-structure', label: 'File Structure and Styling' },
    { id: 'core-code-reuse', label: 'Logic Reuse and Composition' },
    { id: 'core-shared-state', label: 'Shared State and Stores' },
    { id: 'core-routing', label: 'Routing and Navigation' },
    { id: 'core-data-loading', label: 'Data Loading' },
    { id: 'core-forms', label: 'Forms and Mutations' },
    { id: 'core-ssr', label: 'SSR and Hydration' },
    { id: 'core-typescript', label: 'TypeScript and Tooling' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-motion', label: 'Transitions and Motion' },
    { id: 'core-ecosystem', label: 'Ecosystem and Hiring' },
    { id: 'core-team-fit', label: 'Team Fit' },
    { id: 'core-migration', label: 'Migration' },
    { id: 'core-misconceptions', label: 'Common Misconceptions' },
  ],
  examples: [
    { id: 'examples-counter', label: 'Reactive Counter' },
    { id: 'examples-filtering', label: 'Filtered List' },
    { id: 'examples-forms', label: 'Form Binding' },
    { id: 'examples-reuse', label: 'Reusable Logic' },
    { id: 'examples-shared-state', label: 'Shared State' },
    { id: 'examples-data-loading', label: 'Page Data Loading' },
    { id: 'examples-form-actions', label: 'Mutation Workflow' },
  ],
  glossary: [
    { id: 'glossary-vue', label: 'Vue Terms' },
    { id: 'glossary-svelte', label: 'Svelte Terms' },
    { id: 'glossary-shared', label: 'Shared Terms' },
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
      <h3 className="bin98-subheading">Vue</h3>
      <div className="bin98-codebox">
        <code>{section.vueCode.trim()}</code>
      </div>
      <h3 className="bin98-subheading">Svelte</h3>
      <div className="bin98-codebox">
        <code>{section.svelteCode.trim()}</code>
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

export default function VueJsVsSveltePage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Vue.js vs Svelte',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Vue.js vs Svelte"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Vue.js vs Svelte</h1>
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
