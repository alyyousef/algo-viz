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
  'PHP is a server-side language historically associated with the web, but that description is both true and incomplete. It began as a pragmatic scripting tool for dynamic websites and evolved into a mature general-purpose language for web applications, APIs, background jobs, CLI tools, and framework-driven backend systems. Its identity is shaped by the realities of request-response application development, shared hosting history, and a huge ecosystem built around delivering business software quickly.',
  'It matters because PHP represents one of the clearest examples of a language whose reputation often lags behind its current reality. Modern PHP has strong OOP support, attributes, types, improved performance, package management, testing culture, and sophisticated frameworks. It is still deeply pragmatic and web-centered, but it is no longer accurately described as only a loose template language glued into HTML.',
  'This page is intentionally comprehensive. It covers PHP as a server-side runtime, modern versus legacy PHP, classes and traits, request lifecycle thinking, Composer and package culture, Laravel and Symfony influence, performance, architecture tradeoffs, examples, and a working glossary.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'PHP is a dynamically executed server-side language optimized historically around building web pages and later full web applications. It is especially known for fitting naturally into the request-response model: accept a request, run application code, talk to a database or services, generate a response, and finish.',
      'That web-shaped execution model is one of the most important things to understand about PHP. The language became successful not because it was theoretically pure, but because it let teams ship useful dynamic websites and later substantial applications quickly with a very low operational barrier.',
    ],
  },
  {
    id: 'bp-why-php',
    title: 'Why PHP Exists And Endures',
    paragraphs: [
      'PHP exists because the web needed a practical way to generate dynamic content on the server with less ceremony than lower-level systems. It grew by solving real deployment problems: easy hosting, quick iteration, direct HTML integration, and a large library ecosystem oriented toward business applications.',
      'It endures because those practical advantages still matter. A large amount of the web runs on PHP-derived systems, and modern frameworks plus better language design have kept it relevant for companies that want productive backend development with broad operational familiarity.',
    ],
    bullets: [
      'It was built for practical server-side web work.',
      'It lowers the barrier to shipping dynamic web applications.',
      'It has an enormous installed base and ecosystem.',
      'Modern PHP improved enough to stay useful rather than only surviving through legacy inertia.',
    ],
  },
  {
    id: 'bp-modern-vs-legacy',
    title: 'Modern PHP Versus Legacy Reputation',
    paragraphs: [
      'A lot of PHP discussion is distorted by outdated memories. Older PHP encouraged inconsistent styles, global state, weak architecture, and direct page scripting. Modern PHP, especially from PHP 7 onward and continuing through recent 8.x versions, looks very different in serious codebases: stronger typing, better performance, namespaces, Composer, better object modeling, attributes, enums, improved error handling, and framework-driven structure.',
      'This does not mean the old reputation was invented. It means the language evolved significantly. Any fair assessment of PHP today has to separate historical patterns from current engineering practice.',
    ],
  },
  {
    id: 'bp-web-context',
    title: 'Web And Request Lifecycle Context',
    paragraphs: [
      'PHP is deeply shaped by the stateless web request model. In traditional setups, each request starts a fresh execution context, loads application code, processes input, produces output, and ends. This gives PHP applications a very natural isolation model per request and historically simplified deployment and failure containment.',
      'That lifecycle also influences design. Persistent process assumptions, long-lived in-memory state, and some categories of runtime architecture feel less central in classic PHP than in always-on application server ecosystems, though newer PHP tooling has broadened that story somewhat.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where PHP Fits Best',
    paragraphs: [
      'PHP is strongest in web application backends, CMS-driven systems, ecommerce platforms, internal portals, CRUD-heavy business software, REST APIs, and product environments where web delivery speed, hosting familiarity, and framework productivity matter. It is also good for teams that want mature deployment patterns without the complexity of some larger application-server stacks.',
      'It is less natural where in-memory service meshes, extreme low-latency computation, or non-web-centric system programming dominate. PHP can do more than web work, but web business applications remain its most natural home.',
    ],
    bullets: [
      'Web applications and admin systems.',
      'CMS and publishing platforms.',
      'Ecommerce and business process tools.',
      'API backends where team productivity matters more than runtime novelty.',
    ],
  },
  {
    id: 'bp-framework-culture',
    title: 'Framework Culture',
    paragraphs: [
      'Modern PHP is strongly influenced by frameworks and package conventions. Symfony, Laravel, and related ecosystems gave PHP a more disciplined architecture story around routing, dependency injection, templating, ORM usage, queues, events, and testing.',
      'This matters because current PHP engineering is usually not about hand-writing single-file page scripts. It is about working inside a structured application framework, package ecosystem, and deployment workflow shaped by modern backend practices.',
    ],
  },
  {
    id: 'bp-strengths',
    title: 'Major Strengths',
    paragraphs: [
      'PHP\'s biggest strength is practical productivity in web business software. It has mature frameworks, a huge talent pool, broad deployment familiarity, rich CMS and ecommerce ecosystems, and a language/runtime story that many hosting and operations teams already understand well.',
      'It also benefits from a very large installed base. That means libraries, tools, platform integrations, tutorials, and production knowledge are abundant. For many organizations, that operational familiarity is more valuable than using a language with a cleaner theoretical pedigree.',
    ],
    bullets: [
      'Very strong web application productivity.',
      'Huge ecosystem and operational familiarity.',
      'Mature frameworks and package conventions.',
      'Modern PHP is significantly better structured and faster than legacy stereotypes suggest.',
    ],
  },
  {
    id: 'bp-limits',
    title: 'Important Limits',
    paragraphs: [
      'PHP still has tradeoffs. The language carries historical baggage, style inconsistency still exists across old and new code, and the request-per-execution heritage can make some long-lived application server patterns less idiomatic than in other ecosystems. Performance is improved, but it is still not the main reason teams choose PHP.',
      'Framework convenience can also turn into architectural complacency. Teams can rely so heavily on framework defaults, magic conventions, or ORM behavior that they stop modeling the domain clearly.',
    ],
    bullets: [
      'Legacy code and old habits remain widespread in the ecosystem.',
      'Framework magic can obscure real application behavior.',
      'It is not usually chosen for cutting-edge systems programming or high-performance computing.',
      'Code quality varies widely because the ecosystem is so broad.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Practical Mental Model',
    paragraphs: [
      'The best mental model is that PHP is a pragmatic language for delivering web software with low friction. It is strongest when teams use its modern features, package culture, and framework discipline to build clear business applications rather than repeating the weakest patterns from older PHP history.',
      'Good PHP is structured, explicit, testable, and boring in the right ways. Bad PHP hides everything behind global state, framework magic, and weak boundaries.',
    ],
  },
] as const

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-language-shape',
    title: 'Language Shape And Syntax',
    paragraphs: [
      'PHP syntax is familiar to many C-like language users, but its practical style is shaped more by web backend work than by systems programming. Modern PHP code uses namespaces, classes, interfaces, traits, typed properties, attributes, and explicit package structure in ways that look far more disciplined than historical inline-script examples.',
      'The surface of the language still reflects its history, but modern style guides and frameworks have made idiomatic PHP much more consistent than many people remember.',
    ],
  },
  {
    id: 'core-runtime-model',
    title: 'Request-Response Runtime Model',
    paragraphs: [
      'Classic PHP execution is tied closely to the web request lifecycle. A request arrives, code runs, dependencies are resolved, business logic executes, a response is produced, and the process state is effectively discarded from the application\'s point of view. This made PHP simple to host and reason about operationally for many kinds of web software.',
      'That model matters because it changes how state, caching, and architecture feel. PHP often leans on external stores such as databases, caches, and queues rather than on long-lived in-process memory assumptions.',
    ],
  },
  {
    id: 'core-dynamic-and-typed',
    title: 'Dynamic Roots And Modern Typing',
    paragraphs: [
      'PHP began as a much looser dynamically typed language, and traces of that heritage remain. Modern PHP, however, includes scalar type declarations, return types, typed properties, union types, enums, attributes, and other features that let teams write much more explicit code than older PHP styles allowed.',
      'The important point is that PHP did not become a purely static language. It became a more disciplined dynamic language with increasingly useful optional type information and stronger contracts at important boundaries.',
    ],
  },
  {
    id: 'core-classes-oop',
    title: 'Classes, Interfaces, And OOP',
    paragraphs: [
      'PHP supports familiar object-oriented design through classes, inheritance, visibility modifiers, interfaces, abstract classes, constructors, and dependency-injected services. This makes it viable for layered backend architectures, domain services, repository patterns, policy objects, command handlers, and other common application structures.',
      'Modern PHP codebases often look far more like mainstream backend application architecture than like embedded web scripts. Object orientation is not decorative in current PHP practice. It is one of the main ways complexity is organized.',
    ],
  },
  {
    id: 'core-traits',
    title: 'Traits',
    paragraphs: [
      'Traits are a major feature of PHP\'s composition model. They allow reusable method sets to be included in classes without depending only on classical inheritance. This makes them useful for cross-cutting behavior, framework helpers, common utility behavior, or shared logic that does not belong in a rigid parent class.',
      'As with all mixin-style tools, traits are best used carefully. They can improve reuse and clarity, but excessive trait layering can make effective behavior harder to track.',
    ],
  },
  {
    id: 'core-arrays-data',
    title: 'Arrays, Maps, And Data Handling',
    paragraphs: [
      'PHP arrays are flexible and heavily used. Historically they often served as general-purpose lists, maps, and ad hoc records all at once. Modern PHP code still uses arrays frequently, but well-structured systems increasingly move important domain concepts into typed objects, DTOs, enums, and value objects rather than leaving everything as associative arrays.',
      'That shift matters because one of the differences between older and newer PHP practice is how seriously teams treat domain modeling and boundary contracts.',
    ],
  },
  {
    id: 'core-exceptions-errors',
    title: 'Errors, Exceptions, And Validation',
    paragraphs: [
      'Modern PHP applications typically use exceptions for truly exceptional failures and validation layers for expected input problems. Frameworks often provide request validation, form validation, ORM exceptions, and structured error handling around web responses.',
      'The quality of a PHP codebase often depends on how clearly it distinguishes invalid user input, missing resources, business rule violations, and infrastructural failures rather than collapsing everything into generic runtime surprises.',
    ],
  },
  {
    id: 'core-composer',
    title: 'Composer And Package Culture',
    paragraphs: [
      'Composer is central to modern PHP. It provides dependency management, autoloading conventions, package distribution, version coordination, and a shared ecosystem structure. In practice, Composer is one of the main reasons contemporary PHP engineering feels coherent rather than fragmented.',
      'The package model also encourages clearer project structure. Namespaces, autoloading, and package boundaries make PHP applications feel much closer to mainstream application platforms than older include-file styles did.',
    ],
  },
  {
    id: 'core-frameworks',
    title: 'Laravel, Symfony, And Framework Design',
    paragraphs: [
      'Laravel and Symfony are two of the most important framework influences in modern PHP. Symfony is often associated with explicit components and enterprise-friendly structure. Laravel is often associated with highly productive developer ergonomics and a rich integrated application experience. Both helped move PHP engineering toward clearer architectural norms.',
      'Framework choice matters because much of the practical PHP experience comes from framework conventions rather than the language alone. Routing, container design, ORM usage, configuration style, queue processing, and testing workflows are often framework-shaped decisions.',
    ],
  },
  {
    id: 'core-orm-db',
    title: 'ORMs, Databases, And Business Applications',
    paragraphs: [
      'PHP is heavily associated with database-backed applications, and ORM or query-builder usage is common. This has made PHP especially effective for CRUD-heavy business systems, though it also means application design can become too database-centric if teams are not careful.',
      'The strongest PHP systems use database tooling productively without letting the persistence layer define the whole architecture. The language is at its best when domain design stays visible instead of disappearing into model magic.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing And Quality Practices',
    paragraphs: [
      'Because PHP code often sits at the heart of user-facing business workflows, testing matters a great deal. PHPUnit, Pest, framework testing helpers, static analysis tools such as PHPStan or Psalm, and coding standard tools all contribute to keeping modern PHP projects maintainable.',
      'This is another place where the modern PHP story differs from its older reputation. Serious PHP teams increasingly use tests and static analysis aggressively to offset the language\'s dynamic heritage.',
    ],
  },
  {
    id: 'core-cli-jobs',
    title: 'CLI Tools, Queues, And Background Work',
    paragraphs: [
      'Although PHP is web-centered, it is not restricted to handling HTTP requests. Modern applications often use PHP for background jobs, queue workers, scheduled tasks, data imports, administrative scripts, and deployment-related tooling.',
      'This broadens the language beyond simple request handlers, but the web application context still shapes how many teams structure the code and runtime environment.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Concurrency And Scaling',
    paragraphs: [
      'PHP traditionally scales through process-level parallelism, horizontal web scaling, caching, reverse proxies, background workers, and external services rather than through deeply shared in-process concurrency models. This aligns naturally with stateless web architecture.',
      'That model can be very effective for the kinds of systems PHP commonly powers. The key is to understand that PHP\'s scaling story is architectural and operational rather than centered on elegant in-language parallel abstractions.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Characteristics',
    paragraphs: [
      'PHP performance improved dramatically in modern versions, and for many business systems it is more than sufficient when the application, database, caching, and infrastructure are designed well. The language is often bottlenecked more by ORM behavior, N+1 queries, poor caching, or framework overhead than by isolated syntax choices.',
      'Still, PHP is usually not chosen because it is the fastest possible runtime. It is chosen because its performance is often good enough while its ecosystem and productivity are very strong.',
    ],
  },
  {
    id: 'core-where-it-shines',
    title: 'Where PHP Shines',
    paragraphs: [
      'PHP shines in business web software: content systems, back-office tools, storefronts, APIs, dashboards, portals, workflow systems, and applications where getting useful product behavior into production quickly matters more than language purity.',
      'It also shines when teams embrace modern PHP conventions instead of repeating outdated patterns. Typed DTOs, clean services, explicit validation, package structure, tests, and careful framework use make a major difference.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A common PHP failure mode is carrying legacy habits forward into modern code: global state, fat controllers, implicit array contracts, ORM abuse, and excessive framework magic. Another is assuming that because PHP is productive, architectural discipline matters less. In practice it matters more, because the language and framework can make bad structure easy to keep shipping.',
      'The strongest PHP teams are deliberate about boundaries, explicit data models, validation, query behavior, and code readability. The weakest teams let convenience replace design.',
    ],
    bullets: [
      'Using associative arrays where typed objects should exist.',
      'Hiding too much business logic in framework conventions or model hooks.',
      'Ignoring query efficiency and cache behavior.',
      'Treating legacy habits as inherent parts of modern PHP.',
    ],
  },
] as const

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-class',
    title: 'Simple Class With Encapsulation',
    description: [
      'Modern PHP supports clear class-based design with typed properties and methods, which is very different from the old image of only inline script logic.',
    ],
    code: `class Account
{
    public function __construct(
        private float $balance = 0
    ) {}

    public function deposit(float $amount): void
    {
        $this->balance += $amount;
    }

    public function balance(): float
    {
        return $this->balance;
    }
}`,
    notes: [
      'Typed properties and methods make the contract clearer.',
      'This is the kind of ordinary OOP style common in modern PHP services.',
    ],
  },
  {
    id: 'ex-trait',
    title: 'Trait-Based Reuse',
    description: [
      'Traits let PHP share behavior across classes without forcing everything through one inheritance chain.',
    ],
    code: `trait Timestamped
{
    public function stamp(): string
    {
        return gmdate('c');
    }
}

class Event
{
    use Timestamped;
}`,
    notes: [
      'Traits are useful for selected reusable behavior.',
      'They should support clarity, not replace thoughtful design.',
    ],
  },
  {
    id: 'ex-interface',
    title: 'Interface-Driven Service Design',
    description: [
      'Interfaces are common in service-oriented PHP applications where dependency injection and testability matter.',
    ],
    code: `interface Notifier
{
    public function send(string $message): void;
}

final class EmailNotifier implements Notifier
{
    public function send(string $message): void
    {
        // send email
    }
}`,
    notes: [
      'This supports dependency inversion and clearer service contracts.',
      'Framework containers often work naturally with this style.',
    ],
  },
  {
    id: 'ex-array-vs-dto',
    title: 'DTO Instead Of Raw Array Contracts',
    description: [
      'Modern PHP often benefits from moving important data shapes out of loose arrays and into explicit objects.',
    ],
    code: `final class CreateUserData
{
    public function __construct(
        public string $email,
        public string $name
    ) {}
}`,
    notes: [
      'This is easier to understand than an implicit associative array shape.',
      'Typed data objects reduce ambiguity at application boundaries.',
    ],
  },
  {
    id: 'ex-laravel-validation',
    title: 'Framework-Friendly Validation',
    description: [
      'PHP frameworks often make request validation a first-class concern, which helps keep bad input from leaking into deeper business logic.',
    ],
    code: `public function rules(): array
{
    return [
        'email' => ['required', 'email'],
        'name' => ['required', 'string', 'max:255'],
    ];
}`,
    notes: [
      'Validation is part of the boundary contract, not an afterthought.',
      'Good PHP applications use framework convenience to improve clarity, not hide it.',
    ],
  },
  {
    id: 'ex-attribute',
    title: 'Attribute-Based Metadata',
    description: [
      'Modern PHP includes attributes, which provide structured metadata without relying only on ad hoc comments or magic naming.',
    ],
    code: `#[Route('/users', methods: ['GET'])]
public function index(): Response
{
    // ...
}`,
    notes: [
      'Attributes modernized a lot of metadata-heavy framework patterns.',
      'They help keep configuration close to behavior when used carefully.',
    ],
  },
  {
    id: 'ex-enum',
    title: 'Enum For Explicit Domain States',
    description: [
      'Enums help modern PHP express legal values directly rather than relying only on strings sprinkled through the codebase.',
    ],
    code: `enum OrderStatus: string
{
    case Pending = 'pending';
    case Paid = 'paid';
    case Shipped = 'shipped';
}`,
    notes: [
      'This improves readability and reduces stringly typed domain logic.',
      'Modern PHP increasingly benefits from these more explicit modeling tools.',
    ],
  },
] as const

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-language',
    title: 'Language Terms',
    terms: [
      {
        term: 'Trait',
        definition:
          'A reusable unit of behavior that can be included in classes without relying only on inheritance.',
      },
      {
        term: 'Namespace',
        definition:
          'A mechanism for organizing code and avoiding naming collisions across packages and modules.',
      },
      {
        term: 'Typed property',
        definition:
          'A class property declared with an explicit type in modern PHP.',
      },
      {
        term: 'Attribute',
        definition:
          'Structured metadata attached to code elements, commonly used by frameworks and libraries.',
      },
      {
        term: 'Enum',
        definition:
          'A language feature for representing a closed set of named values, often useful in domain modeling.',
      },
      {
        term: 'Associative array',
        definition:
          'A map-like array structure often used historically in PHP for flexible data storage.',
      },
      {
        term: 'Autoloading',
        definition:
          'Automatic class loading based on namespace and file conventions, commonly coordinated by Composer.',
      },
      {
        term: 'Request lifecycle',
        definition:
          'The flow in which PHP code handles an incoming request, produces a response, and ends execution.',
      },
    ],
  },
  {
    id: 'glossary-runtime',
    title: 'Runtime And Tooling Terms',
    terms: [
      {
        term: 'Composer',
        definition:
          'The dependency manager and package ecosystem hub for modern PHP.',
      },
      {
        term: 'PHP-FPM',
        definition:
          'A common FastCGI process manager used to run PHP applications behind web servers.',
      },
      {
        term: 'OPcache',
        definition:
          'A bytecode caching mechanism that significantly improves PHP runtime performance.',
      },
      {
        term: 'PHPUnit',
        definition:
          'The long-established unit testing framework used widely in PHP projects.',
      },
      {
        term: 'Pest',
        definition:
          'A modern PHP testing framework built with a cleaner, more concise syntax style.',
      },
      {
        term: 'PHPStan',
        definition:
          'A static analysis tool used to increase correctness in modern PHP codebases.',
      },
      {
        term: 'Psalm',
        definition:
          'Another major static analysis tool for improving type and contract quality in PHP projects.',
      },
      {
        term: 'CLI',
        definition:
          'Command-line execution mode used for scripts, tooling, queues, and scheduled jobs.',
      },
    ],
  },
  {
    id: 'glossary-ecosystem',
    title: 'Framework And Ecosystem Terms',
    terms: [
      {
        term: 'Laravel',
        definition:
          'A highly productive modern PHP framework known for integrated developer ergonomics.',
      },
      {
        term: 'Symfony',
        definition:
          'A major PHP framework and component ecosystem known for structure and reusable packages.',
      },
      {
        term: 'Doctrine',
        definition:
          'A commonly used PHP ORM and database abstraction ecosystem.',
      },
      {
        term: 'Eloquent',
        definition:
          'Laravel\'s ORM, used to map database records to PHP models and relations.',
      },
      {
        term: 'Blade',
        definition:
          'Laravel\'s templating system for server-rendered views.',
      },
      {
        term: 'Middleware',
        definition:
          'A request-processing layer used for cross-cutting web concerns such as authentication or logging.',
      },
      {
        term: 'Artisan',
        definition:
          'Laravel\'s command-line tool for running framework tasks and project automation.',
      },
      {
        term: 'Monolith',
        definition:
          'A single deployable application unit, a common and often effective architecture in PHP business systems.',
      },
    ],
  },
] as const

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-php', label: 'Why PHP Exists' },
    { id: 'bp-modern-vs-legacy', label: 'Modern vs Legacy' },
    { id: 'bp-web-context', label: 'Web Context' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-framework-culture', label: 'Framework Culture' },
    { id: 'bp-strengths', label: 'Major Strengths' },
    { id: 'bp-limits', label: 'Important Limits' },
    { id: 'bp-mental-model', label: 'Practical Mental Model' },
  ],
  'core-concepts': [
    { id: 'core-language-shape', label: 'Language Shape' },
    { id: 'core-runtime-model', label: 'Runtime Model' },
    { id: 'core-dynamic-and-typed', label: 'Dynamic and Typed' },
    { id: 'core-classes-oop', label: 'Classes and OOP' },
    { id: 'core-traits', label: 'Traits' },
    { id: 'core-arrays-data', label: 'Arrays and Data' },
    { id: 'core-exceptions-errors', label: 'Errors and Validation' },
    { id: 'core-composer', label: 'Composer' },
    { id: 'core-frameworks', label: 'Frameworks' },
    { id: 'core-orm-db', label: 'ORMs and Databases' },
    { id: 'core-testing', label: 'Testing and Quality' },
    { id: 'core-cli-jobs', label: 'CLI and Jobs' },
    { id: 'core-concurrency', label: 'Concurrency' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-where-it-shines', label: 'Where It Shines' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-class', label: 'Class' },
    { id: 'ex-trait', label: 'Trait' },
    { id: 'ex-interface', label: 'Interface' },
    { id: 'ex-array-vs-dto', label: 'DTO Instead of Array' },
    { id: 'ex-laravel-validation', label: 'Validation' },
    { id: 'ex-attribute', label: 'Attribute' },
    { id: 'ex-enum', label: 'Enum' },
  ],
  glossary: [
    { id: 'glossary-language', label: 'Language Terms' },
    { id: 'glossary-runtime', label: 'Runtime Terms' },
    { id: 'glossary-ecosystem', label: 'Ecosystem Terms' },
  ],
}

const pageStyles = `
.php98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.php98-help-window {
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

.php98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
}

.php98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
}

.php98-controls {
  display: flex;
  gap: 2px;
}

.php98-control {
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

.php98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.php98-tab {
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

.php98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.php98-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.php98-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.php98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.php98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.php98-toc-item {
  margin: 0 0 8px;
}

.php98-toc-link {
  color: #000000;
  text-decoration: none;
  font-size: 12px;
}

.php98-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.php98-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.php98-section {
  margin: 0 0 20px;
}

.php98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.php98-content p,
.php98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.php98-content p {
  margin: 0 0 10px;
}

.php98-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.php98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.php98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.php98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.45;
}

@media (max-width: 900px) {
  .php98-main {
    grid-template-columns: 1fr;
  }

  .php98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .php98-titletext {
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
    <section key={section.id} id={section.id} className="php98-section">
      <h2 className="php98-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="php98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="php98-section">
      <h2 className="php98-heading">{section.title}</h2>
      {section.description.map((paragraph, index) => (
        <p key={`${section.id}-d-${index}`}>{paragraph}</p>
      ))}
      <div className="php98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note, index) => (
          <li key={`${section.id}-n-${index}`}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="php98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="php98-section">
      <h2 className="php98-heading">{section.title}</h2>
      {section.terms.map((item, index) => (
        <p key={`${section.id}-t-${index}`}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="php98-divider" />}
    </section>
  )
}

export default function PHPPage(): JSX.Element {
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
    document.title = `PHP (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'PHP',
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
    <div className="php98-help-page">
      <style>{pageStyles}</style>
      <div className="php98-help-window" role="presentation">
        <header className="php98-titlebar">
          <span className="php98-titletext">PHP</span>
          <div className="php98-controls">
            <button className="php98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="php98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="php98-tabs" role="tablist" aria-label="PHP documentation sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`php98-tab ${activeTab === tab.id ? 'php98-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="php98-main">
          <aside className="php98-toc" aria-label="Table of contents">
            <h2 className="php98-toc-title">Contents</h2>
            <ul className="php98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="php98-toc-item">
                  <a href={`#${section.id}`} className="php98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="php98-content">
            <h1 className="php98-doc-title">PHP</h1>
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
