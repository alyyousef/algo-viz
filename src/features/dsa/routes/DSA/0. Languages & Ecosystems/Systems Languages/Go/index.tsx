import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Go is a compiled statically typed language designed for simplicity, fast builds, straightforward deployment, and strong support for concurrent server-side and systems-adjacent software. It is especially associated with cloud infrastructure, networking software, command-line tools, backend services, developer tooling, and operational platforms that benefit from native binaries and a conservative language design.',
  'The language matters because it takes a very opinionated approach to engineering tradeoffs. Go does not try to be maximally expressive or deeply abstract. Instead, it prioritizes readability across teams, a compact language surface, built-in tooling, predictable builds, garbage-collected native execution, and concurrency primitives that are practical for large-scale service software.',
  'This page is intentionally thorough. It covers why Go exists, how it fits into systems programming, its runtime model, concurrency story, interfaces, error handling, packages and tooling, garbage collection, deployment strengths, performance tradeoffs, examples, and a working glossary.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Go is a native compiled language built to support maintainable software at scale, especially in service-oriented and infrastructure-heavy environments. It produces standalone binaries, has a strong standard library, and includes a runtime that provides garbage collection, scheduling, and concurrency support.',
      'Its personality is intentionally conservative. Go often chooses a simpler feature set and stricter style expectations over maximal expressiveness. That tradeoff is central to understanding why some teams love it and others find it limiting.',
    ],
  },
  {
    id: 'bp-why-go',
    title: 'Why Go Exists',
    paragraphs: [
      'Go exists because large software teams, especially those building servers and infrastructure, needed a language that compiled quickly, deployed easily, and stayed readable across many contributors. It was designed in reaction to both low-level complexity and high-level build/runtime sprawl.',
      'Its creators wanted a language that felt more productive than C++ for large codebases, but more operationally direct than managed enterprise stacks with heavy frameworks, slow build systems, or deeply layered abstractions.',
    ],
    bullets: [
      'Keep large codebases readable across teams.',
      'Support fast compilation and simple native deployment.',
      'Provide practical concurrency for networked and server software.',
      'Reduce accidental complexity in mainstream systems-adjacent programming.',
    ],
  },
  {
    id: 'bp-systems-context',
    title: 'Systems Programming Context',
    paragraphs: [
      'Go sits somewhat differently from languages such as C, Rust, or Zig. It is in the systems-programming family primarily because it compiles to native binaries, performs well enough for infrastructure software, and is widely used to build tools, databases, networking components, orchestrators, and platform services. It is not primarily a language for manual memory management, embedded firmware, or hardware-near code.',
      'The right way to think about Go in this category is as a systems-adjacent engineering language. It is especially strong where you want native execution, deployment simplicity, concurrency, and clear code, but do not want to personally manage every byte of memory.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Go Fits Best',
    paragraphs: [
      'Go fits best in backend services, networking software, distributed systems, cloud tooling, infrastructure platforms, command-line tools, and operational software that values reliability, simple deployment, and team readability. It is especially attractive for services that need lots of concurrent I/O without complicated threading models.',
      'It is less ideal where highly expressive type systems, advanced functional abstractions, GUI-heavy desktop work, or low-level hardware control are central requirements. Go is intentionally not trying to win every language-design dimension.',
    ],
    bullets: [
      'Backend APIs and microservices.',
      'Cloud infrastructure and orchestration tools.',
      'Networking systems and proxies.',
      'Command-line utilities and developer tooling.',
    ],
  },
  {
    id: 'bp-design-style',
    title: 'Design Style',
    paragraphs: [
      'Go emphasizes a small language core, explicit code, and narrow idioms. It deliberately avoids large amounts of syntax or abstraction machinery that could make code harder for teams to read consistently. This is why Go codebases often feel stylistically similar across organizations.',
      'That consistency is a strategic choice. Go values the ability of many engineers to quickly read and modify code over providing every expressive tool an individual developer might want.',
    ],
  },
  {
    id: 'bp-strengths',
    title: 'Major Strengths',
    paragraphs: [
      'Go\'s main strengths are simplicity, very strong tooling, fast build feedback, concurrency ergonomics for service software, deployment convenience, and code readability across teams. A Go service is often easy to build, test, package, and run in production compared with more complex language stacks.',
      'The language also benefits from a mature standard library in domains such as HTTP, networking, encoding, testing, and tooling. That reduces dependence on giant framework ecosystems for many common backend tasks.',
    ],
    bullets: [
      'Simple deployment through native static-like binaries.',
      'Excellent built-in tooling and formatting discipline.',
      'Practical concurrency with goroutines and channels.',
      'Strong fit for service and infrastructure engineering.',
    ],
  },
  {
    id: 'bp-limits',
    title: 'Important Limits',
    paragraphs: [
      'Go has clear limitations. The type system is intentionally less expressive than some modern alternatives, error handling can feel repetitive, and the garbage-collected runtime means it is not aimed at the most constrained low-level environments. Some developers also find its minimalism frustrating when they want richer abstraction tools.',
      'These limits are not accidents. They are consequences of the language\'s design priorities. The question is not whether Go could have more features, but whether those features would undermine the simplicity and codebase uniformity that the language is trying to protect.',
    ],
    bullets: [
      'Less expressive abstraction tools than some newer languages.',
      'Not designed for tight manual-memory or embedded use cases.',
      'Verbose error checking can feel repetitive.',
      'Runtime garbage collection is a feature and a tradeoff.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Practical Mental Model',
    paragraphs: [
      'The best mental model is that Go is a language for boringly effective infrastructure and backend software. It is designed to keep large engineering organizations productive by making code easier to read, build, and deploy.',
      'Good Go code is direct, explicit, package-oriented, and modest in abstraction. Bad Go code tries to fight the language by recreating patterns better suited to more feature-heavy ecosystems.',
    ],
  },
] as const

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-language-shape',
    title: 'Language Shape And Syntax',
    paragraphs: [
      'Go syntax is intentionally sparse and regular. The language avoids many advanced constructs, prefers explicit control flow, and leans on a short list of core mechanisms rather than a huge feature matrix. This is one reason new contributors can often read ordinary Go code quickly.',
      'The downside is that some patterns that could be more concise or abstract in other languages remain deliberately plain in Go. This is not oversight. It is part of the language philosophy.',
    ],
  },
  {
    id: 'core-runtime-model',
    title: 'Runtime Model',
    paragraphs: [
      'Go compiles to native binaries, but it also includes a runtime that handles garbage collection, goroutine scheduling, stack management, and parts of concurrency coordination. That makes it different from languages whose compiled output has almost no runtime layer at all.',
      'This hybrid model is one of Go\'s key tradeoffs. Developers get much easier concurrency and memory management than fully manual systems languages provide, but they also accept runtime behavior and GC costs as part of the platform.',
    ],
  },
  {
    id: 'core-packages-modules',
    title: 'Packages, Modules, And Project Organization',
    paragraphs: [
      'Go organizes code primarily through packages. The package model is central to how Go developers structure systems: small focused packages, clear exported names, and relatively direct dependency relationships. Modules then coordinate versioning and dependency management across repositories.',
      'This helps reinforce Go\'s preference for modular simplicity over deep internal framework hierarchies. The shape of the codebase often matters as much as the language syntax itself.',
    ],
  },
  {
    id: 'core-types-interfaces',
    title: 'Types, Structs, And Interfaces',
    paragraphs: [
      'Go uses structs for data modeling and interfaces for behavior contracts. Interfaces are especially important because they are satisfied implicitly rather than through explicit declarations. This allows flexible decoupling without a lot of ceremony.',
      'The language tends to favor small interfaces and direct composition. Rather than building deep inheritance hierarchies, Go code usually combines concrete types, interfaces, and package-level functions in a more restrained style.',
    ],
  },
  {
    id: 'core-error-handling',
    title: 'Error Handling',
    paragraphs: [
      'Go treats errors as ordinary values. Functions often return a result plus an `error`, and callers handle that explicitly. This avoids hidden exception-based control flow and makes failure paths visible in the code, which is useful in systems and service software.',
      'The tradeoff is repetition. Go error handling is intentionally plain, and many developers either appreciate the explicitness or dislike the verbosity. In either case, it strongly influences how Go programs are written.',
    ],
  },
  {
    id: 'core-goroutines',
    title: 'Goroutines',
    paragraphs: [
      'Goroutines are lightweight concurrent execution units managed by the Go runtime. They make it much easier to express large amounts of concurrent I/O-oriented work than manually managing operating system threads in many other environments.',
      'This is one of Go\'s signature advantages. Service software often needs to handle many requests, connections, workers, or background operations at once, and goroutines give developers a practical model for structuring that concurrency.',
    ],
  },
  {
    id: 'core-channels',
    title: 'Channels And Coordination',
    paragraphs: [
      'Channels provide a built-in way for goroutines to communicate and coordinate. They support a style where concurrent components exchange data directly rather than only sharing mutable state. This can make some categories of pipeline, worker, and fan-out/fan-in design more understandable.',
      'Channels are powerful, but they are not a universal solution. Good Go engineers know when channels clarify concurrency and when simpler locks, direct calls, or ordinary data structures are more appropriate.',
    ],
  },
  {
    id: 'core-gc-memory',
    title: 'Garbage Collection And Memory Behavior',
    paragraphs: [
      'Go uses garbage collection, which simplifies memory safety and developer productivity relative to manual-memory languages. This is part of why Go is attractive for infrastructure software that needs reliability without constantly reasoning about explicit frees.',
      'At the same time, memory behavior still matters. Allocation patterns, object lifetimes, escape analysis, and GC pressure can all affect performance. Go removes manual deallocation, but it does not remove the need to think about memory at scale.',
    ],
  },
  {
    id: 'core-standard-library',
    title: 'Standard Library And Batteries-Included Engineering',
    paragraphs: [
      'One of Go\'s practical advantages is its strong standard library. Common tasks such as HTTP servers, JSON handling, testing, logging foundations, file I/O, networking, and command-line work often have direct built-in support. This reduces the need to assemble a giant stack of third-party frameworks before writing useful software.',
      'That standard library culture reinforces a certain style of Go engineering: smaller external dependency sets, direct composition, and reliance on stable built-in APIs.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling, Formatting, And Build Experience',
    paragraphs: [
      'Go tooling is one of the language\'s strongest selling points. Formatting, testing, dependency management, documentation generation, benchmarking, and cross-compilation all fit into a relatively coherent workflow. The language intentionally reduces arguments about style through standard formatting and narrow conventions.',
      'This matters because developer productivity is not only about syntax. Go often feels efficient because the surrounding workflow is predictable and low-drama, especially compared with ecosystems that require much more build and tool configuration.',
    ],
  },
  {
    id: 'core-networking-services',
    title: 'Networking And Service Development',
    paragraphs: [
      'Go is especially strong for network servers, APIs, proxies, message processors, and cloud-facing software. Its concurrency model, standard library, and deployment simplicity align closely with the needs of always-on service environments.',
      'This is why Go became so prominent in infrastructure companies and platform tooling. The language fits the operational shape of modern distributed systems unusually well, even if it is less expressive than some competing languages.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing And Reliability',
    paragraphs: [
      'Go includes first-class testing support, which encourages teams to keep unit tests, benchmarks, and package-focused validation close to the code. This fits the language\'s broader design philosophy of integrated tooling and practical engineering discipline.',
      'Because many Go systems sit in operationally critical paths, testing culture matters. The ecosystem generally encourages straightforward tests over ornate testing frameworks or excessive magic.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Characteristics',
    paragraphs: [
      'Go generally delivers strong enough performance for backend and infrastructure software, especially where concurrency, network I/O, and operational simplicity matter more than absolute low-level tuning. Its native compilation and efficient runtime make it much faster than many interpreted or VM-heavy alternatives in these domains.',
      'Still, Go is not the answer to every performance problem. Garbage collection, allocation patterns, and runtime scheduling impose tradeoffs that matter in latency-sensitive or resource-constrained environments. The language aims for practical performance rather than maximal control.',
    ],
  },
  {
    id: 'core-where-it-shines',
    title: 'Where Go Shines',
    paragraphs: [
      'Go shines in software that has to run reliably in production with many concurrent operations and a straightforward deployment story. That includes APIs, control planes, schedulers, agents, CLIs, service meshes, infrastructure daemons, and cloud-native tooling.',
      'It also shines in organizations that care about codebase uniformity. Go makes it hard for teams to build radically different private dialects, which is often an advantage in large maintenance-heavy systems.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A common Go mistake is assuming the language\'s simplicity means design no longer matters. Poor package boundaries, sloppy goroutine ownership, and careless interface design can still make codebases difficult to maintain. Another mistake is using concurrency primitives everywhere just because they are available.',
      'Teams can also fight the language by trying to force abstraction styles that Go intentionally does not optimize for. The strongest Go systems usually embrace directness instead of trying to turn Go into a more feature-heavy language.',
    ],
    bullets: [
      'Launching goroutines without clear ownership or shutdown behavior.',
      'Using channels where simpler coordination would be clearer.',
      'Creating interfaces too early or making them too broad.',
      'Ignoring allocation and GC behavior in high-throughput paths.',
    ],
  },
] as const

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-struct',
    title: 'Struct For Service Data',
    description: [
      'Go commonly uses structs as the main way to represent application and service data.',
    ],
    code: `type User struct {
    ID     int
    Name   string
    Active bool
}`,
    notes: [
      'This is the most ordinary building block for modeling data in Go.',
      'The style is direct and intentionally low-ceremony.',
    ],
  },
  {
    id: 'ex-error',
    title: 'Explicit Error Return',
    description: [
      'Go handles failure through ordinary return values rather than hidden exception flow.',
    ],
    code: `func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}`,
    notes: [
      'The caller must handle the error explicitly.',
      'This style makes failure visible at the call site.',
    ],
  },
  {
    id: 'ex-interface',
    title: 'Small Interface',
    description: [
      'Go interfaces are usually most effective when they stay narrow and behavioral.',
    ],
    code: `type Notifier interface {
    Send(message string) error
}`,
    notes: [
      'Implicit interface satisfaction keeps decoupling lightweight.',
      'Small interfaces are a major Go design pattern.',
    ],
  },
  {
    id: 'ex-goroutine',
    title: 'Goroutine Launch',
    description: [
      'Goroutines make concurrent work easy to express, especially for I/O-oriented tasks.',
    ],
    code: `go func() {
    fmt.Println("background work")
}()`,
    notes: [
      'Launching work is easy; owning and shutting it down correctly is the harder design problem.',
      'Concurrency convenience should still be paired with lifecycle discipline.',
    ],
  },
  {
    id: 'ex-channel',
    title: 'Channel Communication',
    description: [
      'Channels support communication between concurrent parts of a program.',
    ],
    code: `messages := make(chan string)

go func() {
    messages <- "done"
}()

msg := <-messages`,
    notes: [
      'This is useful for worker coordination and pipeline-style code.',
      'Channels are a tool, not a requirement for all concurrency.',
    ],
  },
  {
    id: 'ex-http',
    title: 'Standard Library HTTP Handler',
    description: [
      'Go\'s standard library makes basic server work possible with very little framework overhead.',
    ],
    code: `http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
})`,
    notes: [
      'This shows how much useful server functionality is built into the platform.',
      'Many production services begin from these direct standard-library primitives.',
    ],
  },
  {
    id: 'ex-test',
    title: 'Built-In Testing Style',
    description: [
      'Go testing stays close to the language and standard tooling.',
    ],
    code: `func TestAdd(t *testing.T) {
    if add(2, 3) != 5 {
        t.Fatal("unexpected result")
    }
}`,
    notes: [
      'Tests are ordinary Go code using standard conventions.',
      'This fits the language\'s preference for integrated tooling over heavy framework magic.',
    ],
  },
] as const

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-language',
    title: 'Language Terms',
    terms: [
      {
        term: 'Struct',
        definition:
          'A composite data type used heavily in Go for representing application state and data records.',
      },
      {
        term: 'Interface',
        definition:
          'A behavioral contract in Go that types satisfy implicitly by implementing the required methods.',
      },
      {
        term: 'Method set',
        definition:
          'The set of methods associated with a type, relevant to interface satisfaction and behavior design.',
      },
      {
        term: 'Package',
        definition:
          'The primary code organization unit in Go, grouping related files and exported names.',
      },
      {
        term: 'Exported identifier',
        definition:
          'A name beginning with an uppercase letter, making it visible outside the package.',
      },
      {
        term: 'Goroutine',
        definition:
          'A lightweight concurrent execution unit managed by the Go runtime.',
      },
      {
        term: 'Channel',
        definition:
          'A typed communication mechanism used by goroutines to exchange values and coordinate work.',
      },
      {
        term: 'Error value',
        definition:
          'An ordinary returned value representing failure information in Go.',
      },
    ],
  },
  {
    id: 'glossary-runtime',
    title: 'Runtime And Tooling Terms',
    terms: [
      {
        term: 'Garbage collector',
        definition:
          'The runtime mechanism that reclaims unused heap memory automatically in Go programs.',
      },
      {
        term: 'Scheduler',
        definition:
          'The part of the Go runtime that manages goroutine execution across operating system threads.',
      },
      {
        term: 'Module',
        definition:
          'A versioned dependency unit in Go used for package distribution and project dependency management.',
      },
      {
        term: 'Cross-compilation',
        definition:
          'Building a Go binary for a different operating system or CPU architecture than the current machine.',
      },
      {
        term: 'Benchmark',
        definition:
          'A measurement-oriented test used to evaluate performance under standard Go tooling.',
      },
      {
        term: 'Race detector',
        definition:
          'A Go tooling feature used to help identify data races in concurrent programs.',
      },
      {
        term: 'Escape analysis',
        definition:
          'Compiler analysis that helps decide whether values can stay on the stack or must move to the heap.',
      },
      {
        term: 'Native binary',
        definition:
          'A compiled executable that runs directly on the target platform rather than inside a virtual machine.',
      },
    ],
  },
  {
    id: 'glossary-ecosystem',
    title: 'Ecosystem And Architecture Terms',
    terms: [
      {
        term: 'Microservice',
        definition:
          'A small independently deployable network service, a common architectural context for Go.',
      },
      {
        term: 'Cloud-native tooling',
        definition:
          'Infrastructure and operational software designed around modern containerized and distributed deployment environments.',
      },
      {
        term: 'Control plane',
        definition:
          'The orchestration and management layer of a distributed system, often implemented in Go.',
      },
      {
        term: 'Worker pool',
        definition:
          'A concurrency pattern where a bounded set of workers processes tasks from a shared queue or channel.',
      },
      {
        term: 'Backpressure',
        definition:
          'A system behavior that slows producers when consumers or downstream systems cannot keep up.',
      },
      {
        term: 'Graceful shutdown',
        definition:
          'An orderly termination process where in-flight work is completed or safely stopped before exit.',
      },
      {
        term: 'Standard library first',
        definition:
          'A Go engineering tendency to rely on built-in packages before reaching for large third-party frameworks.',
      },
      {
        term: 'Operational simplicity',
        definition:
          'A design goal emphasizing easy builds, easy deployment, and predictable runtime behavior in production.',
      },
    ],
  },
] as const

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-go', label: 'Why Go Exists' },
    { id: 'bp-systems-context', label: 'Systems Context' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-design-style', label: 'Design Style' },
    { id: 'bp-strengths', label: 'Major Strengths' },
    { id: 'bp-limits', label: 'Important Limits' },
    { id: 'bp-mental-model', label: 'Practical Mental Model' },
  ],
  'core-concepts': [
    { id: 'core-language-shape', label: 'Language Shape' },
    { id: 'core-runtime-model', label: 'Runtime Model' },
    { id: 'core-packages-modules', label: 'Packages and Modules' },
    { id: 'core-types-interfaces', label: 'Types and Interfaces' },
    { id: 'core-error-handling', label: 'Error Handling' },
    { id: 'core-goroutines', label: 'Goroutines' },
    { id: 'core-channels', label: 'Channels' },
    { id: 'core-gc-memory', label: 'GC and Memory' },
    { id: 'core-standard-library', label: 'Standard Library' },
    { id: 'core-tooling', label: 'Tooling' },
    { id: 'core-networking-services', label: 'Networking and Services' },
    { id: 'core-testing', label: 'Testing' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-where-it-shines', label: 'Where It Shines' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-struct', label: 'Struct' },
    { id: 'ex-error', label: 'Error Return' },
    { id: 'ex-interface', label: 'Interface' },
    { id: 'ex-goroutine', label: 'Goroutine' },
    { id: 'ex-channel', label: 'Channel' },
    { id: 'ex-http', label: 'HTTP Handler' },
    { id: 'ex-test', label: 'Test' },
  ],
  glossary: [
    { id: 'glossary-language', label: 'Language Terms' },
    { id: 'glossary-runtime', label: 'Runtime Terms' },
    { id: 'glossary-ecosystem', label: 'Ecosystem Terms' },
  ],
}

const pageStyles = `
.go98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.go98-help-window {
  box-sizing: border-box;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.go98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
}

.go98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
}

.go98-controls {
  display: flex;
  gap: 2px;
}

.go98-control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 16px;
  padding: 0;
  background: #c0c0c0;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  color: #000000;
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
}

.go98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.go98-tab {
  padding: 5px 10px 4px;
  background: #b6b6b6;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  color: #000000;
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
}

.go98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.go98-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.go98-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.go98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.go98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.go98-toc-item {
  margin: 0 0 8px;
}

.go98-toc-link {
  color: #000000;
  text-decoration: none;
  font-size: 12px;
}

.go98-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.go98-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.go98-section {
  margin: 0 0 20px;
}

.go98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.go98-content p,
.go98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.go98-content p {
  margin: 0 0 10px;
}

.go98-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.go98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.go98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.go98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.45;
}

@media (max-width: 900px) {
  .go98-main {
    grid-template-columns: 1fr;
  }

  .go98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .go98-titletext {
    max-width: calc(100% - 56px);
    white-space: normal;
    text-align: center;
    line-height: 1.1;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="go98-section">
      <h2 className="go98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph, index) => (
        <p key={`${section.id}-p-${index}`}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item, index) => (
            <li key={`${section.id}-b-${index}`}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="go98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="go98-section">
      <h2 className="go98-heading">{section.title}</h2>
      {section.description.map((paragraph, index) => (
        <p key={`${section.id}-d-${index}`}>{paragraph}</p>
      ))}
      <div className="go98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note, index) => (
          <li key={`${section.id}-n-${index}`}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="go98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="go98-section">
      <h2 className="go98-heading">{section.title}</h2>
      {section.terms.map((item, index) => (
        <p key={`${section.id}-t-${index}`}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="go98-divider" />}
    </section>
  )
}

export default function GoPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Go (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Go',
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

  return (
    <div className="go98-help-page">
      <style>{pageStyles}</style>
      <div className="go98-help-window" role="presentation">
        <header className="go98-titlebar">
          <span className="go98-titletext">Go</span>
          <div className="go98-controls">
            <button className="go98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="go98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="go98-tabs" role="tablist" aria-label="Go documentation sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`go98-tab ${activeTab === tab.id ? 'go98-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="go98-main">
          <aside className="go98-toc" aria-label="Table of contents">
            <h2 className="go98-toc-title">Contents</h2>
            <ul className="go98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="go98-toc-item">
                  <a href={`#${section.id}`} className="go98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="go98-content">
            <h1 className="go98-doc-title">Go</h1>
            {introParagraphs.map((paragraph, index) => (
              <p key={`intro-${index}`}>{paragraph}</p>
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
          </main>
        </div>
      </div>
    </div>
  )
}
