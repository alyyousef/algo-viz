import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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
  bunCode: string
  nodeCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'Bun vs Node.js'
const pageSubtitle = 'Comparing an all-in-one modern JavaScript runtime with the long-established standard server-side JavaScript runtime.'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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
      'Bun and Node.js both run JavaScript and TypeScript outside the browser, but they occupy very different positions in the ecosystem. Node.js is the long-established default server-side JavaScript runtime with the largest production footprint, the deepest library compatibility history, and the broadest operational trust. Bun is a newer runtime and toolkit that aims to be much more than just a JavaScript engine host. It combines runtime, package manager, test runner, bundler, and transpilation ergonomics into one product and explicitly targets Node compatibility so teams can adopt it incrementally.',
      'A useful shorthand is this: Node.js is the stable platform standard that everything in the JavaScript backend world has learned to accommodate. Bun is the high-performance all-in-one challenger that tries to remove toolchain friction while still running a large share of the Node ecosystem. That means the decision is not merely about speed. It is about compatibility risk, tooling strategy, operational conservatism, and whether the team wants one runtime or one toolkit-shaped platform.',
      'The comparison matters because Bun is no longer just an experiment. Its docs explicitly position it as an incrementally adoptable toolkit and as a Node-compatible runtime, while Node.js itself continues evolving with built-in features like the Node test runner and modern module support. So the real question is not Can Bun run JavaScript and can Node run JavaScript. The real question is which one is the safer and higher-leverage foundation for your specific codebase today.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'Node.js historically behaves like a runtime platform first. It gives you JavaScript execution, core APIs, module loading, process management, streams, networking, worker threads, and an enormous surrounding ecosystem. Tooling such as bundling, test frameworks, transpilation, linting, and package-manager strategy has traditionally lived around Node rather than inside Node itself. This is why a Node project often feels like a stack assembled from several tools rather than one unified toolchain.',
      'Bun behaves like a toolkit platform first. Its homepage explicitly describes it as an all-in-one JavaScript, TypeScript, and JSX toolkit with a runtime, package manager, test runner, and bundler built in. The design goal is not only to execute code. The goal is to collapse multiple common developer tools into one faster, lower-friction experience.',
      'That difference shows up everywhere. Node.js often feels more composable, conservative, and ecosystem-defined. Bun often feels more opinionated, more integrated, and more willing to say You should not need five different tools for the basic JavaScript development loop.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'Node.js is strongest for production systems where compatibility certainty, operational predictability, mature ecosystem support, and broad organizational familiarity matter most. It is especially strong for large existing codebases, enterprise systems, infrastructure tools, libraries intended for the broadest downstream use, and teams that want the most conservative default for server-side JavaScript.',
      'Bun is strongest for teams that care deeply about startup speed, developer experience, fewer moving parts, and modern runtime ergonomics. It is especially attractive for greenfield apps, internal tools, CLIs, full-stack TypeScript projects, and teams that want a single toolkit for install, run, test, and build without automatically reaching for separate tools like npm plus tsx plus Vitest plus esbuild or Vite.',
      'If the central question is Which runtime is the ecosystem standard and the safest compatibility default, Node.js still wins. If the central question is Which runtime and toolkit can reduce friction and feel dramatically nicer for modern JavaScript projects, Bun is increasingly compelling.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose Node.js when compatibility certainty and long-term ecosystem trust matter most.',
      'Choose Bun when startup speed, integrated tooling, and low-friction TypeScript workflows matter most.',
      'Choose Node.js when you are shipping libraries or infrastructure that must behave predictably across the widest possible set of environments.',
      'Choose Bun when you want to replace several JavaScript tools with one cohesive toolkit and the compatibility profile of your app is already known to be acceptable.',
      'If the team is mostly debating runtime safety versus toolkit leverage, that is the real decision boundary.',
    ],
  },
]

const mentalModels = [
  {
    title: 'Node.js is the baseline ecosystem contract',
    detail:
      'Most backend JavaScript packages, frameworks, build tools, and deployment assumptions historically target Node first and Bun second.',
  },
  {
    title: 'Bun is runtime plus tooling',
    detail:
      'It is not only trying to run JavaScript. It is also trying to replace pieces of the surrounding JavaScript toolchain with built-in primitives.',
  },
  {
    title: 'Compatibility is the main strategic question',
    detail:
      'Bun aims for Node compatibility, but the decision is still about how much compatibility risk your codebase can actually tolerate.',
  },
  {
    title: 'Node usually wins on trust, Bun often wins on ergonomics',
    detail:
      'Node has the production history and ecosystem gravity. Bun often feels faster and more pleasant day to day for many modern workflows.',
  },
  {
    title: 'Bun adoption can be incremental',
    detail:
      'Its docs explicitly position tools like bun test and bun install as usable in existing Node projects, so migration does not need to be all or nothing.',
  },
  {
    title: 'Runtime performance is only one part of the story',
    detail:
      'Developer speed, tooling simplicity, deployment assumptions, native-module behavior, and observability maturity matter just as much as raw benchmarks.',
  },
  {
    title: 'Node is a platform center, not a batteries-included toolkit',
    detail:
      'That is why Node projects often rely on npm, pnpm, Jest or Vitest, tsx or ts-node, and a bundler, while Bun tries to collapse much of that into one product.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-runtime-shape',
    title: 'Overall Runtime and Tooling Shape',
    paragraphs: [
      'Node.js is primarily a JavaScript runtime platform with a broad standard library and a huge ecosystem surrounding it. Over time Node has added more built-in capabilities, but the normal development story still assumes multiple adjacent tools for package management, testing, bundling, transpilation, and sometimes local execution convenience. This is not a flaw by itself. It is part of why Node has remained so flexible and ecosystem-driven.',
      'Bun is intentionally shaped as an all-in-one toolkit. Its docs and homepage explicitly highlight a built-in runtime, package manager, bundler, test runner, and TypeScript plus JSX support. That means Bun is not merely asking Can we run JavaScript faster. It is asking Why is the standard JavaScript workflow spread across so many separate tools in the first place.',
      'This difference is strategic. Node lets the ecosystem decide more. Bun bakes in more opinionated answers. Teams that like composability tend to prefer Node. Teams that are tired of toolchain sprawl often find Bun refreshing immediately.',
    ],
  },
  {
    id: 'core-compatibility',
    title: 'Node Compatibility and Ecosystem Risk',
    paragraphs: [
      'Node.js is the compatibility target. That sounds obvious, but it matters because nearly the entire npm ecosystem and most JavaScript deployment assumptions were built around Node semantics first. If your code runs on Node, you are aligned with the baseline environment most libraries expect.',
      'Bun explicitly aims for Node.js compatibility and documents Node API compatibility in detail. That is a serious strength because it makes Bun incrementally adoptable rather than forcing teams into a completely separate ecosystem. But compatibility work is still compatibility work. Even if Bun supports a very large share of Node-oriented apps, the practical question remains whether your specific dependency graph, native modules, framework integrations, and operational assumptions all behave the way you need.',
      'This is why Bun versus Node decisions are not settled by marketing claims alone. The safer framing is this: Node is the reference environment. Bun is an increasingly capable environment whose business value depends on how well it handles the exact code you already have or plan to write.',
    ],
  },
  {
    id: 'core-modules',
    title: 'Modules, Resolution, and JavaScript Packaging Reality',
    paragraphs: [
      'Modern Node.js has a mature but sometimes complicated module story around CommonJS, ECMAScript modules, package exports, package imports, and runtime behavior that depends on file extensions, package.json fields, and loader expectations. Node documentation reflects how much detail there is here because packaging and module resolution are foundational to everything else in the ecosystem.',
      'Bun tries to make many of these workflows feel lighter, especially for TypeScript, JSX, and common frontend-adjacent patterns. It aims to run Node-style packages while also smoothing over some of the friction that makes Node toolchains feel ceremony-heavy in practice. For many developers, this is one of Buns biggest experiential advantages: less setup to just run modern JavaScript and TypeScript code.',
      'But module ergonomics and module correctness are not identical goals. Node remains the compatibility reference for packaging semantics across the ecosystem. Bun often feels nicer when you are writing app code. Node remains safer when packaging behavior across arbitrary environments is the first concern.',
    ],
  },
  {
    id: 'core-typescript',
    title: 'TypeScript, JSX, and Zero-Config Ergonomics',
    paragraphs: [
      'Node.js can absolutely power TypeScript applications, but it traditionally does so through surrounding tools. Teams often bring TypeScript itself, a bundler or transpiler, tsx or ts-node, test tooling, and local dev scripts. This is very powerful because you can choose exactly what you want, but it also means basic project setup frequently involves several moving parts.',
      'Bun treats TypeScript and JSX as first-class out of the box. This is one of its clearest product distinctions. A project can often feel immediately runnable without first deciding on a separate execution shim or a broader stack of supporting dev tools. For greenfield TypeScript work, that can be a meaningful boost in iteration speed and cognitive simplicity.',
      'So the difference is not that Node can do TypeScript and Bun can do TypeScript. The difference is whether the team wants TypeScript to be an ecosystem-assembled workflow or a built-in workflow.',
    ],
  },
  {
    id: 'core-package-manager',
    title: 'Package Management and Dependency Workflow',
    paragraphs: [
      'Node.js historically relies on the npm ecosystem and is often paired with npm, pnpm, or Yarn depending on team preference. This gives teams strong flexibility and mature workflows, especially in large monorepos or organizations with established package-management conventions. It also means package management is conceptually separate from the runtime itself even when Node distributions commonly ship with npm.',
      'Bun ships with a built-in package manager and documents bun install as a core part of the platform. That matters because it turns dependency installation into a first-class runtime-adjacent experience instead of something delegated to an external tool choice. Bun explicitly positions this as one of the ways it can be adopted incrementally inside existing Node-oriented projects.',
      'The real tradeoff is standardization versus consolidation. Node lets your organization use the package manager ecosystem it already prefers. Bun offers a faster, more integrated package workflow if you are willing to adopt its toolchain opinion.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Story and Developer Loop',
    paragraphs: [
      'Node.js now includes a built-in test runner, which is an important evolution because it narrows one of the historic gaps between Node core and the wider ecosystem. But in practice many teams still use Jest, Vitest, or other frameworks because those tools are deeply embedded in existing projects, plugin ecosystems, snapshot workflows, or frontend and full-stack testing patterns.',
      'Bun also includes a built-in test runner and explicitly markets bun test as something usable in existing Node projects. This is a meaningful strategic difference because it turns test execution into part of the same opinionated toolkit as install, run, and build. For smaller or newer projects, that can dramatically simplify the toolchain story.',
      'The tradeoff is familiar by now: Node gives you broad compatibility and established conventions; Bun gives you tighter integration and a lighter-feeling default experience if your project fits comfortably inside its compatibility envelope.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Startup Time, Runtime Performance, and Throughput',
    paragraphs: [
      'Bun is heavily associated with performance and low-latency developer experience. Its value proposition frequently includes fast startup, fast install performance, and a generally snappy all-in-one workflow. For many teams, that is not just a benchmark curiosity. Faster commands change how development feels throughout the day.',
      'Node.js remains highly capable in production and continues to power huge numbers of high-throughput systems. Raw runtime performance is only one dimension of platform choice, and Node benefits from years of production hardening, operational knowledge, ecosystem tuning, and broad deployment support. Many systems do not bottleneck on runtime startup speed in the first place.',
      'So performance needs to be framed correctly. Bun often wins when fast local workflows and low startup overhead are visible product benefits. Node often wins when compatibility certainty and operational trust matter more than squeezing maximum leverage out of a more integrated runtime toolkit.',
    ],
  },
  {
    id: 'core-http',
    title: 'HTTP Servers, Fetch, and Modern Web Runtime Feel',
    paragraphs: [
      'Node.js provides mature core networking primitives, HTTP support, streams, and increasingly modern web-platform APIs. It can host every kind of backend JavaScript system from tiny APIs to large-scale web servers, but the experience is often shaped by whichever framework or surrounding tools the team chooses. In other words, Node is the platform underneath the server framework rather than the server framework experience itself.',
      'Bun tries to make common web-runtime workflows feel more direct and more modern immediately. This can make writing a small server, running fetch-based code, or building a TypeScript-first backend feel unusually lightweight. For greenfield app work, Bun often feels less like assembling a JavaScript environment and more like opening a ready-made development appliance.',
      'That difference matters most in app code rather than libraries. If you are building internal services, CLIs, or full-stack TypeScript apps, Buns directness can be a real advantage. If you are building platform software that must live comfortably inside every possible Node deployment expectation, Node remains the safer center of gravity.',
    ],
  },
  {
    id: 'core-workers',
    title: 'Concurrency, Workers, and System-Level Runtime Behavior',
    paragraphs: [
      'Node.js has mature concurrency primitives such as worker threads, child processes, streams, and event-loop-oriented asynchronous I/O. Its operational behavior is deeply understood by the ecosystem, and teams building serious backend systems have years of patterns for CPU-bound offloading, clustering, and process supervision.',
      'Bun also supports concurrency-oriented patterns, but this is an area where maturity and operational familiarity still matter more than surface API presence. The real question is not only whether a feature exists. It is whether your team understands how that runtime behaves under actual production load, in your hosting environment, with your profiling, metrics, and incident response tooling.',
      'This is one reason Node remains the conservative default for infrastructure-heavy systems. Operational knowledge compounds over time, and Node has much more of it in the ecosystem.',
    ],
  },
  {
    id: 'core-native',
    title: 'Native Modules, Edge Cases, and Compatibility Boundaries',
    paragraphs: [
      'Node.js is the environment most native add-ons, build scripts, framework integrations, and obscure ecosystem assumptions historically expect. If your project pulls in a complicated graph of packages with native components, custom postinstall behavior, or old Node-specific assumptions, Node remains the least surprising place to run it.',
      'Bun may handle a large share of modern application dependencies just fine, but the real risk is not obvious app code. The real risk is the long tail of ecosystem edge cases: native add-ons, transitive dependency behavior, loader assumptions, framework dev-server integrations, unusual test setups, and package scripts that were only ever validated on Node.',
      'That is why Bun adoption should be treated as workload-specific rather than abstractly ideological. The more standard and app-like your stack is, the more attractive Bun becomes. The more legacy, infrastructure-heavy, or ecosystem-weird your stack is, the more Node remains the safer answer.',
    ],
  },
  {
    id: 'core-deploy',
    title: 'Deployment, Operations, and Organizational Risk',
    paragraphs: [
      'Node.js is available everywhere people expect JavaScript on the server to be available. Hosting platforms, Docker images, build systems, CI vendors, process managers, APM tools, enterprise policies, and internal platform documentation all tend to assume Node support by default. That kind of ambient support matters a great deal in larger organizations.',
      'Bun deployment is increasingly viable, but it still represents an organizational choice rather than an invisible default. The question is not just Can I containerize Bun. Usually you can. The question is whether your hosting platform, observability stack, security reviews, support model, and production operations culture are all comfortable with it yet.',
      'This is where many runtime decisions are really made. Node wins not only because it can run code, but because it is already accepted everywhere. Bun wins when the organization is willing to buy some compatibility and operational novelty in exchange for developer leverage and toolchain simplicity.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Gravity, Hiring, and Team Familiarity',
    paragraphs: [
      'Node.js benefits from overwhelming ecosystem gravity. Frameworks, guides, deployment advice, package authors, hiring pools, and organizational knowledge all assume Node first. This reduces surprise and onboarding cost. It also means that when something goes wrong, the amount of prior art available is enormous.',
      'Bun has strong momentum and enthusiasm because it solves frustrations many JavaScript developers already feel. It is often appealing to teams that are tired of fragmented tooling and want a faster, more cohesive experience. But enthusiasm is not the same thing as ecosystem universality. Bun still asks the team to accept some platform novelty.',
      'This often becomes the deciding factor. Mature organizations may not need the most elegant tool. They may need the tool with the lowest organizational surprise. Smaller or faster-moving teams may rationally value Bun more because developer speed matters more than total ecosystem conservatism.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'Node.js can feel bloated in practice, not because the runtime itself is bloated, but because ordinary Node projects often accumulate a wider toolchain than teams really want. Package manager choice, test runner choice, transpilation choice, bundler choice, and execution-shim choice can make even straightforward projects feel more infrastructural than they need to be.',
      'Bun can feel deceptively easy in exactly the opposite way. The all-in-one experience is so attractive that teams may adopt it quickly without fully validating dependency compatibility, deployment assumptions, or operational tooling. The failure mode is not that Bun is conceptually weak. The failure mode is overconfidence about ecosystem equivalence with Node before the team has actually tested that assumption.',
      'So the real tradeoff is not old versus new. It is ecosystem certainty and composability versus integrated leverage and lower day-to-day friction.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose Node.js when the broadest compatibility and least organizational surprise matter most.',
      'Choose Bun when faster local workflows and a more integrated JavaScript toolkit matter most.',
      'Prefer Node.js for libraries, platform tooling, and large existing systems with unknown ecosystem edge cases.',
      'Prefer Bun for greenfield apps, CLIs, internal tools, and TypeScript-heavy projects where the compatibility profile is already validated.',
      'If your team wants to reduce toolchain sprawl more than it wants to minimize platform novelty, Bun deserves serious weight.',
      'If your team cannot tolerate runtime-level compatibility risk, Node.js remains the safer default.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-run-ts',
    title: 'Run a TypeScript Script',
    summary: 'Both runtimes can execute TypeScript-oriented workflows, but the surrounding experience is not equally integrated.',
    bunCode: `bun run ./src/script.ts`,
    nodeCode: `node --import tsx ./src/script.ts`,
    explanation: 'Bun treats TypeScript execution as part of the normal toolkit experience. Node typically reaches the same outcome through an additional tool such as tsx or a compile step, which is flexible but less integrated.',
  },
  {
    id: 'ex-install',
    title: 'Install Dependencies',
    summary: 'Dependency installation is routine in both worlds, but Bun treats the package manager as a first-class built-in tool.',
    bunCode: `bun install`,
    nodeCode: `npm install`,
    explanation: 'Node projects usually treat the package manager as adjacent to the runtime even if npm is the default norm. Bun explicitly makes package installation part of the same all-in-one product identity as the runtime.',
  },
  {
    id: 'ex-test',
    title: 'Run Tests',
    summary: 'Both runtimes now have built-in test stories, but the ecosystem context still differs.',
    bunCode: `bun test`,
    nodeCode: `node --test`,
    explanation: 'The command shapes look similarly simple, but the practical difference is ecosystem center of gravity. Node projects may still standardize on Jest or Vitest. Bun tries to make the built-in test runner feel like the obvious default inside the same integrated toolkit.',
  },
  {
    id: 'ex-server',
    title: 'Start a Tiny HTTP Server',
    summary: 'Both can expose an HTTP endpoint with very little code, but the runtime feel is different.',
    bunCode: `Bun.serve({
  port: 3000,
  fetch() {
    return new Response('hello from bun')
  },
})`,
    nodeCode: `import http from 'node:http'

http.createServer((_req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end('hello from node')
}).listen(3000)`,
    explanation: 'Bun exposes a modern fetch-style server primitive directly. Node exposes mature low-level HTTP primitives and expects many apps to use a framework or a preferred abstraction on top.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'Node compatibility',
    definition: 'The extent to which a runtime behaves like Node.js with respect to APIs, module resolution, package behavior, and ecosystem assumptions.',
  },
  {
    term: 'All-in-one toolkit',
    definition: 'A platform that combines runtime, package manager, test runner, bundler, and related developer tooling into one integrated product.',
  },
  {
    term: 'CommonJS',
    definition: 'The older Node.js module format based on require and module.exports.',
  },
  {
    term: 'ECMAScript modules',
    definition: 'The standardized JavaScript module system based on import and export syntax.',
  },
  {
    term: 'npm ecosystem',
    definition: 'The large universe of JavaScript packages and surrounding conventions historically centered on Node.js.',
  },
  {
    term: 'bun install',
    definition: 'Buns built-in dependency installation command, used as part of its integrated package-manager workflow.',
  },
  {
    term: 'bun test',
    definition: 'Buns built-in test runner command for executing tests without requiring a separate test framework by default.',
  },
  {
    term: 'node --test',
    definition: 'Node.js built-in test runner entry point for running tests from Node core.',
  },
  {
    term: 'Worker thread',
    definition: 'A Node.js concurrency primitive for running JavaScript on additional threads within one process.',
  },
  {
    term: 'Transpilation',
    definition: 'The transformation of source code such as TypeScript or JSX into executable JavaScript.',
  },
  {
    term: 'Toolchain sprawl',
    definition: 'The tendency of a project to accumulate many separate development tools for tasks such as install, test, run, and build.',
  },
  {
    term: 'Runtime novelty',
    definition: 'The operational and compatibility risk that comes from adopting a newer execution environment with less historical ecosystem validation.',
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
    { id: 'core-runtime-shape', label: 'Runtime and Tooling' },
    { id: 'core-compatibility', label: 'Compatibility' },
    { id: 'core-modules', label: 'Modules and Packaging' },
    { id: 'core-typescript', label: 'TypeScript and JSX' },
    { id: 'core-package-manager', label: 'Package Management' },
    { id: 'core-testing', label: 'Testing' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-http', label: 'HTTP and Web Runtime' },
    { id: 'core-workers', label: 'Concurrency' },
    { id: 'core-native', label: 'Native Modules and Edge Cases' },
    { id: 'core-deploy', label: 'Deployment and Operations' },
    { id: 'core-ecosystem', label: 'Ecosystem and Hiring' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Decision Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const pageStyles = `
.bun-node-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.bun-node-help-window {
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

.bun-node-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.bun-node-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}
.bun-node-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.bun-node-help-control {
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
  font-family: inherit;
}

.bun-node-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  flex-wrap: wrap;
}

.bun-node-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.bun-node-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.bun-node-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.bun-node-help-toc {
  overflow: auto;
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
}

.bun-node-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.bun-node-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.bun-node-help-toc-list li {
  margin: 0 0 8px;
}

.bun-node-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.bun-node-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.bun-node-help-doc-title {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
}

.bun-node-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 700;
}

.bun-node-help-section {
  margin: 0 0 20px;
}

.bun-node-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.bun-node-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.bun-node-help-content p,
.bun-node-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.bun-node-help-content p {
  margin: 0 0 10px;
}

.bun-node-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.bun-node-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.bun-node-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  background: #f4f4f4;
}

.bun-node-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .bun-node-help-main {
    grid-template-columns: 1fr;
  }

  .bun-node-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .bun-node-help-title {
    position: static;
    transform: none;
    margin: 0 auto;
    padding-left: 18px;
  }
}
`

export default function BunVsNodePage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'
    document.title = `${pageTitle} (${activeTabLabel})`
  }, [activeTab, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: pageTitle,
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

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: true })
  }

  return (
    <div className="bun-node-help-page">
      <style>{pageStyles}</style>
      <div className="bun-node-help-window" role="presentation">
        <header className="bun-node-help-titlebar">
          <span className="bun-node-help-title">{pageTitle}</span>
          <div className="bun-node-help-controls">
            <button className="bun-node-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="bun-node-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="bun-node-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`bun-node-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bun-node-help-main">
          <aside className="bun-node-help-toc" aria-label="Table of contents">
            <h2 className="bun-node-help-toc-title">Contents</h2>
            <ul className="bun-node-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="bun-node-help-content">
            <h1 className="bun-node-help-doc-title">{pageTitle}</h1>
            <p className="bun-node-help-doc-subtitle">{pageSubtitle}</p>
            <p>
              This page compares Bun and Node.js as real runtime choices rather than as benchmark slogans.
              The point is to make the practical tradeoffs explicit: compatibility, module semantics, TypeScript ergonomics,
              package management, testing, performance, deployment, ecosystem trust, and where Bun is genuinely higher leverage
              versus where Node.js remains the safer long-term default.
            </p>

            {activeTab === 'big-picture' && (
              <>
                {bigPictureSections.map((section, index) => (
                  <section key={section.id} id={section.id} className="bun-node-help-section">
                    <h2 className="bun-node-help-heading">{section.title}</h2>
                    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets && (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {index < bigPictureSections.length - 1 && <hr className="bun-node-help-divider" />}
                  </section>
                ))}
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental" className="bun-node-help-section">
                  <h2 className="bun-node-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                {coreSections.map((section) => (
                  <section key={section.id} id={section.id} className="bun-node-help-section">
                    <h2 className="bun-node-help-heading">{section.title}</h2>
                    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
                  <section key={example.id} id={example.id} className="bun-node-help-section">
                    <h2 className="bun-node-help-heading">{example.title}</h2>
                    <p>{example.summary}</p>
                    <h3 className="bun-node-help-subheading">Bun</h3>
                    <div className="bun-node-help-codebox">
                      <code>{example.bunCode.trim()}</code>
                    </div>
                    <h3 className="bun-node-help-subheading">Node.js</h3>
                    <div className="bun-node-help-codebox">
                      <code>{example.nodeCode.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="bun-node-help-section">
                <h2 className="bun-node-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
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
