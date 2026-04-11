import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const overviewSections = [
  {
    title: 'What C# is',
    body: "C# is a modern, strongly typed, object-oriented language in the .NET ecosystem. It began as Microsoft's managed-language answer to enterprise application development, but it has expanded far beyond that role. Today it is used for backend services, desktop applications, cloud systems, games, developer tooling, cross-platform applications, and general-purpose engineering.",
  },
  {
    title: 'Why C# matters',
    body: 'C# matters because it combines several qualities that are difficult to get together in one stack: a strong static type system, a mature managed runtime, a broad standard library, excellent tooling, practical object-oriented structure, and a modern language design that has steadily absorbed functional, asynchronous, and performance-oriented features.',
  },
  {
    title: 'How to think about it',
    body: 'The most useful mental model is that C# sits at the intersection of productivity and rigor. It offers higher-level abstractions than low-level systems languages, but it is stricter and more explicit than many scripting ecosystems. It gives teams a managed environment with strong compiler guidance while still exposing serious tools for performance, concurrency, and large-system design.',
  },
  {
    title: 'Where it fits best',
    body: 'C# is especially strong in large application codebases where maintainability, tooling quality, clear contracts, and long-term evolution matter. It is often a good fit for enterprise backends, API services, internal platforms, desktop software, cloud-native systems on .NET, and game development through Unity. It can also support more performance-sensitive work than many people assume, provided the engineer understands the runtime and allocation model.',
  },
]

const whyItMatters = [
  'It gives teams strong static tooling without giving up runtime productivity.',
  'It scales well from small internal tools to large enterprise and cloud systems.',
  'It has first-class support for asynchronous programming and service-oriented workloads.',
  'It combines object-oriented structure with newer language features such as records, pattern matching, and LINQ.',
  'It is backed by a mature runtime, library ecosystem, and professional tooling stack.',
]

const historicalContext = [
  {
    title: 'The .NET launch era',
    detail:
      "C# launched in the early 2000s alongside .NET as part of Microsoft's managed-platform strategy. The language offered a cleaner, more modern alternative for developers who wanted strong typing, garbage collection, and object-oriented structure without the complexity of unmanaged C++ application development.",
  },
  {
    title: 'Enterprise and desktop growth',
    detail:
      'As .NET matured, C# became a major language for business software, desktop applications, service backends, and developer tooling. Frameworks for web development, data access, and Windows applications made it a serious platform for long-lived systems.',
  },
  {
    title: 'Language modernization',
    detail:
      'Over time C# added generics, LINQ, async and await, pattern matching, records, nullable reference types, top-level statements, and many other features. This evolution turned it from a mostly classic object-oriented language into a broader multi-style language that still feels coherent.',
  },
  {
    title: 'Cross-platform .NET and cloud-native relevance',
    detail:
      '.NET Core and modern .NET made the ecosystem more portable and cloud-friendly. C# is now relevant not only in Windows-heavy environments but also in Linux containers, cross-platform services, serverless workloads, and modern distributed systems.',
  },
]

const bigPictureThemes = [
  {
    title: 'Managed runtime with serious engineering depth',
    body: 'C# runs on the Common Language Runtime, which provides garbage collection, JIT compilation, metadata, type safety, exception handling, and runtime services. That managed foundation improves developer productivity, but it also means serious engineers need to understand allocations, GC pressure, JIT behavior, startup cost, and async scheduling if they want predictable performance.',
  },
  {
    title: 'Object-oriented by heritage, multi-style in practice',
    body: 'C# is commonly taught as an object-oriented language, and that is historically accurate, but real-world C# now includes functional-flavored pipelines, immutable records, local functions, lambdas, pattern matching, and declarative query syntax. Good C# engineering uses the style that reduces complexity rather than forcing every design through classes alone.',
  },
  {
    title: "Tooling is one of the platform's major strengths",
    body: 'Visual Studio, Rider, Roslyn analyzers, first-party diagnostics, strong debugging, test tooling, and mature build systems are a major reason teams choose C#. The language is not just syntax plus runtime. The surrounding engineering workflow is part of the value.',
  },
  {
    title: 'The ecosystem spans many domains',
    body: 'C# is not confined to one niche. It appears in ASP.NET Core backends, desktop UI stacks, Unity game code, Azure-oriented systems, CLI tools, libraries, internal platforms, and automation. That breadth means the language is worth understanding even if one specific framework changes over time.',
  },
]

const keyTakeaways = [
  'C# is a strongly typed managed language with deep tooling and broad practical reach.',
  'Its real strengths are maintainability, ecosystem maturity, and balanced developer productivity.',
  'Understanding the CLR, GC, async model, and allocation patterns matters for serious performance work.',
  'Modern C# is not only classical OOP; it includes strong support for functional-style and declarative patterns.',
  'It is a strong choice when teams need a professional, scalable application language rather than a quick scripting layer.',
]

const topicSignals = [
  {
    title: 'Use C# when long-term maintainability matters',
    body: 'If the system will be owned by multiple engineers over years, with strong typing, refactoring safety, analyzers, and tooling support playing a major role, C# is often a compelling option.',
  },
  {
    title: 'Use C# when the workload is service-heavy or enterprise-shaped',
    body: 'Web APIs, internal platforms, business workflows, event-driven services, and large backend systems often benefit from ASP.NET Core, dependency injection patterns, configuration tooling, and mature diagnostics in the .NET stack.',
  },
  {
    title: 'Use C# when object modeling and clear contracts are central',
    body: 'If domain entities, interfaces, immutable data models, and structured service layers are a big part of the architecture, C# provides strong language support without giving up modern syntax or async ergonomics.',
  },
  {
    title: 'Use C# when you need managed productivity but not a weak type story',
    body: 'Teams that want a garbage-collected environment and rich runtime services, but do not want to lose static analysis and compile-time design guidance, often find C# a productive middle ground.',
  },
]

const coreFoundations = [
  {
    title: 'CLR and IL',
    body: 'C# source compiles into Intermediate Language that runs on the Common Language Runtime. The CLR is responsible for JIT compilation, memory management, metadata handling, exceptions, type verification, and other runtime services. Understanding that pipeline explains why C# applications can be portable, introspectable, and heavily tooled.',
  },
  {
    title: 'Strong static typing',
    body: 'C# uses compile-time type checking for variables, members, generic constraints, interfaces, return values, and many structural relationships in the program. This improves refactoring safety and makes large codebases easier to reason about, especially when multiple assemblies and teams are involved.',
  },
  {
    title: 'Object-oriented structure',
    body: 'Classes, interfaces, inheritance, access modifiers, virtual dispatch, abstract members, and encapsulation remain core parts of the language. C# codebases often organize around domain objects, services, repositories, handlers, and framework contracts.',
  },
  {
    title: 'Managed memory model',
    body: 'Objects are normally allocated on the managed heap and reclaimed by the garbage collector when they are no longer reachable. That removes many manual memory hazards, but it does not remove memory design. Engineers still need to think about allocation frequency, object lifetime, pooling, large object behavior, and pause-sensitive workloads.',
  },
  {
    title: 'Assemblies and ecosystem composition',
    body: 'C# applications are usually composed from assemblies and packages, often managed through SDK-style projects and NuGet. The package and project system is central to how codebases are organized, versioned, tested, and deployed.',
  },
]

const languageFeatures = [
  {
    title: 'Classes, interfaces, and inheritance',
    body: 'C# provides familiar object-oriented building blocks for modeling capabilities and responsibilities. Interfaces are especially important because they support loose coupling, testability, and DI-heavy architectures. Inheritance exists, but modern C# teams often favor composition and interfaces over deep inheritance hierarchies.',
  },
  {
    title: 'Generics',
    body: 'Generics are foundational in C#. Collections, LINQ, tasks, results, service abstractions, and domain helpers rely heavily on them. They enable reusable abstractions without sacrificing type safety or requiring broad object casting.',
  },
  {
    title: 'LINQ',
    body: 'Language Integrated Query gives C# a declarative way to transform, filter, group, and project sequences. LINQ improves readability in many data-processing flows, though engineers still need to understand deferred execution, allocation behavior, and translation differences when LINQ is used against databases or remote providers.',
  },
  {
    title: 'Async and await',
    body: 'C# has one of the strongest mainstream async models. Task-based asynchronous programming integrates deeply with the type system and common libraries, making it natural to write concurrent IO-heavy services without manually wiring callback chains.',
  },
  {
    title: 'Pattern matching and modern data modeling',
    body: 'Pattern matching, records, switch expressions, tuples, and nullable reference types make modern C# more expressive than older enterprise stereotypes suggest. These features help model state transitions, immutable data, and branching logic more clearly.',
  },
]

const runtimeAndPerformance = [
  {
    title: 'JIT and startup behavior',
    body: 'The runtime typically uses JIT compilation, which means methods are compiled to native code as needed. This improves adaptability and portability, but it also means startup and warmup behavior matter, especially for short-lived processes or cold-start-sensitive environments.',
  },
  {
    title: 'Garbage collection tradeoffs',
    body: 'GC removes manual free and many memory corruption risks, but allocation-heavy code can still suffer from throughput and latency problems. Serious C# performance work often involves reducing transient allocation, using spans or pools when appropriate, and understanding Gen 0, Gen 1, Gen 2, and large object behavior at a practical level.',
  },
  {
    title: 'Value types and memory discipline',
    body: 'Structs, spans, ref-like patterns, stack allocation in narrow cases, and careful avoidance of boxing can matter in hot paths. C# is not a low-level systems language, but it gives more performance-oriented control than many managed languages when engineers need it.',
  },
  {
    title: 'Measurement over folklore',
    body: 'The right performance habits in C# come from profiling and measurement, not assumptions. BenchmarkDotNet, profilers, event tracing, allocation tracking, and production diagnostics are part of normal serious .NET engineering.',
  },
]

const ecosystemUses = [
  {
    title: 'ASP.NET Core and backend services',
    body: 'C# is one of the flagship languages for modern API and service development through ASP.NET Core. It works well for HTTP APIs, background workers, auth-heavy services, internal platforms, gRPC services, and distributed systems where strong typing and framework maturity matter.',
  },
  {
    title: 'Desktop and client applications',
    body: 'Historically C# has been important for Windows desktop development, but the ecosystem also extends to cross-platform desktop and UI work through newer frameworks. Even when frontend stacks vary, C# often remains relevant in internal tools and rich-client environments.',
  },
  {
    title: 'Games and real-time application logic',
    body: 'Unity made C# extremely visible to game developers. In that setting the language is used for gameplay systems, editor tooling, state management, and simulation logic, often under tighter frame-time constraints than enterprise developers typically encounter.',
  },
  {
    title: 'Cloud and platform engineering',
    body: 'C# is widely used in Azure-heavy organizations, but modern .NET is not cloud-locked. It is equally relevant in containerized Linux deployments, Kubernetes-based services, serverless functions, and internal infrastructure tooling.',
  },
]

const comparisons = [
  {
    title: 'C# versus Java',
    body: 'Both are mature managed, statically typed languages with strong enterprise stories. C# is often praised for language ergonomics and feature velocity, while Java has enormous ecosystem reach and JVM breadth. In practice the decision is often shaped more by stack, platform, and organizational ecosystem than by surface syntax.',
  },
  {
    title: 'C# versus scripting-heavy stacks',
    body: 'Compared with languages such as Python or JavaScript, C# usually offers stronger compile-time structure and refactoring safety, but with more upfront ceremony and project configuration. The trade is often worth it in larger systems where implicit contracts become expensive.',
  },
  {
    title: 'C# versus low-level systems languages',
    body: 'C# trades direct memory control and bare-metal-style predictability for managed productivity and safer defaults. It can still perform well, but its runtime model makes it a different kind of tool from C++, Rust, or C in systems-sensitive domains.',
  },
  {
    title: 'C# as a language versus .NET as an ecosystem',
    body: 'One recurring confusion is treating the language and platform as the same thing. C# is the language. .NET is the runtime, library, toolchain, and application ecosystem around it. Most real tradeoffs involve both at once.',
  },
]

const failureModes = [
  {
    title: 'Treating managed code as if performance does not matter',
    body: 'Garbage collection and JIT do not remove the need for engineering discipline. Allocation patterns, boxing, hot-path LINQ use, sync-over-async mistakes, and excessive abstraction layers can create serious performance and latency problems.',
  },
  {
    title: 'Using object orientation without restraint',
    body: 'C# supports rich OOP, but deep inheritance, excessive indirection, and framework-style overengineering can make code harder to understand than a simpler mix of records, interfaces, and focused services.',
  },
  {
    title: 'Ignoring async design principles',
    body: 'Async and await are productive, but misuse can still create deadlocks, throughput issues, hidden blocking, and cancellation bugs. Strong async support does not absolve the developer from understanding concurrency boundaries.',
  },
  {
    title: 'Assuming the framework will guarantee architecture quality',
    body: 'C# and .NET offer excellent tools, but tools do not replace good design. Service boundaries, validation, domain modeling, dependency management, and testing still require engineering judgment.',
  },
  {
    title: 'Over-modeling the type system',
    body: 'It is possible to build elegant abstractions that are harder to maintain than the concrete code they replaced. Good C# design uses strong typing to clarify intent, not to perform abstraction theater.',
  },
]

const studyChecklist = [
  'Understand the difference between C# the language and .NET the platform.',
  'Learn the CLR pipeline well enough to reason about GC, JIT, and assemblies.',
  'Use interfaces, generics, async, and LINQ deliberately rather than by habit.',
  'Measure allocation and performance instead of guessing.',
  'Prefer clear architecture over maximal abstraction.',
  'Treat modern C# as broader than classic enterprise OOP alone.',
]

const examples = [
  {
    id: 'csh98-example-interface',
    title: 'Example: Interface-driven service boundary',
    area: 'Object-Oriented Design',
    intro:
      'Interfaces are a core C# design tool because they separate capability from implementation. This supports testing, dependency injection, and architectural decoupling without forcing deep inheritance.',
    whyFit:
      'This example reflects the common service-oriented structure of modern C# applications.',
    code: `public interface IOrderRepository
{
    Task<Order?> FindByIdAsync(Guid id, CancellationToken cancellationToken);
    Task SaveAsync(Order order, CancellationToken cancellationToken);
}

public sealed class OrderService
{
    private readonly IOrderRepository _orders;

    public OrderService(IOrderRepository orders) => _orders = orders;
}`,
    takeaway:
      'In C#, interfaces are often more important than inheritance because they let systems scale without hard-coding implementation coupling.',
  },
  {
    id: 'csh98-example-linq',
    title: 'Example: LINQ data transformation',
    area: 'Declarative Querying',
    intro:
      'LINQ lets C# express many sequence-processing operations declaratively. The result is often concise and readable, though engineers should still understand execution timing and allocation cost.',
    whyFit: "This example shows one of the language's most distinctive productivity features.",
    code: `var topCustomers = orders
    .Where(order => order.Total >= 1000m)
    .GroupBy(order => order.CustomerId)
    .Select(group => new
    {
        CustomerId = group.Key,
        Revenue = group.Sum(order => order.Total)
    })
    .OrderByDescending(result => result.Revenue)
    .Take(10)
    .ToList();`,
    takeaway:
      'LINQ is powerful when it makes data flow clearer, but it should still be treated as executable code with real runtime behavior.',
  },
  {
    id: 'csh98-example-async',
    title: 'Example: Async service method',
    area: 'Concurrency and IO',
    intro:
      'Task-based asynchrony is central to modern C# backend work. It helps services scale IO-heavy workloads without blocking threads unnecessarily.',
    whyFit: "This example reflects one of the ecosystem's strongest ergonomic features.",
    code: `public async Task<OrderDto?> GetOrderAsync(Guid id, CancellationToken cancellationToken)
{
    var order = await _orders.FindByIdAsync(id, cancellationToken);
    if (order is null)
    {
        return null;
    }

    return new OrderDto(order.Id, order.CustomerId, order.Total);
}`,
    takeaway:
      'Good async C# code makes concurrency readable, but the team still has to understand cancellation, blocking, and downstream resource behavior.',
  },
  {
    id: 'csh98-example-record',
    title: 'Example: Record-based immutable model',
    area: 'Modern Language Design',
    intro:
      'Records support value-oriented modeling and reduce boilerplate for immutable data shapes. They are often a better fit than mutable classes for DTOs, commands, events, and lightweight domain values.',
    whyFit: 'This example shows that modern C# is broader than classic mutable-class design.',
    code: `public sealed record CreateInvoiceCommand(
    Guid CustomerId,
    decimal Amount,
    DateOnly DueDate
);`,
    takeaway:
      'C# is strongest when it uses the right construct for the job instead of forcing every concept into one object-oriented pattern.',
  },
  {
    id: 'csh98-example-performance',
    title: 'Example: Allocation-aware hot path',
    area: 'Performance Discipline',
    intro:
      'Managed languages still need performance discipline in hot loops. Engineers often improve throughput by reducing unnecessary allocation and by choosing APIs with a clearer memory profile.',
    whyFit:
      'This example illustrates how practical C# performance work depends on memory awareness, not on pretending the runtime does not exist.',
    code: `public static int CountAsciiLetters(ReadOnlySpan<char> input)
{
    var count = 0;
    foreach (var ch in input)
    {
        if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z'))
        {
            count++;
        }
    }

    return count;
}`,
    takeaway:
      'C# performance engineering often means choosing APIs and representations that cooperate with the runtime rather than fighting it blindly.',
  },
]

const glossary = [
  {
    term: 'Assembly',
    definition: 'A compiled .NET unit that packages code, metadata, and versioning information.',
  },
  {
    term: 'CLR',
    definition:
      'The Common Language Runtime that executes managed .NET code and provides runtime services.',
  },
  {
    term: 'GC',
    definition: 'Garbage collection, the managed memory reclamation system used by the runtime.',
  },
  {
    term: 'IL',
    definition:
      'Intermediate Language emitted by the compiler before JIT compilation to native code.',
  },
  {
    term: 'JIT',
    definition: 'Just-in-time compilation performed by the runtime as code executes.',
  },
  {
    term: 'LINQ',
    definition: 'Language Integrated Query, a declarative sequence and query model built into C#.',
  },
  {
    term: 'Managed code',
    definition:
      'Code that runs under the runtime with services such as GC, metadata, and verification.',
  },
  {
    term: 'Nullable reference types',
    definition:
      'A language feature that distinguishes possibly-null and non-null reference intent at compile time.',
  },
  {
    term: 'Record',
    definition: 'A concise C# type often used for immutable, value-oriented data modeling.',
  },
  { term: 'Task', definition: 'The core abstraction representing asynchronous work in modern C#.' },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'csh98-overview', label: 'Overview' },
    { id: 'csh98-why', label: 'Why It Matters' },
    { id: 'csh98-history', label: 'Historical Context' },
    { id: 'csh98-themes', label: 'Big Picture Themes' },
    { id: 'csh98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'csh98-signals', label: 'Topic Signals' },
    { id: 'csh98-foundations', label: 'Foundations' },
    { id: 'csh98-features', label: 'Language Features' },
    { id: 'csh98-runtime', label: 'Runtime and Performance' },
    { id: 'csh98-uses', label: 'Ecosystem Uses' },
    { id: 'csh98-compare', label: 'Compare and Contrast' },
    { id: 'csh98-failures', label: 'Failure Modes' },
    { id: 'csh98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'csh98-glossary', label: 'Terms' }],
}

export default function CSharpPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'C#',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="C#"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">C#</h1>
      <p className="csh98-intro">
        This page is a detailed overview of C# as an object-oriented language and as part of the
        broader .NET platform. It covers the language\'s role, runtime model, core features,
        ecosystem fit, and the practical tradeoffs that matter in real engineering work.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="csh98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="csh98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="csh98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="csh98-themes" className="bin98-section">
            <h2 className="bin98-heading">Big Picture Themes</h2>
            {bigPictureThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="csh98-takeaways" className="bin98-section">
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
          <section id="csh98-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="csh98-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="csh98-features" className="bin98-section">
            <h2 className="bin98-heading">Language Features</h2>
            {languageFeatures.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="csh98-runtime" className="bin98-section">
            <h2 className="bin98-heading">Runtime and Performance</h2>
            {runtimeAndPerformance.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="csh98-uses" className="bin98-section">
            <h2 className="bin98-heading">Ecosystem Uses</h2>
            {ecosystemUses.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="csh98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="csh98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="csh98-checklist" className="bin98-section">
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
        <section id="csh98-glossary" className="bin98-section">
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
