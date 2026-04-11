import { Fragment } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type DocSection = {
  id: string
  title: string
  paragraphs: readonly string[]
}

type ExampleSnippet = {
  label: string
  code: string
}

type ExampleSection = {
  id: string
  title: string
  description: string
  snippets: readonly ExampleSnippet[]
  takeaway: string
}

type GlossaryTerm = {
  term: string
  definition: string
}

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Python and JavaScript are both general-purpose languages with enormous ecosystems, but they grew around very different centers of gravity. Python became known for readability, scripting, automation, scientific work, and backend development. JavaScript became the language of the browser and later expanded into servers, tooling, and full-stack product development.',
      "The practical comparison is not which one is more legitimate. Both are foundational technologies. The more useful question is whether the work benefits more from Python's readability, scripting strength, and data-heavy ecosystem, or from JavaScript's browser-native position and ability to span frontend and backend web work.",
      'This help-style reference covers Python vs JavaScript across overview, key ideas, core syntax, APIs, ecosystem, architecture, use cases, and tradeoffs.',
    ],
  },
  {
    id: 'bp-python',
    title: 'When Python Fits Better',
    paragraphs: [
      'Python is often the stronger fit when the work is centered on scripting, automation, backend services, data analysis, machine learning, scientific computing, or education. It is especially attractive when code clarity and ecosystem breadth outside the browser matter more than running directly on the web platform.',
      'It also fits well when the team wants a language that works comfortably in notebooks, scripts, jobs, data pipelines, CLIs, and service backends. In many organizations, Python becomes the connective tissue between operations, analytics, and application support work.',
    ],
  },
  {
    id: 'bp-javascript',
    title: 'When JavaScript Fits Better',
    paragraphs: [
      'JavaScript is usually the stronger fit when the application must run in the browser, or when the team wants one language family across frontend, backend, build tooling, and adjacent web-platform development. That browser-native position is its biggest architectural advantage.',
      'It is also attractive for teams building product UIs, interactive web applications, component systems, Node-based APIs, and developer tooling that benefits from living close to the web stack. The strongest case for JavaScript is often runtime reach rather than purely aesthetic language preference.',
    ],
  },
  {
    id: 'bp-overlap',
    title: 'Where They Overlap',
    paragraphs: [
      'Both languages can power APIs, automation scripts, CLIs, backend services, and general application logic. That overlap is real enough that many teams can deliver a working system in either language.',
      'The distinction becomes sharper when the runtime context matters. If the code must execute in the browser, JavaScript has a built-in advantage. If the code must thrive in data notebooks, automation jobs, or scientific tooling, Python usually has the built-in advantage.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'A frequent mistake is to compare only syntax taste. Runtime context, package ecosystem, team skills, and deployment model usually matter more than whether a team prefers indentation or braces.',
      'Another mistake is to treat the decision as exclusive at all times. Many products sensibly use JavaScript or TypeScript in the browser and Python in backend automation, data processing, or ML-heavy services.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose Python when readability, scripting, automation, scientific work, and data-centric ecosystems are central.',
      'Choose JavaScript when browser execution, frontend development, or one-language web-stack coverage is the key requirement.',
      'If the system includes both rich browser UI and serious backend or data workflows, using both languages in different layers can be an entirely strong architectural choice.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both languages are widely taught, widely deployed, and supported by large open-source ecosystems. Both can be used for web backends, scripting, automation, APIs, and general-purpose programming.',
      'That shared ground matters because the decision is often not about basic capability. It is about where each language feels most native and what kinds of workflows the surrounding ecosystem optimizes best.',
    ],
  },
  {
    id: 'core-runtime',
    title: 'Runtime Context',
    paragraphs: [
      'Python usually runs in interpreter-based environments for scripts, servers, jobs, notebooks, data pipelines, and desktop or automation tooling. It is not the native language of the browser in ordinary web development.',
      'JavaScript runs natively in browsers and also runs on servers through environments such as Node.js. That gives it unusual reach because the same language family can cover both client and server sides of many web products.',
    ],
  },
  {
    id: 'core-syntax',
    title: 'Syntax and Developer Feel',
    paragraphs: [
      'Python is known for readable, indentation-based syntax that often feels close to executable pseudocode. It tends to favor clarity and straightforward expression, which is part of why it is so heavily used in education, automation, and data work.',
      'JavaScript has C-family punctuation, flexible object semantics, and a long history of asynchronous and event-driven coding patterns. It can be elegant, but it is also broad enough that code style quality varies a great deal between projects.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem Direction',
    paragraphs: [
      'Python is particularly strong in scientific computing, machine learning, data analysis, scripting, notebooks, backend services, and systems automation. Its ecosystem is broad far beyond web application work.',
      'JavaScript is particularly strong in browsers, frontend frameworks, component libraries, Node-based backend systems, full-stack web delivery, and developer tooling tied closely to the web platform.',
    ],
  },
  {
    id: 'core-concurrency',
    title: 'Concurrency and Execution Model',
    paragraphs: [
      'Python supports multiple concurrency approaches, including processes, threads, async frameworks, and worker systems, but those models are often contextual rather than the first thing most people associate with the language.',
      'JavaScript is strongly associated with the event loop, promises, asynchronous APIs, and UI- or network-driven interactivity. That makes it feel especially natural in browser applications and API orchestration workloads where asynchronous flow is a core part of everyday code.',
    ],
  },
  {
    id: 'core-web',
    title: 'Web Development Position',
    paragraphs: [
      'Python is excellent for web backends through mature frameworks and server-side tooling, but it does not remove the need for JavaScript in ordinary browser UI development.',
      'JavaScript is the web platform language in the browser. That makes it unavoidable for most frontend work and deeply influential in backend and tooling ecosystems that want close alignment with browser-facing products.',
    ],
  },
  {
    id: 'core-data',
    title: 'Data, ML, and Automation',
    paragraphs: [
      'Python is often the default language for data notebooks, ETL workflows, ML experimentation, scientific libraries, and internal automation. Its package ecosystem in these areas is one of its strongest structural advantages.',
      'JavaScript can absolutely automate tasks and process data, but it is not the default center of gravity for scientific computing or machine learning workflows in the same way Python is.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Packaging and Tooling Culture',
    paragraphs: [
      'Python tooling often emphasizes scripts, virtual environments, notebooks, services, and library ecosystems that support operational or analytical work. The developer experience can feel calmer when the project is not deeply entangled with frontend toolchains.',
      'JavaScript tooling can be extremely powerful but often feels faster-moving and more layered because it sits so close to browsers, bundlers, frameworks, transpilers, package managers, and component pipelines. That is not inherently bad, but it does shape team experience.',
    ],
  },
  {
    id: 'core-teamfit',
    title: 'Team Fit and Learning Curve',
    paragraphs: [
      'Python often fits teams that value readability across mixed-skill environments, especially where application engineers, analysts, operations engineers, and researchers all need to touch code.',
      'JavaScript often fits product teams building user-facing experiences, design systems, interactive UIs, and backend services tightly coupled to those interfaces. Shared language conventions across the web stack can be a major coordination benefit.',
    ],
  },
  {
    id: 'core-interoperability',
    title: 'Using Both Together',
    paragraphs: [
      'Many mature systems use JavaScript or TypeScript for browser-facing work and Python for data processing, ML, or backend support services. That split can be more practical than forcing one language to dominate every layer.',
      'The right question is not always which language wins. Sometimes the right answer is which layer should own which responsibility based on runtime context and ecosystem strength.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward Python if the work is scripting-heavy, data-heavy, scientific, automation-oriented, or primarily backend and operations focused.',
      'Lean toward JavaScript if the system must run in the browser or the team wants one language family across frontend and backend web development.',
      'If the project spans rich browser UI and serious backend or data workflows, consider using both rather than forcing one language to solve every layer equally well.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-transform',
    title: 'Simple Data Transformation',
    description:
      'Both languages can express ordinary collection transforms well, but the style reflects different cultural defaults.',
    snippets: [
      {
        label: 'Python',
        code: `numbers = [1, 2, 3, 4]
squares = [n * n for n in numbers if n % 2 == 0]
print(squares)`,
      },
      {
        label: 'JavaScript',
        code: `const numbers = [1, 2, 3, 4]
const squares = numbers
  .filter((n) => n % 2 === 0)
  .map((n) => n * n)

console.log(squares)`,
      },
    ],
    takeaway:
      'Python often emphasizes direct readability. JavaScript often emphasizes array methods and composable callback flow.',
  },
  {
    id: 'examples-async',
    title: 'Web-Oriented Asynchronous Fetch',
    description:
      'Both ecosystems can perform HTTP work, but JavaScript is especially native to browser-style asynchronous interaction.',
    snippets: [
      {
        label: 'Python',
        code: `import httpx

response = httpx.get('https://api.example.com/users')
print(response.json())`,
      },
      {
        label: 'JavaScript',
        code: `const response = await fetch('https://api.example.com/users')
const users = await response.json()
console.log(users)`,
      },
    ],
    takeaway:
      'For browser-facing application flows, JavaScript usually feels more native because the platform itself exposes JavaScript APIs.',
  },
  {
    id: 'examples-web',
    title: 'Tiny Service Endpoint',
    description:
      'Both languages support backend APIs well, but they do so through different framework and runtime traditions.',
    snippets: [
      {
        label: 'Python',
        code: `from fastapi import FastAPI

app = FastAPI()

@app.get('/health')
def health():
    return {'ok': True}`,
      },
      {
        label: 'JavaScript',
        code: `import express from 'express'

const app = express()

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})`,
      },
    ],
    takeaway:
      'The backend story is strong in both languages. The bigger difference is whether the project also needs browser-native alignment.',
  },
  {
    id: 'examples-decision',
    title: 'Architectural Prompt',
    description:
      'A short rule of thumb keeps the comparison tied to runtime context instead of language tribalism.',
    snippets: [
      {
        label: 'Python Rule',
        code: `If the work is centered on scripts,
automation, data pipelines,
or backend logic:
  choose Python`,
      },
      {
        label: 'JavaScript Rule',
        code: `If the code must run in the browser
or share one language across the web stack:
  choose JavaScript`,
      },
    ],
    takeaway:
      'The better language is usually the one that matches where the code must live and what ecosystem the product depends on.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Interpreter',
    definition:
      'A runtime environment that executes or manages code without the same model as a precompiled native binary.',
  },
  {
    term: 'Event Loop',
    definition:
      'A scheduling model commonly associated with JavaScript runtimes for handling asynchronous work and callbacks.',
  },
  { term: 'REPL', definition: 'A read-eval-print loop used for interactive experimentation.' },
  {
    term: 'Full-Stack',
    definition: 'Development spanning frontend and backend layers of an application.',
  },
  {
    term: 'Notebook Workflow',
    definition:
      'An interactive computational workflow that mixes code, output, and narrative text, commonly associated with Python.',
  },
  {
    term: 'Frontend',
    definition: 'The user-facing client side of an application, especially browser interfaces.',
  },
  {
    term: 'Automation Script',
    definition: 'A small program written to automate repetitive operational or development tasks.',
  },
  { term: 'Runtime', definition: 'The environment in which a program executes.' },
  {
    term: 'Async I/O',
    definition:
      'Input and output operations structured so that a program can continue useful work while waiting for external resources.',
  },
  {
    term: 'Package Ecosystem',
    definition:
      'The surrounding libraries, tools, and community packages available for a language.',
  },
  {
    term: 'DOM',
    definition:
      'The browser document object model, which JavaScript commonly manipulates in frontend applications.',
  },
  {
    term: 'Data Pipeline',
    definition:
      'A system for moving, transforming, and processing data through staged computational steps.',
  },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: examples.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function PythonVsJavaScriptPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Python vs JavaScript',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Python vs JavaScript"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Python vs JavaScript</h1>
      <p className="python-js-help-doc-subtitle">
        Manual-style comparison of runtime context, ecosystem direction, execution model, and
        practical tradeoffs.
      </p>

      {activeTab === 'big-picture' &&
        bigPictureSections.map((section, index) => (
          <Fragment key={section.id}>
            <section id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
            {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
          </Fragment>
        ))}

      {activeTab === 'core-concepts' &&
        coreConceptSections.map((section) => (
          <section key={section.id} id={section.id} className="bin98-section">
            <h2 className="bin98-heading">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

      {activeTab === 'examples' &&
        examples.map((example) => (
          <section key={example.id} id={example.id} className="bin98-section">
            <h2 className="bin98-heading">{example.title}</h2>
            <p>{example.description}</p>
            {example.snippets.map((snippet) => (
              <Fragment key={`${example.id}-${snippet.label}`}>
                <h3 className="bin98-subheading">{snippet.label}</h3>
                <div className="bin98-codebox">
                  <code>{snippet.code}</code>
                </div>
              </Fragment>
            ))}
            <p>
              <strong>Takeaway:</strong> {example.takeaway}
            </p>
          </section>
        ))}

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
