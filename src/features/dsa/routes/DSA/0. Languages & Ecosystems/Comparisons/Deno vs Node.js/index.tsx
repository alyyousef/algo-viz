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
  denoCode: string
  nodeCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'Deno vs Node.js'
const pageSubtitle =
  'Comparing a modern secure-by-default JavaScript runtime with the long-established standard server-side JavaScript runtime.'
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
      'Deno and Node.js both run JavaScript and TypeScript outside the browser, but they represent two different generations of server-side JavaScript design. Node.js is the long-established standard with overwhelming ecosystem gravity, broad platform support, and operational trust earned over many years. Deno is a newer runtime created by Node original creator Ryan Dahl and is designed to rethink parts of the server-side JavaScript experience: secure-by-default permissions, built-in TypeScript support, web-standard APIs, URL-first module ideas, and a more integrated developer toolchain.',
      'A useful shorthand is this: Node.js is the ecosystem baseline that most packages, frameworks, deployment assumptions, and organizations already understand. Deno is the modern redesign that tries to make JavaScript runtime ergonomics cleaner, safer, and more coherent without inheriting every historical tradeoff of Node. That means the decision is not simply about which runtime can execute code. It is about compatibility expectations, security posture, toolchain philosophy, and how much platform novelty the team is willing to absorb.',
      'The comparison matters because Deno is no longer just a provocative alternative. It now has npm compatibility, Node compatibility work, first-class permissions, a built-in test runner, formatter, linter, task runner, and Deno Deploy adjacent ecosystem value. At the same time, Node keeps evolving too, with modern module support, a built-in test runner, and continued dominance in the npm world. So the real question is not whether Deno is interesting. The real question is where Deno is genuinely higher leverage than Node and where Node remains the more pragmatic default.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'Node.js historically behaves like a runtime platform first and a toolkit second. It provides the execution environment, core APIs, module system behavior, and process model that the backend JavaScript ecosystem grew around. Tooling such as formatting, linting, testing, bundling, and package-management conventions has traditionally lived around Node rather than inside Node. That makes Node highly composable, but it also means ordinary projects often depend on a larger surrounding stack of tools and conventions.',
      'Deno behaves more like an integrated runtime platform. Its docs emphasize built-in capabilities such as `deno test`, `deno fmt`, `deno lint`, task running, permissions, and first-class TypeScript handling. It also strongly leans on web-standard APIs and on the idea that JavaScript outside the browser should not automatically have unrestricted file system, network, and environment access. Deno is not merely trying to run JavaScript. It is trying to make the development and execution model cleaner by default.',
      'This is why Node often feels ecosystem-defined, while Deno often feels product-defined. Node is the platform everything adapted to. Deno is the platform that tries to present a more opinionated and safer default set of answers.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'Node.js is strongest for production systems where compatibility certainty, package breadth, deployment familiarity, and organizational trust matter most. It is especially strong for large existing codebases, enterprise systems, infrastructure tooling, JavaScript libraries intended for broad downstream use, server frameworks deeply tied to npm conventions, and teams that cannot tolerate runtime-level surprises.',
      'Deno is strongest for greenfield applications, internal tools, scripts, edge-oriented services, TypeScript-first backends, and teams that care about security boundaries, web-standard runtime APIs, and a cleaner built-in toolchain. It is especially attractive when the team wants fewer moving parts for running, formatting, linting, testing, and task automation, and when the dependency graph is either simple or already validated against Deno compatibility expectations.',
      'If the central question is Which runtime should maximize ecosystem certainty and the broadest compatibility, Node.js still wins. If the central question is Which runtime offers a cleaner secure-by-default experience and a more integrated modern toolchain, Deno becomes much more compelling.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose Node.js when ecosystem breadth and compatibility certainty matter most.',
      'Choose Deno when secure-by-default permissions and an integrated toolchain matter most.',
      'Choose Node.js when you are shipping libraries or large existing systems into the widest possible JavaScript backend environment.',
      'Choose Deno when you want a TypeScript-first, batteries-included runtime with modern web-style APIs and clear permission boundaries.',
      'If the team is really debating compatibility safety versus cleaner runtime design, that is the real decision boundary.',
    ],
  },
]

const mentalModels = [
  {
    title: 'Node.js is the ecosystem baseline',
    detail:
      'Most backend JavaScript libraries, deployment expectations, tutorials, and operational habits still target Node first.',
  },
  {
    title: 'Deno is a redesign, not just another runtime',
    detail:
      'It tries to improve security, module ergonomics, and everyday tooling rather than simply mirroring Node history.',
  },
  {
    title: 'Permissions are a core product idea in Deno',
    detail:
      'Deno intentionally requires explicit grants for file system, network, environment, and other sensitive capabilities.',
  },
  {
    title: 'Compatibility is the main strategic question',
    detail:
      'Deno has made major progress on npm and Node compatibility, but Node remains the reference environment most packages were built against.',
  },
  {
    title: 'Node is composable; Deno is integrated',
    detail:
      'Node expects more surrounding tools and conventions. Deno bakes more of the daily workflow into the runtime itself.',
  },
  {
    title: 'TypeScript ergonomics differ more than raw capability',
    detail:
      'Both can support TypeScript, but Deno treats it as a built-in expectation while Node usually reaches it through supporting tools.',
  },
  {
    title: 'Web-standard APIs matter more in Deno',
    detail:
      'Deno strongly emphasizes browser-like and web-standard APIs, while Node evolved from its own server-side API lineage and has only gradually converged with modern web APIs.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-runtime-shape',
    title: 'Overall Runtime and Tooling Shape',
    paragraphs: [
      'Node.js is primarily a runtime platform around which an enormous ecosystem has formed. That ecosystem supplies package managers, testing stacks, formatting tools, transpilation workflows, bundlers, and many other pieces of the normal JavaScript developer experience. This gives teams flexibility, but it also means even simple projects often accumulate several adjacent tools before the workflow feels complete.',
      'Deno presents itself more as a coherent runtime platform with built-in everyday tooling. The docs explicitly document commands for running code, formatting, linting, testing, and tasks. That changes the experience immediately. A Deno project often feels like one product with several well-integrated capabilities instead of one runtime plus a pile of external conventions.',
      'The practical difference is not only convenience. It is also operational clarity. Node lets teams choose their own stack. Deno gives teams a stronger default stack. If the organization values standardization by explicit choice, Node can be more comfortable. If the organization values fewer moving parts by default, Deno can feel cleaner.',
    ],
  },
  {
    id: 'core-security',
    title: 'Security Model and Permissions',
    paragraphs: [
      'Deno is famous for being secure by default, and this is not just branding. The Deno permissions documentation makes clear that code does not automatically receive access to the file system, network, environment variables, subprocesses, or other sensitive capabilities. The process must be launched with explicit permission flags or interactive grants. This is one of Deno most distinctive design choices because it pushes capability boundaries into the normal development workflow.',
      'Node.js does not operate that way by default. A Node process typically has the ordinary authority of the user or environment running it unless external sandboxing or operating-system controls are applied. That is not unusual for server runtimes, but it means security boundaries are usually handled outside the runtime rather than enforced as part of the runtime programming model itself.',
      'This matters most in scripting, internal tooling, untrusted dependency concerns, and environments where least-privilege execution is valuable. Deno gives teams a more explicit security posture at the runtime boundary. Node expects the surrounding platform, container, host, or organization to supply that control in other ways.',
    ],
  },
  {
    id: 'core-compatibility',
    title: 'Node Compatibility and Ecosystem Risk',
    paragraphs: [
      'Node.js is the compatibility target. That statement sounds obvious, but it is the most important strategic fact in the comparison. Most npm packages, framework assumptions, loaders, dev tools, and deployment guides were built around Node semantics first. If your code runs on Node, you are aligned with the environment that the ecosystem historically expects.',
      'Deno has worked aggressively on Node and npm compatibility, and that has changed the adoption conversation materially. Deno now supports npm packages and documents Node compatibility behavior explicitly. That makes incremental adoption much more realistic than it was in Deno early years. But the compatibility question is still workload-specific. You still need to care about package scripts, native add-ons, loaders, transitive dependencies, build assumptions, and the long tail of ecosystem edge cases.',
      'So the safer framing is this: Node is the reference environment. Deno is increasingly capable and often good enough, but the cost-benefit trade depends on the exact dependency graph and runtime assumptions of your application rather than on abstract enthusiasm alone.',
    ],
  },
  {
    id: 'core-modules',
    title: 'Modules, Imports, and Packaging Semantics',
    paragraphs: [
      'Node.js has a mature but complicated module story shaped by CommonJS, ECMAScript modules, package exports, file extensions, and historical compatibility constraints. This flexibility is powerful, but it also produces some of the most confusing behavior in the JavaScript ecosystem because module resolution rules depend on context, package metadata, and compatibility layers.',
      'Deno originally became known for URL-based imports and a cleaner module story that felt closer to the web. Over time it has also embraced npm support and package.json compatibility so that it can participate more directly in real-world JavaScript projects. That means Deno module ergonomics now balance two goals: preserving a cleaner import philosophy while also accommodating the practical realities of the Node ecosystem.',
      'If the team wants the least surprising behavior for the widest range of npm packages, Node remains safer because the ecosystem was born there. If the team wants a cleaner conceptual model and is willing to work within Deno conventions, Deno can feel substantially nicer, especially in greenfield projects.',
    ],
  },
  {
    id: 'core-typescript',
    title: 'TypeScript, JSX, and Zero-Config Ergonomics',
    paragraphs: [
      'Deno treats TypeScript as a first-class expectation. This is one of its clearest product advantages. A Deno project can often run TypeScript directly with very little ceremony, and this dramatically reduces the feeling that you need extra execution shims or custom dev scripts before a project becomes pleasant to work with.',
      'Node.js can absolutely power TypeScript systems, but it traditionally does so through surrounding tools such as TypeScript itself, tsx, ts-node, a bundler, or a compile step. This is extremely flexible and deeply proven, but it also means TypeScript in Node often feels like an ecosystem-assembled workflow instead of a built-in runtime expectation.',
      'The real difference is not capability. It is default ergonomics. If the team wants TypeScript to feel natural without first making several toolchain decisions, Deno is attractive. If the team wants every part of the TypeScript toolchain to be separately chosen and standardized, Node is often more comfortable.',
    ],
  },
  {
    id: 'core-npm',
    title: 'npm, Package Management, and Dependency Workflow',
    paragraphs: [
      'Node.js historically lives inside the npm ecosystem and is commonly paired with npm, pnpm, or Yarn. This is a major strength because organizations can choose the exact dependency-management workflows that fit their monorepo, CI, lockfile, and caching strategies. It is also why Node can feel highly adaptable inside large engineering organizations.',
      'Deno supports npm packages and package.json, but it also keeps a stronger integrated product identity around dependency management and execution. The point is not simply that Deno can install packages. The point is that Deno tries to reduce the distinction between runtime and package workflow so the developer does not immediately need a larger outer toolchain.',
      'This is another recurring pattern in the comparison. Node offers maximum ecosystem alignment. Deno offers a more integrated default experience. The right answer depends on whether the organization benefits more from open-ended package-management choice or from a simpler built-in workflow.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Story and Daily Developer Loop',
    paragraphs: [
      'Deno includes a built-in test runner with `deno test`, and it also includes formatting and linting commands as part of the same overall toolchain. This means a new Deno project can often reach a usable local workflow without first choosing Jest or Vitest, a formatter, and a linter separately. For smaller teams and internal tools, that is a meaningful reduction in setup burden.',
      'Node.js also has a built-in test runner now, which narrows one of the historical gaps between Node core and the surrounding ecosystem. But in practice many Node codebases still rely on established choices such as Jest or Vitest because they are deeply embedded in frameworks, mocking patterns, frontend workflows, and organizational conventions.',
      'So the command-line comparison can look deceptively similar while the ecosystem reality remains different. Node offers more convention diversity and backward compatibility. Deno offers a more opinionated and lighter-feeling default workflow if your project fits comfortably inside it.',
    ],
  },
  {
    id: 'core-web-apis',
    title: 'Web-Standard APIs and Runtime Feel',
    paragraphs: [
      'Deno strongly emphasizes web-standard APIs. This is visible in things like `fetch`, `Request`, `Response`, and the general sense that the runtime should feel closer to the browser and to modern edge-runtime conventions. For many developers this makes Deno feel conceptually cleaner because the same API vocabulary appears across frontend and backend code more often.',
      'Node.js has increasingly adopted many modern web APIs too, but it still carries the weight of its own long server-side lineage. Much of Node developer experience remains shaped by core modules such as `fs`, `path`, `stream`, `http`, and the long history of Node-specific module and package behavior. That is not bad. It is simply the environment the ecosystem learned to build around.',
      'This matters most for newer projects and for teams who want one mental model that spans browser-like and server-like JavaScript. Deno often feels more aligned with that goal. Node often feels more aligned with legacy reality and the broadest production compatibility.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance, Startup, and Workflow Speed',
    paragraphs: [
      'Deno is often associated with a lighter, cleaner execution experience, especially for scripts, tooling, TypeScript-first workflows, and projects that benefit from a smaller number of moving pieces. Faster startup and fewer tool handoffs can create real day-to-day leverage even when the absolute runtime throughput difference is not the deciding factor.',
      'Node.js remains highly capable in production and powers an enormous amount of high-throughput backend software. In many real systems, the decisive cost is not the runtime itself but the surrounding database, network, cache, or architecture choices. Node also benefits from years of performance tuning, profiling tools, and operational knowledge across many environments.',
      'Performance therefore needs to be framed correctly. Deno often improves developer workflow performance and can be very strong operationally for the right application shape. Node often wins on production familiarity and on the certainty that performance characteristics are already deeply understood by the ecosystem.',
    ],
  },
  {
    id: 'core-http',
    title: 'HTTP Servers, Services, and Scripting Fit',
    paragraphs: [
      'Node.js can host everything from tiny scripts to large backend platforms, but the experience often depends on which framework or surrounding conventions the team chooses. Express, Fastify, NestJS, Next.js servers, CLIs, build tooling, and infrastructure utilities all sit comfortably on Node because Node is the assumed backend substrate for so much of JavaScript.',
      'Deno is very attractive for scripts, small services, edge-style handlers, and TypeScript-heavy internal tools because the runtime makes those workflows feel unusually direct. A Deno script can often be run, tested, linted, and permission-scoped with less ceremony than an equivalent Node workflow. That makes Deno especially appealing when the project wants to feel like one coherent runtime environment rather than a runtime plus a stack of helpers.',
      'In other words, Node is the broader platform substrate. Deno is often the nicer direct experience for bounded modern workloads that fit its assumptions well.',
    ],
  },
  {
    id: 'core-deploy',
    title: 'Deployment, Hosting, and Organizational Risk',
    paragraphs: [
      'Node.js wins decisively on ambient deployment support. Containers, build images, hosting platforms, PaaS systems, CI vendors, internal developer platforms, monitoring agents, enterprise docs, and organizational assumptions almost always include Node support by default. This matters because many runtime decisions in real organizations are constrained less by source code than by platform and operations habits.',
      'Deno deployment is increasingly viable, especially in containerized environments and in Deno-native or edge-adjacent hosting contexts, but it still represents more of an explicit platform choice. The question is not only Can it run. Usually it can. The question is whether the surrounding organization, CI, support model, and observability stack already know what to do with it.',
      'This is why Node keeps winning conservative decisions. Even when Deno is technically appealing, the broader deployment and support surface may already be optimized around Node. Deno wins when the organization is willing to buy some novelty in exchange for cleaner developer ergonomics and runtime design.',
    ],
  },
  {
    id: 'core-edge-cases',
    title: 'Native Add-ons, Legacy Assumptions, and Edge Cases',
    paragraphs: [
      'Node.js is still the least surprising environment for packages with old assumptions, unusual loaders, native add-ons, and complicated build or postinstall behavior. That is because the ecosystem grew there first. If your dependency graph is messy, old, or infrastructure-heavy, Node gives you the best chance that every strange edge case is at least documented somewhere.',
      'Deno may handle a large share of modern application dependencies just fine, especially with npm and Node compatibility improvements, but the real risk is usually not obvious userland code. The real risk is the long tail of transitive dependencies, scripts, loaders, bindings, and package behavior that no one validated outside Node. This becomes especially important in mature enterprise applications rather than in greenfield services.',
      'The practical rule is simple: the more standard and app-shaped the workload is, the easier it is to consider Deno. The more weird, old, native, or deeply npm-dependent the workload is, the more Node remains the safer answer.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Gravity, Hiring, and Team Familiarity',
    paragraphs: [
      'Node.js benefits from overwhelming ecosystem gravity. Most JavaScript backend engineers have touched it. Most package authors target it. Most tutorials, deployment guides, and company conventions assume it. This reduces onboarding cost and lowers organizational surprise. When something goes wrong, there is a large amount of prior art available.',
      'Deno has strong appeal because it addresses real frustrations: too many tools, historically weak runtime security boundaries, awkward TypeScript workflows, and server-side APIs that feel disconnected from the broader web platform. For smaller teams or teams that value cleaner design highly, that appeal is rational. But appeal is not the same thing as universal organizational readiness.',
      'This often becomes the deciding factor. Mature organizations may need the environment with the lowest surprise. Smaller teams or teams doing greenfield work may rationally value the runtime with the better day-to-day experience. Node is usually the safer labor market and support-market choice. Deno is often the more elegant product choice when the team can afford it.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'Node.js can feel heavier in practice not because the runtime itself is heavy, but because ordinary Node projects often inherit a wider toolchain than teams really want. Package-manager decisions, test-runner choices, transpilation paths, linting stacks, formatter choices, and execution helpers can make straightforward projects feel more infrastructural than they need to be.',
      'Deno can fail in the opposite direction. The integrated experience is attractive enough that teams may overestimate how easy migration or broad ecosystem parity will be. The failure mode is not that Deno lacks design quality. The failure mode is adopting it before validating the real dependency graph, deployment expectations, or organizational support model that production work will require.',
      'So the tradeoff is not old versus new. It is ecosystem certainty and ambient support versus cleaner defaults, explicit permissions, and a more integrated runtime experience.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose Node.js when broad npm compatibility and least organizational surprise matter most.',
      'Choose Deno when permissions, built-in tooling, and TypeScript-first ergonomics matter most.',
      'Prefer Node.js for libraries, mature enterprise systems, and workloads with unknown ecosystem edge cases.',
      'Prefer Deno for greenfield services, scripts, internal tools, and edge-style workloads where the dependency graph is already understood.',
      'If your team wants a cleaner runtime model more than it wants maximum ecosystem conservatism, Deno deserves serious weight.',
      'If your team cannot tolerate runtime-level compatibility risk, Node.js remains the safer default.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-run-ts',
    title: 'Run a TypeScript Script',
    summary:
      'Both runtimes can execute TypeScript-oriented workflows, but one treats it as a built-in expectation.',
    denoCode: `deno run ./src/script.ts`,
    nodeCode: `node --import tsx ./src/script.ts`,
    explanation:
      'Deno treats direct TypeScript execution as a normal part of the runtime experience. Node usually reaches the same outcome through an additional tool such as tsx or a build step.',
  },
  {
    id: 'ex-permissions',
    title: 'Read a Local File',
    summary: 'The security model becomes obvious the moment code needs sensitive capabilities.',
    denoCode: `deno run --allow-read=./config.json app.ts`,
    nodeCode: `node app.js`,
    explanation:
      'Deno requires explicit permission to read the file. A normal Node process inherits ambient authority from the environment unless external sandboxing is applied.',
  },
  {
    id: 'ex-test',
    title: 'Run Tests',
    summary:
      'Both runtimes have built-in test commands, but their surrounding ecosystem culture is still different.',
    denoCode: `deno test`,
    nodeCode: `node --test`,
    explanation:
      'Deno test is part of a broader integrated workflow with linting and formatting nearby. Node has a built-in test runner too, but many teams still standardize on separate tools such as Jest or Vitest.',
  },
  {
    id: 'ex-server',
    title: 'Start a Tiny HTTP Handler',
    summary: 'The runtime feel differs even when the code is small.',
    denoCode: `Deno.serve(() => new Response('hello from deno'))`,
    nodeCode: `import http from 'node:http'

http.createServer((_req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end('hello from node')
}).listen(3000)`,
    explanation:
      'Deno leans toward web-standard request and response primitives. Node exposes mature server-side primitives and expects many apps to use a preferred framework or abstraction on top.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'Secure by default',
    definition:
      'A runtime model where sensitive capabilities are denied unless explicitly granted.',
  },
  {
    term: 'Permission flag',
    definition:
      'A Deno command-line option such as `--allow-read` or `--allow-net` used to grant specific capabilities.',
  },
  {
    term: 'npm compatibility',
    definition:
      'The extent to which a runtime can use packages and conventions from the npm ecosystem.',
  },
  {
    term: 'Node compatibility',
    definition:
      'The extent to which a runtime behaves like Node.js for APIs, packages, and ecosystem expectations.',
  },
  {
    term: 'CommonJS',
    definition: 'The older Node.js module format based on `require` and `module.exports`.',
  },
  {
    term: 'ECMAScript modules',
    definition: 'The standardized JavaScript module system based on `import` and `export` syntax.',
  },
  {
    term: 'Ambient authority',
    definition:
      'A security situation where a process automatically has the full permissions of its executing environment.',
  },
  {
    term: 'deno test',
    definition: 'Deno built-in command for running tests.',
  },
  {
    term: 'deno fmt',
    definition: 'Deno built-in command for formatting source files.',
  },
  {
    term: 'deno lint',
    definition: 'Deno built-in command for linting source files.',
  },
  {
    term: 'node --test',
    definition: 'Node.js built-in test runner entry point.',
  },
  {
    term: 'Web-standard APIs',
    definition:
      'Browser-like APIs such as `fetch`, `Request`, and `Response` used consistently across environments.',
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
    { id: 'core-security', label: 'Security and Permissions' },
    { id: 'core-compatibility', label: 'Compatibility' },
    { id: 'core-modules', label: 'Modules and Packaging' },
    { id: 'core-typescript', label: 'TypeScript and JSX' },
    { id: 'core-npm', label: 'npm and Dependencies' },
    { id: 'core-testing', label: 'Testing' },
    { id: 'core-web-apis', label: 'Web APIs' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-http', label: 'HTTP and Scripts' },
    { id: 'core-deploy', label: 'Deployment and Operations' },
    { id: 'core-edge-cases', label: 'Edge Cases' },
    { id: 'core-ecosystem', label: 'Ecosystem and Hiring' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Decision Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function DenoVsNodePage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Deno Vs Node Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Deno Vs Node Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="deno-node-help-doc-subtitle">{pageSubtitle}</p>
      <p>
        This page compares Deno and Node.js as real runtime choices rather than as branding
        opposites. The point is to make the practical tradeoffs explicit: security model, module
        semantics, TypeScript ergonomics, npm compatibility, built-in tooling, deployment
        assumptions, ecosystem trust, and where Deno is genuinely higher leverage versus where
        Node.js remains the safer long-term default.
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
              <h3 className="bin98-subheading">Deno</h3>
              <div className="bin98-codebox">
                <code>{example.denoCode.trim()}</code>
              </div>
              <h3 className="bin98-subheading">Node.js</h3>
              <div className="bin98-codebox">
                <code>{example.nodeCode.trim()}</code>
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
