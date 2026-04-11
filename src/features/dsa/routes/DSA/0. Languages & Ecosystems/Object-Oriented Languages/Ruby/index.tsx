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
  'Ruby is a dynamic, object-oriented language designed around developer happiness, readability, and expressive syntax. It became especially influential through web development, scripting, and framework-driven application design, but its deeper identity is a language where everything is an object, code is meant to read naturally, and metaprogramming is part of normal language power rather than an exotic edge case.',
  'It matters because Ruby represents a very different tradeoff from statically typed systems languages or heavily compiled enterprise stacks. Ruby prioritizes speed of thought, expressive APIs, flexible abstractions, and a highly dynamic runtime. That can make teams extremely productive, especially in product development and business application work, while also introducing tradeoffs in performance, static guarantees, and very large-scale maintainability.',
  'This page is intentionally comprehensive. It covers Ruby as a dynamic OO language, everything-is-an-object semantics, classes and modules, mixins, blocks and iterators, metaprogramming, Rails influence, tooling, performance, use cases, tradeoffs, examples, and a working glossary.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Ruby is a high-level interpreted language built around expressive object-oriented programming and a developer-friendly syntax. Unlike many languages where object orientation is only one available style, Ruby treats object messaging, open classes, mixins, and dynamic behavior as central ideas rather than optional features.',
      "The result is a language that can feel unusually natural for application code. APIs often read like prose, blocks make iteration elegant, and the runtime is flexible enough to support frameworks that feel highly integrated with the language itself. That flexibility is part of Ruby's appeal and part of its cost.",
    ],
  },
  {
    id: 'bp-why-ruby',
    title: 'Why Ruby Exists',
    paragraphs: [
      'Ruby was designed with programmer happiness as an explicit goal. Rather than centering on machine-level efficiency or rigid compile-time formality, it tries to create a language where common tasks feel natural and where the syntax supports human readability and elegant expression.',
      "That philosophy explains much of Ruby's shape: minimal punctuation noise, flexible method calling, strong object orientation, powerful blocks, metaprogramming facilities, and a runtime designed for expressive application development rather than for maximal static restriction.",
    ],
    bullets: [
      'It prioritizes readability and developer experience.',
      'It embraces dynamic runtime behavior rather than hiding it.',
      'It treats object messaging as a core model of programming.',
      'It favors elegant APIs and fast iteration over rigid ceremony.',
    ],
  },
  {
    id: 'bp-everything-object',
    title: 'Everything Is An Object',
    paragraphs: [
      "One of Ruby's defining ideas is that everything is an object. Numbers, strings, classes, modules, booleans, and even `nil` all participate in the object model. This creates a very uniform programming surface because method calls and object behavior are pervasive rather than exceptional.",
      'That uniformity is not only aesthetic. It shapes how Ruby developers think about APIs and abstractions. Instead of switching mentally between primitive and object worlds, code tends to stay within one message-passing model.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Ruby Fits Best',
    paragraphs: [
      'Ruby is strongest where application development speed, clean domain code, and expressive framework support matter more than raw runtime performance. Historically that has made it especially successful for web applications, internal tools, back-office systems, content workflows, automation, and startups that need to move quickly with small teams.',
      'It also fits well for scripting and developer tooling where readability and fast iteration are more valuable than low-level performance. The language is less natural where very high throughput, tight memory constraints, or static guarantees are the primary engineering concern.',
    ],
    bullets: [
      'Web applications and business systems.',
      'Internal tools and dashboards.',
      'Automation and scripting workflows.',
      'Teams that value rapid iteration and expressive code.',
    ],
  },
  {
    id: 'bp-framework-culture',
    title: 'Framework Culture And Rails Influence',
    paragraphs: [
      "Ruby cannot be discussed honestly without Rails. Ruby on Rails shaped not only Ruby adoption but also much of the language's public identity. Convention over configuration, generated structure, domain-friendly application code, and rapid web product development became strongly associated with Ruby through Rails.",
      'This is important because Ruby culture often assumes a framework-driven way of building applications. Even when a project is not using Rails, its ecosystem expectations around gems, testing, conventions, and clean domain code are influenced by that history.',
    ],
  },
  {
    id: 'bp-strengths',
    title: 'Major Strengths',
    paragraphs: [
      "Ruby's greatest strength is expressiveness. Well-written Ruby can be extraordinarily readable, especially in application code with strong domain language. Blocks, symbols, modules, duck typing, and flexible object models make it easy to shape APIs around the problem rather than around compiler constraints.",
      'It is also excellent for iteration speed. The language is forgiving during design exploration, and the ecosystem historically made it easy to go from idea to working product quickly. That is why Ruby has remained influential long after many newer languages appeared.',
    ],
    bullets: [
      'Readable and elegant application code.',
      'Fast feedback and productive iteration loops.',
      'Strong framework and gem ecosystem for product work.',
      'Powerful metaprogramming and DSL-building capability.',
    ],
  },
  {
    id: 'bp-limits',
    title: 'Important Limits',
    paragraphs: [
      "Ruby's dynamic power has costs. There is less compile-time protection, runtime behavior can be shaped in surprising ways, and large codebases depend more heavily on tests, conventions, and team discipline to stay coherent. Performance is also a real concern in throughput-heavy systems compared with many compiled alternatives.",
      'Metaprogramming is another double-edged feature. It can produce beautiful APIs, but it can also hide behavior from readers, complicate debugging, and make tooling weaker when overused.',
    ],
    bullets: [
      'Fewer static guarantees than typed compiled languages.',
      'Runtime flexibility can become maintainability risk.',
      "Performance and memory efficiency are not Ruby's core strengths.",
      'Codebases can become too magical when conventions replace clarity.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Practical Mental Model',
    paragraphs: [
      'The best mental model is that Ruby is a language for expressive domain modeling and fast application development. It works best when teams write code that is readable, disciplined, and explicit enough to offset the power of the dynamic runtime.',
      'Good Ruby makes intent obvious. Bad Ruby hides too much behind magic and makes the dynamic model harder to reason about than it needs to be.',
    ],
  },
] as const

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-language-shape',
    title: 'Language Shape And Syntax',
    paragraphs: [
      'Ruby syntax is deliberately lightweight. Method calls often omit parentheses, control flow reads naturally, symbols and hashes are concise, and many APIs are written to feel conversational. This gives Ruby a very different texture from punctuation-heavy or heavily typed languages.',
      'That readability is not accidental. Ruby assumes code is read more often than it is written, so syntax and API conventions are shaped around human comprehension as much as parser needs.',
    ],
  },
  {
    id: 'core-dynamic-typing',
    title: 'Dynamic Typing And Duck Typing',
    paragraphs: [
      'Ruby is dynamically typed. Values have runtime behavior and capabilities, but variables are not statically constrained in the way they are in languages with strong compile-time type systems. Ruby developers often rely on duck typing: if an object responds to the methods a piece of code needs, it is acceptable.',
      'This can make abstractions extremely flexible and lightweight. It also means contracts are enforced socially and through tests more than through compilation. That is productive when teams are disciplined and can become risky when codebases grow without strong conventions.',
    ],
  },
  {
    id: 'core-classes-objects',
    title: 'Classes, Objects, And Message Passing',
    paragraphs: [
      'Ruby is deeply object-oriented. Objects receive messages through method calls, classes define behavior, and inheritance exists, but the deeper model is message passing rather than only class hierarchy design. This gives Ruby a more fluid OOP feel than some class-centric statically typed languages.',
      'Because everything participates in the object system, Ruby code often feels consistent in how it interacts with values. That consistency is one reason Ruby APIs can be so pleasant to work with.',
    ],
  },
  {
    id: 'core-modules-mixins',
    title: 'Modules And Mixins',
    paragraphs: [
      'Ruby uses modules both as namespaces and as mixin containers. Mixins are a major part of Ruby design because they let types share behavior without requiring classical multiple inheritance. A class can include modules to gain methods and capabilities in a very flexible way.',
      "This is one of Ruby's most important alternatives to deep inheritance trees. In well-designed code, modules help keep behavior composable and reusable. In poorly designed code, they can make the method lookup path and effective class behavior harder to trace.",
    ],
  },
  {
    id: 'core-blocks',
    title: 'Blocks, Iterators, And Closures',
    paragraphs: [
      'Blocks are central to Ruby. They let methods accept chunks of behavior directly and are the foundation for iterators, internal DSLs, resource-management patterns, and many elegant collection APIs. This is one of the language features that gives Ruby code its distinctive rhythm.',
      'Because blocks are so common, Ruby often expresses control flow through method calls that yield to caller-provided logic instead of only through explicit loop syntax. This can make everyday code very concise and expressive.',
    ],
  },
  {
    id: 'core-enumerable',
    title: 'Enumerable And Collection Style',
    paragraphs: [
      'Ruby collection programming relies heavily on `Enumerable` and methods such as `map`, `select`, `reject`, `reduce`, `each_with_object`, and related patterns. This encourages a high-level transformation style that reads well and avoids a lot of manual indexing or mutation-heavy loops.',
      "For everyday application code, this is one of Ruby's biggest ergonomic advantages. The standard collection APIs are expressive enough that many business transformations can be described very directly.",
    ],
  },
  {
    id: 'core-open-classes',
    title: 'Open Classes And Runtime Flexibility',
    paragraphs: [
      'Ruby classes are open, which means behavior can be added or changed after a class is defined. This gives Ruby enormous flexibility for framework design, testing helpers, DSL construction, and certain customization patterns.',
      'It is also one of the reasons Ruby can become hard to reason about in very dynamic codebases. Open classes are powerful, but they should be used with restraint because they let runtime behavior drift away from what static reading might suggest.',
    ],
  },
  {
    id: 'core-metaprogramming',
    title: 'Metaprogramming',
    paragraphs: [
      'Metaprogramming is a first-class part of Ruby culture. Methods such as `define_method`, hooks such as `method_missing`, and reflection capabilities let programs shape their own interfaces dynamically. Frameworks use this to generate elegant APIs and reduce repetitive boilerplate.',
      'The value of metaprogramming lies in eliminating repetitive structure and creating domain-specific APIs. The risk is that the resulting code can become too magical, making debugging and onboarding harder. Good Ruby teams treat metaprogramming as a precision tool, not a reflex.',
    ],
  },
  {
    id: 'core-exceptions',
    title: 'Error Handling And Exceptions',
    paragraphs: [
      'Ruby primarily uses exceptions for error handling. This keeps ordinary successful code paths uncluttered, but it also means teams need clear conventions about what constitutes exceptional failure versus ordinary control flow. Using exceptions as everyday branching logic usually leads to poor style.',
      'In well-designed Ruby code, failures are either modeled clearly in the API or surfaced as meaningful exceptions with enough context to debug quickly.',
    ],
  },
  {
    id: 'core-memory-runtime',
    title: 'Runtime And Memory Model',
    paragraphs: [
      'Ruby runs on an interpreter or VM rather than compiling to native machine code in the same mainstream way as C++ or Swift. Modern Ruby implementations have improved significantly, but the runtime still emphasizes flexibility and developer productivity over raw execution speed.',
      'Garbage collection handles memory management automatically, which simplifies development but contributes to runtime overhead and performance considerations in memory-intensive systems.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Concurrency And Parallelism',
    paragraphs: [
      'Ruby has several concurrency models depending on implementation and ecosystem. Threads exist, but the Global VM Lock in MRI affects CPU-bound parallel execution. As a result, Ruby concurrency often focuses on I/O-bound work, process-based parallelism, background jobs, and architecture-level scaling strategies.',
      'This does not make Ruby unusable for concurrent systems. It means teams must understand the runtime model and choose concurrency patterns that fit it rather than assuming the same scaling behavior as languages with different thread models.',
    ],
  },
  {
    id: 'core-rails',
    title: 'Rails And Application Architecture',
    paragraphs: [
      'Rails is not the whole Ruby story, but it is a very large part of the practical ecosystem. Rails brought conventions, generators, Active Record, migrations, REST-heavy web structure, and a productivity model that helped Ruby dominate startup-era web product development.',
      'Understanding Ruby in practice often means understanding how Rails shapes file layout, domain modeling, tests, background jobs, and deployment expectations. Even non-Rails Ruby code is often written in a culture shaped by Rails values.',
    ],
  },
  {
    id: 'core-gems-tooling',
    title: 'Gems, Bundler, And Tooling',
    paragraphs: [
      'Ruby package distribution revolves around gems, with Bundler coordinating dependencies and environment consistency. Tooling commonly includes RSpec or Minitest, RuboCop, background job systems, and framework-specific support around development and deployment.',
      'This ecosystem is mature and productive, but it assumes a strong culture of conventions and community libraries. Ruby engineering is often faster when teams embrace those conventions rather than trying to force every project into a custom shape.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Characteristics',
    paragraphs: [
      "Ruby performance is usually good enough for many business applications, web APIs, and internal tools, especially when architecture, caching, and database design are done well. But performance is not the language's signature advantage, and high-throughput workloads may hit limits sooner than in lower-level or more aggressively optimized runtimes.",
      'The correct mental model is that Ruby buys developer speed with some runtime cost. Teams should optimize the whole system rather than only language microbenchmarks, but they should also be honest when a workload no longer fits Ruby comfortably.',
    ],
  },
  {
    id: 'core-where-it-shines',
    title: 'Where Ruby Shines',
    paragraphs: [
      'Ruby shines where business logic, product iteration, and human-readable code are central. It is especially effective for CRUD-heavy applications, admin systems, commerce backends, content workflows, API services, and internal platforms where engineering throughput matters more than squeezing every last unit of runtime efficiency.',
      'It also shines when teams write disciplined Ruby rather than magical Ruby. The language rewards clear naming, explicit domain models, focused modules, and strong tests.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A common Ruby failure mode is allowing convenience to drift into opacity. Too much implicit behavior, too many callbacks, too much framework magic, or too much metaprogramming can make a codebase feel elegant at first and unreadable later.',
      'Another common issue is assuming dynamic flexibility removes the need for design discipline. In reality, dynamic languages need even stronger naming, tests, boundaries, and conventions because the compiler will not save the team from many classes of mistakes.',
    ],
    bullets: [
      'Hiding too much behavior behind metaprogramming or callbacks.',
      'Relying on framework magic instead of explicit domain clarity.',
      'Ignoring performance realities in throughput-heavy systems.',
      'Treating dynamic typing as an excuse for weak contracts.',
    ],
  },
] as const

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-class',
    title: 'Class With Simple Encapsulation',
    description: [
      'Ruby classes are straightforward to write, and instance behavior stays readable when code is kept explicit and small.',
    ],
    code: `class Account
  def initialize(balance = 0)
    @balance = balance
  end

  def deposit(amount)
    @balance += amount
  end

  def balance
    @balance
  end
end`,
    notes: [
      'The syntax stays compact without heavy ceremony.',
      'Ruby instance variables and methods support clean domain modeling when kept simple.',
    ],
  },
  {
    id: 'ex-module',
    title: 'Module Mixin',
    description: [
      'Modules are often used to share behavior across classes without relying only on inheritance.',
    ],
    code: `module Timestamped
  def stamp
    Time.now.utc
  end
end

class Event
  include Timestamped
end`,
    notes: [
      'Mixins are a major part of Ruby composition style.',
      'This helps avoid deep inheritance hierarchies for shared capabilities.',
    ],
  },
  {
    id: 'ex-block',
    title: 'Block-Based Iteration',
    description: [
      "Blocks are one of Ruby's defining features and make collection processing and DSL-style APIs feel natural.",
    ],
    code: `scores = [92, 74, 88, 99]

honors = scores
  .select { |score| score >= 90 }
  .map { |score| "score=#{score}" }`,
    notes: [
      'The transformation is concise and readable.',
      'Enumerable style is central to idiomatic Ruby code.',
    ],
  },
  {
    id: 'ex-duck-typing',
    title: 'Duck Typing In Practice',
    description: [
      'Ruby often cares more about behavior than declared type lineage. If an object responds to the needed method, it can participate.',
    ],
    code: `def publish(notifier)
  notifier.deliver("New article")
end`,
    notes: [
      'This keeps abstractions lightweight.',
      'It also means tests and conventions carry more contract responsibility.',
    ],
  },
  {
    id: 'ex-metaprogramming',
    title: 'Simple Metaprogramming',
    description: [
      'Ruby can generate methods dynamically, which is powerful when used carefully for repetitive patterns.',
    ],
    code: `class Report
  [:daily, :weekly, :monthly].each do |kind|
    define_method("#{kind}?") do
      @kind == kind
    end
  end
end`,
    notes: [
      'This removes repetition but still stays understandable in small doses.',
      'The same technique becomes dangerous when it obscures too much behavior.',
    ],
  },
  {
    id: 'ex-rails-style',
    title: 'Rails-Style Validation Example',
    description: [
      "Ruby's ecosystem often expresses domain logic through framework-friendly, readable declarations.",
    ],
    code: `class User < ApplicationRecord
  validates :email, presence: true
  validates :email, uniqueness: true
end`,
    notes: [
      'This style is part of why Ruby became influential in product development.',
      'Framework conventions can improve speed when they remain readable.',
    ],
  },
  {
    id: 'ex-safe-navigation',
    title: 'Nil Handling With Safe Navigation',
    description: [
      'Ruby provides tools to work with possibly absent values, though the language does not enforce optionality the way Swift does.',
    ],
    code: `city = user&.address&.city`,
    notes: [
      'This is concise, but overuse can hide unclear data contracts.',
      'Teams still need discipline about where absence is expected.',
    ],
  },
] as const

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-language',
    title: 'Language Terms',
    terms: [
      {
        term: 'Duck typing',
        definition:
          'A style where an object is accepted based on the behavior it supports rather than its declared lineage.',
      },
      {
        term: 'Block',
        definition:
          'A chunk of behavior passed to a method, central to iteration and DSL-style Ruby APIs.',
      },
      {
        term: 'Mixin',
        definition:
          'Shared behavior added to a class through module inclusion rather than only through inheritance.',
      },
      {
        term: 'Symbol',
        definition:
          'A lightweight immutable identifier commonly used for names, keys, and internal labels.',
      },
      {
        term: 'Open class',
        definition:
          'A class whose methods can be reopened and modified after the original declaration.',
      },
      {
        term: 'Enumerable',
        definition:
          'A module providing rich collection traversal and transformation methods when `each` is defined.',
      },
      {
        term: 'Yield',
        definition: 'The mechanism by which a method invokes a provided block.',
      },
      {
        term: 'Nil',
        definition: "Ruby's object representing the absence of a meaningful value.",
      },
    ],
  },
  {
    id: 'glossary-runtime',
    title: 'Runtime And Tooling Terms',
    terms: [
      {
        term: 'MRI',
        definition:
          'The standard reference implementation of Ruby, often called CRuby, with its own runtime tradeoffs such as the Global VM Lock.',
      },
      {
        term: 'Gem',
        definition: 'A packaged Ruby library distributed through the Ruby ecosystem.',
      },
      {
        term: 'Bundler',
        definition:
          'The dependency manager used to resolve and lock gem versions for a Ruby project.',
      },
      {
        term: 'RuboCop',
        definition: 'A widely used Ruby linter and style enforcement tool.',
      },
      {
        term: 'RSpec',
        definition: 'A popular testing framework known for its behavior-driven syntax style.',
      },
      {
        term: 'Minitest',
        definition: 'A smaller built-in-oriented Ruby testing framework with simpler conventions.',
      },
      {
        term: 'Global VM Lock',
        definition:
          'A runtime constraint in MRI that affects how Ruby threads execute CPU-bound work in parallel.',
      },
      {
        term: 'IRB',
        definition: "Ruby's interactive shell for experimenting with code and objects quickly.",
      },
    ],
  },
  {
    id: 'glossary-ecosystem',
    title: 'Framework And Ecosystem Terms',
    terms: [
      {
        term: 'Rails',
        definition:
          'The dominant Ruby web framework, strongly associated with convention-driven product development.',
      },
      {
        term: 'Active Record',
        definition:
          "Rails' object-relational mapping layer that maps database tables to Ruby models.",
      },
      {
        term: 'Convention over configuration',
        definition:
          'A framework philosophy where sensible defaults reduce the need for explicit setup.',
      },
      {
        term: 'DSL',
        definition:
          'A domain-specific language, often built in Ruby through blocks and metaprogramming for expressive configuration or model code.',
      },
      {
        term: 'Rack',
        definition: 'A Ruby webserver interface standard underlying many Ruby web frameworks.',
      },
      {
        term: 'Sidekiq',
        definition: 'A widely used background job processing system in the Ruby ecosystem.',
      },
      {
        term: 'Puma',
        definition: 'A common Ruby application server used in web deployments.',
      },
      {
        term: 'Sinatra',
        definition: 'A lightweight Ruby web framework often used for smaller services and APIs.',
      },
    ],
  },
] as const

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-ruby', label: 'Why Ruby Exists' },
    { id: 'bp-everything-object', label: 'Everything Is An Object' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-framework-culture', label: 'Framework Culture' },
    { id: 'bp-strengths', label: 'Major Strengths' },
    { id: 'bp-limits', label: 'Important Limits' },
    { id: 'bp-mental-model', label: 'Practical Mental Model' },
  ],
  'core-concepts': [
    { id: 'core-language-shape', label: 'Language Shape' },
    { id: 'core-dynamic-typing', label: 'Dynamic and Duck Typing' },
    { id: 'core-classes-objects', label: 'Classes and Objects' },
    { id: 'core-modules-mixins', label: 'Modules and Mixins' },
    { id: 'core-blocks', label: 'Blocks and Closures' },
    { id: 'core-enumerable', label: 'Enumerable' },
    { id: 'core-open-classes', label: 'Open Classes' },
    { id: 'core-metaprogramming', label: 'Metaprogramming' },
    { id: 'core-exceptions', label: 'Error Handling' },
    { id: 'core-memory-runtime', label: 'Runtime and Memory' },
    { id: 'core-concurrency', label: 'Concurrency' },
    { id: 'core-rails', label: 'Rails Architecture' },
    { id: 'core-gems-tooling', label: 'Gems and Tooling' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-where-it-shines', label: 'Where It Shines' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-class', label: 'Class' },
    { id: 'ex-module', label: 'Module Mixin' },
    { id: 'ex-block', label: 'Block Iteration' },
    { id: 'ex-duck-typing', label: 'Duck Typing' },
    { id: 'ex-metaprogramming', label: 'Metaprogramming' },
    { id: 'ex-rails-style', label: 'Rails Style' },
    { id: 'ex-safe-navigation', label: 'Safe Navigation' },
  ],
  glossary: [
    { id: 'glossary-language', label: 'Language Terms' },
    { id: 'glossary-runtime', label: 'Runtime Terms' },
    { id: 'glossary-ecosystem', label: 'Ecosystem Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ruby98-section">
      <h2 className="ruby98-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="ruby98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ruby98-section">
      <h2 className="ruby98-heading">{section.title}</h2>
      {section.description.map((paragraph, index) => (
        <p key={`${section.id}-d-${index}`}>{paragraph}</p>
      ))}
      <div className="ruby98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note, index) => (
          <li key={`${section.id}-n-${index}`}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="ruby98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ruby98-section">
      <h2 className="ruby98-heading">{section.title}</h2>
      {section.terms.map((item, index) => (
        <p key={`${section.id}-t-${index}`}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="ruby98-divider" />}
    </section>
  )
}

export default function RubyPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Ruby',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Ruby"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Ruby</h1>
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
    </TopicPageShell>
  )
}
