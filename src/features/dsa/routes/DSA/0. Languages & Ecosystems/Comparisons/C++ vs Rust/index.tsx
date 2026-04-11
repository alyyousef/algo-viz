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
  cppCode: string
  rustCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'C++ vs Rust'
const pageSubtitle =
  'Comparing the long-established systems programming language with the ownership-first systems language focused on memory safety.'
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
      'C++ and Rust both target the part of software engineering where control over memory layout, CPU cost, threading behavior, and low-level interoperability actually matters. They are both used for systems software, performance-sensitive infrastructure, game engines, databases, browser components, networking stacks, and embedded work. The useful comparison is not whether either language can write fast code. Both can. The real comparison is how they let you pursue performance, what kinds of mistakes they try to prevent, and what sort of engineering culture they encourage around large codebases.',
      'C++ is the older and far more established language. It has decades of production use, a huge body of libraries, broad compiler support, and deep integration into operating systems, legacy platforms, engines, finance, high-performance computing, and embedded systems. Modern C++ is not just C with classes. It includes templates, RAII, move semantics, smart pointers, lambdas, concepts, ranges, and a large evolving standard library. But C++ also preserves a great deal of historical flexibility, which means it preserves many opportunities for undefined behavior and memory unsafety when teams are not disciplined.',
      'Rust was designed with a different bargain. It aims for systems-level performance while making memory safety and many concurrency guarantees part of the compile-time contract. Its ownership, borrowing, lifetimes, and trait system create a programming model that is often harder to learn initially but more restrictive in precisely the places where C++ codebases historically accumulate severe bugs. A useful shorthand is this: C++ optimizes for maximal control and ecosystem reach; Rust optimizes for control plus stronger compile-time safety invariants.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'C++ historically behaves like a language that tries to expose nearly every level of abstraction from low-level memory control to high-level generic programming. It trusts programmers heavily and gives them many tools to manage performance and resource lifetime, but it does not insist on one dominant safety model. The language can support extremely disciplined engineering, but the language does not force that discipline in as many places as Rust does.',
      'Rust behaves like a language that decided many historical systems-programming bugs were too expensive to keep treating as purely programmer responsibility. Ownership is not a style choice in Rust. It is the center of the language. The compiler reasons about who owns data, who may borrow it, when it may be mutated, and what thread-safety properties types have. That makes Rust feel stricter, but the strictness is deliberate: many whole classes of mistakes are intended to become compile errors instead of production incidents.',
      'That is why C++ often feels more permissive and broader, while Rust often feels narrower but safer by construction. The practical question is whether your problem benefits more from raw flexibility or from stronger default invariants around memory and concurrency.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'C++ is strongest where existing ecosystems, platform reach, legacy code integration, specialized vendor libraries, game engines, embedded toolchains, and deep historical investment already dominate the decision. If the codebase already lives in C++ or the surrounding environment is overwhelmingly C and C++ oriented, C++ often remains the most pragmatic choice even when Rust is attractive in the abstract.',
      'Rust is strongest where memory safety bugs are expensive, concurrency correctness matters, new systems are being designed from scratch, or teams want a language that pushes code toward explicit resource ownership and safer APIs. It is especially compelling for greenfield infrastructure, performance-sensitive services, networking systems, security-critical tools, and teams that want a modern package and build workflow through Cargo.',
      'If the central question is Which language has the broadest existing systems ecosystem and the lowest integration friction with legacy native software, C++ usually wins. If the central question is Which language gives me stronger safety guarantees without garbage collection, Rust usually wins.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose C++ when platform reach, legacy integration, and established native ecosystems matter most.',
      'Choose Rust when memory safety, safer concurrency, and modern tooling matter most.',
      'Choose C++ when you must fit naturally into an existing C or C++ codebase, engine, SDK, or toolchain.',
      'Choose Rust when you are building new systems and want the compiler to reject more categories of dangerous code by default.',
      'If the debate is really about ecosystem leverage versus safety invariants, that is the real decision boundary.',
    ],
  },
]

const mentalModels = [
  {
    title: 'C++ is maximal-control systems programming',
    detail:
      'It exposes a broad set of low-level and high-level mechanisms without insisting on one dominant safety discipline.',
  },
  {
    title: 'Rust is ownership-centered systems programming',
    detail:
      'Its most distinctive promise is strong memory safety without garbage collection, enforced through ownership and borrowing rules.',
  },
  {
    title: 'Modern C++ is not old C++',
    detail:
      'Move semantics, RAII, smart pointers, templates, concepts, and library evolution changed how serious C++ is written, even though the language still carries legacy complexity.',
  },
  {
    title: 'Rust safety is not free convenience',
    detail:
      'The borrow checker and type system demand up-front precision, and that precision is part of the languages value proposition rather than incidental complexity.',
  },
  {
    title: 'Undefined behavior is a major cultural difference',
    detail:
      'C++ grants more ways to express dangerous low-level code. Rust confines most of that power to explicit unsafe boundaries.',
  },
  {
    title: 'Cargo is a strategic advantage for Rust',
    detail:
      'Rests package, build, test, and publish workflow is unusually cohesive compared with the more fragmented C++ tooling landscape.',
  },
  {
    title: 'C++ remains easier to deploy into old native environments',
    detail:
      'The surrounding operating systems, compilers, SDKs, and vendors have been accommodating C++ for decades.',
  },
  {
    title: 'Rust often scales better in code safety, not always in onboarding',
    detail:
      'Teams may write safer large systems in Rust, but they often pay more initial complexity cost while learning ownership and lifetimes.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-memory',
    title: 'Memory Management and Ownership Model',
    paragraphs: [
      'C++ gives programmers direct control over memory and object lifetime, but it does so through conventions and mechanisms that the programmer must combine correctly: RAII, move semantics, destructors, references, smart pointers, allocators, and disciplined API design. You can write extremely safe modern C++ in practice, but the language still permits patterns that can lead to use-after-free, dangling references, double-delete, data races, or other forms of undefined behavior if the code is wrong.',
      'Rust builds ownership into the language model itself. The current Rust book describes ownership as Rusts most unique feature and explains that it enables memory safety guarantees without garbage collection. Values have clear owners. Borrows are tracked. Mutable aliasing is restricted. Lifetimes are part of the type system even when they are often inferred. As a result, many bugs that would be possible in C++ become compile-time rejections in Rust.',
      'This does not mean C++ cannot be safe or that Rust cannot be unsafe. C++ can be written very carefully, and Rust has explicit unsafe blocks for operations the compiler cannot verify. The real difference is default posture: C++ allows more and asks the team to govern itself. Rust forbids more and asks the team to justify escape hatches explicitly.',
    ],
  },
  {
    id: 'core-ub',
    title: 'Undefined Behavior, Safety Boundaries, and Language Trust Model',
    paragraphs: [
      'C++ performance and expressiveness are deeply tied to the fact that the language allows undefined behavior in many situations. That gives compilers significant optimization freedom, but it also means the language runtime contract is not forgiving when code is wrong. Some of the most catastrophic native bugs in real systems come from precisely these edges: invalid memory access, lifetime violations, iterator invalidation, data races, strict-aliasing assumptions, and other forms of behavior the language does not define safely.',
      'Rust was designed to narrow this space aggressively. Safe Rust is intended to exclude broad classes of memory unsafety and data races by construction. When programmers need behavior outside what the compiler can prove safe, they can cross into unsafe Rust. That boundary matters because it localizes trust. Reviewers can ask not merely Is this code low-level, but Where is the unsafe boundary, and is it justified and encapsulated correctly.',
      'A useful shorthand is this: in C++, danger is distributed throughout the language unless your team imposes strict conventions. In Rust, danger is more intentionally concentrated at explicit unsafe boundaries.',
    ],
  },
  {
    id: 'core-generics',
    title: 'Generics, Abstraction, and Compile-Time Programming',
    paragraphs: [
      'C++ is famous for templates and for the enormous power they provide. Templates enable zero-cost abstraction, metaprogramming, generic libraries, and high-performance code specialization. Modern C++ concepts improve the ability to constrain templates and make intent clearer. But template-heavy code can still be difficult to read, difficult to diagnose when errors happen, and difficult to compile quickly in large codebases.',
      'Rust uses generics and traits rather than C++ templates in the same historical sense. Traits define shared behavior, bounds constrain generic code, and the language tends to make generic APIs feel more uniform and explicit. Rusts generic system is powerful, but its ergonomics and diagnostics often feel more coherent to developers who are not already steeped in advanced C++ template culture.',
      'C++ may still feel more explosively flexible for compile-time metaprogramming. Rust often feels more disciplined and easier to reason about once the trait model clicks. Which matters more depends on whether your team values maximal generic expressiveness or a more consistently structured generic programming model.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Concurrency and Thread-Safety Model',
    paragraphs: [
      'C++ supports serious concurrency through threads, atomics, synchronization primitives, memory ordering, and lock-free techniques. But the language does not prevent many categories of unsafe concurrent access by default. A race in C++ can still become undefined behavior, and correctness depends heavily on programmer discipline, tooling, review, and testing.',
      'Rusts official book explicitly frames fearless concurrency as one of the major goals of the language and explains that ownership and the type system are used to make many concurrency errors compile-time errors instead of runtime bugs. Traits like Send and Sync are central to that story. This does not make concurrency easy in Rust, but it does change the failure mode. Many invalid sharing patterns are rejected before the code runs.',
      'This is one of Rusts most significant practical advantages. Teams working on concurrent infrastructure often value not just performance but the reduction in invisible race-condition risk. C++ can still be the right answer when ecosystem or platform reasons dominate, but Rust has a real language-level edge in concurrency safety.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Build System, Package Management, and Daily Tooling',
    paragraphs: [
      'C++ tooling is powerful but fragmented. Real C++ projects often involve a compiler toolchain, a build system such as CMake, package managers such as Conan or vcpkg, test frameworks, formatter and linter tools, and platform-specific integration details. This can be managed very well in mature organizations, but it rarely feels like one unified story across the ecosystem.',
      'Rusts Cargo is a major differentiator. The official Cargo book describes Cargo as the Rust package manager and explains that it downloads dependencies, compiles packages, creates distributable packages, and publishes to crates.io. In practice, Cargo is more than a package manager. It is the center of the Rust developer loop: build, run, test, bench, check, doc, and publish all feel like parts of one cohesive workflow.',
      'This means Rust often feels dramatically smoother for greenfield development and open-source library ergonomics. C++ can absolutely support world-class tooling, but the experience depends more on external choices and organization-level standardization.',
    ],
  },
  {
    id: 'core-interop',
    title: 'Interoperability, FFI, and Existing Native Ecosystems',
    paragraphs: [
      'C++ has the overwhelming advantage in sheer ecosystem reach. Operating systems, game engines, embedded vendors, finance infrastructure, robotics platforms, GUI frameworks, and decades of proprietary native libraries assume C++ support. If your project has to live in that world, the path of least resistance is often still C++ regardless of Rests technical attractions.',
      'Rust can interoperate with C and integrate into native systems, but it usually enters those environments as the newer language that must prove itself against existing conventions. In many organizations Rust adoption starts by building isolated components or new services rather than rewriting broad legacy C++ estates all at once.',
      'This means interoperability is not just about FFI mechanics. It is also about institutional inertia. C++ is usually the default language of old native boundaries. Rust is often the language of new native components that want stronger safety inside those boundaries.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance, Predictability, and Zero-Cost Abstraction Claims',
    paragraphs: [
      'Both languages target high performance and both advertise forms of zero-cost abstraction. In practice, both can produce extremely fast code and both can also produce disappointing code if abstractions are misused or if the surrounding algorithmic design is poor. The important engineering point is that neither language gives you speed automatically just because it is called a systems language.',
      'C++ still has the advantage of decades of tuning in high-performance computing, game engines, and specialized native systems. Rust has rapidly proven that safety and performance are not mutually exclusive, which is one reason it has gained serious traction in infrastructure and security-sensitive systems. The performance decision is therefore rarely about a blanket language verdict. It is usually about which compiler model, ecosystem, and engineering culture fit the specific workload better.',
      'If absolute ecosystem-validated performance in established native domains matters most, C++ often has the advantage. If performance plus strong memory-safety invariants matter most, Rust is often more attractive.',
    ],
  },
  {
    id: 'core-errors',
    title: 'Error Handling, API Design, and Failure Semantics',
    paragraphs: [
      'C++ error handling spans exceptions, error codes, optional values, expected-like patterns, and project-specific conventions. This flexibility can be useful, but it also means large codebases may contain several partially overlapping error-handling idioms. That can make APIs less uniform and less predictable across subsystem boundaries.',
      'Rust strongly encourages explicit error handling through Result and Option. This tends to make fallibility very visible in APIs. The language pushes teams toward more consistent failure semantics because the type system keeps surfacing the question of whether an operation can fail and how the caller must respond.',
      'This is another example of the broader tradeoff. C++ gives teams freedom to define their own conventions. Rust gives teams stronger default rails and more uniform APIs at the price of more explicitness in ordinary code.',
    ],
  },
  {
    id: 'core-learning',
    title: 'Learning Curve, Readability, and Team Onboarding',
    paragraphs: [
      'C++ is extremely difficult to master because the language is large, historically layered, and filled with sharp edges that only appear after years of experience. Developers can become productive in subsets of C++, but expert-level understanding of lifetime, templates, ABI details, move semantics, undefined behavior, and build-system interactions is hard-won.',
      'Rust also has a real learning curve, but it is different. Many developers struggle first with ownership, borrowing, lifetimes, and the borrow checker. The key distinction is that Rust difficulty often concentrates at the moment you are trying to express something the language wants you to make explicit. In other words, the language surfaces conceptual difficulty earlier instead of letting it become a latent bug later.',
      'For some teams, that makes Rust feel harder at first and easier later. For others, especially teams already deeply fluent in C++, the historical ecosystem and existing knowledge make C++ more pragmatic even if the language is objectively more dangerous.',
    ],
  },
  {
    id: 'core-deploy',
    title: 'Deployment, Platform Reach, and Organizational Risk',
    paragraphs: [
      'C++ is already accepted almost everywhere native software matters. Toolchains exist for nearly every major target, vendor SDKs expect it, and organizations with native-platform history usually already know how to build, debug, profile, and ship it. That lowers organizational surprise even when the language itself remains complex.',
      'Rust deployment is increasingly strong, but adopting Rust is still often a strategic choice rather than an invisible default. The organization must be willing to invest in toolchain support, engineer training, code review norms for unsafe code, and potentially new operational patterns around a language that not every native environment has standardized on yet.',
      'This is why many choices are not actually language-design debates. They are risk and migration debates. C++ wins when the environment already assumes it. Rust wins when the organization is willing to trade some adoption novelty for better long-term safety and tooling properties.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Gravity, Libraries, and Hiring Reality',
    paragraphs: [
      'C++ has overwhelming ecosystem gravity in native systems. That includes old and new libraries, industry knowledge, compiler maturity, vendor support, and hiring pools shaped by decades of widespread use. When something strange happens in a C++ system, there is often a large body of prior art about it, even if the answer is unpleasant.',
      'Rust has growing momentum, strong community energy, and unusually cohesive official learning material. It is especially appealing to teams that want modern language design and strong tooling without garbage collection. But it still lacks the total library reach and institutional default status of C++ in many native domains.',
      'So the tradeoff is not simply old ecosystem versus new ecosystem. It is dominant incumbent ecosystem versus newer ecosystem with stronger safety and tooling coherence. Which matters more depends on whether you are extending an existing native world or trying to improve the next one.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'C++ can fail by letting too many dangerous patterns remain expressible in ordinary code. Teams may rely on conventions, static analysis, review, and discipline to prevent bugs that the language itself does not prevent. In strong teams this can work well. In inconsistent teams it can become expensive and brittle.',
      'Rust can fail by making engineers fight the model before they fully understand it, which can slow feature work and frustrate teams that need quick native integration more than language-level safety. A team can also misuse unsafe Rust or over-engineer around the borrow checker instead of learning more idiomatic designs.',
      'The real tradeoff is not flexibility versus safety in the abstract. It is whether your project benefits more from permissive power with ecosystem breadth or from stronger compile-time constraints with a more cohesive modern toolchain.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose C++ when legacy integration, vendor support, and platform reach dominate the decision.',
      'Choose Rust when memory safety and concurrency correctness are central requirements.',
      'Prefer C++ when your environment is already deeply native and C++ oriented.',
      'Prefer Rust when you are building new systems and want stronger compile-time guarantees by default.',
      'If your main constraint is ecosystem and deployment compatibility, C++ usually wins.',
      'If your main constraint is long-term safety and maintainability in systems code, Rust often wins.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-ownership',
    title: 'Ownership and Move Semantics',
    summary:
      'Both languages care about ownership transfer, but one treats it as a library and convention pattern while the other treats it as the core language model.',
    cppCode: `#include <string>
#include <utility>

std::string make_name() {
  std::string name = "server";
  return name;
}

void use_name(std::string value) {}

int main() {
  std::string name = make_name();
  use_name(std::move(name));
}`,
    rustCode: `fn make_name() -> String {
    String::from("server")
}

fn use_name(value: String) {}

fn main() {
    let name = make_name();
    use_name(name);
}`,
    explanation:
      'C++ has move semantics, but the language still permits many lifetime mistakes elsewhere. Rust ownership transfer is the default rule of the language, so moved values become unusable unless explicitly borrowed or cloned.',
  },
  {
    id: 'ex-errors',
    title: 'Error Handling Shape',
    summary:
      'The languages can express failure cleanly, but they push teams toward different defaults.',
    cppCode: `#include <expected>
#include <string>

std::expected<int, std::string> parse_port(const std::string& text) {
  if (text == "8080") {
    return 8080;
  }
  return std::unexpected("invalid port");
}`,
    rustCode: `fn parse_port(text: &str) -> Result<u16, String> {
    if text == "8080" {
        Ok(8080)
    } else {
        Err(String::from("invalid port"))
    }
}`,
    explanation:
      'Modern C++ can express explicit result-based error handling, but the ecosystem still contains multiple competing idioms. Rust makes Result central enough that fallibility tends to stay more uniform across APIs.',
  },
  {
    id: 'ex-concurrency',
    title: 'Shared State Across Threads',
    summary:
      'Both languages can share state across threads, but Rust pushes thread-safety reasoning into the type system more aggressively.',
    cppCode: `#include <mutex>
#include <thread>
#include <vector>

int main() {
  int counter = 0;
  std::mutex m;
  std::vector<std::thread> threads;

  for (int i = 0; i < 4; ++i) {
    threads.emplace_back([&] {
      std::lock_guard<std::mutex> lock(m);
      ++counter;
    });
  }

  for (auto& thread : threads) {
    thread.join();
  }
}`,
    rustCode: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = Vec::new();

    for _ in 0..4 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut value = counter.lock().unwrap();
            *value += 1;
        }));
    }

    for handle in handles {
        handle.join().unwrap();
    }
}`,
    explanation:
      'C++ gives you the primitives and trusts you to use them correctly. Rust still needs synchronization primitives too, but its ownership and trait rules reject more invalid sharing patterns before the code ever runs.',
  },
  {
    id: 'ex-resource',
    title: 'Resource Cleanup and RAII Style',
    summary:
      'Both languages support deterministic cleanup, but Rust makes the no-null, no-use-after-free style more central.',
    cppCode: `#include <fstream>

int main() {
  std::ofstream file("log.txt");
  file << "hello\n";
}`,
    rustCode: `use std::fs::File;
use std::io::Write;

fn main() {
    let mut file = File::create("log.txt").unwrap();
    writeln!(file, "hello").unwrap();
}`,
    explanation:
      'Both rely on deterministic cleanup at scope end. The difference is that Rust builds more of its safety story around ownership and borrowing on top of that cleanup model, while C++ still permits more ways to outsmart yourself elsewhere in the program.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'RAII',
    definition:
      'Resource Acquisition Is Initialization, the C++ technique of binding resource lifetime to object lifetime and destructors.',
  },
  {
    term: 'Move semantics',
    definition:
      'A C++ mechanism for transferring resource ownership from one object to another without copying.',
  },
  {
    term: 'Undefined behavior',
    definition:
      'Program behavior for which a language imposes no requirements, allowing serious bugs and aggressive compiler assumptions.',
  },
  {
    term: 'Ownership',
    definition: 'Rusts core rule that each value has a clear owner responsible for its lifetime.',
  },
  {
    term: 'Borrowing',
    definition:
      'Rusts mechanism for temporarily accessing data without taking ownership, subject to strict aliasing rules.',
  },
  {
    term: 'Lifetime',
    definition:
      'A Rust concept used by the compiler to reason about how long references remain valid.',
  },
  {
    term: 'Trait',
    definition:
      'A Rust abstraction for shared behavior, roughly comparable to constrained interfaces plus generic bounds.',
  },
  {
    term: 'Template',
    definition:
      'A C++ compile-time generic programming mechanism used to parameterize code over types and values.',
  },
  {
    term: 'Unsafe Rust',
    definition:
      'Rust code that may perform operations the compiler cannot verify as safe, requiring explicit programmer responsibility.',
  },
  {
    term: 'Cargo',
    definition:
      'Rusts package manager and build tool used to fetch dependencies, compile packages, run tests, and publish crates.',
  },
  {
    term: 'Crate',
    definition:
      'A Rust package or compilation unit managed through Cargo and the wider crates.io ecosystem.',
  },
  {
    term: 'Concept',
    definition:
      'A C++ language feature for constraining template parameters with clearer compile-time requirements.',
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
    { id: 'core-memory', label: 'Memory and Ownership' },
    { id: 'core-ub', label: 'Undefined Behavior' },
    { id: 'core-generics', label: 'Generics and Abstraction' },
    { id: 'core-concurrency', label: 'Concurrency' },
    { id: 'core-tooling', label: 'Tooling and Cargo' },
    { id: 'core-interop', label: 'Interoperability' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-errors', label: 'Error Handling' },
    { id: 'core-learning', label: 'Learning Curve' },
    { id: 'core-deploy', label: 'Deployment and Risk' },
    { id: 'core-ecosystem', label: 'Ecosystem and Hiring' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Decision Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function CppVsRustPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Cpp Vs Rust Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Cpp Vs Rust Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="cpp-rust-help-doc-subtitle">{pageSubtitle}</p>
      <p>
        This page compares C++ and Rust as real systems-language choices rather than as community
        slogans. The point is to make the tradeoffs explicit: ownership, undefined behavior,
        generics, concurrency, tooling, interoperability, ecosystem gravity, and where each language
        is the safer long-term fit for a native codebase.
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
              <h3 className="bin98-subheading">C++</h3>
              <div className="bin98-codebox">
                <code>{example.cppCode.trim()}</code>
              </div>
              <h3 className="bin98-subheading">Rust</h3>
              <div className="bin98-codebox">
                <code>{example.rustCode.trim()}</code>
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
