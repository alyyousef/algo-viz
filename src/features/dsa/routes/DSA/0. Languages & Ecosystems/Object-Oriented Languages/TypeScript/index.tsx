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
  'TypeScript is a typed superset of JavaScript that adds static analysis, richer editor tooling, and compiler-driven feedback without changing the fact that JavaScript remains the runtime language. The important idea is that TypeScript is not a separate web runtime. It is a development-time layer that helps teams describe program structure more explicitly before code executes.',
  'It matters because modern JavaScript systems often grow beyond what informal conventions can safely hold together. As codebases get larger, shared contracts, API shapes, component props, state models, and service boundaries become harder to reason about mentally. TypeScript makes many of those relationships visible and machine-checkable.',
  'This page is intentionally comprehensive. It covers what TypeScript is, why it exists, how it relates to JavaScript, the type system, inference, narrowing, generics, object-oriented usage, compiler configuration, declaration files, interop, migration strategy, examples, tradeoffs, and key terminology.',
] as const

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'TypeScript keeps JavaScript syntax and semantics, then layers type syntax and compiler analysis on top. Most valid JavaScript is valid TypeScript. That compatibility is the core reason adoption is practical: teams do not need to abandon the JavaScript ecosystem in order to gain stronger static tooling.',
      'The language is widely used for frontend applications, Node.js services, internal tooling, reusable libraries, and monorepos where a large amount of application logic needs to stay understandable across time and across teams. Its real value is not that it makes JavaScript more powerful at runtime. Its value is that it improves correctness, maintainability, and communication during development.',
    ],
  },
  {
    id: 'bp-why-exists',
    title: 'Why TypeScript Exists',
    paragraphs: [
      'Plain JavaScript is flexible and productive, but flexibility becomes expensive when large systems depend on implicit assumptions. Developers start relying on comments, naming conventions, tribal knowledge, tests, and runtime checks to remember what shape data should have and how functions are supposed to be called.',
      'TypeScript exists to move some of that reasoning earlier. Instead of discovering a mismatch only when a code path executes, the compiler can flag it while code is being written. That changes the cost profile of maintenance and refactoring, especially in long-lived applications.',
    ],
    bullets: [
      'It makes data shapes and function contracts explicit.',
      'It improves editor autocomplete, navigation, and rename safety.',
      'It helps teams refactor more confidently across many files.',
      'It turns part of architecture into something the compiler can check.',
    ],
  },
  {
    id: 'bp-runtime-reality',
    title: 'Runtime Reality',
    paragraphs: [
      'JavaScript is still the runtime language. Browsers, Node.js, Bun, Deno, and other JavaScript runtimes ultimately execute JavaScript behavior. TypeScript source is usually transpiled to JavaScript or used only for type-checking in workflows that emit through another tool.',
      'This means TypeScript does not automatically change runtime correctness. It cannot guarantee that network responses are valid, that database rows match assumptions, or that user input is safe. It verifies what the program claims internally. The outside world still needs runtime validation.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where It Fits Best',
    paragraphs: [
      'TypeScript is strongest where module boundaries matter: component libraries, backend service layers, domain models, shared packages, event systems, state-heavy applications, and APIs consumed by multiple teams. The more a codebase depends on stable contracts, the more useful static types become.',
      'It is also useful in codebases with frequent onboarding and refactoring. Types act as a form of executable documentation. New engineers can often understand what values look like and how functions are intended to be used without reading as much surrounding code.',
    ],
    bullets: [
      'Large frontend applications.',
      'Backend services with many request and response shapes.',
      'Reusable SDKs or shared internal libraries.',
      'Monorepos with many packages and contributors.',
    ],
  },
  {
    id: 'bp-strengths',
    title: 'Major Strengths',
    paragraphs: [
      'TypeScript improves clarity by making assumptions explicit. A function signature can show what is required, optional, nullable, or generic. An object type can reveal which fields belong to a domain entity and which do not. A discriminated union can define valid application states more precisely than comments ever could.',
      'It also improves tooling. Refactors become safer because rename operations, call sites, and property usage can be checked together. Editor support becomes richer because the language service understands the structure of the program rather than only text patterns.',
    ],
    bullets: [
      'Compile-time feedback on many structural mistakes.',
      'Better discoverability of APIs and data models.',
      'Safer large-scale refactors.',
      'Useful self-documentation at module boundaries.',
    ],
  },
  {
    id: 'bp-limits',
    title: 'Important Limits',
    paragraphs: [
      'TypeScript does not remove the need for tests, runtime validation, logging, or good architecture. It catches many mistakes, but it does not know whether an external API lies, whether business rules are correct, or whether a user-provided payload actually matches the claimed shape at runtime.',
      'It also adds complexity. The type system is deep enough that teams can over-model, fight inference, or spend time satisfying the compiler in ways that do not materially improve the product. Good TypeScript use is pragmatic, not maximalist.',
    ],
    bullets: [
      'Types disappear at runtime unless paired with runtime validation tools.',
      'The compiler can be satisfied while the business logic is still wrong.',
      'Build, config, and type-design overhead are real costs.',
      'Poorly designed types can make code harder to read instead of easier.',
    ],
  },
  {
    id: 'bp-when-to-choose',
    title: 'When To Choose TypeScript',
    paragraphs: [
      'Choose TypeScript when the cost of misunderstanding is high. That usually means many contributors, many moving parts, many domain objects, frequent refactors, or public interfaces that should remain stable. In those cases, the type layer often pays for itself repeatedly.',
      'Use plain JavaScript when simplicity and immediacy matter more than formal static contracts. Small scripts, short-lived utilities, prototypes, and tiny applications often do not need the full TypeScript workflow. The best decision is based on actual project economics, not ideology.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Practical Mental Model',
    paragraphs: [
      'The best way to think about TypeScript is as a design assistant for JavaScript code. It helps encode assumptions about shapes, states, and usage patterns so that the compiler and editor can participate in review before runtime.',
      'That mental model keeps expectations realistic. TypeScript is not proof of correctness. It is structured friction against a specific class of mistakes, and that friction is usually valuable when systems grow.',
    ],
  },
] as const

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-js-relationship',
    title: 'Relationship To JavaScript',
    paragraphs: [
      'TypeScript is not a rejection of JavaScript. It is built directly on top of JavaScript and intentionally tracks the language closely. Understanding JavaScript fundamentals is still required because TypeScript code compiles into JavaScript semantics, not into an unrelated execution model.',
      'That relationship explains why TypeScript adoption is often incremental. Teams can convert one file, one module, or one package at a time while continuing to use existing JavaScript libraries and runtime environments.',
    ],
  },
  {
    id: 'core-type-system',
    title: 'Core Type System',
    paragraphs: [
      'TypeScript can describe primitive types such as `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, and `undefined`, but its real strength appears in object and function modeling. It can define shapes for records, nested objects, arrays, tuples, callbacks, promises, classes, maps, and many other structures common in application code.',
      'At the boundary level, the type system answers questions such as what parameters are required, what return values are possible, which fields are optional, whether `null` is allowed, and whether a function is generic over a family of inputs.',
    ],
    bullets: [
      'Primitive types model scalar values.',
      'Object types model structured records.',
      'Function types model inputs and outputs.',
      'Union and intersection types model variation and composition.',
    ],
  },
  {
    id: 'core-inference',
    title: 'Inference Versus Explicit Annotation',
    paragraphs: [
      'A strong TypeScript codebase does not annotate everything. The compiler can infer many local variable types, return values, callback parameter relationships, array element types, and generic usage patterns. Inference keeps code readable and avoids repeating information the compiler already knows.',
      'Explicit annotation is most useful at public boundaries and domain-level abstractions: exported functions, library APIs, shared interfaces, component props, state models, and anything that many files depend on. The practical goal is to make important contracts obvious without turning every local variable into ceremony.',
    ],
  },
  {
    id: 'core-interfaces-aliases',
    title: 'Interfaces And Type Aliases',
    paragraphs: [
      'Interfaces and type aliases are both used to describe object shapes and named contracts. Interfaces are especially common for object-oriented or API-style contracts because they read naturally as named capabilities or data models. Type aliases are broader and can represent unions, primitives, tuples, mapped types, conditional types, and many composite forms.',
      'In day-to-day use, the difference is less about ideology and more about intent. Interfaces are often a good fit for extensible object contracts. Type aliases are often a good fit when the shape is not purely an object interface or when advanced type composition is needed.',
    ],
  },
  {
    id: 'core-structural-typing',
    title: 'Structural Typing',
    paragraphs: [
      'TypeScript is structurally typed in many places. Compatibility depends on whether a value has the right shape rather than whether it explicitly declares a named inheritance chain. This matches JavaScript well because object literals and ad hoc records are common.',
      'The benefit is flexibility. The risk is accidental compatibility when two objects happen to look alike but represent different domain concepts. Teams sometimes address that with branding patterns, careful naming, or stricter modeling at important boundaries.',
    ],
  },
  {
    id: 'core-narrowing',
    title: 'Type Narrowing',
    paragraphs: [
      "One of TypeScript's most practical features is control-flow-based narrowing. A value may begin as a union such as `string | undefined` or a discriminated union representing several states. After a runtime check, the compiler can narrow the type within that branch.",
      'This matters because it connects runtime logic to static reasoning. The code that checks a condition also teaches the compiler what is safe afterward, which reduces the gap between real program flow and type declarations.',
    ],
  },
  {
    id: 'core-generics',
    title: 'Generics',
    paragraphs: [
      'Generics let one implementation preserve relationships between types instead of falling back to `any` or broad unknown shapes. They are useful for reusable data structures, helper functions, wrappers, repositories, API clients, and utility abstractions where the specific type varies but the relationship remains stable.',
      'Generics are one of the features that make TypeScript valuable at scale. A well-designed generic API can stay reusable while still preserving precise information about inputs and outputs for every caller.',
    ],
  },
  {
    id: 'core-unions-intersections',
    title: 'Unions, Intersections, And State Modeling',
    paragraphs: [
      'Union types describe legal alternatives. A value may be one shape or another, and the program must narrow which case it is handling. This is especially useful in UI state, API results, domain events, and workflow modeling where a value can exist in distinct modes.',
      'Intersection types combine capabilities. They are useful when data must satisfy multiple contracts simultaneously, though they should be used carefully because overly clever type composition can reduce readability.',
    ],
  },
  {
    id: 'core-classes-oop',
    title: 'Classes And Object-Oriented Usage',
    paragraphs: [
      'TypeScript supports classes, inheritance, abstract classes, access modifiers, parameter properties, getters, setters, and interface implementation. This makes it comfortable in object-oriented codebases and in teams that prefer class-based domain modeling.',
      'That does not mean TypeScript requires object-oriented design. It works equally well with functional or modular styles. The key point is that TypeScript can express OOP patterns clearly while still living inside the JavaScript runtime model.',
    ],
    bullets: [
      'Classes are useful for encapsulated domain objects and framework patterns.',
      'Interfaces can describe contracts implemented by classes.',
      'Access modifiers help communicate intended visibility.',
      'Composition is often still preferable to deep inheritance trees.',
    ],
  },
  {
    id: 'core-functions-async',
    title: 'Functions, Async Code, And Promises',
    paragraphs: [
      'TypeScript models function signatures directly, including parameters, optional parameters, rest parameters, overloads, callbacks, generics, and promise-returning async flows. This makes asynchronous code easier to reason about because the intended result shape can be encoded in the return type.',
      'In real applications, this becomes especially valuable in service layers and UI event handling. Typed async functions make it harder to accidentally misuse a result shape several files away from the implementation.',
    ],
  },
  {
    id: 'core-utility-types',
    title: 'Utility Types And Type-Level Reuse',
    paragraphs: [
      'TypeScript includes utility types such as `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`, `NonNullable`, `Parameters`, and `ReturnType`. These help teams derive new types from existing ones rather than duplicating declarations manually.',
      'This is valuable when a codebase evolves. Instead of re-describing related shapes across forms, DTOs, views, and service layers, utility types can express the relationship directly. The result is usually easier to maintain than parallel handwritten type declarations.',
    ],
  },
  {
    id: 'core-modules-declarations',
    title: 'Modules And Declaration Files',
    paragraphs: [
      'Modern TypeScript follows JavaScript module patterns with `import` and `export`. On top of that, TypeScript can generate declaration files so other packages can consume rich type information even if they only receive compiled JavaScript at runtime.',
      'Declaration files, commonly `.d.ts`, are the bridge between runtime code and static understanding. They let libraries document APIs for tooling and compilers without shipping implementation source as TypeScript.',
    ],
  },
  {
    id: 'core-tsconfig',
    title: 'TSConfig And Compiler Policy',
    paragraphs: [
      'A `tsconfig.json` file tells the compiler how strict to be, what files to include, what module strategy to assume, what JavaScript target to emit, whether declarations should be generated, and how path aliases or project references are resolved. This configuration is part of the TypeScript experience, not an optional afterthought.',
      'The important organizational point is that TypeScript is partly a language and partly a policy system. Two teams can both use TypeScript but have very different developer experiences depending on strictness, emit strategy, build tooling, and repo structure.',
    ],
  },
  {
    id: 'core-strictness',
    title: 'Strictness And Safety Levels',
    paragraphs: [
      'TypeScript can be adopted gradually. A team may begin permissively and then move toward `strict` mode as the codebase matures. Strict null checking, unchecked indexed access rules, exact optional modeling, and related compiler settings determine how much the compiler is allowed to trust.',
      'Higher strictness generally improves safety, but it also requires more explicit modeling. The right level depends on the maturity of the codebase and how much type debt the team is willing to pay down.',
    ],
  },
  {
    id: 'core-interop',
    title: 'Interoperability With JavaScript',
    paragraphs: [
      'TypeScript can consume JavaScript files directly, especially during migration. It can also provide type-checking for JavaScript through JSDoc. This makes adoption much more flexible than a hard language switch.',
      'Because the JavaScript ecosystem is so large, interop matters. TypeScript succeeds partly because it can sit on top of existing JavaScript packages rather than requiring teams to rewrite their dependencies in a different runtime language.',
    ],
  },
  {
    id: 'core-emit-runtime',
    title: 'Emit, Transpilation, And Runtime Output',
    paragraphs: [
      'In the classic model, the TypeScript compiler transforms `.ts` or `.tsx` files into JavaScript. In many modern toolchains, another bundler or compiler handles emission while TypeScript focuses on type-checking. Either way, the runtime product is still JavaScript output plus optional declaration files.',
      'This matters because some TypeScript features exist only for types and disappear completely after compilation. Teams must understand which constructs have runtime impact and which are purely compile-time descriptions.',
    ],
  },
  {
    id: 'core-runtime-validation',
    title: 'Runtime Validation And External Data',
    paragraphs: [
      'TypeScript cannot prove that external data is valid just because you wrote a type for it. JSON payloads, query strings, form input, file contents, and database responses still need runtime checking if correctness matters. The compiler only sees your declarations and control flow, not the outside world itself.',
      'Good TypeScript systems combine static typing with runtime validation at boundaries. The type system reduces internal mistakes; validation protects the program from false assumptions about incoming data.',
    ],
  },
  {
    id: 'core-migration',
    title: 'Migration Strategy',
    paragraphs: [
      'The safest migration path is usually incremental. Start with tooling and configuration, convert important shared modules first, use permissive settings where needed, and tighten rules as the codebase becomes cleaner. Boundary-heavy areas often provide the fastest payoff because type information clarifies many downstream call sites.',
      'Trying to rewrite everything at once often produces low-quality types and unnecessary disruption. Migration works best when it follows value: start where the lack of type information is already causing friction.',
    ],
  },
  {
    id: 'core-best-practices',
    title: 'Practical Best Practices',
    paragraphs: [
      'Good TypeScript is usually boring and clear. Prefer precise domain models over clever type tricks. Let inference do local work. Annotate public contracts. Use `unknown` instead of `any` when data is untrusted. Validate external inputs. Keep types close to the business concepts they represent.',
      'The goal is not to impress the type checker. The goal is to help humans and tools agree about what the code means. When types stop serving readability and maintainability, they need simplification.',
    ],
    bullets: [
      'Prefer readable contracts over maximal type cleverness.',
      'Avoid `any` at important boundaries when better options exist.',
      'Use unions and narrowing for explicit state machines.',
      'Treat runtime validation as complementary, not optional.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'A frequent mistake is assuming that a declared type makes runtime data trustworthy. Another is overusing `any`, which quickly defeats the value of the system. Teams also sometimes create heavily abstracted conditional types that are technically powerful but unreadable to everyone else.',
      'Another pitfall is treating TypeScript as a replacement for API design discipline. Poorly named types, bloated interfaces, and leaky domain models remain poor designs even if the compiler accepts them.',
    ],
    bullets: [
      'Confusing compile-time claims with runtime truth.',
      'Using `any` as a shortcut instead of modeling uncertainty honestly.',
      "Overcomplicating types beyond the team's ability to maintain them.",
      'Ignoring JavaScript runtime behavior because the code is typed.',
    ],
  },
] as const

const exampleSections: ExampleSection[] = [
  {
    id: 'ex-object-contract',
    title: 'Typed Object Contract',
    description: [
      'Interfaces and typed parameters are the simplest way to show what a function expects. This improves discoverability for callers and helps catch missing or misspelled fields before runtime.',
    ],
    code: `interface UserProfile {
  id: number
  name: string
  email: string
  isAdmin?: boolean
}

function labelUser(user: UserProfile): string {
  return user.isAdmin ? "[admin] " + user.name : user.name
}`,
    notes: [
      'The interface documents the object shape clearly.',
      'Optional properties stay explicit instead of being implied by comments.',
    ],
  },
  {
    id: 'ex-union-state',
    title: 'Discriminated Union For Application State',
    description: [
      "Union-based state modeling is one of TypeScript's strongest patterns. It describes legal states directly instead of relying on loosely related booleans and nullable fields.",
    ],
    code: `type LoadState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; data: string[] }
  | { kind: "error"; message: string }

function itemCount(state: LoadState): number {
  if (state.kind === "success") {
    return state.data.length
  }

  return 0
}`,
    notes: [
      'The `kind` field lets runtime checks narrow the type safely.',
      'This pattern reduces invalid state combinations in UI and service code.',
    ],
  },
  {
    id: 'ex-generic-helper',
    title: 'Generic Reuse',
    description: [
      'Generics preserve relationships between inputs and outputs without forcing code into broad untyped shapes. They are useful in helpers, repositories, collections, and wrapper functions.',
    ],
    code: `function firstItem<T>(items: T[]): T | undefined {
  return items[0]
}

const firstNumber = firstItem([10, 20, 30])
const firstWord = firstItem(["alpha", "beta"])`,
    notes: [
      'The same implementation works across many element types.',
      'Callers keep precise type information without duplicating functions.',
    ],
  },
  {
    id: 'ex-oop-class',
    title: 'Class And Interface In OOP Style',
    description: [
      'TypeScript supports object-oriented modeling directly. Interfaces can describe contracts while classes provide implementation, encapsulation, and domain-focused methods.',
    ],
    code: `interface AccountSummary {
  getSummary(): string
}

class BankAccount implements AccountSummary {
  constructor(
    private owner: string,
    private balance: number,
  ) {}

  deposit(amount: number): void {
    this.balance += amount
  }

  getSummary(): string {
    return this.owner + ": $" + this.balance
  }
}`,
    notes: [
      'This is useful when a class-based domain model is natural.',
      'The language supports OOP patterns without forcing them everywhere.',
    ],
  },
  {
    id: 'ex-unknown-guard',
    title: 'Unknown Data With A Type Guard',
    description: [
      'External data should not be trusted only because a type exists. A safer pattern is to receive unknown data, check it, and then narrow it with a runtime guard.',
    ],
    code: `type Product = {
  id: number
  name: string
}

function isProduct(value: unknown): value is Product {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  )
}`,
    notes: [
      'This connects runtime validation to compile-time narrowing.',
      'It reflects the real boundary between trusted code and external input.',
    ],
  },
  {
    id: 'ex-utility-types',
    title: 'Utility Types For Derived Models',
    description: [
      'Utility types help teams derive related shapes instead of rewriting them manually. This keeps contracts aligned as models evolve.',
    ],
    code: `type User = {
  id: number
  name: string
  email: string
  createdAt: string
}

type PublicUser = Pick<User, "id" | "name">
type UserPatch = Partial<User>`,
    notes: [
      'Derived types reduce duplication across layers of the application.',
      'This is often cleaner than maintaining several manually copied interfaces.',
    ],
  },
  {
    id: 'ex-tsconfig',
    title: 'Basic TSConfig Direction',
    description: [
      'Compiler settings shape the TypeScript experience. Strictness, module resolution, target syntax, and emit rules determine how safe and how convenient the project feels.',
    ],
    code: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true,
    "jsx": "react-jsx"
  }
}`,
    notes: [
      'This kind of config is common in modern app codebases.',
      'TypeScript is partly a language choice and partly a compiler-policy choice.',
    ],
  },
] as const

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-language',
    title: 'Language Terms',
    terms: [
      {
        term: 'Static typing',
        definition:
          'Compile-time analysis of value shapes and usage relationships before code runs.',
      },
      {
        term: 'Type annotation',
        definition:
          'Syntax that explicitly states the expected type of a value, property, parameter, or return.',
      },
      {
        term: 'Type inference',
        definition:
          "The compiler's ability to derive types from code without requiring every type to be written explicitly.",
      },
      {
        term: 'Union type',
        definition: 'A type that allows a value to be one of several listed alternatives.',
      },
      {
        term: 'Intersection type',
        definition: 'A type that combines multiple contracts so a value must satisfy all of them.',
      },
      {
        term: 'Generic',
        definition:
          'A type parameter that lets one abstraction preserve relationships across many concrete types.',
      },
      {
        term: 'Literal type',
        definition:
          'A type representing an exact value such as `"ready"` or `42` rather than a broad category.',
      },
      {
        term: 'Tuple',
        definition: 'An array-like type with a fixed positional shape and known element types.',
      },
    ],
  },
  {
    id: 'glossary-modeling',
    title: 'Modeling And OOP Terms',
    terms: [
      {
        term: 'Interface',
        definition:
          'A named contract commonly used to describe the required shape of objects or class implementations.',
      },
      {
        term: 'Type alias',
        definition:
          'A named type expression that can represent objects, unions, tuples, primitives, or more advanced compositions.',
      },
      {
        term: 'Structural typing',
        definition:
          'A compatibility model where shape often matters more than explicit nominal inheritance.',
      },
      {
        term: 'Discriminated union',
        definition:
          'A union whose members share a distinguishing field that allows safe narrowing by case.',
      },
      {
        term: 'Type narrowing',
        definition:
          'The refinement of a broad type into a more specific one after a control-flow check.',
      },
      {
        term: 'Readonly',
        definition:
          'A constraint indicating that a property should not be reassigned through that type.',
      },
      {
        term: 'Access modifier',
        definition:
          'Keywords such as `public`, `private`, or `protected` used in classes to communicate intended visibility.',
      },
      {
        term: 'Implements',
        definition:
          'A class declaration clause showing that the class satisfies a particular interface contract.',
      },
    ],
  },
  {
    id: 'glossary-tooling',
    title: 'Tooling And Compiler Terms',
    terms: [
      {
        term: 'TSConfig',
        definition:
          'The project configuration file that controls compiler behavior, strictness, file inclusion, and module settings.',
      },
      {
        term: 'Declaration file',
        definition:
          'A `.d.ts` file that describes types for tooling and compilation without containing runtime implementation.',
      },
      {
        term: 'Emit',
        definition: 'The JavaScript or declaration output produced by compilation.',
      },
      {
        term: 'Transpile',
        definition:
          'Transform source code into another source form, such as TypeScript into JavaScript.',
      },
      {
        term: 'Strict mode',
        definition:
          'A family of compiler rules that increase type-checking rigor and reduce implicit assumptions.',
      },
      {
        term: 'Any',
        definition:
          'A permissive type that opts out of type safety for a value and should be used carefully.',
      },
      {
        term: 'Unknown',
        definition:
          'A safe top-level type for values whose shape is not yet trusted and must be checked before use.',
      },
      {
        term: 'Project reference',
        definition:
          'A TypeScript feature for organizing large codebases into linked compilation units.',
      },
    ],
  },
] as const

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-exists', label: 'Why It Exists' },
    { id: 'bp-runtime-reality', label: 'Runtime Reality' },
    { id: 'bp-where-it-fits', label: 'Where It Fits' },
    { id: 'bp-strengths', label: 'Major Strengths' },
    { id: 'bp-limits', label: 'Important Limits' },
    { id: 'bp-when-to-choose', label: 'When To Choose It' },
    { id: 'bp-mental-model', label: 'Practical Mental Model' },
  ],
  'core-concepts': [
    { id: 'core-js-relationship', label: 'Relationship To JavaScript' },
    { id: 'core-type-system', label: 'Core Type System' },
    { id: 'core-inference', label: 'Inference and Annotation' },
    { id: 'core-interfaces-aliases', label: 'Interfaces and Aliases' },
    { id: 'core-structural-typing', label: 'Structural Typing' },
    { id: 'core-narrowing', label: 'Type Narrowing' },
    { id: 'core-generics', label: 'Generics' },
    { id: 'core-unions-intersections', label: 'Unions and Intersections' },
    { id: 'core-classes-oop', label: 'Classes and OOP' },
    { id: 'core-functions-async', label: 'Functions and Async Code' },
    { id: 'core-utility-types', label: 'Utility Types' },
    { id: 'core-modules-declarations', label: 'Modules and Declarations' },
    { id: 'core-tsconfig', label: 'TSConfig' },
    { id: 'core-strictness', label: 'Strictness' },
    { id: 'core-interop', label: 'JavaScript Interop' },
    { id: 'core-emit-runtime', label: 'Emit and Runtime Output' },
    { id: 'core-runtime-validation', label: 'Runtime Validation' },
    { id: 'core-migration', label: 'Migration Strategy' },
    { id: 'core-best-practices', label: 'Best Practices' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-object-contract', label: 'Typed Object Contract' },
    { id: 'ex-union-state', label: 'Discriminated Union State' },
    { id: 'ex-generic-helper', label: 'Generic Reuse' },
    { id: 'ex-oop-class', label: 'Class and Interface' },
    { id: 'ex-unknown-guard', label: 'Unknown With Type Guard' },
    { id: 'ex-utility-types', label: 'Utility Types' },
    { id: 'ex-tsconfig', label: 'Basic TSConfig' },
  ],
  glossary: [
    { id: 'glossary-language', label: 'Language Terms' },
    { id: 'glossary-modeling', label: 'Modeling and OOP Terms' },
    { id: 'glossary-tooling', label: 'Tooling Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ts98-section">
      <h2 className="ts98-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="ts98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ts98-section">
      <h2 className="ts98-heading">{section.title}</h2>
      {section.description.map((paragraph, index) => (
        <p key={`${section.id}-d-${index}`}>{paragraph}</p>
      ))}
      <div className="ts98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note, index) => (
          <li key={`${section.id}-n-${index}`}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="ts98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ts98-section">
      <h2 className="ts98-heading">{section.title}</h2>
      {section.terms.map((item, index) => (
        <p key={`${section.id}-t-${index}`}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="ts98-divider" />}
    </section>
  )
}

export default function TypeScriptPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'TypeScript',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="TypeScript"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">TypeScript</h1>
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
