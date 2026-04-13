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
  'Vite and Webpack both exist to solve the same broad problem: take a modern frontend codebase made of modules, CSS, assets, environment settings, and framework-specific syntax, then turn it into something developers can work with locally and browsers can run in production. The important comparison is not old versus new. It is architecture, development speed, configuration philosophy, ecosystem fit, production build control, and how much of the build pipeline a team wants to own explicitly.',
  'Webpack became the dominant general-purpose bundler by exposing the build graph directly. Loaders, plugins, entries, outputs, chunks, runtime behavior, caching, and advanced asset handling can all be controlled in detail. Vite was created to improve the frontend developer experience in an ecosystem where full rebundling during development had become a recurring source of friction. It does that by centering development around a fast dev server and on-demand module transformation, while still providing a production build path.',
  'This help page is intentionally comprehensive. It covers mental models, dev-server behavior, HMR, configuration shape, loaders versus plugins, dependency handling, CSS and assets, code splitting, environment variables, TypeScript, SSR, library mode, microfrontend concerns, migration strategy, and practical examples. The layout is Windows 98 Help; the content is a detailed decision document.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Webpack is a mature module bundler and build platform. It constructs a dependency graph from one or more entry points, runs that graph through configured loaders and plugins, and emits output chunks and assets. Its strength is breadth and explicit control. It can model complicated build systems and has a long history of supporting real-world edge cases in large frontend applications.',
      'Vite is a frontend toolchain designed to make development feel much faster and less infrastructural for common modern use cases. Instead of treating local development as a problem that always begins with a full bundle, it serves source modules over native browser ESM and transforms code as needed. For production it still performs a build step, but the developer experience is deliberately lighter than the classic all-roads-lead-to-bundling model.',
      'Both tools can ship serious production applications. The real question is where your complexity lives. If complexity mostly lives in application code and you want the toolchain to stay out of the way, Vite often wins. If complexity lives in the asset pipeline itself and the build graph is part of the architecture, Webpack often remains stronger.',
    ],
  },
  {
    id: 'bp-core-difference',
    title: 'The Core Difference',
    paragraphs: [
      'Webpack starts from the idea that the application should be represented as a bundle graph that the build system owns explicitly. That model is powerful because almost every stage can be intercepted, transformed, optimized, or extended. The tradeoff is that developers often pay more toolchain cost during local development and teams must understand more build concepts to make changes safely.',
      'Vite starts from the idea that development and production are not the same problem. During development, what matters most is fast server start, fast page load for the current route, and fast updates when a source file changes. That leads to a different architecture. The tool serves modules and transforms them on demand instead of insisting that the entire app be bundled first. Production remains important, but it is not allowed to dominate the day-to-day editing loop in the same way.',
    ],
    bullets: [
      'Webpack centers the build graph.',
      'Vite centers the development feedback loop.',
      'Webpack exposes more low-level control by default.',
      'Vite reduces local overhead by separating dev concerns from build concerns more aggressively.',
    ],
  },
  {
    id: 'bp-shared-strengths',
    title: 'What They Both Do Well',
    paragraphs: [
      'Both tools support modern JavaScript module workflows, framework integration, static asset handling, CSS processing, development servers, environment-aware configuration, and production builds. For a typical application, either tool can be made to support routing, code splitting, vendor dependencies, hashed assets, and reasonable caching behavior.',
      'This matters because teams sometimes overstate the gap. The comparison is rarely about raw capability in the abstract. It is about how naturally that capability is expressed, how much configuration or surrounding tooling it takes to reach a stable setup, and how much local friction the team is willing to accept in exchange for build-system power.',
    ],
    bullets: [
      'Both can build single-page apps.',
      'Both can support React, Vue, and other mainstream frontend frameworks.',
      'Both can process CSS and static assets.',
      'Both can produce optimized production output with chunking and cache-friendly filenames.',
    ],
  },
  {
    id: 'bp-when-vite-fits',
    title: 'When Vite Is Usually the Better Fit',
    paragraphs: [
      'Vite is usually the stronger default for greenfield frontend applications, internal tools, component libraries, and teams that want the local development loop to be as fast and as low ceremony as possible. It is especially attractive when the project is already aligned with modern ESM assumptions and does not depend on a long tail of custom loader behavior.',
      'It is also a very good fit when the build tool should not become a second application that the team must maintain. In many repositories the build system is not the product. It is just infrastructure. Vite often wins in those cases because it offers a cleaner happy path and faster iteration while still leaving room for plugins and build configuration when needed.',
    ],
    bullets: [
      'New React, Vue, and TypeScript frontends.',
      'Teams optimizing for fast cold start and fast hot updates.',
      'Projects close to mainstream frontend patterns.',
      'Libraries and dashboards where lower build complexity improves maintainability.',
    ],
  },
  {
    id: 'bp-when-webpack-fits',
    title: 'When Webpack Is Usually the Better Fit',
    paragraphs: [
      'Webpack is usually the stronger choice when the codebase already depends on deep Webpack customization, when the asset pipeline has unusual rules, or when the organization relies on existing plugins and loaders that encode years of build knowledge. In those environments the flexibility of the graph matters more than the elegance of the happy path.',
      'It also remains strong for platforms where microfrontend orchestration, advanced chunk control, complex legacy compatibility constraints, or highly customized asset emission rules are not incidental details but core engineering requirements. Mature Webpack systems can be stable and high leverage even if they are not the lightest option for local development.',
    ],
    bullets: [
      'Large enterprise applications with established Webpack infrastructure.',
      'Projects with bespoke loaders, plugin hooks, or unusual asset rules.',
      'Teams that need explicit control over chunking and bundling internals.',
      'Systems where migration cost would be high and current build friction is acceptable.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'The phrase Vite is not a bundler is only partially useful. It explains the development experience, but not the full production story. Vite still has to turn source code into deployable output, and production builds still involve optimization, code splitting, asset emission, minification strategy, and framework-aware transforms. The practical lesson is that Vite reduces development bundling pressure, not that production concerns disappear.',
      'Webpack, by contrast, treats development and production as different configurations of the same broad build graph model. That consistency is valuable when the team wants to reason about one dominant abstraction across environments. The cost is that development often inherits more machinery from the production-oriented bundling model.',
    ],
  },
  {
    id: 'bp-version-sensitivity',
    title: 'Version Sensitivity and Tooling Context',
    paragraphs: [
      'This comparison is version-sensitive. Webpack has had a long period of conceptual stability, while Vite has evolved quickly. Current official Vite documentation also includes newer topics such as Rolldown integration and migration guidance around recent major versions. That means some internal details of Vite can differ depending on which major version a project is actually running, even when the external developer experience still feels recognizably Vite-like.',
      'That matters for teams evaluating or migrating. Conceptual comparisons are stable: Vite optimizes the dev loop and Webpack emphasizes graph-level control. But fine-grained implementation details such as plugin behavior, build internals, and migration edges should always be checked against the exact versions in the repository.',
    ],
    bullets: [
      'Use architecture-level comparisons for strategy.',
      'Use version-specific docs for migration and plugin details.',
      'Do not assume all Vite internals are identical across major versions.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The most reliable decision process is to start from the repository rather than from the tool brand. Ask whether the current pain is developer feedback speed, build complexity, plugin dependence, legacy compatibility, or operational churn. Different answers point to different tools. There is no serious engineering value in migrating simply because one tool feels more fashionable.',
      'If the repository is already modern, relatively standard, and slowed down by local rebuild overhead, Vite is often the practical improvement. If the repository already has a stable Webpack architecture whose custom behavior matters in production, keeping Webpack is often the more disciplined choice. Migration should solve an actual bottleneck, not replace one kind of build knowledge with another for cosmetic reasons.',
    ],
    bullets: [
      'Prefer Vite when development speed and lower config overhead matter most.',
      'Prefer Webpack when the build pipeline itself is part of the architecture.',
      'Do not migrate a stable platform without a measured payoff.',
      'Do not avoid migration if the current toolchain is a daily source of friction.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-is-vite',
    title: 'What Vite Actually Is',
    paragraphs: [
      'Vite is a development server, build tool, and plugin-driven frontend workflow. Its defining characteristic is that it treats development as a browser-serving problem first. Source files are transformed as needed and delivered through native ESM semantics, rather than forcing every local change through a traditional full-bundle cycle.',
      'Official Vite documentation also highlights features beyond simple dev-server speed: support for TypeScript and JSX, CSS handling, static asset handling, web workers, SSR support, library mode, environment modes, and plugin APIs. In other words, Vite is not merely a faster startup button. It is an opinionated frontend toolchain that tries to keep the common path small while remaining extensible.',
    ],
  },
  {
    id: 'core-what-is-webpack',
    title: 'What Webpack Actually Is',
    paragraphs: [
      'Webpack is a module bundler built around a dependency graph and a compilation lifecycle. The graph begins from configured entry points and expands through imports and asset references. Loaders transform source files before they become part of the graph, and plugins extend compilation behavior at broader lifecycle points.',
      'That architecture makes Webpack more than a one-feature bundler. It is a build platform. Teams can define how TypeScript is transpiled, how CSS is extracted, how images are emitted, how chunks are named, how the runtime is split, how HTML is generated, and how framework or platform-specific behavior is attached to the compilation.',
    ],
  },
  {
    id: 'core-dev-server',
    title: 'Development Server and HMR',
    paragraphs: [
      'The Vite development experience is centered on very fast startup and fast updates. Because the browser can request modules directly, Vite only transforms what is needed for the active page. That is why changing one component in a large app can feel dramatically faster than waiting for a large bundle graph to be rebuilt before the browser can continue.',
      'Webpack supports development servers and Hot Module Replacement as well, and those capabilities are mature. But the local development loop typically still reflects the shape of the bundling model. Webpack can be tuned and cached very well, yet its local behavior often depends more heavily on project size, loader cost, and plugin complexity than Vite does.',
      'The architectural difference matters more than slogans. Vite wins by doing less work in the dev loop for many mainstream cases. Webpack compensates by letting teams shape the loop more explicitly when they need to.',
    ],
  },
  {
    id: 'core-dependencies',
    title: 'Dependency Handling, ESM, and Compatibility',
    paragraphs: [
      'Modern frontend projects are rarely pure ESM from top to bottom. They include npm dependencies with mixed module formats, transitive packages with CommonJS history, linked local packages, and code that expects browser behavior at different stages. Vite addresses part of this with dependency pre-bundling in development. Official Vite documentation describes this as a development-only feature that uses esbuild to convert dependencies to ESM and reduce request overhead.',
      'Webpack approaches the same world from inside the bundle graph. Dependencies and source code are both pulled through the compilation pipeline, so compatibility work happens as part of the bundling model rather than as a distinct dev-server pre-bundling phase. This gives Webpack a more uniform graph story, but it also means the developer loop pays for more build-system machinery more often.',
      'For teams dealing with mixed module ecosystems, the practical difference is this: Vite tries to smooth the modern happy path quickly, while Webpack gives you a graph where old and new module behavior can be normalized through loaders, plugins, and bundling rules.',
    ],
  },
  {
    id: 'core-config-philosophy',
    title: 'Configuration Philosophy',
    paragraphs: [
      'Webpack configuration often reads like a build-system specification. Entry points, output templates, resolution rules, module rules, plugins, optimizations, source maps, target environments, and environment-specific variants can all be described explicitly. This is excellent when the build pipeline is a legitimate engineering surface area, but it also raises the learning cost for teams that mostly want a stable default.',
      'Vite configuration is usually narrower for ordinary app work. You still configure aliases, server behavior, plugins, environment modes, and build options, but the defaults intentionally carry more of the common frontend burden. This reduces ceremony. The tradeoff is that when you move far away from the standard path, you sometimes hit the point where the abstraction is intentionally less low-level than Webpack.',
    ],
    bullets: [
      'Webpack configuration is broad and explicit.',
      'Vite configuration is smaller on the common path.',
      'Webpack rewards build expertise.',
      'Vite rewards staying close to the mainstream workflow unless the project truly needs more.',
    ],
  },
  {
    id: 'core-loaders-plugins',
    title: 'Loaders, Plugins, and Extension Model',
    paragraphs: [
      'Webpack distinguishes sharply between loaders and plugins. Loaders transform matched modules before they enter the compiled graph in their final form. Plugins hook into the compilation lifecycle more broadly and can affect output, optimization, runtime behavior, reporting, asset emission, and more. This distinction is one reason Webpack has been so adaptable in complicated build systems.',
      'Vite has a plugin API with strong compatibility roots in the Rollup ecosystem, but the development model changes how some hooks behave. The official Vite plugin API documentation explicitly notes that certain output-generation hooks do not run during dev because there is no complete output bundle at that stage, and some hooks are skipped to avoid full AST parsing costs. That is not a weakness; it is a consequence of the architecture. The extension surface is shaped around fast development first, not around exposing one full compilation model in every mode.',
      'The practical takeaway is that if your team needs deep control over the entire bundling lifecycle, Webpack gives you a more exhaustive model. If your team mostly needs framework support, aliases, transforms, and build-time extensions on a modern stack, Vite plugins are often enough and come with less overhead.',
    ],
  },
  {
    id: 'core-html-entry',
    title: 'HTML Handling and Entry Model',
    paragraphs: [
      'Vite treats HTML as part of the frontend entry experience more directly. In common setups, an HTML file is not just a passive output artifact. It can function as an entry into the app, with scripts and assets resolved through the dev server and build process. That can make single-page and multipage setups feel very straightforward.',
      'Webpack often treats HTML generation as part of the compilation pipeline through plugins such as HTML generation plugins. That is not inherently worse. It simply reflects a different model: HTML is typically produced by the build system or coordinated with it rather than acting as the direct center of the dev-server entry path.',
      'For teams building conventional browser applications, Vite often feels simpler here. For teams that want HTML generation tightly controlled inside a broader compilation pipeline, Webpack remains very capable.',
    ],
  },
  {
    id: 'core-css-assets',
    title: 'CSS, Static Assets, Workers, and WebAssembly',
    paragraphs: [
      'Both toolchains support CSS and static assets, but they express that support differently. Official Vite feature documentation covers CSS, static asset handling, workers, WebAssembly, glob imports, and query-driven asset loading such as raw asset imports and worker-specific import suffixes. That gives modern frontend projects a compact and ergonomic feature set without forcing developers to assemble everything from separate parts.',
      'Webpack also supports these concerns, but the mechanism is more graph-centric. Asset Modules in Webpack 5 replace many older loader-based patterns, and the official guides show how assets can be emitted, inlined, or referenced via `new URL()` and related module behavior. This is powerful and flexible, but it often appears in configuration and rule design rather than in a small set of developer-facing conventions.',
      'If the team values a built-in, mostly standardized frontend experience, Vite is often easier to reason about. If the team values explicit rule-level control over how different file classes enter the compilation graph, Webpack is usually stronger.',
    ],
  },
  {
    id: 'core-env-modes',
    title: 'Environment Variables and Modes',
    paragraphs: [
      'Vite has a clear environment and mode story centered on `.env` files and `import.meta.env`. Official documentation emphasizes mode-specific env files and the `VITE_` prefix convention for variables exposed to client code. This gives teams a predictable client-facing environment model that is easy to document and hard to confuse with server-only secrets.',
      'Webpack can absolutely support environment-aware configuration and client-side constants, but it usually does so through configuration composition plus plugins such as `DefinePlugin` or other surrounding conventions. That is flexible, but it means env handling is often more repository-specific and less standardized across unrelated Webpack projects.',
      'The difference is not capability. It is default coherence. Vite gives frontend teams a more consistent story out of the box, while Webpack gives them more freedom to define their own story.',
    ],
  },
  {
    id: 'core-typescript',
    title: 'TypeScript and Transforms',
    paragraphs: [
      'Vite supports TypeScript ergonomically, but it is important to separate transpilation from type checking. Like many frontend toolchains optimized for speed, Vite can make TypeScript code runnable quickly without claiming that local dev transforms are the same thing as a full static analysis pass. Teams still need an explicit type-checking workflow when correctness depends on it.',
      'Webpack can also support TypeScript well, but it typically does so through loaders and build configuration. That makes the pipeline very configurable, yet it often means a project must choose and maintain more moving parts around TypeScript compilation, source maps, performance tradeoffs, and type-check enforcement.',
      'In practice, Vite usually feels lighter for TypeScript app development, while Webpack offers more opportunities to shape the transform pipeline around organization-specific requirements.',
    ],
  },
  {
    id: 'core-code-splitting',
    title: 'Code Splitting, Chunks, and Optimization',
    paragraphs: [
      'Webpack has long been strong in explicit chunk strategy, runtime chunking, vendor splitting, lazy loading patterns, and optimization hooks. Teams that need to reason carefully about emitted chunk shapes, naming, cache groups, or runtime organization often appreciate how visible those concerns are inside Webpack configuration.',
      'Vite supports production build optimization and code splitting as well, and the official build docs expose ways to configure chunk splitting through underlying build options. The difference is philosophical. Vite generally tries to let common production optimization happen with less up-front configuration, while Webpack more readily exposes chunk strategy as a normal part of engineering the build graph.',
      'If the app is ordinary, less explicit chunk engineering is often a good thing. If the app is a platform with special delivery, caching, or runtime constraints, Webpack may still be the better abstraction.',
    ],
  },
  {
    id: 'core-caching',
    title: 'Caching and Build Performance',
    paragraphs: [
      'Webpack performance is heavily affected by cache design, loader cost, plugin behavior, source-map strategy, and how much custom logic runs inside compilation hooks. Teams that understand those variables can produce very effective results, but performance tuning often becomes a build-engineering discipline of its own.',
      'Vite often feels faster because its architecture reduces the amount of work that needs to happen during development in the first place. That does not mean production builds are magically free, and it does not mean every large codebase will always see universal wins. It means the performance model is usually simpler to reason about in the local development loop.',
      'This is one of the biggest practical differences in daily engineering life. Faster startup and smaller update cost are not cosmetic. They change how quickly developers test ideas and how often they keep the feedback loop running.',
    ],
  },
  {
    id: 'core-ssr-library-mpa',
    title: 'SSR, Library Mode, Multi-Page Apps, and Monorepos',
    paragraphs: [
      'Vite documentation explicitly covers SSR, library mode, and multipage build support. That makes it suitable for more than a simple single-page app. Many teams treat it as a general frontend platform for apps and libraries, not just a dev server for demos.',
      'Webpack can of course power SSR frameworks, multipage systems, libraries, and monorepos as well, and historically many major platforms have depended on it for exactly those scenarios. The difference is usually one of default ergonomics. Vite tries to make modern cases feel close to the standard path, while Webpack gives teams a more manual platform for assembling the exact build topology they want.',
      'In monorepos, the comparison often depends less on the tools themselves and more on whether the repository is trying to standardize around fast app development or around a single deeply customizable build graph model that multiple packages share.',
    ],
  },
  {
    id: 'core-microfrontends',
    title: 'Microfrontends and Module Federation',
    paragraphs: [
      'Webpack has a notable advantage in the microfrontend discussion because Module Federation is part of its broader conceptual identity. When teams need independently deployable frontend surfaces that share runtime-loaded modules across boundaries, Webpack already has a mature vocabulary for that problem.',
      'Vite can participate in microfrontend architectures, but this is one of the areas where Webpack often has the more native story because the ecosystem and conceptual model are more historically aligned with those needs. If Module Federation or equivalent distributed-runtime composition is a major design requirement, Webpack deserves serious weight in the decision.',
    ],
  },
  {
    id: 'core-migration',
    title: 'Migration and Interoperability',
    paragraphs: [
      'Migrating from Webpack to Vite is usually easier when the existing project is already close to mainstream frontend patterns and uses its build system mostly for common concerns such as framework transforms, TypeScript transpilation, aliases, CSS, and standard asset handling. Migration is harder when the current Webpack setup encodes a lot of special behavior in loaders, plugins, multi-entry builds, environment-specific runtime tweaks, or custom chunking logic.',
      'The right migration question is not Can this compile after a weekend of config edits. The right question is Which parts of the current Webpack system express real product requirements, and which parts are just historical build residue. Vite can simplify the residue. It should not be expected to erase genuine architectural requirements without cost.',
      'Interoperability also cuts the other way. Teams can stay on Webpack and still modernize many parts of the stack. Choosing Webpack does not mean rejecting modern frontend engineering. It means deciding that build-system control remains worth the complexity.',
    ],
  },
  {
    id: 'core-misconceptions',
    title: 'Common Misconceptions',
    paragraphs: [
      'One common misconception is that Vite makes bundling obsolete. It does not. It changes how development is handled and streamlines many workflows, but production output still requires careful handling of chunks, assets, transforms, and deployment behavior.',
      'Another misconception is that Webpack is automatically outdated. That is wrong. Webpack remains highly capable and still fits many serious systems well. The real criticism is not that Webpack cannot do the job. It is that for many modern application teams, the amount of build-system machinery exposed during ordinary development is greater than what they now want to maintain.',
      'The mature position is to treat both tools as valid engineering choices with different center-of-gravity assumptions.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-vite-config',
    title: 'Minimal Vite Configuration',
    description: [
      'A typical Vite configuration for a modern frontend app stays close to framework registration, aliases, dev-server settings, and selected build tweaks. It is short because the common path carries more defaults.',
      'This is one of the most visible reasons teams describe Vite as simpler. You can often understand the entire project-level configuration at a glance.',
    ],
    code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    sourcemap: true,
  },
})`,
    notes: [
      'The file mostly describes project intent rather than a full compilation pipeline.',
      'You can extend this, but many applications never need a much larger Vite config than this.',
    ],
  },
  {
    id: 'examples-webpack-config',
    title: 'Minimal Webpack Configuration',
    description: [
      'A small Webpack configuration exposes more of the build graph directly: entry, output, module rules, resolution, and plugin hooks. This is more verbose, but it also makes the structure of the build pipeline explicit.',
      'That explicitness is exactly why Webpack remains valuable in complex systems.',
    ],
    code: `const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
}`,
    notes: [
      'Webpack surfaces the graph and transform pipeline as first-class engineering objects.',
      'This is more setup than Vite, but it scales well when the team needs to own every part of the pipeline.',
    ],
  },
  {
    id: 'examples-vite-glob-assets',
    title: 'Vite-Oriented Source Features',
    description: [
      'Official Vite docs expose some features directly in source syntax, such as `import.meta.glob`, worker imports, and raw asset imports. These features illustrate the Vite tendency to give frontend developers compact, built-in conventions.',
    ],
    code: `const modules = import.meta.glob('./pages/**/*.tsx')

import ShaderSource from './shader.glsl?raw'
import WorkerConstructor from './search.worker.ts?worker'

const worker = new WorkerConstructor()`,
    notes: [
      'This style makes advanced frontend tasks feel like normal source-level capabilities.',
      'The tradeoff is that teams should understand which features are tool-specific conventions rather than browser-native syntax.',
    ],
  },
  {
    id: 'examples-webpack-assets',
    title: 'Webpack Asset Module Style',
    description: [
      'Webpack tends to express asset behavior through the graph and rules. Webpack 5 Asset Modules simplify many older patterns, but the mental model is still that assets are part of compilation policy.',
    ],
    code: `module.exports = {
  module: {
    rules: [
      {
        test: /\\.(png|svg|jpg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
}

const logoUrl = new URL('./logo.svg', import.meta.url)`,
    notes: [
      'Webpack gives explicit control over how file classes are emitted or inlined.',
      'This is useful when asset handling rules are a meaningful part of the build architecture.',
    ],
  },
  {
    id: 'examples-code-splitting',
    title: 'Code Splitting in Both Models',
    description: [
      'Both tools support lazy loading with dynamic import syntax. The syntax can look similar at the source level, but the surrounding configuration and emitted chunk strategy are where the deeper differences appear.',
    ],
    code: `// Shared source pattern
const AdminPage = () => import('./pages/AdminPage')

// Vite mindset
let defaults handle the common case
customize build chunk strategy only when needed

// Webpack mindset
dynamic import feeds the bundle graph
optimize splitChunks, runtimeChunk, and naming when delivery strategy matters`,
    notes: [
      'Source-level code splitting syntax is not the main differentiator.',
      'The meaningful difference is how much explicit control the team wants over emitted chunks and runtime structure.',
    ],
  },
  {
    id: 'examples-env',
    title: 'Environment Variables',
    description: [
      'Environment-variable handling shows the contrast between a standardized frontend convention and a configurable build-platform convention.',
    ],
    code: `// Vite client code
const apiBase = import.meta.env.VITE_API_BASE_URL

// Webpack approach
// inject constants through configuration, often with DefinePlugin
const apiBase = __API_BASE_URL__`,
    notes: [
      'Vite gives a strong default convention for browser-exposed variables.',
      'Webpack gives freedom, but teams must define and document the convention themselves.',
    ],
  },
  {
    id: 'examples-module-federation',
    title: 'Webpack Module Federation Shape',
    description: [
      'This example is intentionally simple. The point is not every option on the plugin. The point is that Webpack has a native conceptual place for runtime module sharing across separately built applications.',
    ],
    code: `const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        account: 'account@http://localhost:3001/remoteEntry.js',
      },
    }),
  ],
}`,
    notes: [
      'This is one reason Webpack stays relevant in platform-scale frontend architectures.',
      'If runtime composition across separately deployed frontends is a major requirement, Webpack deserves serious consideration.',
    ],
  },
  {
    id: 'examples-migration-checklist',
    title: 'Migration Review Checklist',
    description: [
      'Before replacing Webpack with Vite, a team should audit more than syntax. Migration succeeds when actual behavior is mapped deliberately.',
    ],
    code: `review:
  aliases and module resolution
  linked package behavior
  CommonJS and legacy dependency handling
  CSS pipeline and PostCSS assumptions
  asset emission rules
  HTML entry strategy
  environment variable exposure rules
  code splitting and runtime chunk expectations
  SSR or library build requirements
  plugin and loader specific behavior
  microfrontend architecture requirements
  CI and production build expectations`,
    notes: [
      'The hardest part of migration is usually preserving semantics, not rewriting config syntax.',
      'If many checklist items are truly custom and mission-critical, staying on Webpack may be the more disciplined decision.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-vite',
    title: 'Vite Terms',
    terms: [
      {
        term: 'Dev Server',
        definition:
          'The local server that powers Vite development by serving source modules and transforms quickly to the browser.',
      },
      {
        term: 'Dependency Pre-Bundling',
        definition:
          'A development-only optimization in Vite docs that converts dependencies to ESM and reduces request overhead.',
      },
      {
        term: 'Plugin',
        definition:
          'An extension point used to add framework support, transforms, or build behavior to a Vite project.',
      },
      {
        term: 'Mode',
        definition:
          'A named environment such as development or production that changes env loading and configuration behavior.',
      },
      {
        term: 'import.meta.env',
        definition:
          'The Vite convention for client-visible environment metadata and prefixed env variables.',
      },
      {
        term: 'import.meta.glob',
        definition:
          'A Vite feature for importing many files through a glob pattern without writing each import manually.',
      },
      {
        term: 'Library Mode',
        definition:
          'A Vite build mode aimed at packaging libraries rather than only browser applications.',
      },
      {
        term: 'SSR',
        definition:
          'Server-side rendering support documented by Vite for applications that render HTML on the server before hydration.',
      },
    ],
  },
  {
    id: 'glossary-webpack',
    title: 'Webpack Terms',
    terms: [
      {
        term: 'Entry',
        definition: 'A starting point from which Webpack begins building the dependency graph.',
      },
      {
        term: 'Output',
        definition: 'The emitted assets and chunk files created from the compiled graph.',
      },
      {
        term: 'Loader',
        definition:
          'A transformation stage that tells Webpack how to process matched source files before bundling.',
      },
      {
        term: 'Plugin',
        definition:
          'A hook into the broader Webpack compilation lifecycle used to alter build behavior and emitted results.',
      },
      {
        term: 'Chunk',
        definition: 'A piece of emitted bundle output representing some portion of the graph.',
      },
      {
        term: 'HMR',
        definition:
          'Hot Module Replacement, where changed modules are updated during development without forcing a full reload when possible.',
      },
      {
        term: 'Asset Module',
        definition:
          'Webpack 5 support for handling assets such as images and files without relying on some older loader patterns.',
      },
      {
        term: 'Module Federation',
        definition:
          'A Webpack capability for sharing modules across independently built and deployed frontend applications at runtime.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Build Terms',
    terms: [
      {
        term: 'Bundler',
        definition:
          'A tool that resolves modules and assets, applies transforms, and emits browser-ready output.',
      },
      {
        term: 'Dependency Graph',
        definition:
          'The network of source files and imports that a build tool must analyze to understand the application.',
      },
      {
        term: 'Code Splitting',
        definition:
          'Breaking application code into separately loaded chunks so the browser does not download everything up front.',
      },
      {
        term: 'Tree Shaking',
        definition:
          'Eliminating unused exported code from the final build where the toolchain can prove it is not needed.',
      },
      {
        term: 'Asset Pipeline',
        definition:
          'The rules that process JavaScript, TypeScript, CSS, images, fonts, workers, and related resources.',
      },
      {
        term: 'Source Map',
        definition:
          'Metadata that maps compiled output back to original source code for debugging.',
      },
      {
        term: 'Developer Feedback Loop',
        definition:
          'The cycle of editing code, seeing the result, and validating behavior during local development.',
      },
      {
        term: 'Production Build',
        definition:
          'The optimized output intended for deployment, typically including chunking, minification, hashing, and asset emission.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-core-difference', label: 'The Core Difference' },
    { id: 'bp-shared-strengths', label: 'What They Both Do Well' },
    { id: 'bp-when-vite-fits', label: 'When Vite Fits' },
    { id: 'bp-when-webpack-fits', label: 'When Webpack Fits' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-version-sensitivity', label: 'Version Sensitivity' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-what-is-vite', label: 'What Vite Actually Is' },
    { id: 'core-what-is-webpack', label: 'What Webpack Actually Is' },
    { id: 'core-dev-server', label: 'Development Server and HMR' },
    { id: 'core-dependencies', label: 'Dependencies, ESM, and Compatibility' },
    { id: 'core-config-philosophy', label: 'Configuration Philosophy' },
    { id: 'core-loaders-plugins', label: 'Loaders, Plugins, and Extension Model' },
    { id: 'core-html-entry', label: 'HTML Handling and Entry Model' },
    { id: 'core-css-assets', label: 'CSS, Assets, Workers, and WASM' },
    { id: 'core-env-modes', label: 'Environment Variables and Modes' },
    { id: 'core-typescript', label: 'TypeScript and Transforms' },
    { id: 'core-code-splitting', label: 'Code Splitting and Optimization' },
    { id: 'core-caching', label: 'Caching and Build Performance' },
    { id: 'core-ssr-library-mpa', label: 'SSR, Library Mode, and MPAs' },
    { id: 'core-microfrontends', label: 'Microfrontends and Federation' },
    { id: 'core-migration', label: 'Migration and Interoperability' },
    { id: 'core-misconceptions', label: 'Common Misconceptions' },
  ],
  examples: [
    { id: 'examples-vite-config', label: 'Minimal Vite Config' },
    { id: 'examples-webpack-config', label: 'Minimal Webpack Config' },
    { id: 'examples-vite-glob-assets', label: 'Vite Source Features' },
    { id: 'examples-webpack-assets', label: 'Webpack Asset Modules' },
    { id: 'examples-code-splitting', label: 'Code Splitting Comparison' },
    { id: 'examples-env', label: 'Environment Variables' },
    { id: 'examples-module-federation', label: 'Module Federation Shape' },
    { id: 'examples-migration-checklist', label: 'Migration Checklist' },
  ],
  glossary: [
    { id: 'glossary-vite', label: 'Vite Terms' },
    { id: 'glossary-webpack', label: 'Webpack Terms' },
    { id: 'glossary-shared', label: 'Shared Build Terms' },
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

export default function ViteVsWebpackPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Vite vs Webpack',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Vite vs Webpack"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Vite vs Webpack</h1>
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
