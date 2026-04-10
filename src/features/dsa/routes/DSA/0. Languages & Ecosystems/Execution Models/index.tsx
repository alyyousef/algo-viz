import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'
import { slugifySegment } from '@/features/dsa/utils/slug'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const EXECUTION_MODELS_BASE_ROUTE = '/dsa/0-languages-and-ecosystems/execution-models'

const overviewSections = [
  {
    title: 'What this subsection is',
    body: 'Execution Models explains how source code becomes running behavior. It covers the path from source text to runtime instructions, including ahead-of-time compilation, interpretation, bytecode virtual machines, JIT compilation, loaders, linkers, and runtime services. The central point is that two languages with similar syntax can behave very differently if their execution models differ.',
  },
  {
    title: 'Why execution model matters',
    body: 'Performance, startup time, portability, debuggability, binary size, deployment shape, and tooling ergonomics are all heavily influenced by execution model. The question is not only "what language is this?" but also "when is work being done, what artifact is shipped, and what runtime machinery is present when the program runs?"',
  },
  {
    title: 'What this subsection teaches',
    body: 'This subsection teaches how to reason about build-time work versus runtime work. Compiled languages front-load parsing, type checking, optimization, and layout decisions into the toolchain. Interpreted and VM-based systems shift more behavior into the runtime, trading some predictability for flexibility, interactivity, portability, and dynamic capabilities.',
  },
  {
    title: 'How to read it',
    body: 'Read each page as a model of cost placement. Ask where parsing happens, where optimization happens, whether code ships as source, bytecode, or native binary, what the runtime manages, and how much of the final behavior depends on build flags versus runtime state. Those questions explain most of the important tradeoffs.',
  },
]

const whyItMatters = [
  'It explains why some tools have long builds but predictable production performance.',
  'It explains why some runtimes are highly interactive and portable but pay execution overhead.',
  'It clarifies why startup latency, warmup behavior, and memory use differ across ecosystems.',
  'It connects compiler and runtime design to debugging, profiling, packaging, and deployment.',
  'It helps you choose a stack based on workload shape instead of treating all languages as equivalent once the code is written.',
]

const historicalContext = [
  {
    title: 'Compilation became the path to machine-scale performance',
    detail:
      'Early compiled languages proved that high-level notation could still produce efficient native code. That changed programming from manual instruction management into a process where the compiler became a trusted optimizer and translator.',
  },
  {
    title: 'Interpretation enabled rapid iteration and portability',
    detail:
      'Interactive systems and scripting languages showed that not every workload needed a heavy compile-link-run cycle. Fast feedback loops, dynamic loading, and portable runtimes made interpreted execution valuable for automation, experimentation, and client-side scripting.',
  },
  {
    title: 'Virtual machines and bytecode blurred the boundary',
    detail:
      'Many modern ecosystems do not fit cleanly into a simple compiled-versus-interpreted binary. Bytecode VMs, managed runtimes, and JIT tiers allow source to remain portable while still generating native code for hot paths.',
  },
  {
    title: 'Modern systems are increasingly hybrid',
    detail:
      'AOT compilation, JIT specialization, bytecode interpretation, native extensions, and WebAssembly now coexist. Real systems often combine several execution techniques rather than living in one pure category.',
  },
]

const sectionSurvey = [
  {
    name: 'Compiled Languages',
    summary:
      'This page focuses on ahead-of-time compilation, optimization pipelines, linking, build artifacts, CPU targeting, and how compiled binaries trade flexibility for predictability and control.',
  },
  {
    name: 'Interpreted Languages',
    summary:
      'This page focuses on interpreter loops, bytecode VMs, runtime services, JIT acceleration, dynamic dispatch, and why interactive systems often optimize for feedback loops and flexibility.',
  },
]

const executionThemes = [
  {
    title: 'Cost placement defines the developer experience',
    body: 'One of the most important differences between execution models is when they spend effort. Some systems invest heavily at build time so runtime stays lean and predictable. Others delay work until execution so programs remain flexible, inspectable, and easy to iterate on.',
  },
  {
    title: 'Artifacts shape deployment',
    body: 'A native binary, a bytecode bundle, a script package, and a browser-delivered source payload all imply different packaging, distribution, compatibility, and observability stories. The execution model determines what artifact a team ships and what has to exist on the target machine.',
  },
  {
    title: 'Runtime services are real architecture',
    body: 'Garbage collection, JIT compilers, object models, module loaders, schedulers, and FFI layers are not implementation trivia. They materially affect memory behavior, tail latency, startup time, debugging, and system integration.',
  },
  {
    title: 'The compiled-versus-interpreted dichotomy is incomplete',
    body: 'Many modern stacks mix techniques. Java compiles to bytecode and then JITs. Python interpreters can emit bytecode and call native extensions. JavaScript engines interpret, baseline-compile, and optimize. The important question is the actual pipeline, not the marketing label.',
  },
]

const keyTakeaways = [
  'Execution model is a first-class property of a language ecosystem, not a footnote.',
  'Build-time work and runtime work trade off against each other in speed, flexibility, and tooling behavior.',
  'Compiled and interpreted systems often exist on a spectrum rather than as pure opposites.',
  'Deployment artifacts, runtime services, and warmup characteristics are central to stack behavior.',
  'Understanding execution model makes performance, packaging, and debugging tradeoffs far easier to predict.',
]

const topicSignals = [
  {
    title: 'Choose this lens when runtime behavior is surprising',
    body: 'If a team is asking why startup is slow, why warmup changes latency over time, why debugging symbols matter, or why production behavior differs from local execution, the answer is often in the execution model rather than in the surface syntax of the language.',
  },
  {
    title: 'Choose this lens when packaging and deployment differ by stack',
    body: 'If one ecosystem ships a native binary, another ships bytecode plus a VM, and another ships source or a bundled script, you are in execution-model territory. Those artifact differences drive installation, portability, and runtime dependency behavior.',
  },
  {
    title: 'Choose this lens when toolchain stages dominate workflow',
    body: 'Long builds, incremental recompilation, linker behavior, transpilation pipelines, and runtime loaders all indicate that the important question is how the code becomes executable, not just what the code looks like.',
  },
  {
    title: 'Choose this lens when dynamic flexibility is part of the product',
    body: 'If runtime reflection, eval, hot patching, interactive shells, notebooks, or dynamic module loading are central, then interpretation and VM services are relevant design factors rather than incidental implementation details.',
  },
]

const coreFoundations = [
  {
    title: 'Source, intermediate form, and final artifact',
    body: 'Most systems move through multiple representations. Source may become an AST, typed IR, bytecode, machine code, a bundle, or a container image. Understanding those stages explains what can be optimized early, what remains dynamic, and what the deployable unit actually contains.',
  },
  {
    title: 'Build-time versus runtime work',
    body: 'AOT compilation does more analysis before execution. Interpreted and managed environments move more behavior into the runtime. That division affects feedback loops, startup cost, hot-path performance, and how much behavior depends on runtime state such as shapes, profiles, or dynamic imports.',
  },
  {
    title: 'Runtime services',
    body: 'Execution models often include more than instruction dispatch. They can include memory management, module resolution, thread scheduling, event loops, dynamic dispatch caches, reflection metadata, and JIT tiers. These services are part of the cost model and the debugging model.',
  },
  {
    title: 'Portability and target dependence',
    body: 'Native binaries can be highly optimized for one architecture but less portable. Bytecode and scripts can run across many environments provided the runtime exists. The execution model therefore changes how teams think about compatibility, cross-compilation, and delivery targets.',
  },
  {
    title: 'Warmup and steady state',
    body: 'Some systems are nearly performance-stable from startup. Others get faster after profiling and JIT optimization. Knowing whether the workload is short-lived, interactive, or long-running changes which execution model is preferable.',
  },
]

const tradeoffThemes = [
  {
    title: 'Predictability versus flexibility',
    body: 'Compiled systems often produce stable artifacts whose behavior depends strongly on build configuration. Interpreted and managed systems often enable dynamic code loading, reflection, or runtime adaptation, but at the cost of extra indirection and less immediate predictability.',
  },
  {
    title: 'Startup speed versus peak optimization',
    body: 'AOT systems can start quickly once the binary exists, while JIT-based systems may need warmup before reaching full speed. Some workloads care about cold start; others care about throughput over long sessions.',
  },
  {
    title: 'Toolchain complexity versus runtime complexity',
    body: 'Compilers, linkers, LTO, cross-compilation, and build caches move complexity into the build pipeline. Interpreters, VMs, GC, dynamic dispatch, and tiered JITs move complexity into execution. Every stack pays complexity somewhere.',
  },
  {
    title: 'Portability versus specialization',
    body: 'Portable artifacts are easier to distribute broadly, but target-specific binaries can exploit hardware capabilities more aggressively. The right choice depends on device heterogeneity, deployment control, and performance goals.',
  },
  {
    title: 'Interactive iteration versus ahead-of-time assurance',
    body: 'Rapid edit-run cycles can accelerate exploration and scripting, while heavy compile-time validation can catch entire classes of errors earlier. The best trade depends on whether the workload values discovery speed or up-front guarantees more.',
  },
]

const comparisons = [
  {
    title: 'Compiled languages versus interpreted languages',
    body: 'Compiled systems push more work into the build pipeline and typically ship machine-oriented artifacts. Interpreted systems keep more intelligence in the runtime, enabling quick iteration and portability. The comparison is useful, but many modern runtimes combine both approaches.',
  },
  {
    title: 'Native binaries versus bytecode VMs',
    body: 'Native binaries optimize directly for the target machine. Bytecode VMs optimize for portability and runtime introspection, often recovering some performance through JIT tiers and adaptive optimization.',
  },
  {
    title: 'AOT versus JIT',
    body: 'AOT knows less about actual runtime profiles but produces ready-to-run artifacts. JIT sees real execution behavior and can specialize hot paths, but pays warmup, profiling, and deoptimization complexity.',
  },
  {
    title: 'Interpreter loops versus baseline compilers',
    body: 'Interpreter loops minimize compilation latency and simplify dynamic behavior. Baseline compilers generate native code quickly to reduce dispatch overhead, usually without the full sophistication of optimizing compilers.',
  },
  {
    title: 'Managed runtimes versus low-level direct control',
    body: 'Managed runtimes offer GC, metadata, and dynamic services that increase safety and ergonomics. Low-level execution models expose more of the machine directly, which can improve predictability and control while increasing engineering burden.',
  },
]

const failureModes = [
  {
    title: 'Reducing everything to "compiled is fast, interpreted is slow"',
    body: 'That rule is too crude. JITs, native extensions, bytecode VMs, I/O-bound workloads, and caching effects make real performance much more nuanced than a binary slogan suggests.',
  },
  {
    title: 'Ignoring warmup and workload duration',
    body: 'A runtime that shines in long-lived services may be poor for short-lived CLI tools or serverless functions. Execution-model decisions must match how long the program actually lives and how often it starts cold.',
  },
  {
    title: 'Forgetting build cost',
    body: 'Fast runtime performance can come with expensive compile pipelines, link steps, and CI times. Teams sometimes evaluate only production speed and ignore iteration cost for developers.',
  },
  {
    title: 'Ignoring runtime services in the cost model',
    body: 'GC pauses, module loading, reflection, dynamic dispatch, and FFI crossings are often the real source of performance and debugging surprises. They should be treated as part of the architecture, not as invisible implementation details.',
  },
  {
    title: 'Assuming the label matches the actual pipeline',
    body: 'Some ecosystems are called interpreted but emit bytecode and JIT hot paths. Others are called compiled but still depend on substantial runtime systems. You have to examine the real pipeline rather than trusting category labels.',
  },
]

const studyChecklist = [
  'Identify what artifact is shipped: source, bundle, bytecode, native binary, or some combination.',
  'Name which work happens before execution and which work is deferred to runtime.',
  'Check whether the runtime provides GC, JIT, dynamic loading, event loops, or reflection services.',
  'Match cold-start and warmup behavior to the actual workload duration.',
  'Account for build speed, packaging, portability, and debugging in addition to peak performance.',
  'Treat execution model as part of system design, not as an implementation footnote.',
]

const examples = [
  {
    id: 'exec98-example-aot',
    title: 'Example: Ahead-of-time compilation pipeline',
    area: 'Compiled Execution',
    intro:
      'A compiled toolchain spends substantial effort before the program ever runs. Parsing, type checking, optimization, register allocation, and linking all happen before the final artifact is launched.',
    whyFit:
      'This example captures the front-loaded nature of compiled execution and why the binary becomes the main deployment artifact.',
    code: `source files
  -> parser and semantic analysis
  -> intermediate representation
  -> optimization passes
  -> code generation
  -> assembler and linker
  -> native binary`,
    takeaway:
      'Compiled execution moves cost earlier so the runtime can often stay lean and predictable.',
  },
  {
    id: 'exec98-example-interpreter',
    title: 'Example: Interpreter loop and runtime services',
    area: 'Interpreted Execution',
    intro:
      'An interpreted or VM-based system keeps more activity inside the runtime. Code may be parsed into bytecode, then executed by a dispatch loop while the runtime manages objects, modules, and memory.',
    whyFit:
      'This example shows why interpreted ecosystems can be interactive and portable while still carrying runtime overhead.',
    code: `load source or bytecode
initialize runtime services
while program not finished:
  fetch next instruction
  decode operation
  execute with runtime state
  update objects, stack, and heap`,
    takeaway:
      'In interpreted systems, the runtime is an active participant in every step of execution rather than a thin loader around a binary.',
  },
  {
    id: 'exec98-example-jit',
    title: 'Example: Tiered JIT optimization',
    area: 'Hybrid Execution',
    intro:
      'Many runtimes start by interpreting or baseline-compiling code, collect runtime profiles, and then recompile hotspots into faster native code. This creates a two-phase behavior: slower cold execution and stronger steady-state performance.',
    whyFit:
      'This example demonstrates why execution models are often hybrid rather than purely compiled or purely interpreted.',
    code: `start in interpreter or baseline tier
collect profile data on hot functions
if function becomes hot:
  compile optimized native version
if runtime assumptions break:
  deoptimize and fall back`,
    takeaway:
      'JIT systems trade warmup complexity for the ability to optimize using real runtime behavior.',
  },
  {
    id: 'exec98-example-serverless',
    title: 'Example: Cold-start-sensitive workload',
    area: 'Deployment Behavior',
    intro:
      'Short-lived functions emphasize startup cost and packaging simplicity more than peak throughput after warmup. An execution model that wins in long-lived services may be the wrong choice for a function that is created and destroyed constantly.',
    whyFit:
      'This example shows why workload duration and start frequency are load-bearing variables in execution-model decisions.',
    code: `request arrives
  -> runtime or container starts
  -> code and dependencies load
  -> initialization executes
  -> handler runs
  -> environment may be torn down before warmup pays off`,
    takeaway:
      'Execution-model choice should reflect whether the system pays startup once or repeatedly.',
  },
  {
    id: 'exec98-example-browser',
    title: 'Example: Browser-delivered execution',
    area: 'Portable Runtime',
    intro:
      'Browser environments illustrate portable execution clearly. JavaScript or WebAssembly is delivered to a heterogeneous client platform, loaded by a managed runtime, and executed under strict platform constraints.',
    whyFit:
      'This example ties execution model to portability, sandboxing, and platform-provided runtime services.',
    code: `server sends script or wasm artifact
browser loads and validates asset
runtime parses or instantiates module
event loop drives execution
JIT or engine optimizations improve hot paths over time`,
    takeaway:
      'Execution model determines not only performance but also the form of portability and control the platform can offer.',
  },
]

const glossary = [
  {
    term: 'AOT',
    definition:
      'Ahead-of-time compilation, where code is compiled before execution into a deployable artifact.',
  },
  {
    term: 'Artifact',
    definition:
      'The built output that gets shipped, such as a binary, bytecode package, bundle, or script payload.',
  },
  {
    term: 'Bytecode',
    definition:
      'An intermediate instruction format executed by a virtual machine rather than directly by the CPU.',
  },
  {
    term: 'Cold start',
    definition:
      'The latency of starting a program or runtime before any warm state or optimization exists.',
  },
  {
    term: 'FFI',
    definition:
      'Foreign Function Interface, used to call code implemented in another language or runtime.',
  },
  {
    term: 'Interpreter',
    definition:
      'A runtime that executes source-derived instructions directly rather than relying solely on prebuilt native code.',
  },
  {
    term: 'JIT',
    definition: 'Just-in-time compilation performed during program execution, often on hot paths.',
  },
  {
    term: 'Linker',
    definition:
      'A tool that combines compiled units and libraries into a final executable or shared artifact.',
  },
  {
    term: 'Managed runtime',
    definition:
      'A runtime that provides services such as memory management, metadata, dynamic loading, or scheduling.',
  },
  {
    term: 'Warmup',
    definition:
      'The initial period during which a runtime gathers profile data or compiles optimized code before reaching steady-state behavior.',
  },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'exec98-overview', label: 'Overview' },
    { id: 'exec98-why', label: 'Why It Matters' },
    { id: 'exec98-history', label: 'Historical Context' },
    { id: 'exec98-survey', label: 'Section Survey' },
    { id: 'exec98-themes', label: 'Execution Themes' },
    { id: 'exec98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'exec98-signals', label: 'Topic Signals' },
    { id: 'exec98-foundations', label: 'Foundations' },
    { id: 'exec98-tradeoffs', label: 'Tradeoff Themes' },
    { id: 'exec98-compare', label: 'Compare and Contrast' },
    { id: 'exec98-failures', label: 'Failure Modes' },
    { id: 'exec98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'exec98-glossary', label: 'Terms' }],
}

function toExecutionModelRoute(name: string): string {
  return `${EXECUTION_MODELS_BASE_ROUTE}/${slugifySegment(name)}`
}

export default function ExecutionModelsPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Execution Models',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Execution Models"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Execution Models</h1>
      <p className="exec98-intro">
        This page is the overview for the Execution Models subsection inside Languages &amp;
        Ecosystems. It explains how programs move from source code to running behavior, why compiled
        and interpreted systems feel different in practice, and why modern runtimes often blend both
        approaches.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="exec98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="exec98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="exec98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="exec98-survey" className="bin98-section">
            <h2 className="bin98-heading">Section Survey</h2>
            {sectionSurvey.map((item) => (
              <div key={item.name}>
                <h3 className="bin98-subheading">{item.name}</h3>
                <p>{item.summary}</p>
                <p>
                  <Link to={toExecutionModelRoute(item.name)} className="exec98-inline-link">
                    Open {item.name}
                  </Link>
                </p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="exec98-themes" className="bin98-section">
            <h2 className="bin98-heading">Execution Themes</h2>
            {executionThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="exec98-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="exec98-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="exec98-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="exec98-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Tradeoff Themes</h2>
            {tradeoffThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="exec98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="exec98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="exec98-checklist" className="bin98-section">
            <h2 className="bin98-heading">Study Checklist</h2>
            <ul>
              {studyChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          {examples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>
                <strong>Area:</strong> {example.area}
              </p>
              <p>{example.intro}</p>
              <p>
                <strong>Why this example fits:</strong> {example.whyFit}
              </p>
              <div className="bin98-codebox">
                <code>{example.code}</code>
              </div>
              <p>
                <strong>Takeaway:</strong> {example.takeaway}
              </p>
            </section>
          ))}
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="exec98-glossary" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((entry) => (
            <p key={entry.term}>
              <strong>{entry.term}:</strong> {entry.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
