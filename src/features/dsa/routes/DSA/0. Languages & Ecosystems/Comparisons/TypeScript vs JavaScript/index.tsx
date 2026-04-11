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
  'JavaScript and TypeScript are not two unrelated programming languages competing from separate ecosystems. TypeScript is a typed superset of JavaScript that adds static analysis, type syntax, editor tooling advantages, and configuration-driven compilation on top of the JavaScript language developers already run in browsers, Node.js, and other runtimes. The real comparison is not whether they can express similar logic. It is whether the additional type system and build tooling create more value than overhead for the project.',
  'JavaScript remains the runtime language. Browsers execute JavaScript, Node.js executes JavaScript, and the web platform evolves around JavaScript. TypeScript does not replace that runtime reality. It analyzes source code ahead of time, catches classes of mistakes earlier, improves refactoring confidence, and then emits JavaScript or type declarations depending on the workflow. That means the central tradeoff is development-time correctness and maintainability versus build-step complexity and type-system overhead.',
  'This page is intentionally comprehensive. It covers language relationship, runtime behavior, static typing, inference, structural typing, TSConfig, declaration files, toolchain cost, interop with existing JavaScript, migration strategy, team fit, examples, and the cases where plain JavaScript remains the right engineering choice.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'JavaScript is the foundational scripting language of the web and one of the dominant general-purpose languages in modern software. It is dynamically typed, prototype-based, and executed directly by runtimes such as browsers and Node.js. It has first-class support for functions, closures, async programming, objects, modules, and a massive ecosystem of libraries and frameworks.',
      'TypeScript is a superset of JavaScript created to add optional static typing and richer tooling without abandoning JavaScript runtime compatibility. Most valid JavaScript is valid TypeScript. The key addition is a type system that can describe function signatures, object shapes, generics, unions, interfaces, enums, utility types, mapped types, and many other constraints that help developers reason about large codebases before the code runs.',
      'The important comparison is not which language can compute more. Both can express the same runtime behavior because TypeScript ultimately becomes JavaScript for execution. The meaningful difference is how much correctness, self-documentation, refactor safety, and editor intelligence you want before the runtime ever sees the program.',
    ],
  },
  {
    id: 'bp-core-difference',
    title: 'The Core Difference',
    paragraphs: [
      'JavaScript gives you maximal immediacy. You write code, run it, inspect behavior, and rely on tests, runtime checks, discipline, and experience to keep the codebase coherent. This is productive for small systems, scripts, prototypes, and teams that prefer to keep the feedback loop close to runtime reality.',
      'TypeScript adds a compile-time layer that analyzes code before execution. That extra layer can detect incompatible assumptions between modules, unsafe property access, incorrect function calls, and many structural mismatches that would otherwise surface only in tests or production. The price is more syntax, more configuration, and the need to understand a nontrivial type system.',
    ],
    bullets: [
      'JavaScript optimizes for runtime simplicity and low ceremony.',
      'TypeScript optimizes for development-time safety and maintainability.',
      'JavaScript has no separate type-checking phase by default.',
      'TypeScript adds a type-checking and often build/transpile phase.',
    ],
  },
  {
    id: 'bp-when-js-fits',
    title: 'When JavaScript Is Usually the Better Fit',
    paragraphs: [
      'JavaScript is often the better fit for small scripts, short-lived tools, prototypes, learning environments, build scripts, and projects where setup friction matters more than long-term type safety. It is also a good fit when the team is already very disciplined in testing and runtime validation and the codebase is small enough that type-level modeling would provide limited return.',
      'JavaScript also remains the most direct way to learn how the runtime actually works. Because there is no extra type layer, the developer sees the real language as executed. That can be educationally valuable and operationally simpler in environments where every added tool is a cost.',
    ],
    bullets: [
      'Small automation scripts and throwaway utilities.',
      'Quick prototypes and proof-of-concept work.',
      'Codebases with minimal complexity or short expected lifespan.',
      'Teams that want no compile step beyond what the runtime already needs.',
    ],
  },
  {
    id: 'bp-when-ts-fits',
    title: 'When TypeScript Is Usually the Better Fit',
    paragraphs: [
      'TypeScript is usually the better fit for medium to large applications, shared libraries, teams with many contributors, APIs with complex data contracts, UI codebases with many props and state transitions, and systems where refactoring confidence matters. In these environments the type system acts as an early warning layer and a form of executable documentation.',
      'It is especially valuable when the codebase grows beyond what one developer can reliably hold in working memory. Types help answer questions such as what shape a function expects, what a service returns, whether a property is optional, or what states a component can legally enter. That value grows as the codebase and team grow.',
    ],
    bullets: [
      'Large frontend or backend applications.',
      'Libraries consumed by many internal or external users.',
      'Teams with frequent refactoring and long-lived maintenance.',
      'Projects where correctness at module boundaries is strategically important.',
    ],
  },
  {
    id: 'bp-shared-language-base',
    title: 'What They Share',
    paragraphs: [
      'TypeScript and JavaScript share the same underlying language core for runtime behavior: functions, closures, objects, promises, async or await, modules, classes, arrays, maps, sets, prototypes, and the broader JavaScript ecosystem. This is why TypeScript adoption is so common. Teams do not have to abandon the JavaScript runtime or ecosystem to gain stronger tooling.',
      'This shared foundation also explains why migration is usually incremental rather than revolutionary. A JavaScript codebase can often become a TypeScript codebase gradually, file by file, configuration by configuration, rather than through a full rewrite into a fundamentally different platform.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'Using TypeScript does not guarantee good architecture, good naming, or correct runtime behavior. TypeScript catches many classes of mistakes, but not all mistakes. It cannot replace tests, runtime validation, or sound domain modeling. Teams sometimes overestimate what types can prove in a dynamic ecosystem with I/O, user input, networks, and external services.',
      'Using JavaScript does not imply low engineering quality either. Many high-quality systems are written in plain JavaScript with strong tests, linters, runtime schemas, and disciplined module design. The question is not whether JavaScript is professional enough. The question is whether the extra static analysis of TypeScript earns its keep for the system at hand.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The strongest decision rule is to ask how much the project benefits from explicit contracts between modules and contributors. If the codebase is large, changes often, and has many contributors or consumers, TypeScript usually pays for itself. If the codebase is small, fast-moving, and disposable, JavaScript may be the more honest choice.',
      'Another useful question is whether the team is already effectively doing type work informally through comments, conventions, tests, and runtime guards. If so, TypeScript may simply formalize and centralize work the team is already performing indirectly.',
    ],
    bullets: [
      'Choose JavaScript when simplicity and immediacy matter most.',
      'Choose TypeScript when codebase scale and refactor safety matter most.',
      'Do not choose TypeScript only because it is fashionable.',
      'Do not avoid TypeScript if the team is repeatedly paying for missing contracts in production.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-runtime-reality',
    title: 'Runtime Reality',
    paragraphs: [
      'JavaScript is the runtime language. This is the most important grounding fact in the comparison. Browsers and Node.js do not execute TypeScript source directly in the ordinary production model. They execute JavaScript. TypeScript therefore exists primarily as a compile-time and tooling layer over JavaScript, not as a separate runtime platform.',
      'That means when developers use TypeScript they are really making a tradeoff about development workflow, not changing the fundamental runtime semantics of the platform. Closures still behave like closures. Prototypes still behave like prototypes. Objects are still JavaScript objects after compilation.',
    ],
  },
  {
    id: 'core-dynamic-vs-static',
    title: 'Dynamic Typing Versus Static Analysis',
    paragraphs: [
      'JavaScript is dynamically typed. Values have runtime types, but variables are not constrained ahead of execution in the way statically typed languages constrain them. This gives flexibility and speed of authoring, but it also means many mistakes surface only when the code path actually runs.',
      'TypeScript adds static analysis through an optional type system. Variables, function parameters, return values, object shapes, unions, tuples, and generics can all be modeled before execution. The compiler can then reject or warn about incompatible use sites. This shifts some debugging cost from runtime to authoring time.',
      'The key point is that TypeScript is not making JavaScript statically typed at runtime. It is adding compile-time reasoning on top of JavaScript source.',
    ],
  },
  {
    id: 'core-inference',
    title: 'Type Inference and Explicit Annotation',
    paragraphs: [
      'A common misconception is that TypeScript requires everything to be annotated manually. In practice, TypeScript relies heavily on inference. The compiler can infer many local variable types, function return types, generic relationships, and object literal shapes. Explicit annotation is still useful at public boundaries and complex abstractions, but the language does not require a fully ceremonial type style.',
      'This matters because a well-written TypeScript codebase usually mixes inferred types and explicit types strategically. Too few annotations can make public contracts vague. Too many annotations can create noise and duplication.',
    ],
  },
  {
    id: 'core-structural-typing',
    title: 'Structural Typing',
    paragraphs: [
      'TypeScript uses a structural type system in many places. In simple terms, compatibility often depends on whether a value has the required shape rather than whether it explicitly declares a named class inheritance chain. This aligns well with the object-literal culture of JavaScript and makes it natural to type data structures, APIs, and configuration objects.',
      'The advantage is flexibility. The tradeoff is that teams need to understand where structural compatibility is intentionally permissive and where stricter modeling is needed to avoid accidental compatibility between unrelated values.',
    ],
  },
  {
    id: 'core-js-features',
    title: 'Core JavaScript Language Features',
    paragraphs: [
      'Plain JavaScript already provides rich expressive power: first-class functions, closures, lexical scope, objects and prototypes, promises, async or await, destructuring, modules, classes, iterators, generators, and the broader ECMAScript standard library. A developer who understands JavaScript deeply can build substantial systems without TypeScript.',
      'This matters because TypeScript is not a substitute for learning JavaScript. Good TypeScript engineers still need to understand JavaScript runtime behavior. Types help organize and validate assumptions, but they do not replace language fundamentals such as closure behavior, object identity, prototype inheritance, or asynchronous control flow.',
    ],
  },
  {
    id: 'core-generics-unions',
    title: 'Generics, Unions, and Expressive Modeling',
    paragraphs: [
      'TypeScript becomes especially powerful when modeling reusable abstractions and variant data shapes. Generics let code remain reusable while preserving type relationships. Union types let functions and state models represent controlled variation. Narrowing logic lets the compiler refine what is known based on runtime checks.',
      "This is one of TypeScript's biggest advantages in application-scale work. Instead of writing comments like this function returns either a user or an error state, teams can encode those alternatives directly into the type system and let the compiler enforce handling.",
    ],
  },
  {
    id: 'core-declaration-files',
    title: 'Declaration Files and Ecosystem Interop',
    paragraphs: [
      'TypeScript uses declaration files, commonly `.d.ts`, to describe the shape of libraries without needing the implementation itself to be written in TypeScript. This is how many JavaScript libraries can still provide excellent TypeScript support. The type information acts as a contract layer on top of runtime code.',
      'This is strategically important because it means adopting TypeScript does not require the whole ecosystem to be rewritten. JavaScript packages can remain JavaScript while still participating in a typed developer experience if declaration files exist or are authored.',
    ],
  },
  {
    id: 'core-tsconfig',
    title: 'TSConfig and Compiler Policy',
    paragraphs: [
      'TypeScript is not only a language layer. It is also a configuration and policy layer. `tsconfig.json` controls how strict the type-checking should be, how modules are emitted, what target syntax to compile to, how path aliases work, how declaration files are produced, and what files participate in the program.',
      'This is both power and cost. Teams can tune TypeScript to be permissive during migration or strict in mature systems. But configuration itself is engineering surface area that JavaScript projects may simply not need.',
    ],
  },
  {
    id: 'core-build-step',
    title: 'Build Step, Tooling, and Compilation Cost',
    paragraphs: [
      'JavaScript can be run directly in many environments with minimal setup. TypeScript usually introduces at least a transpilation or type-checking step, even if modern bundlers and frameworks hide much of that complexity. This can slow startup, complicate CI, and add mental overhead when the project is small.',
      'On the other hand, many modern frontend and backend stacks already have a build process, bundler, test runner, and linting pipeline. In those environments the extra marginal cost of TypeScript is often lower than it first appears, especially when editor assistance and compiler diagnostics save real debugging time.',
    ],
  },
  {
    id: 'core-jsdoc-middle-ground',
    title: 'JSDoc and the Middle Ground',
    paragraphs: [
      'One important middle ground is JavaScript with JSDoc and TypeScript-based checking enabled for JavaScript files. This can provide some type assistance and editor tooling without a full `.ts` migration. For teams uncertain about TypeScript, this is often a practical transitional step.',
      'This reinforces the idea that the real decision is not binary ideology. It is how much static information the team wants and how formally it wants to express that information.',
    ],
  },
  {
    id: 'core-api-boundaries',
    title: 'APIs, Libraries, and Public Contracts',
    paragraphs: [
      'TypeScript is especially valuable at boundaries: public library APIs, service layers, data-access functions, component props, event shapes, and domain models. These are the places where misunderstandings between modules become expensive. Type information makes those boundaries explicit.',
      'JavaScript can still document these boundaries through tests and runtime validation, but TypeScript often makes the contracts easier to discover and enforce automatically in editors and CI.',
    ],
  },
  {
    id: 'core-runtime-validation',
    title: 'Runtime Validation Still Matters',
    paragraphs: [
      'TypeScript cannot validate untrusted runtime data by itself. JSON from an API, user input from a form, file contents, and data from a database are all runtime facts, not compile-time guarantees. The compiler only knows what the code claims, not what the world actually sends.',
      'That means serious TypeScript systems still need runtime validation for external inputs. TypeScript reduces one category of errors; it does not replace validation, tests, or defensive programming.',
    ],
  },
  {
    id: 'core-migration',
    title: 'Migration Strategy',
    paragraphs: [
      'Migrating from JavaScript to TypeScript is usually best done incrementally. A team can start by enabling the compiler in a permissive mode, converting boundary files first, adding types to shared utilities, and ratcheting strictness up over time. This allows the organization to learn the toolchain while shipping.',
      'A forced all-at-once migration often creates noise, low-quality types, and team resentment. The better approach is to convert the parts of the system where type information creates the clearest value first.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit and Organizational Tradeoffs',
    paragraphs: [
      'TypeScript usually pays off most in teams with many contributors, frequent refactors, long-lived codebases, and strong editor-driven workflows. It can also help onboard engineers faster because types reveal intent directly in the code.',
      'JavaScript can be the better choice when the team is small, deeply experienced, comfortable with dynamic patterns, and working in a context where minimizing tooling matters more than maximizing compile-time guarantees.',
    ],
  },
  {
    id: 'core-misconceptions',
    title: 'Common Misconceptions',
    paragraphs: [
      'One common misconception is that TypeScript eliminates bugs. It does not. It eliminates some categories of bugs and changes where many mistakes are caught. Another misconception is that JavaScript is only suitable for undisciplined coding. That is also false. JavaScript can power high-quality systems when paired with sound engineering practices.',
      'A better framing is that TypeScript raises the floor for large teams and large codebases, while JavaScript keeps the barrier to execution lower and the language experience closer to the runtime itself.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-js-function',
    title: 'Plain JavaScript Function',
    description: [
      'This example shows the directness of JavaScript. There is no separate type layer. The function is small, expressive, and immediately runnable in any JavaScript runtime.',
    ],
    code: `function formatPrice(amount, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}`,
    notes: [
      'The code is compact and readable.',
      'The tradeoff is that incorrect argument shapes are discovered only through runtime behavior, tests, or external tooling.',
    ],
  },
  {
    id: 'examples-ts-function',
    title: 'Typed TypeScript Function',
    description: [
      'This example shows the same logic with explicit types. The runtime result is still JavaScript behavior, but development-time contracts are clearer.',
    ],
    code: `function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}`,
    notes: [
      'The type annotations document intent and constrain incorrect calls.',
      'This is most useful when the function is part of a larger API surface or widely reused module.',
    ],
  },
  {
    id: 'examples-union-state',
    title: 'Union Type for State Modeling',
    description: [
      'TypeScript is especially valuable when modeling legal states instead of relying on comments or conventions alone.',
    ],
    code: `type LoadState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; data: string[] }
  | { kind: 'error'; message: string }

function renderState(state: LoadState) {
  if (state.kind === 'success') {
    return state.data.length
  }

  return 0
}`,
    notes: [
      'Union types make variant states explicit.',
      'This often reduces whole categories of UI and service-layer mistakes in larger systems.',
    ],
  },
  {
    id: 'examples-jsdoc',
    title: 'JavaScript with JSDoc',
    description: [
      'A middle ground is to keep JavaScript files while layering type-aware tooling through JSDoc annotations.',
    ],
    code: `/**
 * @param {number} amount
 * @param {string} currency
 * @returns {string}
 */
function formatPrice(amount, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}`,
    notes: [
      'This can improve tooling without a full TypeScript migration.',
      'It is often a practical transitional approach for existing JavaScript repositories.',
    ],
  },
  {
    id: 'examples-tsconfig',
    title: 'Basic TSConfig Direction',
    description: [
      'TSConfig is part of the TypeScript tradeoff. It defines policy as much as language behavior.',
    ],
    code: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "noEmit": true,
    "moduleResolution": "Bundler"
  }
}`,
    notes: [
      'The configuration layer gives power, but it also creates maintenance surface area.',
      'TypeScript adoption is partly a language choice and partly a compiler-policy choice.',
    ],
  },
  {
    id: 'examples-selection',
    title: 'Selection Heuristic',
    description: [
      'These short rules are often more useful than abstract arguments about purity or popularity.',
    ],
    code: `Choose JavaScript when:
  the code is small
  the script is short-lived
  minimal tooling matters
  runtime simplicity is the main goal

Choose TypeScript when:
  the codebase is large
  teams refactor often
  public contracts matter
  editor and compiler feedback save real time`,
    notes: [
      'This heuristic is not absolute, but it matches many real-world project outcomes.',
      'The question is not which language is cooler. It is which workflow cost structure best fits the project.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-typescript',
    title: 'TypeScript Terms',
    terms: [
      {
        term: 'Type Annotation',
        definition:
          'Syntax that explicitly describes the expected type of a variable, parameter, property, or return value.',
      },
      {
        term: 'Type Inference',
        definition:
          'The ability of the TypeScript compiler to deduce types automatically from code structure and values.',
      },
      {
        term: 'Union Type',
        definition:
          'A type that allows a value to be one of several explicitly listed alternatives.',
      },
      {
        term: 'Generic',
        definition:
          'A type-level abstraction that preserves relationships across reusable functions, classes, and data structures.',
      },
      {
        term: 'Declaration File',
        definition:
          'A `.d.ts` file that describes the shape of code for type-checking without containing runtime implementation.',
      },
      {
        term: 'TSConfig',
        definition:
          'The TypeScript project configuration file that controls compiler behavior, strictness, module settings, and file inclusion.',
      },
      {
        term: 'Structural Typing',
        definition:
          'A compatibility model where values are often considered compatible based on their shape rather than named inheritance.',
      },
      {
        term: 'Type Narrowing',
        definition:
          'The process by which TypeScript refines what type a value can be based on control flow and runtime checks.',
      },
    ],
  },
  {
    id: 'glossary-javascript',
    title: 'JavaScript Terms',
    terms: [
      {
        term: 'Dynamic Typing',
        definition:
          'A runtime model where values have types but variables are not statically constrained ahead of execution by default.',
      },
      {
        term: 'Prototype',
        definition: 'The object-linking mechanism underlying inheritance behavior in JavaScript.',
      },
      {
        term: 'Closure',
        definition:
          'A function that retains access to variables from its lexical scope after the outer scope has returned.',
      },
      {
        term: 'Promise',
        definition:
          'An object representing the eventual completion or failure of an asynchronous operation.',
      },
      {
        term: 'Module',
        definition:
          'A file-level unit of code organization using `import` and `export` to share values between files.',
      },
      {
        term: 'Runtime',
        definition:
          'The actual execution environment, such as a browser or Node.js, that runs JavaScript code.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Language and Tooling Terms',
    terms: [
      {
        term: 'Transpile',
        definition:
          'Convert source code into another version of source code, such as TypeScript into JavaScript.',
      },
      {
        term: 'Linter',
        definition:
          'A tool that checks code for stylistic issues, probable mistakes, and maintainability problems.',
      },
      {
        term: 'Runtime Validation',
        definition:
          'Checks performed while the program is running to verify that external or dynamic data matches expectations.',
      },
      {
        term: 'Refactor Safety',
        definition:
          'The degree to which tools can help ensure behavior and contracts remain valid while code is being reorganized.',
      },
      {
        term: 'API Contract',
        definition:
          'The expected input and output behavior of a function, service, module, or library boundary.',
      },
      {
        term: 'Build Step',
        definition: 'Any preprocessing or compilation stage that happens before runtime execution.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-core-difference', label: 'The Core Difference' },
    { id: 'bp-when-js-fits', label: 'When JavaScript Fits' },
    { id: 'bp-when-ts-fits', label: 'When TypeScript Fits' },
    { id: 'bp-shared-language-base', label: 'What They Share' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-runtime-reality', label: 'Runtime Reality' },
    { id: 'core-dynamic-vs-static', label: 'Dynamic Versus Static' },
    { id: 'core-inference', label: 'Inference and Annotation' },
    { id: 'core-structural-typing', label: 'Structural Typing' },
    { id: 'core-js-features', label: 'Core JavaScript Features' },
    { id: 'core-generics-unions', label: 'Generics and Unions' },
    { id: 'core-declaration-files', label: 'Declaration Files' },
    { id: 'core-tsconfig', label: 'TSConfig and Compiler Policy' },
    { id: 'core-build-step', label: 'Build Step and Tooling' },
    { id: 'core-jsdoc-middle-ground', label: 'JSDoc Middle Ground' },
    { id: 'core-api-boundaries', label: 'API Boundaries' },
    { id: 'core-runtime-validation', label: 'Runtime Validation' },
    { id: 'core-migration', label: 'Migration Strategy' },
    { id: 'core-team-fit', label: 'Team Fit' },
    { id: 'core-misconceptions', label: 'Common Misconceptions' },
  ],
  examples: [
    { id: 'examples-js-function', label: 'Plain JavaScript Function' },
    { id: 'examples-ts-function', label: 'Typed TypeScript Function' },
    { id: 'examples-union-state', label: 'Union State Modeling' },
    { id: 'examples-jsdoc', label: 'JavaScript with JSDoc' },
    { id: 'examples-tsconfig', label: 'Basic TSConfig Direction' },
    { id: 'examples-selection', label: 'Selection Heuristic' },
  ],
  glossary: [
    { id: 'glossary-typescript', label: 'TypeScript Terms' },
    { id: 'glossary-javascript', label: 'JavaScript Terms' },
    { id: 'glossary-shared', label: 'Shared Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ts-js-help-section">
      <h2 className="ts-js-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="ts-js-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ts-js-help-section">
      <h2 className="ts-js-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="ts-js-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="ts-js-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="ts-js-help-section">
      <h2 className="ts-js-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="ts-js-help-divider" />}
    </section>
  )
}

export default function TypeScriptVsJavaScriptPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'TypeScript vs JavaScript',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="TypeScript vs JavaScript"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">TypeScript vs JavaScript</h1>
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
